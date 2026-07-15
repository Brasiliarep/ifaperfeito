
import { InventoryItem } from '../types';

export interface AssentamentoGuide {
    id: string;
    orisha: string;
    title: string;
    description: string;
    category: 'igba' | 'offering';
    materials: string[];
    steps: string; 
    tags: string[]; // For search
    ofo: string; // New field for consecration prayer
}

export const ASSENTAMENTOS_DB: AssentamentoGuide[] = [
    // --- IGBA (ASSENTAMENTOS) ---
    {
        id: 'igba_orunmila',
        orisha: 'Orunmila',
        title: 'Igba Orunmila (O Pote da Vida)',
        description: 'O fundamento máximo do Babalawo. A testemunha do destino.',
        category: 'igba',
        materials: [
            'Ikin Ifá (16 a 21 sementes consagradas)',
            'Pote de Porcelana ou Madeira com tampa',
            'Pó de Iyerosun',
            'Pena de Ekodidé',
            'Búzios (Owo Eyo)',
            'Otas (Pedras redondas)',
            'Ewe Ifá (Folhas sagradas)',
            'Oti (Gim) e Epo (Dendê)'
        ],
        steps: "1. Lavagem dos Ikins com Omiero especial (folhas de Ifá + sangue se houver iniciação).\n2. Colocação do Iyerosun no fundo.\n3. Os Ikins descansam sobre o pó.\n4. O Ekodidé é fixado na tampa ou dentro.\n5. Alimenta-se com Eja Aro (Bagre), Eku (Rato) e Obí.",
        tags: ['ifa', 'destino', 'adivinhação', 'babalawô'],
        ofo: "Orunmila, Eleri Ipin, Ibikeji Olodumare. A je ju oogun. Obiriti, A p'jo Iku da. (Orunmila, testemunha do destino, vice de Deus. Mais eficaz que remédio. Aquele que muda o dia da morte.)"
    },
    {
        id: 'igba_esu_yangi',
        orisha: 'Esu',
        title: 'Esu Yangí (Laterita)',
        description: 'A forma mais antiga e primordial de Esu. O mensageiro divino.',
        category: 'igba',
        materials: [
            'Pedra Yangí (Laterita vermelha do rio)',
            'Prato de barro (Awo)',
            'Epo Pupa (Dendê abundante)',
            'Oti (Gim)',
            'Atare (Pimenta da Costa)',
            'Moedas antigas',
            'Búzios abertos'
        ],
        steps: "1. Lavar a pedra Yangí para despertar o espírito.\n2. Colocar no prato.\n3. Cercar com búzios e moedas.\n4. Soprar Oti e mastigar Atare sobre ele.\n5. Cobrir com muito Dendê.\n6. Nunca usar Aje (manteiga de cor) neste Esu.",
        tags: ['exu', 'caminhos', 'proteção', 'mensageiro'],
        ofo: "Esu Odara, omokunrin Idolofin. O le sonso sori ori ese elese. Ko je, ko je ki eni nje gbe mi. (Exu Odara, homem forte de Idolofin. Ele não come, e não deixa ninguém comer sem dividir.)"
    },
    {
        id: 'igba_odu',
        orisha: 'Odu',
        title: 'Igba Odu (Igbadu)',
        description: 'A Cabaça da Existência. O poder feminino supremo que sanciona Ifá. Estritamente para iniciados de alto nível.',
        category: 'igba',
        materials: [
            'Cabaça grande cortada horizontalmente',
            '4 Cabaças menores internas',
            'Efun, Osun, Edu (Carvão), Aro (Anil)',
            'Pássaro (simbólico)',
            'Areia do mar e do rio',
            'Algodão'
        ],
        steps: "1. Segredo absoluto de Igbodu. Não pode ser descrito em detalhes para não iniciados.\n2. Envolve a representação dos 4 elementos e direções.\n3. Jamais deve ser aberta após consagrada sem rituais pesados de propiciação.",
        tags: ['iyami', 'poder', 'feminino', 'cabaça'],
        ofo: "Iya mi Osoronga. A pani ma wa'gun. Olokiki oru. (Minhas Mães Osoronga. Aquelas que matam sem usar remédio. Famosas na noite.)"
    },
    {
        id: 'igba_ogun',
        orisha: 'Ogun',
        title: 'Assentamento de Ogun',
        description: 'Para proteção, caminhos abertos e vitória.',
        category: 'igba',
        materials: [
            'Pedra de Ferro (Minério)',
            'Ferramentas de Ferro (7 ou 21)',
            'Corrente de Ferro',
            'Marias (Folha de Dendezeiro)',
            'Epo Pupa (Dendê)',
            'Inhame Assado (Isu)',
            'Cão (simbólico/ferro) ou Facão',
            'Ewe Ogun (Peregun, Akoko)'
        ],
        steps: "1. Lavagem das ferramentas com Omiero e Oti.\n2. Arrumação no alguidar ou chão.\n3. Temperar com Dendê e Sal.\n4. Invocar Ogun com Orikis.\n5. Oferecer Inhame (Isu).",
        tags: ['guerra', 'ferro', 'trabalho', 'vencedor'],
        ofo: "Ogun Lakaye, Osinmole. Onile kangun-kangun ode Orun. O ni omi s'ile, f'eje we. (Ogun, chefe dos espíritos. Dono de muitas casas no céu. Tem água em casa, mas banha-se com sangue.)"
    },
    {
        id: 'igba_sango',
        orisha: 'Sango',
        title: 'Assentamento de Sango (Ayra/Baru)',
        description: 'Justiça, vitória sobre inimigos e estratégia.',
        category: 'igba',
        materials: [
            'Edun Ara (Pedra de Raio)',
            'Orogbo (21)',
            'Ose Dudu (Sabão da Costa)',
            'Gamela de Madeira (Odo)',
            'Oxe (Machado Duplo) de Madeira ou Cobre',
            'Sere (Chocalho)',
            'Epo Pupa (Dendê)',
            'Amalá (Quiabo batido)',
            'Tartaruga (Casco/Símbolo)'
        ],
        steps: "1. Lavar as Edun Ara com folhas de Tete e Odundun.\n2. Arrumar na gamela.\n3. Colocar o Oxe em destaque.\n4. Oferecer Orogbo e Amalá bem quente.",
        tags: ['justiça', 'trovão', 'rei', 'fogo'],
        ofo: "Sango Olukoso. O n yin ina l'enu. O n ro bi ojo. (Sango, rei de Koso. Ele cospe fogo pela boca. Ele troveja como a chuva.)"
    },
    {
        id: 'igba_osun',
        orisha: 'Osun',
        title: 'Assentamento de Osun',
        description: 'Fertilidade, riqueza, amor e feitiçaria (Iyami).',
        category: 'igba',
        materials: [
            'Otás de Rio (5, arredondadas)',
            'Búzios (16)',
            'Pente de Latão/Ouro',
            'Espelho',
            'Abébé (Leque) de Latão',
            'Louça/Porcelana Amarela ou Branca',
            'Mel (Oyin)',
            'Osun (Pó Vermelho)',
            'Ewe Osun (Macaça, Odundun)'
        ],
        steps: "1. Buscar as pedras no rio com oferenda.\n2. Lavar com Omiero doce.\n3. Arrumar na sopeira de louça.\n4. Cobrir com Mel e Osun.\n5. Oferecer Omolokun (Feijão Fradinho).",
        tags: ['amor', 'ouro', 'riqueza', 'fertilidade'],
        ofo: "Ore Yeye o! Osun aare wa! Eleyele l'omi. (Salve a Mãezinha! Osun, bela dama! Dona do pente de ouro nas águas.)"
    },
    {
        id: 'igba_ori',
        orisha: 'Ori',
        title: 'Igba Ori (Assentamento Pessoal)',
        description: 'O Deus pessoal de cada um. Fundamental para todos.',
        category: 'igba',
        materials: [
            'Ile Ori (Casa de Ori - Couro e Búzios)',
            'Búzios (41)',
            'Manteiga de Karité (Ori)',
            'Pano Branco',
            'Areia de Praia ou Rio',
            'Obi Abata'
        ],
        steps: "1. Costurar o Ile Ori.\n2. Lavar os Búzios.\n3. Consagrar com o suor e a saliva do dono.\n4. Guardar em local alto e limpo.",
        tags: ['cabeça', 'destino', 'pessoal'],
        ofo: "Ori lo da mi. Ko s'osa ti i da 'ni l'ehi Ori. (Foi Ori quem me criou. Não há Orixá que apoie o homem mais que seu próprio Ori.)"
    },

    // --- ADIMU (OFERENDAS/COMIDAS) ---
    {
        id: 'adimu_sango_amala',
        orisha: 'Sango',
        title: 'Amalá de Sango',
        description: 'A comida predileta do Rei. Para acalmar e pedir justiça.',
        category: 'offering',
        materials: ['Quiabos (12 ou 120)', 'Farinha de Inhame (Elubo)', 'Dendê', 'Camarão Seco'],
        steps: "1. Corte os quiabos em rodelas finas.\n2. Refogue no dendê com camarão.\n3. Faça um pirão (oka) com a farinha de inhame e água quente.\n4. Sirva o refogado sobre o pirão na gamela. Tem que estar quente.",
        tags: ['comida', 'oferenda', 'xango'],
        ofo: "Sango, wa gba ounje re. Ma je ki a ri ibinu re. (Sango, venha aceitar sua comida. Não nos deixe ver sua raiva.)"
    },
    {
        id: 'adimu_osun_omolokun',
        orisha: 'Osun',
        title: 'Omolokun (Feijão com Ovos)',
        description: 'Para fertilidade e doçura.',
        category: 'offering',
        materials: ['Feijão Fradinho', 'Cebola', 'Camarão', 'Dendê', 'Ovos cozidos (5)'],
        steps: "1. Cozinhe o feijão fradinho.\n2. Refogue a cebola e camarão no dendê.\n3. Misture o feijão.\n4. Enfeite com os 5 ovos cozidos descascados por cima.",
        tags: ['comida', 'oferenda', 'oxum', 'ovos'],
        ofo: "Osun, fun mi ni ire omo, ire aje. (Osun, me dê a sorte de filhos, a sorte de riqueza.)"
    },
    {
        id: 'adimu_obatala_igbin',
        orisha: 'Obatala',
        title: 'Inhame Pilado (Iyan)',
        description: 'Comida branca para paz e clareza.',
        category: 'offering',
        materials: ['Inhame do Norte', 'Manteiga de Karité', 'Algodão'],
        steps: "1. Cozinhe o inhame apenas em água.\n2. Pile no pilão até virar uma massa elástica.\n3. Faça bolas brancas.\n4. Sirva frio/morno. Não use dendê nem sal.",
        tags: ['comida', 'oferenda', 'oxala', 'branco'],
        ofo: "Obatala, fun mi ni alafia. Pa mi mo. (Obatala, me dê paz. Proteja-me.)"
    },
    {
        id: 'adimu_esu_eko',
        orisha: 'Esu',
        title: 'Eko (Acaçá) com Dendê',
        description: 'A base de tudo. Para abrir caminhos.',
        category: 'offering',
        materials: ['Farinha de Milho Branco', 'Folha de Bananeira', 'Dendê'],
        steps: "1. Cozinhe a farinha com água até engrossar (mingau duro).\n2. Envolva na folha de bananeira ainda quente.\n3. Espere esfriar.\n4. Abra e regue com um fio de dendê ao oferecer.",
        tags: ['comida', 'oferenda', 'exu', 'milho'],
        ofo: "Esu, la ona fun mi. (Exu, abra o caminho para mim.)"
    }
];
