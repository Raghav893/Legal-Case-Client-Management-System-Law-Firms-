package com.raghav.backend.service.impl;

import com.raghav.backend.dto.task.TaskRequest;
import com.raghav.backend.dto.task.TaskResponse;
import com.raghav.backend.dto.task.TaskStatusUpdateRequest;
import com.raghav.backend.entity.Case;
import com.raghav.backend.entity.Role;
import com.raghav.backend.entity.Task;
import com.raghav.backend.entity.User;
import com.raghav.backend.exception.ResourceNotFoundException;
import com.raghav.backend.repository.CaseRepository;
import com.raghav.backend.repository.TaskRepository;
import com.raghav.backend.repository.UserRepository;
import com.raghav.backend.security.SecurityUtils;
import com.raghav.backend.service.TaskService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final CaseRepository caseRepository;
    private final UserRepository userRepository;

    public TaskServiceImpl(TaskRepository taskRepository,
                           CaseRepository caseRepository,
                           UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.caseRepository = caseRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Page<TaskResponse> getAll(Pageable pageable) {
        String email = SecurityUtils.getCurrentUserEmail();
        if (email != null) {
            User current = userRepository.findByEmail(email)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            if (current.getRole() == Role.LAWYER || current.getRole() == Role.PARALEGAL) {
                return taskRepository.findByAssignedToId(current.getId(), pageable).map(this::toResponse);
            }
        }
        return taskRepository.findAll(pageable).map(this::toResponse);
    }

    @Override
    public TaskResponse create(TaskRequest request) {
        Case caseFile = caseRepository.findById(request.caseId())
                .orElseThrow(() -> new ResourceNotFoundException("Case not found"));
        User assignee = userRepository.findById(request.assignedToId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Task task = new Task();
        task.setTitle(request.title());
        task.setDescription(request.description());
        task.setDueDate(request.dueDate());
        task.setStatus(request.status());
        task.setAssignedTo(assignee);
        task.setCaseFile(caseFile);

        Task saved = taskRepository.save(task);
        return toResponse(saved);
    }

    @Override
    public TaskResponse updateStatus(Long id, TaskStatusUpdateRequest request) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        task.setStatus(request.status());
        Task saved = taskRepository.save(task);
        return toResponse(saved);
    }

    @Override
    public void delete(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        taskRepository.delete(task);
    }

    private TaskResponse toResponse(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getDueDate(),
                task.getStatus(),
                task.getAssignedTo().getId(),
                task.getCaseFile().getId(),
                task.getCreatedAt(),
                task.getUpdatedAt()
        );
    }
}
