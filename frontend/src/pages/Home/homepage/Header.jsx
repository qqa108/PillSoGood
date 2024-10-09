import React from "react";
import styled from "styled-components";
import logoImage from "@/assets/logo.svg";

const HeaderContainer = styled.div`
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

const Header = ({ userInfo }) => {
  return (
    <HeaderContainer>
      <Logo src={logoImage} alt="Logo" />
      <UserNameContainer>
        {/* 고정된 userInfo.name을 표시 */}
        <UserName>{userInfo.name}</UserName>
        <UserSuffix>님</UserSuffix>
      </UserNameContainer>
    </HeaderContainer>
  );
};

export default Header;
