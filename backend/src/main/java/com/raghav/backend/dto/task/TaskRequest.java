package com.raghav.backend.dto.task;

import com.raghav.backend.entity.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record TaskRequest(
        @NotBlank String title,
        @NotBlank String description,
        LocalDate dueDate,
        @NotNull TaskStatus status,
        @NotNull Long assignedToId,
        @NotNull Long caseId
) {
}
