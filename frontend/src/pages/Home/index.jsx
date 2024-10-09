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
import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../../atoms/userState";
import { notificationState } from "../../atoms/notificationState";
import { mediListState } from "../../atoms/mediListState";
import useAxios from "../../hook/useAxios";
import { FAMILY } from "../../assets/apis";
import PillCardRegister from "../MyPills/PillCardRegister/RegisterModal";
import Modal from "@/components/Modal"; // 모달 컴포넌트 추가
import HistoryDetail from "../History/HistoryDetail"; // 상세 정보 컴포넌트 추가
import { surveyAnswersState } from "../../atoms/surveyState";
import { selectedPillsState } from "../../atoms/selectedPillsState";
import { currentStepState } from "../../atoms/surveyState";

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
  margin-bottom: 5rem;
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
  background-color: ${({ $isTaken }) => ($isTaken ? "#EBF3FF" : "none")};
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

const ScrollableIcons = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

// 사용자 관리 컴포넌트
const UserManagement = ({ selectedUser, onUserSelect }) => {
  const [userInfo, setUserInfo] = useRecoilState(userState); // Recoil 상태 관리
  const { data: familyData, loading, error } = useAxios(FAMILY, "GET");
  const navigate = useNavigate();

  const [users, setUsers] = useState([]); // 사용자 목록 상태
  const [selectedPillsRecoil, setSelectedPillsState] = useRecoilState(selectedPillsState);
  const [surveyAnswers, setSurveyAnswers] = useRecoilState(surveyAnswersState);
  const [ currentStepReocil, setcurrentStepReocil] = useRecoilState(currentStepState)
  useEffect(() => {
    setSelectedPillsState({})
    setSurveyAnswers([])
    setcurrentStepReocil(1)
    console.log(
      'selectedPillsRecoil',selectedPillsRecoil, 
      'surveyAnswers',surveyAnswers,
      'currentStepReocil',currentStepReocil
    )

    if (!loading && familyData) {
      const familyUsers = familyData.map((member) => ({
        name:
          member.family === "나" || member.family === "본인"
            ? userInfo.name
            : member.family, // 관계가 '나' 또는 '본인'이면 userInfo.name 사용
        userDetailId: member.userDetailId,
      }));

      setUsers(familyUsers); // 가족 구성원 목록을 상태에 설정
    }
  }, [familyData, loading, userInfo.name]);

  const handleUserSelect = (name, userDetailId) => {
    // Recoil의 userState를 업데이트
    setUserInfo((prevState) => ({
      ...prevState,
      name: name,
      userDetailId: userDetailId,
    }));

    onUserSelect(name); // 선택된 사용자 이름을 상위 컴포넌트로 전달
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <UserContainer>
      {users.map((user, index) => (
        <UserButton
          key={index}
          $isSelected={selectedUser === user.name} // 선택된 사용자에 대한 스타일링을 적용
          onClick={() => handleUserSelect(user.name, user.userDetailId)}
        >
          <UserNameDisplay $isSelected={selectedUser === user.name}>
            {user.name}
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
const DrugList = () => {
  const mediListInfo = useRecoilValue(mediListState); // 약물 정보
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // 약 추가 모달 상태
  const [selectedDrug, setSelectedDrug] = useState(null); // 선택된 약 정보 저장

  // 약 클릭 시 모달 열기
  const openDrugDetailModal = (drug) => {
    setSelectedDrug(drug); // 선택한 약 저장
    setIsRegisterModalOpen(false); // 약 추가 모달은 닫고
  };

  // 약 추가 모달 열기
  const openRegisterModal = () => {
    setSelectedDrug(null); // 선택된 약은 없고
    setIsRegisterModalOpen(true); // 약 추가 모달 열기
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedDrug(null); // 선택된 약 초기화
    setIsRegisterModalOpen(false); // 모든 모달 닫기
  };

  return (
    <div>
      <DrugSectionTitle>현재 복용중인 약</DrugSectionTitle>
      <DrugListContainer>
        <DrugWrapper>
          {mediListInfo.length === 0 ? (
            <>
              <NoDrugsText>등록된 약이 없습니다.</NoDrugsText>
              <AddDrugButton onClick={openRegisterModal}>
                <AddDrugIcon src={addDrugPlusIcon} alt="Add drug icon" />
              </AddDrugButton>
            </>
          ) : (
            <ScrollableDrugList>
              {mediListInfo.map((drug, index) => (
                <DrugButtonContainer
                  key={index}
                  onClick={() => openDrugDetailModal(drug)}
                >
                  <DrugButton />
                  <DrugName>{drug.name}</DrugName> {/* 약 이름 출력 */}
                </DrugButtonContainer>
              ))}
              <AddDrugButton onClick={openRegisterModal}>
                <AddDrugIcon src={addDrugPlusIcon} alt="Add drug icon" />
              </AddDrugButton>
            </ScrollableDrugList>
          )}
        </DrugWrapper>
      </DrugListContainer>

      {/* 약 클릭 시 상세 정보 모달 */}
      {selectedDrug && (
        <Modal onClose={closeModal}>
          <HistoryDetail detailInfo={selectedDrug} />
        </Modal>
      )}

      {/* 약 추가 버튼 클릭 시 약 추가 모달 */}
      {isRegisterModalOpen && (
        <PillCardRegister
          isModalOpen={isRegisterModalOpen}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};
// 날짜 차이 계산 함수
const calculateDayDifference = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    console.error("Invalid date format:", { startDate, endDate });
    return NaN;
  }
  const difference = end - start;
  return Math.floor(difference / (1000 * 60 * 60 * 24)); // 일 단위 차이 계산
};

// 복약 현황 컴포넌트
const MedicationStatus = () => {
  const mediListInfo = useRecoilValue(mediListState); // 복약 목록
  const notifications = useRecoilValue(notificationState); // 알림 목록
  const [medicationStatus, setMedicationStatus] = useState([]);

  useEffect(() => {
    const calculateMedicationStatus = () => {
      const now = new Date(); // 현재 시간
      const today = now.toISOString().split("T")[0]; // 오늘 날짜 'YYYY-MM-DD' 형식
      const currentHourMinute = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`; // 현재 시간 HH:MM 형식

      const statusList = mediListInfo.map((medication) => {
        console.log("Medication Data:", medication); // 데이터를 제대로 확인하기 위한 로그

        const { prescriptionDay, id, name } = medication; // 각 약물의 고유 ID 및 이름, 처방일

        // 약물에 대한 알림 정보 찾기
        const relatedNotification = notifications.find(
          (notification) => notification.id === id
        );

        if (!relatedNotification || !relatedNotification.alertTimes) {
          console.warn(
            "No notification or alert times found for medication",
            medication
          );
          return null;
        }

        // 알림 시간에서 가장 빠른 날짜 찾기
        const firstAlertDate = new Date(
          Math.min(
            ...relatedNotification.alertTimes.map((alert) => new Date(alert))
          )
        );
        const formattedFirstAlertDate = firstAlertDate
          .toISOString()
          .split("T")[0];

        // 오늘 날짜와 첫 알림 날짜를 기준으로 먹은 지 며칠째인지 계산
        const daysTaken = calculateDayDifference(
          formattedFirstAlertDate,
          today
        );

        // 남은 복약 일수 계산
        const daysLeft = Math.max(prescriptionDay - daysTaken, 0);

        // 오늘의 알림만 필터링하여 가져오기
        const dailyDosesTimes = relatedNotification.alertTimes
          .filter((alert) => {
            const alertDate = new Date(alert);
            const alertDay = alertDate.toISOString().split("T")[0];
            return alertDay === today;
          })
          .map((alert) => {
            const alertDate = new Date(alert);
            const koreanTime = new Date(
              alertDate.getTime() + 9 * 60 * 60 * 1000
            ); // UTC -> KST 변환
            const hours = String(koreanTime.getHours()).padStart(2, "0");
            const minutes = String(koreanTime.getMinutes()).padStart(2, "0");
            return `${hours}:${minutes}`;
          });

        return {
          name: name || "이름 없음", // name이 없을 때 기본값 처리
          daysTaken,
          daysLeft,
          dailyDosesTimes,
          currentHourMinute,
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
                {medication.name} {/* 이름 출력 */}
                <MedicationDetails>
                  먹은 지 {medication.daysTaken}일째 | 남은 복약 일수:{" "}
                  {medication.daysLeft}일
                </MedicationDetails>
              </MedicationName>
              <ScrollableIcons>
                {medication.dailyDosesTimes.map((doseTime, doseIndex) => {
                  const isTaken = doseTime <= medication.currentHourMinute;
                  return (
                    <MedicationIcon key={doseIndex} $isTaken={isTaken}>
                      <MedicationIconText>{`${doseIndex + 1}회차`}</MedicationIconText>
                    </MedicationIcon>
                  );
                })}
              </ScrollableIcons>
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
