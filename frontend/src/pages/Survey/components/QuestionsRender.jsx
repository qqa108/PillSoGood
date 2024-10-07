// import { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import styled from 'styled-components';
// import TextInput from '../../../components/TextInput';
// import OptionButton from '../../../components/OptionButton';
// import AddPillButton_ver1 from '../../../components/AddPillButton_ver1';

// const ButtonContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   grid-gap: 0.8rem;
//   margin-top: 1rem;
//   width: 100%;
//   max-width: 400px;
// `;

// const StyledTextInputContainer = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   margin-bottom: 1rem;
// `;

// const AddPillButtonContainer = styled.div`
//   margin-top: 1rem;
// `;

// const SelectedPillsList = styled.div`
//   margin-top: 1rem;
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
// `;

// const PillItem = styled.div`
//   padding: 5px;
//   border: 1px solid #ddd;
//   border-radius: 3px;
//   margin-bottom: 5px;
// `;

// const QuestionRender = ({ currentQuestion, surveyAnswers, handleInputChange, handleOptionClick, currentStep, selectedPills }) => {

//   return (
//     <>
//       {currentQuestion.type === 'text' ? (
//         <StyledTextInputContainer>
//           <TextInput
//             label={currentQuestion.label}
//             placeholder="입력해주세요"
//             value={surveyAnswers[currentStep - 1]?.answer || ''}
//             onChange={handleInputChange}
//           />
//         </StyledTextInputContainer>
//       ) : currentQuestion.type === 'date' ? (
//         <StyledTextInputContainer>
//           <TextInput
//             label={currentQuestion.label}
//             placeholder="yyyy-mm-dd"
//             value={surveyAnswers[currentStep - 1]?.answer || ''}
//             onChange={handleInputChange}
//             isDateInput
//           />
//         </StyledTextInputContainer>
//       ) : currentQuestion.type === 'multiple' ? (
//         currentQuestion.fields.map((field, index) => (
//           <StyledTextInputContainer key={index}>
//             <TextInput
//               label={field.label}
//               placeholder={field.placeholder}
//               value={surveyAnswers[currentStep - 1]?.answer[index] || ''}
//               onChange={(e) => handleInputChange(e, index)}
//               type={field.type}
//               unit={field.unit}
//               step={field.step}
//             />
//           </StyledTextInputContainer>
//         ))
//       ) : currentQuestion.type === 'option-pill' ? (
//         <div>
//           {/* 옵션 표시 */}
//           <ButtonContainer>
//             {currentQuestion.options.map((option, index) => (
//               <OptionButton
//                 key={index}
//                 label={option}
//                 onClick={() => handleOptionClick(option)}
//                 isSelected={surveyAnswers[currentStep - 1]?.answer === option}
//               />
//             ))}
//           </ButtonContainer>

//           {/* 약물 추가 버튼 */}
//           <AddPillButtonContainer>
//             <AddPillButton_ver1 text="알러지 약물 추가" />
//           </AddPillButtonContainer>

//           {/* 선택된 약물 목록 표시 */}
//           <SelectedPillsList>
//             {selectedPills.length > 0 ? (
//               selectedPills.map((pill, index) => <PillItem key={index}>{pill}</PillItem>)
//             ) : (
//               <p>선택된 약물이 없습니다.</p>
//             )}
//           </SelectedPillsList>
//         </div>
//       ) : currentQuestion.type === 'option' ? (
//           <ButtonContainer>
//               {currentQuestion.options.map((option, index) => (
//                   <OptionButton
//                       key={index}
//                       label={option}
//                       onClick={() => handleOptionClick(option)}
//                       isSelected={surveyAnswers[currentStep - 1]?.answer === option}
//                   />
//               ))}
//           </ButtonContainer>
//       ) : null}
//     </>
//   );
// };

// export default QuestionRender;
// // import { useState, useEffect } from 'react';
// // import styled from 'styled-components';
// // import TextInput from '../../../components/TextInput';
// // import OptionButton from '../../../components/OptionButton';
// // import AddPillButton_ver1 from '../../../components/AddPillButton_ver1';

// // const ButtonContainer = styled.div`
// //   display: grid;
// //   grid-template-columns: repeat(2, 1fr);
// //   grid-gap: 0.8rem;
// //   margin-top: 1rem;
// //   width: 100%;
// //   max-width: 400px;
// // `;

// // const StyledTextInputContainer = styled.div`
// //   width: 100%;
// //   display: flex;
// //   justify-content: center;
// //   margin-bottom: 1rem;
// // `;

// // const AddPillButtonContainer = styled.div`
// //   margin-top: 1rem;
// // `;

// // const SelectedPillsList = styled.div`
// //   margin-top: 1rem;
// //   padding: 10px;
// //   border: 1px solid #ddd;
// //   border-radius: 5px;
// // `;

// // const PillItem = styled.div`
// //   padding: 5px;
// //   border: 1px solid #ddd;
// //   border-radius: 3px;
// //   margin-bottom: 5px;
// // `;

// // const QuestionRender = ({
// //   currentQuestion,
// //   surveyAnswers = [], // surveyAnswers가 없을 경우 빈 배열로 기본값 설정
// //   handleInputChange,
// //   handleOptionClick,
// //   currentStep,
// //   selectedPills = []  // selectedPills 기본값 설정
// // }) => {
// //   // surveyAnswers와 관련된 기본 값을 설정해 에러 방지
// //   const currentAnswer = surveyAnswers[currentStep - 1]?.answer || '';

// //   return (
// //     <>
// //       {currentQuestion.type === 'text' ? (
// //         <StyledTextInputContainer>
// //           <TextInput
// //             label={currentQuestion.label}
// //             placeholder="입력해주세요"
// //             value={currentAnswer}
// //             onChange={handleInputChange}
// //           />
// //         </StyledTextInputContainer>
// //       ) : currentQuestion.type === 'date' ? (
// //         <StyledTextInputContainer>
// //           <TextInput
// //             label={currentQuestion.label}
// //             placeholder="yyyy-mm-dd"
// //             value={currentAnswer}
// //             onChange={handleInputChange}
// //             isDateInput
// //           />
// //         </StyledTextInputContainer>
// //       ) : currentQuestion.type === 'multiple' ? (
// //         currentQuestion.fields.map((field, index) => (
// //           <StyledTextInputContainer key={index}>
// //             <TextInput
// //               label={field.label}
// //               placeholder={field.placeholder}
// //               value={surveyAnswers[currentStep - 1]?.answer[index] || ''}
// //               onChange={(e) => handleInputChange(e, index)}
// //               type={field.type}
// //               unit={field.unit}
// //               step={field.step}
// //             />
// //           </StyledTextInputContainer>
// //         ))
// //       ) : currentQuestion.type === 'option-pill' ? (
// //         <div>
// //           <ButtonContainer>
// //             {currentQuestion.options.map((option, index) => (
// //               <OptionButton
// //                 key={index}
// //                 label={option}
// //                 onClick={() => handleOptionClick(option)}
// //                 isSelected={surveyAnswers[currentStep - 1]?.answer === option}
// //               />
// //             ))}
// //           </ButtonContainer>

// //           <AddPillButtonContainer>
// //             <AddPillButton_ver1 text="알러지 약물 추가" />
// //           </AddPillButtonContainer>

// //           <SelectedPillsList>
// //             {selectedPills.length > 0 ? (
// //               selectedPills.map((pill, index) => <PillItem key={index}>{pill}</PillItem>)
// //             ) : (
// //               <p>선택된 약물이 없습니다.</p>
// //             )}
// //           </SelectedPillsList>
// //         </div>
// //       ) : currentQuestion.type === 'option' ? (
// //         <ButtonContainer>
// //           {currentQuestion.options.map((option, index) => (
// //             <OptionButton
// //               key={index}
// //               label={option}
// //               onClick={() => handleOptionClick(option)}
// //               isSelected={surveyAnswers[currentStep - 1]?.answer === option}
// //             />
// //           ))}
// //         </ButtonContainer>
// //       ) : null}
// //     </>
// //   );
// // };

// // export default QuestionRender;
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import TextInput from '../../../components/TextInput';
import OptionButton from '../../../components/OptionButton';
import AddPillButton_ver1 from '../../../components/AddPillButton_ver1';

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
  margin-top: 1rem;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const PillItem = styled.div`
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
  margin-bottom: 5px;
`;

const QuestionRender = ({ currentQuestion, surveyAnswers, handleInputChange, handleOptionClick, currentStep, selectedPills }) => {

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
      ) : currentQuestion.type === 'option-pill' ? (
        <div>
          {/* 옵션 표시 */}
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

          {/* 약물 추가 버튼 */}
          <AddPillButtonContainer>
            <AddPillButton_ver1 text="알러지 약물 추가" />
          </AddPillButtonContainer>

          {/* 선택된 약물 목록 표시 */}
          <SelectedPillsList>
            {selectedPills.length > 0 ? (
              selectedPills.map((pill, index) => <PillItem key={index}>{pill}</PillItem>)
            ) : (
              <p>선택된 약물이 없습니다.</p>
            )}
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