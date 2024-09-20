import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { surveyAnswersState } from '../../atoms/surveyState'; // Recoil 상태 import
import TextInput from '../../components/TextInput'; // TextInput 컴포넌트 import
import OptionButton from '../../components/OptionButton'; // OptionButton 컴포넌트 import
import styled from 'styled-components';

const SurveyEditContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80vw;
    margin: 2vh auto 0;
    position: relative;
`;

const QuestionContainer = styled.div`
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.8rem;
    margin-top: 1rem;
    width: 100%;
    max-width: 400px;
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 400px;
    margin-bottom: 1rem;
`;

const QuestionText = styled.div`
    color: #000;
    font-family: 'NanumGothic', sans-serif;
    font-size: 1.125rem;
    font-weight: 700;
    line-height: normal;
`;

const SaveButton = styled.button`
    background-color: #3382E9;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    margin-top: 1rem;
    width: 100%;
    max-width: 400px;

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

function SurveyEdit() {
    const [surveyAnswers, setSurveyAnswers] = useRecoilState(surveyAnswersState);
    const [localAnswers, setLocalAnswers] = useState([...surveyAnswers]); // 로컬 상태로 관리

    // 설문 데이터
    const questions = [
        {
            question: 'Q1. 생년월일을 입력해주세요.',
            type: 'date',
            label: '생년월일',
        },
        {
            question: 'Q2. 키와 몸무게를 입력해주세요.',
            type: 'multiple',
            fields: [
                { label: '키', placeholder: '키를 입력하세요', type: 'number', unit: 'cm', step: '0.01' },
                { label: '몸무게', placeholder: '몸무게를 입력하세요', type: 'number', unit: 'kg', step: '0.01' },
            ]
        },
        {
            question: 'Q3. 임신여부를 입력해주세요.',
            type: 'option',
            options: ['계획없음', '임신 준비중', '임신 중', '수유 중'],
        },
        {
            question: 'Q4. 약물 알러지를 입력해주세요',
            type: 'option',
            options: ['없음'],
        },
    ];

    // 입력값 변경 핸들러
    const handleInputChange = (e, index, fieldIndex = 0) => {
        const updatedAnswers = [...localAnswers];

        if (questions[index].type === 'multiple') {
            const multipleAnswers = [...(updatedAnswers[index].answer || ['', ''])];
            multipleAnswers[fieldIndex] = e.target.value;
            updatedAnswers[index] = { ...updatedAnswers[index], answer: multipleAnswers };
        } else {
            updatedAnswers[index] = { ...updatedAnswers[index], answer: e.target.value };
        }

        setLocalAnswers(updatedAnswers);
    };

    // 옵션 선택 핸들러
    const handleOptionClick = (option, index) => {
        const updatedAnswers = [...localAnswers];
        updatedAnswers[index] = { ...updatedAnswers[index], answer: option };
        setLocalAnswers(updatedAnswers);
    };

    // 저장 버튼 핸들러
    const handleSave = () => {
        setSurveyAnswers(localAnswers); // 최종 수정 사항 저장
        alert('설문 응답이 성공적으로 수정되었습니다.');
    };

    return (
        <SurveyEditContainer>
            {questions.map((question, index) => (
                <QuestionContainer key={index}>
                    <HeaderContainer>
                        <QuestionText>{question.question}</QuestionText>
                    </HeaderContainer>
                    {question.type === 'date' || question.type === 'text' ? (
                        <TextInput
                            label={question.label}
                            placeholder="입력해주세요"
                            value={localAnswers[index]?.answer || ''}
                            onChange={(e) => handleInputChange(e, index)}
                        />
                    ) : question.type === 'multiple' ? (
                        question.fields.map((field, fieldIndex) => (
                            <TextInput
                                key={fieldIndex}
                                label={field.label}
                                placeholder={field.placeholder}
                                value={localAnswers[index]?.answer[fieldIndex] || ''}
                                onChange={(e) => handleInputChange(e, index, fieldIndex)}
                                type={field.type}
                                unit={field.unit}
                                step={field.step}
                            />
                        ))
                    ) : question.type === 'option' ? (
                        <ButtonContainer>
                            {question.options.map((option, optionIndex) => (
                                <OptionButton
                                    key={optionIndex}
                                    label={option}
                                    onClick={() => handleOptionClick(option, index)}
                                    isSelected={localAnswers[index]?.answer === option}
                                />
                            ))}
                        </ButtonContainer>
                    ) : null}
                </QuestionContainer>
            ))}
            <SaveButton onClick={handleSave}>저장</SaveButton>
        </SurveyEditContainer>
    );
}

export default SurveyEdit;
