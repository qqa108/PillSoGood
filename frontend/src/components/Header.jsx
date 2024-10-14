import styled from 'styled-components';
import colors from '../assets/colors';
import { IoMdArrowBack } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const HeaderContainer = styled.div`
    width: 100vw;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.main};
    color: white;
    position: fixed;
    z-index: 1;
`;

const PageName = styled.div`
    font-weight: 600;
    font-size: 1.25rem;
`;

const BackButton = styled.div`
    position: absolute;
    font-size: 1.25rem;
    left: 20px;
    cursor: pointer;
`;

function Header() {
    const navigate = useNavigate();
    const moveBack = () => {
        navigate(-1);
    };
    const location = useLocation();
    const [pageName, setPageName] = useState('');
    const pageNameList = [
        {
            path: 'survey',
            name: '사용자 정보 등록',
        },
        {
            path: 'mypills',
            name: '복용중인 약',
        },
        {
            path: 'photoGuide',
            name: '약물 카드 등록',
        },
        {
            path: 'historyReguisterModal',
            name: '약물 카드 등록',
        },
        {
            path: 'registerCard',
            name: '약품 등록',
        },
        {
            path: 'notification',
            name: '알림',
        },
        {
            path: 'home',
            name: '홈',
        },
        {
            path: 'compare',
            name: '약물 비교',
        },
        {
            path: 'search',
            name: '의약품 검색',
        },
        {
            path: 'history',
            name: '복약 기록',
        },
    ];

    useEffect(() => {
        const nowPath = location.pathname.split('/').pop(); // 현재 경로의 마지막 부분 가져오기
        const currentPage = pageNameList.find((page) => page.path === nowPath); // 일치하는 페이지 찾기
        if (currentPage) {
            setPageName(currentPage.name); // 일치하면 페이지 이름 설정
        } else {
            setPageName('내정보'); // 일치하는 페이지가 없으면 빈 문자열로 설정
        }
    }, [location.pathname]);

    return (
        <HeaderContainer>
            <BackButton onClick={moveBack}>
                <IoMdArrowBack />
            </BackButton>
            <PageName>{pageName}</PageName>
        </HeaderContainer>
    );
}

export default Header;
