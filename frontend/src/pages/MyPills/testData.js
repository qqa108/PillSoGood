export const testData = [
    {
        id: 22,
        name: '감기약',
        status: 'COMPLETED',
        intakeAt: '2024-09-15',
        prescriptionDay: 3,
        hospitalName: '정경원 병원',
        pharmacyName: '정경원 약국',
        userMedicationDetailList: [
            {
                dailyIntakeFrequency: 555,
                perAmount: 555,
                medicineDTO: {
                    id: 9,
                    code: '650300010',
                    korName: '가나티란정',
                    engName: 'Ganatiran Tab.',
                    category: '전문',
                    company: '진양제약',
                    drugForm: '정제',
                    characters: '흰색의 장방형 필름코팅정제',
                    kind: '기타의 소화기관용약 (239)',
                    effect: '기능성소화불량으로 인한 소화기증상(속쓰림, 구역, 구토)',
                    usages: '[허가사항변경(2011년 재평가), 의약품관리과6843, 2012.12.31)](정제)(산제)성인: 모사프리드시트르산염무수물로서 1일 15 mg을 3회로 나누어 식전 또는 식후에 경구투여한다.',
                    imageUrl: 'https://common.health.kr/shared/images/sb_photo/big3/A11AKP08F001604.jpg',
                    medicineInformation: [
                        {
                            informationId: 35,
                            information: ' 식사와 관계없이 투여해도 괜찮아요.',
                        },
                        {
                            informationId: 36,
                            information: ' 설사가 나타날 수 있어요. 증상이 심하면 전문가와 상의하세요.',
                        },
                        {
                            informationId: 37,
                            information: ' 어지럽거나 졸음이 올 수 있으므로 운전, 위험한 기계조작시 주의하세요.',
                        },
                        {
                            informationId: 38,
                            information: ' 황달 등 간기능 이상징후가 나타날 경우에는 전문가와 상의하세요.',
                        },
                        {
                            informationId: 39,
                            information: ' 2주 정도 투여해도 증상 개선이 없는 경우 전문가와 상의하세요.',
                        },
                    ],
                    ageProhibition: null,
                    amountProhibition: null,
                    pregnancyProhibition: null,
                    seniorProhibition: null,
                },
            },
            {
                dailyIntakeFrequency: 555,
                perAmount: 555,
                medicineDTO: {
                    id: 11,
                    code: '52700060',
                    korName: '가나프리드정',
                    engName: 'Ganapride Tab.',
                    category: '전문',
                    company: '휴온스생명과학',
                    drugForm: '정제',
                    characters: '흰색의 원형 필름코팅정',
                    kind: '기타의 소화기관용약 (239)',
                    effect: '기능성소화불량으로 인한 소화기증상(복부팽만, 상복부통, 식욕부진, 속쓰림, 구역, 구토)',
                    usages: ' 성인 : 이토프리드염산염으로서 1회 50 mg을 1일 3회 식전에 경구투여한다. 증상에 따라 적절히 감량한다.',
                    imageUrl: 'https://common.health.kr/shared/images/sb_photo/big3/201302270002602.jpg',
                    medicineInformation: [
                        {
                            informationId: 45,
                            information: ' 식사 전에 복용하세요.',
                        },
                        {
                            informationId: 46,
                            information: ' 다른 질환으로 인한 구토증상을 은폐시킬 수 있으니 주의하세요.',
                        },
                        {
                            informationId: 47,
                            information: ' 설사가 나타날 수 있어요. 증상이 심하면 전문가와 상의하세요.',
                        },
                        {
                            informationId: 48,
                            information: ' 유즙분비, 월경불순 등이 나타날 경우에는 전문가와 상의하세요.',
                        },
                    ],
                    ageProhibition: null,
                    amountProhibition: null,
                    pregnancyProhibition: null,
                    seniorProhibition: null,
                },
            },
            {
                dailyIntakeFrequency: 777,
                perAmount: 777,
                medicineDTO: {
                    id: 17,
                    code: '649103880',
                    korName: '가네리버연질캡슐350mg',
                    engName: 'Ganeliver Soft Cap. 350mg',
                    category: '일반',
                    company: '한국휴텍스제약',
                    drugForm: '연질캡슐',
                    characters: '황갈색의 유상 내용물을 함유한 녹색의 장방형 연질캡슐제',
                    kind: '간장질환용제 (391)',
                    effect: '다음 질환의 보조치료 : 독성간질환, 만성간염, 간경변',
                    usages: '성인 1일 1회, 1회 1캡슐 복용',
                    imageUrl: 'https://common.health.kr/shared/images/sb_photo/big3/201803280001803.jpg',
                    medicineInformation: [
                        {
                            informationId: 69,
                            information: ' 직사광선을 피하여 가능한 습기가 적고 서늘한 곳에 보관하세요.',
                        },
                        {
                            informationId: 70,
                            information: ' 설사가 나타날 수 있어요. 증상이 심하면 전문가와 상의하세요.',
                        },
                        {
                            informationId: 71,
                            information: ' 12세 이하의 어린이는 투여하지 마세요.',
                        },
                        {
                            informationId: 72,
                            information: ' 담도폐쇄 환자나 그 병력이 있는 경우 전문가에게 미리 알리세요.',
                        },
                        {
                            informationId: 73,
                            information: ' 식이요법, 운동요법, 금연, 금주 등 철저한 자기 관리가 중요해요.',
                        },
                    ],
                    ageProhibition: {
                        id: 50,
                        effect: null,
                        age: 12,
                        ageField: '세',
                        ageRange: '이하',
                        name: 'milk thistle fruit ext.',
                    },
                    amountProhibition: null,
                    pregnancyProhibition: null,
                    seniorProhibition: null,
                },
            },
            {
                dailyIntakeFrequency: 777,
                perAmount: 777,
                medicineDTO: {
                    id: 17,
                    code: '649103880',
                    korName: '가네리버연질캡슐350mg',
                    engName: 'Ganeliver Soft Cap. 350mg',
                    category: '일반',
                    company: '한국휴텍스제약',
                    drugForm: '연질캡슐',
                    characters: '황갈색의 유상 내용물을 함유한 녹색의 장방형 연질캡슐제',
                    kind: '간장질환용제 (391)',
                    effect: '다음 질환의 보조치료 : 독성간질환, 만성간염, 간경변',
                    usages: '성인 1일 1회, 1회 1캡슐 복용',
                    imageUrl: 'https://common.health.kr/shared/images/sb_photo/big3/201803280001803.jpg',
                    medicineInformation: [
                        {
                            informationId: 69,
                            information: ' 직사광선을 피하여 가능한 습기가 적고 서늘한 곳에 보관하세요.',
                        },
                        {
                            informationId: 70,
                            information: ' 설사가 나타날 수 있어요. 증상이 심하면 전문가와 상의하세요.',
                        },
                        {
                            informationId: 71,
                            information: ' 12세 이하의 어린이는 투여하지 마세요.',
                        },
                        {
                            informationId: 72,
                            information: ' 담도폐쇄 환자나 그 병력이 있는 경우 전문가에게 미리 알리세요.',
                        },
                        {
                            informationId: 73,
                            information: ' 식이요법, 운동요법, 금연, 금주 등 철저한 자기 관리가 중요해요.',
                        },
                    ],
                    ageProhibition: {
                        id: 50,
                        effect: null,
                        age: 12,
                        ageField: '세',
                        ageRange: '이하',
                        name: 'milk thistle fruit ext.',
                    },
                    amountProhibition: null,
                    pregnancyProhibition: null,
                    seniorProhibition: null,
                },
            },
            {
                dailyIntakeFrequency: 999,
                perAmount: 999,
                medicineDTO: {
                    id: 999,
                    code: '642400060',
                    korName: '날트렉신정',
                    engName: 'Naltrexin Tab.',
                    category: '전문',
                    company: '영진약품',
                    drugForm: '정제',
                    characters: '이 약은 옅은 황색의 장방형 필름코팅정이다.',
                    kind: '해독제 (392)',
                    effect: '적정 관리 프로그램과 병행하여 알코올 의존성 치료 및 외인성 아편류의 효과 차단',
                    usages: '[허가사항변경(2012년 재평가) 의약품관리총괄과9301, 2013.12.30]',
                    imageUrl: 'https://common.health.kr/shared/images/sb_photo/big3/A11AKP07L050001.jpg',
                    medicineInformation: [
                        {
                            informationId: 5004,
                            information: ' 발진, 발적, 가려움증 등의 증상이 나타날 경우 전문가와 상의하세요.',
                        },
                        {
                            informationId: 5005,
                            information: ' 과량으로 투여하지 않도록 주의하세요.',
                        },
                        {
                            informationId: 5006,
                            information: ' 가능한 습기가 적고 서늘한 곳에 보관하세요.',
                        },
                    ],
                    ageProhibition: null,
                    amountProhibition: null,
                    pregnancyProhibition: {
                        id: 2393,
                        level: 2,
                        effect: '동물실험에서 고용량에 의해 배아치사효과 나타남',
                        name: 'naltrexone hydrochloride',
                    },
                    seniorProhibition: null,
                },
            },
        ],
    },
    {
        id: 22,
        name: '탈모약',
        status: 'COMPLETED',
        intakeAt: '2024-09-01',
        prescriptionDay: 3,
        hospitalName: '대머리 병원',
        pharmacyName: '대머리 약국',
        userMedicationDetailList: [
            {
                dailyIntakeFrequency: 555,
                perAmount: 555,
                medicineDTO: {
                    id: 9,
                    code: '650300010',
                    korName: '가나티란정',
                    engName: 'Ganatiran Tab.',
                    category: '전문',
                    company: '진양제약',
                    drugForm: '정제',
                    characters: '흰색의 장방형 필름코팅정제',
                    kind: '기타의 소화기관용약 (239)',
                    effect: '기능성소화불량으로 인한 소화기증상(속쓰림, 구역, 구토)',
                    usages: '[허가사항변경(2011년 재평가), 의약품관리과6843, 2012.12.31)](정제)(산제)성인: 모사프리드시트르산염무수물로서 1일 15 mg을 3회로 나누어 식전 또는 식후에 경구투여한다.',
                    imageUrl: 'https://common.health.kr/shared/images/sb_photo/big3/A11AKP08F001604.jpg',
                    medicineInformation: [
                        {
                            informationId: 35,
                            information: ' 식사와 관계없이 투여해도 괜찮아요.',
                        },
                        {
                            informationId: 36,
                            information: ' 설사가 나타날 수 있어요. 증상이 심하면 전문가와 상의하세요.',
                        },
                        {
                            informationId: 37,
                            information: ' 어지럽거나 졸음이 올 수 있으므로 운전, 위험한 기계조작시 주의하세요.',
                        },
                        {
                            informationId: 38,
                            information: ' 황달 등 간기능 이상징후가 나타날 경우에는 전문가와 상의하세요.',
                        },
                        {
                            informationId: 39,
                            information: ' 2주 정도 투여해도 증상 개선이 없는 경우 전문가와 상의하세요.',
                        },
                    ],
                    ageProhibition: null,
                    amountProhibition: null,
                    pregnancyProhibition: null,
                    seniorProhibition: null,
                },
            },
            {
                dailyIntakeFrequency: 555,
                perAmount: 555,
                medicineDTO: {
                    id: 11,
                    code: '52700060',
                    korName: '가나프리드정',
                    engName: 'Ganapride Tab.',
                    category: '전문',
                    company: '휴온스생명과학',
                    drugForm: '정제',
                    characters: '흰색의 원형 필름코팅정',
                    kind: '기타의 소화기관용약 (239)',
                    effect: '기능성소화불량으로 인한 소화기증상(복부팽만, 상복부통, 식욕부진, 속쓰림, 구역, 구토)',
                    usages: ' 성인 : 이토프리드염산염으로서 1회 50 mg을 1일 3회 식전에 경구투여한다. 증상에 따라 적절히 감량한다.',
                    imageUrl: 'https://common.health.kr/shared/images/sb_photo/big3/201302270002602.jpg',
                    medicineInformation: [
                        {
                            informationId: 45,
                            information: ' 식사 전에 복용하세요.',
                        },
                        {
                            informationId: 46,
                            information: ' 다른 질환으로 인한 구토증상을 은폐시킬 수 있으니 주의하세요.',
                        },
                        {
                            informationId: 47,
                            information: ' 설사가 나타날 수 있어요. 증상이 심하면 전문가와 상의하세요.',
                        },
                        {
                            informationId: 48,
                            information: ' 유즙분비, 월경불순 등이 나타날 경우에는 전문가와 상의하세요.',
                        },
                    ],
                    ageProhibition: null,
                    amountProhibition: null,
                    pregnancyProhibition: null,
                    seniorProhibition: null,
                },
            },
            {
                dailyIntakeFrequency: 777,
                perAmount: 777,
                medicineDTO: {
                    id: 17,
                    code: '649103880',
                    korName: '가네리버연질캡슐350mg',
                    engName: 'Ganeliver Soft Cap. 350mg',
                    category: '일반',
                    company: '한국휴텍스제약',
                    drugForm: '연질캡슐',
                    characters: '황갈색의 유상 내용물을 함유한 녹색의 장방형 연질캡슐제',
                    kind: '간장질환용제 (391)',
                    effect: '다음 질환의 보조치료 : 독성간질환, 만성간염, 간경변',
                    usages: '성인 1일 1회, 1회 1캡슐 복용',
                    imageUrl: 'https://common.health.kr/shared/images/sb_photo/big3/201803280001803.jpg',
                    medicineInformation: [
                        {
                            informationId: 69,
                            information: ' 직사광선을 피하여 가능한 습기가 적고 서늘한 곳에 보관하세요.',
                        },
                        {
                            informationId: 70,
                            information: ' 설사가 나타날 수 있어요. 증상이 심하면 전문가와 상의하세요.',
                        },
                        {
                            informationId: 71,
                            information: ' 12세 이하의 어린이는 투여하지 마세요.',
                        },
                        {
                            informationId: 72,
                            information: ' 담도폐쇄 환자나 그 병력이 있는 경우 전문가에게 미리 알리세요.',
                        },
                        {
                            informationId: 73,
                            information: ' 식이요법, 운동요법, 금연, 금주 등 철저한 자기 관리가 중요해요.',
                        },
                    ],
                    ageProhibition: {
                        id: 50,
                        effect: null,
                        age: 12,
                        ageField: '세',
                        ageRange: '이하',
                        name: 'milk thistle fruit ext.',
                    },
                    amountProhibition: null,
                    pregnancyProhibition: null,
                    seniorProhibition: null,
                },
            },
            {
                dailyIntakeFrequency: 777,
                perAmount: 777,
                medicineDTO: {
                    id: 17,
                    code: '649103880',
                    korName: '가네리버연질캡슐350mg',
                    engName: 'Ganeliver Soft Cap. 350mg',
                    category: '일반',
                    company: '한국휴텍스제약',
                    drugForm: '연질캡슐',
                    characters: '황갈색의 유상 내용물을 함유한 녹색의 장방형 연질캡슐제',
                    kind: '간장질환용제 (391)',
                    effect: '다음 질환의 보조치료 : 독성간질환, 만성간염, 간경변',
                    usages: '성인 1일 1회, 1회 1캡슐 복용',
                    imageUrl: 'https://common.health.kr/shared/images/sb_photo/big3/201803280001803.jpg',
                    medicineInformation: [
                        {
                            informationId: 69,
                            information: ' 직사광선을 피하여 가능한 습기가 적고 서늘한 곳에 보관하세요.',
                        },
                        {
                            informationId: 70,
                            information: ' 설사가 나타날 수 있어요. 증상이 심하면 전문가와 상의하세요.',
                        },
                        {
                            informationId: 71,
                            information: ' 12세 이하의 어린이는 투여하지 마세요.',
                        },
                        {
                            informationId: 72,
                            information: ' 담도폐쇄 환자나 그 병력이 있는 경우 전문가에게 미리 알리세요.',
                        },
                        {
                            informationId: 73,
                            information: ' 식이요법, 운동요법, 금연, 금주 등 철저한 자기 관리가 중요해요.',
                        },
                    ],
                    ageProhibition: {
                        id: 50,
                        effect: null,
                        age: 12,
                        ageField: '세',
                        ageRange: '이하',
                        name: 'milk thistle fruit ext.',
                    },
                    amountProhibition: null,
                    pregnancyProhibition: null,
                    seniorProhibition: null,
                },
            },
            {
                dailyIntakeFrequency: 999,
                perAmount: 999,
                medicineDTO: {
                    id: 999,
                    code: '642400060',
                    korName: '날트렉신정',
                    engName: 'Naltrexin Tab.',
                    category: '전문',
                    company: '영진약품',
                    drugForm: '정제',
                    characters: '이 약은 옅은 황색의 장방형 필름코팅정이다.',
                    kind: '해독제 (392)',
                    effect: '적정 관리 프로그램과 병행하여 알코올 의존성 치료 및 외인성 아편류의 효과 차단',
                    usages: '[허가사항변경(2012년 재평가) 의약품관리총괄과9301, 2013.12.30]',
                    imageUrl: 'https://common.health.kr/shared/images/sb_photo/big3/A11AKP07L050001.jpg',
                    medicineInformation: [
                        {
                            informationId: 5004,
                            information: ' 발진, 발적, 가려움증 등의 증상이 나타날 경우 전문가와 상의하세요.',
                        },
                        {
                            informationId: 5005,
                            information: ' 과량으로 투여하지 않도록 주의하세요.',
                        },
                        {
                            informationId: 5006,
                            information: ' 가능한 습기가 적고 서늘한 곳에 보관하세요.',
                        },
                    ],
                    ageProhibition: null,
                    amountProhibition: null,
                    pregnancyProhibition: {
                        id: 2393,
                        level: 2,
                        effect: '동물실험에서 고용량에 의해 배아치사효과 나타남',
                        name: 'naltrexone hydrochloride',
                    },
                    seniorProhibition: null,
                },
            },
        ],
    },
    {
        id: 22,
        name: '비염약',
        status: 'COMPLETED',
        intakeAt: '2024-08-15',
        prescriptionDay: 3,
        hospitalName: '레드코 병원',
        pharmacyName: '레드코 약국',
        userMedicationDetailList: [
            {
                dailyIntakeFrequency: 555,
                perAmount: 555,
                medicineDTO: {
                    id: 9,
                    code: '650300010',
                    korName: '가나티란정',
                    engName: 'Ganatiran Tab.',
                    category: '전문',
                    company: '진양제약',
                    drugForm: '정제',
                    characters: '흰색의 장방형 필름코팅정제',
                    kind: '기타의 소화기관용약 (239)',
                    effect: '기능성소화불량으로 인한 소화기증상(속쓰림, 구역, 구토)',
                    usages: '[허가사항변경(2011년 재평가), 의약품관리과6843, 2012.12.31)](정제)(산제)성인: 모사프리드시트르산염무수물로서 1일 15 mg을 3회로 나누어 식전 또는 식후에 경구투여한다.',
                    imageUrl: 'https://common.health.kr/shared/images/sb_photo/big3/A11AKP08F001604.jpg',
                    medicineInformation: [
                        {
                            informationId: 35,
                            information: ' 식사와 관계없이 투여해도 괜찮아요.',
                        },
                        {
                            informationId: 36,
                            information: ' 설사가 나타날 수 있어요. 증상이 심하면 전문가와 상의하세요.',
                        },
                        {
                            informationId: 37,
                            information: ' 어지럽거나 졸음이 올 수 있으므로 운전, 위험한 기계조작시 주의하세요.',
                        },
                        {
                            informationId: 38,
                            information: ' 황달 등 간기능 이상징후가 나타날 경우에는 전문가와 상의하세요.',
                        },
                        {
                            informationId: 39,
                            information: ' 2주 정도 투여해도 증상 개선이 없는 경우 전문가와 상의하세요.',
                        },
                    ],
                    ageProhibition: null,
                    amountProhibition: null,
                    pregnancyProhibition: null,
                    seniorProhibition: null,
                },
            },
            {
                dailyIntakeFrequency: 555,
                perAmount: 555,
                medicineDTO: {
                    id: 11,
                    code: '52700060',
                    korName: '가나프리드정',
                    engName: 'Ganapride Tab.',
                    category: '전문',
                    company: '휴온스생명과학',
                    drugForm: '정제',
                    characters: '흰색의 원형 필름코팅정',
                    kind: '기타의 소화기관용약 (239)',
                    effect: '기능성소화불량으로 인한 소화기증상(복부팽만, 상복부통, 식욕부진, 속쓰림, 구역, 구토)',
                    usages: ' 성인 : 이토프리드염산염으로서 1회 50 mg을 1일 3회 식전에 경구투여한다. 증상에 따라 적절히 감량한다.',
                    imageUrl: 'https://common.health.kr/shared/images/sb_photo/big3/201302270002602.jpg',
                    medicineInformation: [
                        {
                            informationId: 45,
                            information: ' 식사 전에 복용하세요.',
                        },
                        {
                            informationId: 46,
                            information: ' 다른 질환으로 인한 구토증상을 은폐시킬 수 있으니 주의하세요.',
                        },
                        {
                            informationId: 47,
                            information: ' 설사가 나타날 수 있어요. 증상이 심하면 전문가와 상의하세요.',
                        },
                        {
                            informationId: 48,
                            information: ' 유즙분비, 월경불순 등이 나타날 경우에는 전문가와 상의하세요.',
                        },
                    ],
                    ageProhibition: null,
                    amountProhibition: null,
                    pregnancyProhibition: null,
                    seniorProhibition: null,
                },
            },
            {
                dailyIntakeFrequency: 777,
                perAmount: 777,
                medicineDTO: {
                    id: 17,
                    code: '649103880',
                    korName: '가네리버연질캡슐350mg',
                    engName: 'Ganeliver Soft Cap. 350mg',
                    category: '일반',
                    company: '한국휴텍스제약',
                    drugForm: '연질캡슐',
                    characters: '황갈색의 유상 내용물을 함유한 녹색의 장방형 연질캡슐제',
                    kind: '간장질환용제 (391)',
                    effect: '다음 질환의 보조치료 : 독성간질환, 만성간염, 간경변',
                    usages: '성인 1일 1회, 1회 1캡슐 복용',
                    imageUrl: 'https://common.health.kr/shared/images/sb_photo/big3/201803280001803.jpg',
                    medicineInformation: [
                        {
                            informationId: 69,
                            information: ' 직사광선을 피하여 가능한 습기가 적고 서늘한 곳에 보관하세요.',
                        },
                        {
                            informationId: 70,
                            information: ' 설사가 나타날 수 있어요. 증상이 심하면 전문가와 상의하세요.',
                        },
                        {
                            informationId: 71,
                            information: ' 12세 이하의 어린이는 투여하지 마세요.',
                        },
                        {
                            informationId: 72,
                            information: ' 담도폐쇄 환자나 그 병력이 있는 경우 전문가에게 미리 알리세요.',
                        },
                        {
                            informationId: 73,
                            information: ' 식이요법, 운동요법, 금연, 금주 등 철저한 자기 관리가 중요해요.',
                        },
                    ],
                    ageProhibition: {
                        id: 50,
                        effect: null,
                        age: 12,
                        ageField: '세',
                        ageRange: '이하',
                        name: 'milk thistle fruit ext.',
                    },
                    amountProhibition: null,
                    pregnancyProhibition: null,
                    seniorProhibition: null,
                },
            },
            {
                dailyIntakeFrequency: 777,
                perAmount: 777,
                medicineDTO: {
                    id: 17,
                    code: '649103880',
                    korName: '가네리버연질캡슐350mg',
                    engName: 'Ganeliver Soft Cap. 350mg',
                    category: '일반',
                    company: '한국휴텍스제약',
                    drugForm: '연질캡슐',
                    characters: '황갈색의 유상 내용물을 함유한 녹색의 장방형 연질캡슐제',
                    kind: '간장질환용제 (391)',
                    effect: '다음 질환의 보조치료 : 독성간질환, 만성간염, 간경변',
                    usages: '성인 1일 1회, 1회 1캡슐 복용',
                    imageUrl: 'https://common.health.kr/shared/images/sb_photo/big3/201803280001803.jpg',
                    medicineInformation: [
                        {
                            informationId: 69,
                            information: ' 직사광선을 피하여 가능한 습기가 적고 서늘한 곳에 보관하세요.',
                        },
                        {
                            informationId: 70,
                            information: ' 설사가 나타날 수 있어요. 증상이 심하면 전문가와 상의하세요.',
                        },
                        {
                            informationId: 71,
                            information: ' 12세 이하의 어린이는 투여하지 마세요.',
                        },
                        {
                            informationId: 72,
                            information: ' 담도폐쇄 환자나 그 병력이 있는 경우 전문가에게 미리 알리세요.',
                        },
                        {
                            informationId: 73,
                            information: ' 식이요법, 운동요법, 금연, 금주 등 철저한 자기 관리가 중요해요.',
                        },
                    ],
                    ageProhibition: {
                        id: 50,
                        effect: null,
                        age: 12,
                        ageField: '세',
                        ageRange: '이하',
                        name: 'milk thistle fruit ext.',
                    },
                    amountProhibition: null,
                    pregnancyProhibition: null,
                    seniorProhibition: null,
                },
            },
            {
                dailyIntakeFrequency: 999,
                perAmount: 999,
                medicineDTO: {
                    id: 999,
                    code: '642400060',
                    korName: '날트렉신정',
                    engName: 'Naltrexin Tab.',
                    category: '전문',
                    company: '영진약품',
                    drugForm: '정제',
                    characters: '이 약은 옅은 황색의 장방형 필름코팅정이다.',
                    kind: '해독제 (392)',
                    effect: '적정 관리 프로그램과 병행하여 알코올 의존성 치료 및 외인성 아편류의 효과 차단',
                    usages: '[허가사항변경(2012년 재평가) 의약품관리총괄과9301, 2013.12.30]',
                    imageUrl: 'https://common.health.kr/shared/images/sb_photo/big3/A11AKP07L050001.jpg',
                    medicineInformation: [
                        {
                            informationId: 5004,
                            information: ' 발진, 발적, 가려움증 등의 증상이 나타날 경우 전문가와 상의하세요.',
                        },
                        {
                            informationId: 5005,
                            information: ' 과량으로 투여하지 않도록 주의하세요.',
                        },
                        {
                            informationId: 5006,
                            information: ' 가능한 습기가 적고 서늘한 곳에 보관하세요.',
                        },
                    ],
                    ageProhibition: null,
                    amountProhibition: null,
                    pregnancyProhibition: {
                        id: 2393,
                        level: 2,
                        effect: '동물실험에서 고용량에 의해 배아치사효과 나타남',
                        name: 'naltrexone hydrochloride',
                    },
                    seniorProhibition: null,
                },
            },
        ],
    },
];
