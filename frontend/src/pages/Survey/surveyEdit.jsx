// import styled from 'styled-components';
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
// import { surveyAnswersState } from '../../atoms/surveyState'; 
// import useAxios from '../../hook/useAxiosPost';
// import { REGISTER, MODIFY } from '../../assets/apis'; 
// import LongNextButton from '../../components/LongNextButton';
// import colors from '../../assets/colors';
// import TextInput from '../../components/TextInput';
// import OptionButton from '../../components/OptionButton';
// import AddPillButton_ver1 from '../../components/AddPillButton_ver1';
// import { IoClose } from 'react-icons/io5'; 
// import { userState } from '../../atoms/userState'; 

// const SurveyEditContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   width: 80vw;
//   margin: 2vh auto 0;
//   position: relative;
// `;

// const HeaderContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   width: 100%;
//   margin-top: 1rem;
//   margin-bottom: 0.125rem;
// `;

// const QuestionText = styled.div`
//   color: #000;
//   line-height: normal;
// `;

// const ButtonContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   grid-gap: 0.8rem;
//   margin-top: 1rem;
//   width: 100%;
//   max-width: 400px;
// `;

// const AddPillButtonContainer = styled.div`
//   margin-top: 1rem;
// `;

// const SelectedPillsList = styled.div`
//   width: 100%;
//   margin-top: 1rem;
//   padding: 10px 0;
//   border-radius: 5px;
// `;

// const PillItem = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 5px;
//   border: 1px solid #ddd;
//   border-radius: 3px;
//   margin-bottom: 0.5rem;
//   height: 1.8rem;
// `;

// const PillText = styled.span`
//   text-align: left;
// `;

// const CloseButton = styled(IoClose)`
//   cursor: pointer;
//   color: gray;
// `;

// function SurveyEdit() {
//   const userInfo = useRecoilValue(userState); // 유저 정보 가져오기
//   const { fetchData } = useAxios(REGISTER, 'POST');
//   const { fetchData: modifyFetchData } = useAxios(MODIFY, 'PATCH');
//   const resetSurveyAnswers = useResetRecoilState(surveyAnswersState);
//   const navigate = useNavigate();
//   const [surveyAnswers, setSurveyAnswers] = useRecoilState(surveyAnswersState);

//   console.log('recoil',surveyAnswers)

// //   const handleInputChange = (e, field) => {
// //     setSurveyAnswers((prev) => ({
// //       ...prev,
// //       [field]: e.target.value,
// //     }));
// //   };
// const handleInputChange = (e, index, fieldIndex = 0) => {
//     setSurveyAnswers((prev) => {
//       const updatedAnswers = [...prev]; // 상태 배열을 복사
      
//       // 복사한 배열의 특정 인덱스의 answer 속성도 복사하여 수정
//       updatedAnswers[index] = {
//         ...updatedAnswers[index], // 각 객체 복사
//         answer: Array.isArray(updatedAnswers[index].answer)
//           ? [...updatedAnswers[index].answer] // answer가 배열인 경우 복사
//           : updatedAnswers[index].answer, // answer가 단일 값일 경우 그대로 유지
//       };
  
//       // answer가 배열일 때 특정 필드를 업데이트
//       if (Array.isArray(updatedAnswers[index].answer)) {
//         updatedAnswers[index].answer[fieldIndex] = e.target.value; 
//       } else {
//         // answer가 단일 값일 경우 직접 업데이트
//         updatedAnswers[index].answer = e.target.value;
//       }
  
//       console.log('Updated answers:', updatedAnswers); // 상태 업데이트 후 확인
//       return updatedAnswers; // 수정된 배열 반환
//     });
//   };
//   const handleOptionClick = (value, field) => {
//     setSurveyAnswers((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handlePillSelect = (pill) => {};

//   const handleNoneSelected = () => {
//     setSurveyAnswers({ ...surveyAnswers, allergies: [] });
//     console.log('알러지 약물이 "없음"으로 초기화됨');  
//   };

//   const handleRemovePill = (pillToRemove) => {
//     setSurveyAnswers((prev) => ({
//       ...prev,
//       allergies: prev.allergies.filter((pill) => pill !== pillToRemove), // 약물 제거
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       let familyAnswer = surveyAnswers.family || '';
//       if (familyAnswer === userInfo.name) {
//         familyAnswer = '나';
//       }

//       const pregnancyMap = {
//         '계획없음': 'NONE',
//         '임신 준비중': 'POSSIBLE',
//         '임신 중': 'PREGNANT',
//         '수유 중': 'NURSING',
//       };

//       const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//         return `${year}-${month}-${day}`;
//       };

//       const formattedBirth = surveyAnswers.birth ? formatDate(surveyAnswers.birth) : '';
//       const requestData = {
//         birth: formattedBirth,
//         height: parseFloat(surveyAnswers.height || 0),
//         weight: parseFloat(surveyAnswers.weight || 0),
//         gender: surveyAnswers.gender,
//         pregnancy: pregnancyMap[surveyAnswers.pregnancy] || '',
//         allergies: surveyAnswers.allergies.length > 0 ? surveyAnswers.allergies : [],
//         family: familyAnswer,
//       };

//       const family = surveyAnswers.family || '';
//       if (family === '나' || family === '본인' || family === userInfo.name) {
//         const modifyUrl = MODIFY(family); // MODIFY URL에 family 파라미터를 쿼리로 추가
//         await modifyFetchData(modifyUrl, 'PATCH', requestData); // PATCH 요청으로 수정
//         alert('설문 응답이 성공적으로 수정되었습니다.');
//       } else {
//         await fetchData(REGISTER, 'POST', requestData); // POST 요청으로 새로운 설문 등록
//         alert('설문 응답이 성공적으로 등록되었습니다.');
//       }

//       resetSurveyAnswers();
//       navigate('/home');
//     } catch (error) {
//       console.error('API 오류:', error);
//       alert('설문 응답 등록 중 오류가 발생했습니다.');
//     }
//   };

//   return (
//     <SurveyEditContainer>
//       <TextInput
//         label="이름(관계)"
//         placeholder="이름 혹은 관계 입력하세요"
//         value={surveyAnswers[0].answer[0] || ''}
//         onChange={(e) => handleInputChange(e, 0, 0)}
//       />
//       <TextInput
//         label="성별"
//         placeholder="성별을 입력하세요"
//         value={surveyAnswers[0].answer[1] || ''}
//         onChange={(e) => handleInputChange(e, 0, 1)}
//       />
//       <TextInput
//         label="생년월일"
//         placeholder="yyyy-mm-dd"
//         value={surveyAnswers[1].answer || ''}
//         onChange={(e) => handleInputChange(e, 1)}
//         isDateInput={true}
//       />
//       <TextInput
//         label="키"
//         placeholder="키를 입력하세요"
//         value={surveyAnswers[2].answer[0] || ''}
//         onChange={(e) => handleInputChange(e, 2, 0)}
//         type="number"
//         step="0.01"
//         unit="cm"
//       />
//       <TextInput
//         label="몸무게"
//         placeholder="몸무게를 입력하세요"
//         value={surveyAnswers[2].answer[1] || ''}
//         onChange={(e) => handleInputChange(e, 2, 1)}
//         type="number"
//         step="0.01"
//         unit="kg"
//       />

//       <HeaderContainer>
//         <QuestionText>임신여부</QuestionText>
//       </HeaderContainer>
//       <ButtonContainer>
//         <OptionButton
//           label="계획없음"
//           isSelected={surveyAnswers.pregnancy === 'NONE'}
//           onClick={() => handleOptionClick('NONE', 'pregnancy')}
//         />
//         <OptionButton
//           label="임신 준비중"
//           isSelected={surveyAnswers.pregnancy === 'POSSIBLE'}
//           onClick={() => handleOptionClick('POSSIBLE', 'pregnancy')}
//         />
//         <OptionButton
//           label="임신 중"
//           isSelected={surveyAnswers.pregnancy === 'PREGNANT'}
//           onClick={() => handleOptionClick('PREGNANT', 'pregnancy')}
//         />
//         <OptionButton
//           label="수유 중"
//           isSelected={surveyAnswers.pregnancy === 'NURSING'}
//           onClick={() => handleOptionClick('NURSING', 'pregnancy')}
//         />
//       </ButtonContainer>

//       <HeaderContainer>
//         <QuestionText>약물 알러지</QuestionText>
//       </HeaderContainer>
//       <ButtonContainer>
//         <OptionButton
//           label="없음"
//           isSelected={!surveyAnswers.allergies || surveyAnswers.allergies.length === 0}
//           onClick={handleNoneSelected}
//         />
//       </ButtonContainer>

//       <AddPillButtonContainer>
//         <AddPillButton_ver1
//           text="알러지 약물 추가"
//           onSelect={(pill) => handlePillSelect(pill)}
//         />
//       </AddPillButtonContainer>

//       <SelectedPillsList>
//         {surveyAnswers.allergies && surveyAnswers.allergies.length > 0 ? (
//           surveyAnswers.allergies.map((pill, index) => (
//             <PillItem key={index}>
//               <PillText>{pill}</PillText>
//               <CloseButton onClick={() => handleRemovePill(pill)} />
//             </PillItem>
//           ))
//         ) : (
//           <p>선택된 약물이 없습니다.</p>
//         )}
//       </SelectedPillsList>

//       <LongNextButton
//         label="저장하기"
//         onClick={handleSave}
//         isSelected={true}
//         bgColor={colors.main}
//         borderColor={colors.main}
//         textColor="white"
//         width="100%"
//       />
//     </SurveyEditContainer>
//   );
// }

// export default SurveyEdit;
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextInput from '../../components/TextInput';
import OptionButton from '../../components/OptionButton';
import LongNextButton from '../../components/LongNextButton';
import AddPillButton_ver1 from '../../components/AddPillButton_ver1';
import useAxios from '../../hook/useAxiosPost';
import colors from '../../assets/colors';
import { useNavigate } from 'react-router-dom';
import { surveyAnswersState } from '../../atoms/surveyState';
import { useRecoilState } from 'recoil';
import { useResetRecoilState,useRecoilValue} from 'recoil';
import { IoClose } from 'react-icons/io5';
import { REGISTER, MODIFY } from '../../assets/apis'; 
import { userState } from '../../atoms/userState';

const SurveyUpdateContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80vw;
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
    border-radius: 5px;
`;

const PillItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
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

function SurveyEdit() {
  const [surveyAnswers] = useRecoilState(surveyAnswersState);
//   const { fetchData } = useAxios(MODIFY, 'PATCH');
  const resetSurveyAnswers = useResetRecoilState(surveyAnswersState);
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userState); // 유저 정보 가져오기
  const { fetchData } = useAxios(REGISTER, 'POST');
  const { fetchData: modifyFetchData } = useAxios(MODIFY, 'PATCH');

  // initialSurveyState를 useState로 관리
  const [formData, setFormData] = useState({
    family: surveyAnswers[0].answer[0],
    gender: surveyAnswers[0].answer[1],
    birth: surveyAnswers[1].answer,
    height: surveyAnswers[2].answer[0],
    weight: surveyAnswers[2].answer[1],
    pregnancy: 'NONE',  // 기본값 설정
    allergies: surveyAnswers.allergies
    // allergies: surveyAnswers[4].answer
  });
  console.log(formData)
  const handleInputChange = (e, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleOptionClick = (value, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePillSelect = (pill) => {
};

  const handleNoneSelected = () => {
    setFormData({ ...formData, allergies: [] });
    console.log('알러지 약물이 "없음"으로 초기화됨');
  };

  const handleRemovePill = (pillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      allergies: prev.allergies.filter((pill) => pill !== pillToRemove),
    }));
  };

//   const handleSave = async () => {
//     try {
//       await fetchData(MODIFY(formData.family), 'PATCH', formData);
//       alert('수정되었습니다.');
//       navigate('/profile');
//       resetSurveyAnswers();
//     } catch (error) {
//       console.error('수정 중 오류 발생:', error);
//       alert('수정 중 오류가 발생했습니다.');
//     }
const handleSave = async () => {
        try {
          if (formData.family === userInfo.name) {
            formData.family = '나';
          }
    
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
    
          const formattedBirth = surveyAnswers.birth ? formatDate(formData.birth) : '';
          const requestData = {
            birth: formattedBirth,
            height: parseFloat(formData.height || 0),
            weight: parseFloat(formData.weight || 0),
            gender: formData.gender,
            // pregnancy: pregnancyMap[formData.pregnancy] || '',
            pregnancy: formData.pregnancy || '',
            allergies: surveyAnswers.allergies.length > 0 ? formData.allergies : [],
            family: formData.family,
          };
    
          const family = formData.family || '';
          if (family === '나' || family === '본인' || family === userInfo.name) {
            const modifyUrl = MODIFY(family); // MODIFY URL에 family 파라미터를 쿼리로 추가
            await modifyFetchData(modifyUrl, 'PATCH', requestData); // PATCH 요청으로 수정
            alert('설문 응답이 성공적으로 수정되었습니다.');
          } else {
            await fetchData(REGISTER, 'POST', requestData); // POST 요청으로 새로운 설문 등록
            alert('설문 응답이 성공적으로 등록되었습니다.');
          }
    
          resetSurveyAnswers();
          navigate('/home');
        } catch (error) {
          console.error('API 오류:', error);
          alert('설문 응답 등록 중 오류가 발생했습니다.');
        }
  };

  return (
    <SurveyUpdateContainer>
      <TextInput
        label="이름(관계)"
        placeholder="이름 혹은 관계를 입력하세요"
        value={formData.family || ''}
        onChange={(e) => handleInputChange(e, 'family')}
      />
      <TextInput
        label="성별"
        placeholder="성별을 입력하세요"
        value={formData.gender || ''}
        onChange={(e) => handleInputChange(e, 'gender')}
      />
      <TextInput
        label="생년월일"
        placeholder="yyyy-mm-dd"
        value={formData.birth || ''}
        onChange={(e) => handleInputChange(e, 'birth')}
        isDateInput={true}
      />
      <TextInput
        label="키"
        placeholder="키를 입력하세요"
        value={formData.height || ''}
        onChange={(e) => handleInputChange(e, 'height')}
        type="number"
        step="0.01"
        unit="cm"
      />
      <TextInput
        label="몸무게"
        placeholder="몸무게를 입력하세요"
        value={formData.weight || ''}
        onChange={(e) => handleInputChange(e, 'weight')}
        type="number"
        step="0.01"
        unit="kg"
      />

      <HeaderContainer>
        <QuestionText>임신여부</QuestionText>
      </HeaderContainer>

      <ButtonContainer>
        <OptionButton
          label="계획없음"
          isSelected={formData.pregnancy === 'NONE'}
          onClick={() => handleOptionClick('NONE', 'pregnancy')}
        />
        <OptionButton
          label="임신 준비중"
          isSelected={formData.pregnancy === 'POSSIBLE'}
          onClick={() => handleOptionClick('POSSIBLE', 'pregnancy')}
        />
        <OptionButton
          label="임신 중"
          isSelected={formData.pregnancy === 'PREGNANT'}
          onClick={() => handleOptionClick('PREGNANT', 'pregnancy')}
        />
        <OptionButton
          label="수유 중"
          isSelected={formData.pregnancy === 'NURSING'}
          onClick={() => handleOptionClick('NURSING', 'pregnancy')}
        />
      </ButtonContainer>

      <HeaderContainer>
        <QuestionText>약물 알러지</QuestionText>
      </HeaderContainer>
      <ButtonContainer>
        <OptionButton
          label="없음"
          isSelected={!formData.allergies || formData.allergies.length === 0}
          onClick={handleNoneSelected}
        />
      </ButtonContainer>

      <AddPillButtonContainer>
        <AddPillButton_ver1
          text="알러지 약물 추가"
          onSelect={(pill) => handlePillSelect(pill)}
        //   onSelect={(pill) => setFormData((prev) => ({
        //     ...prev,
        //     allergies: [...prev.allergies, pill]
        //   }))}
        />
      </AddPillButtonContainer>

      <SelectedPillsList>
        {formData.allergies && formData.allergies.length > 0 ? (
          formData.allergies.map((pill, index) => (
            <PillItem key={index}>
              <PillText>{formData.allergies[index].korName}</PillText>
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

export default SurveyEdit;
