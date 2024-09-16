import styled from 'styled-components';
import SocialLogin from './KaKaoLogin';
import KakaoSignOut from './KaKaoSignOut';
import Header from './components/Header';
import Footer from './components/Footer';
import colors from './assets/colors';

const Div = styled.div`
    padding-top: 40px;
    padding-bottom: 60px;
    width: 100vw;
    background-color: ${colors.point4};
    min-height: calc(100vh - 100px);
`;

const TestDiv = styled.div``;

function App() {
    return (
        <TestDiv>
            <Header />
            <Div>
                <SocialLogin />
                <KakaoSignOut />
            </Div>
            <Footer />
        </TestDiv>
    );
}

export default App;
