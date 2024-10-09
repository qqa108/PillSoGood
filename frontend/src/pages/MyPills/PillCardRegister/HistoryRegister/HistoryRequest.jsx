// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import useAxios from '../../../../hook/useAxiosPost'; // useAxios 훅 import
// import { MEDICATION } from '../../../../assets/apis'; // MEDICATION API 엔드포인트 import
// import { medication } from '../../../../atoms/medication'; // Recoil 상태 import (medication 사용)
// import { useRecoilState } from 'recoil'; // Recoil 훅

// const HistoryRequest = ({ callbackId }) => { // callbackId를 props로 받아옴
//   const navigate = useNavigate(); // 페이지 이동용 훅
//   const { data, loading, error, fetchData } = useAxios(MEDICATION, 'POST'); // POST 요청 설정
//   const [medicationState, setMedication] = useRecoilState(medication); // Recoil 상태 (medication 사용)

//   const handleSubmit = async () => {
//     if (!callbackId) {
//       alert('카카오 인증이 완료되지 않았습니다. 인증을 먼저 완료해주세요.');
//       return;
//     }

//     try {
//       const requestData = {
//         callbackId, 
//       };

//       console.log('콜백 ID:', callbackId);

//       // API 호출
//       await fetchData(MEDICATION, 'POST', requestData);

//       // 응답 데이터를 recoil 상태와 로컬 스토리지에 저장
//       if (data) {
//         console.log('응답 데이터:', data);
//         setMedication(data); // Recoil 전역 상태에 저장
//         localStorage.setItem('medicationData', JSON.stringify(data)); // 로컬 스토리지에 저장
//       }

//       // 요청이 성공적으로 완료되면 알림 표시 및 페이지 이동
//       alert('설문 응답이 성공적으로 등록되었습니다.');
//       navigate('/mypills/historyRegister'); // 페이지 이동
//     } catch (error) {
//       console.error('API 등록 오류:', error);
//       alert('설문 응답 등록 중 오류가 발생했습니다.');
//     }
//   };

//   // 화면에 응답 데이터 출력
//   useEffect(() => {
//     if (data) {
//       console.log('응답 데이터:', data); // 콘솔에 출력
//     }
//   }, [data]);

//   return (
//     <div>
//       <h1>Submit Survey</h1>
//       <button onClick={handleSubmit} disabled={!callbackId}>설문 제출</button> {/* 인증 완료 후만 제출 가능 */}

//       {/* 로딩 상태 표시 */}
//       {loading && <p>Loading...</p>}

//       {/* 에러 발생 시 표시 */}
//       {error && <p>Error: {error.message}</p>}

//       {/* 응답 데이터가 있을 경우 화면에 출력 */}
//       {data && (
//         <div>
//           <h2>응답 결과:</h2>
//           <pre>{JSON.stringify(data, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HistoryRequest;

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxios from '../../../../hook/useAxiosPost'; 
import { MEDICATION } from '../../../../assets/apis'; 
import { medicationState } from '../../../../atoms/medicationState'; 
import { useRecoilState } from 'recoil'; 

const HistoryRequest = () => {
  const navigate = useNavigate(); // 페이지 이동용 훅
  const location = useLocation(); // navigate로 전달된 state에서 callbackId를 받음
  const { callbackId } = location.state || {}; // state에서 callbackId 추출
  const { data, loading, error, fetchData } = useAxios(MEDICATION, 'POST'); // POST 요청 설정
  const [medicationState, setMedication] = useRecoilState(medicationState); // Recoil 상태 (medication 사용)

  // callbackId 값 확인용 useEffect 추가
  useEffect(() => {
    console.log('Received callbackId in HistoryRequest:', callbackId); // callbackId가 전달되었는지 확인
  }, [callbackId]);

  const handleSubmit = async () => {
    if (!callbackId) {
      alert('카카오 인증이 완료되지 않았습니다. 인증을 먼저 완료해주세요.');
      return;
    }

    try {
      const requestData = {
        callbackId, 
      };

      console.log('콜백 ID:', callbackId);

      // API 호출
      await fetchData(MEDICATION, 'POST', requestData);

      // 응답 데이터를 recoil 상태와 로컬 스토리지에 저장
      if (data) {
        console.log('응답 데이터:', data);
        setMedication(data); // Recoil 전역 상태에 저장
        localStorage.setItem('medicationData', JSON.stringify(data)); // 로컬 스토리지에 저장
      }

      // 요청이 성공적으로 완료되면 알림 표시 및 페이지 이동
      alert('설문 응답이 성공적으로 등록되었습니다.');
      navigate('/mypills/historyRegister'); // 페이지 이동
    } catch (error) {
      console.error('API 등록 오류:', error);
      alert('설문 응답 등록 중 오류가 발생했습니다.');
    }
  };

  // 화면에 응답 데이터 출력
  useEffect(() => {
    if (data) {
      console.log('응답 데이터:', data); // 콘솔에 출력
    }
  }, [data]);

  return (
    <div>
      <h1>Submit Survey</h1>
      <button onClick={handleSubmit} disabled={!callbackId}>설문 제출</button> {/* 인증 완료 후만 제출 가능 */}

      {/* 로딩 상태 표시 */}
      {loading && <p>Loading...</p>}

      {/* 에러 발생 시 표시 */}
      {error && <p>Error: {error.message}</p>}

      {/* 응답 데이터가 있을 경우 화면에 출력 */}
      {data && (
        <div>
          <h2>응답 결과:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default HistoryRequest;
