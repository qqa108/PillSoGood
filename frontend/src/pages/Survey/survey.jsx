import styled from 'styled-components';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { currentStepState, surveyAnswersState } from '../../atoms/surveyState'; 
import LongNextButton from '../../components/LongNextButton'; 
import questions from './components/Questions'
import QuestionRender from './components/QuestionsRender';

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
    const navigate = useNavigate();

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
  
      // 현재 step의 답변이 존재하는지 확인, 없으면 기본값 설정
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
  
      // 현재 step의 답변이 존재하는지 확인, 없으면 기본값 설정
      if (!updatedAnswers[currentStep - 1]) {
          updatedAnswers[currentStep - 1] = { answer: '' };
      }
  
      updatedAnswers[currentStep - 1] = { ...updatedAnswers[currentStep - 1], answer: option };
  
      setSurveyAnswers(updatedAnswers);
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
              setSurveyAnswers([...surveyAnswers, { answer: '' }]);
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
                handleInputChange={handleInputChange}
                handleOptionClick={handleOptionClick}
                currentStep={currentStep}
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
