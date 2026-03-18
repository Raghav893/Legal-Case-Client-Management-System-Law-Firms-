package com.raghav.backend.repository;

import com.raghav.backend.entity.Case;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CaseRepository extends JpaRepository<Case, Long> {
    Page<Case> findByLawyerId(Long lawyerId, Pageable pageable);
}
