import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Webcam from 'react-webcam';
import styled from 'styled-components';

const guides = {
  "medicine-bag": {
    title: "처방전 촬영 가이드",
    description: "처방전 전체가 보이도록 촬영해주세요."
  },
  "medicine": {
    title: "약사진 촬영 가이드",
    description: "약 사진을 촬영하기 전에 가이드에 맞춰주세요."
  }
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
  `;

  const GuideText = styled.h2`
  margin-bottom: 20px;
  color: #333;
  `;

  const GuideDescription = styled.p`
  margin-bottom: 20px;
  color: #666;
  `;

  const WebcamWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  height: auto;
  border: 2px solid #333;
  border-radius: 10px;
  overflow: hidden;
  `;

  const ButtonContainer = styled.div`
  margin-top: 20px;
  `;

  const CaptureButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
  `;

export default function PhotoGuide() {
  const webcamRef = useRef(null);
  const location = useLocation(); 

  console.log('Location state:', location.state);
  const selectedItem = location.state?.selectedItem || "medicine";
  console.log('Selected item:', selectedItem);
  
  // 사진 찍기 함수
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc); // 여기서 찍힌 이미지를 처리할 수 있습니다.
  };

  return (
    <Container>
      {/* 가이드 화면 */}
      <GuideText>{guides[selectedItem].title}</GuideText>
      <GuideDescription>{guides[selectedItem].description}</GuideDescription>

      {/* 카메라 미리보기 */}
      <WebcamWrapper>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            width: 1280,
            height: 720,
            facingMode: 'user', // 기본값: 전면 카메라
          }}
        />
      </WebcamWrapper>

      {/* 버튼들 */}
      <ButtonContainer>
        <CaptureButton onClick={capture}>촬영하기</CaptureButton>
      </ButtonContainer>
    </Container>
  );
}

