import styled from 'styled-components';
import colors from '../../assets/colors';
import HistoryItem from './HistoryItem';

// const history = [1, 2, 3];
const history = [
    {
        date: '2024.09.06',
        hospitalName: '최용훈 이비인후과',
        pillsNickName: '코로나 약 (7일분)',
        pillsList: ['타이레놀', '콘택골드캡슐', '포린정', '그린노즈에스시럽'],
    },
];

const HistoryContainer = styled.div`
    min-height: calc(100vh - 140px);
    display: flex;
    flex-direction: column;
    align-items: center;
    & > *:not(:last-child) {
        margin-bottom: 15px;
    }
`;

const Text = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${colors.point1};
`;

const Button = styled.div`
    background-color: white;
    padding: 10px 40px;
    box-sizing: border-box;
    border-radius: 6px;
    border: 1.5px solid ${colors.point1};
    color: ${colors.point1};
    font-weight: 700;
    font-size: 1.25rem;
    width: 100%;
    text-align: center;
`;

const HistoryWrapper = styled.div`
    margin: auto 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > *:not(:last-child) {
        margin-bottom: 50px;
    }
`;

function History() {
    return (
        <HistoryContainer>
            {history.length > 0 ? (
                history.map((e, i) => {
                    return <HistoryItem item={e} key={e} />;
                })
            ) : (
                <HistoryWrapper>
                    <Text>등록된 복약 기록이 없습니다.</Text>
                    <Button>복약 기록 불러오기</Button>
                </HistoryWrapper>
            )}
        </HistoryContainer>
    );
}

export default History;
