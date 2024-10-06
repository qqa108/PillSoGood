import { atom, selector } from 'recoil';

export const mediListState = atom({
    key: 'mediListState',
    default: [],
});

// takingMediList을 selector로 정의
export const takingMediListState = selector({
    key: 'takingMediListState',
    get: ({ get }) => {
        const mediList = get(mediListState);
        return mediList.filter((item) => item.status === 'TAKING');
    },
});
