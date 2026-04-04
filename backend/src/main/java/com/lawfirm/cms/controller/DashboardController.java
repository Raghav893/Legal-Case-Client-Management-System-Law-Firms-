package com.lawfirm.cms.controller;

import com.lawfirm.cms.dto.DashboardStats;
import com.lawfirm.cms.entity.CaseStatus;
import com.lawfirm.cms.repository.CaseRepository;
import com.lawfirm.cms.repository.ClientRepository;
import com.lawfirm.cms.repository.HearingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private CaseRepository caseRepository;

    @Autowired
    private HearingRepository hearingRepository;

    @GetMapping("/stats")
    public DashboardStats getStats() {
        long totalClients = clientRepository.count();
        long totalCases = caseRepository.count();
        long totalHearings = hearingRepository.count();
        
        Map<String, Long> casesByStatus = new HashMap<>();
        for (CaseStatus status : CaseStatus.values()) {
            casesByStatus.put(status.name(), caseRepository.findAll().stream()
                .filter(c -> c.getStatus() == status).count());
        }

        return DashboardStats.builder()
                .totalClients(totalClients)
                .totalCases(totalCases)
                .activeCases(casesByStatus.getOrDefault(CaseStatus.IN_PROGRESS.name(), 0L) + 
                              casesByStatus.getOrDefault(CaseStatus.OPEN.name(), 0L))
                .closedCases(casesByStatus.getOrDefault(CaseStatus.CLOSED.name(), 0L))
                .upcomingHearings(totalHearings) // Simple count for now
                .casesByStatus(casesByStatus)
                .build();
    }
}
