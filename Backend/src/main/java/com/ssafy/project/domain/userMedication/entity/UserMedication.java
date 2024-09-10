package com.ssafy.project.domain.userMedication.entity;

import com.ssafy.project.domain.userDetail.entity.UserDetail;
import com.ssafy.project.domain.userMedicationDetail.entity.UserMedicationDetail;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class UserMedication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name", nullable = false)
    private String name;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "flag", nullable = false)
    private Status status;

    @Column(name = "created_at")
    private LocalDateTime createdAt; // 복약 시작일

    @Column(name = "end_at")
    private LocalDateTime endAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_detail_id", nullable = false)
    private UserDetail userDetail;

    @OneToMany(mappedBy = "userMedication", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    List<UserMedicationDetail> userMedicationDetailList;
}
