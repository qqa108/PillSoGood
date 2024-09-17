package com.ssafy.project.domain.user.service;

import com.ssafy.project.domain.user.dto.UserDto;
import com.ssafy.project.domain.user.entity.User;
import com.ssafy.project.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserLoginService {
    private final UserRepository userRepository;

    @Autowired
    public UserLoginService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public UserDto findOrCreateUser(UserDto userDto) {
        String kakaoKey = userDto.getKakaoKey();

        Optional<User> existingUser = userRepository.findByKakaoKey(kakaoKey);

        if (existingUser.isPresent()) {
            // User 엔티티를 UserDto로 변환하여 반환
            return toDto(existingUser.get());
        } else {
            // 신규 사용자 생성 및 저장
            User newUser = User.builder()
                    .kakaoKey(kakaoKey)
                    .email(userDto.getEmail())
                    .name(userDto.getName())
                    .flag(true)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();

            // 엔티티 저장 후 DTO로 변환하여 반환
            User savedUser = userRepository.save(newUser);
            return toDto(savedUser);
        }
    }

    // User 엔티티를 UserDto로 변환하는 메서드
    private UserDto toDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .kakaoKey(user.getKakaoKey())
                .flag(user.isFlag())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    public void storeRefreshToken(int userId, String token) {
//        userLoginMapper.storeRefreshToken(userId, token);
    }

    public void invalidateRefreshToken(int userId) {
//        userLoginMapper.invalidateRefreshToken(userId);
    }

    public int getUserIdByRefreshToken(String refreshToken) {
        return 0;
//        return userLoginMapper.getUserIdByRefreshToken(refreshToken);
    }

    public String getRefreshTokenByUserId(int userId) {
        return "";
//        return userLoginMapper.getRefreshTokenByUserId(userId);
    }


}