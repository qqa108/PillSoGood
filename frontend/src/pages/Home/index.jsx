import React, { useState } from "react";
import styled from "styled-components";
import logoImage from "@/assets/logo.svg"; // 로고 이미지 경로
import notToEatIcon from "@/assets/nottoeat.svg"; // 병용금지 확인 아이콘 경로
import searchDrugIcon from "@/assets/searchdrug.svg"; // 의약품 검색 아이콘 경로
import eatingDrugIcon from "@/assets/eatingdrug.svg"; // 복용약 아이콘 경로
import addDrugLineIcon from "@/assets/adddrugline.svg"; // 복용약 추가 버튼 외곽선 아이콘 경로
import addDrugPlusIcon from "@/assets/adddrugplus.svg"; // 복용약 추가 버튼 플러스 아이콘 경로
import colors from "../../assets/colors";

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
  background-color: ${({ isSelected }) =>
    isSelected ? colors.point1 : "white"};
  border: 1px solid ${colors.point4};
  color: ${({ isSelected }) => (isSelected ? colors.point1 : "white")};
  cursor: pointer;
`;

const UserNameDisplay = styled.div`
  color: ${({ isSelected }) => (isSelected ? "#EBF3FF" : "#9C9C9C")};
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
  border: 1px solid
    ${({ variant }) => (variant === "search" ? "#0550B2" : "#0550B2")};
  background-color: ${({ variant }) =>
    variant === "nottoeat" ? "#3382E9" : "#EBF3FF"};
  cursor: pointer;
`;

const MenuIcon = styled.img`
  width: ${({ variant }) => (variant === "nottoeat" ? "5.3125rem" : "5rem")};
  height: ${({ variant }) => (variant === "nottoeat" ? "5.3125rem" : "5rem")};
  flex-shrink: 0;
`;

const MenuText = styled.div`
  color: ${({ variant }) => (variant === "nottoeat" ? "#EBF3FF" : "#033075")};
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
  height: 7rem;
  border-radius: 0.375rem;
  border: 1px solid #0550b2;
  background-color: #fff;
  gap: 0.5rem;
  position: relative;
  overflow-x: auto; /* 가로 스크롤을 가능하게 설정 */
  display: flex;
  flex-direction: column;
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
  margin: 1rem 0 0 1rem;
  color: #8c8585;
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
  margin: 0.35rem 0.35rem;
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
  font-size: 0.875rem;
  font-weight: 400;
  line-height: normal;
`;

// 사용자 관리 컴포넌트
const UserManagement = ({ users, selectedUser, onUserSelect, addUser }) => {
  return (
    <UserContainer>
      {users.map((user, index) => (
        <UserButton
          key={index}
          isSelected={selectedUser === user.name}
          onClick={() => onUserSelect(user.name)}
        >
          <UserNameDisplay isSelected={selectedUser === user.name}>
            {user.name}
          </UserNameDisplay>
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
        <MenuIcon
          src={searchDrugIcon}
          alt="Search Drug Icon"
          variant="search"
        />
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
      </DrugListContainer>
    </div>
  );
};

// 메인 페이지 컴포넌트
const MainPage = () => {
  const [users, setUsers] = useState([
    { name: "사용자1" },
    { name: "사용자2" },
  ]);
  const [selectedUser, setSelectedUser] = useState("사용자1");

  // 복용 중인 약 더미 데이터
  const [drugs, setDrugs] = useState(["두통약", "피부과약", "치과약"]); // 더미 데이터

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
    </div>
  );
};

export default MainPage;
