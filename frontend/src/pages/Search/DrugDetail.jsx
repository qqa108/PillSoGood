import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import colors from "@/assets/colors"; // colors.js에서 색상 가져오기
import { DETAILMEDICINE } from "@/assets/apis"; // API 경로 가져오기

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DrugName = styled.div`
  width: 100%;
  height: 3rem;
  flex-shrink: 0;
  border-radius: 0.1875rem;
  border: 1px solid ${colors.point4};
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const DrugNameText = styled.p`
  color: ${colors.text};
  font-size: 1.25rem;
  font-weight: 700;
  line-height: normal;
`;

const DrugImage = styled.div`
  width: 100%;
  height: 9.84rem;
  flex-shrink: 0;
  border: 1px solid ${colors.point4};
  background: url(${(props) => props.$imageUrl || "default-image-path.jpg"})
    lightgray 50% / cover no-repeat;
  margin-bottom: 1rem;
`;

const DrugInfoContainer = styled.div`
  width: 90%;
  height: auto;
  flex-shrink: 0;
  border-radius: 0.1875rem;
  border: 1px solid ${colors.point4};
  padding: 5%;
  background: #fff;
`;

const InfoTitleTab = styled.div`
  display: inline-block;
  height: 1.5rem;
  border-radius: 3.75rem;
  border: 0.5px solid ${colors.point1};
  background: ${colors.point1};
  padding: 0.2rem 0.75rem;
  margin-bottom: 0.5rem;
`;

const InfoTitleText = styled.p`
  color: ${colors.background};
  font-size: 1rem;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  margin: 0;
`;

const InfoText = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const DrugDetail = () => {
  const { id: medicineId } = useParams();
  const [drugDetail, setDrugDetail] = useState(null);

  useEffect(() => {
    const fetchDrugDetail = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!accessToken || !refreshToken) {
          throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
        }

        const response = await axios.get(DETAILMEDICINE(medicineId), {
          headers: {
            Authorization: `${accessToken}`,
            RefreshToken: refreshToken,
          },
        });

        console.log("API 응답 데이터:", response.data);
        setDrugDetail(response.data);
      } catch (error) {
        console.error("Failed to fetch drug detail:", error);
      }
    };

    fetchDrugDetail();
  }, [medicineId]);

  if (!drugDetail) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <DrugName>
        <DrugNameText>{drugDetail.korName}</DrugNameText>
      </DrugName>

      <DrugImage $imageUrl={drugDetail.imageUrl} />

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
          <InfoTitleText>복약 정보</InfoTitleText>
        </InfoTitleTab>
        {drugDetail.medicineInformation?.map((info) => (
          <InfoText key={info.informationId || info.information}>
            - {info.information}
          </InfoText> // 고유한 key 추가
        ))}

        {/* 연령 금기 */}
        {drugDetail.ageProhibition && (
          <div>
            <InfoTitleTab>
              <InfoTitleText>연령 금기</InfoTitleText>
            </InfoTitleTab>
            <InfoText>{drugDetail.ageProhibition.age}세 이하 금기</InfoText>
          </div>
        )}

        {/* 용량 금기 */}
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

        {/* 임부 금기 */}
        {drugDetail.pregnancyProhibition && (
          <div>
            <InfoTitleTab>
              <InfoTitleText>임부 금기</InfoTitleText>
            </InfoTitleTab>
            <InfoText>{drugDetail.pregnancyProhibition.effect}</InfoText>
          </div>
        )}

        {/* 노인 금기 */}
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
