import Modal from 'react-modal';
import styled from 'styled-components';
import colors from '../../../assets/colors';
import MedicineBag from '../../../assets/medicine_bag.svg'
import Prescription from '../../../assets/prescription.svg'
import Medicine from '../../../assets/medicine.svg'
import Pencil from '../../../assets/pencil.svg'

// 모달 오버레이 스타일 정의
const customModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "100%",
    zIndex: 10,
    position: "fixed",
    // top: "0",
    // left: "0",
  },
  content: {
    backgroundColor: colors.point1,
    color: "white",
    borderRadius: "10px",
    height: "auto",
    width: "100%",
    position: "absolute",
    bottom: "-8.5%",
    left: "50%",
    transform: "translate(-50%, -50%)", // 수평 수직 중앙 정렬
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "auto",
    
  },
};

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem;
`;


const Rectangle = styled.div`
  width: 23rem;
  height: 3rem;
  flex-shrink: 0;
  border-radius: 12px;
  background: #FFF;
  margin-bottom: 0.7rem;  // 직사각형 간격
  display: flex;
  align-items: center;
`;

// 텍스트 스타일 정의
const RectangleText = styled.span`
  font-size: 1rem;
  color: #333;
  margin-left: 0.5rem;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  margin-left: 0.3rem;
  /* left: 15; */
`;

const items = [
  { icon: MedicineBag, text: "약봉투 등록" },
  { icon: Medicine, text: "약사진 등록" },
  { icon: Prescription, text: "내 진로내역 등록" },
  { icon: Pencil, text: "직접 등록" },
];

// 클래스 네임을 통해 모달 스타일을 적용
export default function PillCardRegister({ isModalOpen, closeModal }) {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      className="StyledModal"    
      style={customModalStyles}
      
    > 
      <ModalContent>
      {items.map((item, index) => (
          <Rectangle key={index}>
            <IconWrapper>
              <img src={item.icon} alt={item.text} width={"80%"} />
            </IconWrapper>
            <RectangleText>{item.text}</RectangleText>
          </Rectangle>
        ))}
      </ModalContent>

    </Modal>
  );
}
