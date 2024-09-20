package com.ssafy.project.domain.userDetail.repository;

import com.ssafy.project.domain.user.entity.User;
import com.ssafy.project.domain.userDetail.entity.UserDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDetailRepository extends JpaRepository<UserDetail, Integer> {
    Optional<UserDetail> findByUser(User user);
}
