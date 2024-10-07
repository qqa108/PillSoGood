import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { surveyAnswersState } from '../../atoms/surveyState'; // Recoil 상태 import
import useAxios from '../../hook/useAxiosPost';
import { REGISTER, MODIFY } from '../../assets/apis'; 
import LongNextButton from '../../components/LongNextButton';
import colors from '../../assets/colors';
import questions from './components/Questions';
import QuestionRender from './components/QuestionsRender';
import { userState } from '../../atoms/userState'; // userState import

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
    const userInfo = useRecoilValue(userState); // 유저 정보 가져오기
    const { data: registerData, loading: registerLoading, error: registerError, fetchData: fetchData } = useAxios(REGISTER, 'POST');
    const { data: modifyData, loading: modifyLoading, error: modifyError, fetchData: modifyFetchData } = useAxios(MODIFY, 'PATCH');
    
    const navigate = useNavigate();
    const [surveyAnswers, setSurveyAnswers] = useRecoilState(surveyAnswersState);
    const [localAnswers, setLocalAnswers] = useState(() => {
        const savedAnswers = localStorage.getItem('localAnswers');
        return savedAnswers ? JSON.parse(savedAnswers) : [...surveyAnswers];
    });

    // 이전 설문 과정에서 저장된 약물 데이터 초기화
    const [selectedPills, setSelectedPills] = useState(() => {
        const previousPills = localAnswers[4]?.answer || [];
        return Array.isArray(previousPills) ? previousPills : [];
    });

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

    const handleNoneSelected = (index) => {
        setSelectedPills([]); // 약물 초기화
        const updatedAnswers = [...localAnswers];
        updatedAnswers[index] = { ...updatedAnswers[index], answer: '없음' };
        setLocalAnswers(updatedAnswers);
    };

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
            const familyAnswer = localAnswers[0]?.answer[1] || ''; // 가족관계에 대한 답변 가져오기
            const pregnancyMap = {
                '계획없음': 'NONE',
                '임신 준비중': 'POSSIBLE',
                '임신 중': 'PREGNANT',
                '수유 중': 'NURSING',
            };

            const formatDate = (dateString) => {
                const date = new Date(dateString);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            };

            const formattedBirth = localAnswers[1]?.answer ? formatDate(localAnswers[1].answer) : '';

            const requestData = {
                birth: formattedBirth,
                height: parseFloat(localAnswers[2]?.answer[0] || 0),
                weight: parseFloat(localAnswers[2]?.answer[1] || 0),
                gender: '남자',
                pregnancy: pregnancyMap[localAnswers[3]?.answer] || '',
                allergies: selectedPills.length > 0 ? selectedPills : ['없음'],
                family: familyAnswer,
            };

            const family = localAnswers[0]?.answer[1] || '';
        if (family === '나' || family === '본인' || family === userInfo.name) {
            const modifyUrl = MODIFY(family); // MODIFY URL에 family 파라미터를 쿼리로 추가
            await fetchData(modifyUrl, 'PATCH', requestData); // PATCH 요청으로 수정
            alert('설문 응답이 성공적으로 수정되었습니다.');
        } else {
            await fetchData(REGISTER, 'POST', requestData); // POST 요청으로 새로운 설문 등록
            alert('설문 응답이 성공적으로 등록되었습니다.');
        }

            localStorage.removeItem('surveyAnswers');
            localStorage.removeItem('localAnswers');
            localStorage.removeItem('currentStep');
            setSurveyAnswers([]);
            navigate('/home');
        } catch (error) {
            console.error('API 오류:', error);
            alert('설문 응답 등록 중 오류가 발생했습니다.');
        }
    };

    useEffect(() => {
        localStorage.setItem('localAnswers', JSON.stringify(localAnswers));
    }, [localAnswers]);

    return (
        <SurveyEditContainer>
            {questions.map((question, index) => (
                <QuestionContainer key={index}>
                    <HeaderContainer>
                        <QuestionText>{question.question}</QuestionText>
                    </HeaderContainer>

                    <QuestionRender
                        key={index}
                        currentQuestion={question}
                        surveyAnswers={localAnswers}
                        handleInputChange={(e, fieldIndex) => handleInputChange(e, index, fieldIndex)}
                        handleOptionClick={(option) => handleOptionClick(option, index)}
                        currentStep={index + 1}
                        handlePillSelect={(pill) => handlePillSelect(pill, index)}  // 알약 선택 함수 전달
                        handleNoneSelected={() => handleNoneSelected(index)}  // '없음' 선택 함수 전달
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
