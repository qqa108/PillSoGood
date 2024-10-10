package com.ssafy.project.domain.medicine.repository;

import com.ssafy.project.domain.medicine.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Integer> {
    Optional<Medicine> findByCode(String code); // code 값으로 Medicine 검색
}
