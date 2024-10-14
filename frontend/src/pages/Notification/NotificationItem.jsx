import styled from 'styled-components';
import colors from '../../assets/colors';
import { memo } from 'react';

const ItemContainer = styled.div`
    width: 100%;
    border: 1.5px solid ${colors.taking};
    border-radius: 6px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
`;

const TopContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    font-weight: 700;
    margin-bottom: 20px;
`;

const Name = styled.div`
    font-size: 1.25rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap; /* 줄 바꿈을 허용 */
    width: 100%;
    /* justify-content: center; */
`;

const Button = styled.div`
    display: flex;
    justify-content: center;
    padding: 5px;
    box-sizing: border-box;
    border: 1.5px solid ${colors.point1};
    color: ${colors.point1};
    width: 30%;
    height: 30px;
    font-weight: 700;
    border-radius: 6px;
    margin-bottom: 10px;
    margin-right: auto;
`;

function NotificationItem({ notificationInfo }) {
    const convertAndFormatTimes = (alertTimes) => {
        const uniqueTimes = new Set(); // Set을 사용하여 고유한 시간 저장

        alertTimes.forEach((time) => {
            // UTC 시간을 한국 시간으로 변환 (UTC+9)
            const date = new Date(time);
            const koreanTime = new Date(date.getTime() + 9 * 60 * 60 * 1000); // 9시간 더하기

            // 시간과 분만 추출
            const hours = String(koreanTime.getHours()).padStart(2, '0'); // 2자리로 포맷
            const minutes = String(koreanTime.getMinutes()).padStart(2, '0'); // 2자리로 포맷

            // HH:MM 형식으로 저장
            uniqueTimes.add(`${hours}:${minutes}`);
        });

        return Array.from(uniqueTimes); // Set을 배열로 변환하여 반환
    };

    const formattedTimes = convertAndFormatTimes(notificationInfo.alertTimes);

    return (
        <ItemContainer>
            <TopContainer>
                <Name>
                    {notificationInfo.name} ({notificationInfo.prescriptionDay}일분)
                </Name>
            </TopContainer>
            <ButtonContainer>
                {formattedTimes.map((e) => (
                    <Button key={e}>{e}</Button>
                ))}
            </ButtonContainer>
        </ItemContainer>
    );
}

export default memo(NotificationItem, (prevProps, nextProps) => {
    return prevProps.notificationInfo === nextProps.notificationInfo;
});
