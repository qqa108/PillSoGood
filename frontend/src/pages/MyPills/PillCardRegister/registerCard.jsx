// import { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; 
// import { useRecoilValue } from 'recoil';
// import { MEDICATIONADD } from '../../../assets/apis';
// import { prescriptionState } from '../../../atoms/prescriptionState'; 
// import TextInput from '../../../components/TextInput';
// import AddPillButton_ver1 from '../../../components/AddPillButton_ver1'; // 약 추가 버튼
// import colors from '../../../assets/colors';
// import LongNextButton from '../../../components/LongNextButton';
// const Title = styled.p`
//   margin-bottom: 0.6rem;
// `;

// const MedicineWrapper = styled.div`
//   margin-top: 1.2rem;
// `;

// const SelectedPillsContainer = styled.div`
//   margin-top: 1rem;
// `;

// const PillsList = styled.div`
//   margin-top: 1rem;
//   display: flex;
//   flex-wrap: wrap;
//   gap: 10px;
// `;

// const PillItemContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   width: 19.375rem;
//   padding: 1rem;
//   border: 1px solid #d9d9d9;
//   border-radius: 0.5rem;
//   background-color: #fff;
// `;

// const PillItemHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const DeleteButton = styled.button`
//   background: none;
//   border: none;
//   color: red;
//   cursor: pointer;
//   font-size: 0.8rem;
// `;

// const PillItemBody = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-top: 1rem;
//   flex-direction: column;
// `;

// const LabelText = styled.span`
//   align-self: flex-start;
// `;

// const CounterWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 0.5rem;
// `;

// const CounterButton = styled.button`
//   background-color: transparent;
//   border: none;
//   font-size: 1.5rem;
//   cursor: pointer;
//   margin: 0 1.5rem;
//   color: ${colors.point1};
// `;

// const CounterInput = styled.input`
//   width: 7rem;
//   height: 1.8rem;
//   text-align: center;
//   border: 1px solid #d9d9d9;
//   border-radius: 0.5rem;
//   margin: 0 0.5rem;
// `;

// const UnitText = styled.span`
//   font-size: 1rem;
//   color: #888;
// `;

// const Divider = styled.hr`
//   width: 100%;
//   border: none;
//   border-bottom: 0.06rem solid #d9d9d9;
//   margin: 1rem 0;
// `;

// const NoPillsText = styled.p`
//   margin-top: 1rem;
//   color: #888;
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 1rem;
// `;

// export default function RegisterCard() {
//   const prescriptionData = useRecoilValue(prescriptionState); // 상태 가져오기
  
//   const navigate = useNavigate()
//   const questions = [
//     {
//       type: 'date',
//       label: '처방날짜 *',
//       placeholder: 'yyyy-mm-dd',
//     },
//     {
//       type: 'text',
//       label: '카드 별명 *',
//       placeholder: '카드별명을 입력하세요',
//     },
//     {
//       type: 'text',
//       label: '약국명',
//       placeholder: '약국명을 입력하세요',
//     },
//     {
//       type: 'text',
//       label: '병원명',
//       placeholder: '처방받은 병원명을 입력하세요',
//     },
//   ];

//   // const [surveyAnswers, setSurveyAnswers] = useState(() => {
//   //   const storedAnswers = localStorage.getItem('surveyAnswers');
//   //   return storedAnswers ? JSON.parse(storedAnswers) : questions.map(() => ({ answer: '' }));
//   // });
//   const getTodayDate = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
//     const day = String(today.getDate()).padStart(2, '0');
//     return `${year}. ${month}. ${day}.`;
//   };
  
//   const [surveyAnswers, setSurveyAnswers] = useState(() => {
//     const storedAnswers = JSON.parse(localStorage.getItem('surveyAnswers')) || [];
//     return [
//       { answer: prescriptionData.intakeAt || storedAnswers[0]?.answer || getTodayDate() }, // 처방날짜
//       { answer: storedAnswers[1]?.answer || '' }, // 카드 별명
//       { answer: prescriptionData.pharmacyName || storedAnswers[2]?.answer || '' }, // 약국명
//       { answer: prescriptionData.hospitalName || storedAnswers[3]?.answer || '' }, // 병원명
//     ];
//   });

//   // const [surveyAnswers, setSurveyAnswers] = useState(() => [
//   //   { answer: prescriptionData.intakeAt || getTodayDate() }, // 처방날짜
//   //   { answer: '' }, // 카드 별명
//   //   { answer: prescriptionData.pharmacyName || '' }, // 약국명
//   //   { answer: prescriptionData.hospitalName || '' }, // 병원명
//   //   // const storedAnswers = localStorage.getItem('surveyAnswers');
//   //   // return storedAnswers
//   //   //   ? JSON.parse(storedAnswers)
//   //   //   : questions.map((question) =>
//   //   //       question.type === 'date' ? { answer: getTodayDate() } : { answer: '' }
//   //   //     ); // 오늘 날짜로 기본값 설정
//   // // });
//   // ]);


//   const [selectedPills, setSelectedPills] = useState(() => {
//     const storedPills = localStorage.getItem('selectedPills');
//     return storedPills ? JSON.parse(storedPills) : [];
//   });

//   // 선택된 약물이 추가될 때 로컬 스토리지와 상태 업데이트
//   const handlePillAdd = (pill) => {
//     setSelectedPills((prevSelected) => {
//       const storedPills = localStorage.getItem('selectedPills');
//       const existingPills = storedPills ? JSON.parse(storedPills) : [];

//       const updatedPills = [...new Set([...existingPills, ...prevSelected, pill])];

//       localStorage.setItem('selectedPills', JSON.stringify(updatedPills));

//       return updatedPills;
//     });
//   };

//   // 선택된 약물 삭제 기능
//   const handlePillDelete = (pillToDelete) => {
//     setSelectedPills((prevSelected) => {
//       const updatedPills = prevSelected.filter((pill) => pill !== pillToDelete);
//       localStorage.setItem('selectedPills', JSON.stringify(updatedPills));
//       return updatedPills;
//     });
//   };

//   // 카운터 핸들링
//   const [counterValues, setCounterValues] = useState({
//     처방일수: 3,
//     투여횟수: 3,
//     투약량: 3,
//   });

//   const handleCounterChange = (field, value) => {
//     setCounterValues((prevValues) => ({
//       ...prevValues,
//       [field]: value,
//     }));
//   };

//   const handleInputChange = (index, value) => {
//     const newAnswers = [...surveyAnswers];
//     newAnswers[index] = { answer: value };
//     setSurveyAnswers(newAnswers);
//   };

//   // 데이터를 로컬 스토리지에 저장하는 useEffect
//   useEffect(() => {
//     localStorage.setItem('surveyAnswers', JSON.stringify(surveyAnswers));
//   }, [surveyAnswers]);

//   // 조건부로 등록하기 버튼 활성화
//   const isSubmitDisabled = !(
//     surveyAnswers[0].answer && // 처방날짜
//     surveyAnswers[1].answer && // 카드 별명
//     selectedPills.length > 0 // 선택된 약물
//   );
//   console.log(surveyAnswers)
//   const handleSubmit = async () => {
//     if (!isSubmitDisabled) {
//       const requestData = {
//         name: surveyAnswers[1].answer, // 카드 별명
//         status: 'COMPLETED', // 기본값
//         intakeAt: surveyAnswers[0].answer, // 처방날짜
//         hospitalName: surveyAnswers[3].answer, // 병원명
//         pharmacyName: surveyAnswers[2].answer, // 약국명
//         prescriptionDay: counterValues['처방일수'], // 처방일수
//         userMedicationDetailList: selectedPills.map((pill, index) => ({
//           dailyIntakeFrequency: counterValues['투여횟수'], // 1일 투여횟수
//           perAmount: counterValues['투약량'], // 1회 투약량
//           // medicineId: index + 1, // 가상의 ID로 약물 데이터 매칭 (실제 API 사용 시 ID로 변경)
//           medicineId: pill,
//         })),
//       };
  
//       try {
//         const response = await axios.post(MEDICATIONADD, requestData);
  
//         if (response.status === 200) {
//           console.log('처방이 성공적으로 등록되었습니다:', response.data);
//           navigate('/mypills')
//         } else {
//           console.error('처방 등록에 실패했습니다:', response.status, response.data);
//         }
//       } catch (error) {
//         console.error('API 호출 중 오류가 발생했습니다:', error);
//       }
//     }
//   };

//   return (
//     <>
//       {questions.map((question, index) => (
//         <div key={index}>
//           {question.type === 'text' && (
//             <TextInput
//               label={question.label}
//               placeholder={question.placeholder || ''}
//               value={surveyAnswers[index]?.answer || ''}
//               onChange={(e) => handleInputChange(index, e.target.value)}
//             />
//           )}

//           {question.type === 'date' && (
//             <TextInput
//               label={question.label}
//               placeholder={question.placeholder || 'yyyy-mm-dd'}
//               // value={surveyAnswers[index]?.answer || ''}
//               value={surveyAnswers[index]?.answer || getTodayDate()}
//               onChange={(e) => handleInputChange(index, e.target.value)}
//               isDateInput
//             />
//           )}
//         </div>
//       ))}

//       <MedicineWrapper>
//         <Title>약 선택</Title>
//         {/* 약물 추가 버튼 */}
//         <AddPillButton_ver1 text="약 추가" onClick={() => handlePillAdd('타이레놀')} />
//       </MedicineWrapper>

//       <SelectedPillsContainer>
//         <Title>선택된 약물 목록</Title>
//         {selectedPills.length > 0 ? (
//           <PillsList>
//             {selectedPills.map((pill, index) => (
//               <PillItemContainer key={index}>
//                 {/* 약물 이름과 삭제 버튼 */}
//                 <PillItemHeader>
//                   {pill}
//                   <DeleteButton onClick={() => handlePillDelete(pill)}>삭제</DeleteButton>
//                 </PillItemHeader>
//                 <Divider />

//                 {/* 처방일수, 투여횟수, 투약량 */}
//                 <PillItemBody>
//                   <LabelText>처방 일수</LabelText>
//                   <CounterWrapper>
//                     <CounterButton onClick={() => handleCounterChange('처방일수', Math.max(1, counterValues['처방일수'] - 1))}>-</CounterButton>
//                     <CounterInput type="text" readOnly value={counterValues['처방일수']} /> <UnitText>일</UnitText>
//                     <CounterButton onClick={() => handleCounterChange('처방일수', counterValues['처방일수'] + 1)}>+</CounterButton>
//                   </CounterWrapper>
//                 </PillItemBody>

//                 <PillItemBody>
//                   <LabelText>1일 투여횟수</LabelText>
//                   <CounterWrapper>
//                     <CounterButton onClick={() => handleCounterChange('투여횟수', Math.max(1, counterValues['투여횟수'] - 1))}>-</CounterButton>
//                     <CounterInput type="text" readOnly value={counterValues['투여횟수']} /> <UnitText>번</UnitText>
//                     <CounterButton onClick={() => handleCounterChange('투여횟수', counterValues['투여횟수'] + 1)}>+</CounterButton>
//                   </CounterWrapper>
//                 </PillItemBody>

//                 <PillItemBody>
//                   <LabelText>1회 투약량</LabelText>
//                   <CounterWrapper>
//                     <CounterButton onClick={() => handleCounterChange('투약량', Math.max(1, counterValues['투약량'] - 1))}>-</CounterButton>
//                     <CounterInput type="text" readOnly value={counterValues['투약량']} /> <UnitText>정</UnitText>
//                     <CounterButton onClick={() => handleCounterChange('투약량', counterValues['투약량'] + 1)}>+</CounterButton>
//                   </CounterWrapper>
//                 </PillItemBody>
//               </PillItemContainer>
//             ))}
//           </PillsList>
//         ) : (
//           <NoPillsText>선택된 약물이 없습니다.</NoPillsText>
//         )}
//       </SelectedPillsContainer>

//       <ButtonContainer>
//         <LongNextButton 
//           label='등록하기' 
//           width='100%'
//           onClick={handleSubmit}
//           isSelected={!isSubmitDisabled} // 버튼 활성화 여부
//         />
//       </ButtonContainer>
//     </>
//   );
// }
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { MEDICATIONADD } from '../../../assets/apis';
import useAxios from '../../../hook/useAxiosPost';
import TextInput from '../../../components/TextInput';
import AddPillButton_ver1 from '../../../components/AddPillButton_ver1'; // 약 추가 버튼
import colors from '../../../assets/colors';
import LongNextButton from '../../../components/LongNextButton';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../atoms/userState';


const Title = styled.p`
  margin-bottom: 0.6rem;
`;

const MedicineWrapper = styled.div`
  margin-top: 1.2rem;
`;

const SelectedPillsContainer = styled.div`
  margin-top: 1rem;
`;

const PillsList = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const PillItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 19.375rem;
  padding: 1rem;
  border: 1px solid #d9d9d9;
  border-radius: 0.5rem;
  background-color: #fff;
`;

const PillItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 0.8rem;
`;

const PillItemBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  flex-direction: column;
`;

const LabelText = styled.span`
  align-self: flex-start;
`;

const CounterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
`;

const CounterButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  margin: 0 1.5rem;
  color: ${colors.point1};
`;

const CounterInput = styled.input`
  width: 7rem;
  height: 1.8rem;
  text-align: center;
  border: 1px solid #d9d9d9;
  border-radius: 0.5rem;
  margin: 0 0.5rem;
`;

const UnitText = styled.span`
  font-size: 1rem;
  color: #888;
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-bottom: 0.06rem solid #d9d9d9;
  margin: 1rem 0;
`;

const NoPillsText = styled.p`
  margin-top: 1rem;
  color: #888;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

export default function RegisterCard() {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userState);
  const { data, loading, error, fetchData } = useAxios(MEDICATIONADD, 'POST');

  const questions = [
    {
      type: 'date',
      label: '처방날짜 *',
      placeholder: 'yyyy-mm-dd',
    },
    {
      type: 'text',
      label: '카드 별명 *',
      placeholder: '카드별명을 입력하세요',
    },
    {
      type: 'text',
      label: '약국명',
      placeholder: '약국명을 입력하세요',
    },
    {
      type: 'text',
      label: '병원명',
      placeholder: '처방받은 병원명을 입력하세요',
    },
  ];

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [surveyAnswers, setSurveyAnswers] = useState(() => {
    const storedAnswers = JSON.parse(localStorage.getItem('surveyAnswers')) || [];
    const intakeAt = storedAnswers[0]?.answer || getTodayDate(); // 오늘 날짜 기본값
    return [
      { answer: intakeAt }, // 처방날짜
      { answer: storedAnswers[1]?.answer || '' }, // 카드 별명
      { answer: storedAnswers[2]?.answer || '' }, // 약국명
      { answer: storedAnswers[3]?.answer || '' }, // 병원명
    ];
  });

  useEffect(() => {
    // surveyAnswers를 로컬 스토리지에 저장
    localStorage.setItem('surveyAnswers', JSON.stringify(surveyAnswers));
  }, [surveyAnswers]);

  const [selectedPills, setSelectedPills] = useState(() => {
    const storedPills = JSON.parse(localStorage.getItem('selectedPills')) || [];
    return storedPills.map((pill) => ({
      name: pill.name || pill, // OCR 데이터가 아니면 이름만 있을 수 있음
      dose: pill.dose && pill.dose !== 'N/A' ? pill.dose : 3, // 1회 투약량 기본값 3
      frequency: pill.frequency && pill.frequency !== 'N/A' ? pill.frequency : 3, // 1일 투여횟수 기본값 3
      days: pill.days && pill.days !== 'N/A' ? pill.days : 3, // 처방 일수 기본값 3
    }));
  });

  // 선택된 약물이 추가될 때 로컬 스토리지와 상태 업데이트
  const handlePillAdd = (pill) => {
    setSelectedPills((prevSelected) => {
      const updatedPills = [...prevSelected, { name: pill, dose: 3, frequency: 3, days: 3 }];
      localStorage.setItem('selectedPills', JSON.stringify(updatedPills));
      return updatedPills;
    });
  };

  // 선택된 약물 삭제 기능
  const handlePillDelete = (pillToDelete) => {
    setSelectedPills((prevSelected) => {
      const updatedPills = prevSelected.filter((pill) => pill.name !== pillToDelete.name);
      localStorage.setItem('selectedPills', JSON.stringify(updatedPills));
      return updatedPills;
    });
  };

  // 카운터 핸들링 (수동 입력도 가능)
  const handlePillDetailChange = (index, field, value) => {
    const updatedPills = [...selectedPills];
    updatedPills[index][field] = value ? parseInt(value, 10) : 3; // 기본값 3 적용
    setSelectedPills(updatedPills);
    localStorage.setItem('selectedPills', JSON.stringify(updatedPills));
  };

  const handleInputChange = (index, value) => {
    const newAnswers = [...surveyAnswers];
    newAnswers[index] = { answer: value };
    setSurveyAnswers(newAnswers);
  };

  useEffect(() => {
    localStorage.setItem('surveyAnswers', JSON.stringify(surveyAnswers));
  }, [surveyAnswers]);

  const isSubmitDisabled = !(
    surveyAnswers[0].answer && 
    surveyAnswers[1].answer && 
    selectedPills.length > 0 
  );

  // const handleSubmit = async () => {
  //   if (!isSubmitDisabled) {
  //     const requestData = {
  //       userDetailId: userInfo?.userDetailId,
  //       // name: surveyAnswers[1].answer,    
  //       status: 'TAKING', 
  //       intakeAt: surveyAnswers[0].answer || getTodayDate(), // 복용시작 날짜
  //       hospitalName: surveyAnswers[3].answer, 
  //       pharmacyName: surveyAnswers[2].answer, 
  //       prescriptionDay: selectedPills[0]?.days || 3, // 처방 일수 기본값
  //       userMedicationDetailList: selectedPills.map((pill) => ({
  //         dailyIntakeFrequency: pill.frequency || 3, // 1일 투여 횟수 기본값
  //         perAmount: pill.dose || 3, // 1회 투약량 기본값
  //         medicineId: pill.name,      // 약 id
  //       })),
  //     };

  //     try {
  //       const response = await axios.post(MEDICATIONADD, requestData);
  //       if (response.status === 200) {
  //         console.log('처방이 성공적으로 등록되었습니다:', response.data);
  //         navigate('/mypills');
  //       } else {
  //         console.error('처방 등록에 실패했습니다:', response.status, response.data);
  //       }
  //     } catch (error) {
  //       console.error('API 호출 중 오류가 발생했습니다:', error);
  //     }
  //   }
  // };
  const handleSubmit = async () => {
    if (!isSubmitDisabled) {
      const requestData = {
        userDetailId: userInfo?.userDetailId,
        name: surveyAnswers[1].answer,
        status: 'TAKING', 
        // intakeAt: surveyAnswers[0].answer || getTodayDate(), // 복용시작 날짜
        intakeAt: `${surveyAnswers[0].answer}T00:00:00`,
        hospitalName: surveyAnswers[3].answer, 
        pharmacyName: surveyAnswers[2].answer, 
        prescriptionDay: selectedPills[0]?.days || 3, // 처방 일수 기본값
        userMedicationDetailList: selectedPills.map((pill) => ({
          dailyIntakeFrequency: pill.frequency || 3, // 1일 투여 횟수 기본값
          perAmount: pill.dose || 3, // 1회 투약량 기본값
          // medicineId: pill.name, // 약 id
          medicineId: 3, // 약 id
        })),
      };

      try {
        // API 호출
        await fetchData(MEDICATIONADD, 'POST', requestData);
        
        // 성공적으로 제출되었을 경우
        alert('설문 응답이 성공적으로 등록되었습니다.');
        navigate('/mypills'); // 성공 후 페이지 이동
      } catch (error) {
        console.error('API 등록 오류:', error);
        alert('설문 응답 등록 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <>
    {/* <div>{userInfo?.userDetailId}</div> */}
      {questions.map((question, index) => (
        <div key={index}>
          {question.type === 'text' && (
            <TextInput
              label={question.label}
              placeholder={question.placeholder || ''}
              value={surveyAnswers[index]?.answer || ''}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          )}

          {question.type === 'date' && (
            <TextInput
              label={question.label}
              placeholder={question.placeholder || 'yyyy-mm-dd'}
              value={surveyAnswers[index]?.answer || getTodayDate()}
              onChange={(e) => handleInputChange(index, e.target.value)}
              isDateInput
            />
          )}
        </div>
      ))}

      <MedicineWrapper>
        <Title>약 선택</Title>
        <AddPillButton_ver1 text="약 추가" onClick={() => handlePillAdd('타이레놀')} />
      </MedicineWrapper>

      <SelectedPillsContainer>
        <Title>선택된 약물 목록</Title>
        {selectedPills.length > 0 ? (
          <PillsList>
            {selectedPills.map((pill, index) => (
              <PillItemContainer key={index}>
                <PillItemHeader>
                  {pill.name}
                  <DeleteButton onClick={() => handlePillDelete(pill)}>삭제</DeleteButton>
                </PillItemHeader>
                <Divider />
                <PillItemBody>
                  <LabelText>처방 일수</LabelText>
                  <CounterWrapper>
                    <CounterButton onClick={() => handlePillDetailChange(index, 'days', Math.max(1, pill.days - 1))}>-</CounterButton>
                    <CounterInput type="number" value={pill.days} onChange={(e) => handlePillDetailChange(index, 'days', e.target.value)} /> <UnitText>일</UnitText>
                    <CounterButton onClick={() => handlePillDetailChange(index, 'days', pill.days + 1)}>+</CounterButton>
                  </CounterWrapper>
                </PillItemBody>

                <PillItemBody>
                  <LabelText>1일 투여횟수</LabelText>
                  <CounterWrapper>
                    <CounterButton onClick={() => handlePillDetailChange(index, 'frequency', Math.max(1, pill.frequency - 1))}>-</CounterButton>
                    <CounterInput type="number" value={pill.frequency} onChange={(e) => handlePillDetailChange(index, 'frequency', e.target.value)} /> <UnitText>번</UnitText>
                    <CounterButton onClick={() => handlePillDetailChange(index, 'frequency', pill.frequency + 1)}>+</CounterButton>
                  </CounterWrapper>
                </PillItemBody>

                <PillItemBody>
                  <LabelText>1회 투약량</LabelText>
                  <CounterWrapper>
                    <CounterButton onClick={() => handlePillDetailChange(index, 'dose', Math.max(1, pill.dose - 1))}>-</CounterButton>
                    <CounterInput type="number" value={pill.dose} onChange={(e) => handlePillDetailChange(index, 'dose', e.target.value)} /> <UnitText>정</UnitText>
                    <CounterButton onClick={() => handlePillDetailChange(index, 'dose', pill.dose + 1)}>+</CounterButton>
                  </CounterWrapper>
                </PillItemBody>
              </PillItemContainer>
            ))}
          </PillsList>
        ) : (
          <NoPillsText>선택된 약물이 없습니다.</NoPillsText>
        )}
      </SelectedPillsContainer>

      <ButtonContainer>
        <LongNextButton 
          label='등록하기' 
          width='100%'
          onClick={handleSubmit}
          isSelected={!isSubmitDisabled}
        />
      </ButtonContainer>
    </>
  );
}
