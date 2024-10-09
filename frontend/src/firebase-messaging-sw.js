import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: 'AIzaSyCiSAOr9MPmMcq5mgUreuRqqvITF_Re6fA',
    authDomain: 'pillsogood-8c9a7.firebaseapp.com',
    projectId: 'pillsogood-8c9a7',
    storageBucket: 'pillsogood-8c9a7.appspot.com',
    messagingSenderId: '108791580982',
    appId: '1:108791580982:web:77beb80ebfaed1855bcb97',
    measurementId: 'G-ZP6K8LK0V9',
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

async function requestPermission() {
    console.log('권한 요청 중...');

    const permission = await Notification.requestPermission();
    if (permission === 'denied') {
        console.log('알림 권한 허용 안됨');
        return;
    }

    console.log('알림 권한이 허용됨');

    const token = await getToken(messaging, {
        vapidKey: 'BOy_voze9Ytn5oWXIwPV1td5Rx12iS0pK7FoYIbMNgyih3ZFCE2TTXB3KcjJH-j6yKsiSir_dQKQ9gqsZ96Tte0',
    });

    if (token) {
        console.log('token: ', token);
        localStorage.setItem('fcmToken', token);
    } else console.log('Can not get Token');

    onMessage(messaging, (payload) => {
        console.log('메시지가 도착했습니다.', payload);
        // ...
    });
}

requestPermission();
