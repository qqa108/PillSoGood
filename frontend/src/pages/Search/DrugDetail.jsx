import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import colors from "@/assets/colors"; // colors.js에서 색상 가져오기

// 전체 컨테이너: 가로 길이 통일을 위한 컨테이너
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// part1: 약 이름 스타일
const DrugName = styled.div`
  width: 18rem; /* 가로 길이 통일 */
  height: 3rem;
  flex-shrink: 0;
  border-radius: 0.1875rem;
  border: 1px solid ${colors.point4}; /* colors.jsx의 point4 사용 */
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem; /* 세로 마진 */
`;

const DrugNameText = styled.p`
  color: ${colors.text}; /* colors.jsx의 text 사용 */
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

// part2: 약 사진 스타일
const DrugImage = styled.div`
  width: 18rem; /* 가로 길이 통일 */
  height: 9.84rem;
  flex-shrink: 0;
  border: 1px solid ${colors.point4}; /* colors.jsx의 point4 사용 */
  background: url(${(props) => props.imageUrl || "default-image-path.jpg"})
    lightgray 50% / cover no-repeat;
  margin-bottom: 1rem; /* 세로 마진 */
`;

// part3: 약물 상세 정보 컨테이너
const DrugInfoContainer = styled.div`
  width: 16rem; /* 가로 길이 통일 */
  height: auto; /* 가변 높이 */
  flex-shrink: 0;
  border-radius: 0.1875rem;
  border: 1px solid ${colors.point4}; /* colors.jsx의 point4 사용 */
  padding: 1rem;
  background: #fff;
`;

// 소제목 탭
const InfoTitleTab = styled.div`
  display: inline-block;
  height: 1.5rem;
  border-radius: 3.75rem;
  border: 0.5px solid ${colors.point1}; /* colors.jsx의 point1 사용 */
  background: ${colors.point1}; /* colors.jsx의 point1 사용 */
  padding: 0.2rem 0.75rem;
  margin-bottom: 0.5rem;
`;

const InfoTitleText = styled.p`
  color: ${colors.background}; /* colors.jsx의 background 사용 */
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  margin: 0;
`;

// 약물 상세 정보 텍스트
const InfoText = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const DrugDetail = ({ drugId }) => {
  const [drugDetail, setDrugDetail] = useState(null);

  useEffect(() => {
    const fetchDrugDetail = async () => {
      try {
        const response = await axios.get(`/api/drug/${drugId}`);
        setDrugDetail(response.data);
      } catch (error) {
        console.error("Failed to fetch drug detail:", error);
      }
    };

    fetchDrugDetail();
  }, [drugId]);

  if (!drugDetail) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      {/* part1: 약 이름 */}
      <DrugName>
        <DrugNameText>{drugDetail.korName}</DrugNameText>
      </DrugName>

      {/* part2: 약 사진 */}
      <DrugImage imageUrl={drugDetail.imageUrl} />

      {/* part3: 약물 상세 정보 */}
      <DrugInfoContainer>
        <InfoTitleTab>
          <InfoTitleText>구분</InfoTitleText>
        </InfoTitleTab>
        <InfoText>{drugDetail.category}</InfoText>

        <InfoTitleTab>
          <InfoTitleText>제조사</InfoTitleText>
        </InfoTitleTab>
        <InfoText>{drugDetail.company}</InfoText>

        <InfoTitleTab>
          <InfoTitleText>성상, 제형</InfoTitleText>
        </InfoTitleTab>
        <InfoText>{drugDetail.characters}</InfoText>

        <InfoTitleTab>
          <InfoTitleText>효과</InfoTitleText>
        </InfoTitleTab>
        <InfoText>{drugDetail.effect}</InfoText>

        <InfoTitleTab>
          <InfoTitleText>용법</InfoTitleText>
        </InfoTitleTab>
        <InfoText>{drugDetail.usages}</InfoText>

        <InfoTitleTab>
          <InfoTitleText>복약정보</InfoTitleText>
        </InfoTitleTab>
        {drugDetail.medicineInformation?.map((info) => (
          <InfoText key={info.informationId}>{info.information}</InfoText>
        ))}

        {/* 추가 정보: 연령 금기, 용량 금기, 임부 금기, 노인 금기 */}
        {drugDetail.ageProhibition && (
          <div>
            <InfoTitleTab>
              <InfoTitleText>연령 금기</InfoTitleText>
            </InfoTitleTab>
            <InfoText>{drugDetail.ageProhibition.age}세 이하 금기</InfoText>
          </div>
        )}

        {drugDetail.amountProhibition && (
          <div>
            <InfoTitleTab>
              <InfoTitleText>용량 금기</InfoTitleText>
            </InfoTitleTab>
            <InfoText>
              {drugDetail.amountProhibition.name} - 하루 최대{" "}
              {drugDetail.amountProhibition.limits}
              {drugDetail.amountProhibition.field}
            </InfoText>
          </div>
        )}

        {drugDetail.pregnancyProhibition && (
          <div>
            <InfoTitleTab>
              <InfoTitleText>임부 금기</InfoTitleText>
            </InfoTitleTab>
            <InfoText>{drugDetail.pregnancyProhibition.effect}</InfoText>
          </div>
        )}

        {drugDetail.seniorProhibition && (
          <div>
            <InfoTitleTab>
              <InfoTitleText>노인 금기</InfoTitleText>
            </InfoTitleTab>
            <InfoText>{drugDetail.seniorProhibition.effect}</InfoText>
          </div>
        )}
      </DrugInfoContainer>
    </Container>
  );
};

export default DrugDetail;
