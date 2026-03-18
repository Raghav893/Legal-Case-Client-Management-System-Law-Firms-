package com.raghav.backend.dto.invoice;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record InvoiceCreateRequest(
        @NotNull Long caseId,
        @NotNull Long clientId,
        @NotNull Double hourlyRate,
        LocalDate dueDate
) {
}
