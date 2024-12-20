<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskItem extends Model
{
    use HasFactory;

    public $table = 'task_items';

    protected $fillable = [
        'task_id',
        'is_completed',
        'description',
    ];

    protected $casts = [
        'is_completed' => 'boolean',
    ];

    public function task()
    {
        return $this->belongsTo(Task::class, 'task_id', 'id');
    }
}
