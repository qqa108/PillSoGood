package com.ssafy.project.domain.userMedication.repository;

import com.ssafy.project.domain.userMedication.entity.UserMedication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMedicationRepository extends JpaRepository<UserMedication, Integer> {
}
