package com.ssafy.project.domain.userMedication.service;

import com.ssafy.project.domain.medicine.dto.MedicineDTO;
import com.ssafy.project.domain.medicine.entity.Medicine;
import com.ssafy.project.domain.medicine.repository.MedicineRepository;
import com.ssafy.project.domain.userDetail.entity.UserDetail;
import com.ssafy.project.domain.userDetail.repository.UserDetailRepository;
import com.ssafy.project.domain.userMedication.dto.UserMedicationDetailDTO;
import com.ssafy.project.domain.userMedication.dto.UserMedicationDetailResponseDTO;
import com.ssafy.project.domain.userMedication.dto.UserMedicationRequestDTO;
import com.ssafy.project.domain.userMedication.dto.UserMedicationResponseDTO;
import com.ssafy.project.domain.userMedication.entity.UserMedication;
import com.ssafy.project.domain.userMedication.repository.UserMedicationRepository;
import com.ssafy.project.domain.userMedication.entity.UserMedicationDetail;
import com.ssafy.project.domain.userMedicationDetail.repository.UserMedicationDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UserMedicationService {
    private final UserMedicationRepository userMedicationRepository;
    private final UserDetailRepository userDetailRepository;
    private final UserMedicationDetailRepository userMedicationDetailRepository;
    private final MedicineRepository medicineRepository;

    public void save(UserMedicationRequestDTO userMedicationRequestDTO) {

        UserDetail userDetail = userDetailRepository.findById(userMedicationRequestDTO.getUserDetailId()).orElseThrow(() ->
                new IllegalArgumentException("UserDetail not found"));

        UserMedication userMedication = userMedicationRequestDTO.toEntity(new ArrayList<>(), userDetail);

        for(UserMedicationDetailDTO dto: userMedicationRequestDTO.getUserMedicationDetailList()) {
            Medicine medicine = medicineRepository.findById(dto.getMedicineId()).orElseThrow(() ->
                    new IllegalArgumentException("Medicine not Fount"));

            UserMedicationDetail detail = dto.toEntity(medicine, userMedication);
            userMedication.getUserMedicationDetailList().add(detail);
        }

        userMedicationRepository.save(userMedication);
    }

    public List<UserMedicationResponseDTO> getUserMedication(int userDetailId) {
        List<UserMedicationResponseDTO> responseDTOList = new ArrayList<>();
        List<UserMedication> userMedications = userMedicationRepository.findAllByUserDetail_Id(userDetailId);

        //자식부터
        for(UserMedication userMedication: userMedications) {
            List<UserMedicationDetailResponseDTO> tempList = new ArrayList<>();
            for(UserMedicationDetail userMedicationDetail: userMedication.getUserMedicationDetailList()) {
                MedicineDTO medicineDTO = MedicineDTO.toMedicineDTO(userMedicationDetail.getMedicine());
                tempList.add(UserMedicationDetailResponseDTO.toDto(userMedicationDetail, medicineDTO));
            }
            responseDTOList.add(UserMedicationResponseDTO.toResponseDTO(userMedication, tempList));
        }

        return responseDTOList;
    }
}
