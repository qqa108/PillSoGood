import React, { useState } from "react";
import styled from "styled-components";
import ActiveCheckIcon from "../assets/check_active.svg";
import InactiveCheckIcon from "../assets/check_inactive.svg";
import colors from "../assets/colors";

const SearchResultContainer = styled.div`
  width: 100%;
  height: 2.75rem;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  border-radius: 0.375rem;
  border: 1px solid
    ${({ isActive }) => (isActive ? colors.point1 : colors.point4)};
  background: #fff;
  color: #000;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  margin: 0.25rem 0;
`;

const SearchResultText = styled.div`
  display: flex;
  width: 85%;
  height: 1.75rem;
  flex-direction: column;
  justify-content: center;
  padding-left: 0.625rem;
`;

const CheckBoxIcon = styled.img`
  width: 15%;
  height: 1.5rem;
`;

const SearchResult = ({ text = "임시텍스트", isActive, onSelect }) => {
  // 선택 상태를 상위 컴포넌트에서 관리하도록 수정
  const handleSelect = () => {
    onSelect(text); // 상위 컴포넌트에 선택된 항목을 전달
  };

  return (
    <SearchResultContainer isActive={isActive} onClick={handleSelect}>
      <SearchResultText>{text}</SearchResultText>
      <CheckBoxIcon
        src={isActive ? ActiveCheckIcon : InactiveCheckIcon}
        alt="check icon"
      />
    </SearchResultContainer>
  );
};

export default SearchResult;
