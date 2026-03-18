package com.raghav.backend.service;

import com.raghav.backend.dto.task.TaskRequest;
import com.raghav.backend.dto.task.TaskResponse;
import com.raghav.backend.dto.task.TaskStatusUpdateRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TaskService {
    Page<TaskResponse> getAll(Pageable pageable);

    TaskResponse create(TaskRequest request);

    TaskResponse updateStatus(Long id, TaskStatusUpdateRequest request);

    void delete(Long id);
}
