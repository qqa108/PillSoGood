import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');

const useAxios = (url, method, body = null) => {
    const navigator = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!accessToken) {
            navigator('/member/login');
            return;
        }
        const fetchData = async () => {
            try {
                setLoading(true);
                const config = {
                    method,
                    url,
                    data: body,
                    headers: {
                        Authorization: accessToken,
                        RefreshToken: refreshToken,
                    },
                };

                const response = await axios(config);
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, method, body, navigator]);

    return { data, loading, error };
};

export default useAxios;
