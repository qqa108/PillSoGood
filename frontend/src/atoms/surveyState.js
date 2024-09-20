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
        { type: 'text', answer: '' },   // Q1: 생년월일
        { type: 'multiple', answer: ['', ''] }, // Q2: 키, 몸무게
        { type: 'option', answer: '' }, // Q3: 임신여부
        { type: 'option', answer: '' }, // Q4: 약물 알러지
    ],
});
