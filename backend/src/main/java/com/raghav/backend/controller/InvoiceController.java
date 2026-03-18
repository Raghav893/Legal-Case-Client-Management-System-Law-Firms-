package com.raghav.backend.controller;

import com.raghav.backend.dto.invoice.InvoiceCreateRequest;
import com.raghav.backend.dto.invoice.InvoiceResponse;
import com.raghav.backend.dto.invoice.InvoiceStatusUpdateRequest;
import com.raghav.backend.payload.ApiResponse;
import com.raghav.backend.service.InvoiceService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','LAWYER','PARALEGAL')")
    public ResponseEntity<ApiResponse<Page<InvoiceResponse>>> getAll(Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.ok("Invoices fetched", invoiceService.getAll(pageable)));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','LAWYER')")
    public ResponseEntity<ApiResponse<InvoiceResponse>> create(@Valid @RequestBody InvoiceCreateRequest request) {
        InvoiceResponse response = invoiceService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("Invoice created", response));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN','LAWYER')")
    public ResponseEntity<ApiResponse<InvoiceResponse>> updateStatus(@PathVariable Long id,
                                                                     @Valid @RequestBody InvoiceStatusUpdateRequest request) {
        InvoiceResponse response = invoiceService.updateStatus(id, request);
        return ResponseEntity.ok(ApiResponse.ok("Invoice updated", response));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','LAWYER','PARALEGAL')")
    public ResponseEntity<ApiResponse<InvoiceResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok("Invoice fetched", invoiceService.getById(id)));
    }
}
