package com.wy.taskplanner.task;

public class TaskNotFoundException extends RuntimeException {

    public TaskNotFoundException(Long taskId) {
        super("Task not found: " + taskId);
    }
}

