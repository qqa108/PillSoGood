import { useState } from 'react';
import NotificationItem from './NotificationItem';
import styled from 'styled-components';
import colors from '../../assets/colors';
import Modal from '../../components/Modal';
import NotificationForm from './NotificationForm';
import { useRecoilState, useRecoilValue } from 'recoil';
import { notificationState } from '../../atoms/notificationState';

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

const NoNoti = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
`;

function Notification() {
    const [notificationList, setNotificationList] = useRecoilState(notificationState);
    console.log(notificationList);
    return (
        <>
            <NotificationContainer>
                <Title>복약 알림 리스트</Title>
                {notificationList?.length >= 1 ? (
                    notificationList?.map((e, i) => <NotificationItem key={i} notificationInfo={e} />)
                ) : (
                    <NoNoti>등록된 알림이 없습니다.</NoNoti>
                )}
            </NotificationContainer>
        </>
    );
}

export default Notification;
