import { useParams, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import useAxios from '../../hook/useAxios';
import SurveyEdit from '../Survey/surveyEdit';
import SurveyUpdate from '../Survey/surveyUpdate';
import { USERGET } from '../../assets/apis';

function FamilyDetail() {
    const { family } = useParams(); // URL에서 family 파라미터 추출
    const decodedFamily = decodeURIComponent(family); // 한글 디코딩
    const location = useLocation();
    const { data, loading, error } = useAxios(USERGET(decodedFamily), 'GET');

    useEffect(() => {
        console.log('FamilyDetail 컴포넌트가 마운트되었습니다.');
        console.log('Family 파라미터 (디코딩):', decodedFamily);
        console.log('Navigate로부터 전달된 state:', location.state);
        console.log('family:', family);
        console.log('family에서:', data);
        
        // 데이터가 있으면 출력
        if (data) {
            console.log('family에서 받은 데이터:', data);
        } else {
            console.log('데이터를 불러오는 중입니다...');
        }
    }, [decodedFamily, location.state, data]); 

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    return data ? <SurveyUpdate data={data} /> : <div>데이터가 없습니다.</div>;
}

export default FamilyDetail


