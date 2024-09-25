import styled from 'styled-components';
import colors from '../../assets/colors';
import { Outlet } from 'react-router-dom';

const MemberContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.background};
`;

const MemberContent = styled.div`
    width: 80%;
`;

function Member() {
    return (
        <MemberContainer>
            <MemberContent>
                <Outlet />
            </MemberContent>
        </MemberContainer>
    );
}

export default Member;
