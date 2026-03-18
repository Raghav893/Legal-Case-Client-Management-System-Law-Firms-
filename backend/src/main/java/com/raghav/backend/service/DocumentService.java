package com.raghav.backend.service;

import com.raghav.backend.dto.document.DocumentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface DocumentService {
    Page<DocumentResponse> getByCaseId(Long caseId, Pageable pageable);

    DocumentResponse upload(Long caseId, MultipartFile file, String tag);

    void delete(Long documentId);
}
