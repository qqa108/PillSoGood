import styled from 'styled-components';
import colors from '@/assets/colors';
import pillImage from '@/assets/pill_image.png';
import KakaoLogin from '../../../KaKaoLogin';

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const LoginText = styled.div`
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

const Image = styled.img`
    width: 200px;
`;

function Login() {
    return (
        <LoginContainer>
            <LoginText>우리가족 첫번째 약물 관리 앱</LoginText>
            <LoginText>Pill So Good</LoginText>
            <ImageWrapper>
                <Image src={pillImage} />
            </ImageWrapper>
            <KakaoLogin />
        </LoginContainer>
    );
}
export default Login;
