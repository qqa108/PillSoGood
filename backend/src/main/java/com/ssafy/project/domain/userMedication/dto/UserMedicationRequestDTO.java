package com.ssafy.project.domain.userMedication.dto;

import com.ssafy.project.domain.userDetail.entity.UserDetail;
import com.ssafy.project.domain.userMedication.entity.Status;
import com.ssafy.project.domain.userMedication.entity.UserMedication;
import com.ssafy.project.domain.userMedication.entity.UserMedicationDetail;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserMedicationRequestDTO {

    private String name;
    private Status status;
    private int userDetailId;
    private String intakeAt;
    private int prescriptionDay;
    private String hospitalName;
    private String pharmacyName;
    private List<UserMedicationDetailDTO> userMedicationDetailList = new ArrayList<>();

    public UserMedication toEntity(UserDetail userDetail, List<UserMedicationDetail> userMedicationDetail) {
        return UserMedication.builder()
                .name(this.name)
                .userDetail(userDetail)
                .status(this.status)
                .intakeAt(this.intakeAt)
                .prescriptionDay(this.prescriptionDay)
                .hospitalName(this.hospitalName)
                .pharmacyName(this.pharmacyName)
                .userMedicationDetailList(userMedicationDetail)
                .build();
    }


}
