package com.raghav.backend.dto.invoice;

import com.raghav.backend.entity.InvoiceStatus;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record InvoiceResponse(
        Long id,
        Double amount,
        InvoiceStatus status,
        LocalDateTime issuedAt,
        LocalDate dueDate,
        Long clientId,
        Long caseId
) {
}
