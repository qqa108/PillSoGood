const questions = [
  {
      question: 'Q1. 이름과 관계를 입력해주세요.',
      type: 'multiple',
      fields: [
        { label: '이름', placeholder: '이름을 입력하세요', type: 'text' },
        { label: '관계', placeholder: '관계를 입력하세요', type: 'text' },
      ],
  },
  {
      question: 'Q2. 생년월일을 입력해주세요.',
      type: 'date',
      label: '생년월일',
  },
  {
      question: 'Q3. 키와 몸무게를 입력해주세요.',
      type: 'multiple',
      fields: [
          { label: '키', placeholder: '키를 입력하세요', type: 'number', unit: 'cm', step: '0.01' },
          { label: '몸무게', placeholder: '몸무게를 입력하세요', type: 'number', unit: 'kg', step: '0.01' },
      ],
  },
  {
      question: 'Q4. 임신여부를 입력해주세요.',
      type: 'option',
      options: ['계획없음', '임신 준비중', '임신 중', '수유 중'],
  },
  {
      question: 'Q5. 약물 알러지를 입력해주세요',
      type: 'option',
      options: ['없음'],
  },
];

export default questions;
