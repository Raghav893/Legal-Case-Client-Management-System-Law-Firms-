package com.raghav.backend.dto.casefile;

import com.raghav.backend.entity.CaseStatus;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record CaseResponse(
        Long id,
        String title,
        String description,
        CaseStatus status,
        LocalDate hearingDate,
        LocalDate deadline,
        LocalDateTime createdAt,
        Long clientId,
        String clientName,
        Long lawyerId,
        String lawyerName
) {
}
