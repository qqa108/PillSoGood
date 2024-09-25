package com.ssafy.project.domain.lists.seniorProhibition.repository;

import com.ssafy.project.domain.lists.seniorProhibition.entity.SeniorProhibition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeniorProhibitionRepository extends JpaRepository<SeniorProhibition, Integer> {
}
