package com.ssafy.project.domain.lists.medicineInformation.entity;

import com.ssafy.project.domain.lists.medicineInformation.dto.MedicineInformationDTO;
import com.ssafy.project.domain.medicine.entity.Medicine;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class MedicineInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "information", columnDefinition = "TEXT")
    private String information;

    // Medicine과의 다대일 관계 설정
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicine_id", referencedColumnName = "id")
    private Medicine medicine;

    // MedicineInformation 엔티티를 MedicineInformationDTO로 변환하는 메서드
    public MedicineInformationDTO toDTO() {
        return MedicineInformationDTO.builder()
                .id(this.id)
                .information(this.information)
                .build();
    }
}
