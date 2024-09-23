package com.ssafy.project.domain.userMedicationDetail.entity;

import com.ssafy.project.domain.medicine.entity.Medicine;
import com.ssafy.project.domain.userMedication.entity.UserMedication;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Setter
@Builder
public class UserMedicationDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "daily_intake_frequency", nullable = false)
    private int dailyIntakeFrequency;

    @Column(name = "per_amount")
    private int perAmount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_medication_id", referencedColumnName = "id")
    private UserMedication userMedication;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicine_id", referencedColumnName = "id", nullable = false)
    private Medicine medicine;

    public void update(int dailyIntakeFrequency, int perAmount, Medicine medicine) {
        this.dailyIntakeFrequency = dailyIntakeFrequency;
        this.perAmount = perAmount;
        this.medicine = medicine;
    }
}
