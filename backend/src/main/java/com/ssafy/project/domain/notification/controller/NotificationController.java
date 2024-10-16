package com.ssafy.project.domain.notification.controller;

import com.ssafy.project.domain.notification.dto.MedicationNotificationResponseDTO;
import com.ssafy.project.domain.notification.dto.NotificationRequestDTO;
import com.ssafy.project.domain.notification.service.NotificationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/remainder")
public class NotificationController {

    private final NotificationService notificationService;

    // 복약 알림 정보 조회
    @GetMapping("/{medicationId}")
    public ResponseEntity<MedicationNotificationResponseDTO> getMedicationNotifications(@PathVariable int medicationId) {
        MedicationNotificationResponseDTO response = notificationService.getMedicationNotifications(medicationId);
        return ResponseEntity.ok(response);
    }

    // 알림 등록
    @PostMapping("/register")
    public ResponseEntity<?> registerNotification(@RequestBody @Valid NotificationRequestDTO notificationRequestDTO) {
        notificationService.registerNotification(notificationRequestDTO);
        return ResponseEntity.ok("알림이 성공적으로 등록되었습니다.");
    }

    // 알림 수정
    @PostMapping("/modify")
    public ResponseEntity<?> modifyNotification(@RequestBody NotificationRequestDTO notificationRequestDTO) {
        notificationService.updateNotification(notificationRequestDTO);
        return ResponseEntity.ok("알림이 성공적으로 수정되었습니다.");
    }

    // 알림 삭제 (전체)
    @DeleteMapping("/delete/{medicationId}")
    public ResponseEntity<?> deleteNotification(@PathVariable int medicationId) {
        notificationService.deleteNotification(medicationId);
        return ResponseEntity.ok("알림이 성공적으로 삭제되었습니다.");
    }

    // 복약 지연
//    @PatchMapping("/delay/{medicationId}")
//    public ResponseEntity<?> delayMedication(@PathVariable int medicationId) {
//        notificationService.pauseMedication(medicationId);
//        return ResponseEntity.ok("복약이 중단되었습니다.");
//    }
//
//
//    // 복약 재개
//    @PatchMapping("/restart/{medicationId}")
//    public ResponseEntity<?> startMedication(@PathVariable int medicationId) {
//        notificationService.resumeMedication(medicationId);
//        return ResponseEntity.ok("복약이 다시 시작되었습니다.");
//    }


    // 복약 체크
    @PatchMapping("/check/{medicationId}")
    public ResponseEntity<?> checkMedication(@PathVariable int medicationId) {
        notificationService.checkMedication(medicationId);
        return ResponseEntity.ok("복약이 완료되었습니다.");
    }
}
