
package com.ssafy.project.domain.medicationApi.controller;

import com.ssafy.project.domain.medicationApi.dto.MedicationApiKey;
import com.ssafy.project.domain.medicationApi.dto.MedicationApiRequestDto;
import com.ssafy.project.domain.medicationApi.service.MedicationApiService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping ("/api/medication-api")
public class MedicationApiController {

    private final MedicationApiService medicationApiService;

    @PostMapping ("/certify")
    public ResponseEntity<String> certifyKakao(@RequestBody MedicationApiRequestDto request) {
        System.out.println(request.toString());
        return ResponseEntity.ok(medicationApiService.sendKakaoAuthentication(request));
    }

    @PostMapping ("/request")
    public ResponseEntity<?> requestMedication(HttpServletRequest request, @RequestBody MedicationApiKey key) {
        int userId = (Integer)request.getAttribute("userId");
        if (userId <= 0) {
            throw new IllegalArgumentException("유효하지 않은 사용자 ID");
        }

        // 서비스 호출 후 필요한 필드만 추출
        return ResponseEntity.ok(medicationApiService.requestMedication(key.getCallbackId(), userId));
    }

    @PostMapping ("/test")
    public ResponseEntity<?> requestMedicationTest(HttpServletRequest request, @RequestBody String key) throws Exception {
        int userId = (Integer)request.getAttribute("userId");
        if (userId <= 0) {
            throw new IllegalArgumentException("유효하지 않은 사용자 ID");
        }
        // 서비스 호출 후 필요한 필드만 추출
        return ResponseEntity.ok(medicationApiService.parseMedicationData(key, 1));
    }
}