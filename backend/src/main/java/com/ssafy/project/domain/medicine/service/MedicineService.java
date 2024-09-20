package com.ssafy.project.domain.medicine.service;

import com.ssafy.project.domain.medicine.dto.MedicineDTO;
import com.ssafy.project.domain.medicine.entity.Medicine;
import com.ssafy.project.domain.medicine.repository.MedicineRepository;
import lombok.RequiredArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MedicineService {
    private final MedicineRepository medicineRepository;

    @Transactional(readOnly = true)
    public List<MedicineDTO> findAll() {
        Pageable pageable = PageRequest.of(0, 20); // 첫 번째 페이지에서 20개의 데이터만 가져옴
        List<Medicine> medicines = medicineRepository.findAll(pageable).getContent();

        // 엔티티를 DTO로 변환하여 반환
        return medicines.stream()
                .map(Medicine::toDTO)
                .collect(Collectors.toList());
    }


    @Transactional
    public MedicineDTO findById(Integer id) {
        return medicineRepository.findById(id)
                .map(Medicine::toDTO)
                .orElseThrow(() -> new NoSuchElementException("해당 ID로 약물을 찾을 수 없습니다: " + id));
    }
}
