package com.ssafy.project.domain.userMedicationDetail.repository;

import com.ssafy.project.domain.userMedication.entity.UserMedicationDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMedicationDetailRepository extends JpaRepository<UserMedicationDetail, Integer> {
}
