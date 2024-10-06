import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import colors from '../assets/colors';
import axios from 'axios';
import { COMPAREPILL } from '../assets/apis';

const WarnContainer = styled.div`
    width: 90%;
    position: fixed;
    bottom: 0;
    background-color: ${(props) => (props.$warnCount === 0 ? colors.taking : colors.warn)};
    color: ${(props) => (props.$warnCount === 0 ? 'white' : 'black')};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    transition: transform 0.5s ease-in-out;
    margin-bottom: 60px;
    padding-top: 10px;
    transform: ${(props) => (props.$isOpen ? `translateY(calc(0%))` : `translateY(calc(100% - 90px))`)};
`;

const WarnCount = styled.div`
    font-weight: 700;
    font-size: 1.5rem;
    padding: 10px 0px;
`;

const WarnText = styled.div`
    font-size: 1.25rem;
    padding: 10px 0px;
`;

const WarnContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 90%;
    margin-bottom: 10px;
    background-color: white;
    height: 90px;
    border-radius: 6px;
    padding: 15px 20px;
    box-sizing: border-box;
`;

const WarnContentTitle = styled.div`
    font-weight: 500;
    overflow: hidden; // 을 사용해 영역을 감출 것
    text-overflow: ellipsis; // 로 ... 을 만들기
    white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
    word-break: break-all;
`;

const WarnContentPill = styled.div`
    font-size: 0.8rem;
`;

function Warn({ pillList }) {
    // const [warnData, setWarnData] = useState([]);
    const [warnData, setWarnData] = useState([]);
    const [warnIsOpen, setWarnIsOpen] = useState(false);

    const handleWarn = () => {
        if (warnData.length !== 0) {
            setWarnIsOpen(!warnIsOpen);
        }
    };

    const idList = [];

    // pillList를 순회하며 id 추출
    pillList?.forEach((pill) => {
        if (pill?.userMedicationDetailList) {
            pill.userMedicationDetailList.forEach((detail) => {
                if (detail?.medicineDTO?.id) {
                    idList.push(detail?.medicineDTO?.id); // detail의 id 추가
                }
            });
        } else {
            idList.push(pill.id); // pill의 id 추가
        }
    });

    useEffect(() => {
        console.log(idList);
        const data = { medicineIds: idList };
        const config = {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                RefreshToken: localStorage.getItem('refreshToken'),
            },
        };
        if (pillList.length !== 0) {
            //api요청
            axios.post(COMPAREPILL, data, config).then((e) => {
                console.log(e.data);
                setWarnData(e.data);
            });
        }
    }, [pillList]);

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

                    {warnData?.map((e, i) => {
                        return (
                            <WarnContentContainer key={i}>
                                <WarnContentTitle>{e?.effect}</WarnContentTitle>
                                <WarnContentPill>
                                    {e?.nameA}, {e?.nameB}
                                </WarnContentPill>
                            </WarnContentContainer>
                        );
                    })}
                </>
            )}
        </WarnContainer>
    );
}

export default memo(Warn);
