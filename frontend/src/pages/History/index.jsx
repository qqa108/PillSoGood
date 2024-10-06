import styled from 'styled-components';
import colors from '../../assets/colors';
import { useState } from 'react';
import PillsItem from '../../components/PillsItem';
import Modal from '../../components/Modal';
import HistoryDetail from './HistoryDetail';
import useAxios from '../../hook/useAxios';
import { MYPILLS } from '../../assets/apis';
import LoadMyPill from '../../components/LoadMyPill';
import { useRecoilValue } from 'recoil';
import { mediListState } from '../../atoms/mediListState';

// const data = [1, 2, 3];
const history = [
    {
        date: '2024.09.06',
        hospitalName: '최용훈 이비인후과',
        pillsNickName: '코로나 약 (7일분)',
        pillsList: ['타이레놀', '콘택골드캡슐', '포린정', '그린노즈에스시럽'],
    },
    {
        date: '2024.09.01',
        hospitalName: '한지훈 안과',
        pillsNickName: '눈병 약 (3일분)',
        pillsList: ['안약', '안대', '인공눈물'],
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
    const [isModalOpen, setModalOpen] = useState(false);
    const handleOpenModal = (e) => {
        setDetail(e);
        setModalOpen(true);
    };
    const handleCloseModal = (e) => {
        setDetail(null);
        setModalOpen(false);
    };
    const data = useRecoilValue(mediListState);
    const [detail, setDetail] = useState();
    return (
        <>
            <HistoryContainer>
                <LoadMyPill />
                {data !== null && data.length > 0 ? (
                    data.map((e, i) => {
                        return (
                            <PillsItem
                                type="data"
                                info={e}
                                key={`${e}${i}`}
                                handleOpenModal={() => handleOpenModal(e)}
                            />
                        );
                    })
                ) : (
                    <HistoryWrapper>
                        <Text>등록된 복약 기록이 없습니다.</Text>
                        <Button>복약 기록 불러오기</Button>
                    </HistoryWrapper>
                )}
            </HistoryContainer>
            {isModalOpen && (
                <Modal onClose={handleCloseModal}>
                    <HistoryDetail detailInfo={detail} />
                </Modal>
            )}
        </>
    );
}

export default History;
