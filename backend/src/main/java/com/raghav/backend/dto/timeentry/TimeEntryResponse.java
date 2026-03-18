package com.raghav.backend.dto.timeentry;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record TimeEntryResponse(
        Long id,
        String description,
        Double hoursWorked,
        LocalDate date,
        Long caseId,
        Long userId,
        LocalDateTime createdAt
) {
}
