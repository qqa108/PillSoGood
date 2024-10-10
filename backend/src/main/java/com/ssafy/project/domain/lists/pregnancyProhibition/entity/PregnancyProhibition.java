package com.ssafy.project.domain.lists.pregnancyProhibition.entity;

import com.ssafy.project.domain.medicine.entity.Medicine;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor (access = AccessLevel.PROTECTED)
@AllArgsConstructor (access = AccessLevel.PRIVATE)
@Builder
public class PregnancyProhibition {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    private int id;

    @OneToOne (fetch = FetchType.LAZY)
    @JoinColumn (name = "medicine_id", referencedColumnName = "id")
    private Medicine medicine;

    @Column (name = "level")
    private int level;

    @Column (name = "effect", columnDefinition = "TEXT")
    private String effect;

    @Column (name = "name", columnDefinition = "TEXT")
    private String name;
}
