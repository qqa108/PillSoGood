package com.ssafy.project.domain.lists.amountProhibition.service;

import com.ssafy.project.domain.lists.amountProhibition.repository.AmountProhibitionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AmountProhibitionService {
    private final AmountProhibitionRepository amountProhibitionRepository;
}
