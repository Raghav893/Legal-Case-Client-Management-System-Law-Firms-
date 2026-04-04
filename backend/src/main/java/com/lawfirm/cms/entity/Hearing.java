package com.lawfirm.cms.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "hearings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Hearing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "case_id", nullable = false)
    private LegalCase legalCase;

    @Column(nullable = false)
    private LocalDateTime hearingDate;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @Enumerated(EnumType.STRING)
    private HearingStatus status;
}
