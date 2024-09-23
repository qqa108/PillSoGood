package com.ssafy.project.domain.userMedicationDetail.controller;

import com.ssafy.project.domain.userMedication.dto.UserMedicationRequestDTO;
import com.ssafy.project.domain.userMedicationDetail.dto.UserMedicationDetailRequestDTO;
import com.ssafy.project.domain.userMedicationDetail.service.UserMedicationDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user-medication-detail")
public class UserMedicationDetailController {

    private final UserMedicationDetailService userMedicationDetailService;

    //복약카드디테일 추가(약 추가)
    @PostMapping("/{userMedicationId}")
    public ResponseEntity<String> adddUserMedicationDetail(@RequestBody List<UserMedicationDetailRequestDTO> dto, @PathVariable int userMedicationId) {
        userMedicationDetailService.addUserMedicationDetail(dto, userMedicationId);
        return ResponseEntity.ok("복약카드디테일 추가 완료");
    }

    //
    @DeleteMapping("/{userMedicationDetailId}")
    public ResponseEntity<String> deleteUserMedicationDetail(@PathVariable int userMedicationDetailId) {
        userMedicationDetailService.removeUserMedicationDetail(userMedicationDetailId);
        return ResponseEntity.ok("성공적으로 복약정보디테일 삭제 완료");
    }

    @PutMapping("/{userMedicationDetailId}")
    public ResponseEntity<String> updateUserMedicationDetail(@RequestBody UserMedicationDetailRequestDTO dto, @PathVariable int userMedicationDetailId) {
        userMedicationDetailService.updateUserMedicationDetail(dto, userMedicationDetailId);
        return ResponseEntity.ok("복약정보디테일 수정 완료");
    }

}
