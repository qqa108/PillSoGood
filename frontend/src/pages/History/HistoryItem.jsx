import styled from 'styled-components';
import colors from '../../assets/colors';

// {
//     date: '2024.09.06',
//     hospitalName: '최용훈 이비인후과',
//     pillsNickName: '코로나 약 (7일분)',
//     pillsList: ['타이레놀', '콘택골드캡슐', '포린정', '그린노즈에스시럽'],
// },

const ItemContainer = styled.div`
    width: 100%;
    height: 160px;
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
    color: ${colors.disableText};
    margin-bottom: 10px;
`;

const Date = styled.div`
    font-size: 1rem;
`;

const Detail = styled.div`
    font-size: 0.8rem;
`;

const HospitalName = styled.div`
    font-size: 1.25rem;
    margin-bottom: 10px;
`;

const PillsNickName = styled.div`
    font-size: 1.1rem;
    margin-bottom: 10px;
`;

const PillsListItem = styled.li`
    font-size: 0.8rem;
`;

function HistoryItem({ item }) {
    return (
        <ItemContainer>
            <TopWrapper>
                <Date>{item.date}</Date>
                <Detail>자세히 보기</Detail>
            </TopWrapper>
            <HospitalName>{item.hospitalName}</HospitalName>
            <PillsNickName>{item.pillsNickName}</PillsNickName>
            {item.pillsList.map((e) => (
                <PillsListItem key={e}>{e}</PillsListItem>
            ))}
        </ItemContainer>
    );
}

export default HistoryItem;
