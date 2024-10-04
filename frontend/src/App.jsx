import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import colors from './assets/colors';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from './atoms/userState';
import useAxios from './hook/useAxios';
import { USER } from './assets/apis';
import { useEffect } from 'react';

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
    const setUserState = useSetRecoilState(userState);
    const userInfo = useRecoilValue(userState);
    const data = useAxios(USER, 'GET').data;
    console.log(data);

    useEffect(() => {
        if (userInfo) {
            // 그 엑세스 토큰으로 회원정보 요청
            // 정보 잘 들어오면 setUserState 해주고 페이지 이동
            if (location.pathname === '/') {
                navigate('/home');
            }

            // 정보 안 들어오면 alert 해주고 로그인 창으로.
            // alert("로그인이 만료되었습니다. 로그인 창으로 이동합니다.");
            // navigate('/member/login');
        } else {
            // navigate('/member/login');
        }
    }, [userInfo, location.pathname, navigate, setUserState]);
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
