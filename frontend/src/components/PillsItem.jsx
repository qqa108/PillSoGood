import styled from 'styled-components';
import colors from '../assets/colors';
import Pill from './Pill';

function PillsItem({ item, handleOpenModal }) {
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

    const Detail = styled.div`
        color: ${colors.disableText};
        font-size: 0.8rem;
        cursor: pointer;
    `;

    const PillsList = styled.ul`
        font-size: 0.8rem;
        width: 100%;
        display: flex;
        flex-direction: column;
    `;

    return (
        <ItemContainer>
            <Date>{item.date}</Date>
            <ContentContainer>
                <TopWrapper>
                    <PillsNickName>{item.pillsNickName}</PillsNickName>
                    <Detail onClick={handleOpenModal}>자세히 보기</Detail>
                </TopWrapper>
                <PillsList>
                    {item.pillsList.map((e) => (
                        <Pill key={e}></Pill>
                    ))}
                </PillsList>
            </ContentContainer>
        </ItemContainer>
    );
}

export default PillsItem;
