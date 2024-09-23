package com.ssafy.project.domain.userMedication.controller;

import com.ssafy.project.domain.userMedication.dto.UserMedicationRequestDTO;
import com.ssafy.project.domain.userMedication.dto.UserMedicationResponseDTO;
import com.ssafy.project.domain.userMedication.service.UserMedicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user-medication")
public class UserMedicationController {

    private final UserMedicationService userMedicationService;

    //복약카드 추가
    @PostMapping("")
    public ResponseEntity<?> saveUserMedication(@RequestBody UserMedicationRequestDTO userMedicationRequestDTO) {
        userMedicationService.save(userMedicationRequestDTO);
        return ResponseEntity.ok("복약정보가 성공적으로 저장되었습니다");
    }

    //회원의 모든 복약카드 불러오기
    @GetMapping("/{userDetailId}")
    public ResponseEntity<List<UserMedicationResponseDTO>> getAllUserMedication(@PathVariable int userDetailId) {
        return ResponseEntity.ok(userMedicationService.getUserMedication(userDetailId));
    }

    //복약카드수
    @PutMapping("/{userMedicationId}")
    public ResponseEntity<String> updateUserMedication(@RequestBody UserMedicationRequestDTO userMedicationRequestDTO, @PathVariable int userMedicationId) {
        userMedicationService.updateUserMedication(userMedicationRequestDTO, userMedicationId);
        return ResponseEntity.ok("복약카드 업데이트 완료");
    }



}
