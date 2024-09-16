function KakaoSignOut() {
    function unlinkApp() {
        window.Kakao.API.request({
            url: '/v1/user/unlink',
        })
            .then(function (res) {
                alert('success: ' + JSON.stringify(res));
                deleteCookie();
            })
            .catch(function (err) {
                alert('fail: ' + JSON.stringify(err));
            });
    }

    // 아래는 데모를 위한 UI 코드입니다.
    function deleteCookie() {
        document.cookie = 'authorize-access-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    return <button onClick={unlinkApp}>앱탈퇴</button>;
}
export default KakaoSignOut;
