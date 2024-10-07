import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SearchBox from "@/components/SearchBox";
import Filter from "@/components/Filter";
import SearchResult from "@/components/SearchResult";
import colors from "@/assets/colors";
import axios from "axios";
import { MEDICINEES } from "@/assets/apis"; // ElasticSearch 기반 API 엔드포인트 임포트
import { useRecoilState } from "recoil";
import { surveyAnswersState } from "../../atoms/surveyState";

const SelectedPillsContainer = styled.div`
  margin-top: 1rem;
`;

const PillsList = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const PillItem = styled.span`
  background-color: #fff;
  padding: 5px 10px;
  border-radius: 12px;
  border: 1px solid ${colors.point1};
  font-size: 14px;
  color: #333;
`;

const NoPillsText = styled.p`
  margin-top: 1rem;
  color: #888;
`;

const ReguisterButton = styled.button`
  margin-top: 1rem;
  height: 2.7rem;
  padding: 10px 20px;
  background-color: ${colors.point1};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.point1};
  }
`;

const RegisterPillContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SearchResultsContainer = styled.div`
  margin-top: 1rem;
`;

const RegisterPill = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({ category: "" });
  const [filteredPills, setFilteredPills] = useState([]); // 초기 상태를 빈 배열로 설정
  const [filteredCount, setFilteredCount] = useState(0); // 필터링된 개수 상태
  const [selectedPills, setSelectedPills] = useState([]); // 선택된 약물 관리
  const navigate = useNavigate();

  // API를 통해 약물 데이터를 불러오는 함수 (ElasticSearch 기반)
  const fetchPillData = async (term, currentFilterOptions) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) {
        throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
      }

      // ElasticSearch 기반 API 호출
      const response = await axios.get(
        MEDICINEES(term, [currentFilterOptions.category]), // searchforAll.jsx와 동일하게 변경
        {
          headers: {
            Authorization: `${accessToken}`,
            RefreshToken: `${refreshToken}`,
          },
        }
      );

      const pills = response.data;
      let filtered = pills;

      if (term) {
        filtered = filtered.filter((pill) => pill.korName.includes(term));
      }

      // 중복된 약물이 있는지 확인하고 중복 제거 (searchforAll.jsx와 동일하게 적용)
      const uniquePills = filtered.filter(
        (pill, index, self) => self.findIndex((p) => p.id === pill.id) === index
      );

      setFilteredPills(uniquePills);
      setFilteredCount(uniquePills.length); // 필터링된 약물 개수 업데이트
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

  // 약물 선택 핸들러
  const handlePillSelect = (pillName) => {
    setSelectedPills((prevSelected) => {
      if (prevSelected.includes(pillName)) {
        return prevSelected.filter((p) => p !== pillName); // 이미 선택된 약물은 해제
      } else {
        return [...prevSelected, pillName]; // 선택되지 않은 약물 추가
      }
    });
  };

  const [surveyAnswers, setSurveyAnswers] = useRecoilState(surveyAnswersState);

  const handleRegister = () => {
    // 기존에 로컬 스토리지에 저장된 약물 목록 가져오기
    const storedPills = localStorage.getItem("selectedPills");
    const existingPills = storedPills ? JSON.parse(storedPills) : [];

    // 새로운 약물을 기존 약물에 추가 (중복 제거)
    const updatedPills = [...new Set([...existingPills, ...selectedPills])];

    // Recoil 상태 업데이트
    const updatedAnswers = [...surveyAnswers];
    updatedAnswers[4] = {
      type: "option-pill",
      answer: updatedPills.length > 0 ? updatedPills : ["없음"],
      addedPills: updatedPills, // 추가된 약물 관리
    };
    setSurveyAnswers(updatedAnswers);

    // 로컬 스토리지에 저장
    localStorage.setItem("selectedPills", JSON.stringify(updatedPills));

    // 이전 페이지로 이동
    navigate(-1);

    // 디버깅용 콘솔 출력
    console.log("약 검색 등록", updatedPills);
  };

  return (
    <RegisterPillContainer>
      {/* 검색바 */}
      <SearchBox value={searchTerm} onSearch={handleSearch} />

      {/* 필터 */}
      <Filter onFilterChange={handleFilterChange} />

      {/* 필터링된 약물 개수 출력 */}
      {filteredCount > 0 && <p>총 {filteredCount}건의 약이 있어요.</p>}

      {/* 검색 결과 */}
      <SearchResultsContainer>
        {filteredPills.length > 0 ? (
          filteredPills.map((pill) => (
            <SearchResult
              key={pill.id}
              korName={pill.korName}
              isActive={selectedPills.includes(pill.korName)} // 선택된 약물 상태 반영
              onSelect={() => handlePillSelect(pill.korName)} // 약물 선택 핸들러 연결
            />
          ))
        ) : searchTerm ? (
          <p>검색된 약물이 없습니다.</p>
        ) : (
          <p>검색어를 입력해주세요.</p>
        )}
      </SearchResultsContainer>

      {/* 선택된 약물 목록 */}
      <SelectedPillsContainer>
        <h3>[선택된 약물]</h3>
        {selectedPills.length > 0 ? (
          <PillsList>
            {selectedPills.map((pillName, index) => (
              <PillItem key={index}>{pillName}</PillItem>
            ))}
          </PillsList>
        ) : (
          <NoPillsText>선택된 약물이 없습니다.</NoPillsText>
        )}
      </SelectedPillsContainer>

      <ReguisterButton onClick={handleRegister}>등록하기</ReguisterButton>
    </RegisterPillContainer>
  );
};

export default RegisterPill;
