package com.raghav.backend.repository;

import com.raghav.backend.entity.TimeEntry;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimeEntryRepository extends JpaRepository<TimeEntry, Long> {
    List<TimeEntry> findByCaseFileId(Long caseId);
}
