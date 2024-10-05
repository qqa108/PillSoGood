import { atom } from 'recoil';

// 약국, 병원, 처방 관련 정보를 저장하는 상태
export const prescriptionState = atom({
    key: 'prescriptionState',
    default: {
        pharmacyName: '',
        hospitalName: '',
        intakeAt: '',
        medicineInfo: [], // 약물 정보
    },
});
