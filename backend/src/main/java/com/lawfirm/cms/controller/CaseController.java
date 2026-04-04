package com.lawfirm.cms.controller;

import com.lawfirm.cms.entity.LegalCase;
import com.lawfirm.cms.service.CaseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/cases")
public class CaseController {

    @Autowired
    private CaseService caseService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('ADVOCATE') or hasRole('ASSISTANT')")
    public List<LegalCase> getAllCases() {
        return caseService.getAllCases();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ADVOCATE') or hasRole('ASSISTANT')")
    public ResponseEntity<LegalCase> getCaseById(@PathVariable(value = "id") Long id) {
        LegalCase legalCase = caseService.getCaseById(id)
                .orElseThrow(() -> new RuntimeException("Case not found with id: " + id));
        return ResponseEntity.ok().body(legalCase);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('ADVOCATE')")
    public LegalCase createCase(@Valid @RequestBody LegalCase legalCase) {
        return caseService.createCase(legalCase);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ADVOCATE')")
    public ResponseEntity<LegalCase> updateCase(@PathVariable(value = "id") Long id,
                                               @Valid @RequestBody LegalCase caseDetails) {
        LegalCase updatedCase = caseService.updateCase(id, caseDetails);
        return ResponseEntity.ok(updatedCase);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCase(@PathVariable(value = "id") Long id) {
        caseService.deleteCase(id);
        return ResponseEntity.ok().build();
    }
}
