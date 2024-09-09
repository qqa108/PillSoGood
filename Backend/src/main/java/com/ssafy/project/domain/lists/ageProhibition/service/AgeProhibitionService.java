package com.ssafy.project.domain.lists.ageProhibition.service;

import com.ssafy.project.domain.lists.ageProhibition.repository.AgeProhibitionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AgeProhibitionService {
    private final AgeProhibitionRepository ageProhibitionRepository;
}
