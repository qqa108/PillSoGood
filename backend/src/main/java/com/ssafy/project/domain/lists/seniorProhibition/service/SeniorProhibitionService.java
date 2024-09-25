package com.ssafy.project.domain.lists.seniorProhibition.service;

import com.ssafy.project.domain.lists.seniorProhibition.repository.SeniorProhibitionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SeniorProhibitionService {
    private final SeniorProhibitionRepository seniorProhibitionRepository;
}
