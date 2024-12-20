<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\TaskItemController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('v1/')->name('v1.')->group(function() {
    // Route::get('health', function() {
    //     return response()->json(['status' => 'success', 'message' => 'Health check successfull'], 200);
    // });

    Route::post('/register', [AuthController::class,'register']);
    Route::post('/login', [AuthController::class,'login']);

    
    // Protected Routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('user', [AuthController::class, 'user'])->name('auth.user');
        Route::post('logout', [AuthController::class, 'logout'])->name('auth.logout');
        
        Route::get('subtaskGet/{id}', [TaskController::class, 'subtasks'])->name('tasks.subtasks');
        Route::apiResource('tasks', TaskController::class);
        Route::apiResource('subtasks', TaskItemController::class)->except(['index']);
        
    });
    

});

Route::fallback(function(){
    return response()->json(['status'=> false, 'message' => 'Invalid Endpoint / Method. Please check the API'], 404);
});
