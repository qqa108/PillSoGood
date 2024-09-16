package com.ssafy.project.domain.lists.combinationProhibition.service;

import com.ssafy.project.domain.lists.combinationProhibition.repository.CombinationProhibitionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CombinationProhibitionService {
    private final CombinationProhibitionRepository combinationProhibitionRepository;
}
