import styled from 'styled-components';
import colors from '../../assets/colors';
import { FaTrashCan } from 'react-icons/fa6';
import Warn from '../../components/Warn';

const CompareContainer = styled.div`
    width: 100%;
    height: calc(100vh - 120px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    align-items: center;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
    background-color: white;
    font-weight: 700;
    color: ${colors.point1};
    border: 1px solid ${colors.point1};
    border-radius: 6px;
    padding: 5px 5px;
`;

const PillContainer = styled.div`
    width: 100%;
    height: 500px;
    border: 1px solid ${colors.taking};
    background-color: white;
    border-radius: 6px;
    padding: 20px 15px;
    box-sizing: border-box;
    font-weight: 700;
`;

const SelectCount = styled.div`
    margin-bottom: 10px;
`;

const PillWrapper = styled.div`
    padding: 10px 10px;
    display: flex;
    justify-content: space-between;
`;

function Compare() {
    return (
        <CompareContainer>
            <ButtonContainer>
                <ButtonWrapper>약 검색하기</ButtonWrapper>
                <ButtonWrapper>내 약 불러오기</ButtonWrapper>
            </ButtonContainer>
            <PillContainer>
                <SelectCount>선택된 약물 (총 3건)</SelectCount>
                <PillWrapper>
                    타이레놀 <FaTrashCan />
                </PillWrapper>
                <PillWrapper>
                    타이레놀 <FaTrashCan />
                </PillWrapper>
                <PillWrapper>
                    타이레놀 <FaTrashCan />
                </PillWrapper>
            </PillContainer>
            <Warn />
        </CompareContainer>
    );
}

export default Compare;
