import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { surveyAnswersState } from '../../atoms/surveyState'; // Recoil 상태 import
import axios from 'axios';
import { REGISTER } from '../../assets/apis'; 
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

    // 이전 설문 과정에서 저장된 약물 데이터 초기화
    const [selectedPills, setSelectedPills] = useState(() => {
        // 약물 알러지 관련 데이터가 5번째 질문에 있다고 가정하고 불러옵니다.
        const previousPills = localAnswers[4]?.answer || [];
        return Array.isArray(previousPills) ? previousPills : [];
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

    // '없음' 버튼 클릭 시 처리
    const handleNoneSelected = (index) => {
        setSelectedPills([]); // 약물 초기화
        const updatedAnswers = [...localAnswers];
        updatedAnswers[index] = { ...updatedAnswers[index], answer: '없음' };
        setLocalAnswers(updatedAnswers);
    };

    // 알약 선택 처리 함수
    const handlePillSelect = (pill, index) => {
        setSelectedPills((prevSelected) => {
            const updatedPills = [...new Set([...prevSelected, pill])];  // 중복 방지
            const updatedAnswers = [...localAnswers];
            updatedAnswers[index] = { ...updatedAnswers[index], answer: updatedPills };
            setLocalAnswers(updatedAnswers);
            return updatedPills;
        });
    };

    const handleSave = async () => {
        try {
            // 설문 데이터를 API에 맞게 변환
            const requestData = {
                birth: localAnswers[1]?.answer || '', // 생년월일
                height: parseFloat(localAnswers[2]?.answer[0] || 0), // 키
                weight: parseFloat(localAnswers[2]?.answer[1] || 0), // 몸무게
                gender: '남자', // 성별 (일단 남성으로 설정)
                pregnancy: localAnswers[3]?.answer || '', // 임신 여부
                allergies: selectedPills.length > 0 ? selectedPills : ['없음'], // 알러지 약물
                family: localAnswers[0]?.answer[1] || '', // 관계
            };

            // API 호출
            const response = await axios.post(REGISTER, requestData);
            console.log('등록 완료:', response.data);

            alert('설문 응답이 성공적으로 등록되었습니다.');
            navigate('/home')
        } catch (error) {
            console.error('API 등록 오류:', error);
            alert('설문 응답 등록 중 오류가 발생했습니다.');
        }
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
                    handlePillSelect={(pill) => handlePillSelect(pill, index)}  // 알약 선택 함수 전달
                    handleNoneSelected={() => handleNoneSelected(index)}  // '없음' 선택 함수 전달
                    // selectedPills={selectedPills}  // 선택된 알약 전달
                    selectedPills={index === 4 ? selectedPills : []}
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
