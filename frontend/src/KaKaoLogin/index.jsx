import { useEffect } from 'react';
import { RiKakaoTalkFill } from 'react-icons/ri';
import styled from 'styled-components';

const KAKAO_APP_KEY = 'e0b82853f928fa73b89ecc0a4fc4dc82';

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    background-color: #fee500;
    border-radius: 10px;
    font-size: 1.25rem;
    & > svg {
        margin-right: 0.75rem;
    }
    padding: 1rem;
    width: 70%;
    margin: 0px auto;
`;

const KakaoLogin = () => {
    useEffect(() => {
        if (!window.Kakao.isInitialized()) {
            window.Kakao.init(KAKAO_APP_KEY);
        }
    }, []);
    const handleLogin = () => {
        window.Kakao.Auth.login({
            scope: 'account_email, profile_nickname', // 동의받을 항목 설정
            success: async (authObj) => {
                const userInfo = await getKakaoUserInfo(authObj.access_token);
                const isExistingUser = await checkIfUserExists(userInfo.id);
                console.log('유저정보');
                console.log(authObj.access_token);
                console.log(userInfo);

                // if (isExistingUser) {
                //     console.log('로그인 성공', userInfo);
                // } else {
                //     // 회원가입 처리
                //     console.log('회원가입 진행', userInfo);
                //     await registerUser(userInfo);
                // }
            },
            fail: (err) => {
                console.error(err);
            },
        });
    };

    const getKakaoUserInfo = async (accessToken) => {
        const response = await fetch('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.json();
    };

    const checkIfUserExists = async (kakaoId) => {
        // 기존 회원 여부 확인 API 호출 로직
        // 예시: return await fetch(`/api/check-user/${kakaoId}`);
        return false; // 테스트를 위해 false로 설정
    };

    const registerUser = async (userInfo) => {
        // 회원가입 API 호출 로직
        // 예시: return await fetch('/api/register', { method: 'POST', body: JSON.stringify(userInfo) });
    };

    return (
        <LoginContainer onClick={handleLogin}>
            <RiKakaoTalkFill />
            카카오로 시작하기
        </LoginContainer>
    );
};

export default KakaoLogin;
