import { useState } from 'react';
import styled from 'styled-components';
import colors from '../../assets/colors';
import { FaCirclePlus } from 'react-icons/fa6';
import PillCardRegister from './PillCardRegister/RegisterModal';
import PillsItem from '../../components/PillsItem';
import Modal from '../../components/Modal';
import HistoryDetail from '../History/HistoryDetail';
import Warn from '../../components/Warn';
import { testData } from './testData';

const MyPillContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const IconContainer = styled.div`
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 5rem;
    right: 1.2rem;

    & > svg {
        font-size: 2rem;
        color: ${colors.point2};
    }
`;

function MyPills() {
    // const [myPills, setMyPills] = useState();
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const openRegisterModal = () => setIsRegisterModalOpen(true);
    const closeRegisterModal = () => setIsRegisterModalOpen(false);

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [detail, setDetail] = useState();
    const handleOpenModal = (detailInfo) => {
        setDetail(detailInfo);
        setIsDetailModalOpen(true);
    };
    const handleCloseModal = () => setIsDetailModalOpen(false);
    return (
        <MyPillContainer>
            {testData.map((e, i) => (
                <PillsItem type="mypliis" info={e} key={i} handleOpenModal={() => handleOpenModal(e)} />
            ))}

            {/* <IconContainer alt="Add Icon" onClick={openRegisterModal}>
                <FaCirclePlus />
            </IconContainer> */}

            {/* <PillCardRegister isModalOpen={isRegisterModalOpen} closeModal={closeRegisterModal} /> */}

            {isDetailModalOpen && (
                <Modal onClose={handleCloseModal}>
                    <HistoryDetail detailInfo={detail} />
                </Modal>
            )}
            <Warn />
        </MyPillContainer>
    );
}

export default MyPills;
