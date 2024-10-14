import { useEffect, useState } from 'react';
import { MEDIPHOTO } from '../../../../assets/apis';
import useAxiosPost from '../../../../hook/useAxiosPost';
import useAxios from '../../../../hook/useAxios';
import { useNavigate } from 'react-router-dom';
import { DETAILMEDICINE } from '../../../../assets/apis';
import MediSearch from './MediSearch';

const dataURLtoBlob = (dataUrl) => {
  const byteString = atob(dataUrl.split(',')[1]); // Base64 데이터를 바이너리로 디코딩
  const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0]; // MIME 타입 추출

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString }); // Blob 생성
};

export default function MedicineRequest({ originalImage, processedImage }) {
  const { data, loading, error, fetchData} = useAxiosPost()
  const navigate = useNavigate()
  const [imageUploaded, setImageUploaded] = useState(false); 

  const uploadImage = async (imageDataUrl) => {
    const formData = new FormData();
    try {
      // Base64 인코딩된 이미지 데이터를 Blob으로 변환
      const blob = dataURLtoBlob(imageDataUrl);
      const file = new File([blob], "image.png", { type: "image/png" }); // Blob을 파일로 변환
      formData.append('file', file); // FormData에 파일 추가

      console.log(
        "blob",blob,
        "file",file,
        "formData",formData,
      )

      // FormData의 내용을 출력하는 방법
      for (let pair of formData.entries()) {
        console.log("formData2",pair[0], pair[1]);  // 키와 값 출력
      }

      // API 호출
      await fetchData(MEDIPHOTO, 'POST', formData);
      setImageUploaded(true);
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    console.log('originalImage:', originalImage);

    if (originalImage) {
      console.log('uploadImage called');
      uploadImage(originalImage);  // 캡처된 Base64 PNG 이미지를 업로드
    }
  }, [originalImage]);

  if (loading) {
    return <div>이미지 업로드 중...</div>;
  }

  if (error) {
    return <div>오류 발생: {error.message}</div>;
  }

  return (
    <div>
      {loading && <div>이미지 업로드 중...</div>} 
      {error && <div>오류 발생: {error.message}</div>} 
      {imageUploaded && data && <MediSearch  medicineId={ data} />} 
      
    </div>
  );
}


// import { useEffect, useState } from 'react';
// import { MEDIPHOTO } from '../../../../assets/apis';
// import useAxiosPost from '../../../../hook/useAxiosPost';
// import { useNavigate } from 'react-router-dom';
// import MediSearch from './MediSearch';

// const dataURLtoBlob = (dataUrl) => {
//   const byteString = atob(dataUrl.split(',')[1]); // Base64 데이터를 바이너리로 디코딩
//   const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0]; // MIME 타입 추출

//   const ab = new ArrayBuffer(byteString.length);
//   const ia = new Uint8Array(ab);
//   for (let i = 0; i < byteString.length; i++) {
//     ia[i] = byteString.charCodeAt(i);
//   }

//   return new Blob([ab], { type: mimeString }); // Blob 생성
// };

// export default function MedicineRequest({ originalImage }) {
//   // const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [imageUploaded, setImageUploaded] = useState(false);
//   const navigate = useNavigate();

//   // const fake
//   const data = 2

//   const uploadImage = async (imageDataUrl) => {
//     const formData = new FormData();
//     // try {
//     //   const blob = dataURLtoBlob(imageDataUrl);
//     //   const file = new File([blob], 'image.png', { type: 'image/png' });
//     //   formData.append('file', file);

//     //   // 가짜 API 응답 설정
//     //   console.log('업로드 중...');
//     //   setLoading(true);

//     //   // API 호출 대신, 가짜 응답 데이터를 설정
//     //   setTimeout(() => {
//     //     setData(fakeResponseData); // 가짜 데이터 설정
//     //     setImageUploaded(true);
//     //     setLoading(false);
//     //   }, 1000); // 1초 후에 가짜 응답 설정
//     // } catch (error) {
//     //   console.error('이미지 업로드 중 오류 발생:', error);
//     //   setError(error);
//     // }
//   };

//   useEffect(() => {
//     console.log('originalImage:', originalImage);

//     if (originalImage) {
//       console.log('uploadImage called');
//       uploadImage(originalImage);  // 가짜 이미지 업로드 테스트
//     }
//   }, [originalImage]);

//   if (loading) {
//     return <div>이미지 업로드 중...</div>;
//   }

//   if (error) {
//     return <div>오류 발생: {error.message}</div>;
//   }

//   return (
//     <div>
//       {data && <MediSearch medicineId={data} />} {/* 가짜 응답을 통해 MediSearch로 이동 */}
//     </div>
//   );
// }
