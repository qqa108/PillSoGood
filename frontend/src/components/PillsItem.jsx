import styled from 'styled-components';
import colors from '../assets/colors';
import Pill from './Pill';
import { FaBell } from 'react-icons/fa';
import { FaBellSlash } from 'react-icons/fa';
import { memo, useEffect, useState } from 'react';

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
    border: 1.5px solid ${colors.taking};
    font-weight: 700;
    background-color: white;
`;
const TopWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    const [bellState, setBellState] = useState(false);
    // useEffect()

    return (
        <ItemContainer onClick={handleOpenModal}>
            {/* <Date>{info?.date}</Date> */}
            <Date>{info?.intakeAt}</Date>
            <ContentContainer>
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
                {/* <div>약리스트</div> */}
                <PillsList>
                    {info?.userMedicationDetailList?.map((e, i) => (
                        <Pill key={i} pillInfo={e.medicineDTO} />
                    ))}
                </PillsList>
            </ContentContainer>
        </ItemContainer>
    );
}

export default memo(PillsItem, (prevProps, nextProps) => {
    return prevProps.info === nextProps.info;
});
