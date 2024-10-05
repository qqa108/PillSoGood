import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoMdSearch } from "react-icons/io";
import colors from "../assets/colors";

const SearchBoxContainer = styled.div`
  height: 2.625rem;
  display: flex;
  align-items: center;
  border-radius: 0.375rem;
  border: 2px solid ${colors.point1};
  background: #ffffff;

  .input {
    flex-grow: 1;
    height: 90%;
    width: 90%;
    border: none;
    outline: none;
    font-size: 1.25rem;
    color: ${colors.text};
    border-radius: 0.375rem;
    margin-left: 0.5rem;
  }

  .iconContainer {
    width: 10%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon {
    font-size: 1.5rem;
    color: ${colors.point1};
  }
`;

const SearchBox = ({ value = "", onSearch }) => {
  const [inputValue, setInputValue] = useState(value);

  // 사용자가 입력할 때마다 inputValue 업데이트
  const handleChangeInput = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue) {
        onSearch(inputValue); // 입력된 값으로 검색 함수 호출
      }
    }, 200); // 0.7초 대기

    return () => clearTimeout(timer); // 이전 타이머 제거
  }, [inputValue, onSearch]);

  return (
    <SearchBoxContainer>
      <input
        className="input"
        type="text"
        value={inputValue}
        onChange={handleChangeInput}
        aria-label="Search input"
      />
      <div className="iconContainer">
        <IoMdSearch className="icon" />
      </div>
    </SearchBoxContainer>
  );
};

export default SearchBox;
