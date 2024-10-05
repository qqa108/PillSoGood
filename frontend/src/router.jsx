// src/router.js
import { createBrowserRouter } from "react-router-dom";
import App from "./App"; // App 컴포넌트 import
import MyPills from "./pages/MyPills";
import Notification from "./pages/Notification";
import Home from "./pages/Home";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Survey from "./pages/Survey/survey";
import SurveyEdit from "./pages/Survey/surveyEdit";
import Login from "./pages/member/Login";
import Member from "./pages/Member";
import Join from "./pages/member/Join";
import PillCardRegister from "./pages/MyPills/PillCardRegister";
import PhotoGuide from "./pages/MyPills/PillCardRegister/photoGuide";
import RegisterPill from "./pages/Search/searchForRegister";
import DrugSearch from "./pages/Search/searchforAll";
import DrugDetail from "./pages/Search/DrugDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App 컴포넌트를 라우터의 루트 요소로 설정
    children: [
      {
        path: "mypills",
        element: <MyPills />,
      },
      {
        path: "notification",
        element: <Notification />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "survey",
        element: <Survey />,
      },
      {
        path: "surveyEdit",
        element: <SurveyEdit />,
      },
      {
        path: "/search/register",
        element: <RegisterPill />,
      },
      {
        path: "/search",
        element: <DrugSearch />,
      },
      {
        path: "/medicine/:id",
        element: <DrugDetail />,
      },
    ],
  },

  {
    path: "/member",
    element: <Member />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "join",
        element: <Join />,
      },
    ],
  },
  {
    path: "/cardRegister",
    element: <PillCardRegister />,
    children: [
      {
        path: "photoGuide",
        element: <PhotoGuide />,
      },
    ],
  },
]);

export default router;
