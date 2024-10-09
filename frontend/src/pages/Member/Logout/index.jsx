import { useNavigate } from 'react-router-dom';
import { LOGOUT } from '../../../assets/apis';
import useAxios from '../../../hook/useAxios';

function Logout() {
    const navigate = useNavigate();
    const { data, loading, error } = useAxios(LOGOUT, 'POST');
    if (loading === false) {
        localStorage.clear();
        navigate('/');
    }
    return null;
}

export default Logout;
