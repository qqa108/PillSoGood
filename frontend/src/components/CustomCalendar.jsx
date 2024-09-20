import React, { useState } from 'react';
import styled from 'styled-components';

// 화살표 버튼 스타일
const ArrowButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: white;
    font-size: 1.5rem;
    outline: none;

    &:disabled {
        color: #ccc;
    }
`;

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
`;

const DropdownWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const YearMonthDropdown = styled.select`
    font-size: 1rem;
    margin: 0 5px;
    border-radius: 0.375rem;
    outline: none;
`;

const YearMonthText = styled.span`
    cursor: pointer;
    font-size: 1rem;
    margin: 0 5px;
`;

function CustomCalendarHeader({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled
}) {
    const [editYear, setEditYear] = useState(false);  // 연도 드롭다운 상태
    const [editMonth, setEditMonth] = useState(false);  // 월 드롭다운 상태

    return (
        <HeaderWrapper>
            <ArrowButton onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                {"<"}
            </ArrowButton>
            <DropdownWrapper>
                {/* 월 드롭다운 전환 */}
                {editMonth ? (
                    <YearMonthDropdown
                        value={date.getMonth()}
                        onChange={({ target: { value } }) => {
                            changeMonth(value);
                            setEditMonth(false);  // 선택 후 닫기
                        }}
                    >
                        {Array.from({ length: 12 }, (v, i) => (
                            <option key={i} value={i}>
                                {new Date(0, i).toLocaleString('ko-KR', { month: 'long' })}
                            </option>
                        ))}
                    </YearMonthDropdown>
                ) : (
                    <YearMonthText onClick={() => setEditMonth(true)}>
                        {date.toLocaleString('ko-KR', { month: 'long' })} {/* 현재 월 */}
                    </YearMonthText>
                )}

                {/* 연도 드롭다운 전환 */}
                {editYear ? (
                    <YearMonthDropdown
                        value={date.getFullYear()}
                        onChange={({ target: { value } }) => {
                            changeYear(value);
                            setEditYear(false);  // 선택 후 닫기
                        }}
                    >
                        {Array.from({ length: 50 }, (v, i) => (
                            <option key={i} value={date.getFullYear() - 25 + i}>
                                {date.getFullYear() - 25 + i}
                            </option>
                        ))}
                    </YearMonthDropdown>
                ) : (
                    <YearMonthText onClick={() => setEditYear(true)}>
                        {date.getFullYear()}년
                    </YearMonthText>
                )}
            </DropdownWrapper>
            <ArrowButton onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                {">"}
            </ArrowButton>
        </HeaderWrapper>
    );
}

export default CustomCalendarHeader;
