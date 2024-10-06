import { useEffect } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import colors from './assets/colors';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from './atoms/userState';
import useAxios from './hook/useAxios';
import { USER } from './assets/apis';
import './firebase-messaging-sw.js';
import LoadMyPill from './components/LoadMyPill.jsx';
import LoadNotification from './pages/Notification/LoadNotification.jsx';

const AppContainer = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-color: ${colors.background};
`;

const OutletContainer = styled.div`
    padding-top: 60px;
    width: 80%;
    margin: 0px auto;
`;

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const setUserState = useSetRecoilState(userState);
    const userInfo = useRecoilValue(userState);
    const { data, loading, error } = useAxios(`${USER}`, 'GET'); // 데이터 요청

    useEffect(() => {
        if (data) {
            setUserState({
                allergies: data.allergies,
                birth: data.birth,
                email: data.email,
                gender: data.gender,
                height: data.height,
                name: data.name,
                pregnancy: data.pregnancy,
                userDetailId: data.userDetailId,
            });
        }
    }, [data]); // data 전체가 변경될 때만 실행

    // useEffect(() => {
    //     if (userInfo) {
    //         // 그 엑세스 토큰으로 회원정보 요청
    //         if (location.pathname === '/') {
    //             navigate('/home');
    //         }
    //     } else {
    //         // navigate('/member/login');
    //     }
    // }, [userInfo, location.pathname, navigate, setUserState]);

    return (
        <AppContainer>
            <LoadMyPill />
            <LoadNotification />
            <Header />
            <OutletContainer>
                <Outlet />
            </OutletContainer>
            <Footer />
        </AppContainer>
    );
}

export default App;
