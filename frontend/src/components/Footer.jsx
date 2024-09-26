import styled from 'styled-components';
import { CiPill } from 'react-icons/ci';
import { IoMdAlarm } from 'react-icons/io';
import { AiFillHome } from 'react-icons/ai';
import { FaClipboardList } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { useNavigate, useLocation } from 'react-router-dom';
import colors from '../assets/colors';

const FooterContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 60px;
    align-items: center;
    box-sizing: border-box;
    bottom: 0; /* 화면 아래에 고정 */
    left: 0; /* 왼쪽 정렬 */
    position: fixed; /* 고정 위치 */
    background-color: white;
`;

const FooterItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    cursor: pointer;
    width: 70px;
    font-weight: 600;
    color: ${(props) => (props.$active === 'true' ? colors.point1 : colors.point4)}; /* 활성화된 아이템 색상 */
`;

const ItemName = styled.div`
    font-size: 0.75rem;
`;

const ItemIcon = styled.div`
    font-size: 1.25rem;
`;

function Footer() {
    const location = useLocation();
    const navigate = useNavigate();

    const movePage = (page) => {
        navigate(page);
    };

    const footerList = [
        { name: '복용 중인 약', url: 'mypills', icon: <CiPill /> },
        { name: '알림', url: 'notification', icon: <IoMdAlarm /> },
        { name: '홈', url: 'home', icon: <AiFillHome /> },
        { name: '복약 기록', url: 'history', icon: <FaClipboardList /> },
        { name: '내 정보', url: 'profile', icon: <CgProfile /> },
    ];

    return (
        <FooterContainer>
            {footerList.map((item) => (
                <FooterItem
                    key={item.url}
                    onClick={() => movePage(item.url)}
                    $active={location.pathname.includes(item.url).toString()} // 현재 경로에 따라 active 상태 설정
                >
                    <ItemIcon>{item.icon}</ItemIcon>
                    <ItemName>{item.name}</ItemName>
                </FooterItem>
            ))}
        </FooterContainer>
    );
}

export default Footer;
