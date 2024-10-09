import styled from 'styled-components';
import colors from '../../assets/colors';
import { FaTrashCan } from 'react-icons/fa6';
import Warn from '../../components/Warn';
import { useState } from 'react';
import Modal from '../../components/Modal';
import CompareMyPills from './CompareMyPills';
import DrugSearch from '../Search/searchforAll';
import RegisterPill from './RegisterPill';

const CompareContainer = styled.div`
    width: 100%;
    height: calc(100vh - 120px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    align-items: center;
`;

const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
    background-color: white;
    font-weight: 700;
    color: ${colors.point1};
    border: 1px solid ${colors.point1};
    border-radius: 6px;
    padding: 5px 5px;
`;

const PillContainer = styled.div`
    width: 100%;
    height: 500px;
    border: 1px solid ${colors.taking};
    background-color: white;
    border-radius: 6px;
    padding: 20px 15px;
    box-sizing: border-box;
    font-weight: 700;
`;

const SelectCount = styled.div`
    margin-bottom: 10px;
`;

const PillWrapper = styled.div`
    padding: 10px 10px;
    display: flex;
    justify-content: space-between;
`;

function Compare() {
    const [pillList, setPillList] = useState([]);
    // setPillList를 사용해서 pillList에 추가되게끔.
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);

    const handleOpenModal = (type) => {
        setModalType(type);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleDeletePill = (index) => {
        const updatedPillList = pillList.filter((_, i) => i !== index);
        setPillList(updatedPillList);
    };
    return (
        <>
            <CompareContainer>
                <ButtonContainer>
                    <ButtonWrapper
                        onClick={() => {
                            handleOpenModal('search');
                        }}
                    >
                        약 검색하기
                    </ButtonWrapper>
                    <ButtonWrapper
                        onClick={() => {
                            handleOpenModal('my');
                        }}
                    >
                        내 약 불러오기
                    </ButtonWrapper>
                </ButtonContainer>
                <PillContainer>
                    <SelectCount>선택된 약물 (총 {pillList.length}건)</SelectCount>
                    {pillList?.map((e, i) => {
                        return (
                            <PillWrapper key={i}>
                                {e.name}
                                <FaTrashCan onClick={() => handleDeletePill(i)} style={{ cursor: 'pointer' }} />
                            </PillWrapper>
                        );
                    })}
                </PillContainer>
                {pillList.length !== 0 ? <Warn pillList={pillList} /> : null}
            </CompareContainer>
            {isModalOpen && (
                <Modal onClose={handleCloseModal}>
                    {modalType === 'search' ? (
                        <div>
                            <RegisterPill setPillList={setPillList} />
                        </div>
                    ) : (
                        <CompareMyPills setPillList={setPillList} onClose={handleCloseModal} />
                    )}
                </Modal>
            )}
        </>
    );
}

export default Compare;
