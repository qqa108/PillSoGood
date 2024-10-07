import styled from 'styled-components';
import colors from '../assets/colors';
import Pill from './Pill';
import { FaBell } from 'react-icons/fa';
import { FaBellSlash } from 'react-icons/fa';
import { memo, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { notificationState } from '../atoms/notificationState';

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

function PillsItem({ info, type, handleOpenModal }) {
    const notificationList = useRecoilValue(notificationState);
    const [bellState, setBellState] = useState(false);

    const fetchNoti = async (medicationId) => {
        const config = {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                RefreshToken: localStorage.getItem('refreshToken'),
            },
        };
        try {
            const response = await axios.get(NOTIFICATION(medicationId), config);
            return response.data; // 알림 데이터 반환
        } catch (error) {
            console.error('알림 요청 오류:', error);
            return null; // 오류 발생 시 null 반환
        }
    };

    const handleNotiOn = () => {
        confirm('알림을 설정하시겠습니까?');
    };

    const hanleNotiOff = () => {
        confirm('알림을 끄시겠습니까?');
    };

    useEffect(() => {
        if (notificationList.length !== 0) {
            if (notificationList.some((notification) => notification.id === info.id)) {
                setBellState(true);
            }
        }
    }, [notificationList]);

    return (
        <ItemContainer onClick={handleOpenModal}>
            <Date>{info?.intakeAt?.substring(0, 10)}</Date>
            <ContentContainer $status={info?.status}>
                <TopWrapper>
                    {/* <PillsNickName>{info.pillsNickName}</PillsNickName> */}
                    <PillsNickName>{info?.name}</PillsNickName>
                    <NotificationWrapper
                        onClick={(e) => {
                            e.stopPropagation();
                            setBellState(() => !bellState);
                        }}
                    >
                        {type !== 'history' ? bellState === true ? <FaBell /> : <FaBellSlash /> : null}
                    </NotificationWrapper>
                </TopWrapper>
                <PillsList>
                    {info?.userMedicationDetailList?.map((e, i) => (
                        <Pill key={i} pillInfo={e} />
                    ))}
                </PillsList>
            </ContentContainer>
        </ItemContainer>
    );
}

export default memo(PillsItem, (prevProps, nextProps) => {
    return prevProps.info === nextProps.info;
});
