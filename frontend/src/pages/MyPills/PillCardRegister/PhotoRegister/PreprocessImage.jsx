import { useEffect, useState } from 'react';
import OcrRequest from './OcrRequst'; 
import MedicineRequest from './MedicineRequest';

export default function PreprocessImage({ imageSrc, selectedItem }) {
    const [processedImage, setProcessedImage] = useState(null);
    console.log('뭐 선택',selectedItem)
    useEffect(() => {
        const processImage = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const image = new Image();
            image.src = imageSrc;

            image.onload = () => {
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                // 그레이스케일 변환
                for (let i = 0; i < data.length; i += 4) {
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = data[i + 1] = data[i + 2] = avg > 128 ? 255 : 0;
                }

                ctx.putImageData(imageData, 0, 0);
                const processedImage = canvas.toDataURL('image/jpeg');

                setProcessedImage(processedImage); // 전처리 완료된 이미지 설정
                console.log('전처리된 이미지:', processedImage);
            };
        };

        processImage();
    }, [imageSrc]);

    return (
        <div>
            <h1>이미지 전처리 중...</h1>
            {/* 전처리된 이미지가 있으면 OCR 요청 */}
            {/* {processedImage && <OcrRequest originalImage={imageSrc} processedImage={processedImage} />} */}
            {processedImage && (
                <>
                {selectedItem === 'medicine-bag' && (
                    <OcrRequest originalImage={imageSrc} processedImage={processedImage} />
                )}
                {selectedItem === 'medicine' && (
                    <MedicineRequest originalImage={imageSrc} processedImage={processedImage} />
                )}
                </>
            )}
        </div>
    );
}
