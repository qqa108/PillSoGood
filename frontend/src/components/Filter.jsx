import React, { useState } from "react";
import styled from "styled-components";
import colors from "../assets/colors";

const category_mapping = {
  전문: ["전문", "전문(희귀)"],
  일반: ["일반"],
};

const color_mapping = {
  빨간색: ["빨간색", "암적색", "적갈색", "주황색"],
  노란색: [
    "노란색",
    "금색",
    "미황색",
    "황갈색",
    "황백색",
    "담황색",
    "황색",
    "황록색",
  ],
  갈색: ["갈색", "암갈색"],
  파란색: ["파란색", "하늘색", "남색", "청색"],
  녹색: ["녹색", "초록색", "연두색", "녹황색"],
  분홍색: ["분홍색", "연분홍색"],
  흰색: ["흰색", "크림색", "백색", "회백색"],
  검정색: ["흑색"],
  무색: ["무색", "투명"],
  보라색: ["보라색"],
  회색: ["회색", "연회색"],
};

const shape_mapping = {
  원형: ["원형"],
  타원형: ["타원형", "장방형"],
  사각형: ["사각형", "정사각형", "직사각형", "다이아몬드형"],
  다각형: ["오각형", "육각형", "칠각형", "팔각형", "삼각형"],
  캡슐: ["경질캡슐", "연질캡슐", "캡슐"],
  기타: ["사과 모양", "하트 모양", "나비넥타이 모양"],
  필름: ["필름"],
};

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

const FilterButtonContainer = styled.div`
  display: flex; // Flexbox를 사용하여 정렬
  justify-content: flex-end; // 컨테이너 내의 요소를 오른쪽으로 정렬
  margin-top: 0.25rem; // 위쪽 여백 추가
`;

const FilterButton = styled.button`
  background-color: ${(props) => (props.active ? colors.point1 : "white")};
  color: ${(props) => (props.active ? "white" : colors.text)};
  padding: 0.25rem 0.5rem; // 가로 패딩 조정
  border: 1px solid ${colors.point4};
  border-radius: 0.75rem;
  cursor: pointer;

  &:hover {
    background-color: ${colors.point1};
    color: white;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.isOpen ? colors.point1 : colors.point4)};
  cursor: pointer;
  font-size: 1rem;
`;

const MainToggleButton = styled.button`
  background: none;
  border: none;
  color: ${colors.disableText};
  cursor: pointer;
  font-size: 1.125rem;
  margin: 0.125rem;
  span:first-child {
    color: ${colors.text};
  }
  span:last-child {
    color: ${(props) => (props.isOpen ? colors.point1 : colors.disableText)};
  }
`;

const ResultCount = styled.p`
  color: ${colors.text}; // 기본 텍스트 색상
`;

const CountSpan = styled.span`
  color: ${colors.point1}; // point1 색상
`;

const Filter = ({ onFilterChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isShapeOpen, setIsShapeOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedShape, setSelectedShape] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [filteredCount, setFilteredCount] = useState(0); // 필터링된 개수 상태 추가

  const toggleCategory = (category) => {
    setSelectedCategory((prev) => (prev === category ? "" : category));
  };

  const toggleShape = (shape) => {
    setSelectedShape((prev) => (prev === shape ? "" : shape));
  };

  const toggleColor = (color) => {
    setSelectedColor((prev) => (prev === color ? "" : color));
  };

  const applyFilter = () => {
    const filterOptions = {
      category: selectedCategory ? category_mapping[selectedCategory] : [],
      shape: selectedShape ? shape_mapping[selectedShape] : [],
      color: selectedColor ? color_mapping[selectedColor] : [],
    };

    // 필터링된 개수 계산
    const count = setFilteredCount(count); // 여기서 데이터의 개수를 계산하는 로직 추가 // 필터링된 개수 상태 업데이트

    onFilterChange(filterOptions);
  };

  return (
    <MainFilterContainer>
      <MainToggleButton
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        isOpen={isFilterOpen}
      >
        <span>필터</span>
        <span>{isFilterOpen ? " 접기" : " 펼치기"}</span>
      </MainToggleButton>
      {isFilterOpen && (
        <>
          {/* 구분 필터 */}
          <FilterSection>
            <FilterHeader>
              <h3>구분</h3>
              <ToggleButton
                isOpen={isCategoryOpen}
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                {isCategoryOpen ? "접기" : "펼치기"}
              </ToggleButton>
            </FilterHeader>
            {isCategoryOpen && (
              <FilterGroup>
                <FilterButton
                  active={selectedCategory === "전문"}
                  onClick={() => toggleCategory("전문")}
                >
                  전문
                </FilterButton>
                <FilterButton
                  active={selectedCategory === "일반"}
                  onClick={() => toggleCategory("일반")}
                >
                  일반
                </FilterButton>
              </FilterGroup>
            )}
          </FilterSection>
          {/* 모양 필터 */}
          <FilterSection>
            <FilterHeader>
              <h3>모양</h3>
              <ToggleButton
                isOpen={isShapeOpen}
                onClick={() => setIsShapeOpen(!isShapeOpen)}
              >
                {isShapeOpen ? "접기" : "펼치기"}
              </ToggleButton>
            </FilterHeader>
            {isShapeOpen && (
              <FilterGroup>
                {Object.keys(shape_mapping).map((shape) => (
                  <FilterButton
                    key={shape}
                    active={selectedShape === shape}
                    onClick={() => toggleShape(shape)}
                  >
                    {shape}
                  </FilterButton>
                ))}
              </FilterGroup>
            )}
          </FilterSection>
          {/* 색상 필터 */}
          <FilterSection>
            <FilterHeader>
              <h3>색상</h3>
              <ToggleButton
                isOpen={isColorOpen}
                onClick={() => setIsColorOpen(!isColorOpen)}
              >
                {isColorOpen ? "접기" : "펼치기"}
              </ToggleButton>
            </FilterHeader>
            {isColorOpen && (
              <FilterGroup>
                {Object.keys(color_mapping).map((color) => (
                  <FilterButton
                    key={color}
                    active={selectedColor === color}
                    onClick={() => toggleColor(color)}
                  >
                    {color}
                  </FilterButton>
                ))}
              </FilterGroup>
            )}
          </FilterSection>
          {/* 필터 적용 버튼 컨테이너 */}
          <FilterButtonContainer>
            <FilterButton
              onClick={applyFilter}
              style={{ marginTop: "0.25rem" }}
            >
              필터 적용
            </FilterButton>
          </FilterButtonContainer>
          {/* 필터링된 결과 개수 출력 */}
          <ResultCount>
            총 <CountSpan>{filteredCount}</CountSpan> 건의 약이 있어요.
          </ResultCount>
        </>
      )}
    </MainFilterContainer>
  );
};

export default Filter;
