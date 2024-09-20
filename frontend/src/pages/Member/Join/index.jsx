import styled from 'styled-components';
import colors from '@/assets/colors';
import pillImage from '@/assets/pill_image.png';

const SignUpContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${colors.background};
`;

const SignUpText = styled.div`
    display: flex;
    justify-content: center;
    color: ${colors.main};
    font-weight: 700;
    font-size: 1.25rem;
    margin-bottom: 30px;
`;

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
`;
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

const Image = styled.img`
    width: 200px;
`;

function SignUp() {
    return (
        <SignUpContainer>
            <SignUpText>회원가입이 완료되었습니다!</SignUpText>
            <ImageWrapper>
                <Image src={pillImage} />
            </ImageWrapper>
            <Button>
                내 정보를 입력하고 <br /> 상세하게 안내 받을래요
            </Button>
            <Button>다음에 입력할래요</Button>
        </SignUpContainer>
    );
}
export default SignUp;
