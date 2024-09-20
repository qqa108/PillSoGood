package com.ssafy.project.domain.medicine.entity;

import com.ssafy.project.domain.lists.medicineInformation.entity.MedicineInformation;
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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "kor_name", nullable = false, columnDefinition = "TEXT")
    private String korName;

    @Column(name = "eng_name", columnDefinition = "TEXT")
    private String engName;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "category")
    private Category category;

    @Column(name = "company", columnDefinition = "TEXT")
    private String company;

    @Column(name = "drug_form", columnDefinition = "TEXT")
    private String drugForm;

    @Column(name = "characters", columnDefinition = "TEXT")
    private String characters;

    @Column(name = "kind", columnDefinition = "TEXT")
    private String kind;

    @Column(name = "effect", columnDefinition = "TEXT")
    private String effect;

    @Column(name = "usages", columnDefinition = "TEXT")
    private String usages;

    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_medication_detail_id", referencedColumnName = "id")
    private UserMedicationDetail userMedicationDetail;

    @OneToMany(mappedBy = "medicine", fetch = FetchType.LAZY)
    private List<MedicineInformation> medicineInformation;
}
