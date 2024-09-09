package com.ssafy.project.domain.lists.medicineInformation.repository;

import com.ssafy.project.domain.lists.medicineInformation.entity.MedicineInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicineInformationRepository extends JpaRepository<MedicineInformation, Integer> {
}
