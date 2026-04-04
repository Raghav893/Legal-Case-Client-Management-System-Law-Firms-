package com.lawfirm.cms.repository;

import com.lawfirm.cms.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByLegalCaseId(Long caseId);
}
