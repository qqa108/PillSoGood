import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../../../../components/Modal';  
import TextInput from '../../../../components/TextInput';
import colors from '../../../../assets/colors';
import useAxios from '../../../../hook/useAxiosPost'; // useAxios 훅 import
import { KAKAO_CERTIFY, MEDICATION } from '../../../../assets/apis'; // API 엔드포인트 import
import { medication } from '../../../../atoms/medication'; // Recoil 상태 import (medication 사용)
import { useRecoilState } from 'recoil'; // Recoil 훅

const Dropdown = styled.select`
  height: 2.75rem;
  margin-top: 1rem;
  border-radius: 6px;
  border: 0.03125rem solid #A9A9A9;
  padding: 0.625rem;
  font-size: 1rem;
  outline: none;
  background: white;

  &:focus {
    border-color: #000;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${colors.point1};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.point1};
  }
`;

const DisabledButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    background-color: ${colors.point4};  
    color: ${colors.disableText};   
    border: none;
    border-radius: 5px;
    cursor: not-allowed;  

    &:hover {
        background-color:#F0F0F0;  
    }
`;

const Label = styled.div`
    margin-top: 0.8rem;
    color: #000;
    font-size: 1rem;
`;

export default function HistoryRegisterModal() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);  
  const { data, loading, error, fetchData } = useAxios(); // useAxios로 API 호출
  const [formData, setFormData] = useState({
    LOGINOPTION: '0', // 고정
    JUMIN: '',
    USERNAME: '',
    HPNUMBER: '',
    TELECOMGUBUN: '3', // 기본값 설정
    DETAILPARSE: 3, // 기본값 설정
    CHILDPARSE: null, // 고정
  });
  const [callbackId, setCallbackId] = useState(null); // callbackId 상태
  const [medicationState, setMedication] = useRecoilState(medication); // Recoil 상태 (medication 사용)

  // 입력 값 변경 처리 함수
  const handleInputChange = (e, fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value !== undefined ? value : e.target.value, // DETAILPARSE는 숫자, 나머지는 문자열
    });
  };
  
  // 통신사 드롭다운에서 선택 시 값 변환 (1: KT, 2: SKT, 3: LG)
  const handleTelecomChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      TELECOMGUBUN: value, // 선택한 값을 그대로 저장 (1, 2, 3 중 하나)
    });
  };

  // 휴대폰 번호 하이픈 자동 추가
  const autoHyphen1 = (e) => {
    const target = e.target;
    const formattedPhone = target.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(-{1,2})$/g, "");

    setFormData({
      ...formData,
      HPNUMBER: formattedPhone,
    });
  };

  // 모든 필드가 채워졌는지 확인하는 함수
  const isFormValid = () => {
    return formData.JUMIN.trim() !== '' && formData.USERNAME.trim() !== '' && formData.HPNUMBER.trim() !== '';
  };

  // 첫 번째 API 요청 (callbackId 가져오기)
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 동작(페이지 리로드) 방지
    if (isFormValid()) {
      try {
        // API 호출 (KAKAO_CERTIFY로 데이터 전송)
        const requestData = {
          LOGINOPTION: formData.LOGINOPTION,
          JUMIN: formData.JUMIN,
          USERNAME: formData.USERNAME,
          HPNUMBER: formData.HPNUMBER.replace(/-/g, ''), // 하이픈 제거
          TELECOMGUBUN: formData.TELECOMGUBUN,
          DETAILPARSE: formData.DETAILPARSE,
          CHILDPARSE: formData.CHILDPARSE,
        };

        const response = await fetchData(KAKAO_CERTIFY, 'POST', requestData);

        // 인증 완료 시 callbackId 받아오기
        if (response && response.callbackId) {
          setCallbackId(response.callbackId); // callbackId 상태에 저장
          alert('진료내역을 가져오는 인증이 완료되었습니다.');
          
          // HistoryRequest를 내부에서 처리
          await handleHistoryRequest(response.callbackId); 

          setIsModalOpen(false); // 모달 닫기
        }
      } catch (error) {
        console.error('API 요청 중 오류:', error);
        alert('인증에 실패했습니다.');
      }
    } else {
      alert('모든 필드를 채워주세요.');
    }
  };

  // 두 번째 API 요청 (진료내역 조회)
  const handleHistoryRequest = async (callbackId) => {
    try {
      const requestData = {
        callbackId, // 인증 후 받은 callbackId
      };

      const historyResponse = await fetchData(MEDICATION, 'POST', requestData);

      if (historyResponse) {
        console.log('응답 데이터:', historyResponse);
        setMedication(historyResponse); // Recoil 전역 상태에 저장
        localStorage.setItem('medicationData', JSON.stringify(historyResponse)); // 로컬 스토리지에 저장

        // 요청이 성공적으로 완료되면 알림 표시 및 페이지 이동
        alert('설문 응답이 성공적으로 등록되었습니다.');
        navigate('/mypills/historyRegister'); // 페이지 이동
      }
    } catch (error) {
      console.error('진료내역 조회 중 오류:', error);
      alert('진료내역 조회 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
        <style>
            {`
              svg { 
                display: none !important; 
              }
            `}
          </style>
          <h2>진료내역을 가져오기 위한 정보를 입력해주세요</h2>

          {/* 사용자 이름 입력 */}
          <TextInput
            label="이름"
            value={formData.USERNAME}
            onChange={(e) => handleInputChange(e, 'USERNAME')}
            type="text"
            placeholder="이름을 입력하세요"
          />

          {/* 주민번호 입력 */}
          <TextInput
            label="주민번호"
            value={formData.JUMIN}
            onChange={(e) => handleInputChange(e, 'JUMIN')}
            type="text"
            placeholder="YYYYMMDD"
          />

          {/* 통신사 선택 */}
          <Label>통신사</Label>
          <Dropdown
            value={formData.TELECOMGUBUN}
            onChange={handleTelecomChange}
          >
            <option value="1">KT</option>
            <option value="2">SKT</option>
            <option value="3">LG</option>
          </Dropdown>

          {/* 전화번호 입력 */}
          <TextInput
            label="전화번호"
            value={formData.HPNUMBER}
            onChange={autoHyphen1}
            type="tel"
            placeholder="전화번호를 입력하세요"
          />

          {/* 상세 여부 선택 */}
          <Label>상세 여부</Label>
          <Dropdown
            value={formData.DETAILPARSE}
            onChange={(e) => handleInputChange(e, 'DETAILPARSE', Number(e.target.value))} // 숫자로 변환하여 설정
          >
            <option value={1}>일반</option>
            <option value={2}>일반 + 상세</option>
            <option value={3}>일반 + 상세 + 의약품 상세</option>
          </Dropdown>

          {/* 제출 버튼 */}
          <ButtonContainer>
            {isFormValid() ? (
              <SubmitButton onClick={handleSubmit}>가져오기</SubmitButton>
            ) : (
              <DisabledButton disabled>가져오기</DisabledButton>
            )}
          </ButtonContainer>

          {/* 로딩 상태 표시 */}
          {loading && <p>로딩 중...</p>}
          
          {/* 에러 발생 시 표시 */}
          {error && <p>오류: {error.message}</p>}

          {/* 응답 데이터 표시 */}
          {data && (
            <div>
              <h2>응답 결과:</h2>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
