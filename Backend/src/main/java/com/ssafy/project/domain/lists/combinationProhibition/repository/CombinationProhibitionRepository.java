package com.ssafy.project.domain.lists.combinationProhibition.repository;

import com.ssafy.project.domain.lists.combinationProhibition.entity.CombinationProhibition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CombinationProhibitionRepository extends JpaRepository<CombinationProhibition, Integer> {
}
