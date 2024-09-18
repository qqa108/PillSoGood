package com.ssafy.project.domain.userDetail.dto;

import com.ssafy.project.domain.userDetail.entity.Gender;
import com.ssafy.project.domain.userDetail.entity.Pregnancy;
import com.ssafy.project.domain.userDetail.entity.UserDetail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserDetailResponse {
    private String name;
    private String email;
    private LocalDate birth;
    private Gender gender;
    private double height;
    private double weight;
    private Pregnancy pregnancy;
    private List<String> allergies;
    private List<String> family;

    public static UserDetailResponse fromEntity(UserDetail userDetail) {
        return new UserDetailResponse(
                userDetail.getUser().getEmail(),
                userDetail.getUser().getName(),
                userDetail.getBirth(),
                userDetail.getGender(),
                userDetail.getHeight(),
                userDetail.getWeight(),
                userDetail.getPregnancy(),
                userDetail.getAllergies(),
                userDetail.getFamily()
        );
    }
}
