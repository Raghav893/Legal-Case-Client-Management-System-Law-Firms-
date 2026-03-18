package com.raghav.backend.repository;

import com.raghav.backend.entity.Document;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    Page<Document> findByCaseFileId(Long caseId, Pageable pageable);
}
