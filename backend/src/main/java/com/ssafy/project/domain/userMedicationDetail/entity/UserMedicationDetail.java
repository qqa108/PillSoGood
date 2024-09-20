package com.ssafy.project.domain.userMedicationDetail.entity;

import com.ssafy.project.domain.medicine.entity.Medicine;
import com.ssafy.project.domain.userMedication.entity.UserMedication;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

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
    @JoinColumn(name = "user_medicine_id", referencedColumnName = "id")
    private UserMedication userMedication;

    @OneToMany(mappedBy = "userMedicationDetail", fetch = FetchType.LAZY)
    private List<Medicine> medicines;
}
