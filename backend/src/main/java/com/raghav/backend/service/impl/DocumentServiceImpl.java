package com.raghav.backend.service.impl;

import com.raghav.backend.dto.document.DocumentResponse;
import com.raghav.backend.entity.Case;
import com.raghav.backend.entity.Document;
import com.raghav.backend.exception.BadRequestException;
import com.raghav.backend.exception.ResourceNotFoundException;
import com.raghav.backend.repository.CaseRepository;
import com.raghav.backend.repository.DocumentRepository;
import com.raghav.backend.service.DocumentService;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class DocumentServiceImpl implements DocumentService {

    private final DocumentRepository documentRepository;
    private final CaseRepository caseRepository;
    private final Path uploadDir;

    public DocumentServiceImpl(DocumentRepository documentRepository,
                               CaseRepository caseRepository,
                               @Value("${app.file.upload-dir}") String uploadDir) {
        this.documentRepository = documentRepository;
        this.caseRepository = caseRepository;
        this.uploadDir = Paths.get(uploadDir);
    }

    @Override
    public Page<DocumentResponse> getByCaseId(Long caseId, Pageable pageable) {
        return documentRepository.findByCaseFileId(caseId, pageable).map(this::toResponse);
    }

    @Override
    public DocumentResponse upload(Long caseId, MultipartFile file, String tag) {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("File is required");
        }
        Case caseFile = caseRepository.findById(caseId)
                .orElseThrow(() -> new ResourceNotFoundException("Case not found"));
        try {
            Files.createDirectories(uploadDir);
            String storedName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path target = uploadDir.resolve(storedName);
            Files.copy(file.getInputStream(), target);

            Document document = new Document();
            document.setFileName(file.getOriginalFilename());
            document.setFileType(file.getContentType());
            document.setFilePath(target.toString());
            document.setTag(tag);
            document.setCaseFile(caseFile);

            Document saved = documentRepository.save(document);
            return toResponse(saved);
        } catch (IOException ex) {
            throw new BadRequestException("File upload failed");
        }
    }

    @Override
    public void delete(Long documentId) {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found"));
        documentRepository.delete(document);
        if (document.getFilePath() != null) {
            try {
                Files.deleteIfExists(Paths.get(document.getFilePath()));
            } catch (IOException ignored) {
                // Best-effort cleanup
            }
        }
    }

    private DocumentResponse toResponse(Document document) {
        return new DocumentResponse(
                document.getId(),
                document.getFileName(),
                document.getFileType(),
                document.getFilePath(),
                document.getTag(),
                document.getUploadedAt(),
                document.getCaseFile().getId()
        );
    }
}
