package com.ssafy.project.domain.medicine.entity;

import com.ssafy.project.domain.userMedicationDetail.entity.UserMedicationDetail;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class Medicine {

    @EmbeddedId
    private MedicineId medicineId;

    @Column(name = "kor_name", nullable = false)
    private String korName;

    @Column(name = "eng_name")
    private String engName;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "category")
    private Category category;

    @Column(name = "company")
    private String company;

    @Column(name = "drug_form")
    private String drugForm;

    @Column(name = "characters")
    private String characters;

    @Column(name = "kind")
    private String kind;

    @Column(name = "effect")
    private String effect;

    @Column(name = "usages")
    private String usages;

    @Column(name = "image_url")
    private String imageUrl;

    @OneToMany(mappedBy = "medicine", fetch = FetchType.LAZY)
    private List<UserMedicationDetail> userMedicationDetailList;
}
