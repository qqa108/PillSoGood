import styled from 'styled-components';
import colors from '../../assets/colors';

const ItemContainer = styled.div`
    width: 100%;
    height: 100px;
    border: 1.5px solid ${colors.taking};
    border-radius: 6px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TopContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    font-weight: 700;
    margin-bottom: 20px;
`;

const Name = styled.div`
    font-size: 1.25rem;
`;

const Setting = styled.div`
    cursor: pointer;
    color: ${colors.disableText};
`;

const ButtonContainer = styled.div`
    display: flex;
    & > div:not(:last-child) {
        margin-right: 10px;
    }
`;

const Button = styled.div`
    display: flex;
    justify-content: center;
    padding: 5px;
    box-sizing: border-box;
    border: 1.5px solid ${colors.point1};
    color: ${colors.point1};
    width: 90px;
    height: 30px;
    font-weight: 700;
    border-radius: 6px;
`;

function NotificationItem({ children }) {
    return (
        <ItemContainer>
            <TopContainer>
                <Name>코로나 약 (7일분)</Name>
                <Setting>알림 설정</Setting>
            </TopContainer>
            <ButtonContainer>
                <Button>8시 30분</Button>
                <Button>12시 30분</Button>
                <Button>20시 30분</Button>
            </ButtonContainer>
        </ItemContainer>
    );
}

export default NotificationItem;
