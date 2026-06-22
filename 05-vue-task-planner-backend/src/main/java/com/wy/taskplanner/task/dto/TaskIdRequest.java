package com.wy.taskplanner.task.dto;

import jakarta.validation.constraints.NotNull;

public class TaskIdRequest {

    @NotNull(message = "id is required")
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}

