package com.raghav.backend.service.impl;

import com.raghav.backend.dto.casefile.CaseRequest;
import com.raghav.backend.dto.casefile.CaseResponse;
import com.raghav.backend.entity.Case;
import com.raghav.backend.entity.Client;
import com.raghav.backend.entity.Role;
import com.raghav.backend.entity.User;
import com.raghav.backend.exception.ResourceNotFoundException;
import com.raghav.backend.repository.CaseRepository;
import com.raghav.backend.repository.ClientRepository;
import com.raghav.backend.repository.UserRepository;
import com.raghav.backend.security.SecurityUtils;
import com.raghav.backend.service.CaseService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CaseServiceImpl implements CaseService {

    private final CaseRepository caseRepository;
    private final ClientRepository clientRepository;
    private final UserRepository userRepository;

    public CaseServiceImpl(CaseRepository caseRepository,
                           ClientRepository clientRepository,
                           UserRepository userRepository) {
        this.caseRepository = caseRepository;
        this.clientRepository = clientRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Page<CaseResponse> getAll(Pageable pageable) {
        String email = SecurityUtils.getCurrentUserEmail();
        if (email != null) {
            User current = userRepository.findByEmail(email)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            if (current.getRole() == Role.LAWYER) {
                return caseRepository.findByLawyerId(current.getId(), pageable).map(this::toResponse);
            }
        }
        return caseRepository.findAll(pageable).map(this::toResponse);
    }

    @Override
    public CaseResponse create(CaseRequest request) {
        Client client = clientRepository.findById(request.clientId())
                .orElseThrow(() -> new ResourceNotFoundException("Client not found"));
        User lawyer = userRepository.findById(request.lawyerId())
                .orElseThrow(() -> new ResourceNotFoundException("Lawyer not found"));

        Case caseFile = new Case();
        caseFile.setTitle(request.title());
        caseFile.setDescription(request.description());
        caseFile.setStatus(request.status());
        caseFile.setHearingDate(request.hearingDate());
        caseFile.setDeadline(request.deadline());
        caseFile.setClient(client);
        caseFile.setLawyer(lawyer);

        Case saved = caseRepository.save(caseFile);
        return toResponse(saved);
    }

    @Override
    public CaseResponse getById(Long id) {
        Case caseFile = caseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Case not found"));
        return toResponse(caseFile);
    }

    @Override
    public CaseResponse update(Long id, CaseRequest request) {
        Case caseFile = caseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Case not found"));
        Client client = clientRepository.findById(request.clientId())
                .orElseThrow(() -> new ResourceNotFoundException("Client not found"));
        User lawyer = userRepository.findById(request.lawyerId())
                .orElseThrow(() -> new ResourceNotFoundException("Lawyer not found"));

        caseFile.setTitle(request.title());
        caseFile.setDescription(request.description());
        caseFile.setStatus(request.status());
        caseFile.setHearingDate(request.hearingDate());
        caseFile.setDeadline(request.deadline());
        caseFile.setClient(client);
        caseFile.setLawyer(lawyer);

        Case saved = caseRepository.save(caseFile);
        return toResponse(saved);
    }

    @Override
    public void delete(Long id) {
        Case caseFile = caseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Case not found"));
        caseRepository.delete(caseFile);
    }

    private CaseResponse toResponse(Case caseFile) {
        String clientName = caseFile.getClient().getFirstName() + " " + caseFile.getClient().getLastName();
        String lawyerName = caseFile.getLawyer().getName();
        return new CaseResponse(
                caseFile.getId(),
                caseFile.getTitle(),
                caseFile.getDescription(),
                caseFile.getStatus(),
                caseFile.getHearingDate(),
                caseFile.getDeadline(),
                caseFile.getCreatedAt(),
                caseFile.getClient().getId(),
                clientName,
                caseFile.getLawyer().getId(),
                lawyerName
        );
    }
}
