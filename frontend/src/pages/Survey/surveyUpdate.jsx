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
`;

const SelectedPillsList = styled.div`
    width:100%;
    margin-top: 1rem;
    padding: 10px 0 ;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 1rem;
`;

const PillItem = styled.div`
height: 1.3rem;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
  margin:0.4rem 0rem;
  margin:0.4rem 1rem;
`;

function SurveyUpdate({ data }) {
  console.log("원래 유저 정보",data)
  const [surveyAnswers, setSurveyAnswers] = useState(() => {
    const savedSurveyAnswers = localStorage.getItem('surveyAnswers');
    return savedSurveyAnswers
    ? JSON.parse(savedSurveyAnswers)
    : {
        name: '',
        family: '',
        birth: '',
        height: '',
        weight: '',
        pregnancy: '',
        allergies: data?.allergies || [], // 기본값으로 없음
      };
    });
    console.log('페이지이동',surveyAnswers)

  const { fetchData } = useAxios(MODIFY, 'PATCH');
  const [selectedPills, setSelectedPills] = useState(data?.allergies || []); // 선택된 알러지 약물 리스트

  const navigate = useNavigate()

  useEffect(() => {
    const savedPills = localStorage.getItem('selectedPills');
    if (savedPills) {
      const parsedPills = JSON.parse(savedPills);
      console.log('로컬에서 불러온 약물:', parsedPills);
      setSelectedPills(parsedPills);
    }
  }, []);
  
  // 받아온 data로 초기값 설정
  useEffect(() => {
    if (data && selectedPills.length > 0) {
      // 기존 surveyAnswers와 비교하여 상태가 변경된 경우에만 업데이트
      if (surveyAnswers.name === '' && surveyAnswers.family === '') {
        setSurveyAnswers((prev) => ({
          ...prev,
          name: data.name || '',
          family: data.family || '',
          birth: data.birth || '',
          height: data.height || '',
          weight: data.weight || '',
          pregnancy: data.pregnancy || '',
          allergies: data.allergies && data.allergies.length > 0 ? data.allergies : selectedPills[0] !== '' ? selectedPills : [],
          // allergies: selectedPills[0] !== '없음' ? selectedPills : data.allergies || ['없음'],
        }));
        console.log('초기 데이터로 설정된 알러지:', selectedPills[0] !== '없음' ? selectedPills : data.allergies || []);
      }
    }
  }, [data, selectedPills]);

    useEffect(() => {
      localStorage.setItem('surveyAnswers', JSON.stringify(surveyAnswers));
      localStorage.setItem('selectedPills', JSON.stringify(selectedPills));
        console.log('현재 surveyAnswers 상태:', surveyAnswers);  // 상태 업데이트될 때마다 출력
        console.log('현재 알러지 상태:', surveyAnswers.allergies);  // 알러지 정보만 출력
      }, [surveyAnswers,selectedPills]);

  // // 입력 필드 변경 핸들러
  const handleInputChange = (e, field) => {
    setSurveyAnswers({ ...surveyAnswers, [field]: e.target.value });
  };
  useEffect(() => {
    const savedAnswers = localStorage.getItem('surveyAnswers');
    if (JSON.stringify(surveyAnswers) !== savedAnswers) {
      localStorage.setItem('surveyAnswers', JSON.stringify(surveyAnswers));
      console.log('surveyAnswers가 로컬 스토리지에 저장됨:', surveyAnswers);
    }
  }, [surveyAnswers]);

  // 옵션 선택 핸들러
  const handleOptionClick = (value, field) => {
    setSurveyAnswers({ ...surveyAnswers, [field]: value });
  };

  // 알러지 약물 선택 핸들러
  const handlePillSelect = (pill) => {
    if (!surveyAnswers.allergies.includes(pill)) {
      const updatedPills = surveyAnswers.allergies.includes('없음')
        ? [pill] // "없음"이 선택된 경우 새 약물로 대체
        : [...surveyAnswers.allergies, pill];
      setSurveyAnswers({ ...surveyAnswers, allergies: updatedPills });
      setSelectedPills(updatedPills); // 선택된 약물 상태 업데이트
      localStorage.setItem('selectedPills', JSON.stringify(updatedPills)); // 로컬 스토리지에 저장
      console.log('알러지 약물 추가됨:', updatedPills);  // 약물 추가된 값 콘솔에 출력
    }
  };

  // '없음' 선택 시 모든 알러지 약물 초기화
  const handleNoneSelected = () => {
    setSurveyAnswers({ ...surveyAnswers, allergies: [] });
    setSelectedPills([]); // 선택된 약물 상태 초기화
    localStorage.setItem('selectedPills', JSON.stringify([])); 
    console.log('알러지 약물이 "없음"으로 초기화됨');  
  };

  // 수정 사항 저장 핸들러
  const handleSave = async () => {
    const updatedSurveyAnswers = { ...surveyAnswers, allergies: selectedPills };
    try {
      await fetchData(MODIFY(updatedSurveyAnswers.family), 'PATCH', updatedSurveyAnswers);
      alert('수정되었습니다.');
      navigate('/profile')
      localStorage.removeItem('surveyAnswers');
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
        value={surveyAnswers.name}
        onChange={(e) => handleInputChange(e, 'name')}
      />
      <TextInput
        label="가족 관계"
        placeholder="관계를 입력하세요"
        value={surveyAnswers.family}
        onChange={(e) => handleInputChange(e, 'family')}
      />
      <TextInput
        label="생년월일"
        placeholder="yyyy-mm-dd"
        value={surveyAnswers.birth}
        onChange={(e) => handleInputChange(e, 'birth')}
        isDateInput={true}  // 달력 표시
    />
      <TextInput
        label="키"
        placeholder="키를 입력하세요"
        value={surveyAnswers.height}
        onChange={(e) => handleInputChange(e, 'height')}
        type="number"
        step="0.01"
        unit="cm"
    />
      <TextInput
        label="몸무게"
        placeholder="몸무게를 입력하세요"
        value={surveyAnswers.weight}
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
          isSelected={selectedPills.includes('없음')}
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
        {selectedPills.length > 0 || selectedPills[0] === '없음' ? (
          selectedPills.map((pill, index) => (
            <PillItem key={index}>{pill}</PillItem>
          ))
        ) : (
          <p>선택된 약물이 없습니다.</p>
          // <p>{selectedPills}</p>
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
