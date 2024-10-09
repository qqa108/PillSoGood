import React, { useEffect } from 'react';
import { MEDIPHOTO } from '../../../../assets/apis';
import useAxios from '../../../../hook/useAxiosPost';
import { useNavigate } from 'react-router-dom';

export default function MedicineRequest({ imageUrl }) {
  const { data, loading, error, fetchData} = useAxios()
  const navigate = useNavigate()

  const uploadImage = async (imagePath) => {
    const formData = new FormData()
    try{
      const response = await fetch(imagePath)
      const blob = await response.blob()
      const file = new File([blob], "image.png", {type: blob.type})
      formData.append('file',file);

      await fetchData(MEDIPHOTO,'POST',formData)
    } catch  (error) {
      console.log('이미지 업로드 중 오류 발생', error)
    }
  };

  useEffect(() => {
    if(imageUrl) {
      uploadImage(imageUrl)
    }
  },[imageUrl])

  if (loading) {
    return <div>이미지 업로드 중...</div>;
  }

  // 에러 처리
  if (error) {
    return <div>오류 발생: {error.message}</div>;
  }

  // 업로드 완료 후 데이터 표시
  return (
    <div>
      {data ? (
        <div>
          <h3>이미지 업로드 완료</h3>
          <p>응답 데이터: {JSON.stringify(data)}</p>
        </div>
      ) : (
        <div>업로드할 이미지가 없습니다.</div>
      )}
    </div>
  );
}