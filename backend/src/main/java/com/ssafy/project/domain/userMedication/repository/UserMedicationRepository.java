package com.ssafy.project.domain.userMedication.repository;

import com.ssafy.project.domain.userMedication.entity.UserMedication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMedicationRepository extends JpaRepository<UserMedication, Integer> {
    List<UserMedication> findAllByUserDetail_Id(int userDetailId);
}
