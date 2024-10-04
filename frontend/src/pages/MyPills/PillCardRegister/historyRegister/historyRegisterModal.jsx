import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../../../../components/Modal';  
import TextInput from '../../../../components/TextInput';
import colors from '../../../../assets/colors';

const Dropdown = styled.select`
  height: 2.75rem;
  margin-top: 1rem;
  border-radius: 6px;
  border: 0.03125rem solid #A9A9A9;
  padding: 0.625rem;
  font-size: 1rem;
  outline: none;
  background: white;

  &:focus {
    border-color: #000;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const SubmitButton = styled.button`
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

// 비활성 버튼
const DisabledButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    background-color: ${colors.point4};  
    color: ${colors.disableText};   
    border: none;
    border-radius: 5px;
    cursor: not-allowed;  

    &:hover {
        background-color:#F0F0F0;  
    }
`;

const Label = styled.div`
    margin-top: 0.8rem;
    color: #000;
    font-size: 1rem;
`;

export default function HistoryRegister() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(true);  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carrier: 'SKT', // 기본값 설정
  });

  // 입력 값 변경 처리 함수
  const handleInputChange = (e, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
  };

  const autoHyphen1 = (e) => {
    const target = e.target;
    const formattedPhone = target.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(-{1,2})$/g, "");

    setFormData({
      ...formData,
      phone: formattedPhone,
    });
  };

  // 모든 필드가 채워졌는지 확인하는 함수
  const isFormValid = () => {
    return formData.name.trim() !== '' && formData.phone.trim() !== '';
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 동작(페이지 리로드) 방지
    if (isFormValid()) {
      console.log('폼 제출:', formData);  // 여기서 폼 데이터를 처리하거나 서버로 전송
      navigate('/mypills/historyReguister')
      setIsModalOpen(false); // 모달 닫기
    } else {
      alert('모든 필드를 채워주세요.');
    }
  };

  return (
    <div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}> 
        {/* 반드시 입력해야되는 정보임으로 모달에 x 없애기 */}
        <style>
            {`
              svg { 
                display: none !important; 
              }
            `}
          </style>
          <h2>진료내역을 가져오기위한 정보를 입력해주세요</h2>


          {/* 유저 네임 알아서 가져와서 써지도록.. */}
          <TextInput
            label="이름"
            value={formData.name}
            onChange={(e) => handleInputChange(e, 'name')}
            type="text"
            placeholder="이름을 입력하세요"
          />

          <Label>통신사</Label>
          <Dropdown
            value={formData.carrier}
            onChange={(e) => handleInputChange(e, 'carrier')}
          >
            <option value="SKT">SKT</option>
            <option value="KT">KT</option>
            <option value="LG U+">LG U+</option>
          </Dropdown>

          <TextInput
            label="전화번호"
            value={formData.phone}
            onChange={autoHyphen1}
            type="tel"
            placeholder="전화번호를 입력하세요"
          />

          <ButtonContainer>
            {isFormValid() ? (
              <SubmitButton onClick={handleSubmit} >가져오기</SubmitButton>
            ) : (
              <DisabledButton disabled>가져오기</DisabledButton>
            )}
          </ButtonContainer>
        </Modal>
      )}
    </div>
  );
}
