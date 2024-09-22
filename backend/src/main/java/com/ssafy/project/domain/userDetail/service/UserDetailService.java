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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserDetailService {
    private final UserRepository userRepository;
    private final UserDetailRepository userDetailRepository;

    // 사용자 조회
    @Transactional(readOnly = true)
    public UserDetailResponse getUser(int userId, String family) {
        if (family != null) {
            UserDetail userDetail = userDetailRepository.findByUserIdAndFamily(userId, family)
                    .orElseThrow(() -> new IllegalArgumentException("해당 가족 정보를 찾을 수 없습니다."));
            return UserDetailResponse.fromEntity(userDetail);
        }

        UserDetail userDetail = userDetailRepository.findByUserIdAndFamily(userId, "나")
                .orElseThrow(() -> new IllegalArgumentException("사용자 세부 정보를 찾을 수 없습니다."));
        return UserDetailResponse.fromEntity(userDetail);
    }

    // 사용자 가족 조회
    @Transactional(readOnly = true)
    public List<UserDetailResponse> getUserFamily(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        List<UserDetail> userDetails = userDetailRepository.findAllByUser(user);

        List<UserDetailResponse> familyList = new ArrayList<>();
        for (UserDetail userDetail : userDetails) {
            familyList.add(UserDetailResponse.fromEntity(userDetail));
        }
        return familyList;
    }

    // 사용자 등록
    @Transactional
    public void registerUserDetail(int userId, UserDetailDto userDetailDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        Optional<UserDetail> existingUserDetail = userDetailRepository.findByUserIdAndFamily(userId, userDetailDto.getFamily());

        if (existingUserDetail.isPresent()) {
            throw new IllegalArgumentException("이미 등록된 사용자 정보가 있습니다.");
        }
        UserDetail userDetail = userDetailDto.toEntity(user);
        userDetailRepository.save(userDetail);
    }

    // 사용자 정보 수정
    @Transactional
    public void modifyUserDetail(int userId, UserDetailDto userDetailDto) {
        UserDetail userDetail = userDetailRepository.findByUserIdAndFamily(userId, userDetailDto.getFamily())
                .orElseThrow(() -> new IllegalArgumentException("사용자 세부 정보를 찾을 수 없습니다."));

        userDetailDto.updateUserDetail(userDetail);
        userDetailRepository.save(userDetail);
    }

    // 회원 탈퇴 -> flag or 카카오 api 반영
    @Transactional
    public void deleteUser(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        userRepository.delete(user);
    }

    // 개별 가족 정보 삭제
    @Transactional
    public void deleteFamily(int userId, String family) {
        UserDetail userDetail = userDetailRepository.findByUserIdAndFamily(userId, family)
                .orElseThrow(() -> new IllegalArgumentException("해당 가족 정보를 찾을 수 없습니다."));

        userDetailRepository.delete(userDetail);
    }
}
