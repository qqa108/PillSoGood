import styled from 'styled-components';
import { FaCirclePlus } from "react-icons/fa6";
import colors from '../assets/colors';
import { useNavigate } from 'react-router-dom';

// 버튼 스타일 정의
const Button = styled.button`
  width: 305px;
  height: 42.743px;
  flex-shrink: 0;
  border-radius: 60px;
  border: 0.06rem solid #033075;
  background: #FFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px; /* 텍스트와 아이콘 사이 여백 */
`;

// 버튼 내 텍스트 스타일 정의
const ButtonText = styled.div`
  width: 270.565px;
  height: 21.982px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  text-align: center;
  font-family: 'NanumGothic', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: normal;
`;

// 아이콘을 위한 컨테이너
const IconContainer = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  & > svg {
   font-size: 1.25rem;
   color: ${colors.point2}
  }

`;

const PillList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
`;

const PillItem = styled.li`
  background-color: ${colors.background};
  padding: 5px 10px;
  border-radius: 12px;
  border: 1px solid ${colors.point1};
  margin-bottom: 5px;
  font-size: 0.9rem;
`;

const AddPillButton_ver1 = ({ text }) => {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/search/register'); // 클릭 시 페이지 이동
  };

  return (
    <>
    <Button onClick={handleClick}>
      <ButtonText>{text}</ButtonText>
      <IconContainer alt="Add Icon" ><FaCirclePlus /></IconContainer>
    </Button>

    
    </>
  );
};

export default AddPillButton_ver1;
