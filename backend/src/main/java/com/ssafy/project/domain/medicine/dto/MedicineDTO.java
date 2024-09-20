package com.ssafy.project.domain.medicine.dto;

import com.ssafy.project.domain.lists.medicineInformation.dto.MedicineInformationDTO;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicineDTO {

    private int id;
    private String code;
    private String korName;
    private String engName;
    private String category;
    private String company;
    private String drugForm;
    private String characters;
    private String kind;
    private String effect;
    private String usages;
    private String imageUrl;
    private List<MedicineInformationDTO> medicineInformation; // MedicineInformation DTO 리스트
}
