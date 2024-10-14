package com.ssafy.project.domain.lists.amountProhibition.dto;

import com.ssafy.project.domain.lists.amountProhibition.entity.AmountProhibition;
import com.ssafy.project.domain.lists.amountProhibition.entity.Field;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AmountProhibitionDTO {

    private int id;
    private double amount;
    private double limits;
    private String name;
    private Field field;

    public static AmountProhibitionDTO toDto(AmountProhibition amountProhibition) {
        return AmountProhibitionDTO.builder()
                .id(amountProhibition.getId())
                .amount(amountProhibition.getAmount())
                .limits(amountProhibition.getLimits())
                .name(amountProhibition.getName())
                .field(amountProhibition.getField())
                .build();
    }
}
