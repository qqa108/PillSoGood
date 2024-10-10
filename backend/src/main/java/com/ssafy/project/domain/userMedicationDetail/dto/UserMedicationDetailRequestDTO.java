package com.ssafy.project.domain.userMedicationDetail.dto;

import com.ssafy.project.domain.medicine.entity.Medicine;
import com.ssafy.project.domain.userMedication.entity.UserMedication;
import com.ssafy.project.domain.userMedicationDetail.entity.UserMedicationDetail;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserMedicationDetailRequestDTO {
    private int id;
    private int dailyIntakeFrequency;
    private int perAmount;
    private int medicineId; // JSON에서 받아올 medicineId

    public UserMedicationDetail toEntity(Medicine medicine, UserMedication userMedication) {
        return UserMedicationDetail.builder()
                .dailyIntakeFrequency(this.dailyIntakeFrequency)
                .perAmount(this.perAmount)
                .medicine(medicine)
                .userMedication(userMedication)
                .build();
    }
}
