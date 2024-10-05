import React, { useState } from 'react';
import styled from 'styled-components';
import logoImage from '@/assets/logo.svg'; // 로고 이미지 경로
import notToEatIcon from '@/assets/nottoeat.svg'; // 병용금지 확인 아이콘 경로
import searchDrugIcon from '@/assets/searchdrug.svg'; // 의약품 검색 아이콘 경로
import eatingDrugIcon from '@/assets/eatingdrug.svg'; // 복용약 아이콘 경로
import addDrugLineIcon from '@/assets/adddrugline.svg'; // 복용약 추가 버튼 외곽선 아이콘 경로
import addDrugPlusIcon from '@/assets/adddrugplus.svg'; // 복용약 추가 버튼 플러스 아이콘 경로
import colors from '../../assets/colors';

// Part 1: 헤더
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0rem;
    background-color: #f5f5f5;
`;

const Logo = styled.img`
    width: 5.25rem;
    height: 1.5625rem;
    flex-shrink: 0;
`;

const UserNameContainer = styled.div`
    display: flex;
    align-items: center;
`;

const UserName = styled.span`
    color: #033075;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const UserSuffix = styled.span`
    color: #000;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

// 더미 데이터 추가
const dummyDrugs = ["아토피약", "당뇨약", "혈압약"]; // 복용 중인 약 더미 데이터

const dummyMedications = [
  {
    name: "아토피약",
    daysTaken: 5,
    daysLeft: 10,
    doses: [
      { isTaken: true }, // 1회차 복용 완료
      { isTaken: false }, // 2회차 복용 미완료
      { isTaken: false }, // 3회차 복용 미완료
    ],
  },
  {
    name: "당뇨약",
    daysTaken: 3,
    daysLeft: 7,
    doses: [
      { isTaken: true }, // 1회차 복용 완료
      { isTaken: true }, // 2회차 복용 완료
      { isTaken: false }, // 3회차 복용 미완료
    ],
  },
  {
    name: "혈압약",
    daysTaken: 7,
    daysLeft: 14,
    doses: [
      { isTaken: true }, // 1회차 복용 완료
      { isTaken: true }, // 2회차 복용 완료
      { isTaken: true }, // 3회차 복용 완료
    ],
  },
];
// Part 2: 사용자 관리 컴포넌트
const UserContainer = styled.div`
    margin: 0.5rem 0;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    flex-direction: row;
    overflow-x: auto; /* 가로 스크롤을 가능하게 함 */
    white-space: nowrap; /* 내용이 한 줄로 유지되도록 함 */

    /* 스크롤바 숨기기 */
    ::-webkit-scrollbar {
        display: none; /* 크롬, 사파리에서 스크롤바 숨기기 */
    }

    -ms-overflow-style: none; /* IE, Edge에서 스크롤바 숨기기 */
    scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
`;

// 사용자 버튼 스타일 (선택/미선택에 따라 다른 스타일 적용)
const UserButton = styled.button`
    height: 1.9375rem;
    border-radius: 60px;
    padding: 0 0.5rem; /* 텍스트 양옆에 패딩을 줘서 크기 조절 */
    flex-shrink: 0;
    background-color: ${({ isSelected }) => (isSelected ? colors.point1 : 'white')};
    border: 1px solid ${colors.point4};
    color: ${({ isSelected }) => (isSelected ? colors.point1 : 'white')};
    cursor: pointer;
`;

const UserNameDisplay = styled.div`
    color: ${({ isSelected }) => (isSelected ? '#EBF3FF' : '#9C9C9C')};
    text-align: center;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

// 사용자 추가 버튼 스타일
const AddUserButton = styled(UserButton)`
    color: #9c9c9c;
    font-size: 1.25rem;
    flex-shrink: 1; /* 텍스트 길이에 맞춰 버튼 크기가 조정되도록 설정 */
`;

// Part 3: 메뉴 버튼 컴포넌트
const MenuContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
`;

const MenuButton = styled.button`
    width: 8.75rem;
    height: 8.4375rem;
    border-radius: 0.625rem;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid ${({ variant }) => (variant === 'search' ? '#0550B2' : '#0550B2')};
    background-color: ${({ variant }) => (variant === 'nottoeat' ? '#3382E9' : '#EBF3FF')};
    cursor: pointer;
`;

const MenuIcon = styled.img`
    width: ${({ variant }) => (variant === 'nottoeat' ? '5.3125rem' : '5rem')};
    height: ${({ variant }) => (variant === 'nottoeat' ? '5.3125rem' : '5rem')};
    flex-shrink: 0;
`;

const MenuText = styled.div`
    color: ${({ variant }) => (variant === 'nottoeat' ? '#EBF3FF' : '#033075')};
    text-align: center;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

// Part 4: 복용 중인 약
const DrugSectionTitle = styled.div`
    color: #000;
    font-family: NanumGothic;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 0.5rem;
`;

const DrugListContainer = styled.div`
  width: 18.5rem;
  min-height: 7rem;
  border-radius: 0.375rem;
  border: 1px solid #0550b2;
  background-color: #fff;
  gap: 0.5rem;
  position: relative;
  overflow-x: auto; /* 가로 스크롤을 가능하게 설정 */
  display: flex;
  flex-direction: column;
`;

const DrugWrapper = styled.div`
  margin: auto 0;
`;

const ScrollableDrugList = styled.div`
    display: flex;
    flex-direction: row; /* 약물이 가로로 나열되도록 설정 */
    white-space: nowrap;
    overflow-x: auto; /* 가로 스크롤 가능 */

    /* 스크롤바 숨기기 */
    ::-webkit-scrollbar {
        display: none; /* 크롬, 사파리에서 스크롤바 숨기기 */
    }
    -ms-overflow-style: none; /* IE, Edge에서 스크롤바 숨기기 */
    scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
`;

const NoDrugsText = styled.div`
  margin: 0 0 1rem 1rem;
  color: ${colors.text};
  font-size: 1rem;
  font-weight: 400;
  line-height: normal;
  width: 80%;
`;

// 약물 추가 버튼 (외곽선)
const AddDrugButton = styled.button`
  width: 3rem;
  height: 3.25rem;
  border-radius: 3.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0.35rem 0.75rem;
  border: 1px dashed ${colors.point2};
  background-color: white;
  flex-shrink: 0; /* 버튼 크기 고정 */
`;

// 추가 버튼 내부의 '+'
const AddDrugIcon = styled.img`
    width: 1.25rem;
    height: 1.25rem;
    position: absolute;
    border: none;
`;

const DrugButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    gap: 0.25rem;
    cursor: pointer;
`;

const DrugButton = styled.button`
    width: 4rem;
    height: 3rem;
    border-radius: 3.125rem;
    background: url(${eatingDrugIcon}) no-repeat center center;
    background-size: contain;
    flex-shrink: 0;
    border: none;
`;

const DrugName = styled.div`
  color: #0550b2;
  text-align: center;
  font-family: NanumGothic;
  font-size: 0.675rem;
  font-weight: 400;
  line-height: normal;
`;

// Part 5: 복약 현황 제목
const MedicationStatusTitle = styled.div`
  color: #000;
  font-family: NanumGothic;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0.5rem 0 0.5rem 0;
`;

// 복약 현황 리스트 컨테이너
const MedicationStatusContainer = styled.div`
  width: 18.5rem;
  min-height: 5rem;
  border-radius: 0.375rem;
  border: 1px solid #0550b2;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 0.5rem;
`;

// 복약 현황 아이템 (약물 정보)
const MedicationItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  padding: 0.2rem 0.5rem 0 0.5rem;
  border-radius: 0.375rem;
`;

// 약물 이름
const MedicationName = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  color: ${colors.point1};
  margin-bottom: 0.3rem;
`;

// 복용 일수 정보 (누락된 부분 추가)
const MedicationDetails = styled.div`
  font-size: 0.675rem;
  color: #555;
`;

// 복용 횟수 아이콘 (누락된 부분 추가)
const MedicationIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ isTaken }) =>
    isTaken ? "#EBF3FF" : "none"}; // 복약여부에 따른 fill 처리
  border: 1px solid #0550b2;
  border-radius: 50%;
  margin-bottom: 0.5rem;
`;

const MedicationIconText = styled.span`
  color: #0550b2;
  text-align: center;
  font-family: NanumGothic;
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

// 사용자 관리 컴포넌트
const UserManagement = ({ users, selectedUser, onUserSelect, addUser }) => {
    return (
        <UserContainer>
            {users.map((user, index) => (
                <UserButton key={index} isSelected={selectedUser === user.name} onClick={() => onUserSelect(user.name)}>
                    <UserNameDisplay isSelected={selectedUser === user.name}>{user.name}</UserNameDisplay>
                </UserButton>
            ))}
            <AddUserButton onClick={addUser}>사용자 추가</AddUserButton>
        </UserContainer>
    );
};

// 메뉴 버튼 컴포넌트
const MenuButtons = () => {
    return (
        <MenuContainer>
            <MenuButton variant="nottoeat">
                <MenuIcon src={notToEatIcon} alt="Not to Eat Icon" variant="nottoeat" />
                <MenuText variant="nottoeat">병용금지 확인</MenuText>
            </MenuButton>
            <MenuButton variant="search">
                <MenuIcon src={searchDrugIcon} alt="Search Drug Icon" variant="search" />
                <MenuText variant="search">의약품 검색</MenuText>
            </MenuButton>
        </MenuContainer>
    );
};

// 복용 중인 약 컴포넌트
const DrugList = ({ drugs }) => {
  return (
    <div>
      <DrugSectionTitle>현재 복용중인 약</DrugSectionTitle>
      <DrugListContainer>
        <DrugWrapper>
          {drugs.length === 0 ? (
            // 약물이 없을 때 표시되는 텍스트와 추가 버튼
            <>
              <NoDrugsText>등록된 약이 없습니다.</NoDrugsText>
              <AddDrugButton>
                <AddDrugIcon src={addDrugPlusIcon} alt="Add drug icon" />
              </AddDrugButton>
            </>
          ) : (
            // 약물이 있을 때 표시되는 약물 리스트와 추가 버튼
            <ScrollableDrugList>
              {drugs.map((drug, index) => (
                <DrugButtonContainer key={index}>
                  <DrugButton />
                  <DrugName>{drug}</DrugName>
                </DrugButtonContainer>
              ))}
              <AddDrugButton>
                <AddDrugIcon src={addDrugPlusIcon} alt="Add drug icon" />
              </AddDrugButton>
            </ScrollableDrugList>
          )}
        </DrugWrapper>
      </DrugListContainer>
    </div>
  );
};

// 복약 현황 컴포넌트
const MedicationStatus = ({ medications }) => {
  return (
    <div>
      <MedicationStatusTitle>복약 현황</MedicationStatusTitle>
      <MedicationStatusContainer>
        {medications.length === 0 ? (
          <NoDrugsText>등록된 복용 일정이 없습니다.</NoDrugsText>
        ) : (
          medications.map((medication, index) => (
            <MedicationItem key={index}>
              <MedicationName>
                {medication.name}
                <MedicationDetails>
                  먹은지 {medication.daysTaken}일째 | 남은 복약 일수 :{" "}
                  {medication.daysLeft}일
                </MedicationDetails>
              </MedicationName>
              {/* 복약 횟수 아이콘 */}
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {medication.doses.map((dose, doseIndex) => (
                  <MedicationIcon key={doseIndex} isTaken={dose.isTaken}>
                    <MedicationIconText>{`${doseIndex + 1}회차`}</MedicationIconText>
                  </MedicationIcon>
                ))}
              </div>
            </MedicationItem>
          ))
        )}
      </MedicationStatusContainer>
    </div>
  );
};

// 메인 페이지 컴포넌트
const MainPage = () => {
    const [users, setUsers] = useState([{ name: '사용자1' }, { name: '사용자2' }]);
    const [selectedUser, setSelectedUser] = useState('사용자1');

  // 복용 중인 약 더미 데이터
  const [drugs, setDrugs] = useState(dummyDrugs); // 더미 데이터 사용

  // 복약 중인 약 더미 데이터
  const exampleMedications = dummyMedications; // 더미 데이터 사용

    // 사용자 선택 핸들러
    const handleUserSelect = (userName) => {
        setSelectedUser(userName);
    };

    // 사용자 추가 핸들러
    const handleAddUser = () => {
        const newUserName = `사용자${users.length + 1}`;
        setUsers([...users, { name: newUserName }]);
    };

    return (
        <div>
            {/* Part 1: 헤더 */}
            <Header>
                <Logo src={logoImage} alt="Logo" />
                <UserNameContainer>
                    <UserName>{selectedUser}</UserName>
                    <UserSuffix>님</UserSuffix>
                </UserNameContainer>
            </Header>

            {/* Part 2: 사용자 관리 */}
            <UserManagement
                users={users}
                selectedUser={selectedUser}
                onUserSelect={handleUserSelect}
                addUser={handleAddUser}
            />

            {/* Part 3: 메뉴 버튼 */}
            <MenuButtons />

      {/* Part 4: 복용중인 약 */}
      <DrugList drugs={drugs} />

      {/* Part 5: 복약 현황 */}
      <MedicationStatus medications={exampleMedications} />
    </div>
  );
};

export default MainPage;
