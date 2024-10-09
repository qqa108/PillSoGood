import React, { useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { mediListState } from "@/atoms/mediListState";
import addDrugPlusIcon from "@/assets/adddrugplus.svg";
import eatingDrugIcon from "@/assets/eatingdrug.svg";
import PillCardRegister from "../../MyPills/PillCardRegister/RegisterModal";
import Modal from "@/components/Modal";
import HistoryDetail from "../../History/HistoryDetail";
import colors from "@/assets/colors.jsx";

const DrugSectionTitle = styled.div`
  color: #000;
  font-family: NanumGothic;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 0.5rem;
`;

const DrugListContainer = styled.div`
  width: 100%;
  min-height: 7rem;
  border-radius: 0.375rem;
  border: 1px solid #0550b2;
  background-color: #fff;
  gap: 0.5rem;
  position: relative;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
`;

const DrugWrapper = styled.div`
  margin: auto 0;
`;

const ScrollableDrugList = styled.div`
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  overflow-x: auto;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const NoDrugsText = styled.div`
  margin: 0 0 1rem 1rem;
  color: ${colors.text};
  font-size: 1rem;
  font-weight: 400;
  line-height: normal;
  width: 80%;
`;

const AddDrugButton = styled.button`
  width: 3rem;
  height: 3.25rem;
  border-radius: 3.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0.35rem 0.75rem;
  border: 1px dashed ${colors.point2};
  background-color: white;
  flex-shrink: 0;
`;

const AddDrugIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  position: absolute;
  border: none;
`;

const DrugButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  gap: 0.25rem;
  cursor: pointer;
`;

const DrugButton = styled.button`
  width: 4rem;
  height: 3rem;
  border-radius: 3.125rem;
  background: url(${eatingDrugIcon}) no-repeat center center;
  background-size: contain;
  flex-shrink: 0;
  border: none;
`;

const DrugName = styled.div`
  color: #0550b2;
  text-align: center;
  font-family: NanumGothic;
  font-size: 0.675rem;
  font-weight: 400;
  line-height: normal;
`;

const DrugList = () => {
  const mediListInfo = useRecoilValue(mediListState); // 약물 정보
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // 약 추가 모달 상태
  const [selectedDrug, setSelectedDrug] = useState(null); // 선택된 약 정보 저장

  // 약 클릭 시 모달 열기
  const openDrugDetailModal = (drug) => {
    setSelectedDrug(drug); // 선택한 약 저장
    setIsRegisterModalOpen(false); // 약 추가 모달은 닫고
  };

  // 약 추가 모달 열기
  const openRegisterModal = () => {
    setSelectedDrug(null); // 선택된 약은 없고
    setIsRegisterModalOpen(true); // 약 추가 모달 열기
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedDrug(null); // 선택된 약 초기화
    setIsRegisterModalOpen(false); // 모든 모달 닫기
  };

  return (
    <div>
      <DrugSectionTitle>현재 복용중인 약</DrugSectionTitle>
      <DrugListContainer>
        <DrugWrapper>
          {mediListInfo.length === 0 ? (
            <>
              <NoDrugsText>등록된 약이 없습니다.</NoDrugsText>
              <AddDrugButton onClick={openRegisterModal}>
                <AddDrugIcon src={addDrugPlusIcon} alt="Add drug icon" />
              </AddDrugButton>
            </>
          ) : (
            <ScrollableDrugList>
              {mediListInfo.map((drug, index) => (
                <DrugButtonContainer
                  key={index}
                  onClick={() => openDrugDetailModal(drug)}
                >
                  <DrugButton />
                  <DrugName>{drug.name}</DrugName> {/* 약 이름 출력 */}
                </DrugButtonContainer>
              ))}
              <AddDrugButton onClick={openRegisterModal}>
                <AddDrugIcon src={addDrugPlusIcon} alt="Add drug icon" />
              </AddDrugButton>
            </ScrollableDrugList>
          )}
        </DrugWrapper>
      </DrugListContainer>

      {/* 약 클릭 시 상세 정보 모달 */}
      {selectedDrug && (
        <Modal onClose={closeModal}>
          <HistoryDetail detailInfo={selectedDrug} />
        </Modal>
      )}

      {/* 약 추가 버튼 클릭 시 약 추가 모달 */}
      {isRegisterModalOpen && (
        <PillCardRegister
          isModalOpen={isRegisterModalOpen}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default DrugList;
