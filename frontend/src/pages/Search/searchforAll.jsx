import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SearchBox from "../../components/SearchBox";
import Filter from "../../components/Filter";
import SearchResult from "../../components/SearchResult";
import axios from "axios";
import { MEDICINEES } from "../../assets/apis"; // API 엔드포인트 임포트 (ElasticSearch 버전)

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
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({ category: "" });
  const [filteredPills, setFilteredPills] = useState([]);
  const [filteredCount, setFilteredCount] = useState(0);

  const fetchPillData = async (term, currentFilterOptions) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) {
        throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
      }

      const response = await axios.get(
        MEDICINEES(term, [currentFilterOptions.category]),
        {
          headers: {
            Authorization: `${accessToken}`,
            RefreshToken: `${refreshToken}`,
          },
        }
      );

      const pills = response.data;
      console.log("API로부터 받은 약물 데이터:", pills); // 데이터 확인

      // 중복된 약물이 있는지 확인하고 중복 제거
      const uniquePills = pills.filter(
        (pill, index, self) => self.findIndex((p) => p.id === pill.id) === index
      );

      setFilteredPills(uniquePills);
      setFilteredCount(uniquePills.length);
    } catch (error) {
      console.error("알약 데이터를 불러오는 데 실패했습니다.", error);
    }
  };

  const handleSearch = useCallback(
    (term) => {
      setSearchTerm(term);
      fetchPillData(term, filterOptions);
    },
    [filterOptions]
  );

  const handleFilterChange = (options) => {
    setFilterOptions(options);
    fetchPillData(searchTerm, options);
  };

  const handleSelect = (id) => {
    navigate(`/search/medicine/${id}`); // 새로운 페이지로 이동
  };

  return (
    <DrugSearchContainer>
      <SearchBox value={searchTerm} onSearch={handleSearch} />
      <Filter onFilterChange={handleFilterChange} />

      {filteredCount > 0 && <p>총 {filteredCount}건의 약이 있어요.</p>}

      <SearchResultsContainer>
        {filteredPills.length > 0 ? (
          filteredPills.map((pill, index) => (
            <SearchResult
              key={pill.id || index} // pill.id가 없거나 중복되면 index 사용
              id={pill.id}
              korName={pill.korName}
              category={pill.category}
              isActive={false}
              onSelect={handleSelect}
              hideCheckbox={true}
            />
          ))
        ) : searchTerm ? (
          <p>검색된 약물이 없습니다.</p>
        ) : (
          <p>검색어를 입력해주세요.</p>
        )}
      </SearchResultsContainer>
    </DrugSearchContainer>
  );
};

export default DrugSearch;
