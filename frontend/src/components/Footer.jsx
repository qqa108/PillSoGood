// import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CiPill } from 'react-icons/ci';
import { IoMdAlarm } from 'react-icons/io';
import { AiFillHome } from 'react-icons/ai';
import { FaClipboardList } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';

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
    /* color: ${(props) => (props.active ? 'blue' : 'gray')}; */
    cursor: pointer;
    width: 70px;
    font-weight: 600;
`;

const ItemName = styled.div`
    font-size: 0.75rem;
`;

const ItemIcon = styled.div`
    font-size: 1.25rem;
`;

function Footer() {
    // const location = useLocation();
    // const navigate = useNavigate();
    // const movePage = (page) => {
    //     navigate(page);
    // };
    const footerList = [
        { name: '복용 중인 약', url: 'MyPills', icon: <CiPill /> },
        { name: '알림', url: 'Notification', icon: <IoMdAlarm /> }, // 다른 아이콘으로 바꿀 수 있음
        { name: '홈', url: 'Home', icon: <AiFillHome /> },
        { name: '복약 기록', url: 'History', icon: <FaClipboardList /> },
        { name: '내 정보', url: 'Profile', icon: <CgProfile /> },
    ];

    return (
        <FooterContainer>
            {footerList.map((item) => (
                <FooterItem key={item}>
                    <ItemIcon>{item.icon}</ItemIcon>
                    <ItemName>{item.name}</ItemName>
                </FooterItem>
            ))}
        </FooterContainer>
    );
}

export default Footer;
