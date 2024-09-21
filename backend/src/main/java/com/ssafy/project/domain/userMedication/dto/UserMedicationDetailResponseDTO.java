package com.ssafy.project.domain.userMedication.dto;

import com.ssafy.project.domain.medicine.dto.MedicineDTO;
import com.ssafy.project.domain.userMedication.entity.UserMedicationDetail;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserMedicationDetailResponseDTO {

    private int dailyIntakeFrequency;
    private int perAmount;
    private MedicineDTO medicineDTO;

    public static UserMedicationDetailResponseDTO toDto(UserMedicationDetail userMedicationDetail, MedicineDTO medicineDTO) {
        return UserMedicationDetailResponseDTO.builder()
                .dailyIntakeFrequency(userMedicationDetail.getDailyIntakeFrequency())
                .perAmount(userMedicationDetail.getPerAmount())
                .medicineDTO(medicineDTO)
                .build();
    }
}
