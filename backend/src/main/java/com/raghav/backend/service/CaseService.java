package com.raghav.backend.service;

import com.raghav.backend.dto.casefile.CaseRequest;
import com.raghav.backend.dto.casefile.CaseResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CaseService {
    Page<CaseResponse> getAll(Pageable pageable);

    CaseResponse create(CaseRequest request);

    CaseResponse getById(Long id);

    CaseResponse update(Long id, CaseRequest request);

    void delete(Long id);
}
