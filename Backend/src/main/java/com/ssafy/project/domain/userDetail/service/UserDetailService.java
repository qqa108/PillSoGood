package com.ssafy.project.domain.userDetail.service;

import com.ssafy.project.domain.userDetail.repository.UserDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailService {
    private final UserDetailRepository userDetailRepository;
}
