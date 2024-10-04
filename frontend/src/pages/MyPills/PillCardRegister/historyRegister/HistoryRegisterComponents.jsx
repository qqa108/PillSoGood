import styled from 'styled-components';
import checkActive from '../../../../assets/check_active.svg';
import checkInactive from '../../../../assets/check_inactive.svg';

// ListItem 관련 스타일링
export const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #ccc;
`;

export const ListContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
`;

export const UpperRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0.5rem;
`;

export const LowerRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
`;

export const MedicineInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const CheckBoxImage = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
  align-self: center;
`;

export const ListNum = styled.div`
  align-self: center;
  font-weight: bold;
`;

// ButtonContainer 스타일링
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

// Title 및 Description 스타일링
export const Title = styled.h1`
  color: #000;
  text-align: center;
  margin-bottom: 1rem;
`;

export const Description = styled.p`
  color: #9C9C9C;
  text-align: center;
  margin-bottom: 1rem;
`;

// ListItem 컴포넌트
export function ListItemComponent({ item, index, checked, handleCheck }) {
  return (
    <ListItem key={item.num}>
      <ListNum>{index + 1}</ListNum>
      <ListContent>
        <UpperRow>
          <div>{item.진료일자}</div>
          <div>{item.병의원명}</div>
          <div>{item.진료형태}</div>
        </UpperRow>
        <LowerRow>
          {item.medicine.map((약품, i) => (
            <MedicineInfo key={i}>
              <span>{약품}</span>
              <span>투약횟수 : {item.투약횟수}회</span>
            </MedicineInfo>
          ))}
        </LowerRow>
      </ListContent>
      <CheckBoxImage
        src={checked ? checkActive : checkInactive}
        alt="checkbox"
        onClick={() => handleCheck(index)}
      />
    </ListItem>
  );
}
