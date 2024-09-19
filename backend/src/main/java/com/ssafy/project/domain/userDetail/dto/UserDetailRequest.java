package com.ssafy.project.domain.userDetail.dto;

import com.ssafy.project.domain.userDetail.entity.Gender;
import com.ssafy.project.domain.userDetail.entity.Pregnancy;
import com.ssafy.project.domain.userDetail.entity.UserDetail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserDetailRequest {

    private LocalDate birth;
    private double height;
    private double weight;
    private Pregnancy pregnancy;
    private List<String> allergies;

    public static UserDetailRequest fromEntity(UserDetail userDetail) {
        return new UserDetailRequest(
                userDetail.getBirth(),
                userDetail.getHeight(),
                userDetail.getWeight(),
                userDetail.getPregnancy(),
                userDetail.getAllergies()
        );
    }
}
