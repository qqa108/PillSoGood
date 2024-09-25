import { useState } from 'react';
import NotificationItem from './NotificationItem';
import styled from 'styled-components';
import colors from '../../assets/colors';
import Modal from '../../components/Modal';
import NotificationForm from './NotificationForm';

const NotificationContainer = styled.div`
    & > div:not(:last-child) {
        margin-bottom: 20px;
    }
`;

const Title = styled.div`
    font-weight: 700;
    font-size: 1.5rem;
    color: ${colors.point1};
    text-align: center;
    padding: 20px 0px;
`;

function Notification() {
    // const [notificationList, setNotificationList] = useState([
    // ]);
    const [notificationList, setNotificationList] = useState([
        { name: '코로나 약(7일분)', time: ['8시30분', '12시30분', '20시30분'] },
        { name: '탈모약 약(30일분)', time: ['8시30분', '20시30분'] },
        { name: '비염 약(14일분)', time: ['20시30분'] },
    ]);
    const [selectedInfo, setSelectedInfo] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => {
        console.log('닫기 시도');
        setModalOpen(false);
    };
    console.log('알림 페이지 로드');

    return (
        <>
            <NotificationContainer>
                <Title>복약 알림 리스트</Title>
                {notificationList.map((e, i) => (
                    <NotificationItem
                        key={i}
                        notificationInfo={e}
                        setSelectedInfo={setSelectedInfo}
                        onOpen={handleOpenModal}
                    />
                ))}
            </NotificationContainer>
            {isModalOpen && (
                <Modal onClose={handleCloseModal}>
                    <NotificationForm formInfo={selectedInfo} />
                </Modal>
            )}
        </>
    );
}

export default Notification;
