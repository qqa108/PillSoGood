import styled from 'styled-components';
import colors from '../assets/colors';
import { IoMdArrowBack } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';

const HeaderContainer = styled.div`
    width: 100vw;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.main};
    color: white;
    position: fixed;
    z-index:3000;
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
    return (
        <HeaderContainer>
            <BackButton onClick={moveBack}>
                <IoMdArrowBack />
            </BackButton>
            <PageName>페이지 이름</PageName>
        </HeaderContainer>
    );
}

// 나중에 link params로 페이지 이름 변경되게 구현해야함.

export default Header;
