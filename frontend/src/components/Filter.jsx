import React, { useState } from "react";
import styled from "styled-components";
import colors from "../assets/colors";

// 스타일링
const MainFilterContainer = styled.div``;

const FilterSection = styled.div`
  padding: 0.5rem;
  background-color: white;
  color: ${colors.text};
  border-radius: 0.1875rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0.125rem 0;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${colors.text};
  font-weight: 500;
  font-size: 1rem;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FilterButton = styled.button`
  background-color: ${(props) =>
    props.$active ? colors.point1 : "white"}; // active 상태에 따른 배경색
  color: ${(props) =>
    props.$active ? "white" : colors.text}; // active 상태에 따른 텍스트 색상
  padding: 0.25rem 0.5rem;
  border: 1px solid ${colors.point4};
  border-radius: 0.75rem;
  cursor: pointer;

  &:hover {
    background-color: ${colors.point1};
    color: white;
  }
`;

const ApplyResetContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Button = styled.button`
  background-color: white; /* 초기 상태는 흰색 */
  color: ${colors.point1}; /* 텍스트 색상 */
  padding: 0.5rem 1rem;
  border: 1px solid ${colors.point1}; /* 경계선은 point1 색상 */
  border-radius: 0.75rem;
  cursor: pointer;

  &:hover {
    background-color: ${colors.point1};
    color: white;
  }
`;

const Filter = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(""); // 현재 선택된 카테고리 상태

  // 카테고리 선택 핸들러
  const toggleCategory = (category) => {
    const newCategory = selectedCategory === category ? "" : category;
    setSelectedCategory(newCategory); // 카테고리를 업데이트
  };

  // 필터 적용 핸들러
  const applyFilter = () => {
    onFilterChange({ category: selectedCategory }); // 선택된 카테고리를 상위 컴포넌트로 전달
  };

  // 필터 초기화 핸들러
  const resetFilter = () => {
    setSelectedCategory(""); // 카테고리 선택 초기화
    onFilterChange({ category: "" }); // 빈 카테고리를 상위 컴포넌트로 전달
  };

  return (
    <MainFilterContainer>
      <FilterSection>
        <FilterHeader>
          <h3>구분</h3>
        </FilterHeader>
        <FilterGroup>
          {/* 일반 카테고리 필터 버튼 */}
          <FilterButton
            $active={selectedCategory === "일반"} // "일반"이 선택된 경우 active 상태
            onClick={() => toggleCategory("일반")}
          >
            일반
          </FilterButton>
          {/* 전문 카테고리 필터 버튼 */}
          <FilterButton
            $active={selectedCategory === "전문"} // "전문"이 선택된 경우 active 상태
            onClick={() => toggleCategory("전문")}
          >
            전문
          </FilterButton>
        </FilterGroup>
      </FilterSection>

      {/* 필터 적용 및 초기화 버튼 */}
      <ApplyResetContainer>
        <Button onClick={applyFilter}>필터 적용</Button>
        <Button onClick={resetFilter}>필터 초기화</Button>
      </ApplyResetContainer>
    </MainFilterContainer>
  );
};

export default Filter;
