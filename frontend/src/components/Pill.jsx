import styled from 'styled-components';
import colors from '../assets/colors';

const PillContainer = styled.div`
    width: 100%;
    margin-top: 20px;
    display: flex;
`;

const PillImageWrapper = styled.img`
    /* width: 40px; */
    height: 40px;
    background-color: tomato;
    margin-right: 10px;
`;

const PillInfomation = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

const PillName = styled.div`
    font-weight: 700;
`;

const PerContainer = styled.div`
    display: flex;
    font-size: 0.5rem;
    & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 7px;
        width: 30px;
        height: 14px;
        border: 1px solid ${colors.point1};
    }
`;

const DayPer = styled.div`
    margin-right: 5px;
    color: white;
    background-color: ${colors.point1};
`;

const TimePer = styled.div`
    background-color: ${colors.point3};
`;

function Pill({ pillInfo }) {
    return (
        <PillContainer>
            <PillImageWrapper src={pillInfo?.medicineDTO?.imageUrl} alt="" />
            <PillInfomation>
                <PillName>{pillInfo?.medicineDTO?.korName}</PillName>
                <PerContainer>
                    <DayPer>1일{pillInfo?.dailyIntakeFrequency}회</DayPer>
                    <TimePer>1정</TimePer>
                </PerContainer>
            </PillInfomation>
        </PillContainer>
    );
}

export default Pill;
