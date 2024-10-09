import { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextInput from '../../components/TextInput';
import OptionButton from '../../components/OptionButton';
import LongNextButton from '../../components/LongNextButton';
import AddPillButton_ver1 from '../../components/AddPillButton_ver1';
import useAxios from '../../hook/useAxiosPost';
import { MODIFY } from '../../assets/apis';
import colors from '../../assets/colors';
import { useNavigate } from 'react-router-dom';
import { surveyAnswersState } from '../../atoms/surveyState';
import { useRecoilState } from 'recoil';
import { useResetRecoilState } from 'recoil';
import { IoClose } from 'react-icons/io5';

const SurveyUpdateContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80vw;
    /* margin: 2vh auto 0; */
    position: relative;
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 0.125rem;
`;

const QuestionText = styled.div`
    color: #000;
    line-height: normal;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.8rem;
  margin-top: 1rem;
  width: 100%;
  max-width: 400px;
`;

const AddPillButtonContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: -0.4rem;
`;

const SelectedPillsList = styled.div`
    width:100%;
    margin-top: 1rem;
    padding: 10px 0 ;
    /* border: 1px solid #ddd; */
    border-radius: 5px;
    /* margin-bottom: 1rem; */
`;

const PillItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
  /* margin: 0.4rem 1rem; */
  margin-bottom: 0.5rem;
  height: 1.8rem;
`;

const PillText = styled.span`
  text-align: left;
`;

const CloseButton = styled(IoClose)`
  cursor: pointer;
  color: gray;
`;

function SurveyUpdate({ data }) {
  const [surveyAnswers, setSurveyAnswers] = useRecoilState(surveyAnswersState);
  const { fetchData } = useAxios(MODIFY, 'PATCH');
  const resetSurveyAnswers = useResetRecoilState(surveyAnswersState);
  const navigate = useNavigate()

  useEffect(() => {
    
    console.log('길이',surveyAnswers.family)
    console.log('빈값',surveyAnswers[0]?.answer)
    
    // surveyAnswers가 아직 설정되지 않았거나 빈 객체일 경우에만 초기화
    // if (surveyAnswers[0]?.answer?.length) {
    if (!surveyAnswers.family) {
      setSurveyAnswers(data);
      console.log('data',data)
    }
    console.log('surveyAnswers',surveyAnswers)

    if (surveyAnswers.family !== data.family) {

      console.log('데이터 변경 감지, 페이지 새로고침');
      setSurveyAnswers(data)
      // window.location.reload();
    }
  }, [data, setSurveyAnswers, surveyAnswers]);
  console.log('data',data)
  console.log("recoil 들어감?",surveyAnswers)


    const handleInputChange = (e, field) => {
      setSurveyAnswers((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

    const handleOptionClick = (value, field) => {
      setSurveyAnswers((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

    const handlePillSelect = (pill) => {
    };

    const handleNoneSelected = () => {
      setSurveyAnswers({ ...surveyAnswers, allergies: [] });
      console.log('알러지 약물이 "없음"으로 초기화됨');  
    };

    const handleRemovePill = (pillToRemove) => {
      setSurveyAnswers((prev) => ({
        ...prev,
        allergies: prev.allergies.filter((pill) => pill !== pillToRemove), // 약물 제거
      }));
    };

    console.log('엥',surveyAnswers)
    const handleSave = async () => {
      try {
        const allergiesKorNames = surveyAnswers.allergies.map((pill) => pill.korName);

        const requestData = {
          ...surveyAnswers,
          // allergies: allergiesKorNames, // 이름만 담긴 배열로 교체
        };

        await fetchData(MODIFY(surveyAnswers.family), 'PATCH', requestData);
        alert('수정되었습니다.');
        navigate('/profile')
        resetSurveyAnswers();
        // localStorage.removeItem('surveyAnswers');
        localStorage.removeItem('selectedPills');
      } catch (error) {
        console.error('수정 중 오류 발생:', error);
        alert('수정 중 오류가 발생했습니다.');
      }
    };
    
  

  return (
    <SurveyUpdateContainer>
        
      <TextInput
        label="이름"
        placeholder="이름을 입력하세요"
        value={surveyAnswers.name || ''}
        onChange={(e) => handleInputChange(e, 'name')}
      />
      <TextInput
        label="가족 관계"
        placeholder="관계를 입력하세요"
        value={surveyAnswers.family || ''}
        onChange={(e) => handleInputChange(e, 'family')}
      />
      <TextInput
        label="생년월일"
        placeholder="yyyy-mm-dd"
        value={surveyAnswers.birth || ''}
        onChange={(e) => handleInputChange(e, 'birth')}
        isDateInput={true}  // 달력 표시
    />
      <TextInput
        label="키"
        placeholder="키를 입력하세요"
        value={surveyAnswers.height || ''}
        onChange={(e) => handleInputChange(e, 'height')}
        type="number"
        step="0.01"
        unit="cm"
    />
      <TextInput
        label="몸무게"
        placeholder="몸무게를 입력하세요"
        value={surveyAnswers.weight || ''}
        onChange={(e) => handleInputChange(e, 'weight')}
        type="number"
        step="0.01"
        unit="kg"
    />

      {/* 임신 여부 옵션 버튼 */}
      <HeaderContainer>
        <QuestionText>
            임신여부
        </QuestionText>
      </HeaderContainer>

      <ButtonContainer>
        <OptionButton
          label="계획없음"
          isSelected={surveyAnswers.pregnancy === 'NONE'}
          onClick={() => handleOptionClick('NONE', 'pregnancy')}
        />
        <OptionButton
          label="임신 준비중"
          isSelected={surveyAnswers.pregnancy === 'POSSIBLE'}
          onClick={() => handleOptionClick('POSSIBLE', 'pregnancy')}
        />
        <OptionButton
          label="임신 중"
          isSelected={surveyAnswers.pregnancy === 'PREGNANT'}
          onClick={() => handleOptionClick('PREGNANT', 'pregnancy')}
        />
        <OptionButton
          label="수유 중"
          isSelected={surveyAnswers.pregnancy === 'NURSING'}
          onClick={() => handleOptionClick('NURSING', 'pregnancy')}
        />
      </ButtonContainer>

      {/* 약물 알러지 선택 */}
      <HeaderContainer>
        <QuestionText>
            약물 알러지
        </QuestionText>
      </HeaderContainer>
      <ButtonContainer>
        <OptionButton
          label="없음"
          isSelected={!surveyAnswers.allergies || surveyAnswers.allergies.length === 0}
          onClick={handleNoneSelected}
        />
      </ButtonContainer>

      {/* 알러지 약물 추가 버튼 */}
      <AddPillButtonContainer>
        <AddPillButton_ver1
          text="알러지 약물 추가"
          onSelect={(pill) => handlePillSelect(pill)}
        />
      </AddPillButtonContainer>

      {/* 선택된 약물 목록 */}
      <SelectedPillsList>
      {surveyAnswers.allergies && surveyAnswers.allergies.length > 0 ? (
        surveyAnswers.allergies.map((pill, index) => (
          <PillItem key={index}>
             <PillText>{surveyAnswers.allergies[index]}</PillText>
             {/* <PillText>{surveyAnswers.allergies[index].korName}</PillText> */}
             <CloseButton onClick={() => handleRemovePill(pill)} />
          </PillItem>
        ))
      ) : (
        <p>선택된 약물이 없습니다.</p>
      )}
      </SelectedPillsList>

      <LongNextButton
        label="수정하기"
        onClick={handleSave}
        isSelected={true}
        bgColor={colors.point1}
        borderColor={colors.point1}
        textColor="white"
        width="100%"
      />
    </SurveyUpdateContainer>
  );
}

export default SurveyUpdate;
