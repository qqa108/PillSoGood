import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/userState";
import Header from "./homepage/Header";
import UserManagement from "./homepage/UserManagement";
import MenuButtons from "./homepage/MenuButtons";
import DrugList from "./homepage/DrugList";
import MedicationStatus from "./homepage/MedicationStatus";

const MainPage = () => {
  const userInfo = useRecoilValue(userState); // Recoil에서 고정된 userInfo 값을 가져옴
  const [selectedUser, setSelectedUser] = useState(null); // 선택된 사용자 상태 관리
  const [initialUserName, setInitialUserName] = useState(null); // 초기 고정된 userInfo.name 값

  // useEffect로 초기 유저 이름 설정 및 선택된 사용자 설정
  useEffect(() => {
    if (userInfo.name) {
      console.log("Initial userInfo in MainPage:", userInfo);
      setInitialUserName(userInfo.name); // 초기 고정된 userInfo.name 값을 설정
      setSelectedUser(userInfo.name); // 처음 페이지 로드 시 선택된 사용자로 설정
    }
  }, [userInfo]);

  // 유저 선택 시 호출되는 함수
  const handleUserSelect = (userName) => {
    setSelectedUser(userName); // 클릭된 유저로 상태 업데이트
  };

  return (
    <div>
      {/* Header에서는 고정된 초기 userInfo.name을 사용 */}
      <Header userInfo={{ name: initialUserName }} />

      {/* UserManagement에서 선택된 사용자 관리 */}
      <UserManagement
        selectedUser={selectedUser} // 선택된 사용자 전달
        onUserSelect={handleUserSelect} // 유저 선택 시 호출되는 함수 전달
      />

      {/* 메뉴 버튼 및 약물 리스트 등 */}
      <MenuButtons />
      <DrugList />
      <MedicationStatus />
    </div>
  );
};

export default MainPage;
