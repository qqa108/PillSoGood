package com.ssafy.project.domain.userDetail.entity;

import com.ssafy.project.domain.user.entity.User;
import com.ssafy.project.domain.userMedication.entity.UserMedication;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@ToString
public class UserDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "family", nullable = false)
    private String family; //가족 정보

    @Column(name = "birth")
    private LocalDate birth;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @Column(name = "height")
    private double height;

    @Column(name = "weight")
    private double weight;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "pregnancy")
    private Pregnancy pregnancy;

    @Column(name = "allergy")
    private String allergy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "userDetail", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<UserMedication> userMedicationList;

    // 알러지 리스트
    public List<String> getAllergies() {
        return Arrays.asList(this.allergy.split(","));
    }

    // 가족 리스트
    public List<String> getFamily() {
        return Arrays.asList(this.family.split(","));
    }

    // 알러지를 업데이트하는 메서드
    public void updateAllergies(List<String> allergies) {
        this.allergy = String.join(",", allergies);
    }

    // 가족 정보 업데이트 메서드
    public void updateFamily(String family) {
        this.family = family;
    }

    // height 업데이트 메서드
    public void updateHeight(double height) {
        if (height > 0) {
            this.height = height;
        }
    }

    // weight 업데이트 메서드
    public void updateWeight(double weight) {
        if (weight > 0) {
            this.weight = weight;
        }
    }

    // pregnancy 업데이트 메서드
    public void updatePregnancy(Pregnancy pregnancy) {
        this.pregnancy = pregnancy;
    }

    // birth 업데이트 메서드
    public void updateBirth(LocalDate birth) {
        this.birth = birth;
    }

    // 성별 업데이트 메서드
    public void updateGender(Gender gender) {
        this.gender = gender;
    }
}
