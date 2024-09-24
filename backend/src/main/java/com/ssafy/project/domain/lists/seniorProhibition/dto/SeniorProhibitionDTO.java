package com.ssafy.project.domain.lists.seniorProhibition.dto;

import com.ssafy.project.domain.lists.seniorProhibition.entity.SeniorProhibition;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SeniorProhibitionDTO {

    private int id;
    private String effect;
    private String name;

    public static SeniorProhibitionDTO toDto(SeniorProhibition seniorProhibition) {
        return SeniorProhibitionDTO.builder()
                .id(seniorProhibition.getId())
                .effect(seniorProhibition.getEffect())
                .name(seniorProhibition.getName())
                .build();
    }
}
