import { createBrowserRouter } from 'react-router-dom';
import App from './App'; // App 컴포넌트 import
import MyPills from './pages/MyPills';
import Notification from './pages/Notification';
import Home from './pages/Home';
import History from './pages/History';
import Profile from './pages/Profile';
import Survey from './pages/Survey/survey';
import SurveyEdit from './pages/Survey/surveyEdit';
import Login from './pages/member/Login';
import Member from './pages/Member';
import Join from './pages/member/Join';
import PhotoGuide from './pages/MyPills/PillCardRegister/photoRegister/photoGuide';
import HistoryRegisterModal from './pages/MyPills/PillCardRegister/historyRegister/historyRegisterModal';
import HistoryRegister from './pages/MyPills/PillCardRegister/historyRegister/historyRegister';
import RegisterCard from './pages/MyPills/PillCardRegister/registerCard';
import RegisterPill from './pages/Search/searchForRegister';
import DrugSearch from './pages/Search/searchforAll';
import Test from './pages/Member/test';
import Compare from './pages/Compare';
import DrugDetail from './pages/Search/DrugDetail';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />, // App 컴포넌트를 라우터의 루트 요소로 설정
        children: [
            {
                path: 'mypills',
                element: <MyPills />,
                children: [
                    {
                        path: 'photoGuide',
                        element: <PhotoGuide />,
                    },
                    {
                        path: 'historyReguisterModal',
                        element: <HistoryRegisterModal />,
                    },
                    {
                        path: 'historyReguister',
                        element: <HistoryRegister />,
                    },
                    {
                        path: 'registerCard',
                        element: <RegisterCard />,
                    },
                ],
            },
            {
                path: 'notification',
                element: <Notification />,
            },
            {
                path: 'home',
                element: <Home />,
            },
            {
                path: 'history',
                element: <History />,
            },
            {
                path: 'profile',
                element: <Profile />,
            },
            {
                path: 'survey',
                element: <Survey />,
            },
            {
                path: 'surveyEdit',
                element: <SurveyEdit />,
            },
            {
                path: '/search/register',
                element: <RegisterPill />,
            },
            {
                path: '/search',
                element: <DrugSearch />,
                children: [
                    {
                        path: '/medicine/:id',
                        element: <DrugDetail />,
                    },
                ],
            },
            {
                path: '/home/compare',
                element: <Compare />,
            },
        ],
    },

    {
        path: '/member',
        element: <Member />,
        children: [
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'join',
                element: <Join />,
            },
            {
                path: 'test',
                element: <Test />,
            },
        ],
    },
]);

export default router;
