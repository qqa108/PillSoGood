package com.ssafy.project.domain.lists.amountProhibition.repository;

import com.ssafy.project.domain.lists.amountProhibition.entity.AmountProhibition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AmountProhibitionRepository extends JpaRepository<AmountProhibition, Integer> {
}
