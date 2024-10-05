import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useAxios = (url, method, body = null) => {
    const navigator = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (url === undefined || method === undefined) {
            return;
        } // URL이 없으면 요청하지 않음
        // 잠깐 페이지 이동떔에 주석
        // if (!accessToken) {
        //     navigator('/member/login');
        //     return;
        // }
        const fetchData = async () => {
            try {
                setLoading(true);
                const config = {
                    method,
                    url,
                    data: body,
                    headers: {
                        Authorization: localStorage.getItem('accessToken'),
                        RefreshToken: localStorage.getItem('refreshToken'),
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
    }, [url]);

    return { data, loading, error };
};

export default useAxios;
