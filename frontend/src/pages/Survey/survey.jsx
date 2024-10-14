
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate, useLocation } from 'react-router-dom';
import { currentStepState, surveyAnswersState } from '../../atoms/surveyState'; 
import LongNextButton from '../../components/LongNextButton'; 
import questions from './components/Questions';
import QuestionRender from './components/QuestionsRender';
import { userState } from '../../atoms/userState';
import { useRecoilValue } from 'recoil';
import colors from '../../assets/colors';

const SurveyContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2vh 0 0;
    position: relative;
`;

const ContentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    font-size: 1.125rem;
    font-weight: 700;
    line-height: normal;
`;

const PageIndicator = styled.div`
    color: #3382E9;
    font-size: 1rem;
    font-weight: 400;
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
    z-index: 10;

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const NextButton = styled.div`
    width: 100%;
    position: fixed;
    bottom: 3rem;
    display: flex;
    justify-content: center;
    padding: 3rem 0;
`;

function Survey() {
    const [currentStep, setCurrentStep] = useRecoilState(currentStepState);
    const [surveyAnswers, setSurveyAnswers] = useRecoilState(surveyAnswersState);
    const [selectedPills, setSelectedPills] = useState([]);
    const userInfo = useRecoilValue(userState);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('설문',surveyAnswers)
    })


    const handlePillSelect = (pill) => {
        setSelectedPills((prevSelected) => {
            if (prevSelected.includes('없음')) {
                const updatedPills = [pill];
                // localStorage.setItem('selectedPills', JSON.stringify(updatedPills)); // 로컬 저장
                return updatedPills; 
            }
            const updatedPills = [...new Set([...prevSelected, pill])];
            // localStorage.setItem('selectedPills', JSON.stringify(updatedPills)); // 로컬 저장
            return updatedPills;
        });
    };

      
    useEffect(() => {
        const passedPills = location.state?.selectedPills || [];
        if (passedPills.length > 0) {
            setSelectedPills((prevSelected) => {
                const updatedPills = [...new Set([...prevSelected, ...passedPills])];
                // localStorage.setItem('selectedPills', JSON.stringify(updatedPills)); // 로컬 저장
                updateSurveyAnswersWithPills(updatedPills);
                return updatedPills;
            });
        }
    }, [location.state?.selectedPills]);
    
    // 상태와 로컬 스토리지에 약물 저장하는 함수
    const savePillsToStateAndLocalStorage = (updatedPills) => {
        // Recoil 상태 업데이트
        const updatedAnswers = [...surveyAnswers];
        updatedAnswers[4] = {
            type: 'option-pill',
            answer: updatedPills,
            addedPills: updatedPills,
        };
        setSurveyAnswers(updatedAnswers);
    
        // 로컬 스토리지에도 저장
        // localStorage.setItem('selectedPills', JSON.stringify(updatedPills));
        // localStorage.setItem('surveyAnswers', JSON.stringify(updatedAnswers));
    };

    // '없음'을 선택하면 약물 목록 초기화
    const handleNoneSelected = () => {
        setSelectedPills([]); // 약물 초기화
        updateSurveyAnswersWithPills(['없음']); // '없음'만 선택
    };

    const updateSurveyAnswersWithPills = (pills) => {
        const updatedAnswers = [...surveyAnswers];
        updatedAnswers[4] = {
            type: 'option-pill',
            answer: pills.length > 0 ? pills : ['없음'],
            addedPills: pills,
        };
        setSurveyAnswers(updatedAnswers);
    };

    const currentQuestion = questions[currentStep - 1];  // 현재 질문 가져오기

    const handleInputChange = (e, index = 0) => {
        const updatedAnswers = [...surveyAnswers];

        if (!updatedAnswers[currentStep - 1]) {
            updatedAnswers[currentStep - 1] = { answer: '' };
        }

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
    
        if (currentStep === 4) { // 질문 4에 대한 응답 처리 (임신 여부)
            updatedAnswers[3] = { type: 'option', answer: option };
            setSurveyAnswers(updatedAnswers);
        } else if (currentStep === 5) { // 질문 5 (약물 알러지) 처리
            if (option === '없음') {
                handleNoneSelected(); // '없음' 선택 시 약물 초기화
            } else {
                handlePillSelect(option); // 약물 선택 처리
            }
    
            // 질문 5의 선택 상태를 저장
            updatedAnswers[4] = { type: 'option-pill', answer: option };
            setSurveyAnswers(updatedAnswers);
        } else {
            updatedAnswers[currentStep - 1] = { type: 'option', answer: option };
            setSurveyAnswers(updatedAnswers);
        }
    };

    
    const isNextButtonActive = (() => {
        const currentAnswer = surveyAnswers[currentStep - 1]?.answer;
        if (Array.isArray(currentAnswer)) {
            return currentAnswer.every((answer) => answer !== '');
        }
        return currentAnswer !== '';
    })();
  
      const handleNextClick = () => {
        if (currentStep < questions.length) {
            setCurrentStep(currentStep + 1);
        } else if (currentStep === questions.length) {
            // 마지막 단계에서 surveyAnswers가 충분한지 확인
            if (!surveyAnswers[currentStep - 1]) {
                // setSurveyAnswers([...surveyAnswers, { answer: '' }]);
                setSurveyAnswers({
                    ...surveyAnswers,
                    [currentStep - 1]: { answer: '' } // 새 키 추가
                });
            }
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
            <PreviousButton onClick={handlePreviousClick} disabled={currentStep === 1}>
                이전
            </PreviousButton>
            <HeaderContainer>
                <QuestionText>{currentQuestion.question}</QuestionText>
                <PageIndicator>{`${currentStep}/${questions.length}`}</PageIndicator>
            </HeaderContainer>

            <ContentContainer>
                <QuestionRender
                    currentQuestion={currentQuestion}
                    surveyAnswers={surveyAnswers}
                    setSurveyAnswers={setSurveyAnswers}
                    handleInputChange={handleInputChange}
                    handleOptionClick={handleOptionClick}
                    currentStep={currentStep}
                    selectedPills={selectedPills}  // 배열 전달
                    handlePillSelect={handlePillSelect}  // 배열에 값 추가하는 함수 전달
                />
            </ContentContainer>

            <NextButton>
                <LongNextButton
                    label="다음"
                    onClick={handleNextClick}
                    isSelected={isNextButtonActive}
                />
            </NextButton>
        </SurveyContainer>
    );
}

export default Survey;

