package com.raghav.backend.controller;

import com.raghav.backend.dto.task.TaskRequest;
import com.raghav.backend.dto.task.TaskResponse;
import com.raghav.backend.dto.task.TaskStatusUpdateRequest;
import com.raghav.backend.payload.ApiResponse;
import com.raghav.backend.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<TaskResponse>>> getAll(Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.ok("Tasks fetched", taskService.getAll(pageable)));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','LAWYER','PARALEGAL')")
    public ResponseEntity<ApiResponse<TaskResponse>> create(@Valid @RequestBody TaskRequest request) {
        TaskResponse response = taskService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("Task created", response));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','LAWYER','PARALEGAL')")
    public ResponseEntity<ApiResponse<TaskResponse>> updateStatus(@PathVariable Long id,
                                                                  @Valid @RequestBody TaskStatusUpdateRequest request) {
        TaskResponse response = taskService.updateStatus(id, request);
        return ResponseEntity.ok(ApiResponse.ok("Task updated", response));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Object>> delete(@PathVariable Long id) {
        taskService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Task deleted", null));
    }
}
