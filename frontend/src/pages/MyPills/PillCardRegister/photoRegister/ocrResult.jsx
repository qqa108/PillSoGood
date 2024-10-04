// import { useState, useEffect } from 'react';
// import PhotoGuide from './photoGuide'; // 사진 촬영 컴포넌트
// import PreprocessImage from './preprocessImage'; // 이미지 전처리 컴포넌트
// import OcrRequest from './OcrRequest'; // OCR 요청 및 처리 컴포넌트

// function OcrResult() {
//   const [capturedImage, setCapturedImage] = useState(null); // 사진 촬영 결과
//   const [processedImage, setProcessedImage] = useState(null); // 전처리된 이미지
//   const [ocrResult, setOcrResult] = useState(null); // OCR 결과
//   const [processing, setProcessing] = useState(false); // 처리 중 상태 관리

//   // PhotoGuide에서 이미지 캡처 후 상태 업데이트
//   const handleCapture = (image) => {
//     console.log("OcrResult - 사진 캡처됨:", image); // 캡처된 이미지 콘솔 출력
//     setCapturedImage(image);
//     console.log("Captured image:", image); 
//     setProcessing(true); // 등록 버튼 클릭 시 처리 시작
//   };

//   // PreprocessImage에서 전처리 완료된 이미지 상태 업데이트
//   const handlePreprocess = (processedImage) => {
//     console.log("OcrResult - 이미지 전처리 완료:", processedImage); // 전처리된 이미지 콘솔 출력
//     setProcessedImage(processedImage);
//   };

//   // OcrRequest에서 OCR 결과 상태 업데이트
//   const handleOcrResult = (result) => {
//     console.log("OcrResult - OCR 결과:", result); // OCR 최종 결과 콘솔 출력
//     setOcrResult(result);
//     setProcessing(false); // 처리 완료
//   };

//   // 등록하기 버튼 클릭 시 실행 (전처리 -> OCR 흐름)
//   const handleSubmit = () => {
//     console.log("등록하기 버튼 클릭됨");
//     setProcessing(true); // 처리 시작
//   };

//   useEffect(() => {
//     if (capturedImage) {
//       console.log('result에 이미지 업뎃:', capturedImage);  // capturedImage가 제대로 업데이트되는지 확인
//     }
//   }, [capturedImage]);
//   console.log('result',capturedImage)
//   return (
//     <div>
//       <h1>사진 촬영 및 OCR 결과</h1>

//       {/* 사진 촬영 컴포넌트 */}
//       {/* <PhotoGuide onCapture={handleCapture} /> 여기에서 onCapture 함수 전달 */}
//       <PhotoGuide onCapture={(image) => {
//         console.log("onCapture in OcrResult called");
//         handleCapture(image);
//       }} />
  

//       {/* 등록하기 버튼 (사진이 찍혔을 때만 버튼 노출) */}
//       {capturedImage && !processing && (
//         <button onClick={handleSubmit}>등록하기</button>
//       )}

//       {/* 이미지 전처리 및 OCR 요청 자동 처리 */}
//       {processing && capturedImage && !processedImage && (
//         <PreprocessImage imageSrc={capturedImage} onPreprocess={handlePreprocess} />
//       )}

//       {processedImage && processing && (
//         <OcrRequest
//           originalImage={capturedImage}
//           processedImage={processedImage}
//           onOcrResult={handleOcrResult}
//         />
//       )}

//       {/* OCR 결과 출력 및 콘솔 로그 */}
//       {ocrResult && (
//         <div>
//           <h2>OCR 결과</h2>
//           <pre>{ocrResult}</pre>
//         </div>
//       )}
//     </div>
//   );
// }

// export default OcrResult;

// import { useEffect } from 'react';

// export default function OcrRequest({ image }) {
//   useEffect(() => {
//     if (image) {
//       console.log("OcrRequest 컴포넌트 - 전달받은 이미지:", image);
      
//       // 여기서 handleCapture 또는 handlePreprocess 등의 작업을 실행
//       handleCapture(image);
//     }
//   }, [image]);

//   // handleCapture 작업
//   const handleCapture = (capturedImage) => {
//     console.log("이미지 처리 중:", capturedImage);
//     // 전처리나 OCR 요청 등의 작업 처리
//   };

//   return (
//     <div>
//       <h1>OCR 요청 중...</h1>
//     </div>
//   );
// }
