import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import logoImage from "@/assets/logo.svg";
import notToEatIcon from "@/assets/nottoeat.svg";
import searchDrugIcon from "@/assets/searchdrug.svg";
import eatingDrugIcon from "@/assets/eatingdrug.svg";
import addDrugPlusIcon from "@/assets/adddrugplus.svg";
import colors from "../../assets/colors";
import { MAIN } from "@/assets/apis";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/userState";
import { notificationState } from "../../atoms/notificationState";
import { mediListState } from "../../atoms/mediListState";
import useAxios from "../../hook/useAxios";
import { FAMILY } from "../../assets/apis";
import PillCardRegister from "../MyPills/PillCardRegister/RegisterModal"; // 모달 추가

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
    $isSelected ? colors.point1 : "white"};
  border: 1px solid ${colors.point4};
  color: ${({ $isSelected }) => ($isSelected ? "#fff" : colors.point1)};
  cursor: pointer;
`;

const UserNameDisplay = styled.div`
  color: ${({ $isSelected }) => ($isSelected ? "#EBF3FF" : "#9C9C9C")};
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
  gap: 5%;
  margin: 0.75rem 0;
`;

const MenuButton = styled.button`
  width: 47.5%;
  height: 8.5rem;
  border-radius: 0.625rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid
    ${({ $variant }) => ($variant === "search" ? "#0550B2" : "#0550B2")};
  background-color: ${({ $variant }) =>
    $variant === "nottoeat" ? "#3382E9" : "#EBF3FF"};
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
  margin-top: 0.5rem;
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
  width: 100%;
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
  width: 100%;
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
  background-color: ${({ isTaken }) => (isTaken ? "#EBF3FF" : "none")};
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
const UserManagement = ({ selectedUser, onUserSelect }) => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userState);
  const { data: familyData, loading, error } = useAxios(FAMILY, "GET");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <UserContainer>
      <UserButton
        $isSelected={selectedUser === userInfo.name}
        onClick={() => onUserSelect(userInfo.name)}
      >
        <UserNameDisplay $isSelected={selectedUser === userInfo.name}>
          {userInfo.name}
        </UserNameDisplay>
      </UserButton>
      {familyData
        .filter((member) => member.family !== "나")
        .map((member, index) => (
          <UserButton
            key={index}
            $isSelected={selectedUser === member.family}
            onClick={() => onUserSelect(member.family)}
          >
            <UserNameDisplay $isSelected={selectedUser === member.family}>
              {member.family}
            </UserNameDisplay>
          </UserButton>
        ))}
      <AddUserButton onClick={() => navigate("/survey")}>
        사용자 추가
      </AddUserButton>
    </UserContainer>
  );
};

// 메뉴 버튼 컴포넌트
const MenuButtons = () => {
  const navigate = useNavigate();

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
  const navigate = useNavigate();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // 모달 상태 추가

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const handleDrugClick = () => {
    navigate(`/mypills`);
  };

  return (
    <div>
      <DrugSectionTitle>현재 복용중인 약</DrugSectionTitle>
      <DrugListContainer>
        <DrugWrapper>
          {drugs.length === 0 ? (
            <>
              <NoDrugsText>등록된 약이 없습니다.</NoDrugsText>
              <AddDrugButton onClick={openRegisterModal}>
                {" "}
                {/* 모달 열기 */}
                <AddDrugIcon src={addDrugPlusIcon} alt="Add drug icon" />
              </AddDrugButton>
            </>
          ) : (
            <ScrollableDrugList>
              {drugs.map((drug, index) => (
                <DrugButtonContainer
                  key={index}
                  onClick={() => handleDrugClick(drug)}
                >
                  <DrugButton />
                  <DrugName>{drug}</DrugName>
                </DrugButtonContainer>
              ))}
              <AddDrugButton onClick={openRegisterModal}>
                {" "}
                <AddDrugIcon src={addDrugPlusIcon} alt="Add drug icon" />
              </AddDrugButton>
            </ScrollableDrugList>
          )}
        </DrugWrapper>
      </DrugListContainer>
      <PillCardRegister
        isModalOpen={isRegisterModalOpen}
        closeModal={closeRegisterModal}
      />
    </div>
  );
};
// 날짜 차이 계산 함수
const calculateDayDifference = (startDate, endDate) => {
  const start = new Date(startDate); // startDate를 Date 객체로 변환
  const end = new Date(endDate); // 오늘 날짜를 Date 객체로 변환

  // 날짜가 유효하지 않을 경우 처리
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    console.error("Invalid date format:", { startDate, endDate });
    return NaN;
  }

  const difference = end - start;
  return Math.floor(difference / (1000 * 60 * 60 * 24)); // 일 단위로 차이 계산
};

// 복약 현황 컴포넌트
const MedicationStatus = () => {
  const mediListInfo = useRecoilValue(mediListState); // 복약 목록
  const notifications = useRecoilValue(notificationState); // 알림 목록

  const [medicationStatus, setMedicationStatus] = useState([]);

  useEffect(() => {
    const calculateMedicationStatus = () => {
      const today = new Date().toISOString().split("T")[0]; // 오늘 날짜를 'YYYY-MM-DD' 형식으로 가져오기
      const statusList = mediListInfo.map((medication) => {
        const { intakeAt, prescriptionDay, user_medicine_id } = medication;

        // intakeAt를 'startDate'로 대체하여 사용
        const formattedStartDate = intakeAt ? intakeAt.split("T")[0] : null; // 필요한 경우 'T'로 분리해서 날짜만 사용

        if (!formattedStartDate) {
          console.error(
            "intakeAt is undefined or invalid for medication",
            medication
          );
          return null;
        }

        if (!prescriptionDay || isNaN(prescriptionDay)) {
          console.error(
            "prescriptionDay is undefined or invalid for medication",
            medication
          );
          return null;
        }

        // 먹은 지 며칠째인지 계산
        const daysTaken = calculateDayDifference(formattedStartDate, today);

        if (isNaN(daysTaken)) {
          console.error("Days taken calculation resulted in NaN", {
            formattedStartDate,
            today,
          });
          return null;
        }

        // 남은 복약 일수 계산
        const daysLeft = Math.max(prescriptionDay - daysTaken, 0);

        // 해당 약물의 알림 정보를 가져오기 (user_medicine_id 기준)
        const relatedNotification = notifications.find(
          (notification) => notification.user_medicine_id === user_medicine_id
        );

        // 알림 시간을 기반으로 하루에 몇 번 복용하는지 계산, 기본값 3회차 설정
        const dailyDosesCount = relatedNotification?.alertTimes.length || 3;

        return {
          name: medication.name,
          daysTaken,
          daysLeft,
          dailyDosesCount, // 하루 복용 횟수 추가, 기본값 3
        };
      });

      // null 항목을 제거한 리스트로 업데이트
      setMedicationStatus(statusList.filter((status) => status !== null));
    };

    calculateMedicationStatus();
  }, [mediListInfo, notifications]);

  return (
    <div>
      <MedicationStatusTitle>복약 현황</MedicationStatusTitle>
      <MedicationStatusContainer>
        {medicationStatus.length === 0 ? (
          <NoDrugsText>등록된 복용 일정이 없습니다.</NoDrugsText>
        ) : (
          medicationStatus.map((medication, index) => (
            <MedicationItem key={index}>
              <MedicationName>
                {medication.name}
                <MedicationDetails>
                  먹은 지 {medication.daysTaken}일째 | 남은 복약 일수:{" "}
                  {medication.daysLeft}일
                </MedicationDetails>
              </MedicationName>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {/* 기본적으로 3회차로 설정 */}
                {[...Array(medication.dailyDosesCount)].map((_, doseIndex) => (
                  <MedicationIcon key={doseIndex}>
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
  const userInfo = useRecoilValue(userState);
  const mediListInfo = useRecoilValue(mediListState);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(userInfo.name);
  const [drugs, setDrugs] = useState([]);
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Token = localStorage.getItem("accessToken");

        if (!Token) {
          console.error("토큰이 없습니다. 로그인 필요");
          return;
        }

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

        // 한 번의 필터링으로 약물 목록과 복약 현황 처리
        const userMedications = response.data.pill.filter(
          (pill) => pill.user === selectedUser
        );
        const pills = userMedications.map((pill) => pill.name);
        setDrugs(pills);
        setMedications(userMedications);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error("인증 에러: 토큰이 만료되었거나 잘못되었습니다.");
        } else {
          console.error("API 호출 중 오류 발생:", error);
        }
      }
    };
    // fetchData();
  }, [selectedUser]);

  const handleUserSelect = (userName) => {
    setSelectedUser(userName);
  };

  return (
    <div>
      <Header>
        <Logo src={logoImage} alt="Logo" />
        <UserNameContainer>
          <UserName>{selectedUser}</UserName>
          <UserSuffix>님</UserSuffix>
        </UserNameContainer>
      </Header>
      <UserManagement
        users={users}
        selectedUser={selectedUser}
        onUserSelect={handleUserSelect}
      />
      <MenuButtons />
      <DrugList drugs={mediListInfo.map((pill) => pill.name)} />
      <MedicationStatus medications={medications} />
    </div>
  );
};

export default MainPage;
