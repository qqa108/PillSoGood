import styled from 'styled-components';
import TextInput from '../../components/TextInput';

const FormContainer = styled.div`
    & > div {
        font-weight: 700;
        font-size: 1.25rem;
    }
`;

const Title = styled.div`
    font-size: 1.5rem !important;
    text-align: center;
    margin-bottom: 20px;
`;

const Name = styled.div`
    & > input {
    }
`;

const Period = styled.div``;

const Cycle = styled.div``;

const PerTime = styled.div``;

const NotificationTime = styled.div``;
function NotificationForm({ formInfo }) {
    console.log('폼 오픈');
    return (
        <FormContainer>
            <Title>복약 알림 등록</Title>
            <Name>
                약물 카드 이름
                <TextInput placeholder={formInfo.name} />
            </Name>
            <Period>복용 기간</Period>
            <Cycle>복용 주기</Cycle>
            <PerTime>1일 투여 횟수</PerTime>
            <NotificationTime>알림 시간</NotificationTime>
        </FormContainer>
    );
}

export default NotificationForm;
