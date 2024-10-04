import { useState } from 'react';
import styled from 'styled-components';
import colors from '../../assets/colors';
import { FaCirclePlus } from 'react-icons/fa6';
import PillCardRegister from './PillCardRegister/RegisterModal';
import PillsItem from '../../components/PillsItem';
import Modal from '../../components/Modal';
import HistoryDetail from '../History/HistoryDetail';

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
    const myPillsList = [
        {
            name: '코로나약',
            date: '2024-09-05',
            pillList: ['타이레놀', '리마드린정', '아토스포정'],
        },
    ];
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const openRegisterModal = () => setIsRegisterModalOpen(true);
    const closeRegisterModal = () => setIsRegisterModalOpen(false);

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const handleOpenModal = () => setIsDetailModalOpen(true);
    const handleCloseModal = () => setIsDetailModalOpen(false);
    return (
        <>
            <PillsItem type="mypliis" item={1} key={1} handleOpenModal={handleOpenModal} />
            <PillsItem type="mypliis" item={1} key={2} handleOpenModal={handleOpenModal} />
            <PillsItem type="mypliis" item={1} key={3} handleOpenModal={handleOpenModal} />
            <PillsItem type="mypliis" item={1} key={4} handleOpenModal={handleOpenModal} />

            <IconContainer alt="Add Icon" onClick={openRegisterModal}>
                <FaCirclePlus />
            </IconContainer>

            <PillCardRegister isModalOpen={isRegisterModalOpen} closeModal={closeRegisterModal} />

            {isDetailModalOpen && (
                <Modal detailInfo={1} onClose={handleCloseModal}>
                    <HistoryDetail />
                </Modal>
            )}
        </>
    );
}

export default MyPills;
