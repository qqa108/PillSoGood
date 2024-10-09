package com.ssafy.project.domain.medicineImage.contoller;

import com.ssafy.project.domain.medicineImage.service.MedicineImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/medicine-image")
public class MedicineImageController {

    private final MedicineImageService medicineImageService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        System.out.println("-----------------------------COME--------------------------------");
        // 서비스에서 이미지 전송 로직 처리
        String response = medicineImageService.uploadImageToUrl(file);
        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(500).body("이미지 전송 실패");
        }
    }
}
