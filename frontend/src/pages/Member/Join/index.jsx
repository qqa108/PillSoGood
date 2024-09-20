import styled from 'styled-components';
import ContentContainer from '../ContentContainer';
import ContentText from '../ContentText';
import PillImage from '../PillImage';

const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
    padding: 1rem;
    box-sizing: border-box;
    width: 100%;
    height: 100px;
    border: 1px solid black;
    text-align: center; // 텍스트 중앙 정렬
    line-height: 1.5;
    margin-bottom: 30px;
`;

function Join() {
    return (
        <ContentContainer>
            <ContentText>회원가입이 완료되었습니다!</ContentText>
            <PillImage />
            <Button>
                내 정보를 입력하고 <br /> 상세하게 안내 받을래요
            </Button>
            <Button>다음에 입력할래요</Button>
        </ContentContainer>
    );
}
export default Join;
