package com.ssafy.project.domain.userMedicationDetail.entity;

import com.ssafy.project.domain.medicine.entity.Medicine;
import com.ssafy.project.domain.userMedication.entity.UserMedication;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class UserMedicationDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "remain", nullable = false)
    private int remain;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicine_id", referencedColumnName = "id")
    private Medicine medicine;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_medication_id", nullable = false)
    private UserMedication userMedication;
}
