import { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../assets/colors';
import { RiDeleteBin6Fill } from 'react-icons/ri';

const FormContainer = styled.div`
    & > div {
        margin-bottom: 10px;
    }
`;

const Title = styled.div`
    font-size: 1.75rem;
    text-align: center;
    margin-bottom: 30px !important;
    font-weight: 700;
`;

const Item = styled.div`
    font-weight: 700;
    font-size: 1.25rem;
`;

const Name = styled.div`
    padding: 5px 10px;
    border: 1px solid black;
    border-radius: 4px;
    box-sizing: border-box;
    font-weight: 700;
    font-size: 1.25rem;
    height: 45px;
    align-items: center;
    display: flex;
`;

const PeriodWrapper = styled.div`
    display: flex;
    align-items: center;
    & > span {
        margin: 0px 5px;
        font-size: 1.25rem;
    }
`;

const PeriodInput = styled.input.attrs({ type: 'date' })`
    border-radius: 6px;
    font-size: 1rem;
    border: 1px solid black;
    height: 30px;
    padding: 5px;
    font-weight: 700;
    flex-grow: 1; /* 가용 공간을 차지하도록 설정 */
`;

const PerTimeWarpper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-weight: 700;
    color: ${colors.main};
    font-size: 1.5rem;
`;

const PerTimeButton = styled.div``;

const PerTime = styled.div``;

const NotiTimeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    & > div {
        margin-bottom: 10px;
    }
`;

const NotiTime = styled.div`
    display: flex;
    border: 1px solid ${colors.disableText};
    border-radius: 4px;
    height: 40px;
    padding: 5px 10px;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;
    & > input {
        font-weight: 700;
        font-size: 1.25rem;
        border: none;
    }

    & > svg {
        font-weight: 700;
        font-size: 1.5rem;
        cursor: pointer; /* 커서 변경 */
    }
`;

const Register = styled.div`
    padding: 10px 0px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colors.point1};
    border: 2px solid ${colors.point1};
    border-radius: 6px;
    font-size: 1.5rem;
    font-weight: 700;
    cursor: pointer; /* 클릭 가능하게 변경 */
`;

function NotificationForm({ info, fetchNoti }) {
    console.log(info);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [frequency, setFrequency] = useState(3);
    const [notiTimes, setNotiTimes] = useState(Array(frequency).fill('')); // 알림 시간 배열

    useEffect(() => {
        if (info) {
            const intakeDate = new Date(info.intakeAt);
            const koreanTime = new Date(intakeDate.getTime() + 9 * 60 * 60 * 1000);
            setStartDate(koreanTime.toISOString().split('T')[0]);

            const endDateCalc = new Date(koreanTime);
            endDateCalc.setDate(koreanTime.getDate() + info.prescriptionDay - 1);
            setEndDate(endDateCalc.toISOString().split('T')[0]);
        }
    }, [info]);

    const handleStartDateChange = (e) => {
        const newStartDate = e.target.value;
        if (newStartDate > endDate) {
            alert('복용 시작 날은 복용 마지막 날보다 늦을 수 없습니다.');
        } else {
            setStartDate(newStartDate);
        }
    };

    const handleEndDateChange = (e) => {
        const newEndDate = e.target.value;
        if (newEndDate < startDate) {
            alert('복용 마지막 날은 복용 시작 날보다 빠를 수 없습니다.');
        } else {
            setEndDate(newEndDate);
        }
    };

    const handleFrequencyChange = (newFrequency) => {
        const currentNotiTimes = [...notiTimes];

        if (newFrequency > frequency) {
            // 빈 알림 시간 추가
            const additionalNotiTimes = Array(newFrequency - frequency).fill('');
            setNotiTimes([...currentNotiTimes, ...additionalNotiTimes]);
        } else {
            // 마지막 알림 시간 제거
            setNotiTimes(currentNotiTimes.slice(0, newFrequency));
        }

        setFrequency(newFrequency);
    };

    const handleDeleteTime = (index) => {
        const newNotiTimes = notiTimes.filter((_, i) => i !== index); // 해당 인덱스 제거
        setNotiTimes(newNotiTimes);
        handleFrequencyChange(newNotiTimes.length); // frequency도 줄이기
    };

    const handleRegister = () => {
        // 빈 문자열이 있는지 확인
        if (notiTimes.some((time) => time === '')) {
            alert('모든 알림 시간을 설정해야 합니다.'); // 경고 메시지
            return; // 함수 종료
        }

        const notifications = [];
        const start = new Date(startDate);
        const end = new Date(endDate);

        // 설정한 알림 시간 배열을 바탕으로 날짜 반복
        notiTimes.forEach((time) => {
            if (time) {
                // time이 비어있지 않은 경우
                for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                    const notificationTime = new Date(d); // 현재 날짜
                    const [hours, minutes] = time.split(':'); // 시간과 분 분리
                    notificationTime.setHours(hours, minutes, 0); // 알림 시간 설정

                    const utcTime = new Date(notificationTime.getTime());
                    // ISO 문자열에서 날짜와 시간을 잘라내기
                    const formattedTime = utcTime.toISOString().slice(0, 19); // YYYY-MM-DDTHH:mm:ss 형식
                    notifications.push(formattedTime); // 형식화된 문자열 추가
                }
            }
        });
        fetchNoti('on', {
            medicationId: info?.id,
            fcmToken: localStorage.getItem('fcmToken'),
            notificationsTimeList: notifications,
        }).then((e) => {
            window.location.reload(); // 페이지 새로고침
        });
    };

    return (
        <FormContainer>
            <Title>복약 알림 등록</Title>
            <Item>약물 카드 이름</Item>
            <Name>{info?.name}</Name>
            <Item>복용 기간</Item>
            <PeriodWrapper>
                <PeriodInput value={startDate} onChange={handleStartDateChange} />
                <span>~</span>
                <PeriodInput value={endDate} onChange={handleEndDateChange} />
            </PeriodWrapper>
            <Item>1일 투여 횟수</Item>
            <PerTimeWarpper>
                <PerTimeButton
                    onClick={() => {
                        if (frequency > 0) {
                            handleFrequencyChange(frequency - 1);
                        }
                    }}
                >
                    —
                </PerTimeButton>
                <PerTime>{frequency}회</PerTime>
                <PerTimeButton
                    onClick={() => {
                        if (frequency < 6) {
                            handleFrequencyChange(frequency + 1);
                        }
                    }}
                >
                    +
                </PerTimeButton>
            </PerTimeWarpper>
            <Item>알림 시간</Item>
            <NotiTimeWrapper>
                {notiTimes.map((time, index) => (
                    <NotiTime key={index}>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => {
                                const newNotiTimes = [...notiTimes];
                                newNotiTimes[index] = e.target.value;
                                setNotiTimes(newNotiTimes);
                            }}
                        />
                        <RiDeleteBin6Fill onClick={() => handleDeleteTime(index)} />
                    </NotiTime>
                ))}
            </NotiTimeWrapper>
            <Register onClick={handleRegister}>알림 등록하기</Register>
        </FormContainer>
    );
}

export default NotificationForm;
