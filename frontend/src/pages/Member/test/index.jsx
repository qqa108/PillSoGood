import KakaoLogin from '../../../KaKaoLogin';
import KakaoLogOut from '../../../KakaoLogOut';
import KakaoSignOut from '../../../KaKaoSignOut';

function Test() {
    return (
        <div>
            <div>로그인 기능 테스트 페이지</div>
            <div>
                <KakaoLogin />
                <KakaoLogOut />
                <KakaoSignOut />
            </div>
        </div>
    );
}

export default Test;
