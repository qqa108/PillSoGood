import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { takingMediListState } from '../../atoms/mediListState';
import axios from 'axios';
import { NOTIFICATION } from '../../assets/apis';
import { notificationState } from '../../atoms/notificationState';

function LoadNotification() {
    const myPillList = useRecoilValue(takingMediListState);
    const [notifications, setNotifications] = useRecoilState(notificationState); // 상태 관리

    const fetchNoti = async (medicationId) => {
        const config = {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                RefreshToken: localStorage.getItem('refreshToken'),
            },
        };
        try {
            const response = await axios.get(NOTIFICATION(medicationId), config);
            return response.data; // 알림 데이터 반환
        } catch (error) {
            console.error('알림 요청 오류:', error);
            return null; // 오류 발생 시 null 반환
        }
    };

    useEffect(() => {
        const fetchAllNotifications = async () => {
            if (myPillList.length === 0) return; // 약물이 없으면 종료

            const notificationPromises = myPillList.map((pill) => fetchNoti(pill.id)); // 모든 알림 요청 생성
            const results = await Promise.all(notificationPromises); // 모든 요청 병렬 처리

            // null이 아닌 알림만 필터링
            const validNotifications = results.filter((notification) => notification.alertTimes.length !== 0);
            setNotifications(validNotifications); // 상태 업데이트
        };

        fetchAllNotifications(); // 알림 요청 실행
    }, [myPillList, setNotifications]);

    return null; // 컴포넌트는 UI를 렌더링하지 않음
}

export default LoadNotification;
