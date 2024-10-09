import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from "../../../atoms/userState";
import useAxios from "../../../hook/useAxios";
import { FAMILY } from "../../../assets/apis";
import colors from "../../../assets/colors.jsx";

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
`;

const UserButton = styled.button`
  height: 1.9375rem;
  border-radius: 60px;
  padding: 0 0.5rem;
  background-color: ${({ $isSelected }) =>
    $isSelected ? colors.point1 : "white"};
  border: 1px solid ${colors.point4};
  color: ${({ $isSelected }) => ($isSelected ? "#fff" : "#3382e9")};
  cursor: pointer;
`;

const UserNameDisplay = styled.div`
  color: ${({ $isSelected }) => ($isSelected ? "#EBF3FF" : "#9C9C9C")};
  text-align: center;
  font-size: 1.25rem;
`;

const AddUserButton = styled(UserButton)`
  color: #9c9c9c;
  font-size: 1.25rem;
`;

const UserManagement = ({ selectedUser, onUserSelect }) => {
  const [userInfo, setUserInfo] = useRecoilState(userState); // Recoil로 사용자 정보 관리
  const { data: familyData, loading, error } = useAxios(FAMILY, "GET");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && familyData && users.length === 0) {
      const familyUsers = familyData.map((member) => ({
        name: member.family,
        userDetailId: member.userDetailId,
      }));
      setUsers(familyUsers);

      // 첫 번째 사용자 자동 선택
      if (familyUsers.length > 0 && !selectedUser) {
        const firstUser = familyUsers[0];
        onUserSelect(firstUser.name); // 첫 번째 사용자를 선택
        setUserInfo((prevState) => ({
          ...prevState,
          userDetailId: firstUser.userDetailId, // userDetailId 설정
        }));
      }
    }
  }, [familyData, loading]);

  const handleUserSelect = (name, userDetailId) => {
    // userState 업데이트: userDetailId만 변경
    setUserInfo((prevState) => ({
      ...prevState,
      userDetailId, // 선택된 사용자의 userDetailId로만 업데이트
    }));

    // 선택된 사용자는 상위 컴포넌트에 전달 (UI 업데이트용)
    onUserSelect(name);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <UserContainer>
      {users.map((user, index) => (
        <UserButton
          key={index}
          $isSelected={selectedUser === user.name}
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

export default UserManagement;
