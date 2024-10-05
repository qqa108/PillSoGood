import { useNavigate } from 'react-router-dom';
import KakaoLogin from '../../../KaKaoLogin';
import KakaoSignOut from '../../../KaKaoSignOut';

function Test() {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/logout');
    };
    return (
        <div>
            <div>로그인 기능 테스트 페이지</div>
            <div>
                <KakaoLogin />
                <KakaoSignOut />
                <button onClick={handleLogout}>로그아웃</button>
            </div>
        </div>
    );
}

export default Test;
