package com.ssafy.project.domain.userDetail.repository;

import com.ssafy.project.domain.userDetail.entity.UserDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDetailRepository extends JpaRepository<UserDetail, Integer> {
}
