
// Rituais de Alta Complexidade (Oogun Giga)
// AVISO: Conteúdo sensível e avançado.

export interface ComplexRitual {
    id: string;
    title: string;
    purpose: string;
    oduReference: string;
    description: string;
    ingredients: string[];
    instructions: string;
    ofo: string;
}

export const OogunGigaList: ComplexRitual[] = [
    {
        id: 'giga_abiku',
        title: 'Quebra de Pacto Abiku',
        purpose: 'Para crianças que nascem e morrem repetidamente (Emere).',
        oduReference: 'Owonrin Meji',
        description: 'Ritual para cortar a ligação da criança com a sociedade do céu (Egbe Orun) e fixá-la na terra.',
        ingredients: [
            '1 Bode Preto (Ewure Dudu)',
            'Corrente de Ferro usada',
            'Pano Vermelho',
            '7 Oketes (Ratos grandes)',
            'Folha de Abirikolo',
            'Efun, Osun, Edu',
            'Cabaça Gigante'
        ],
        instructions: "1. Levar a criança para a floresta sagrada (Igbo Oro).\n2. Banhar a criança com Omiero de Abirikolo.\n3. Prender a corrente no tornozelo da criança e na árvore Iroko.\n4. Sacrificar o Bode sobre a corrente (não na criança).\n5. Quebrar a corrente com uma pedra, simbolizando o rompimento do pacto.\n6. Enterrar os restos aos pés da árvore.\n7. Vestir a criança com pano vermelho e nunca mais voltar lá.",
        ofo: "Egbe Orun, e gbo! Omo yi ti di omo aye. A ja dekun, a ja dekun. Iku ma pa omo yi mo. (Ouvam, sociedade do céu! Esta criança agora pertence à terra. Quebramos a corrente. A morte não a levará mais.)"
    },
    {
        id: 'giga_ori_bibo',
        title: 'Troca de Cabeça (Iparo Ori)',
        purpose: 'Para salvar alguém da morte iminente (Iku) trocando o destino.',
        oduReference: 'Oyeku Meji',
        description: 'Transferência da sentença de morte de um humano para um animal de grande porte. Extremamente perigoso.',
        ingredients: [
            '1 Carneiro Adulto (Agbo) - Deve ter o mesmo sexo do doente',
            'Roupas velhas do doente',
            'Cabelo e unhas do doente',
            'Tronco de Bananeira (Ogede)',
            'Pano Branco e Preto',
            '21 Búzios',
            'Iyerosun marcado com Oyeku Meji'
        ],
        instructions: "1. O doente deve dormir com o Carneiro amarrado ao pé da cama por 3 noites.\n2. Na 3ª noite, vestir o Carneiro com as roupas do doente.\n3. Ir para a encruzilhada à meia-noite.\n4. Recitar o Ofo transferindo o nome do doente para o animal.\n5. Sacrificar o Carneiro declarando que 'Fulano morreu'.\n6. Enterrar o animal como se fosse um humano (com caixão).\n7. O doente toma banho de sangue (Eje) de pombo branco depois para limpar.",
        ofo: "Iku, gba eranko yi. Fi eniyan sile. A pa Agbo dipo Eniyan. Iku ma pa [Nome]. (Morte, aceite este animal. Deixe o humano. Matamos o carneiro no lugar da pessoa. Morte não leve [Nome].)"
    },
    {
        id: 'giga_epe',
        title: 'Retorno de Maldição (Apadà Giga)',
        purpose: 'Devolver feitiço mortal enviado por inimigos poderosos.',
        oduReference: 'Okanran Meji',
        description: 'Ritual de guerra para refletir ataque espiritual fatal.',
        ingredients: [
            'Espelho grande',
            'Pólvora (Etu)',
            'Enxofre',
            'Cabaça quebrada',
            'Nome do inimigo escrito ao contrário',
            'Galo Preto',
            'Pimenta da Costa (Atare)'
        ],
        instructions: "1. Riscar Okanran Meji no chão com Enxofre.\n2. Colocar o espelho sobre o risco.\n3. Colocar a pólvora sobre o espelho.\n4. Sacrificar o galo deixando o sangue cair na pólvora (Cuidado!).\n5. Acender a pólvora (Explosão).\n6. Gritar o nome do inimigo 3 vezes.\n7. Jogar a cabaça quebrada na direção da casa dele.",
        ofo: "Bi aje ba n ke, a pa ohun da. Ina gba e! Ibi pada si olubi! (Se a bruxa gritar, calamos sua voz. O fogo te pega! O mal volta ao remetente!)"
    }
];
