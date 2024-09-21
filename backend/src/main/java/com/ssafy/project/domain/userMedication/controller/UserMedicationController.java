package com.ssafy.project.domain.userMedication.controller;

import com.ssafy.project.domain.userMedication.dto.UserMedicationRequestDTO;
import com.ssafy.project.domain.userMedication.entity.UserMedication;
import com.ssafy.project.domain.userMedication.service.UserMedicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user-medication")
public class UserMedicationController {

    private final UserMedicationService userMedicationService;

    @PostMapping("")
    public ResponseEntity<?> saveUserMedication(@RequestBody UserMedicationRequestDTO userMedicationRequestDTO) {
        userMedicationService.save(userMedicationRequestDTO);

        return ResponseEntity.ok("복약정보가 성공적으로 저장되었습니다");
    }
}
