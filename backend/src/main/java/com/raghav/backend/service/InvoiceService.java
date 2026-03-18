package com.raghav.backend.service;

import com.raghav.backend.dto.invoice.InvoiceCreateRequest;
import com.raghav.backend.dto.invoice.InvoiceResponse;
import com.raghav.backend.dto.invoice.InvoiceStatusUpdateRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface InvoiceService {
    Page<InvoiceResponse> getAll(Pageable pageable);

    InvoiceResponse create(InvoiceCreateRequest request);

    InvoiceResponse updateStatus(Long id, InvoiceStatusUpdateRequest request);

    InvoiceResponse getById(Long id);
}
