package com.ssafy.project.domain.lists.ageProhibition.repository;

import com.ssafy.project.domain.lists.ageProhibition.entity.AgeProhibition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgeProhibitionRepository extends JpaRepository<AgeProhibition, Integer> {
}
