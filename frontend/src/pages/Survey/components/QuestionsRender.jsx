import styled from 'styled-components';
import TextInput from '../../../components/TextInput';
import OptionButton from '../../../components/OptionButton';
import AddPillButton_ver1 from '../../../components/AddPillButton_ver1'
import questions from './Questions';

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


const QuestionRender = ({ currentQuestion, surveyAnswers, handleInputChange, handleOptionClick, currentStep }) => {
    console.log("Survey Answers:", surveyAnswers);
    return (
        <>
            {currentQuestion.type === 'text' ? (
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
            ) : currentQuestion.type === 'option' && currentStep === questions.length ? (
              <div>
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
                  <AddPillButtonContainer>
                    <AddPillButton_ver1 text="알러지 추가" /> {/* AddPillButton 추가 */}
                  </AddPillButtonContainer>
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
