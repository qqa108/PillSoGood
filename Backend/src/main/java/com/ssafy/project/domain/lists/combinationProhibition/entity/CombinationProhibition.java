package com.ssafy.project.domain.lists.combinationProhibition.entity;

import com.ssafy.project.domain.medicine.entity.Medicine;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor (access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class CombinationProhibition {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    private int id;

    // 첫 번째 약물
    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "medicine_id_A", referencedColumnName = "medicineId"),
            @JoinColumn(name = "medicine_code_A", referencedColumnName = "code")
    })
    private Medicine medicineA;

    // 두 번째 약물
    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "medicine_id_B", referencedColumnName = "medicineId"),
            @JoinColumn(name = "medicine_code_B", referencedColumnName = "code")
    })
    private Medicine medicineB;


    @Column (name = "effect")
    private String effect;

    @Column (name = "name_A")
    private String nameA;

    @Column (name = "name_B")
    private String nameB;
}
