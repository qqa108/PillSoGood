import { useState } from 'react';
import { ListItemComponent, ButtonContainer, Title, Description } from './HistoryRegisterComponents';
import LongNextButton from '../../../../components/LongNextButton';
import colors from '../../../../assets/colors';

const initialData = [
    {
      num: 1,
      medicine: ['타이레놀'],
      진료일자: '2024-01-10',
      투약횟수: 3,
      처방횟수: 1,
      병의원명: '서울약국',
      진료형태: '외래',
    },
    {
      num: 2,
      medicine: ['이부프로펜'],
      진료일자: '2023-02-15',
      투약횟수: 5,
      처방횟수: 2,
      병의원명: '강남병원',
      진료형태: '입원',
    },
    {
      num: 3,
      medicine: ['아모클라'],
      진료일자: '2023-03-20',
      투약횟수: 2,
      처방횟수: 1,
      병의원명: '부산의원',
      진료형태: '외래',
    },
    {
      num: 4,
      medicine: ['클래리시드'],
      진료일자: '2023-04-22',
      투약횟수: 4,
      처방횟수: 2,
      병의원명: '대전병원',
      진료형태: '외래',
    },
    {
      num: 5,
      medicine: ['아모클라', '세파클러','가리온정'],
      진료일자: '2023-05-11',
      투약횟수: 3,
      처방횟수: 1,
      병의원명: '서울의원',
      진료형태: '외래',
    },
  ];


export default function SelectPage({ onNext }) {
  const [data, setData] = useState(initialData);
  const [checked, setChecked] = useState(Array(initialData.length).fill(false));

  const handleCheck = (index) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  const isNextButtonActive = checked.some((isChecked) => isChecked);

  const handleNextClick = () => {
    const selectedItems = data.filter((_, index) => checked[index]);
    onNext(selectedItems); // 선택된 항목을 부모 컴포넌트로 전달
  };

  return (
    <>
      <Title>진료내역</Title>
      <Description>
          복약 기록 혹은 복용 중인 약에 <br></br>
          등록 할 진료 내역을 선택해주세요.
        </Description>

      <div>
        {data.map((item, index) => (
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
          label="가져오기"
          onClick={handleNextClick}
          isSelected={isNextButtonActive}
          bgColor={colors.point1}
          borderColor={colors.point1}
          textColor="white"
        />
      </ButtonContainer>
    </>
  );
}
