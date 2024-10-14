package com.ssafy.project.domain.lists.pregnancyProhibition.dto;

import com.ssafy.project.domain.lists.pregnancyProhibition.entity.PregnancyProhibition;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
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
