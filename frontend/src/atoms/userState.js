import { atom } from 'recoil';

export const userState = atom({
    key: 'userState',
    default: {
        userDetailId: null,
        name: null,
        email: null,
        birth: null,
        gender: null,
        family: null,
        height: null,
        weight: null,
        pregnancy: null,
        allergies: null,
    },
});
