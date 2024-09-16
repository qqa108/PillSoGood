package com.ssafy.project.domain.medicine.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor (access = AccessLevel.PROTECTED)
public class Medicine {
    @EmbeddedId
    private MedicineKey medicineKey;

    @Column (name = "kor_name", nullable = false)
    private String korName;

    @Column (name = "eng_name")
    private String engName;

    @Enumerated (EnumType.STRING)
    @Column (name = "category")
    private Category category;

    @Column (name = "company")
    private String company;

    @Column (name = "drug_form")
    private String drugForm;

    @Column (name = "character")
    private String character;

    @Column (name = "kind")
    private String kind;

    @Column (name = "effect")
    private String effect;

    @Column (name = "usage")
    private String usage;

    @Column (name = "image_url")
    private String imageUrl;
}
