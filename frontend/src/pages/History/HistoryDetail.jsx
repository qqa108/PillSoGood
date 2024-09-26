import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import colors from '../../assets/colors';
import { useState } from 'react';
import Pill from '../../components/Pill';

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.div`
    background-color: white;
    width: 80%;
    height: 400px;
    padding: 10px;
    border-radius: 6px;
`;

const CloseWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    font-size: 1.5rem;
    color: ${colors.main};
    & > svg {
        transition: 0.2s ease-in-out;
        cursor: pointer;
        &:hover {
            color: ${colors.point1};
        }
    }
`;

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

function HistoryDetail({ detailInfo, onClose }) {
    console.log('디테일 로드');
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

    return (
        <>
            <ContentWrapper>
                <PillNickNameWrapper>코로나 약 (7일분)</PillNickNameWrapper>
                <TopWrapper>
                    <HospitalName>최용훈 이비인후과</HospitalName>
                    <Date>2024.09.06</Date>
                </TopWrapper>
                <Pill pillInfo={1} />
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
