package com.ssafy.project.domain.lists.medicineInformation.entity;

import com.ssafy.project.domain.medicine.entity.Medicine;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor (access = AccessLevel.PROTECTED)
public class MedicineInformationEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    private int id;

    @ManyToOne
    @JoinColumn (name = "medicine_id", referencedColumnName = "id", nullable = false)
    private Medicine medicineId;

    @ManyToOne
    @JoinColumn (name = "medicine_code", referencedColumnName = "code", nullable = false)
    private Medicine medicineCode;

    @Column (name = "information")
    private String information;
}
