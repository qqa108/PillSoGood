import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import styled from "styled-components";
import axios from "axios"; // axios 추가
import logoImage from "@/assets/logo.svg"; // 로고 이미지 경로
import notToEatIcon from "@/assets/nottoeat.svg"; // 병용금지 확인 아이콘 경로
import searchDrugIcon from "@/assets/searchdrug.svg"; // 의약품 검색 아이콘 경로
import eatingDrugIcon from "@/assets/eatingdrug.svg"; // 복용약 아이콘 경로
import addDrugPlusIcon from "@/assets/adddrugplus.svg"; // 복용약 추가 버튼 플러스 아이콘 경로
import colors from "../../assets/colors";
import { MAIN } from "@/assets/apis"; // API 경로 추가
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/userState";
import { mediListState } from "../../atoms/mediListState"; // 추가

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
  overflow-x: auto;
  white-space: nowrap;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const UserButton = styled.button`
  height: 1.9375rem;
  border-radius: 60px;
  padding: 0 0.5rem;
  flex-shrink: 0;
  background-color: ${({ $isSelected }) =>
    $isSelected ? colors.point1 : "white"}; // 선택된 사용자 버튼
  border: 1px solid ${colors.point4};
  color: ${({ $isSelected }) =>
    $isSelected ? "#fff" : colors.point1}; // 선택된 사용자 텍스트 색상
  cursor: pointer;
`;

const UserNameDisplay = styled.div`
  color: ${({ $isSelected }) =>
    $isSelected ? "#EBF3FF" : "#9C9C9C"}; // 선택된 사용자 텍스트 색상
  text-align: center;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const AddUserButton = styled(UserButton)`
  color: #9c9c9c;
  font-size: 1.25rem;
  flex-shrink: 1;
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
    ${({ $variant }) => ($variant === "search" ? "#0550B2" : "#0550B2")}; // $variant로 변경
  background-color: ${({ $variant }) =>
    $variant === "nottoeat" ? "#3382E9" : "#EBF3FF"}; // $variant로 변경
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
  min-height: 7rem;
  border-radius: 0.375rem;
  border: 1px solid #0550b2;
  background-color: #fff;
  gap: 0.5rem;
  position: relative;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
`;

const DrugWrapper = styled.div`
  margin: auto 0;
`;

const ScrollableDrugList = styled.div`
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  overflow-x: auto;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const NoDrugsText = styled.div`
  margin: 0 0 1rem 1rem;
  color: ${colors.text};
  font-size: 1rem;
  font-weight: 400;
  line-height: normal;
  width: 80%;
`;

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
  flex-shrink: 0;
`;

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

const MedicationItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  padding: 0.2rem 0.5rem 0 0.5rem;
  border-radius: 0.375rem;
`;

const MedicationName = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  color: ${colors.point1};
  margin-bottom: 0.3rem;
`;

const MedicationDetails = styled.div`
  font-size: 0.675rem;
  color: #555;
`;

const MedicationIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ isTaken }) =>
    isTaken ? "#EBF3FF" : "none"}; // 복약 여부에 따른 fill 처리
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
const UserManagement = ({ users, selectedUser, onUserSelect }) => {
  const navigate = useNavigate(); // useNavigate hook 사용
  const userInfo = useRecoilValue(userState); // Recoil에서 userState 가져오기

  return (
    <UserContainer>
      {/* 현재 사용자를 맨 앞에 표시 */}
      <UserButton
        $isSelected={selectedUser === userInfo.name}
        onClick={() => onUserSelect(userInfo.name)}
      >
        <UserNameDisplay $isSelected={selectedUser === userInfo.name}>
          {userInfo.name}
        </UserNameDisplay>
      </UserButton>
      {/* 나머지 사용자들 */}
      {users.map((user, index) => (
        <UserButton
          key={index}
          $isSelected={selectedUser === user.name}
          onClick={() => onUserSelect(user.name)}
        >
          <UserNameDisplay $isSelected={selectedUser === user.name}>
            {user.name}
          </UserNameDisplay>
        </UserButton>
      ))}
      {/* 사용자 추가 버튼 */}
      <AddUserButton onClick={() => navigate("/survey")}>
        사용자 추가
      </AddUserButton>
    </UserContainer>
  );
};

// 메뉴 버튼 컴포넌트
const MenuButtons = () => {
  const navigate = useNavigate(); // useNavigate hook 사용

  return (
    <MenuContainer>
      <MenuButton $variant="nottoeat" onClick={() => navigate("/home/compare")}>
        <MenuIcon
          src={notToEatIcon}
          alt="Not to Eat Icon"
          $variant="nottoeat"
        />
        <MenuText $variant="nottoeat">병용금지 확인</MenuText>
      </MenuButton>
      <MenuButton $variant="search" onClick={() => navigate("/search")}>
        <MenuIcon
          src={searchDrugIcon}
          alt="Search Drug Icon"
          $variant="search"
        />
        <MenuText $variant="search">의약품 검색</MenuText>
      </MenuButton>
    </MenuContainer>
  );
};

// 복용 중인 약 컴포넌트
const DrugList = ({ drugs }) => {
  const navigate = useNavigate(); // useNavigate hook 사용

  return (
    <div>
      <DrugSectionTitle>현재 복용중인 약</DrugSectionTitle>
      <DrugListContainer>
        <DrugWrapper>
          {drugs.length === 0 ? (
            <>
              <NoDrugsText>등록된 약이 없습니다.</NoDrugsText>
              <AddDrugButton onClick={() => navigate("/mypills/registerCard")}>
                <AddDrugIcon src={addDrugPlusIcon} alt="Add drug icon" />
              </AddDrugButton>
            </>
          ) : (
            <ScrollableDrugList>
              {drugs.map((drug, index) => (
                <DrugButtonContainer key={index}>
                  <DrugButton />
                  <DrugName>{drug}</DrugName> {/* 약 이름 출력 */}
                </DrugButtonContainer>
              ))}
              <AddDrugButton onClick={() => navigate("/mypills/registerCard")}>
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
  const userInfo = useRecoilValue(userState); // Recoil에서 userState 가져오기
  const mediListInfo = useRecoilValue(mediListState); // 복용 중인 약물 Recoil 값 가져오기
  const [users, setUsers] = useState([]); // 초기 사용자 목록
  const [selectedUser, setSelectedUser] = useState(userInfo.name); // 처음에 무조건 userInfo.name으로 설정
  const [drugs, setDrugs] = useState([]); // 복용 중인 약물
  const [medications, setMedications] = useState([]); // 복약 정보

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Token = localStorage.getItem("accessToken");
        const response = await axios.get(MAIN, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });

        const familyMembers = response.data.userInfo.familyMembers.map(
          (member) => ({
            name: member.name,
          })
        );

        setUsers(familyMembers);

        // 사용자 선택에 따라 데이터를 필터링하여 설정
        const pills = response.data.pill
          .filter((pill) => pill.user === selectedUser)
          .map((pill) => pill.name); // 약 이름을 가져옴
        setDrugs(pills);

        const userMedications = response.data.pill.filter(
          (pill) => pill.user === selectedUser
        );
        setMedications(userMedications);

        console.log("Selected User:", selectedUser); // 값 확인용
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [selectedUser]); // selectedUser가 변경될 때마다 실행

  const handleUserSelect = (userName) => {
    setSelectedUser(userName); // 사용자가 선택되면 상태 변경
  };

  return (
    <div>
      <Header>
        <Logo src={logoImage} alt="Logo" />
        <UserNameContainer>
          <UserName>{selectedUser}</UserName> {/* 현재 선택된 사용자 표시 */}
          <UserSuffix>님</UserSuffix>
        </UserNameContainer>
      </Header>
      <UserManagement
        users={users}
        selectedUser={selectedUser}
        onUserSelect={handleUserSelect}
      />
      <MenuButtons />
      <DrugList drugs={mediListInfo.map((pill) => pill.name)} />{" "}
      {/* mediListState에서 약 이름 가져오기 */}
      <MedicationStatus medications={medications} />
    </div>
  );
};

export default MainPage;
