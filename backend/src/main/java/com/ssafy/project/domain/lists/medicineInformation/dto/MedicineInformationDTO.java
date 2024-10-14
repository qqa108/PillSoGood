package com.ssafy.project.domain.lists.medicineInformation.dto;

import com.ssafy.project.domain.lists.medicineInformation.entity.MedicineInformation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicineInformationDTO {

    private int id;
    private String information;

    public static MedicineInformationDTO toMedicineInformationDTO(MedicineInformation medicineInformation) {
        return MedicineInformationDTO.builder()
                .id(medicineInformation.getId())
                .information(medicineInformation.getInformation())
                .build();
    }
}
