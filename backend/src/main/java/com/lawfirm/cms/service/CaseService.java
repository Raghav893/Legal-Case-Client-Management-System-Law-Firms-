package com.lawfirm.cms.service;

import com.lawfirm.cms.entity.LegalCase;
import com.lawfirm.cms.repository.CaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CaseService {

    @Autowired
    private CaseRepository caseRepository;

    public List<LegalCase> getAllCases() {
        return caseRepository.findAll();
    }

    public Optional<LegalCase> getCaseById(Long id) {
        return caseRepository.findById(id);
    }

    public LegalCase createCase(LegalCase legalCase) {
        return caseRepository.save(legalCase);
    }

    public LegalCase updateCase(Long id, LegalCase caseDetails) {
        LegalCase legalCase = caseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Case not found with id: " + id));

        legalCase.setTitle(caseDetails.getTitle());
        legalCase.setDescription(caseDetails.getDescription());
        legalCase.setStatus(caseDetails.getStatus());
        legalCase.setCourt(caseDetails.getCourt());
        legalCase.setJudge(caseDetails.getJudge());
        
        return caseRepository.save(legalCase);
    }

    public void deleteCase(Long id) {
        caseRepository.deleteById(id);
    }

    public List<LegalCase> getCasesByClient(Long clientId) {
        return caseRepository.findByClientId(clientId);
    }
}
