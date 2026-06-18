package com.wy.taskplanner.task;

import com.wy.taskplanner.task.dto.TaskCreateRequest;
import com.wy.taskplanner.task.dto.TaskIdRequest;
import com.wy.taskplanner.task.dto.TaskResponse;
import com.wy.taskplanner.task.dto.TaskUpdateRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Transactional(readOnly = true)
    public List<TaskResponse> findAll() {
        return taskRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"))
                .stream()
                .map(TaskResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public TaskResponse findById(Long taskId) {
        Task task = getTask(taskId);
        return TaskResponse.from(task);
    }

    @Transactional
    public TaskResponse create(TaskCreateRequest request) {
        Task task = new Task(
                request.getTitle().trim(),
                request.getCategory().trim(),
                request.getPriority(),
                normalizeNote(request.getNote())
        );

        Task savedTask = taskRepository.save(task);
        return TaskResponse.from(savedTask);
    }

    @Transactional
    public TaskResponse update(TaskUpdateRequest request) {
        Task task = getTask(request.getId());

        task.updateInfo(
                request.getTitle().trim(),
                request.getCategory().trim(),
                request.getPriority(),
                normalizeNote(request.getNote())
        );

        return TaskResponse.from(task);
    }

    @Transactional
    public TaskResponse toggleStatus(TaskIdRequest request) {
        Task task = getTask(request.getId());
        task.toggleStatus();
        return TaskResponse.from(task);
    }

    @Transactional
    public void delete(TaskIdRequest request) {
        Task task = getTask(request.getId());
        taskRepository.delete(task);
    }

    private Task getTask(Long taskId) {
        return taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException(taskId));
    }

    private String normalizeNote(String note) {
        if (note == null) {
            return "";
        }

        return note.trim();
    }
}
