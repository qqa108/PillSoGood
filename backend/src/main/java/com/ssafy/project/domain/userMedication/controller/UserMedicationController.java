package com.ssafy.project.domain.userMedication.controller;

import com.ssafy.project.domain.userMedication.dto.UserMedicationRequestDTO;
import com.ssafy.project.domain.userMedication.dto.UserMedicationResponseDTO;
import com.ssafy.project.domain.userMedication.entity.UserMedication;
import com.ssafy.project.domain.userMedication.service.UserMedicationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("")
    public ResponseEntity<List<UserMedicationResponseDTO>> getAllUserMedication(@RequestBody int userDetailId) {
        System.out.println(userDetailId);
        return ResponseEntity.ok(userMedicationService.getUserMedication(userDetailId));
    }
}
