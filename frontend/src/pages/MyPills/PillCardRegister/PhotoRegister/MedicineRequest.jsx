import React, { useEffect } from 'react';
import { MEDIPHOTO } from '../../../../assets/apis';
import useAxios from '../../../../hook/useAxios';
import { useNavigate } from 'react-router-dom';

export default function MedicineRequest({ imageUrl }) {
  const apiUrl = imageUrl ? MEDIPHOTO(imageUrl) : null;
  const { data, loading, error } = useAxios(apiUrl, 'GET');
  const navigate = useNavigate()

  useEffect(() => {
    if (imageUrl && data) {
      const existingPills = JSON.parse(localStorage.getItem('selectedPills')) || [];
      const newPill = { pillId: data.data.pillId, name: data.data.name };

      const updatedPills = [...existingPills, newPill];
      localStorage.setItem('selectedPills', JSON.stringify(updatedPills));
      localStorage.setItem('MediPhoto',true)
      navigate('/mypills/registerCard')
    }
  }, [data, imageUrl]);

  // 로딩, 에러, 데이터 상태에 따른 렌더링 처리
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (data) return <div>Medicine Data: {JSON.stringify(data)}</div>;

  return <div>Fetching Medicine Data...</div>;

  // const { data: imageUrlData, loading: loadingImageUrl, error: imageUrlError, fetchData: fetchImageUrl } = useAxios();
  // const { data: medicineData, loading: loadingMedicine, error: medicineError, fetchData: fetchMedicineData } = useAxios();
  // const [imageUrl, setImageUrl] = useState(null);

  // useEffect(() => {
  //   // 첫 번째 API 호출: 이미지 URL을 받아오는 API
  //   if (initialRequestUrl) {
  //     fetchImageUrl(initialRequestUrl, 'GET');
  //   }
  // }, [initialRequestUrl, fetchImageUrl]);

  // useEffect(() => {
  //   // 두 번째 API 호출: 받은 이미지 URL로 MEDIPHOTO API 호출
  //   if (imageUrlData?.url) { // 첫 번째 API에서 받은 URL이 있으면
  //     const apiUrl = MEDIPHOTO(imageUrlData.url); // MEDIPHOTO URL 생성
  //     fetchMedicineData(apiUrl, 'GET'); // 두 번째 API 호출
  //   }
  // }, [imageUrlData, fetchMedicineData]);

  // // 로딩 및 에러 처리
  // if (loadingImageUrl || loadingMedicine) return <div>Loading...</div>;
  // if (imageUrlError) return <div>Error fetching image URL: {imageUrlError.message}</div>;
  // if (medicineError) return <div>Error fetching medicine data: {medicineError.message}</div>;

  // // 데이터 렌더링
  // if (medicineData) return <div>Medicine Data: {JSON.stringify(medicineData)}</div>;
  // return <div>Fetching Data...</div>;
}

