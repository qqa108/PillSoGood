import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { mediListState } from '@/atoms/mediListState';
import { notificationState } from '@/atoms/notificationState';
import colors from '../../../assets/colors';

const MedicationStatusTitle = styled.div`
    color: #000;
    font-size: 1.25rem;
    margin: 0.5rem 0;
`;

const MedicationStatusContainer = styled.div`
    width: 100%;
    min-height: 5rem;
    border-radius: 0.375rem;
    border: 1px solid #0550b2;
    background-color: #fff;
    padding-top: 0.5rem;
    margin-bottom: 5rem;
`;

const MedicationItem = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.2rem 0.5rem;
    border-radius: 0.375rem;
`;

const MedicationName = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1rem;
    color: #0550b2;
    margin-bottom: 0.3rem;
`;

const MedicationDetails = styled.div`
    font-size: 0.675rem;
    color: #555;
`;

const ScrollableIcons = styled.div`
    display: flex;
    gap: 0.5rem;
    overflow-x: scroll;

    ::-webkit-scrollbar {
        display: none;
    }
`;

const MedicationIcon = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ $isTaken }) => ($isTaken ? '#EBF3FF' : 'none')};
    border: 1px solid #0550b2;
    border-radius: 50%;
`;

const MedicationIconText = styled.span`
    color: #0550b2;
    font-size: 0.625rem;
`;

const NoDrugsText = styled.div`
    margin: 0 0 1rem 1rem;
    color: ${colors.text};
    font-size: 1rem;
    font-weight: 400;
    line-height: normal;
    width: 80%;
`;

const MedicationStatus = () => {
    const mediListInfo = useRecoilValue(mediListState);
    const notifications = useRecoilValue(notificationState);
    const [medicationStatus, setMedicationStatus] = useState([]);

    useEffect(() => {
        const calculateMedicationStatus = () => {
            const now = new Date();
            const today = now.toISOString().split('T')[0];
            const currentHourMinute = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

            const statusList = mediListInfo
                .filter((medication) => {
                    const relatedNotification = notifications.find((notification) => notification.id === medication.id);
                    return relatedNotification && relatedNotification.alertTimes;
                })
                .map((medication) => {
                    const { prescriptionDay, id, name } = medication;
                    const relatedNotification = notifications.find((notification) => notification.id === id);

                    const firstAlertDate = new Date(
                        Math.min(...relatedNotification.alertTimes.map((alert) => new Date(alert)))
                    );
                    const formattedFirstAlertDate = firstAlertDate.toISOString().split('T')[0];

                    const daysTaken = Math.floor(
                        (new Date(today) - new Date(formattedFirstAlertDate)) / (1000 * 60 * 60 * 24)
                    );
                    const daysLeft = Math.max(prescriptionDay - daysTaken, 0);

                    const dailyDosesTimes = relatedNotification.alertTimes
                        .filter((alert) => new Date(alert).toISOString().split('T')[0] === today)
                        .map((alert) => {
                            const alertDate = new Date(alert);
                            const koreanTime = new Date(alertDate.getTime() + 9 * 60 * 60 * 1000);
                            return `${String(koreanTime.getHours()).padStart(2, '0')}:${String(koreanTime.getMinutes()).padStart(2, '0')}`;
                        });

                    return {
                        name: name || '이름 없음',
                        daysTaken,
                        daysLeft,
                        dailyDosesTimes,
                        currentHourMinute,
                    };
                });

            setMedicationStatus(statusList);
        };

        calculateMedicationStatus();
    }, [mediListInfo, notifications]);

    return (
        <div>
            <MedicationStatusTitle>복약 현황</MedicationStatusTitle>
            <MedicationStatusContainer>
                {medicationStatus.length === 0 ? (
                    <NoDrugsText>등록된 복용 일정이 없습니다.</NoDrugsText>
                ) : (
                    medicationStatus.map((medication, index) => (
                        <MedicationItem key={index}>
                            <MedicationName>
                                {medication.name}
                                <MedicationDetails>
                                    먹은 지 {medication.daysTaken}일째 | 남은 복약 일수: {medication.daysLeft}일
                                </MedicationDetails>
                            </MedicationName>
                            <ScrollableIcons>
                                {medication.dailyDosesTimes.map((doseTime, doseIndex) => {
                                    const isTaken = doseTime <= medication.currentHourMinute;
                                    return (
                                        <MedicationIcon key={doseIndex} $isTaken={isTaken}>
                                            <MedicationIconText>{`${doseIndex + 1}회차`}</MedicationIconText>
                                        </MedicationIcon>
                                    );
                                })}
                            </ScrollableIcons>
                        </MedicationItem>
                    ))
                )}
            </MedicationStatusContainer>
        </div>
    );
};

export default MedicationStatus;
