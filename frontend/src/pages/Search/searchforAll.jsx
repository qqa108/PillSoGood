import React, { useState } from "react";
import styled from "styled-components";
import SearchBox from "../../components/SearchBox";
import Filter from "../../components/Filter";
import SearchResult from "../../components/SearchResult";

const pillData = [
  { id: 1, name: "타이레놀", category: "일반", color: "흰색", shape: "원형" },
  {
    id: 2,
    name: "아스피린",
    category: "전문",
    color: "노란색",
    shape: "타원형",
  },
  { id: 3, name: "게보린", category: "일반", color: "파란색", shape: "사각형" },
  { id: 4, name: "비타민C", category: "전문", color: "빨간색", shape: "원형" },
  // 더 많은 약물 데이터 추가 가능
];

const DrugSearchContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SearchResultsContainer = styled.div`
  margin-top: 1rem;
`;

const DrugSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({});
  const [filteredPills, setFilteredPills] = useState([]); // 초기 상태를 빈 배열로 설정
  const [filteredCount, setFilteredCount] = useState(0); // 필터링된 개수 상태

  const filterAndUpdatePills = (searchTerm, filterOptions) => {
    let filtered = pillData;

    if (searchTerm) {
      filtered = filtered.filter((pill) => pill.name.includes(searchTerm));
    }

    if (filterOptions.category?.length) {
      filtered = filtered.filter((pill) =>
        filterOptions.category.includes(pill.category)
      );
    }

    if (filterOptions.color?.length) {
      filtered = filtered.filter((pill) =>
        filterOptions.color.includes(pill.color)
      );
    }

    if (filterOptions.shape?.length) {
      filtered = filtered.filter((pill) =>
        filterOptions.shape.includes(pill.shape)
      );
    }

    setFilteredPills(filtered);
    setFilteredCount(filtered.length); // 필터링된 약물 개수 업데이트
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterAndUpdatePills(term, filterOptions);
  };

  const handleFilterChange = (options) => {
    setFilterOptions(options);
    filterAndUpdatePills(searchTerm, options);
  };

  return (
    <DrugSearchContainer>
      {/* 검색바 */}
      <SearchBox value={searchTerm} onSearch={handleSearch} />

      {/* 필터 */}
      <Filter onFilterChange={handleFilterChange} />

      {/* 필터링된 약물 개수 출력 */}
      {filteredCount > 0 && <p>총 {filteredCount}건의 약이 있어요.</p>}

      {/* 검색 결과 */}
      <SearchResultsContainer>
        {
          filteredPills.length > 0
            ? filteredPills.map((pill) => (
                <SearchResult
                  key={pill.id}
                  text={pill.name}
                  isActive={false} // 체크 기능 없으므로 항상 false
                  onSelect={() => {}} // 선택 핸들러 필요 없음
                  hideCheckbox={true} // 체크박스 숨기기 위한 prop 전달
                />
              ))
            : searchTerm && <p>검색된 약물이 없습니다.</p> // 검색어가 있을 때만 표시
        }
      </SearchResultsContainer>
    </DrugSearchContainer>
  );
};

export default DrugSearch;
