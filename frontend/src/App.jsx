import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import colors from './assets/colors';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from './atoms/userState';

const AppContainer = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-color: ${colors.background};
`;

const OutletContainer = styled.div`
    padding-top: 60px;
    padding-bottom: 80px;
    /* min-height: calc(100vh - 140px); */
    /* height: 300vh; */
    width: 80%;
    margin: 0px auto;
`;

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const userInfo = useRecoilValue(userState);
    const setUserState = useSetRecoilState(userState);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            //그 엑세스 토큰으로 회원정보 요청
            //정보 잘 듫어오면 setUserState 해주고 페이지 이동
            if (location.pathname === '/') {
                navigate('/home');
            }

            // 정보 안들어오면 alert 해주고 로그인 창으로.
            //alert("로그인이 만료되었습니다. 로그인 창으로 이동합니다.")
            //navigate('/member/login');
        } else {
            navigate('/member/login');
        }
    }, []);

    // useEffect(() => {});
    return (
        <AppContainer>
            <Header />
            <OutletContainer>
                <Outlet />
            </OutletContainer>
            <Footer />
        </AppContainer>
    );
}

export default App;
