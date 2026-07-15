import { SIGN_NAMES, NAME_TO_VALUE, valueToLeg } from '../utils/oduLogic';

export interface OduDetails {
    name: string;
    binary: string; // e.g., "1111-1111"
    rank: number; // 1-256
    itan: string;
    meaning: string;
    orishas: string[];
    interpretations: {
        general: string;
        love: string;
        money: string;
        health: string;
    };
}

// Standard Ifa Order for the 16 Mejis (used for ranking)
export const IFA_ORDER = [
    'Ogbe', 'Oyeku', 'Iwori', 'Odi', 
    'Irosun', 'Owonrin', 'Obara', 'Okanran', 
    'Ogunda', 'Osa', 'Ika', 'Oturupon', 
    'Otura', 'Irete', 'Ose', 'Ofun'
];

// Helper to generate binary representation (I/II)
const getBinaryVisual = (sign1: string, sign2: string): string => {
    try {
        const val1 = NAME_TO_VALUE[sign1];
        const val2 = NAME_TO_VALUE[sign2];
        
        if (val1 === undefined || val2 === undefined) return "0000-0000";

        const leg1 = valueToLeg(val1); // Right (or first)
        const leg2 = valueToLeg(val2); // Left (or second)

        // Format: "I I II I" (Right) + " " + "II I I II" (Left)
        // Actually, usually displayed as two columns. 
        // Here we just return a raw string that the UI can parse: "0101-1110" (0=Closed/II, 1=Open/I)
        
        const toBin = (l: string[]) => l.map(s => s === 'open' ? '1' : '0').join('');
        return `${toBin(leg1)}-${toBin(leg2)}`;
    } catch (e) {
        return "0000-0000";
    }
};

const ODU_DETAILS: Record<string, Partial<OduDetails>> = {
    // ... (Existing Mejis) ...
    'Ejiogbe': {
        itan: "A história de como Ejiogbe se tornou o rei dos Odu. Ele foi o único que fez o sacrifício completo de humildade antes de vir à Terra. Fala sobre a cabeça (Ori) buscando seu destino.",
        meaning: "O princípio da luz, expansão, alinhamento perfeito e vitória. Representa o despertar, o início de ciclos e a bênção pura.",
        orishas: ["Obatala", "Ori", "Eshu"],
        interpretations: {
            general: "Caminho aberto, vitória sobre inimigos, necessidade de manter a ética.",
            love: "Relacionamento abençoado, mas cuidado com o ego.",
            money: "Prosperidade garantida se houver bom caráter.",
            health: "Boa saúde, mas cuidado com dores de cabeça e estresse."
        }
    },
    // ... (Other Mejis kept as is, just adding new ones below) ...
    'Ose Tura': {
        itan: "Ose Tura é o mensageiro especial de Eshu. Foi ele quem carregou o ebó para o céu quando todos os outros falharam. Sem Ose Tura, nenhum sacrifício é aceito.",
        meaning: "O transportador do Ebó. A comunicação entre o Céu e a Terra. Vitória através do sacrifício e da astúcia.",
        orishas: ["Eshu", "Osun"],
        interpretations: {
            general: "Faça o ebó imediatamente. Sucesso garantido se houver sacrifício.",
            love: "Amor fértil e doce, mas requer atenção.",
            money: "Dinheiro virá através de conexões e comunicação.",
            health: "Cuidado com a garganta e a fala."
        }
    },
    'Irete Iwori': {
        itan: "Irete Iwori (Atiwa) fala sobre a iniciação e a paciência. A história de como a podridão se transforma em adubo para a vida.",
        meaning: "Transformação, decomposição que gera vida, paciência, iniciação tântrica ou profunda.",
        orishas: ["Babalu Aye", "Osun"],
        interpretations: {
            general: "O que parece ruim é adubo para o novo. Tenha paciência.",
            love: "Relação que precisa ser curada ou transformada.",
            money: "Ganhos lentos, vindos de coisas antigas.",
            health: "Cuidado com infecções ou pele."
        }
    },
    // ... (Rest of Mejis) ...
    'Oyeku Meji': {
        itan: "Oyeku Meji traz a noite e o mistério. É o Odu que introduziu a morte, mas também a honra aos ancestrais.",
        meaning: "O fim de ciclos, a sabedoria ancestral, o feminino, a noite. Representa proteção contra a morte prematura.",
        orishas: ["Egun", "Oya", "Shango"],
        interpretations: {
            general: "Necessidade de cultuar ancestrais. Fim de um sofrimento.",
            love: "Relacionamento profundo, cármico.",
            money: "Ganhos através de heranças ou comércio noturno.",
            health: "Cuidado com doenças ocultas ou depressão."
        }
    },
    'Ogbe Oyeku': {
        itan: "O dia em que a luz (Ogbe) visitou a escuridão (Oyeku) e trouxe redenção. Fala sobre o fim do sofrimento através da consciência.",
        meaning: "O Redentor. A luz que dissipa as trevas. Solução de problemas antigos.",
        orishas: ["Obatala", "Egun"],
        interpretations: {
            general: "Um problema antigo será resolvido. Alívio.",
            love: "Reconciliação ou clareza em uma relação confusa.",
            money: "Fim de dívidas ou período de escassez.",
            health: "Recuperação de doença longa."
        }
    },
    'Oyeku Logbe': {
        itan: "A chuva que cai para limpar a terra. Oyeku (nuvem) cobrindo Ogbe (sol), trazendo a chuva benéfica.",
        meaning: "Chuva, limpeza, proteção contra inimigos, mas cuidado com a arrogância.",
        orishas: ["Sango", "Oya"],
        interpretations: {
            general: "Limpeza espiritual necessária. Proteção contra fofocas.",
            love: "Relação intensa, tempestuosa mas fértil.",
            money: "Ganhos inesperados, como chuva.",
            health: "Cuidado com resfriados ou umidade."
        }
    },
    'Iwori Meji': {
        itan: "Iwori viajou para o mar e para a floresta. Fala sobre ver as coisas claramente e a importância da perspectiva.",
        meaning: "Transformação, análise, o chacal que observa. Representa a lógica e a visão espiritual.",
        orishas: ["Ifá", "Eshu"],
        interpretations: {
            general: "Pense antes de agir. Mudanças estão por vir.",
            love: "Paixão intensa mas passageira se não houver diálogo.",
            money: "Oportunidades intelectuais.",
            health: "Problemas de visão ou digestão."
        }
    },
    'Odi Meji': {
        itan: "Odi cercou seus inimigos. Fala sobre proteção, barreiras e o útero materno.",
        meaning: "Bloqueio, proteção, renascimento, o feminino reprodutivo.",
        orishas: ["Yemoja", "Ogun"],
        interpretations: {
            general: "Você está protegido, mas pode se sentir estagnado.",
            love: "Fertilidade alta. Relacionamento seguro.",
            money: "Ganhos lentos mas constantes.",
            health: "Questões reprodutivas ou nas nádegas."
        }
    },
    'Irosun Meji': {
        itan: "Irosun cavou um buraco fundo para guardar seus tesouros. Fala sobre memória, ancestralidade e cautela.",
        meaning: "Memória, sangue, menstruação, buracos, depressão ou profundidade emocional.",
        orishas: ["Shango", "Egun", "Osun"],
        interpretations: {
            general: "Não confie em todos. Guarde seus segredos.",
            love: "Sofrimento emocional ou saudade.",
            money: "Herança ou dinheiro vindo do passado.",
            health: "Problemas no sangue ou olhos."
        }
    },
    'Owonrin Meji': {
        itan: "Owonrin inverteu a ordem das coisas. Fala sobre o caos necessário para a mudança e acidentes.",
        meaning: "Inversão, karma, consequências de ações passadas, magia.",
        orishas: ["Eshu", "Egun"],
        interpretations: {
            general: "O que vai, volta. Cuidado com acidentes.",
            love: "Relações tumultuadas.",
            money: "Perdas repentinas ou ganhos inesperados.",
            health: "Acidentes físicos, mãos ou pés."
        }
    },
    'Obara Meji': {
        itan: "Obara era pobre e ignorado, mas através de um sacrifício (uma abóbora), tornou-se rico. O rei da prosperidade.",
        meaning: "Prosperidade repentina, ego, comércio, comunicação.",
        orishas: ["Shango", "Oshun", "Aje"],
        interpretations: {
            general: "Mudança de sorte para melhor. Cuidado com a arrogância.",
            love: "Atração magnética.",
            money: "Grande riqueza potencial.",
            health: "Pressão alta ou estresse."
        }
    },
    'Okanran Meji': {
        itan: "Okanran foi o único que desafiou a ordem. Fala sobre justiça, disputas e falar a verdade.",
        meaning: "Justiça, problemas legais, disputas, novos caminhos difíceis.",
        orishas: ["Shango", "Eshu"],
        interpretations: {
            general: "Problemas com a lei ou autoridade. Diga a verdade.",
            love: "Brigas constantes.",
            money: "Disputas por dinheiro.",
            health: "Problemas cardíacos ou dores de cabeça."
        }
    },
    'Ogunda Meji': {
        itan: "Ogunda dividiu o peixe ao meio para satisfazer a todos. O caminho do guerreiro e do trabalho duro.",
        meaning: "Trabalho, ferro, guerra, cirurgia, remoção de obstáculos.",
        orishas: ["Ogun"],
        interpretations: {
            general: "Lute pelo que quer. Vitória através do esforço.",
            love: "Disputas ou proteção excessiva.",
            money: "Ganho pelo suor do trabalho.",
            health: "Cirurgias ou cortes."
        }
    },
    'Osa Meji': {
        itan: "Osa trouxe o vento e as feiticeiras (Iyami). Fala sobre mudanças bruscas e forças invisíveis.",
        meaning: "Vento, mudança, feitiçaria, o poder feminino perigoso.",
        orishas: ["Oya", "Iyami Aje"],
        interpretations: {
            general: "Mudanças incontroláveis. Respeite as mulheres.",
            love: "Instabilidade emocional.",
            money: "Dinheiro voa fácil.",
            health: "Problemas respiratórios."
        }
    },
    'Ika Meji': {
        itan: "Ika controlou a serpente. Fala sobre restrição, controle e maldade oculta.",
        meaning: "Controle, retração, a cobra, feitiço, maldade.",
        orishas: ["Osoosi", "Eshu"],
        interpretations: {
            general: "Cuidado com quem te cerca. Recolha-se.",
            love: "Ciúmes possessivos.",
            money: "Economize, não gaste.",
            health: "Cãibras ou paralisia."
        }
    },
    'Oturupon Meji': {
        itan: "Oturupon carrega o fardo do mundo. Fala sobre resistência, doenças e teimosia.",
        meaning: "Resistência, doença, teimosia, a terra, o urso.",
        orishas: ["Babalu Aye", "Ile"],
        interpretations: {
            general: "Seja resiliente. Cuide da saúde.",
            love: "Relação duradoura mas difícil.",
            money: "Trabalho pesado.",
            health: "Doenças infecciosas ou de pele."
        }
    },
    'Otura Meji': {
        itan: "Otura libertou os cativos com sua sabedoria. Fala sobre paz, liberdade e o poder da palavra.",
        meaning: "Liberdade, paz mental, inteligência, diplomacia.",
        orishas: ["Obatala", "Ifá"],
        interpretations: {
            general: "Use a mente, não a força. Busque a paz.",
            love: "Relacionamento intelectual e livre.",
            money: "Ganhos através do comércio ou escrita.",
            health: "Problemas nervosos leves."
        }
    },
    'Irete Meji': {
        itan: "Irete pisou na terra para marcá-la. Fala sobre pressão, iniciação e morte/renascimento.",
        meaning: "Pressão, iniciação, terra, varíola, humilhação que leva à exaltação.",
        orishas: ["Babalu Aye", "Ogun"],
        interpretations: {
            general: "Você será testado. Mantenha a fé.",
            love: "Relação cármica difícil.",
            money: "Perdas antes de ganhos.",
            health: "Pernas e sangue."
        }
    },
    'Ose Meji': {
        itan: "Ose conquistou pelo amor e pela beleza. Fala sobre vitória sobre inimigos, amor e fertilidade.",
        meaning: "Vitória, amor, dinheiro, beleza, conquista.",
        orishas: ["Oshun", "Aje"],
        interpretations: {
            general: "Vitória sobre adversários. Alegria.",
            love: "Grande amor e fertilidade.",
            money: "Prosperidade e luxo.",
            health: "Rins e sangue."
        }
    },
    'Ofun Meji': {
        itan: "Ofun criou o universo com seu sopro. O grande milagre. Fala sobre generosidade e mistério.",
        meaning: "O grande mistério, milagre, generosidade, o branco total.",
        orishas: ["Obatala", "Oduduwa"],
        interpretations: {
            general: "Um milagre vai acontecer. Dê para receber.",
            love: "Amor puro e divino.",
            money: "Riqueza abundante.",
            health: "Problemas respiratórios ou inchaço."
        }
    }
};

// Generate the full list
export const getAllOdu = (): OduDetails[] => {
    const list: OduDetails[] = [];
    let rank = 1;

    // 1. Add Mejis first (Standard convention in some lists, or strictly by order)
    // Let's follow the standard 1-256 order: Ogbe (1), Ogbe Oyeku (2), Ogbe Iwori (3)...
    
    // Outer loop: Right Leg (The leading sign in many systems, or Left? 
    // In "Ogbe Oyeku", Ogbe is usually Right leg in Opele notation, but written first.
    // Let's assume standard "Book" order: 
    // 1. Ogbe Meji
    // 2. Ogbe Oyeku
    // 3. Ogbe Iwori...
    
    // We iterate through the IFA_ORDER for the FIRST name (Right Leg usually)
    for (const sign1 of IFA_ORDER) {
        // Iterate through the IFA_ORDER for the SECOND name (Left Leg)
        for (const sign2 of IFA_ORDER) {
            let name = "";
            let details: Partial<OduDetails> = {};
            
            if (sign1 === sign2) {
                name = sign1 === 'Ogbe' ? 'Ejiogbe' : 
                       sign1 === 'Oyeku' ? 'Oyeku Meji' : 
                       `${sign1} Meji`;
                details = ODU_DETAILS[name] || {};
            } else {
                name = `${sign1} ${sign2}`;
                // Check if we have specific details for this Omo Odu
                if (ODU_DETAILS[name]) {
                    details = ODU_DETAILS[name];
                } else {
                    // Synthetic details for Omo Odu - Enhanced Logic
                    const parent1 = ODU_DETAILS[sign1 === 'Ogbe' ? 'Ejiogbe' : sign1 === 'Oyeku' ? 'Oyeku Meji' : `${sign1} Meji`] || {};
                    const parent2 = ODU_DETAILS[sign2 === 'Ogbe' ? 'Ejiogbe' : sign2 === 'Oyeku' ? 'Oyeku Meji' : `${sign2} Meji`] || {};
                    
                    const meaning1 = parent1.meaning ? parent1.meaning.split('.')[0] : "Energia desconhecida";
                    const meaning2 = parent2.meaning ? parent2.meaning.split('.')[0] : "influência desconhecida";

                    details = {
                        itan: `Este Odu nasce do encontro entre ${sign1} e ${sign2}. A tradição conta que ${sign1} traz a energia de "${meaning1}" para interagir com ${sign2}, que responde com "${meaning2}".`,
                        meaning: `A síntese entre ${sign1} (Regente) e ${sign2}. Representa ${meaning1.toLowerCase()} manifestando-se através de ${meaning2.toLowerCase()}.`,
                        orishas: [...new Set([...(parent1.orishas || []), ...(parent2.orishas || [])])],
                        interpretations: {
                            general: `Momento de ${meaning1.toLowerCase()} influenciando ${meaning2.toLowerCase()}.`,
                            love: `A relação reflete a dinâmica entre ${sign1} e ${sign2}. Busque equilíbrio.`,
                            money: `Fluxo financeiro depende da harmonia entre ${sign1} e ${sign2}.`,
                            health: `Atenção às áreas regidas por ambos os Odu.`
                        }
                    };
                }
            }

            list.push({
                name: name,
                binary: getBinaryVisual(sign1, sign2),
                rank: rank++,
                itan: details.itan || "História aguardando transcrição.",
                meaning: details.meaning || "Significado em análise.",
                orishas: details.orishas || ["Ifá"],
                interpretations: details.interpretations || {
                    general: "Interpretação em breve.",
                    love: "Em breve.",
                    money: "Em breve.",
                    health: "Em breve."
                }
            });
        }
    }
    return list;
};
