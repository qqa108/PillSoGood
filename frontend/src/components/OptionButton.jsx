import React from 'react';
import styled from 'styled-components';

// 버튼 스타일
const Button = styled.button`
    width: 8.625rem;
    height: 2.671rem;
    border-radius: 3.75rem;
    border: 0.06rem solid #033075;
    background-color: ${(props) => (props.isSelected ? '#EBF3FF' : '#FFF')};  // 선택 여부에 따라 배경색 변경
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const ButtonText = styled.div`
    text-align: center;
    font-family: 'NanumGothic', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    color: #000;
`;

function OptionButton({ label, onClick, isSelected }) {
    return (
        <Button onClick={onClick} isSelected={isSelected}>
            <ButtonText>{label}</ButtonText>
        </Button>
    );
}

export default OptionButton;
