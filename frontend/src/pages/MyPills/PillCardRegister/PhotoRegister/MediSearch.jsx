// import { DETAILMEDICINE } from "../../../../assets/apis";
// import useAxios from "../../../../hook/useAxios";
// import { selectedPillsState } from "../../../../atoms/selectedPillsState";
// import { useRecoilState } from "recoil";
// import { useEffect } from "react";
// import { useNavigate, useLocation  } from "react-router-dom";

// export default function MediSearch({ medicineId}) {
//       console.log('객체 탐지 후 약 id', medicineId)
//       const { data, loading, error } = useAxios(DETAILMEDICINE(medicineId), 'GET');
//       const [selectedPillsRecoil, setSelectedPillsState] = useRecoilState(selectedPillsState);
//       const location = useLocation();
//       const navigate = useNavigate()


//       useEffect(() => {
//         if (data) { // 데이터가 존재할 때만 실행
//           let updatedPills = [...new Set([...selectedPillsRecoil, data])];
//           setSelectedPillsState(updatedPills);
          
//           navigate('/mypills/registerCard', { state: { selectedItem: 'prevMediphotoState' } });  // 데이터가 있으면 페이지 이동
//         }
//       }, [data, selectedPillsRecoil, setSelectedPillsState, navigate]);

//       return (
//         <>
//           {loading && <div>로딩 중...</div>} {/* 로딩 중 표시 */}
//           {error && <div>오류 발생: {error.message}</div>} {/* 오류 발생 시 표시 */}
          
//           {data && (
//             <div>
//               <h3>선택된 약 목록:</h3>
//               <pre>{JSON.stringify(selectedPillsRecoil, null, 2)}</pre> {/* 상태를 보기 쉽게 표시 */}
//             </div>
//           )}
          
//         </>
//     );
// }
import { DETAILMEDICINE } from "../../../../assets/apis";
import useAxios from "../../../../hook/useAxios";
import { selectedPillsState } from "../../../../atoms/selectedPillsState";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function MediSearch({ medicineId }) {
  console.log('객체 탐지 후 약 id', medicineId);
  
  const { data, loading, error } = useAxios(DETAILMEDICINE(medicineId), 'GET');
  const [selectedPillsRecoil, setSelectedPillsState] = useRecoilState(selectedPillsState);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      // selectedPillsRecoil이 배열인지 확인하고, 배열이 아니면 빈 배열로 처리
      const pillsArray = Array.isArray(selectedPillsRecoil) ? selectedPillsRecoil : [];
      let updatedPills = [...new Set([...pillsArray, data])];
      setSelectedPillsState(updatedPills);
      
      // 데이터가 있으면 페이지 이동
      navigate('/mypills/registerCard', { state: { selectedItem: 'prevMediphotoState' } });
    }
  }, [data, selectedPillsRecoil, setSelectedPillsState, navigate]);

  return (
    <>
      {loading && <div>로딩 중...</div>} {/* 로딩 중 표시 */}
      {error && <div>오류 발생: {error.message}</div>} {/* 오류 발생 시 표시 */}
      
      {data && (
        <div>
          <h3>선택된 약 목록:</h3>
          <pre>{JSON.stringify(selectedPillsRecoil, null, 2)}</pre> {/* 상태를 보기 쉽게 표시 */}
        </div>
      )}
    </>
  );
}