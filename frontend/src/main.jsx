// src/main.js
import ReactDOM from 'react-dom/client';
import GlobalStyle from './assets/GlobalStyle.js';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';
import { RecoilRoot } from 'recoil';

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <GlobalStyle />
        <RecoilRoot>
            <RouterProvider router={router} />
        </RecoilRoot>
    </>
);
