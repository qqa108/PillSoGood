package com.ssafy.project.domain.lists.combinationProhibition.entity;

import com.ssafy.project.domain.medicine.entity.Medicine;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor (access = AccessLevel.PROTECTED)
public class CombinationProhibition {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    private int id;

    @ManyToOne
    @JoinColumn (name = "medicine_id_A", referencedColumnName = "id", nullable = false)
    private Medicine medicineIdA;

    @ManyToOne
    @JoinColumn (name = "medicine_id_B", referencedColumnName = "id", nullable = false)
    private Medicine medicineIdB;

    @ManyToOne
    @JoinColumn (name = "medicine_code_A", referencedColumnName = "code", nullable = false)
    private Medicine medicineCodeA;

    @ManyToOne
    @JoinColumn (name = "medicine_code_B", referencedColumnName = "code", nullable = false)
    private Medicine medicineCodeB;

    @Column (name = "effect")
    private String effect;

    @Column (name = "name_A")
    private String nameA;

    @Column (name = "name_B")
    private String nameB;
}
