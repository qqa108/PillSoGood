import { createBrowserRouter } from 'react-router-dom';
import App from './App'; // App 컴포넌트 import
import MyPills from './pages/MyPills';
import Notification from './pages/Notification';
import Home from './pages/Home';
import History from './pages/History';
import Profile from './pages/Profile';
import Survey from './pages/Survey/survey';
import SurveyEdit from './pages/Survey/surveyEdit';
import Login from './pages/Member/Login';
import Member from './pages/Member';
import Join from './pages/Member/Join';
import PhotoGuide from './pages/MyPills/PillCardRegister/PhotoRegister/PhotoGuide';
import HistoryRegisterModal from './pages/MyPills/PillCardRegister/HistoryRegister/HistoryRegisterModal';
import HistoryRegister from './pages/MyPills/PillCardRegister/HistoryRegister/HistoryRegister';
import RegisterCard from './pages/MyPills/PillCardRegister/RegisterCard';
import RegisterPill from './pages/Search/searchForRegister';
import DrugSearch from './pages/Search/searchforAll';
import Test from './pages/Member/test';
import Compare from './pages/Compare';
import DrugDetail from './pages/Search/DrugDetail';
import FamilyDetail from './pages/Profile/familyDetail';
import HistoryRequest from './pages/MyPills/PillCardRegister/HistoryRegister/HistoryRequest';
import Logout from './pages/Member/Logout';
import Signout from './pages/Member/Signout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
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
                        path: 'historyRegister',
                        element: <HistoryRegister />,
                    },
                    {
                        path: 'historyRequest',
                        element: <HistoryRequest />,
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
                children: [
                    {
                        path: ':family',
                        element: <FamilyDetail />,
                    },
                ],
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
                path: 'search/register', // 수정된 부분
                element: <RegisterPill />,
            },
            {
                path: 'search',
                element: <DrugSearch />,
            },
            {
                path: 'search/medicine/:id',
                element: <DrugDetail />,
            },
            {
                path: 'home/compare',
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
            {
                path: 'logout',
                element: <Logout />,
            },
            {
                path: 'signout',
                element: <Signout />,
            },
        ],
    },
]);
export default router;
