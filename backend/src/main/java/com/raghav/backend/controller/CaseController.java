package com.raghav.backend.controller;

import com.raghav.backend.dto.casefile.CaseRequest;
import com.raghav.backend.dto.casefile.CaseResponse;
import com.raghav.backend.payload.ApiResponse;
import com.raghav.backend.service.CaseService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cases")
public class CaseController {

    private final CaseService caseService;

    public CaseController(CaseService caseService) {
        this.caseService = caseService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<CaseResponse>>> getAll(Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.ok("Cases fetched", caseService.getAll(pageable)));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','LAWYER','PARALEGAL')")
    public ResponseEntity<ApiResponse<CaseResponse>> create(@Valid @RequestBody CaseRequest request) {
        CaseResponse response = caseService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("Case created", response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CaseResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok("Case fetched", caseService.getById(id)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','LAWYER','PARALEGAL')")
    public ResponseEntity<ApiResponse<CaseResponse>> update(@PathVariable Long id,
                                                            @Valid @RequestBody CaseRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Case updated", caseService.update(id, request)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Object>> delete(@PathVariable Long id) {
        caseService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Case deleted", null));
    }
}
