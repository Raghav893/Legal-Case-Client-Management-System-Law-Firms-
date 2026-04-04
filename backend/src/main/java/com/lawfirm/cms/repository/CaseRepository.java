package com.lawfirm.cms.repository;

import com.lawfirm.cms.entity.LegalCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CaseRepository extends JpaRepository<LegalCase, Long> {
    List<LegalCase> findByClientId(Long clientId);
    List<LegalCase> findByAdvocateId(Long advocateId);
}
