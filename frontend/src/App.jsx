import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import colors from './assets/colors';
import { Outlet, useLocation } from 'react-router-dom';

const AppContainer = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-color: ${colors.background};
`;

const OutletContainer = styled.div`
    padding-top: 60px;
    padding-bottom: 80px;
    /* min-height: calc(100vh - 140px); */
    /* height: 300vh; */
    width: 80%;
    margin: 0px auto;
`;

function App() {
    const location = useLocation();
    return (
        <AppContainer>
            <Header />
            <OutletContainer>
                <Outlet />
            </OutletContainer>
            <Footer />
        </AppContainer>
    );
}

export default App;
