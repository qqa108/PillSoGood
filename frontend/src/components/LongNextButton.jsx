import React from 'react';
import styled from 'styled-components';
import colors from '../assets/colors';

// 공통 스타일
const BaseButton = styled.button.attrs((props) => ({
    bgColor: undefined, 
    borderColor: undefined, 
    textColor: undefined, 
    marginBottom: undefined
  }))`
      width: ${(props) => props.width || '80%'};
      height: 2.875rem;
      flex-shrink: 0;
      border-radius: 0.625rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
      margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '5.5rem')}; 
  `;

// 활성 버튼 (테두리, 배경, 글씨 색 바꾸고 싶으면 props로 직접 넘겨주기)
const EnabledButton = styled(BaseButton)`
    border: 1px solid ${(props) => props.borderColor || colors.point1};  
    background-color: ${(props) => props.bgColor || colors.point3};    
    color: ${(props) => props.textColor || colors.point1};        
    cursor: pointer; 
    pointer-events: auto;  

    &:hover {
        background-color: #e6f0ff;  
    }
`;

// 비활성 버튼
const DisabledButton = styled(BaseButton)`
    border: 1px solid ${colors.disableText};  
    background-color: ${colors.point4};  
    color: ${colors.disableText};   
    cursor: not-allowed;  
    pointer-events: none; 

    &:hover {
        background-color:#F0F0F0;  
    }
`;


function LongNextButton({ label, onClick, isSelected, width, bgColor, borderColor, textColor,marginBottom}) {
    return isSelected ? (
        <EnabledButton 
            onClick={onClick} 
            width={width}
            bgColor={bgColor} 
            borderColor={borderColor} 
            textColor={textColor}
            marginBottom={marginBottom}
        >
            {label}
        </EnabledButton>
    ) : (
        <DisabledButton 
            disabled={!isSelected}
            width={width}
            marginBottom={marginBottom}
        >
            {label}
        </DisabledButton>
    );
}

export default LongNextButton;
