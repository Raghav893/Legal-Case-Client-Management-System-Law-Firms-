package com.raghav.backend.dto.document;

import java.time.LocalDateTime;

public record DocumentResponse(
        Long id,
        String fileName,
        String fileType,
        String filePath,
        String tag,
        LocalDateTime uploadedAt,
        Long caseId
) {
}
