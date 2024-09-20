import React from 'react';
import styled from 'styled-components';

// 버튼 스타일 정의
const Button = styled.button`
    width: 18rem;
    height: 2.875rem;
    flex-shrink: 0;
    border-radius: 0.625rem;
    border: 1px solid ${(props) => (props.isSelected ? '#3382E9' : '#A9A9A9')};  // 활성화 상태에 따른 테두리 색상
    background-color: ${(props) => (props.isSelected ? '#FFF' : '#F0F0F0')};  // 비활성화일 경우 배경 색상
    color: ${(props) => (props.isSelected ? '#3382E9' : '#A9A9A9')};  // 활성화 상태에 따른 글자 색상
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${(props) => (props.isSelected ? 'pointer' : 'not-allowed')};  // 비활성화일 경우 클릭 불가
    pointer-events: ${(props) => (props.isSelected ? 'auto' : 'none')};  // 비활성화 시 클릭 이벤트 차단
    transition: background-color 0.3s, color 0.3s;  // 배경색과 글자색 전환 효과

    &:hover {
        background-color: ${(props) => (props.isSelected ? '#e6f0ff' : '#F0F0F0')};  // 활성화 상태에서만 hover 효과
    }
`;

// 버튼 컴포넌트
function LongNextButton({ label, onClick, isSelected }) {
    return (
        <Button onClick={onClick} isSelected={isSelected} disabled={!isSelected}>
            {label}
        </Button>
    );
}

export default LongNextButton;
