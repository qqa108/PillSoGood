import { useNavigate } from 'react-router-dom';
import useAxios from '../../../hook/useAxios';
import { SIGNOUT } from '../../../assets/apis';

function Signout() {
    const navigate = useNavigate();
    const { data, loading, error } = useAxios(SIGNOUT, 'DELETE');
    if (loading === false) {
        localStorage.clear();
        navigate('/');
    }
    return null;
}

export default Signout;
