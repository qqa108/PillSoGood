import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { MEDICATIONADD } from '../../../assets/apis';
import useAxios from '../../../hook/useAxiosPost';
import TextInput from '../../../components/TextInput';
import AddPillButton_ver1 from '../../../components/AddPillButton_ver1'; // 약 추가 버튼
import colors from '../../../assets/colors';
import LongNextButton from '../../../components/LongNextButton';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { userState } from '../../../atoms/userState';
import { selectedPillsState } from '../../../atoms/selectedPillsState';
import { mediListState } from '../../../atoms/mediListState';

const Title = styled.p`
    margin-bottom: 0.6rem;
`;

const MedicineWrapper = styled.div`
    margin-top: 1.2rem;
`;

const AddPillPhoto = styled(AddPillButton_ver1)`
    margin-top: 1.2rem !important;
`;

const SelectedPillsContainer = styled.div`
    margin-top: 1rem;
`;

const PillsList = styled.div`
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const PillItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 19.375rem;
    padding: 1rem;
    border: 1px solid #d9d9d9;
    border-radius: 0.5rem;
    background-color: #fff;
`;

const PillItemHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const DeleteButton = styled.button`
    background: none;
    border: none;
    color: red;
    cursor: pointer;
    font-size: 0.8rem;
`;

const PillItemBody = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    flex-direction: column;
`;

const LabelText = styled.span`
    align-self: flex-start;
`;

const CounterWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.5rem;
`;

const CounterButton = styled.button`
    background-color: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    margin: 0 1.5rem;
    color: ${colors.point1};
`;

const CounterInput = styled.input`
    width: 7rem;
    height: 1.8rem;
    text-align: center;
    border: 1px solid #d9d9d9;
    border-radius: 0.5rem;
    margin: 0 0.5rem;
`;

const UnitText = styled.span`
    font-size: 1rem;
    color: #888;
`;

const Divider = styled.hr`
    width: 100%;
    border: none;
    border-bottom: 0.06rem solid #d9d9d9;
    margin: 1rem 0;
`;

const NoPillsText = styled.p`
    margin-top: 1rem;
    color: #888;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
`;

export default function RegisterCard() {
    const navigate = useNavigate();
    const userInfo = useRecoilValue(userState);
    const location = useLocation();
    const { data, loading, error, fetchData } = useAxios(MEDICATIONADD, 'POST');
    const [selectedPillsRecoil, setSelectedPillsState] = useRecoilState(selectedPillsState);
    const currentPills = useRecoilValue(selectedPillsState);
    const [mediList, setMediList] = useRecoilState(mediListState);
    const [MediPhotoState, setMediPhotoState] = useState(false);

    const questions = [
        {
            type: 'date',
            label: '처방날짜 *',
            placeholder: 'yyyy-mm-dd',
        },
        {
            type: 'text',
            label: '카드 별명 *',
            placeholder: '카드별명을 입력하세요',
        },
        {
            type: 'text',
            label: '약국명',
            placeholder: '약국명을 입력하세요',
        },
        {
            type: 'text',
            label: '병원명',
            placeholder: '처방받은 병원명을 입력하세요',
        },
    ];

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [surveyAnswers, setSurveyAnswers] = useState(() => {
        const storedAnswers = JSON.parse(localStorage.getItem('surveyAnswers')) || [];
        const intakeAt = storedAnswers[0]?.answer || getTodayDate(); // 오늘 날짜 기본값
        return [
            { answer: intakeAt }, // 처방날짜
            { answer: storedAnswers[1]?.answer || '' }, // 카드 별명
            { answer: storedAnswers[2]?.answer || '' }, // 약국명
            { answer: storedAnswers[3]?.answer || '' }, // 병원명
        ];
    });

    useEffect(() => {
        // surveyAnswers를 로컬 스토리지에 저장
        localStorage.setItem('surveyAnswers', JSON.stringify(surveyAnswers));
    }, [surveyAnswers]);

    console.log('카드 등록 recoil', selectedPillsRecoil);
    // const [selectedPills, setSelectedPills] = useState()
    // setSelectedPills(selectedPillsRecoil)
    const [selectedPills, setSelectedPills] = useState([]);

    useEffect(() => {
        if (selectedPillsRecoil && selectedPillsRecoil.length > 0) {
            const storedPills = selectedPillsRecoil.map((pill) => ({
                id: pill.id,
                name: pill.korName,
                dose: pill.dose && pill.dose !== 'N/A' ? pill.dose : 3, // 1회 투약량 기본값 3
                frequency: pill.frequency && pill.frequency !== 'N/A' ? pill.frequency : 3, // 1일 투여횟수 기본값 3
                days: pill.days && pill.days !== 'N/A' ? pill.days : 3, // 처방 일수 기본값 3
            }));
            setSelectedPills(storedPills); // 추출한 데이터로 상태 업데이트
        }
    }, [selectedPillsRecoil]);

    console.log('새로운 selectedPills', selectedPills);

    // 선택된 약물이 추가될 때 로컬 스토리지와 상태 업데이트
    const handlePillAdd = (pill) => {
        setSelectedPills((prevSelected) => {
            const updatedPills = [...prevSelected, { name: pill.korName, id: pill.id, dose: 3, frequency: 3, days: 3 }];
            localStorage.setItem('selectedPills', JSON.stringify(updatedPills));
            return updatedPills;
        });
    };

    // 선택된 약물 삭제 기능
    const handlePillDelete = (pillToDelete) => {
        setSelectedPills((prevSelected) => {
            const updatedPills = prevSelected.filter((pill) => pill.id !== pillToDelete.id);
            localStorage.setItem('selectedPills', JSON.stringify(updatedPills));
            return updatedPills;
        });
    };

    // 카운터 핸들링 (수동 입력도 가능)
    const handlePillDetailChange = (index, field, value) => {
        const updatedPills = [...selectedPills];
        updatedPills[index][field] = value ? parseInt(value, 10) : 3; // 기본값 3 적용
        setSelectedPills(updatedPills);
        localStorage.setItem('selectedPills', JSON.stringify(updatedPills));
    };

    const handleInputChange = (index, value) => {
        const newAnswers = [...surveyAnswers];
        newAnswers[index] = { answer: value };
        setSurveyAnswers(newAnswers);
    };

    useEffect(() => {
        localStorage.setItem('surveyAnswers', JSON.stringify(surveyAnswers));
    }, [surveyAnswers]);

    const isSubmitDisabled = !(surveyAnswers[0].answer && surveyAnswers[1].answer && selectedPills.length > 0);

    const handleSubmit = async () => {
        if (!isSubmitDisabled) {
            const requestData = {
                userDetailId: userInfo?.userDetailId,
                name: surveyAnswers[1].answer,
                status: 'TAKING',
                // intakeAt: surveyAnswers[0].answer || getTodayDate(), // 복용시작 날짜
                intakeAt: `${surveyAnswers[0].answer}T00:00:00`,
                hospitalName: surveyAnswers[3].answer,
                pharmacyName: surveyAnswers[2].answer,
                prescriptionDay: parseInt(selectedPills[0]?.days) || 3, // 처방 일수 기본값
                userMedicationDetailList: selectedPills.map((pill) => ({
                    dailyIntakeFrequency: parseInt(pill.frequency) || 3, // 1일 투여 횟수 기본값
                    perAmount: parseInt(pill.dose) || 3, // 1회 투약량 기본값
                    // medicineId: pill.name, // 약 id
                    medicineId: pill.id, // 약 id
                })),
            };

            try {
                // API 호출
                await fetchData(MEDICATIONADD, 'POST', requestData);

                // 성공적으로 제출되었을 경우
                alert('약 카드에 성공적으로 등록되었습니다.');
                window.location.replace('/mypills');
            } catch (error) {
                console.error('API 등록 오류:', error);
                alert('약 카드 등록 중 오류가 발생했습니다.');
            }
        }
    };
    const selectedItem = location.state?.selectedItem || '기본';
    useEffect(() => {
        // if (location.state && location.state.selectedItem === 'prevMediphotoState') {
        if (location.state?.selectedItem === 'prevMediphotoState') {
            setMediPhotoState(true); // 조건 만족 시 MediPhotoState를 true로 설정
        }
    }, [location.state]);
    console.log('MediPhotoState', MediPhotoState);
    // console.log('location.state.selectedItem',location.state.selectedItem)

    const handleMediPhotoAdd = () => {
        // navigate('/mypills/photoGuide')
        navigate('/mypills/photoGuide', { state: { selectedItem: 'medicine' } });
    };
    console.log('선택약', selectedPills);
    return (
        <>
            {/* <div>{userInfo?.userDetailId}</div> */}
            {questions.map((question, index) => (
                <div key={index}>
                    {question.type === 'text' && (
                        <TextInput
                            label={question.label}
                            placeholder={question.placeholder || ''}
                            value={surveyAnswers[index]?.answer || ''}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                    )}

                    {question.type === 'date' && (
                        <TextInput
                            label={question.label}
                            placeholder={question.placeholder || 'yyyy-mm-dd'}
                            value={surveyAnswers[index]?.answer || getTodayDate()}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            isDateInput
                        />
                    )}
                </div>
            ))}

            <MedicineWrapper>
                <Title>약 선택</Title>
                <AddPillButton_ver1 text="약 추가" />
                {/* <AddPillButton_ver1 text="약 추가" onClick={() => handlePillAdd('타이레놀')} /> */}
                {MediPhotoState === true && (
                    <AddPillPhoto
                        text="이미지로 약 추가하기"
                        onClick={handleMediPhotoAdd}
                        style={{ margin: '1rem' }}
                    ></AddPillPhoto>
                )}
            </MedicineWrapper>

            <SelectedPillsContainer>
                <Title>선택된 약물 목록</Title>
                {selectedPills.length > 0 ? (
                    <PillsList>
                        {selectedPills.map((pill, index) => (
                            <PillItemContainer key={index}>
                                <PillItemHeader>
                                    {/* {pill.id ? pill.name : pill.name} */}
                                    {pill.name}
                                    <DeleteButton onClick={() => handlePillDelete(pill)}>삭제</DeleteButton>
                                </PillItemHeader>
                                <Divider />
                                <PillItemBody>
                                    <LabelText>처방 일수</LabelText>
                                    <CounterWrapper>
                                        <CounterButton
                                            onClick={() =>
                                                handlePillDetailChange(index, 'days', Math.max(1, pill.days - 1))
                                            }
                                        >
                                            -
                                        </CounterButton>
                                        <CounterInput
                                            type="number"
                                            value={pill.days}
                                            onChange={(e) => handlePillDetailChange(index, 'days', e.target.value)}
                                        />{' '}
                                        <UnitText>일</UnitText>
                                        <CounterButton
                                            onClick={() => handlePillDetailChange(index, 'days', pill.days + 1)}
                                        >
                                            +
                                        </CounterButton>
                                    </CounterWrapper>
                                </PillItemBody>

                                <PillItemBody>
                                    <LabelText>1일 투여횟수</LabelText>
                                    <CounterWrapper>
                                        <CounterButton
                                            onClick={() =>
                                                handlePillDetailChange(
                                                    index,
                                                    'frequency',
                                                    Math.max(1, pill.frequency - 1)
                                                )
                                            }
                                        >
                                            -
                                        </CounterButton>
                                        <CounterInput
                                            type="number"
                                            value={pill.frequency}
                                            onChange={(e) => handlePillDetailChange(index, 'frequency', e.target.value)}
                                        />{' '}
                                        <UnitText>번</UnitText>
                                        <CounterButton
                                            onClick={() =>
                                                handlePillDetailChange(index, 'frequency', pill.frequency + 1)
                                            }
                                        >
                                            +
                                        </CounterButton>
                                    </CounterWrapper>
                                </PillItemBody>

                                <PillItemBody>
                                    <LabelText>1회 투약량</LabelText>
                                    <CounterWrapper>
                                        <CounterButton
                                            onClick={() =>
                                                handlePillDetailChange(index, 'dose', Math.max(1, pill.dose - 1))
                                            }
                                        >
                                            -
                                        </CounterButton>
                                        <CounterInput
                                            type="number"
                                            value={pill.dose}
                                            onChange={(e) => handlePillDetailChange(index, 'dose', e.target.value)}
                                        />{' '}
                                        <UnitText>정</UnitText>
                                        <CounterButton
                                            onClick={() => handlePillDetailChange(index, 'dose', pill.dose + 1)}
                                        >
                                            +
                                        </CounterButton>
                                    </CounterWrapper>
                                </PillItemBody>
                            </PillItemContainer>
                        ))}
                    </PillsList>
                ) : (
                    <NoPillsText>선택된 약물이 없습니다.</NoPillsText>
                )}
            </SelectedPillsContainer>

            <ButtonContainer>
                <LongNextButton label="등록하기" width="100%" onClick={handleSubmit} isSelected={!isSubmitDisabled} />
            </ButtonContainer>
        </>
    );
}
