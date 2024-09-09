package com.ssafy.project.domain.userMedication.service;

import com.ssafy.project.domain.userMedication.repository.UserMedicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserMedicationService {
    private final UserMedicationRepository userMedicationRepository;
}
