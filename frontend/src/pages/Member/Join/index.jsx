import styled from 'styled-components';
import ContentContainer from '../ContentContainer';
import ContentText from '../ContentText';
import PillImage from '../PillImage';
import colors from '../../../assets/colors';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../../hook/useAxios';
import { REGISTER } from '../../../assets/apis';

const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${colors.point1};
    font-weight: 700;
    font-size: 1.25rem;
    box-sizing: border-box;
    width: 100%;
    height: 100px;
    border: 1.5px solid ${colors.point1};
    border-radius: 6px;
    text-align: center; // 텍스트 중앙 정렬
    line-height: 1.25;
`;

function Join() {
    const navigate = useNavigate();
    const body = { family: '나' };
    const { data, loading, error } = useAxios(REGISTER, 'POST', body);
    console.log(error);
    console.log(data);
    return (
        <ContentContainer>
            <ContentText>회원가입이 완료되었습니다!</ContentText>
            <PillImage />
            <Button onClick={() => navigate('/survey')}>
                내 정보를 입력하고 <br /> 상세하게 안내 받을래요
            </Button>
            <Button onClick={() => navigate('/home')}>다음에 입력할래요</Button>
        </ContentContainer>
    );
}
export default Join;
