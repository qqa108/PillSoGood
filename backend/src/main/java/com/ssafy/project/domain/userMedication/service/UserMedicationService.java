package com.ssafy.project.domain.userMedication.service;

import com.ssafy.project.domain.medicine.entity.Medicine;
import com.ssafy.project.domain.medicine.repository.MedicineRepository;
import com.ssafy.project.domain.userDetail.entity.UserDetail;
import com.ssafy.project.domain.userDetail.repository.UserDetailRepository;
import com.ssafy.project.domain.userMedication.dto.UserMedicationDetailDTO;
import com.ssafy.project.domain.userMedication.dto.UserMedicationRequestDTO;
import com.ssafy.project.domain.userMedication.entity.UserMedication;
import com.ssafy.project.domain.userMedication.repository.UserMedicationRepository;
import com.ssafy.project.domain.userMedication.entity.UserMedicationDetail;
import com.ssafy.project.domain.userMedicationDetail.repository.UserMedicationDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserMedicationService {
    private final UserMedicationRepository userMedicationRepository;
    private final UserDetailRepository userDetailRepository;
    private final UserMedicationDetailRepository userMedicationDetailRepository;
    private final MedicineRepository medicineRepository;

    @Transactional
    public void save(UserMedicationRequestDTO userMedicationRequestDTO) {
        try {
            UserDetail userDetail = userDetailRepository.findById(userMedicationRequestDTO.getUserDetailId())
                    .orElseThrow(() -> new IllegalArgumentException("유저 정보를 찾을 수 없습니다."));

            //지금 유저 복약 정보 인덱스가 없음.

            List<UserMedicationDetail> userMedicationDetailList = new ArrayList<>();
            // UserMedicationDetail 리스트에 userMedication 설정
            for (UserMedicationDetailDTO detail : userMedicationRequestDTO.getUserMedicationDetailList()) {
                Medicine medicine = medicineRepository.findById(detail.getMedicineId()).get();
                userMedicationDetailList.add(detail.toEntity(userMedication, medicine));
            }


            userMedicationRepository.save(userMedication);


        } catch (Exception e) {
            throw new RuntimeException("복약정보 저장 오류 발생");
        }

    }
}
