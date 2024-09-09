package com.ssafy.project.domain.lists.medicineInformation.service;

import com.ssafy.project.domain.lists.medicineInformation.repository.MedicineInformationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MedicineInformationService {
    private final MedicineInformationRepository medicineInformationRepository;
}
