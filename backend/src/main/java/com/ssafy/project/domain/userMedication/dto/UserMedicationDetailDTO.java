package com.ssafy.project.domain.userMedication.dto;

import com.ssafy.project.domain.medicine.entity.Medicine;
import com.ssafy.project.domain.userMedication.entity.UserMedication;
import com.ssafy.project.domain.userMedication.entity.UserMedicationDetail;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserMedicationDetailDTO {
    private int dailyIntakeFrequency;
    private int perAmount;
    private int medicineId; // JSON에서 받아올 medicineId

    // toEntity 함수 구현
    public UserMedicationDetail toEntity(UserMedication userMedication, Medicine medicine) {
        return UserMedicationDetail.builder()
                .dailyIntakeFrequency(this.dailyIntakeFrequency)
                .perAmount(this.perAmount)
                .userMedication(userMedication) // 부모 UserMedication 설정
                .medicine(medicine) // Medicine 설정
                .build();
    }
}
