import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { surveyAnswersState } from '../../atoms/surveyState'; // Recoil 상태 import
import LongNextButton from '../../components/LongNextButton';
import colors from '../../assets/colors';
import questions from './components/Questions';
import QuestionRender from './components/QuestionsRender';

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


const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 400px;
    margin-bottom: 0.125rem;
`;

const QuestionText = styled.div`
    color: #000;
    font-family: 'NanumGothic', sans-serif;
    font-size: 1.125rem;
    font-weight: 700;
    line-height: normal;
`;

const PreviousButton = styled.button`
    background-color: #3382E9;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    margin-bottom: 1rem;
    align-self: flex-start;
    position: sticky;
    top: 0;

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

function SurveyEdit() {
    const navigate = useNavigate();
    const [surveyAnswers, setSurveyAnswers] = useRecoilState(surveyAnswersState);
    const [localAnswers, setLocalAnswers] = useState(() => {
        const savedAnswers = localStorage.getItem('localAnswers');
        return savedAnswers ? JSON.parse(savedAnswers) : [...surveyAnswers];
    });

    const handlePreviousClick = () => {
      navigate(-1);
    };

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

    const handleOptionClick = (option, index) => {
        const updatedAnswers = [...localAnswers];
        updatedAnswers[index] = { ...updatedAnswers[index], answer: option };

        setLocalAnswers(updatedAnswers);
    };

    const handleSave = () => {
        setSurveyAnswers(localAnswers); 
        alert('설문 응답이 성공적으로 수정되었습니다.');
    };

    useEffect(() => {
        localStorage.setItem('localAnswers', JSON.stringify(localAnswers));
    }, [localAnswers]);

    return (
        <SurveyEditContainer>
            <PreviousButton onClick={handlePreviousClick}>
                이전
            </PreviousButton>
            {questions.map((question, index) => (
                <QuestionContainer key={index}>
                    <HeaderContainer>
                        <QuestionText>{question.question}</QuestionText>
                    </HeaderContainer>

                 {/* 질문 출력  */}
                <QuestionRender
                    key={index}
                    currentQuestion={question}
                    surveyAnswers={localAnswers}
                    handleInputChange={(e, fieldIndex) => handleInputChange(e, index, fieldIndex)}
                    handleOptionClick={(option) => handleOptionClick(option, index)}
                    currentStep={index + 1} 
                />
        
                </QuestionContainer>
            ))}

            <LongNextButton
              label="등록하기"
              onClick={handleSave}
              isSelected={true}
              bgColor={colors.main}
              borderColor={colors.main}
              textColor="white"
              width={'100%'}
            />
        </SurveyEditContainer>
    );
}

export default SurveyEdit;
