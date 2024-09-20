import KakaoLogin from '../../../KaKaoLogin';
import ContentContainer from '../ContentContainer';
import ContentText from '../ContentText';
import PillImage from '../PillImage';

function Login() {
    return (
        <ContentContainer>
            <ContentText>우리가족 첫번째 약물 관리 앱</ContentText>
            <ContentText>Pill So Good</ContentText>
            <PillImage />
            <KakaoLogin />
        </ContentContainer>
    );
}
export default Login;
