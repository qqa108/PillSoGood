import { useState,useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
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
    const location = useLocation();
    const [isChildRoute, setIsChildRoute] = useState(false);

    useEffect(() => {
        setIsChildRoute(location.pathname !== '/mypills'); // 경로가 '/mypills'가 아닌 경우에 true로 설정

        if (location.pathname === '/mypills') {
            localStorage.removeItem('selectedPills'); // 경로가 '/mypills'일 때 로컬 스토리지에서 항목 삭제
            localStorage.removeItem('surveyAnswers'); // 경로가 '/mypills'일 때 로컬 스토리지에서 항목 삭제
            localStorage.removeItem('intakeAt'); // 경로가 '/mypills'일 때 로컬 스토리지에서 항목 삭제
        }
    }, [location.pathname]);

  useEffect(() => {
    // localStorage.removeItem('selectedPills');
    
    // 현재 경로가 부모 경로(`/mypills`)가 아니면 자식 라우트로 간주
    setIsChildRoute(location.pathname !== '/mypills');
  }, [location]);

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
    <>
        {!isChildRoute && (
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
        )}
        <Outlet />
    </>
    );
}

export default MyPills;
