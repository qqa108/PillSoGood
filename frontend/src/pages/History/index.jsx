import styled from 'styled-components';
import colors from '../../assets/colors';
import { useState } from 'react';
import PillsItem from '../../components/PillsItem';
import Modal from '../../components/Modal';
import HistoryDetail from './HistoryDetail';
import { useRecoilValue } from 'recoil';
import { mediListState } from '../../atoms/mediListState';
import { useNavigate } from 'react-router-dom';

const HistoryContainer = styled.div`
    min-height: calc(100vh - 140px);
    display: flex;
    flex-direction: column;
    align-items: center;
    & > *:not(:last-child) {
        margin-bottom: 15px;
    }
    margin-bottom: 60px;
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
    const navigate = useNavigate();
    const goRegister = () => {
        navigate('/mypills/historyReguisterModal');
    };
    const [isModalOpen, setModalOpen] = useState(false);
    const handleOpenModal = (e) => {
        setDetail(e);
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setDetail(null);
        setModalOpen(false);
    };
    const data = useRecoilValue(mediListState);
    const [detail, setDetail] = useState();
    return (
        <>
            <HistoryContainer>
                {data !== null && data.length > 0 ? (
                    data.map((e, i) => {
                        return (
                            <PillsItem
                                type="history"
                                info={e}
                                key={`${e}${i}`}
                                handleOpenModal={() => handleOpenModal(e)}
                            />
                        );
                    })
                ) : (
                    <HistoryWrapper>
                        <Text>등록된 복약 기록이 없습니다.</Text>
                        <Button onClick={goRegister}>복약 기록 불러오기</Button>
                    </HistoryWrapper>
                )}
            </HistoryContainer>
            {isModalOpen && (
                <Modal onClose={handleCloseModal}>
                    <HistoryDetail detailInfo={detail} onClose={handleCloseModal} />
                </Modal>
            )}
        </>
    );
}

export default History;
