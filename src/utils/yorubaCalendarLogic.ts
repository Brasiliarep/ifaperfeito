export type YorubaDay = 'Awo' | 'Ogun' | 'Jakuta' | 'Obatala';

interface YorubaDayInfo {
    name: string;
    orishas: string[];
    color: string;
    greeting: string;
}

const YORUBA_DAYS: Record<YorubaDay, YorubaDayInfo> = {
    'Awo': {
        name: 'Ojo Awo',
        orishas: ['Orunmila', 'Eshu', 'Osanyin'],
        color: 'text-green-400',
        greeting: 'Ifá a gbe wa o (Que Ifá nos apoie)'
    },
    'Ogun': {
        name: 'Ojo Ogun',
        orishas: ['Ogun', 'Osoosi', 'Osun'],
        color: 'text-red-400',
        greeting: 'Ogun ye o (Ogun vive)'
    },
    'Jakuta': {
        name: 'Ojo Jakuta',
        orishas: ['Sango', 'Oya', 'Yemoja'],
        color: 'text-red-500',
        greeting: 'Ka wo Kabiyesi (Salve o Rei)'
    },
    'Obatala': {
        name: 'Ojo Obatala',
        orishas: ['Obatala', 'Egbe', 'Egungun'],
        color: 'text-white',
        greeting: 'Epa Oosa (Salve o Orixá Branco)'
    }
};

// Reference date: June 3, 2023 was an Ojo Awo (Source data based on standard Yoruba calendar)
const REF_DATE = new Date('2023-06-03T00:00:00');
const DAY_CYCLE: YorubaDay[] = ['Awo', 'Ogun', 'Jakuta', 'Obatala'];

export const getYorubaDay = (date: Date = new Date()): YorubaDayInfo => {
    // Calculate difference in days
    const diffTime = date.getTime() - REF_DATE.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Modulo 4 logic, handling negative dates correctly if needed
    let index = diffDays % 4;
    if (index < 0) index = 4 + index;
    
    return YORUBA_DAYS[DAY_CYCLE[index]];
};