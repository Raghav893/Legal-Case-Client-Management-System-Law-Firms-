package com.lawfirm.cms.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class DashboardStats {
    private long totalClients;
    private long totalCases;
    private long activeCases;
    private long closedCases;
    private long upcomingHearings;
    private Map<String, Long> casesByStatus;
}
