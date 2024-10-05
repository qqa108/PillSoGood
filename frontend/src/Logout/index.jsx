import useAxios from '../hook/useAxios';
import { LOGOUT } from '../assets/apis';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Logout() {
    const navigate = useNavigate();
    const { data, loading, error } = useAxios(LOGOUT, 'POST');

    useEffect(() => {
        if (!loading) {
            if (data === '로그아웃 성공') {
                alert('성공적으로 로그아웃 되었습니다.');
                navigate('/member/login');
            } else {
                alert('로그아웃 중 오류가 발생했습니다.');
                navigate(-1);
            }
        }
    }, [loading]);
}

export default Logout;
