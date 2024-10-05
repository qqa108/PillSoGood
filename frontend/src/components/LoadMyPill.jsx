import { useRecoilValue, useSetRecoilState } from 'recoil';
import { MYPILLS } from '../assets/apis';
import useAxios from '../hook/useAxios';
import { mediListState } from '../atoms/mediListState';
import { useEffect } from 'react';

function LoadMyPill() {
    const setMediListState = useSetRecoilState(mediListState);
    const mediListInfo = useRecoilValue(mediListState);
    const { data, loading, error } = useAxios(MYPILLS(2), 'GET');

    useEffect(() => {
        if (!loading && data !== null) {
            setMediListState(data);
        }
    }, [loading]);

    return null;
}

export default LoadMyPill;
