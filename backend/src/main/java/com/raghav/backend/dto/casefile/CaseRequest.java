package com.raghav.backend.dto.casefile;

import com.raghav.backend.entity.CaseStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record CaseRequest(
        @NotBlank String title,
        @NotBlank String description,
        @NotNull CaseStatus status,
        LocalDate hearingDate,
        LocalDate deadline,
        @NotNull Long clientId,
        @NotNull Long lawyerId
) {
}
