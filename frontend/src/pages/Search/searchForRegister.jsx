import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SearchBox from "@/components/SearchBox";
import Filter from "@/components/Filter";
import SearchResult from "@/components/SearchResult";
import colors from "@/assets/colors";
import { useRecoilState } from 'recoil';
import { surveyAnswersState } from '../../atoms/surveyState';


const SelectedPillsContainer = styled.div`
  margin-top: 1rem;
`;

const PillsList = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* 약물 간 간격 조정 */
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
  const [filterOptions, setFilterOptions] = useState({});
  const [filteredPills, setFilteredPills] = useState([]); // 초기 상태를 빈 배열로 설정
  const [filteredCount, setFilteredCount] = useState(0); // 필터링된 개수 상태
  const [selectedPills, setSelectedPills] = useState([]); // 선택된 약물 관리
  const navigate = useNavigate();
  
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
    // navigate('/survey', { state: { selectedPills } });
    // // navigate(-1, { state: { selectedPills } });
    // console.log('약 검색 등록', selectedPills)
    // const updatedAnswers = [...surveyAnswers];
    // updatedAnswers[4] = {
    //     type: 'option-pill',
    //     answer: selectedPills.length > 0 ? selectedPills : ['없음'],
    //     addedPills: selectedPills, // 추가된 약물도 관리
    // };
    // setSurveyAnswers(updatedAnswers);

    // // 2. localStorage에 저장 (필요시)
    // localStorage.setItem('selectedPills', JSON.stringify(selectedPills));

    // // 3. 이전 페이지로 이동
    // navigate(-1);

    // // 4. 콘솔 출력 (디버깅용)
    // console.log('약 검색 등록', selectedPills);
     // 기존에 로컬 스토리지에 저장된 약물 목록 가져오기
     const storedPills = localStorage.getItem('selectedPills');
     const existingPills = storedPills ? JSON.parse(storedPills) : [];
 
     // 새로운 약물을 기존 약물에 추가 (중복 제거)
     const updatedPills = [...new Set([...existingPills, ...selectedPills])];
 
     // Recoil 상태 업데이트
     const updatedAnswers = [...surveyAnswers];
     updatedAnswers[4] = {
         type: 'option-pill',
         answer: updatedPills.length > 0 ? updatedPills : ['없음'],
         addedPills: updatedPills, // 추가된 약물 관리
     };
     setSurveyAnswers(updatedAnswers);
 
     // 로컬 스토리지에 저장
     localStorage.setItem('selectedPills', JSON.stringify(updatedPills));
 
     // 이전 페이지로 이동
     navigate(-1);
 
     // 디버깅용 콘솔 출력
     console.log('약 검색 등록', updatedPills);
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
        {
          filteredPills.length > 0
            ? filteredPills.map((pill) => (
                <SearchResult
                  key={pill.id}
                  text={pill.name}
                  isActive={selectedPills.includes(pill.name)} // 선택된 약물 상태 반영
                  onSelect={() => handlePillSelect(pill.name)} // 약물 선택 핸들러 연결
                />
              ))
            : searchTerm && <p>검색된 약물이 없습니다.</p> // 검색어가 있을 때만 표시
        }
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

      <ReguisterButton onClick={handleRegister}>
        등록하기
      </ReguisterButton>
    </RegisterPillContainer>
  );
};

export default RegisterPill;
