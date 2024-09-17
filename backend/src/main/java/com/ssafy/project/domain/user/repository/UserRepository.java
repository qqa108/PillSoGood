package com.ssafy.project.domain.user.repository;

import com.ssafy.project.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByKakaoKey(String kakaoId);
    Optional<User> findByRefreshToken(String refreshToken);
}
