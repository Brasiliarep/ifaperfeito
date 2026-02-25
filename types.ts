
export type SeedState = 'open' | 'closed';

// Method selection
export type DivinationMethod = 'opele' | 'opon' | 'merindilogun' | 'ikin';


export interface OpeleState {
    rightLeg: [SeedState, SeedState, SeedState, SeedState];
    leftLeg: [SeedState, SeedState, SeedState, SeedState];
}

// State for 16 Cowries
export type CowrieState = SeedState[]; // Array of 16 states

export interface OduInfo {
    name: string;
    isMeji: boolean;
    binaryRepresentation: string;
}

export type SubscriptionPlan = 'free' | 'pro_semester' | 'pro_annual';

export interface UserProfile {
    uid: string;
    email: string;
    plan: SubscriptionPlan;
    validUntil?: string;
    name: string;
}

export interface BabalawoProfile {
    name: string;
    title: string; // e.g. "Babalawo", "Iyanifa", "Bokono"
    phone: string;
    address: string;
    email: string;
}

export interface ClientData {
    id: string;
    fullName: string;
    dateOfBirth: string;
    mothersName: string;
    address: string;
    consultationTime: string;
    profession: string;
    maritalStatus: string;
    phone: string;
    email: string;
}

// Updated structure for Ebo with Ingredients
export interface EboDetail {
    title?: string; // Nome do Trabalho (ex: Isegun Ota)
    description: string;
    instructions: string;
    ingredients: string[]; // List of ingredients to buy
    ofo?: string; // A reza em Yoruba
    translation?: string; // Tradução da reza
    priceEstimate?: number; // Estimated cost
}

export interface EboLevels {
    basic: EboDetail; // Accessible (Water, Gin, etc) - Client can do
    medium: EboDetail; // No Sacrifice (Adimus, Powders) - Client/Priest
    complete: EboDetail; // Sacrifice (Eje) - Priest ONLY
}

export interface LifeAreaAnalysis {
    analysis: string;
    ebos: EboLevels;
}

export type EboSelectionType = 'basic' | 'medium' | 'complete' | 'none';

export interface CustomRemedy {
    id: string;
    category: string;
    problem: string;
    solution: EboLevels;
    selection: EboSelectionType;
}

export interface SelectionMap {
    general: EboSelectionType;
    love: EboSelectionType;
    finance: EboSelectionType;
    health: EboSelectionType;
    customRemedies: CustomRemedy[];
    mandala: {
        selected: boolean;
        price: number;
    };
}

export type ConsultationStatus = 'pending' | 'completed' | 'canceled';

export interface ConsultationRecord {
    id: string;
    client: ClientData;
    odu: OduInfo;
    interpretation: AIInterpretation;
    selections: SelectionMap;
    timestamp: string;
    language: Language;
    notes?: string;
    status?: ConsultationStatus;
}

export interface ChatResponse {
    fullAnswer: string;
    shortSummary: string;
}

export interface AIInterpretation {
    oduName: string;
    summary: string;

    itan: string;
    itanSummary?: string;
    itanAnalysis: string;

    // The ancient verse
    chant: {
        yoruba: string;
        translation: string;
    };

    oduOriki: {
        yoruba: string;
        translation: string;
        instructions: string;
    };

    herbalBaths: {
        name: string;
        ingredients: string[];
        preparation: string;
        purpose: string;
    };

    generalAdvice: string;

    love: LifeAreaAnalysis;
    finance: LifeAreaAnalysis;
    health: LifeAreaAnalysis & { risks: string[] };

    // Novo campo específico para Osogbo
    osogbo?: {
        analysis: string;
        ebo: EboDetail;
    };

    spirituality: string;

    diet: {
        positive: string;
        negative: string;
    };
    clothing: {
        positive: string;
        negative: string;
    };

    dangers: string;
    rulingOrishas: string;
    destinyAndOri: string;
    obstaclesAndEnemies: string;

    solutionsAndEbos: EboLevels;

    ancestry: string;
    personality: string;
    decisionMaking: string;

    warning: string;
    luckyItems?: string[];

    ireOrOsogbo: 'Irê' | 'Osogbo';
    ireOsogboDescription: string;
    ireOsogboAction: string;
}

// V4.0 AKOSE STRUCTURE - RICH DATA
export interface AkoseV4 {
    tipo: 'akose';
    titulo_yoruba: string;
    finalidade: string;
    materiais: string[];
    modo_preparo_sacerdotal: string;
    oduReference?: string;
    category?: string;
    ofo_ativacao: {
        yoruba: string;
        portugues: string;
        fonetica: string;
    };
    visualizacao_consulente: {
        orcamento: boolean;
        finalidade: boolean;
        preparo: boolean;
    };
}

export interface AkoseItem extends Partial<AkoseV4> {
    id: string;
    title: string; // Compatible with old views
    purpose: string;
    category: 'love' | 'money' | 'health' | 'protection' | 'victory' | 'justice' | 'fertility' | 'power';
    ingredients: string[]; // Compatible
    instructions: string; // Compatible
    oduReference: string;
    instructions_priest?: string; // CAMPO NOVO ADICIONADO PARA CORRIGIR O ERRO
}

export interface SangoJusticeResult {
    name: string; // Odu Name
    outcome: 'victory_hard' | 'peace' | 'trouble';
    advice: string;
    akose: string;
    ofo: string;
    ebos: EboLevels;
}

export interface InventoryItem {
    id: string;
    name: string;
    quantity: number;
    unit: 'g' | 'kg' | 'unidade' | 'ml' | 'l' | 'fatias';
    category: 'herb' | 'animal' | 'mineral' | 'liquid' | 'other';
    minThreshold: number;
    purchasePrice?: number;
    sellingPrice?: number;
}

// --- FINANCIAL TYPES ---
export type PaymentMethod = 'pix' | 'cash' | 'credit_card' | 'debit_card' | 'transfer';
export type PaymentStatus = 'paid' | 'pending' | 'overdue';

export interface Installment {
    id: string;
    number: number; // 1, 2, 3...
    amount: number;
    dueDate: string; // ISO Date
    status: PaymentStatus;
    paidDate?: string;
    method?: PaymentMethod;
}

export interface FinancialRecord {
    id: string;
    clientId?: string;
    clientName: string;
    description: string; // e.g. "Jogo + Ebó"
    totalAmount: number;
    createdAt: string;
    installments: Installment[];
    isFullyPaid: boolean;
}

// --- AGENDA TYPES ---
export type EventType = 'return_16' | 'cycle_7' | 'cycle_3' | 'restriction' | 'offering' | 'other';

export interface AgendaEvent {
    id: string;
    clientName: string;
    clientPhone?: string;
    date: string; // ISO Date
    type: EventType;
    description: string;
    completed: boolean;
    oduContext?: string;
}

export interface HerbInfo {
    yorubaName: string;
    scientificName: string;
    commonName: string;
    imageUrl: string;
    description: string;
    classification?: 'ero' | 'gun' | 'none'; // ero=fria, gun=quente
    element?: 'water' | 'earth' | 'air' | 'fire';
    orishas?: string[];
    liturgy?: string; // Uso litúrgico específico
}

export interface LoadingState {
    isLoading: boolean;
    message?: string;
}

export type Language = 'pt-BR' | 'pt-PT' | 'en' | 'es' | 'yo';

export interface IreOsogboType {
    type: 'IRE' | 'OSOGBO';
    subType: string;
    description: string;
}
