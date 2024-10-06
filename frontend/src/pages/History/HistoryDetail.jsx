import styled from 'styled-components';
import colors from '../../assets/colors';
import { useState } from 'react';
import Pill from '../../components/Pill';
import axios from 'axios';
import { MYPILLS } from '../../assets/apis';

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const PillNickNameWrapper = styled.div`
    display: flex;
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 20px;
`;

const TopWrapper = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
    width: 100%;
    justify-content: space-around;
`;

const HospitalName = styled.div`
    font-size: 1.2rem;
`;

const Date = styled.div`
    font-size: 0.85em;
    color: ${colors.disableText};
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const StateButton = styled.div`
    width: 70px;
    display: flex;
    justify-content: center;
    padding: 5px;
    border: 1.5px solid ${(props) => (props.$active === 'true' ? props.color : colors.disableText)};
    color: ${(props) => (props.$active === 'true' ? props.color : colors.disableText)};
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

function HistoryDetail({ detailInfo }) {
    console.log(detailInfo);
    const pillState = [
        {
            stateName: '복약중',
            active: detailInfo?.status === 'TAKING' ? true : false,
            color: colors.taking,
            name: 'TAKING',
        },
        {
            stateName: '복약중단',
            active: detailInfo?.status === 'STOPPED' ? true : false,
            color: colors.paused,
            name: 'STOPPED',
        },
        {
            stateName: '복약종료',
            active: detailInfo?.status === 'COMPLETED' ? true : false,
            color: colors.stopped,
            name: 'COMPLETED',
        },
    ];

    const handleButtonState = (status) => {
        console.log(status);
        changeState(status);
    };

    const changeState = (status) => {
        const url = MYPILLS(detailInfo?.id);
        const data = {
            name: detailInfo?.name,
            intakeAt: detailInfo?.intakeAt,
            prescriptionDay: detailInfo?.prescriptionDay,
            hospitalName: detailInfo.hospitalName,
            pharmacyName: detailInfo.pharmacyName,
            status: status,
        };
        const config = {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                RefreshToken: localStorage.getItem('refreshToken'),
            },
        };

        axios
            .put(url, data, config)
            .then((e) => {
                console.log(e);
                console.log('성공');
            })
            .catch((error) => {
                console.error('오류');
            });
    };

    return (
        <>
            <ContentWrapper>
                <PillNickNameWrapper>
                    {detailInfo?.name} ({detailInfo?.prescriptionDay}일분)
                </PillNickNameWrapper>
                <TopWrapper>
                    <HospitalName>{detailInfo?.hospitalName}</HospitalName>
                    <Date>{detailInfo?.intakeAt.substring(0, 10)}</Date>
                </TopWrapper>
                {detailInfo?.userMedicationDetailList?.map((e, i) => (
                    <Pill key={i} pillInfo={e} />
                ))}
            </ContentWrapper>
            <ButtonContainer>
                {pillState.map((e, i) => (
                    <StateButton
                        key={i}
                        $active={String(e.active)}
                        color={e.color}
                        onClick={() => handleButtonState(e.name)}
                    >
                        {e.stateName}
                    </StateButton>
                ))}
            </ButtonContainer>
        </>
    );
}

export default HistoryDetail;
