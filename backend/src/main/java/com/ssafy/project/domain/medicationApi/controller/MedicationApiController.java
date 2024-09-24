package com.ssafy.project.domain.medicationApi.controller;

import com.ssafy.project.domain.medicationApi.dto.MedicationApiRequestDto;
import com.ssafy.project.domain.medicationApi.dto.MedicationApiResponseAPI;
import com.ssafy.project.domain.medicationApi.service.MedicationApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/medication-api")
public class MedicationApiController {

    private final MedicationApiService medicationApiService;

    @PostMapping("")
    public ResponseEntity<String> requestMedication(@RequestBody MedicationApiRequestDto request) {
        return ResponseEntity.ok(medicationApiService.sendMedicationApiRequest(request));
    }
}
