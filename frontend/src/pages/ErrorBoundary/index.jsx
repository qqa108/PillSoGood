import styled from 'styled-components';
import { TbError404Off } from 'react-icons/tb';
import colors from '../../assets/colors';
import { useNavigate } from 'react-router-dom';

const ErrorContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ErrorWrapper = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > svg {
        font-size: 10rem;
    }
`;

const ErrorContent = styled.div`
    font-size: 1.5rem;
`;

const ErrorButton = styled.div`
    margin-top: 30px;
    padding: 20px 15px;
    box-sizing: border-box;
    background-color: ${colors.main};
    color: white;
    font-size: 2rem;
    border-radius: 10px;
`;

function ErrorBoundary() {
    const navigate = useNavigate();
    return (
        <ErrorContainer>
            <ErrorWrapper>
                <TbError404Off />
                <ErrorContent>페이지를 찾을 수 없습니다.</ErrorContent>
                <ErrorButton onClick={() => navigate('/')}>홈으로 돌아가기</ErrorButton>
            </ErrorWrapper>
        </ErrorContainer>
    );
}

export default ErrorBoundary;
