package com.ssafy.project.domain.lists.amountProhibition.entity;

import com.ssafy.project.domain.medicine.entity.Medicine;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor (access = AccessLevel.PROTECTED)
public class AmountProhibitionEntity {
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

    @Column (name = "amount")
    private double amount;

    @Column (name = "limit")
    private double limit;

    @Column (name = "name")
    private String name;

    @Enumerated (EnumType.STRING)
    @Column (name = "field")
    private Field field;
}
