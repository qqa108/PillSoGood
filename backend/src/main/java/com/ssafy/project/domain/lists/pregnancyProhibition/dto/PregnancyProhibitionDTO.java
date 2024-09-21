package com.ssafy.project.domain.lists.pregnancyProhibition.dto;

import com.ssafy.project.domain.lists.pregnancyProhibition.entity.PregnancyProhibition;
import com.ssafy.project.domain.medicine.entity.Medicine;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PregnancyProhibitionDTO {

    private int id;
    private int level;
    private String effect;
    private String name;

    public static PregnancyProhibitionDTO toDto(PregnancyProhibition pregnancyProhibition) {
        return PregnancyProhibitionDTO.builder()
                .id(pregnancyProhibition.getId())
                .level(pregnancyProhibition.getLevel())
                .effect(pregnancyProhibition.getEffect())
                .name(pregnancyProhibition.getName())
                .build();
    }
}
