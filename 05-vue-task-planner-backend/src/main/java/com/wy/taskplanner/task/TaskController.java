package com.wy.taskplanner.task;

import com.wy.taskplanner.common.ApiResponse;
import com.wy.taskplanner.task.dto.TaskCreateRequest;
import com.wy.taskplanner.task.dto.TaskIdRequest;
import com.wy.taskplanner.task.dto.TaskResponse;
import com.wy.taskplanner.task.dto.TaskUpdateRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ApiResponse<List<TaskResponse>> findAll() {
        return ApiResponse.success(taskService.findAll());
    }

    @GetMapping("/detail")
    public ApiResponse<TaskResponse> findDetail(@RequestParam Long id) {
        return ApiResponse.success(taskService.findById(id));
    }

    @PostMapping("/create")
    public ApiResponse<TaskResponse> create(@Valid @RequestBody TaskCreateRequest request) {
        return ApiResponse.success(taskService.create(request));
    }

    @PostMapping("/update")
    public ApiResponse<TaskResponse> update(@Valid @RequestBody TaskUpdateRequest request) {
        return ApiResponse.success(taskService.update(request));
    }

    @PostMapping("/delete")
    public ApiResponse<Void> delete(@Valid @RequestBody TaskIdRequest request) {
        taskService.delete(request);
        return ApiResponse.success(null);
    }

    @PostMapping("/toggle-status")
    public ApiResponse<TaskResponse> toggleStatus(@Valid @RequestBody TaskIdRequest request) {
        return ApiResponse.success(taskService.toggleStatus(request));
    }
}
