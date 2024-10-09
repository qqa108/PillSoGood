import { useRecoilValue, useSetRecoilState } from 'recoil';
import { MYPILLS } from '../assets/apis';
import useAxios from '../hook/useAxios';
import { mediListState } from '../atoms/mediListState';
import { useEffect } from 'react';
import { userState } from '../atoms/userState';

function LoadMyPill() {
    const setMediListState = useSetRecoilState(mediListState);
    const mediListInfo = useRecoilValue(mediListState);
    const userInfo = useRecoilValue(userState);
    // const { data, loading, error } = useAxios(MYPILLS(userInfo.userDetailId), 'GET');
    const { data, loading, error } = useAxios(MYPILLS(2), 'GET');

    useEffect(() => {
        if (!loading && data !== null) {
            setMediListState(data);
        }
        console.log('약 불러오기');
    }, [data, userInfo?.userDetailId, userInfo]);

    return null;
}

export default LoadMyPill;
