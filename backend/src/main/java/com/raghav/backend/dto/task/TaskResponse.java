package com.raghav.backend.dto.task;

import com.raghav.backend.entity.TaskStatus;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record TaskResponse(
        Long id,
        String title,
        String description,
        LocalDate dueDate,
        TaskStatus status,
        Long assignedToId,
        Long caseId,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
