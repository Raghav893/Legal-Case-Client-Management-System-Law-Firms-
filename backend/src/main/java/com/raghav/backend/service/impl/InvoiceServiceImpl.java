package com.raghav.backend.service.impl;

import com.raghav.backend.dto.invoice.InvoiceCreateRequest;
import com.raghav.backend.dto.invoice.InvoiceResponse;
import com.raghav.backend.dto.invoice.InvoiceStatusUpdateRequest;
import com.raghav.backend.entity.Case;
import com.raghav.backend.entity.Client;
import com.raghav.backend.entity.Invoice;
import com.raghav.backend.entity.InvoiceStatus;
import com.raghav.backend.entity.TimeEntry;
import com.raghav.backend.exception.BadRequestException;
import com.raghav.backend.exception.ResourceNotFoundException;
import com.raghav.backend.repository.CaseRepository;
import com.raghav.backend.repository.ClientRepository;
import com.raghav.backend.repository.InvoiceRepository;
import com.raghav.backend.repository.TimeEntryRepository;
import com.raghav.backend.service.InvoiceService;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final CaseRepository caseRepository;
    private final ClientRepository clientRepository;
    private final TimeEntryRepository timeEntryRepository;

    public InvoiceServiceImpl(InvoiceRepository invoiceRepository,
                              CaseRepository caseRepository,
                              ClientRepository clientRepository,
                              TimeEntryRepository timeEntryRepository) {
        this.invoiceRepository = invoiceRepository;
        this.caseRepository = caseRepository;
        this.clientRepository = clientRepository;
        this.timeEntryRepository = timeEntryRepository;
    }

    @Override
    public Page<InvoiceResponse> getAll(Pageable pageable) {
        return invoiceRepository.findAll(pageable).map(this::toResponse);
    }

    @Override
    public InvoiceResponse create(InvoiceCreateRequest request) {
        Case caseFile = caseRepository.findById(request.caseId())
                .orElseThrow(() -> new ResourceNotFoundException("Case not found"));
        Client client = clientRepository.findById(request.clientId())
                .orElseThrow(() -> new ResourceNotFoundException("Client not found"));
        List<TimeEntry> entries = timeEntryRepository.findByCaseFileId(caseFile.getId());
        if (entries.isEmpty()) {
            throw new BadRequestException("No time entries found for this case");
        }
        double hours = entries.stream().mapToDouble(TimeEntry::getHoursWorked).sum();
        double amount = hours * request.hourlyRate();

        Invoice invoice = new Invoice();
        invoice.setCaseFile(caseFile);
        invoice.setClient(client);
        invoice.setAmount(amount);
        invoice.setStatus(InvoiceStatus.DRAFT);
        invoice.setDueDate(request.dueDate());

        Invoice saved = invoiceRepository.save(invoice);
        return toResponse(saved);
    }

    @Override
    public InvoiceResponse updateStatus(Long id, InvoiceStatusUpdateRequest request) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found"));
        if (request.status() == InvoiceStatus.DRAFT) {
            throw new BadRequestException("Invalid status update");
        }
        invoice.setStatus(request.status());
        Invoice saved = invoiceRepository.save(invoice);
        return toResponse(saved);
    }

    @Override
    public InvoiceResponse getById(Long id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found"));
        return toResponse(invoice);
    }

    private InvoiceResponse toResponse(Invoice invoice) {
        return new InvoiceResponse(
                invoice.getId(),
                invoice.getAmount(),
                invoice.getStatus(),
                invoice.getIssuedAt(),
                invoice.getDueDate(),
                invoice.getClient().getId(),
                invoice.getCaseFile().getId()
        );
    }
}
