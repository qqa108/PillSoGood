// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useRecoilState } from 'recoil';
// import { prescriptionState } from '../../../../atoms/prescriptionState'; // 상태 불러오기

// export default function OcrRequest({ originalImage, processedImage }) {
//   const [prescriptionData, setPrescriptionData] = useRecoilState(prescriptionState);
//   const [selectedPills, setSelectedPills] = useState(() => {
//     const storedPills = localStorage.getItem('selectedPills');
//     return storedPills ? JSON.parse(storedPills) : [];
//   });
//   const [isProcessing, setIsProcessing] = useState(false); // OCR 처리가 진행 중인지 여부
//   const navigate = useNavigate(); // 페이지 이동을 위한 네비게이션 훅

//   const api_url = '/api/custom/v1/34348/22e8dd6319c14cdcdcf7a5a207307ae64e0b1679447777ce84f2248b4e5bc02d/general';
//   const secret_key = 'eFJLcGNyVmJIRGtPZUVIbmZ2cktZTG1UV1F2WktpQWQ=';

//   const getImageFormat = (base64Image) => {
//     const match = base64Image.match(/^data:image\/(.*?);base64,/);
//     return match ? match[1] : 'jpg'; // 포맷이 없으면 기본적으로 'jpg'로 설정
//   };

//   const extractNumber = (text) => {
//     const numbers = text.match(/\d+\.?\d*/g);  // 숫자만 추출하는 정규식
//     return numbers ? numbers[0] : null;
//   };

//   const ocrRequest = async (base64Image) => {
//     const format = getImageFormat(base64Image);
//     const requestBody = {
//       images: [
//         {
//           format: format,
//           name: 'medium',
//           data: base64Image.split(',')[1], // Base64 데이터에서 ',' 이후의 실제 데이터 부분만 사용
//         },
//       ],
//       lang: "ko",
//       requestId: `${Date.now()}`,
//       timestamp: Date.now(),
//       version: 'V2',
//     };

//     try {
//       const response = await axios.post(api_url, requestBody, {
//         headers: {
//           'X-OCR-SECRET': secret_key,
//         },
//       });
//       return response.data.images[0].fields.map(field => field.inferText);
//     } catch (error) {
//       console.error('OCR 요청 오류:', error);
//       return [];
//     }
//   };

//   const handleOcrRequest = async () => {
//     const originalResult = await ocrRequest(originalImage);
//     const processedResult = await ocrRequest(processedImage);
//     setIsProcessing(true);

//     const extractedTexts = [...new Set([...originalResult, ...processedResult])];
//     console.log(extractedTexts);

//     let pharmacyName = "N/A";
//     for (let text of extractedTexts) {
//       if (text.includes("약국")) {
//         pharmacyName = text;
//         break;
//       }
//     }

//     let dispensingDate = "N/A";
//     for (let text of extractedTexts) {
//       const dateMatch = text.match(/\d{4}. \d{2}. \d{2}./);
//       if (dateMatch) {
//         dispensingDate = dateMatch[0];
//         break;
//       }
//     }

//     let medicineInfo = [];
//     let currentMedicine = {};
//     let numberBuffer = [];

//     for (let text of extractedTexts) {
//       if (text.includes("정") || text.includes("캡슐") || text.includes("정제")) {
//         if (currentMedicine.name) {
//           if (numberBuffer.length > 0) {
//             currentMedicine['dose'] = numberBuffer[0] || "N/A";
//             currentMedicine['frequency'] = numberBuffer[1] || "N/A";
//             currentMedicine['days'] = numberBuffer[2] || "N/A";
//           }
//           medicineInfo.push(currentMedicine);
//         }
//         currentMedicine = { name: text };
//         numberBuffer = [];
//       } else {
//         const num = extractNumber(text);
//         if (num) numberBuffer.push(num);
//       }
//     }

//     if (currentMedicine.name && numberBuffer.length > 0) {
//       currentMedicine['dose'] = numberBuffer[0] || "N/A";
//       currentMedicine['frequency'] = numberBuffer[1] || "N/A";
//       currentMedicine['days'] = numberBuffer[2] || "N/A";
//       medicineInfo.push(currentMedicine);
//     }

//     setPrescriptionData({
//       pharmacyName: pharmacyName,
//       intakeAt: dispensingDate,
//       medicineInfo: medicineInfo,
//     });

//     setSelectedPills(medicineInfo); // 상태 업데이트
//     localStorage.setItem('selectedPills', JSON.stringify(medicineInfo)); // 로컬 스토리지에 저장

//     setIsProcessing(false);
//     navigate('/mypills/registerCard');
//   };

//   console.log(`${'약 이름'.padEnd(20)}${'용량'.padEnd(10)}${'복약 횟수'.padEnd(10)}${'복약 일수'.padEnd(10)}`);
//     // console.log('-'.repeat(65));
//     selectedPills.forEach((info) => {
//       if (info.name) {
//         console.log(`${(info.name || '').padEnd(20)}${(info.dose || '').padEnd(10)}${(info.frequency || '').padEnd(10)}${(info.days || '').padEnd(10)}`);
//       }
//     });

//   useEffect(() => {
//     handleOcrRequest();
//   }, [originalImage, processedImage]);

//   return <div>OCR 요청 중...</div>;
// }

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function OcrRequest({ originalImage, processedImage }) {
    const [selectedPills, setSelectedPills] = useState(() => {
        const storedPills = localStorage.getItem('selectedPills');
        return storedPills ? JSON.parse(storedPills) : [];
    });
    const [isProcessing, setIsProcessing] = useState(false); // OCR 처리가 진행 중인지 여부
    const navigate = useNavigate(); // 페이지 이동을 위한 네비게이션 훅

    const api_url = '/api/custom/v1/34348/22e8dd6319c14cdcdcf7a5a207307ae64e0b1679447777ce84f2248b4e5bc02d/general';
    const secret_key = 'eFJLcGNyVmJIRGtPZUVIbmZ2cktZTG1UV1F2WktpQWQ=';

    const getImageFormat = (base64Image) => {
        const match = base64Image.match(/^data:image\/(.*?);base64,/);
        return match ? match[1] : 'jpg'; // 포맷이 없으면 기본적으로 'jpg'로 설정
    };

    const extractNumber = (text) => {
        const numbers = text.match(/\d+\.?\d*/g); // 숫자만 추출하는 정규식
        return numbers ? numbers[0] : null;
    };

    const ocrRequest = async (base64Image) => {
        const format = getImageFormat(base64Image);
        const requestBody = {
            images: [
                {
                    format: format,
                    name: 'medium',
                    data: base64Image.split(',')[1], // Base64 데이터에서 ',' 이후의 실제 데이터 부분만 사용
                },
            ],
            lang: 'ko',
            requestId: `${Date.now()}`,
            timestamp: Date.now(),
            version: 'V2',
        };

        try {
            const response = await axios.post(api_url, requestBody, {
                headers: {
                    'X-OCR-SECRET': secret_key,
                },
            });
            return response.data.images[0].fields.map((field) => field.inferText);
        } catch (error) {
            console.error('OCR 요청 오류:', error);
            return [];
        }
    };

    const handleOcrRequest = async () => {
        const originalResult = await ocrRequest(originalImage);
        const processedResult = await ocrRequest(processedImage);
        setIsProcessing(true);

        const extractedTexts = [...new Set([...originalResult, ...processedResult])];
        console.log(extractedTexts);

        let pharmacyName = 'N/A';
        for (let text of extractedTexts) {
            if (text.includes('약국')) {
                pharmacyName = text;
                break;
            }
        }

        let dispensingDate = 'N/A';
        for (let text of extractedTexts) {
            const dateMatch = text.match(/\d{4}. \d{2}. \d{2}./);
            if (dateMatch) {
                dispensingDate = dateMatch[0];
                break;
            }
        }

        let medicineInfo = [];
        let currentMedicine = {};
        let numberBuffer = [];

        for (let text of extractedTexts) {
            if (text.includes('정') || text.includes('캡슐') || text.includes('정제')) {
                if (currentMedicine.name) {
                    if (numberBuffer.length > 0) {
                        currentMedicine['dose'] = numberBuffer[0] || 'N/A';
                        currentMedicine['frequency'] = numberBuffer[1] || 'N/A';
                        currentMedicine['days'] = numberBuffer[2] || 'N/A';
                    }
                    medicineInfo.push(currentMedicine);
                }
                currentMedicine = { name: text };
                numberBuffer = [];
            } else {
                const num = extractNumber(text);
                if (num) numberBuffer.push(num);
            }
        }

        if (currentMedicine.name && numberBuffer.length > 0) {
            currentMedicine['dose'] = numberBuffer[0] || 'N/A';
            currentMedicine['frequency'] = numberBuffer[1] || 'N/A';
            currentMedicine['days'] = numberBuffer[2] || 'N/A';
            medicineInfo.push(currentMedicine);
        }

        // OCR 결과를 로컬 스토리지에 저장
        localStorage.setItem('pharmacyName', pharmacyName);
        localStorage.setItem('intakeAt', dispensingDate);
        setSelectedPills(medicineInfo); // 상태 업데이트
        localStorage.setItem('selectedPills', JSON.stringify(medicineInfo)); // 로컬 스토리지에 저장

        setIsProcessing(false);
        navigate('/mypills/registerCard');
    };

    console.log(`${'약 이름'.padEnd(20)}${'용량'.padEnd(10)}${'복약 횟수'.padEnd(10)}${'복약 일수'.padEnd(10)}`);
    selectedPills.forEach((info) => {
        if (info.name) {
            console.log(
                `${(info.name || '').padEnd(20)}${(info.dose || '').padEnd(10)}${(info.frequency || '').padEnd(10)}${(info.days || '').padEnd(10)}`
            );
        }
    });
    //test
    useEffect(() => {
        handleOcrRequest();
    }, [originalImage, processedImage]);

    return <div>OCR 요청 중...</div>;
}
