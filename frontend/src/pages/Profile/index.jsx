import { useRecoilValue } from 'recoil';
import { userState } from '../../atoms/userState';

function Profile() {
    const userInfo = useRecoilValue(userState);

    return (
        <>
            <div>profile</div>
            <div>{userInfo?.name}</div>
        </>
    );
}

export default Profile;
