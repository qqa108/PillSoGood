import styled from 'styled-components';
import colors from '../../assets/colors';
import { useState } from 'react';
import Pill from '../../components/Pill';

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
    border: 1.5px solid ${(props) => (props.active ? props.color : colors.disableText)};
    color: ${(props) => (props.active ? props.color : colors.disableText)};
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

function HistoryDetail({ detailInfo }) {
    const [pillState, setPillstate] = useState([
        { stateName: '복약중', active: true, color: colors.taking },
        { stateName: '복약중단', active: false, color: colors.paused },
        { stateName: '복약종료', active: false, color: colors.stopped },
    ]);

    const handleButtonState = (index) => {
        const tempState = [
            { stateName: '복약중', active: false, color: colors.taking },
            { stateName: '복약중단', active: false, color: colors.paused },
            { stateName: '복약종료', active: false, color: colors.stopped },
        ];
        tempState[index].active = true;
        setPillstate(tempState);
    };

    console.log(detailInfo);

    return (
        <>
            <ContentWrapper>
                <PillNickNameWrapper>{detailInfo?.name}</PillNickNameWrapper>
                <TopWrapper>
                    <HospitalName>{detailInfo?.hospitalName}</HospitalName>
                    <Date>{detailInfo?.intakeAt}</Date>
                </TopWrapper>
                {detailInfo?.userMedicationDetailList?.map((e, i) => (
                    <Pill key={i} pillInfo={e.medicineDTO} />
                ))}
            </ContentWrapper>
            <ButtonContainer>
                {pillState.map((e, i) => (
                    <StateButton key={i} active={e.active} color={e.color} onClick={() => handleButtonState(i)}>
                        {e.stateName}
                    </StateButton>
                ))}
            </ButtonContainer>
        </>
    );
}

export default HistoryDetail;
