package com.ssafy.project.domain.lists.ageProhibition.entity;

import com.ssafy.project.domain.medicine.entity.Medicine;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor (access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class AgeProhibition {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    private int id;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "medicine_id", referencedColumnName = "medicineId"),
            @JoinColumn(name = "medicine_code", referencedColumnName = "code")
    })
    private Medicine medicine;

    @Column (name = "effect")
    private String effect;

    @Column (name = "age")
    private int age;

    @Enumerated (EnumType.STRING)
    @Column (name = "age_field")
    private AgeField ageField;

    @Enumerated (EnumType.STRING)
    @Column (name = "age_range")
    private AgeRange ageRange;

    @Column (name = "name")
    private String name;
}
