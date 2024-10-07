import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItemComponent, ButtonContainer, Title, Description } from './HistoryRegisterComponents';
import { MEDICATIONADD } from '../../../../assets/apis';
import { userState } from '../../../../atoms/userState';
import { useRecoilValue } from 'recoil';
import useAxios from '../../../../hook/useAxiosPost';
import LongNextButton from '../../../../components/LongNextButton';
import colors from '../../../../assets/colors';

export default function NextPage({ selectedItems, onNext }) {
  const { data, loading, error, fetchData } = useAxios(MEDICATIONADD, 'POST');
  const userInfo = useRecoilValue(userState);
  const navigate = useNavigate()
  const [checked, setChecked] = useState(Array(selectedItems.length).fill(false));
  
  const handleCheck = (index) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  const isNextButtonActive = checked.some((isChecked) => isChecked);

  // const handleNextClick = async () => {
  //   const filteredItems = selectedItems.filter((_, index) => checked[index]);
  //   onNext(filteredItems);
  //   navigate('/mypills')

  //   const requestData = {
  //     userDetailId: userInfo?.userDetailId,
  //     name: '진료내역 자동 등록',
  //     status: '', 
  //     intakeAt: ``,
  //     hospitalName: , 
  //     pharmacyName: , 
  //     prescriptionDay: , // 처방 일수 기본값
  //     userMedicationDetailList: selectedPills.map((pill) => ({
  //       dailyIntakeFrequency: pill.frequency || 3, // 1일 투여 횟수 기본값
  //       perAmount: pill.dose || 3, // 1회 투약량 기본값
  //       // medicineId: pill.name, // 약 id
  //       medicineId: 3, // 약 id
  //     })),
  //   };

  //   try {
  //     // API 호출
  //     await fetchData(MEDICATIONADD, 'POST', requestData);
      
  //     // 성공적으로 제출되었을 경우
  //     alert('설문 응답이 성공적으로 등록되었습니다.');
  //     navigate('/mypills'); // 성공 후 페이지 이동
  //   } catch (error) {
  //     console.error('API 등록 오류:', error);
  //     alert('설문 응답 등록 중 오류가 발생했습니다.');
  //   }

  // };
  const handleNextClick = async () => {
    // const filteredItems = selectedItems.filter((_, index) => checked[index]);
    // onNext(filteredItems);
    const promises = selectedItems.map(async (item, index) => {
      const status = checked[index] ? 'TAKING' : 'COMPLETED'; // 선택된 항목은 TAKING, 선택되지 않은 항목은 COMPLETED
      const requestData = {
        userDetailId: 21,
        // userDetailId: userInfo?.userDetailId,
        name: '진료내역 자동 등록',
        status, 
        intakeAt: item.intakeAt, 
        hospitalName: item.hospitalName || '', 
        pharmacyName: item.pharmacyName || '', 
        prescriptionDay: item.prescriptionDay || 3, // 처방 일수
        userMedicationDetailList: item.userMedicationDetailList.map((pill) => ({
          dailyIntakeFrequency: pill.dailyIntakeFrequency || 3, // 하루 복용 횟수 기본값
          perAmount: pill.perAmount || 3, // 1회 복용량 기본값
          medicineId: pill.medicineId, // 약 ID
        })),
      };
      console.log(requestData)
      try {
        // 각 아이템별로 API 호출
        await fetchData(MEDICATIONADD, 'POST', requestData);
      } catch (error) {
        console.error(`아이템 ${index + 1} 등록 중 오류 발생:`, error);
      }
    });

    try {
      // 모든 요청이 완료될 때까지 기다림
      await Promise.all(promises);
      alert('모든 선택한 내역이 성공적으로 등록되었습니다.');
      navigate('/mypills'); // 성공 후 페이지 이동
    } catch (error) {
      console.error('등록 중 오류 발생:', error);
      alert('내역 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <Title>복약 중인 약 등록</Title>
      <Description>
         선택한 내역은 복용 중인 약에 자동 등록됩니다. 
         선택되지 않은 항목은 과거 이력에 등록됩니다.
       </Description>

      <div>
        {selectedItems.map((item, index) => (
          <ListItemComponent
            key={index}
            item={item}
            index={index}
            checked={checked[index]}
            handleCheck={handleCheck}
          />
        ))}
      </div>

      <ButtonContainer>
        <LongNextButton
          label="등록하기"
          onClick={handleNextClick}
          isSelected={isNextButtonActive}
          bgColor={colors.point1}
          borderColor={colors.point1}
          textColor="white"
          width='100%'
        />
      </ButtonContainer>
    </>
  );
}
