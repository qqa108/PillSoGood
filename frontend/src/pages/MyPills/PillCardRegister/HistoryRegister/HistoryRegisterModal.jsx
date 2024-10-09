import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../../../../components/Modal';
import TextInput from '../../../../components/TextInput';
import colors from '../../../../assets/colors';
import axios from 'axios'; // axios import
import { KAKAO_CERTIFY, MEDICATION } from '../../../../assets/apis';
import { medicationState } from '../../../../atoms/medicationState';
import { useRecoilState } from 'recoil';

const Dropdown = styled.select`
    height: 2.75rem;
    margin-top: 1rem;
    border-radius: 6px;
    border: 0.03125rem solid #a9a9a9;
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
        background-color: #f0f0f0;
    }
`;

const Label = styled.div`
    margin-top: 0.8rem;
    color: #000;
    font-size: 1rem;
`;

const Loader = styled.div`
    width: 50px;
    padding: 8px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #25b09b;
    --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
    mask: var(--_m);
    -webkit-mask-composite: source-out;
    mask-composite: subtract;
    animation: l3 1s infinite linear;
    @keyframes l3 {
        to {
            transform: rotate(1turn);
        }
    }
`;

export default function HistoryRegisterModal() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [formData, setFormData] = useState({
        LOGINOPTION: '0',
        JUMIN: '',
        USERNAME: '',
        HPNUMBER: '',
        TELECOMGUBUN: '3',
        DETAILPARSE: 3,
        CHILDPARSE: null,
    });
    const [callbackId, setCallbackId] = useState(null);
    const [medicationRecoilState, setMedicationState] = useRecoilState(medicationState);
    const [medicationData, setMedicationData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const handleInputChange = (e, fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value !== undefined ? value : e.target.value,
        });
    };

    const handleTelecomChange = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            TELECOMGUBUN: value,
        });
    };

    const autoHyphen1 = (e) => {
        const target = e.target;
        const formattedPhone = target.value
            .replace(/[^0-9]/g, '')
            .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
            .replace(/(-{1,2})$/g, '');

        setFormData({
            ...formData,
            HPNUMBER: formattedPhone,
        });
    };

    const isFormValid = () => {
        return formData.JUMIN.trim() !== '' && formData.USERNAME.trim() !== '' && formData.HPNUMBER.trim() !== '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        if (isFormValid()) {
            try {
                const requestData = {
                    LOGINOPTION: formData.LOGINOPTION,
                    JUMIN: formData.JUMIN,
                    USERNAME: formData.USERNAME,
                    HPNUMBER: formData.HPNUMBER.replace(/-/g, ''),
                    TELECOMGUBUN: formData.TELECOMGUBUN,
                    DETAILPARSE: formData.DETAILPARSE,
                    CHILDPARSE: formData.CHILDPARSE,
                };

                const response = await axios.post(KAKAO_CERTIFY, requestData, {
                    headers: {
                        Authorization: localStorage.getItem('accessToken'),
                        RefreshToken: localStorage.getItem('refreshToken'),
                    },
                });
                console.log(response);
                setData(response.data); // 응답 데이터 저장

                if (response.data) {
                    setCallbackId(response.data);
                    if (confirm('인증을 하시고 확인을 눌러주세요')) {
                        setLoading(true);
                        await handleHistoryRequest(response.data);
                        setLoading(false);
                        setIsModalOpen(false);
                    }
                }
            } catch (error) {
                console.error('API 요청 중 오류:', error);
                setError(error);
                alert('인증에 실패했습니다.');
                setLoading(false);
            }
        } else {
            alert('모든 필드를 채워주세요.');
        }
    };

    const handleHistoryRequest = async (callbackId) => {
        try {
            const requestData = {
                callbackId,
            };

            const historyResponse = await axios.post(MEDICATION, requestData, {
                headers: {
                    Authorization: localStorage.getItem('accessToken'),
                    RefreshToken: localStorage.getItem('refreshToken'),
                },
            });
            setMedicationData(historyResponse.data);
            setMedicationState(historyResponse.data);
            localStorage.setItem('medicationData', JSON.stringify(historyResponse.data));
            alert('설문 응답이 성공적으로 등록되었습니다.');
            navigate('/mypills/historyRegister');
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
                    <TextInput
                        label="이름"
                        value={formData.USERNAME}
                        onChange={(e) => handleInputChange(e, 'USERNAME')}
                        type="text"
                        placeholder="이름을 입력하세요"
                    />
                    <TextInput
                        label="주민번호"
                        value={formData.JUMIN}
                        onChange={(e) => handleInputChange(e, 'JUMIN')}
                        type="text"
                        placeholder="YYYYMMDD"
                    />
                    <Label>통신사</Label>
                    <Dropdown value={formData.TELECOMGUBUN} onChange={handleTelecomChange}>
                        <option value="1">KT</option>
                        <option value="2">SKT</option>
                        <option value="3">LG</option>
                    </Dropdown>
                    <TextInput
                        label="전화번호"
                        value={formData.HPNUMBER}
                        onChange={autoHyphen1}
                        type="tel"
                        placeholder="전화번호를 입력하세요"
                    />
                    <Label>상세 여부</Label>
                    <Dropdown
                        value={formData.DETAILPARSE}
                        onChange={(e) => handleInputChange(e, 'DETAILPARSE', Number(e.target.value))}
                    >
                        <option value={1}>일반</option>
                        <option value={2}>일반 + 상세</option>
                        <option value={3}>일반 + 상세 + 의약품 상세</option>
                    </Dropdown>
                    <ButtonContainer>
                        {isFormValid() ? (
                            <SubmitButton onClick={handleSubmit}>가져오기</SubmitButton>
                        ) : (
                            <DisabledButton disabled>가져오기</DisabledButton>
                        )}
                    </ButtonContainer>
                    {loading && <Loader />}
                    {error && <p>오류: {error.message}</p>}
                    {data && (
                        <div>
                            <h2>응답 결과:</h2>
                            <pre>{JSON.stringify(data, null, 2)}</pre>
                        </div>
                    )}
                    {medicationData && (
                        <div>
                            <h2>진료 내역 (MEDICATION):</h2>
                            <pre>{JSON.stringify(medicationData, null, 2)}</pre>
                        </div>
                    )}
                </Modal>
            )}
        </div>
    );
}
