package com.ssafy.project.domain.userMedication.dto;

import com.ssafy.project.domain.userMedication.entity.Status;
import com.ssafy.project.domain.userMedication.entity.UserMedication;
import com.ssafy.project.domain.userMedicationDetail.dto.UserMedicationDetailResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserMedicationResponseDTO {

    private int id;
    private String name;
    private Status status;
    private LocalDateTime intakeAt;
    private int prescriptionDay;
    private String hospitalName;
    private String pharmacyName;
    private List<UserMedicationDetailResponseDTO> userMedicationDetailList = new ArrayList<>();

    public static UserMedicationResponseDTO toResponseDTO(UserMedication userMedication, List<UserMedicationDetailResponseDTO> list) {
        return UserMedicationResponseDTO.builder()
                .id(userMedication.getId())
                .name(userMedication.getName())
                .status(userMedication.getStatus())
                .intakeAt(userMedication.getIntakeAt())
                .prescriptionDay(userMedication.getPrescriptionDay())
                .hospitalName(userMedication.getHospitalName())
                .pharmacyName(userMedication.getPharmacyName())
                .userMedicationDetailList(list)
                .build();
    }
}
