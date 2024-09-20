import styled from 'styled-components';
import colors from '../../assets/colors';

const history = [1, 2, 3];

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

const HistoryItem = styled.div``;

function History() {
    return (
        <HistoryContainer>
            {history.length > 0 ? (
                history.map((e, i) => {
                    return <HistoryItem key={e}>{e}</HistoryItem>;
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
