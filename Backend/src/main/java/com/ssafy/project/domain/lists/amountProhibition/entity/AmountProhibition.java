package com.ssafy.project.domain.lists.amountProhibition.entity;

import com.ssafy.project.domain.medicine.entity.Medicine;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor (access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class AmountProhibition {
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

    @Column (name = "amount")
    private double amount;

    @Column (name = "limits")
    private double limits;

    @Column (name = "name")
    private String name;

    @Enumerated (EnumType.STRING)
    @Column (name = "field")
    private Field field;
}
