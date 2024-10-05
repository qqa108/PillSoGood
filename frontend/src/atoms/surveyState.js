import { atom } from 'recoil';

// 현재 설문 단계 상태 관리
export const currentStepState = atom({
    key: 'currentStepState',
    default: 1, // 첫 번째 단계부터 시작
});

// 각 단계별로 입력한 값과 선택된 옵션 관리
export const surveyAnswersState = atom({
    key: 'surveyAnswersState',
    default: [
        { type:'multiple', answer: ['', ''] }, // Q1: 이름, 관계
        { type: 'text', answer: '' },   // Q2: 생년월일
        { type: 'multiple', answer: ['', ''] }, // Q3: 키, 몸무게
        { type: 'option', answer: '' }, // Q4: 임신여부
        { type: 'option-pill', answer: ['없음'], addedPills: [] }, // Q5: 약물 알러지
    ],
});
