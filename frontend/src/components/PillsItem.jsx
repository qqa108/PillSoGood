import styled from 'styled-components';
import colors from '../assets/colors';
import Pill from './Pill';
import { FaBell } from 'react-icons/fa';
import { FaBellSlash } from 'react-icons/fa';
import { memo, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { notificationState } from '../atoms/notificationState';
import axios from 'axios';
import { ADDNOTIFICATION, DELETENOTIFICATION } from '../assets/apis';
import Modal from './Modal';
import NotificationForm from '../pages/Notification/NotificationForm';

const ItemContainer = styled.div`
    width: 100%;
`;

const Date = styled.div`
    font-size: 1.25rem;
    color: ${colors.disableText};
    margin-bottom: 10px;
    margin-left: 5px;
`;

const ContentContainer = styled.div`
    width: 100%;
    /* height: 160px; */
    box-sizing: border-box;
    padding: 0.75rem;
    border-radius: 6px;
    border: 1.5px solid
        ${(props) =>
            props?.$status === 'TAKING'
                ? colors.taking
                : props?.$status === 'STOPPED'
                  ? colors.paused
                  : colors.disableText};
    font-weight: 700;
    background-color: white;
`;
const TopWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
`;

const PillsNickName = styled.div`
    font-size: 1.5rem;
`;

const NotificationWrapper = styled.div`
    font-size: 2rem;
    color: ${colors.main};
`;

const PillsList = styled.ul`
    font-size: 0.8rem;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const NotiModalWrapper = styled.div``;

function PillsItem({ info, type, handleOpenModal }) {
    const notificationList = useRecoilValue(notificationState);
    const [bellState, setBellState] = useState(false);
    const [isNotiOpen, setIsNotiOpen] = useState(false);
    const fetchNoti = async (action, data = null) => {
        const config = {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                RefreshToken: localStorage.getItem('refreshToken'),
            },
        };

        try {
            let response;
            if (action === 'on') {
                response = await axios.post(ADDNOTIFICATION, data, config);
            } else if (action === 'off') {
                // 알림 끄기 (DELETE 요청)
                console.log(DELETENOTIFICATION(info?.id));
                response = await axios.delete(DELETENOTIFICATION(info?.id), config);
            } else {
                throw new Error('유효하지 않은 액션입니다.');
            }
            return response.data; // 알림 데이터 반환
        } catch (error) {
            console.error('알림 요청 오류:', error);
            return null; // 오류 발생 시 null 반환
        }
    };

    const handleNotiOn = () => {
        if (confirm('알림을 설정하시겠습니까?')) {
            setIsNotiOpen(true);
        }
    };

    const handleNotiOff = async () => {
        if (confirm('알림을 끄시겠습니까?')) {
            await fetchNoti('off'); // fetchNoti가 완료될 때까지 기다림
            window.location.reload(); // 페이지 새로고침
        }
    };

    useEffect(() => {
        if (notificationList.length !== 0) {
            if (notificationList.some((notification) => notification.id === info.id)) {
                setBellState(true);
            }
        }
    }, [notificationList]);

    return (
        <>
            <ItemContainer onClick={handleOpenModal}>
                <Date>{info?.intakeAt?.substring(0, 10)}</Date>
                <ContentContainer $status={info?.status}>
                    <TopWrapper>
                        {/* <PillsNickName>{info.pillsNickName}</PillsNickName> */}
                        <PillsNickName>{info?.name}</PillsNickName>
                        <NotificationWrapper
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            {type !== 'history' ? (
                                bellState === true ? (
                                    <FaBell onClick={handleNotiOff} />
                                ) : (
                                    <FaBellSlash onClick={handleNotiOn} />
                                )
                            ) : null}
                        </NotificationWrapper>
                    </TopWrapper>
                    <PillsList>
                        {info?.userMedicationDetailList?.map((e, i) => (
                            <Pill key={i} pillInfo={e} />
                        ))}
                    </PillsList>
                </ContentContainer>
            </ItemContainer>
            {isNotiOpen ? (
                <NotiModalWrapper>
                    <Modal>
                        <NotificationForm info={info} fetchNoti={fetchNoti} />
                    </Modal>
                </NotiModalWrapper>
            ) : null}
        </>
    );
}

export default memo(PillsItem, (prevProps, nextProps) => {
    return prevProps.info === nextProps.info;
});
