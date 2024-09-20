package com.ssafy.project.domain.medicine.controller;

import com.ssafy.project.domain.medicine.dto.MedicineDTO;
import com.ssafy.project.domain.medicine.entity.Medicine;
import com.ssafy.project.domain.medicine.service.MedicineService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/medicine")
public class MedicineController {

    private final MedicineService medicineService;
    private final HttpServletRequest request;

    @GetMapping("")
    public ResponseEntity<List<MedicineDTO>> getMedicines() {
        return ResponseEntity.ok(medicineService.findAll());
    }

    @GetMapping("/{medicineId}")
    public ResponseEntity<MedicineDTO> getMedicineById(@PathVariable Integer medicineId) {
        int id = (Integer) request.getAttribute("userId");
        System.out.println(id);
        return ResponseEntity.ok(medicineService.findById(medicineId));
    }


}
