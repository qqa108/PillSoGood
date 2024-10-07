import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { takingMediListState } from '../../atoms/mediListState';
import colors from '../../assets/colors';
import { useState } from 'react';

const CompareMyPillsContainer = styled.div`
    width: 100%;
`;

const Title = styled.div`
    font-size: 1.25rem;
    display: flex;
    justify-content: center;
    font-weight: 700;
`;

const Button = styled.div`
    display: flex;
    justify-content: center;
    font-weight: 700;
    font-size: 1.25rem;
    box-sizing: border-box;
    border: 2px solid ${colors.point1};
    border-radius: 6px;
    padding: 5px 0px;
    color: ${colors.point1};
    cursor: pointer;
`;

const PillWrapper = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
    margin-bottom: 10px;
`;

const Checkbox = styled.input`
    margin-right: 10px;
`;

function CompareMyPills({ setPillList, onClose }) {
    const myPillList = useRecoilValue(takingMediListState);
    const [selectedPills, setSelectedPills] = useState([]);

    const togglePillSelection = (pillName) => {
        setSelectedPills((prev) => {
            if (prev.includes(pillName)) {
                return prev.filter((name) => name !== pillName);
            } else {
                return [...prev, pillName];
            }
        });
    };

    const handleApply = () => {
        const newPills = myPillList.filter((pill) => selectedPills.includes(pill.name));
        setPillList((prev) => [...prev, ...newPills]);
        onClose();
    };

    return (
        <CompareMyPillsContainer>
            <Title>내 약 불러오기</Title>
            {myPillList?.length === 0 ? (
                <>내 약이 존재하지 않습니다.</>
            ) : (
                myPillList?.map((e, i) => {
                    return (
                        <PillWrapper key={i}>
                            <Checkbox type="checkbox" onChange={() => togglePillSelection(e.name)} />
                            {e.name}
                        </PillWrapper>
                    );
                })
            )}
            <Button onClick={handleApply}>적용</Button>
        </CompareMyPillsContainer>
    );
}

export default CompareMyPills;
