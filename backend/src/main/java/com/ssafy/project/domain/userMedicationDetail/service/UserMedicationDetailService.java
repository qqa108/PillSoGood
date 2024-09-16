package com.ssafy.project.domain.userMedicationDetail.service;

import com.ssafy.project.domain.userMedicationDetail.repository.UserMedicationDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserMedicationDetailService {
    private final UserMedicationDetailRepository userMedicationDetailRepository;
}
