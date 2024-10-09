import { useState, useCallback } from 'react';
import styled from 'styled-components';
import SearchBox from '@/components/SearchBox';
import Filter from '@/components/Filter';
import SearchResult from '@/components/SearchResult';
import colors from '@/assets/colors';
import axios from 'axios';
import { MEDICINEES } from '@/assets/apis';

const SelectedPillsContainer = styled.div`
    margin-top: 1rem;
`;

const PillsList = styled.div`
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const PillItem = styled.span`
    background-color: #fff;
    padding: 5px 10px;
    border-radius: 12px;
    border: 1px solid ${colors.point1};
    font-size: 14px;
    color: #333;
`;

const NoPillsText = styled.p`
    margin-top: 1rem;
    color: #888;
`;

const RegisterButton = styled.button`
    margin-top: 1rem;
    height: 2.7rem;
    padding: 10px 20px;
    background-color: ${colors.point1};
    color: white;
    border: none;
    border-radius: 5px;
    margin-bottom: 5rem;
    cursor: pointer;

    &:hover {
        background-color: ${colors.point1};
    }
`;

const RegisterPillContainer = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const SearchResultsContainer = styled.div`
    margin-top: 1rem;
`;

const RegisterPill = ({ setPillList, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOptions, setFilterOptions] = useState({ category: '' });
    const [filteredPills, setFilteredPills] = useState([]);
    const [filteredCount, setFilteredCount] = useState(0);
    const [selectedPills, setSelectedPills] = useState([]);

    const fetchPillData = async (term, currentFilterOptions) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');

            if (!accessToken || !refreshToken) {
                throw new Error('토큰이 없습니다. 로그인이 필요합니다.');
            }

            const response = await axios.get(MEDICINEES(term, [currentFilterOptions.category]), {
                headers: {
                    Authorization: `${accessToken}`,
                    RefreshToken: `${refreshToken}`,
                },
            });

            const pills = response.data;
            let filtered = pills;

            if (term) {
                filtered = filtered.filter((pill) => pill.korName.includes(term));
            }

            const uniquePills = filtered.filter(
                (pill, index, self) => self.findIndex((p) => p.id === pill.id) === index
            );

            setFilteredPills(uniquePills);
            setFilteredCount(uniquePills.length);
        } catch (error) {
            console.error('알약 데이터를 불러오는 데 실패했습니다.', error);
        }
    };

    const handleSearch = useCallback(
        (term) => {
            setSearchTerm(term);
            fetchPillData(term, filterOptions);
        },
        [filterOptions]
    );

    const handleFilterChange = (options) => {
        setFilterOptions(options);
        fetchPillData(searchTerm, options);
    };

    const handlePillSelect = (pill) => {
        setSelectedPills((prevSelected) => {
            const pillName = pill.name; // pill 객체에서 이름 추출
            if (prevSelected.some((p) => p.name === pillName && p.id === pill.id)) {
                return prevSelected.filter((p) => p.name !== pillName || p.id !== pill.id);
            } else {
                return [...prevSelected, pill]; // pill 객체 전체를 추가
            }
        });
    };

    const handleRegister = () => {
        setPillList((prevPillList) => [...prevPillList, ...selectedPills]);
        onClose();
        console.log('약 검색 등록', selectedPills);
    };

    return (
        <RegisterPillContainer>
            <SearchBox value={searchTerm} onSearch={handleSearch} />
            <Filter onFilterChange={handleFilterChange} />
            {filteredCount > 0 && <p>총 {filteredCount}건의 약이 있어요.</p>}
            <SearchResultsContainer>
                {filteredPills.length > 0 ? (
                    filteredPills.map((pill) => (
                        <SearchResult
                            key={pill.id}
                            korName={pill.korName}
                            isActive={selectedPills.some(
                                (selected) => selected.name === pill.korName && selected.id === pill.id
                            )}
                            onSelect={() => handlePillSelect({ name: pill.korName, id: pill.id })}
                        />
                    ))
                ) : searchTerm ? (
                    <p>검색된 약물이 없습니다.</p>
                ) : (
                    <p>검색어를 입력해주세요.</p>
                )}
            </SearchResultsContainer>
            <SelectedPillsContainer>
                <h3>[선택된 약물]</h3>
                {selectedPills.length > 0 ? (
                    <PillsList>
                        {selectedPills.map((pill, index) => (
                            <PillItem key={index}>{pill.name}</PillItem> // 이름과 ID 출력
                        ))}
                    </PillsList>
                ) : (
                    <NoPillsText>선택된 약물이 없습니다.</NoPillsText>
                )}
            </SelectedPillsContainer>
            <RegisterButton onClick={handleRegister}>등록하기</RegisterButton>
        </RegisterPillContainer>
    );
};

export default RegisterPill;
