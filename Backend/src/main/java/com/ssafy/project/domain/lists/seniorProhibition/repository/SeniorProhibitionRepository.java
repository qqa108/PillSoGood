package com.ssafy.project.domain.lists.seniorProhibition.repository;

import com.ssafy.project.domain.lists.seniorProhibition.entity.SenionProhibition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeniorProhibitionRepository extends JpaRepository<SenionProhibition, Integer> {
}
