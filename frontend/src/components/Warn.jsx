import { useState } from 'react';
import styled from 'styled-components';
import colors from '../assets/colors';

const WarnContainer = styled.div`
    width: 90%;
    position: fixed;
    bottom: 0;
    background-color: ${(props) => (props.$warnCount === 0 ? colors.taking : colors.paused)};
    color: ${(props) => (props.$warnCount === 0 ? 'white' : 'black')};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    font-weight: 700;
    transition: transform 0.5s ease-in-out;
    margin-bottom: 60px;
    transform: ${(props) => (props.$isOpen ? `translateY(calc(0%))` : `translateY(calc(100% - 70px))`)};
`;

const WarnCount = styled.div`
    font-size: 1.25rem;
    padding: 10px 0px;
`;

const WarnText = styled.div`
    font-size: 0.75rem;
    padding: 10px 0px;
`;

const WarnContent = styled.div``;

function Warn() {
    // const [warnData, setWarnData] = useState([]);
    const [warnData, setWarnData] = useState(['병용 금기', '임산부 금기']);
    const [warnIsOpen, setWarnIsOpen] = useState(false);

    const handleWarn = () => {
        if (warnData.length !== 0) {
            setWarnIsOpen(!warnIsOpen);
        }
    };

    return (
        <WarnContainer onClick={handleWarn} $warnCount={warnData.length} $isOpen={warnIsOpen}>
            {warnData.length === 0 ? (
                <>
                    <WarnCount>확인되는 주의사항이 없습니다!</WarnCount>
                    <WarnText>안심하고 드셔도 괜찮습니다!</WarnText>
                </>
            ) : (
                <>
                    <WarnCount>주의사항이 {warnData.length}건 있습니다.</WarnCount>
                    <WarnText>처방받은 약국에 문의하세요.</WarnText>

                    <WarnContent>
                        <div>내용이 여기에 표시됩니다.</div>
                        <div>내용이 여기에 표시됩니다.</div>
                        <div>내용이 여기에 표시됩니다.</div>
                        <div>내용이 여기에 표시됩니다.</div>
                        <div>내용이 여기에 표시됩니다.</div>
                        <div>내용이 여기에 표시됩니다.</div>
                    </WarnContent>
                </>
            )}
        </WarnContainer>
    );
}

export default Warn;
