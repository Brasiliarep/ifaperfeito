
import { SeedState, OpeleState, OduInfo } from '../types';

// The 16 Major Signs (Mejis) order and mapping
export const SIGN_NAMES: Record<number, string> = {
  15: 'Ogbe',     // 1111
  0: 'Oyeku',     // 0000
  6: 'Iwori',     // 0110
  9: 'Odi',       // 1001
  12: 'Irosun',   // 1100
  3: 'Owonrin',   // 0011
  8: 'Obara',     // 1000
  1: 'Okanran',   // 0001
  14: 'Ogunda',   // 1110
  7: 'Osa',       // 0111
  4: 'Ika',       // 0100
  2: 'Oturupon',  // 0010
  11: 'Otura',    // 1011
  13: 'Irete',    // 1101
  10: 'Ose',      // 1010
  5: 'Ofun'       // 0101
};

// Merindilogun (16 Cowries) Mapping
// Count of OPEN shells -> Odu Name (Standard Afro-Brazilian/Lucumi correspondence)
export const COWRIE_COUNT_TO_ODU: Record<number, string> = {
    0: 'Opira (Silêncio Absoluto)', // Often mapped to nothingness/void
    1: 'Okanran',
    2: 'Ejioko (Otura Meji)',
    3: 'Ogunda',
    4: 'Irosun',
    5: 'Ose',
    6: 'Obara',
    7: 'Odi',
    8: 'Ejiogbe (Aláfia)',
    9: 'Osa',
    10: 'Ofun',
    11: 'Owonrin',
    12: 'Ejila Sebora (Iwori)',
    13: 'Ika',
    14: 'Oturupon',
    15: 'Ofun Kanran',
    16: 'Irete (Alaafia)' 
};

// Inverse map for study mode selection
export const NAME_TO_VALUE: Record<string, number> = Object.entries(SIGN_NAMES).reduce((acc, [k, v]) => {
    acc[v] = parseInt(k);
    return acc;
}, {} as Record<string, number>);

export const getLegValue = (leg: SeedState[]): number => {
  return leg.reduce((acc, state, index) => {
    const val = state === 'open' ? 1 : 0;
    const weight = Math.pow(2, 3 - index); 
    return acc + (val * weight);
  }, 0);
};

export const calculateOdu = (opele: OpeleState): OduInfo => {
  const rightVal = getLegValue(opele.rightLeg);
  const leftVal = getLegValue(opele.leftLeg);

  const rightName = SIGN_NAMES[rightVal] || 'Unknown';
  const leftName = SIGN_NAMES[leftVal] || 'Unknown';

  let fullName = '';
  let isMeji = false;

  if (rightVal === leftVal) {
    isMeji = true;
    if (rightName === 'Ogbe') fullName = 'Ejiogbe';
    else if (rightName === 'Oyeku') fullName = 'Oyeku Meji';
    else fullName = `${rightName} Meji`;
  } else {
    fullName = `${rightName} ${leftName}`; 
  }

  return {
    name: fullName,
    isMeji,
    binaryRepresentation: generateAsciiArt(opele)
  };
};

export const calculateMerindilogunOdu = (cowries: SeedState[]): OduInfo => {
    const openCount = cowries.filter(s => s === 'open').length;
    const oduName = COWRIE_COUNT_TO_ODU[openCount] || 'Desconhecido';
    
    // Determine if it's treated as a Meji equivalent in the app logic
    // For simplicity in this app, we treat single hits in Merindilogun as the major Sign for interpretation
    const isMeji = openCount > 0 && openCount <= 16; 

    return {
        name: oduName,
        isMeji: isMeji,
        binaryRepresentation: `Búzios Abertos: ${openCount}`
    };
};

const generateAsciiArt = (opele: OpeleState): string => {
  return `Right: ${opele.rightLeg.map(s => s === 'open' ? 'I' : 'II').join('-')} | Left: ${opele.leftLeg.map(s => s === 'open' ? 'I' : 'II').join('-')}`;
};

// Helper to convert a numeric value (0-15) back to a leg array
export const valueToLeg = (val: number): [SeedState, SeedState, SeedState, SeedState] => {
    const leg: SeedState[] = [];
    for(let i=3; i>=0; i--) {
        const bit = (val >> i) & 1;
        leg.push(bit === 1 ? 'open' : 'closed');
    }
    return leg as [SeedState, SeedState, SeedState, SeedState];
};
