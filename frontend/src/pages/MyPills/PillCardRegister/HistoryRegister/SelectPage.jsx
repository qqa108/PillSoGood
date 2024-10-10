import { useState } from 'react';
import { ListItemComponent, ButtonContainer, Title, Description } from './HistoryRegisterComponents';
import LongNextButton from '../../../../components/LongNextButton';
import colors from '../../../../assets/colors';
import { useRecoilValue } from 'recoil';
import { medicationState } from '../../../../atoms/medicationState'; // Recoil 상태에서 데이터를 가져옴

export default function SelectPage({ onNext, setSelectedItems }) {
    // Recoil 상태에서 데이터를 가져옴
    const medicationData = useRecoilValue(medicationState);
    console.log(medicationData);
    // 초기 데이터로 Recoil 상태의 medicationData를 사용
    const [data, setData] = useState(medicationData);
    const [checked, setChecked] = useState(Array(medicationData.length).fill(false));

    const handleCheck = (index) => {
        const newChecked = [...checked];
        newChecked[index] = !newChecked[index];
        setChecked(newChecked);
    };

    const isNextButtonActive = checked.some((isChecked) => isChecked);

    const handleNextClick = () => {
        const selectedItems = data.filter((_, index) => checked[index]);
        onNext(selectedItems); // 선택된 항목을 부모 컴포넌트로 전달
    };

    return (
        <>
            <Title>진료내역</Title>
            <Description>
                복약 기록 혹은 복용 중인 약에 <br></br>
                등록 할 진료 내역을 선택해주세요.
            </Description>

            <div>
                {data.map((item, index) => (
                    <ListItemComponent
                        key={index}
                        item={item}
                        index={index}
                        checked={checked[index]}
                        handleCheck={handleCheck}
                        renderItem={() => (
                            <div>
                                <p>복용시작날짜: {item.intakeAt}</p>
                                <p>복용기간: {item.prescriptionDay}일</p>
                                <p>
                                    처방병원이름: {item.hospitalName !== 'Unknown' ? item.hospitalName : '알 수 없음'}
                                </p>
                                <p>
                                    처방약국이름: {item.pharmacyName !== 'Unknown' ? item.pharmacyName : '알 수 없음'}
                                </p>

                                <h4>복약카드디테일:</h4>
                                {item.userMedicationDetailList.map((medicationDetail, i) => (
                                    <div key={i}>
                                        <p>하루 복용 횟수: {medicationDetail.dailyIntakeFrequency}회</p>
                                        <p>하루 복용량: {medicationDetail.perAmount}정</p>
                                        {/* 여기에서 medicineDTO가 없으므로, medicineId만 출력 */}
                                        <p>약품 ID: {medicationDetail.medicineId}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    />
                ))}
            </div>

            <ButtonContainer>
                <LongNextButton
                    label="가져오기"
                    onClick={handleNextClick}
                    isSelected={isNextButtonActive}
                    bgColor={colors.point1}
                    borderColor={colors.point1}
                    textColor="white"
                    width="100%"
                />
            </ButtonContainer>
        </>
    );
}
