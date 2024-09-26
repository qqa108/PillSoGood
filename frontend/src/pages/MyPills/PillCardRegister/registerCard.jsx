import { useState } from 'react';
import TextInput from '../../../components/TextInput';
import OptionButton from '../../../components/OptionButton'; // 옵션 버튼 컴포넌트가 있다고 가정

export default function RegisterCard() {
  const questions = [
    {
      type: 'date',
      label: '처방날짜 *',
      placeholder: 'yyyy-mm-dd'
    },
    {
      type: 'text',
      label: '카드 별명 *',
      placeholder: '카드별명을 입력하세요'
    },
    {
      type: 'text',
      label: '약국명', 
      placeholder: '약국명을 입력하세요',
    },
    {
      type: 'text',
      label: '진료받은 병원명', 
      placeholder: '처방받은 병원명을 입력하세요',
    },
    {
      type: 'option',
      options: ['없음'],
    },
  ];

  const [surveyAnswers, setSurveyAnswers] = useState(questions.map(() => ({ answer: '' })));

  const handleInputChange = (index, value) => {
    const newAnswers = [...surveyAnswers];
    newAnswers[index] = { answer: value };
    setSurveyAnswers(newAnswers);
  };

  const handleOptionClick = (index, option) => {
    const newAnswers = [...surveyAnswers];
    newAnswers[index] = { answer: option };
    setSurveyAnswers(newAnswers);
  };

  return (
    <>
      {questions.map((question, index) => (
        <div key={index}>
          {question.type === 'text' && (
            <TextInput
              label={question.label}
              placeholder={question.placeholder || ''}
              value={surveyAnswers[index]?.answer || ''}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          )}

          {question.type === 'date' && (
            <TextInput
              label={question.label}
              placeholder={question.placeholder || 'yyyy-mm-dd'}
              value={surveyAnswers[index]?.answer || ''}
              onChange={(e) => handleInputChange(index, e.target.value)}
              isDateInput
            />
          )}

          {question.type === 'option' && (
            <div>
              {question.options.map((option, optionIndex) => (
                <OptionButton
                  key={optionIndex}
                  label={option}
                  onClick={() => handleOptionClick(index, option)}
                  isSelected={surveyAnswers[index]?.answer === option}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
