package com.raghav.backend.dto.invoice;

import com.raghav.backend.entity.InvoiceStatus;
import jakarta.validation.constraints.NotNull;

public record InvoiceStatusUpdateRequest(
        @NotNull InvoiceStatus status
) {
}
