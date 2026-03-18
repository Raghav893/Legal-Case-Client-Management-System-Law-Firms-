package com.raghav.backend.controller;

import com.raghav.backend.dto.document.DocumentResponse;
import com.raghav.backend.payload.ApiResponse;
import com.raghav.backend.service.DocumentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/cases/{caseId}/documents")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<DocumentResponse>>> getByCase(@PathVariable Long caseId, Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.ok("Documents fetched", documentService.getByCaseId(caseId, pageable)));
    }

    @PostMapping("/upload")
    @PreAuthorize("hasAnyRole('ADMIN','LAWYER','PARALEGAL')")
    public ResponseEntity<ApiResponse<DocumentResponse>> upload(@PathVariable Long caseId,
                                                                @RequestParam("file") MultipartFile file,
                                                                @RequestParam(value = "tag", required = false) String tag) {
        DocumentResponse response = documentService.upload(caseId, file, tag);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("Document uploaded", response));
    }

    @DeleteMapping("/{docId}")
    @PreAuthorize("hasAnyRole('ADMIN','LAWYER','PARALEGAL')")
    public ResponseEntity<ApiResponse<Object>> delete(@PathVariable Long docId) {
        documentService.delete(docId);
        return ResponseEntity.ok(ApiResponse.ok("Document deleted", null));
    }
}
