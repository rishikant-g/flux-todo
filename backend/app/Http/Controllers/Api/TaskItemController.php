<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Task;
use App\Models\TaskItem;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;

class TaskItemController extends ApiController
{

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'task_id' => 'required|exists:tasks,id',
            'description' => 'required|string|max:255',
            'is_completed' => 'nullable|boolean'
        ]);
        if ($validator->fails())  return $this->jsonError('Validatin Error', $validator->errors(), 422);

        $validatedTask = $validator->validated();
        $validatedTask['is_completed'] = (!empty($validatedTask['is_completed'])) ? true : false;
        $userId = $request->user()?->id;
        try {
            $task = Task::where(['id' => $validatedTask['task_id'], 'user_id' => $userId])->first();
            if (empty($task)) return $this->jsonError("You are not authorized to perform this action");
            $subTask = TaskItem::create($validatedTask);
        } catch (\Exception $e) {
            return $this->jsonError("Failed to create Sub-Task", ['SQL_ERROR' => $e->getMessage()], 400);
        }

        return $this->jsonSuccess('Success', $subTask->toArray(), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, int $subTaskId)
    {
        $userId = $request->user()?->id ?? null;
        $subtask = TaskItem::where(['id' => $subTaskId])->first();
        if (empty($subtask)) return $this->jsonError('Sub Task not found');
        $task = Task::where(['id' => $subtask->task_id, 'user_id' => $userId])->first();
        if (empty($task)) return $this->jsonError("You are not authorized to perform this action");
        return $this->jsonSuccess('Sub-Task details', $subtask->toArray());
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [
            // 'task_id' => 'required|exists:tasks,id',
            'description' => 'sometimes|string|max:255',
            'is_completed' => 'sometimes|boolean'
        ]);
        if ($validator->fails())  return $this->jsonError('Validatin Error', $validator->errors(), 422);

        $validatedTask = $validator->validated();
        $userId = $request->user()?->id;
        $existingTask = TaskItem::where(['id' => $id])->first();
        if (empty($existingTask)) return $this->jsonError('Sub-Task not found');
        $task = Task::where(['id' => $existingTask->task_id, 'user_id' => $userId])->first();
        if (empty($task)) return $this->jsonError("You are not authorized to perform this action");
        try {
            if (!$existingTask->update($validatedTask)) {
                throw new Exception('Failed to update Sub-Task');
            }
        } catch (\Exception $e) {
            return $this->jsonError("Failed to update Sub-Task", ['SQL_ERROR' => $e->getMessage()], 400);
        }

        return $this->jsonSuccess('Success', $existingTask->toArray(), 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, int $id)
    {
        $existingTask = TaskItem::where(['id' => $id])->first();
        if (empty($existingTask)) return $this->jsonError('Sub-Task not found');
        $userId = $request->user()?->id;
        $task = Task::where(['id' => $existingTask->task_id, 'user_id' => $userId])->first();
        if (empty($task)) return $this->jsonError("You are not authorized to perform this action");
        if ($existingTask?->delete()) {
            return $this->jsonSuccess('Sub-Task deleted successfully');
        }
        return $this->jsonError("Failed to delete Sub-Task");
    }
}
