import { useState } from 'react';
import { ListItemComponent, ButtonContainer, Title, Description } from './HistoryRegisterComponents';
import LongNextButton from '../../../../components/LongNextButton';
import colors from '../../../../assets/colors';

export default function NextPage({ selectedItems, onNext }) {
  const [checked, setChecked] = useState(Array(selectedItems.length).fill(false));

  const handleCheck = (index) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  const isNextButtonActive = checked.some((isChecked) => isChecked);

  const handleNextClick = () => {
    const filteredItems = selectedItems.filter((_, index) => checked[index]);
    onNext(filteredItems);
  };

  return (
    <>
      <Title>복약 중인 약 등록</Title>
      <Description>
         선택한 내역은 복용 중인 약에 자동 등록됩니다. <br></br>
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
        />
      </ButtonContainer>
    </>
  );
}
