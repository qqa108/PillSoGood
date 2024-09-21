package com.ssafy.project.domain.userMedication.dto;

import com.ssafy.project.domain.userDetail.entity.UserDetail;
import com.ssafy.project.domain.userMedication.entity.Status;
import com.ssafy.project.domain.userMedication.entity.UserMedication;
import com.ssafy.project.domain.userMedication.entity.UserMedicationDetail;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserMedicationResponseDTO {

    private int id;
    private Status status;
    private String intakeAt;
    private int prescriptionDay;
    private String hospitalName;
    private String pharmacyName;
    private List<UserMedicationDetailResponseDTO> userMedicationDetailList = new ArrayList<>();

    public static UserMedicationResponseDTO toResponseDTO(UserMedication userMedication, List<UserMedicationDetailResponseDTO> list) {
        return UserMedicationResponseDTO.builder()
                .id(userMedication.getId())
                .status(userMedication.getStatus())
                .intakeAt(userMedication.getIntakeAt())
                .prescriptionDay(userMedication.getPrescriptionDay())
                .hospitalName(userMedication.getHospitalName())
                .pharmacyName(userMedication.getPharmacyName())
                .userMedicationDetailList(list)
                .build();
    }
}
