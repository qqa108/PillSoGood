// import React, { useEffect } from 'react';
// import { USERGET } from '../../assets/apis';
// import useAxios from '../../hook/useAxios';
// import SurveyEdit from '../Survey/surveyEdit';
// import { useParams } from 'react-router-dom';

// export default function FamilyDetail() {
//   const { family } = useParams(); // URL에서 가족 이름을 추출
//   const { data, loading, error, fetchData } = useAxios(); // 훅에서 fetchData를 받아옵니다.

//   useEffect(() => {
//     console.log('FamilyDetail 컴포넌트가 마운트되었습니다. Family:', family);
//     fetchData(USERGET(family), 'GET'); // family 파라미터로 API 호출
//   }, [family]); // family가 변경될 때마다 데이터를 다시 불러옵니다.

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <SurveyEdit data={data} loading={loading} error={error} />
//   );
// }
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
    }, [decodedFamily, location.state]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return <SurveyUpdate data={data} />;
}

export default FamilyDetail