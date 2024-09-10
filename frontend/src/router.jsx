// src/router.js
import { createBrowserRouter } from 'react-router-dom';
import App from './App'; // App 컴포넌트 import

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />, // App 컴포넌트를 라우터의 루트 요소로 설정
    },
]);

export default router;
