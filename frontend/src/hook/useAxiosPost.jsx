import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');

const useAxios = () => {
    const navigate = useNavigate(); // 페이지 이동용 훅
    const [data, setData] = useState(null); // 응답 데이터 상태
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    const fetchData = async (url, method, body = null) => {
        try {
            setLoading(true); // 로딩 시작
            const config = {
                method,
                url,
                data: body,
                headers: {
                    Authorization: `${accessToken}`,
                    RefreshToken: `${refreshToken}`,
                },
            };

            const response = await axios(config); // API 요청
            setData(response.data); // 응답 데이터 저장
        } catch (err) {
            setError(err); // 에러 저장
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    return { data, loading, error, fetchData }; // fetchData 함수 반환
};

export default useAxios;
