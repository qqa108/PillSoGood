import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atoms/userState';
import styled from 'styled-components';
import useAxios from '../../hook/useAxios';
import { FAMILY, DELETEFAMILY } from '../../assets/apis';
import { IoIosClose } from 'react-icons/io';
import { useNavigate, useLocation } from 'react-router-dom';
import colors from '../../assets/colors';
import SurveyEdit from '../Survey/surveyEdit';
// import { USERGET, DELETEFAMILY } from '../../assets/apis';
import FamilyDetail from './familyDetail';
import { Outlet } from 'react-router-dom';
import LongNextButton from '../../components/LongNextButton';
// import { ButtonContainer } from '../MyPills/PillCardRegister/historyRegister/HistoryRegisterComponents';

const Title = styled.h1`
    font-weight: 600;
    font-size: 1.12rem;
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
`;

const FamilyButton = styled.button`
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    border: 0.02rem solid #3382e9;
    background: #ebf3ff;
    padding: 0 10px;
    margin-bottom: 10px;
    cursor: pointer;
    margin-bottom: 0.9rem;
`;

const FamilyRelation = styled.span`
    font-size: 1rem;
    color: #333;
`;

// 삭제 버튼 (X 아이콘)
const DeleteButton = styled(IoIosClose)`
    color: ${colors.point2};
    font-size: 2rem;
    /* width:13px; */
    cursor: pointer;
`;

const SignoutButton = styled.button`
    width: 100%;
    height: 2.875rem;
    background-color: none;
    font-size: 1.1rem;
    background-color: transparent;
    border: none;
    color: gray;
    cursor: pointer;
`;

const ButtonContainer = styled.div`
    position: fixed;
    bottom: 3.4rem;
    width: 80%;
    padding: 1rem; /* 버튼에 padding을 추가해 버튼이 찌그러지지 않도록 */
    box-sizing: border-box;
`;

function Profile() {
    const userInfo = useRecoilValue(userState);
    const [familyDataState, setFamilyData] = useState([]);
    const { data: familyData, loading: familyLoading, error: familyError } = useAxios(FAMILY, 'GET');
    const navigate = useNavigate();
    const [isChildVisible, setIsChildVisible] = useState(false);

    const [deleteFamilyId, setDeleteFamilyId] = useState(null);

    const {
        data: deleteData,
        loading: deleteLoading,
        error: deleteError,
    } = useAxios(deleteFamilyId ? DELETEFAMILY(deleteFamilyId) : undefined, deleteFamilyId ? 'DELETE' : undefined);

    useEffect(() => {
        if (location.pathname === '/profile') {
            localStorage.removeItem('surveyAnswers');
            localStorage.removeItem('selectedPills');
        }
    }, [location]);

    useEffect(() => {
        if (deleteData) {
            window.location.reload(); // 페이지 전체를 새로고침하는 방법
        }
    }, [deleteData]);

    const handleDelete = (family, event) => {
        event.stopPropagation();

        // 삭제 확인 메시지
        const isConfirmed = window.confirm('정말로 데이터를 삭제하시겠습니까?');

        if (isConfirmed) {
            // 사용자가 확인을 눌렀을 경우 삭제 수행
            setDeleteFamilyId(family); // 가족 ID 설정 후 DELETE 요청
            alert('가족이 삭제되었습니다.');
            navigate('/profile');
        } else {
            // 사용자가 취소를 눌렀을 경우 아무 작업도 하지 않음
            console.log('삭제가 취소되었습니다.');
        }
    };

    const handleNavigate = (family) => {
        console.log('Navigating to family:', family);
        navigate(`/profile/${family}`); // 가족 ID 기반으로 라우팅
        setIsChildVisible(true);
    };

    // 로그아웃
    const handleLogout = () => {
        if (confirm('로그아웃 하시겠습니까?')) {
            alert('로그아웃되었습니다.');
            navigate('/member/logout');
        }
    };

    // 탈퇴
    const handleSignout = () => {
        if (confirm('정말 탈퇴하시겠습니까?')) {
            alert('탈퇴되었습니다.');
            navigate('/member/signout');
        }
    };

    useEffect(() => {
        // 자식 페이지에 있을 경우 부모 페이지 숨기기
        setIsChildVisible(location.pathname !== '/profile');
    }, [location.pathname]);

    if (familyLoading) return <div>Loading...</div>;
    if (familyError) return <div>Error: {familyError.message}</div>;

    return (
        <>
            {!isChildVisible && (
                <>
                    <Title>가족관계</Title>
                    <div>
                        {/* 가족 데이터가 있을 경우 출력 */}
                        {familyData && familyData.length > 0 ? (
                            <ul>
                                {familyData.map((member, index) => (
                                    <li key={index} style={{ listStyleType: 'none' }}>
                                        {/* 가족 관계를 나타내는 버튼 */}
                                        <FamilyButton onClick={() => handleNavigate(member.family)}>
                                            <FamilyRelation>{member.family}</FamilyRelation>
                                            {member.family !== '나' &&
                                                member.family !== '본인' &&
                                                member.family !== userInfo.name && (
                                                    <DeleteButton
                                                        onClick={(event) => handleDelete(member.family, event)}
                                                    />
                                                )}
                                        </FamilyButton>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div>가족 정보가 없습니다.</div>
                        )}
                    </div>
                    <ButtonContainer>
                        <LongNextButton
                            label="로그아웃"
                            width="100%"
                            bgColor={colors.point2}
                            borderColor={colors.point}
                            textColor="white"
                            isSelected={true}
                            marginBottom="0.5rem"
                            onClick={handleLogout}
                        />
                        <SignoutButton onClick={handleSignout}>탈퇴하기</SignoutButton>
                    </ButtonContainer>
                </>
            )}
            <Outlet />
        </>
    );
}

export default Profile;
