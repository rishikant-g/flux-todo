<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Task;
use App\Models\TaskItem;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // $allTasks = Task::get();
        // return $allTasks->toArray();
        $userId = $request->user()?->id;
        $allTasks = Task::where(['user_id' => $userId])->when(request('search', null), function($query) {
            return $query->where('title', 'like', "%". request('search') . "%");
        })
        ->when(request('sort_by', null), function ($q) {
            $sortBy = request('sort_by', null) == 'asc' ? 'asc' : 'desc';
            return $q->orderBy('id', $sortBy);
        })
        ->withCount([
            'items',
            'items as checked_items' => function ($query) {
                $query->where('is_completed', true);
            }
        ])
        ->get();
        return $allTasks->toArray();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [ 'title' => 'required|string|max:255' ]);
        if($validator->fails())  return $this->jsonError('Validatin Error', $validator->errors(), 422);

        $validatedTask = $validator->validated();
        $validatedTask['user_id'] = $request->user()?->id;
        try {
            $mainTask = Task::create($validatedTask);
        } catch(\Exception $e) {
            return $this->jsonError("Failed to create Task", ['SQL_ERROR' => $e->getMessage()], 400);
        }

        return $this->jsonSuccess('Success', $mainTask->toArray(), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, int $taskId)
    {
        $userId = $request->user()?->id ?? null;
        $task = Task::where(['id' => $taskId, 'user_id' => $userId])->first();
        if(empty($task)) return $this->jsonError('Task not found');
        return $this->jsonSuccess('Task details', $task->toArray());
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [ 
            'title' => 'required|string|max:255',
        ]);
        if($validator->fails())  return $this->jsonError('Validatin Error', $validator->errors(), 422);

        $validatedTask = $validator->validated();
        $validatedTask['user_id'] = $request->user()?->id;
        $existingTask = Task::where(['id' => $id])->first();
        if(empty($existingTask)) return $this->jsonError('Task not found');
        try {
            if(!$existingTask->update($validatedTask)) {
                throw new Exception('Failed to update Task');
            }
        } catch(\Exception $e) {
            return $this->jsonError("Failed to update Task", ['SQL_ERROR' => $e->getMessage()], 400);
        }

        return $this->jsonSuccess('Success', $existingTask->toArray(), 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, int $id)
    {
        $userId = $request->user()?->id;
        $existingTask = Task::where(['id' => $id, 'user_id' => $userId])->first();
        if(empty($existingTask)) return $this->jsonError('Task not found');
        if($existingTask?->delete()) {
            return $this->jsonSuccess('Task deleted successfully');
        }
        return $this->jsonError("Failed to delete Task");
    }

      /**
     * Display a listing of the Task related Subtask resource.
     */
    public function subtasks(Request $request, int $taskId)
    {
        $userId = $request->user()?->id;
        $allItems = TaskItem::where(['task_id'=> $taskId])
        ->whereHas('task', function($query) use($userId) {
            $query->where(['user_id' => $userId]);
        })
        ->get();
        return $this->jsonSuccess('Success subtasks', ['data' => $allItems->toArray()]);
    }
}
