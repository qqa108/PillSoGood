package com.ssafy.project.domain.userDetail.repository;

import com.ssafy.project.domain.user.entity.User;
import com.ssafy.project.domain.userDetail.entity.UserDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserDetailRepository extends JpaRepository<UserDetail, Integer> {
    List<UserDetail> findAllByUser(User user);

    Optional<UserDetail> findByUserIdAndFamily(int userId, String family); //가족 관계에 대한 정보를 중복해서 db에 넣지 않기 위함
}
