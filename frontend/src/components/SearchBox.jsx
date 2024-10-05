import { useState } from "react";
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

  const handleChangeInput = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  const handleTouchSearch = () => {
    onSearch(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleTouchSearch();
    }
  };

  return (
    <SearchBoxContainer>
      <input
        className="input"
        type="text"
        value={inputValue}
        onChange={handleChangeInput}
        onKeyDown={handleKeyDown}
        aria-label="Search input"
      />
      <div className="iconContainer" onTouchStart={handleTouchSearch}>
        <IoMdSearch className="icon" />
      </div>
    </SearchBoxContainer>
  );
};

export default SearchBox;
