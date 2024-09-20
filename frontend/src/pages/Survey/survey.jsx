import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { currentStepState, surveyAnswersState } from '../../atoms/surveyState'; // Recoil 상태 import
import TextInput from '../../components/TextInput'; // TextInput 컴포넌트를 가져옵니다
import OptionButton from '../../components/OptionButton'; // OptionButton 컴포넌트를 가져옵니다
import LongNextButton from '../../components/LongNextButton'; // LongNextButton을 가져옵니다
import AddPillButton_ver1 from '../../components/AddPillButton_ver1'; // 방금 만든 AddPillButton 가져오기

const SurveyContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80vw;
    margin: 2vh auto 0;
    position: relative;
`;

const ContentContainer = styled.div`
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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

const PageIndicator = styled.div`
    color: #3382E9;
    font-family: 'NanumGothic', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: normal;
`;

const NavigationButton = styled.button`
    background-color: #3382E9;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    margin-bottom: 1rem;
    align-self: flex-start;
    z-index: 10;

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const Footer = styled.div`
    width: 100%;
    position: fixed;
    bottom: 3rem;
    display: flex;
    justify-content: center;
    padding: 3rem 0;
`;

const StyledTextInputContainer = styled.div`
    width: 100%;
    max-width: 400px;
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
`;

const AddPillButtonContainer = styled.div`
  margin-top: 1rem;
`

function Survey() {
    const [currentStep, setCurrentStep] = useRecoilState(currentStepState);
    const [surveyAnswers, setSurveyAnswers] = useRecoilState(surveyAnswersState);
    const navigate = useNavigate();

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

    const currentQuestion = questions[currentStep - 1];

    // 새로고침 시 로컬 스토리지에서 값 로드
    useEffect(() => {
        const savedStep = localStorage.getItem('currentStep');
        const savedAnswers = localStorage.getItem('surveyAnswers');

        if (savedStep) setCurrentStep(JSON.parse(savedStep));
        if (savedAnswers) setSurveyAnswers(JSON.parse(savedAnswers));
    }, [setCurrentStep, setSurveyAnswers]);

    // 상태가 변경될 때 로컬 스토리지에 저장
    useEffect(() => {
        localStorage.setItem('currentStep', JSON.stringify(currentStep));
        localStorage.setItem('surveyAnswers', JSON.stringify(surveyAnswers));
    }, [currentStep, surveyAnswers]);

    const handleInputChange = (e, index = 0) => {
        const updatedAnswers = [...surveyAnswers];

        if (currentQuestion.type === 'multiple') {
            const multipleAnswers = [...(updatedAnswers[currentStep - 1].answer || ['', ''])];
            multipleAnswers[index] = e.target.value;
            updatedAnswers[currentStep - 1] = { ...updatedAnswers[currentStep - 1], answer: multipleAnswers };
        } else {
            updatedAnswers[currentStep - 1] = { ...updatedAnswers[currentStep - 1], answer: e.target.value };
        }

        setSurveyAnswers(updatedAnswers);
    };

    const handleOptionClick = (option) => {
        const updatedAnswers = [...surveyAnswers];
        updatedAnswers[currentStep - 1] = { ...updatedAnswers[currentStep - 1], answer: option };

        setSurveyAnswers(updatedAnswers);
    };

    const isNextButtonActive = (() => {
        const currentAnswer = surveyAnswers[currentStep - 1].answer;
        if (Array.isArray(currentAnswer)) {
            return currentAnswer.every((answer) => answer !== '');
        }
        return currentAnswer !== '';
    })();

    const handleNextClick = () => {
        if (currentStep < questions.length) {
            setCurrentStep(currentStep + 1);
        }
        else if (currentStep === questions.length) {
          // 마지막 단계에서 surveyEdit 페이지로 이동
          navigate('/surveyEdit');
        }
    };

    const handlePreviousClick = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <SurveyContainer>
            <NavigationButton onClick={handlePreviousClick} disabled={currentStep === 1}>
                이전
            </NavigationButton>
            <HeaderContainer>
                <QuestionText>{currentQuestion.question}</QuestionText>
                <PageIndicator>{`${currentStep}/${questions.length}`}</PageIndicator>
            </HeaderContainer>

            <ContentContainer>
                {currentQuestion.type === 'text' ? (
                    <StyledTextInputContainer>
                        <TextInput
                            label={currentQuestion.label}
                            placeholder="입력해주세요"
                            value={surveyAnswers[currentStep - 1]?.answer || ''}
                            onChange={handleInputChange}
                        />
                    </StyledTextInputContainer>
                ) : currentQuestion.type === 'date' ? (
                    <StyledTextInputContainer>
                        <TextInput
                            label={currentQuestion.label}
                            placeholder="yyyy-mm-dd"
                            value={surveyAnswers[currentStep - 1]?.answer || ''}
                            onChange={handleInputChange}
                            isDateInput
                        />
                    </StyledTextInputContainer>
                ) : currentQuestion.type === 'multiple' ? (
                    currentQuestion.fields.map((field, index) => (
                        <StyledTextInputContainer key={index}>
                            <TextInput
                                label={field.label}
                                placeholder={field.placeholder}
                                value={surveyAnswers[currentStep - 1]?.answer[index] || ''}
                                onChange={(e) => handleInputChange(e, index)}
                                type={field.type}
                                unit={field.unit}
                                step={field.step}
                            />
                        </StyledTextInputContainer>
                    ))
                ) : currentQuestion.type === 'option' && currentStep === 4 ? (
                    <div>
                        <ButtonContainer>
                            {currentQuestion.options.map((option, index) => (
                                <OptionButton
                                    key={index}
                                    label={option}
                                    onClick={() => handleOptionClick(option)}
                                    isSelected={surveyAnswers[currentStep - 1]?.answer === option}
                                />
                            ))}
                        </ButtonContainer>
                        <AddPillButtonContainer>
                          <AddPillButton_ver1 text="알러지 추가" /> {/* AddPillButton 추가 */}
                        </AddPillButtonContainer>
                    </div>
                ) : currentQuestion.type === 'option' ? (
                    <ButtonContainer>
                        {currentQuestion.options.map((option, index) => (
                            <OptionButton
                                key={index}
                                label={option}
                                onClick={() => handleOptionClick(option)}
                                isSelected={surveyAnswers[currentStep - 1]?.answer === option}
                            />
                        ))}
                    </ButtonContainer>
                ) : null}
            </ContentContainer>

            <Footer>
                <LongNextButton
                    label="다음"
                    onClick={handleNextClick}
                    isSelected={isNextButtonActive}
                />
            </Footer>
        </SurveyContainer>
    );
}

export default Survey;
