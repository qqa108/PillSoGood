import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import Modal from '../../../components/Modal';
import colors from '../../../assets/colors';
import medicine_bag_guide from '../../../assets/medicine_bag_guide.svg'
import medicine_guide from '../../../assets/medicine_guide.svg'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;     
  text-align: center;
  height: 100%;         
`;

const GuideText = styled.h1`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: #333;
  font-weight: bold; 
  text-align: center;
`;

const GuideDescription = styled.p`
  margin-bottom: 20px;
  color: #666;
  text-align: center; 
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
`;

const WebcamWrapper = styled.div`
  width: 100%;
  height: auto;
  border-radius: 10px;
  overflow: hidden;
`;

const PreviewImage = styled.img`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 10px;
  margin-top: 20px;
  object-fit: contain;
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const CaptureButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${colors.point1};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.point1};
  }
`;

const guides = {
  "medicine-bag": {
    title: "약봉투 촬영 가이드",
    description: "복약 정보가 보이도록 촬영해주세요."
  },
  "medicine": {
    title: "약사진 촬영 가이드",
    description: "약 사진을 촬영하기 전에 가이드에 맞춰주세요."
  }
};

export default function PhotoGuide() {
  const webcamRef = useRef(null);
  const location = useLocation(); 
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [capturedImage, setCapturedImage] = useState(null);

  console.log('Location state:', location.state);
  const selectedItem = location.state?.selectedItem || "medicine";
  console.log('Selected item:', selectedItem);
  
  // 사진 찍기 함수
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    console.log(imageSrc); // 여기서 찍힌 이미지를 처리할 수 있습니다.
  };

  // 재촬영 함수
  const retake = () => {
    setCapturedImage(null); // 캡처된 이미지를 초기화
  };

  const guideImage = selectedItem === "medicine" ? medicine_guide : medicine_bag_guide;

  return (
    <Container>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <ModalContentWrapper> 
            <GuideText>{guides[selectedItem].title}</GuideText>
            <ImageWrapper>
              <img src={guideImage} alt="guide" />
            </ImageWrapper>
            <GuideDescription>{guides[selectedItem].description}</GuideDescription>
            <ButtonContainer>
              <CaptureButton onClick={() => setIsModalOpen(false)}>확인</CaptureButton>
            </ButtonContainer>
          </ModalContentWrapper> 
        </Modal>
      )}

      <GuideText>{guides[selectedItem].title}</GuideText>
      <GuideDescription>{guides[selectedItem].description}</GuideDescription>

      <WebcamWrapper>
        {!capturedImage ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: window.innerWidth,
              height: window.innerHeight,
              facingMode: 'user', // 기본값: 전면 카메라
            }}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : (
          <PreviewImage 
          src={capturedImage}
          alt="Captured"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        )}
      </WebcamWrapper>

      <ButtonContainer>
        {!capturedImage ? (
          <CaptureButton onClick={capture}>촬영하기</CaptureButton>
        ) : (
          <>
            <CaptureButton onClick={retake}>재촬영</CaptureButton>
            <CaptureButton onClick={() => alert("등록 완료")}>등록하기</CaptureButton>
          </>
        )}
      </ButtonContainer>
    </Container>
  );
}

