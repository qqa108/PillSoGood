import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import TextInput from '../../../components/TextInput';
import OptionButton from '../../../components/OptionButton';
import AddPillButton_ver1 from '../../../components/AddPillButton_ver1';
import { IoClose } from 'react-icons/io5';
// import { surveyAnswersState } from '../../atoms/surveyState';
// import { useRecoilState } from 'recoil';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { userState } from '../../../atoms/userState';
import { selectedPillsState } from '../../../atoms/selectedPillsState';


const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.8rem;
  margin-top: 1rem;
  width: 100%;
  max-width: 400px;
`;

const StyledTextInputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const AddPillButtonContainer = styled.div`
  margin-top: 1rem;
`;

const SelectedPillsList = styled.div`
    width:100%;
    margin-top: 1rem;
    padding: 10px 0 ;
    /* border: 1px solid #ddd; */
    border-radius: 5px;
    /* margin-bottom: 1rem; */
`;

const PillItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
  /* margin: 0.4rem 1rem; */
  margin-bottom: 0.5rem;
  height: 1.8rem;
`;

const PillText = styled.span`
  text-align: left;
`;

const CloseButton = styled(IoClose)`
  cursor: pointer;
  color: gray;
`;


const QuestionRender = ({ currentQuestion, surveyAnswers, handleInputChange, handleOptionClick, currentStep, selectedPills,setSurveyAnswers }) => {
  // const [surveyAnswers, setSurveyAnswers] = useRecoilState(surveyAnswersState);
  const [selectedPillsRecoil, setSelectedPillsState] = useRecoilState(selectedPillsState);

  const handleRemovePill = (pillToRemove) => {
    setSurveyAnswers((prev) => ({
      ...prev,
      allergies: prev.allergies.filter((pill) => pill !== pillToRemove), // 약물 제거
    }));
  };

  const handleNoneSelected = () => {
    setSurveyAnswers({ ...surveyAnswers, allergies: [] });
    console.log('알러지 약물이 "없음"으로 초기화됨');  
  };
  
  return (
    <>
      {/* {currentQuestion.type === 'text' ? ( */}
      {surveyAnswers[currentStep - 1] && currentQuestion.type === 'text' ? (
        <StyledTextInputContainer>
          <TextInput
            label={currentQuestion.label}
            placeholder="입력해주세요"
            value={surveyAnswers[currentStep - 1]?.answer || ''}
            onChange={handleInputChange}
          />
        </StyledTextInputContainer>
      ) : currentQuestion.type === 'date' ? (
        <StyledTextInputContainer>
          <TextInput
            label={currentQuestion.label}
            placeholder="yyyy-mm-dd"
            value={surveyAnswers[currentStep - 1]?.answer || ''}
            onChange={handleInputChange}
            isDateInput
          />
        </StyledTextInputContainer>
      ) : currentQuestion.type === 'multiple' ? (
        currentQuestion.fields.map((field, index) => (
          <StyledTextInputContainer key={index}>
            <TextInput
              label={field.label}
              placeholder={field.placeholder}
              value={surveyAnswers[currentStep - 1]?.answer[index] || ''}
              onChange={(e) => handleInputChange(e, index)}
              type={field.type}
              unit={field.unit}
              step={field.step}
            />
          </StyledTextInputContainer>
        ))
      ) : currentQuestion.type === 'option-pill' ? (
        <div>
          {/* 옵션 표시 */}
          <ButtonContainer>
            {currentQuestion.options.map((option, index) => (
              // <OptionButton
              //   key={index}
              //   label={option}
              //   onClick={() => handleOptionClick(option)}
              //   isSelected={surveyAnswers[currentStep - 1]?.answer === option}
              // />
              <OptionButton
                key={index}
                label={option}
                isSelected={surveyAnswers[currentStep - 1]?.answer === option}
                // isSelected={!surveyAnswers.allergies || surveyAnswers.allergies.length === 0}
                onClick={handleNoneSelected}
              />
            ))}
          </ButtonContainer>

          {/* 약물 추가 버튼 */}
          <AddPillButtonContainer>
            <AddPillButton_ver1 text="알러지 약물 추가" />
          </AddPillButtonContainer>

          {/* 선택된 약물 목록 표시 */}
          <SelectedPillsList>
              {surveyAnswers.allergies && surveyAnswers.allergies.length > 0 ? (
            surveyAnswers.allergies.map((pill, index) => (
              <PillItem key={index}>
                <PillText>{surveyAnswers.allergies[index].korName}</PillText>
                <CloseButton onClick={() => handleRemovePill(pill)} />
              </PillItem>
            ))
          ) : (
            <p>선택된 약물이 없습니다.</p>
          )}
            {/* {selectedPills.length > 0 ? (
              selectedPills.map((pill, index) => <PillItem key={index}>{pill}</PillItem>)
            ) : (
              <p>선택된 약물이 없습니다.</p>
            )} */}
          </SelectedPillsList>
        </div>
      ) : currentQuestion.type === 'option' ? (
          <ButtonContainer>
              {currentQuestion.options.map((option, index) => (
                  <OptionButton
                      key={index}
                      label={option}
                      onClick={() => handleOptionClick(option)}
                      isSelected={surveyAnswers[currentStep - 1]?.answer === option}
                  />
              ))}
          </ButtonContainer>
      ) : null}
    </>
  );
};

export default QuestionRender;