import { useState, useEffect } from 'react';
import axios from 'axios';

const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');

const useAxios = (url, method, body = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const config = {
                    method,
                    url,
                    data: body,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        RefreshToken: `Bearer ${refreshToken}`,
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
    }, [url, method, body]);

    return { data, loading, error };
};

export default useAxios;
