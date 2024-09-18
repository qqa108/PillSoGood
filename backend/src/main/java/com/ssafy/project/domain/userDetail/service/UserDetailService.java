package com.ssafy.project.domain.userDetail.service;

import com.ssafy.project.domain.user.entity.User;
import com.ssafy.project.domain.user.repository.UserRepository;
import com.ssafy.project.domain.userDetail.dto.UserDetailResponse;
import com.ssafy.project.domain.userDetail.repository.UserDetailRepository;
import com.ssafy.project.global.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailService {
    private final UserRepository userRepository;
    private final UserDetailRepository userDetailRepository;

    //사용자 조회
    public UserDetailResponse getUser(String token) {
//        String email = JwtUtil.getEmail(token);
//        User user = userRepository.getEmail(email);
//        return UserDetailResponse.fromEntity(user);
        return null;
    }

    //사용자 정보 수정(
    public void modifyUser(String token) {
//        String email = JwtUtil.getEmail(token);
//        userDetailRepository.save(user);
    }

    //회원 탈퇴
    public void deleteUser(String token) {
//        String email = JwtUtil.getEmail(token);
//        userDetailRepository.delete(user);
    }
}
