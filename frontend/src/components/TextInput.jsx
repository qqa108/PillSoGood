import { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import CustomCalendar from './CustomCalendar';  // 커스텀 헤더 컴포넌트 임포트

const TextInputContainer = styled.div`
    width: 100%;
    margin-top: 0.825rem;
`;

// 소제목 스타일 정의
const Label = styled.div`
    display: flex;
    width: 100%;
    height: 1.75rem;
    margin-bottom: 0.3rem;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #000;
    font-size: 1rem;
    font-weight: 400;
    line-height: normal;
`;

const InputBox = styled.input`
    width: 100%;
    height: 2.75rem;
    padding-right: 3rem; /* 단위 표시를 위한 공간 확보 */
    border-radius: 0.3125rem;
    border: 0.03125rem solid #A9A9A9;
    background: #FFF;
    padding: 0.625rem;
    box-sizing: border-box;
    font-size: 1rem;
    outline: none;

    &:focus {
        border-color: #000;
    }
`;

const CalendarIcon = styled(FaCalendarAlt)`
    position: absolute;
    right: 0.875rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #A9A9A9;
`;

const InputContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
`;

const UnitLabel = styled.span`
    position: absolute;
    right: 1rem;
    color: #888;
    font-size: 1rem;
    font-family: 'NanumGothic', sans-serif;
`;

const CalendarContainer = styled.div`
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    z-index: 999;
    background-color: #fff;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 0.3125rem;
    overflow: hidden;

    .react-datepicker__header {
        background-color: #3382E9;
        color: white;
    }
`;

function TextInput({ label, value, onChange, placeholder, isDateInput, type = 'text', step = 'any', unit }) {
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onChange({ target: { value: date.toLocaleDateString('ko-KR') } });
        setShowCalendar(false);
    };

    return (
        <TextInputContainer>
            {label && <Label>{label}</Label>}
            <InputContainer>
                <InputBox
                    type={type}    // text 인지 number인지 넘겨주기
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    readOnly={isDateInput}
                    step={step}    // number일떄 표현할 소수점 자리
                />
                {unit && <UnitLabel>{unit}</UnitLabel>} {/* 단위를 추가로 표시 */}
                {isDateInput && (
                    <>
                        <CalendarIcon onClick={() => setShowCalendar(!showCalendar)} />
                        {showCalendar && (
                            <CalendarContainer>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    inline
                                    locale="ko"
                                    dateFormat="yyyy/MM/dd"
                                    renderCustomHeader={(props) => (
                                        <CustomCalendar {...props} />
                                    )}
                                />
                            </CalendarContainer>
                        )}
                    </>
                )}
            </InputContainer>
        </TextInputContainer>
    );
}

export default TextInput;
