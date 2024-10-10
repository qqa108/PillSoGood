package com.ssafy.project.domain.lists.ageProhibition.dto;

import com.ssafy.project.domain.lists.ageProhibition.entity.AgeField;
import com.ssafy.project.domain.lists.ageProhibition.entity.AgeProhibition;
import com.ssafy.project.domain.lists.ageProhibition.entity.AgeRange;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AgeProhibitionDTO {

    private int id;
    private String effect;
    private int age;
    private AgeField ageField;
    private AgeRange ageRange;
    private String name;

    public static AgeProhibitionDTO toDto(AgeProhibition ageProhibition) {
        return AgeProhibitionDTO.builder()
                .id(ageProhibition.getId())
                .effect(ageProhibition.getEffect())
                .age(ageProhibition.getAge())
                .ageField(ageProhibition.getAgeField())
                .ageRange(ageProhibition.getAgeRange())
                .name(ageProhibition.getName())
                .build();
    }
}
