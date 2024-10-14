import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import SearchBox from "@/components/SearchBox";
import Filter from "@/components/Filter";
import SearchResult from "@/components/SearchResult";
import colors from "@/assets/colors";
import axios from "axios";
import { MEDICINEES } from "@/assets/apis"; // ElasticSearch 기반 API 엔드포인트 임포트
import { useRecoilState,useRecoilValue } from "recoil";
import { surveyAnswersState } from "../../atoms/surveyState";
import { selectedPillsState } from "../../atoms/selectedPillsState";

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
  margin-bottom: 5rem;
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
  // const setSelectedPillsState = useSetRecoilState(selectedPillsState); // 약물 상태관리
  const navigate = useNavigate();
  const [selectedPillsRecoil, setSelectedPillsState] = useRecoilState(selectedPillsState);
  const currentPills = useRecoilValue(selectedPillsState);


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
  // const handlePillSelect = (pillName) => {
  //   setSelectedPills((prevSelected) => {
  //     if (prevSelected.includes(pillName)) {
  //       return prevSelected.filter((p) => p !== pillName); // 이미 선택된 약물은 해제
  //     } else {
  //       return [...prevSelected, pillName]; // 선택되지 않은 약물 추가
  //     }
  //   });
  // };
  
  // 약물 선택 수정 -> id도 같이 저장
  const handlePillSelect = (pill) => {
    setSelectedPills((prevSelected) => {
      const isSelected = prevSelected.find((p) => p.id === pill.id);
      if (isSelected) {
        // 이미 선택된 약물은 해제
        return prevSelected.filter((p) => p.id !== pill.id);
      } else {
        // 선택되지 않은 약물 추가
        return [...prevSelected, pill];
      }
    });
  };

  // ocr 결과 검색 자동화
  const [ocrPills, setOcrPills] = useState([]);
  useEffect(() => {
    const ocrPills = JSON.parse(localStorage.getItem('ocrPills')) || []; 
    // setOcrPills(ocrPills)
    if (ocrPills.length > 0) {
      const names = extractNamesFromOcr(ocrPills);  // name만 추출하여 배열로 반환
      setOcrPills(names);
    // Promise.all을 사용해 각 약물 이름에 대해 개별 검색을 병렬로 실행
    // Promise.all(
    //   names.map(name => fetchPillData(name, filterOptions))
    // )
    Promise.all(
      names.map(async (name) => {
        const result = await fetchPillData(name, filterOptions);
        return { name, result }; // name을 결과와 함께 반환
      })
    )
    .then((results) => {
      const validResults = results
      console.log('results',results)
    .filter(result => result !== null && result !== undefined) // 유효한 값만 필터링
    .flat();  // 배열 평탄화 (nested 배열일 경우 대비)

  if (validResults.length > 0) {
    setFilteredPills(validResults);  // 상태에 저장
  } else {
    console.log("유효한 검색 결과가 없습니다.");
  }
    })
    .catch((error) => {
      console.error("검색 실패:", error);
    });
  }
  }, []);

  
  // OCR 데이터에서 name 값만 추출하는 함수
  const extractNamesFromOcr = (ocrData) => {
    return ocrData
      .filter(item => item.name)  // name 속성이 있는 항목만 필터링
      .map(item => item.name)     // name 값만 추출
  };

  const [surveyAnswers, setSurveyAnswers] = useRecoilState(surveyAnswersState);
  console.log(surveyAnswers.family)
  const location = useLocation();

  // const [existingPills, setexistingPills] = useState([])
  const existingdPills = []
  const handleRegister = () => {
    console.log('검색',surveyAnswers)
    const recoilPills = Array.isArray(selectedPillsRecoil) ? selectedPillsRecoil : [];
    const familydata = surveyAnswers.family;
    const surveyAllergie = Array.isArray(surveyAnswers.allergies) ? surveyAnswers.allergies : [];

    console.log('surveyAnswers.allergies',surveyAnswers.allergies)
    const prevLocation = location.state?.from;
    console.log('prevLocation',prevLocation)
    console.log('현재 경ㄱ로',`/profile/${familydata}`)

    let existingPills;
    let updatedPills;
    if (prevLocation === `/profile/${familydata}`) {
      existingPills = surveyAnswers.allergies
      const pillNames = selectedPills.map(pill => pill.korName);
      updatedPills = [...new Set([...existingPills, ...pillNames])];
     } else {
      existingPills = recoilPills
      updatedPills = [...new Set([...existingPills, ...selectedPills])];
     }
    

    console.log('selectedPills',selectedPills)
    console.log('surveyAllergie',surveyAllergie)
    console.log('existingPills',existingPills)
    // const existingPills = storedPills ? JSON.parse(storedPills) : [];

    // 새로운 약물을 기존 약물에 추가 (중복 제거)
    // const updatedPills = [...new Set([...existingPills, ...selectedPills])];

    const updatedAnswers = {
      ...surveyAnswers,  // 기존의 surveyAnswers 객체를 복사
      allergies: updatedPills.length > 0 ? updatedPills : [],  // allergies를 배열 형태로 유지

    };
    setSurveyAnswers(updatedAnswers);
    console.log('update',updatedAnswers)
    
    setSelectedPillsState(updatedPills);
    console.log('약물 검색 상태관리', selectedPillsRecoil)

 
    console.log('Recoil에 저장된 약물 목록:', currentPills);
    // localStorage.setItem("selectedPills", JSON.stringify(updatedPills));

    // 이전 페이지로 이동
    if (ocrPills.length <= 0 ? navigate(-1) : navigate('/mypills/registerCard') )
    
    console.log('ocr리스트',setOcrPills)
    localStorage.removeItem('ocrPills')

    // 디버깅용 콘솔 출력
    console.log("약 검색 등록", updatedPills);
  };

  console.log('필터된거',filteredPills)

  return (
    <RegisterPillContainer>
      {/* 검색바 */}
      <SearchBox value={searchTerm} onSearch={handleSearch} />

      {/* 필터 */}
      <Filter onFilterChange={handleFilterChange} />

      {/* 필터링된 약물 개수 출력 */}
      {filteredCount > 0 && <p>총 {filteredCount}건의 약이 있어요.</p>}
      {/* ocr */}
      {ocrPills.length > 0 && 
      <p>약 봉투 분석 결과: <br></br>
        {ocrPills}</p>}
      {/* 검색 결과 */}
      <SearchResultsContainer>
        {filteredPills.length > 0 ? (
          filteredPills.map((pill) => (
            // <SearchResult
            //   key={pill.id}
            //   korName={pill.korName}
            //   isActive={selectedPills.includes(pill.korName)} // 선택된 약물 상태 반영
            //   onSelect={() => handlePillSelect(pill.korName)} // 약물 선택 핸들러 연결
            // />
            <SearchResult
              key={pill.id}
              korName={pill.korName}
              isActive={selectedPills.some((p) => p.id === pill.id)} // 선택된 약물 상태 반영
              onSelect={() => handlePillSelect(pill)} // 약물 선택 핸들러 연결
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
            {/* {selectedPills.map((pillName, index) => (
              <PillItem key={index}>{pillName}</PillItem>
            ))} */}

            {/* pill로 넘겨 주게 수정 */}
            {selectedPills.map((pill, index) => (
              <PillItem key={index}>{pill.korName}</PillItem>
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
