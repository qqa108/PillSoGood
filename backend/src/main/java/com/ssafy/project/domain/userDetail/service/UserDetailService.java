package com.ssafy.project.domain.userDetail.service;

import com.ssafy.project.domain.user.entity.User;
import com.ssafy.project.domain.user.repository.UserRepository;
import com.ssafy.project.domain.userDetail.dto.UserDetailDto;
import com.ssafy.project.domain.userDetail.dto.UserDetailResponse;
import com.ssafy.project.domain.userDetail.entity.UserDetail;
import com.ssafy.project.domain.userDetail.repository.UserDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserDetailService {
    private final UserRepository userRepository;
    private final UserDetailRepository userDetailRepository;

    // 사용자 조회
    @Transactional
    public UserDetailResponse getUser(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        UserDetail userDetail = userDetailRepository.findByUser(user)
                .orElseThrow(() -> new IllegalArgumentException("사용자 세부 정보를 찾을 수 없습니다."));

        return UserDetailResponse.fromEntity(userDetail);
    }

    // 사용자 등록
    @Transactional
    public void registerUserDetail(int userId, UserDetailDto userDetailDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        UserDetail userDetail = userDetailDto.toEntity(user);

        userDetailRepository.save(userDetail);
    }

    // 사용자 정보 수정
    @Transactional
    public void modifyUserDetail(int userId, UserDetailDto userDetailDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        UserDetail userDetail = userDetailRepository.findByUser(user)
                .orElseThrow(() -> new IllegalArgumentException("사용자 세부 정보를 찾을 수 없습니다."));

        userDetailDto.updateUserDetail(userDetail);
        userDetailRepository.save(userDetail);
    }

    // 회원 탈퇴 -> flag or 카카오 api 반영
    @Transactional
    public void deleteUser(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        UserDetail userDetail = userDetailRepository.findByUser(user)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보를 찾을 수 없습니다."));

        userDetailRepository.delete(userDetail);
        userRepository.delete(user);
    }
}
