
// ============================================================================
// DATABASE CENTRAL - IFÁ OLUWO (V9.0 - POPULAÇÃO MASSIVA)
// ============================================================================

export type NivelFundamento = 'BÁSICO (Iniciante)' | 'MÉDIO (Padrão)' | 'COMPLETO (Sacerdotal)' | string;

export interface RitualLevel {
    tipo: NivelFundamento;
    estimativa_materiais: number;
    materiais: string[];
    preparo: string[];
    ofo?: string;
    traducao?: string;
    atencao?: string;
}

export interface OogunItem {
    id: string;
    title: string;
    purpose: string; 
    nomeYoruba: string;
    category: 'money' | 'love' | 'health' | 'protection' | 'victory' | 'justice' | 'fertility' | 'power';
    subCategory: 'akose' | 'ofo' | 'iwosan' | 'onde' | 'imule' | 'giga';
    oduReference: string;
    complexity: 'Baixa' | 'Média' | 'Alta' | 'Perigosa';
    tags: string[];
    niveis: RitualLevel[]; 
}

export interface AssentamentoMaintenance {
    ciclo: string;
    oferenda_simples: string;
    proibicoes: string[];
}

export interface AssentamentoItem {
    id: string;
    orisha: string;
    title: string;
    nomeYoruba: string;
    description: string;
    category: 'igba' | 'offering';
    niveis: RitualLevel[];
    ofo: string;
    maintenance: AssentamentoMaintenance;
}

// ----------------------------------------------------------------------------
// DB_AKOSE: 30 ITENS (10 Dinheiro, 10 Amor, 5 Vitória, 5 Proteção)
// ----------------------------------------------------------------------------
export const DB_AKOSE: OogunItem[] = [
    // --- CATEGORIA: DINHEIRO (AWURE) ---
    {
        id: 'ak_awure_owo_nla',
        category: 'money', subCategory: 'akose',
        title: 'Awuré Owo Nla (Grande Fortuna)', nomeYoruba: 'Oṣè Awuré Owo',
        purpose: 'Sabão para atrair grandes somas de dinheiro.',
        oduReference: 'Ejiogbe', complexity: 'Média', tags: ['Dinheiro', 'Riqueza'],
        niveis: [{
            tipo: 'BÁSICO', estimativa_materiais: 120,
            materiais: ['Ose Dudu', 'Ewe Aje', 'Oyin', 'Efun'],
            preparo: ['Pilar as folhas de Ewe Aje.', 'Misturar as folhas piladas com o Ose Dudu.', 'Adicionar Oyin e Efun ralado à massa.', 'Usar no banho.'],
            ofo: 'Aje wa! Ewe Aje ma je ki ebi pa mi.', traducao: 'Riqueza venha! Folha da riqueza não deixe a fome me matar.'
        }]
    },
    {
        id: 'ak_osole_owo',
        category: 'money', subCategory: 'akose',
        title: 'Osole Owo (Magia de Pote)', nomeYoruba: 'Oṣolé Gbigbona',
        purpose: 'Pote de atração financeira rápida.',
        oduReference: 'Ose Meji', complexity: 'Alta', tags: ['Dinheiro', 'Urgente'],
        niveis: [{
            tipo: 'COMPLETO', estimativa_materiais: 800,
            materiais: ['Pote de Barro', '1 Pombo Branco', 'Ewe Sawerepepe', 'Gim (Oti)', '21 Moedas'],
            preparo: ['Colocar as 21 moedas no fundo do pote.', 'Cobrir com Ewe Sawerepepe.', 'Sacrificar o Pombo sobre as folhas dentro do pote.', 'Regar com Gim e tampar.', 'Rezar e enterrar ou guardar em local alto.'],
            ofo: 'Sawerepepe, pe aje wa fun mi. Oti ni mu inu dun.', traducao: 'Sawerepepe, chame a riqueza para mim. O Gim alegra o coração.'
        }]
    },
    {
        id: 'ak_eyonu_aje',
        category: 'money', subCategory: 'akose',
        title: 'Eyonu Aje (Favor das Bruxas)', nomeYoruba: 'Eyonu Awon Agba',
        purpose: 'Acalmar as Mães Ancestrais para permitir o fluxo de dinheiro.',
        oduReference: 'Osa Meji', complexity: 'Alta', tags: ['Dinheiro', 'Iyami'],
        niveis: [{
            tipo: 'MÉDIO', estimativa_materiais: 300,
            materiais: ['16 Ovos', 'Dendê (Epo)', 'Iyerosun', 'Alguidar'],
            preparo: ['Arrumar os 16 Ovos no alguidar.', 'Cobrir abundantemente com Dendê.', 'Marcar Osa Meji no Iyerosun.', 'Soprar o pó sobre os ovos e levar na encruzilhada.'],
            ofo: 'Iyami Osoronga, e ma binu si mi. Eje ki n lowo.', traducao: 'Minhas Mães, não se zanguem comigo. Deixem-me ter dinheiro.'
        }]
    },
    {
        id: 'ak_asina_ola',
        category: 'money', subCategory: 'akose',
        title: 'Asina Ola (Abertura de Caminhos)', nomeYoruba: 'Ose Asina',
        purpose: 'Destravar caminhos financeiros fechados.',
        oduReference: 'Osetura', complexity: 'Média', tags: ['Abertura', 'Dinheiro'],
        niveis: [{
            tipo: 'BÁSICO', estimativa_materiais: 80,
            materiais: ['Ewe Ewuro', 'Ose Dudu', 'Sal'],
            preparo: ['Quinar Ewe Ewuro na água.', 'Misturar o sumo com Ose Dudu.', 'Adicionar Sal à mistura.', 'Banhar-se de manhã.'],
            ofo: 'Ewuro kii ni omi lara ki o ro. Asina fun mi.', traducao: 'Ewuro nunca falta água. Abra o caminho para mim.'
        }]
    },
    {
        id: 'ak_aje_bibo',
        category: 'money', subCategory: 'akose',
        title: 'Aje Bibo (Oferenda à Riqueza)', nomeYoruba: 'Ipese Aje',
        purpose: 'Oferenda direta ao espírito da riqueza.',
        oduReference: 'Ejiogbe', complexity: 'Baixa', tags: ['Dinheiro', 'Oferenda'],
        niveis: [{
            tipo: 'BÁSICO', estimativa_materiais: 50,
            materiais: ['4 Bananas', '4 Ovos Cozidos', 'Mel'],
            preparo: ['Descascar as Bananas e Ovos.', 'Colocar em um prato branco.', 'Regar tudo com Mel.', 'Oferecer a Aje Shaluga.'],
            ofo: 'Aje Shaluga, wa je ogede mi.', traducao: 'Aje Shaluga, venha comer minha banana.'
        }]
    },
    {
        id: 'ak_awure_ile',
        category: 'money', subCategory: 'akose',
        title: 'Awure Ile (Prosperidade do Lar)', nomeYoruba: 'Ero Ile',
        purpose: 'Trazer dinheiro para dentro de casa ou loja.',
        oduReference: 'Iwori Meji', complexity: 'Média', tags: ['Casa', 'Comércio'],
        niveis: [{
            tipo: 'MÉDIO', estimativa_materiais: 150,
            materiais: ['Água de Coco', 'Ewe Akoko', 'Efun'],
            preparo: ['Pilar Ewe Akoko com Efun.', 'Misturar o pó na Água de Coco.', 'Borrifar nos 4 cantos da casa/loja.', 'Rezar pedindo clientes.'],
            ofo: 'Akoko ni fi oye fun ni. Wa fi oye aje fun mi.', traducao: 'Akoko é quem dá títulos. Venha me dar o título de rico.'
        }]
    },
    {
        id: 'ak_osole_giga',
        category: 'money', subCategory: 'akose',
        title: 'Osole Giga (Magia Forte)', nomeYoruba: 'Osole Nla',
        purpose: 'Para grandes empresários e contratos.',
        oduReference: 'Irosun Meji', complexity: 'Alta', tags: ['Negócios', 'Poder'],
        niveis: [{
            tipo: 'COMPLETO', estimativa_materiais: 1500,
            materiais: ['Cabeça de Gato Seca', 'Ewe Orientat', 'Ose Dudu', 'Oti'],
            preparo: ['Queimar a Cabeça de Gato com Ewe Orientat até virar pó.', 'Misturar o pó ao Ose Dudu usando Oti.', 'Colocar em uma cabaça e usar para banho à meia-noite.'],
            ofo: 'Ologbo kii rina. Ki n ri owo nla.', traducao: 'O gato não perde o caminho. Que eu encontre grande dinheiro.'
        }]
    },
    {
        id: 'ak_owo_tetewa',
        category: 'money', subCategory: 'akose',
        title: 'Owo Tetewa (Dinheiro Rápido)', nomeYoruba: 'Awure Yara',
        purpose: 'Para necessidades urgentes de dinheiro.',
        oduReference: 'Owonrin Meji', complexity: 'Média', tags: ['Urgência', 'Dinheiro'],
        niveis: [{
            tipo: 'BÁSICO', estimativa_materiais: 60,
            materiais: ['Pimenta da Costa (7)', 'Sal', 'Ovo Cru'],
            preparo: ['Quebrar o Ovo em um copo.', 'Adicionar Sal e as 7 Pimentas mastigadas.', 'Misturar e despachar na encruzilhada pedindo rapidez.'],
            ofo: 'Wara wara ni owo n wa.', traducao: 'Rapidamente o dinheiro vem.'
        }]
    },
    {
        id: 'ak_oja_tita',
        category: 'money', subCategory: 'akose',
        title: 'Oja Tita (Vender Rápido)', nomeYoruba: 'Awure Oja',
        purpose: 'Para vender mercadorias encalhadas.',
        oduReference: 'Ogunda Meji', complexity: 'Baixa', tags: ['Vendas', 'Comércio'],
        niveis: [{
            tipo: 'BÁSICO', estimativa_materiais: 40,
            materiais: ['Vassoura Velha (Pedaço)', 'Ewe Efinrin', 'Fogo'],
            preparo: ['Queimar a Vassoura e Ewe Efinrin juntos.', 'Defumar as mercadorias com a fumaça.', 'Rezar chamando compradores.'],
            ofo: 'Igbalé ni n gba ile. Ki n gba owo lowo onibara.', traducao: 'A vassoura varre a casa. Que eu varra o dinheiro dos clientes.'
        }]
    },
    {
        id: 'ak_abami_owo',
        category: 'money', subCategory: 'akose',
        title: 'Abami Owo (Dinheiro Estranho)', nomeYoruba: 'Awure Iyanu',
        purpose: 'Atrair dinheiro de fontes inesperadas.',
        oduReference: 'Okanran Meji', complexity: 'Alta', tags: ['Sorte', 'Jogo'],
        niveis: [{
            tipo: 'MÉDIO', estimativa_materiais: 200,
            materiais: ['Camaleão Seco', 'Ewe Sawerepepe', 'Nota de Dinheiro'],
            preparo: ['Torrar o Camaleão e a folha com a nota de dinheiro.', 'Moer até virar pó.', 'Ingerir uma pitada com Gim pela manhã.'],
            ofo: 'Agemo a pa awo da. Ki awo mi pada si owo.', traducao: 'O camaleão muda de cor. Que minha sorte mude para dinheiro.'
        }]
    },

    // --- CATEGORIA: AMOR (IFERAN) ---
    {
        id: 'ak_iferan_atoka',
        category: 'love', subCategory: 'akose',
        title: 'Iferan Atoka (Atração Fatal)', nomeYoruba: 'Iferan Alagbara',
        purpose: 'Para atrair amor intenso ou casamento.',
        oduReference: 'Ose Meji', complexity: 'Alta', tags: ['Amor', 'Casamento'],
        niveis: [{
            tipo: 'BÁSICO', estimativa_materiais: 100,
            materiais: ['Ewe Omisinmisin', 'Mel', 'Perfume'],
            preparo: ['Pilar a folha até virar pasta.', 'Misturar com Mel e Perfume.', 'Passar no corpo antes de sair.'],
            ofo: 'Omisinmisin a mu ife wa.', traducao: 'A folha doce traz o amor.'
        }]
    },
    {
        id: 'ak_iferan_okunrin',
        category: 'love', subCategory: 'akose',
        title: 'Iferan Okunrin (Atrair Homem)', nomeYoruba: 'Iferan Oko',
        purpose: 'Para mulheres atraírem homens.',
        oduReference: 'Ejiogbe', complexity: 'Média', tags: ['Amor', 'Atração'],
        niveis: [{
            tipo: 'MÉDIO', estimativa_materiais: 150,
            materiais: ['Ewe Amunimuye', 'Ose Dudu', 'Pêlos Pubianos (Opcional)'],
            preparo: ['Torrar a folha Ewe Amunimuye.', 'Misturar o pó ao Ose Dudu.', 'Adicionar elemento pessoal (opcional).', 'Usar no banho.'],
            ofo: 'Amunimuye, mu iye re wa si odo mi.', traducao: 'Amunimuye, traga a mente dele para mim.'
        }]
    },
    {
        id: 'ak_iferan_obinrin',
        category: 'love', subCategory: 'akose',
        title: 'Iferan Obinrin (Atrair Mulher)', nomeYoruba: 'Iferan Aya',
        purpose: 'Para homens atraírem mulheres.',
        oduReference: 'Obara Meji', complexity: 'Média', tags: ['Amor', 'Atração'],
        niveis: [{
            tipo: 'MÉDIO', estimativa_materiais: 150,
            materiais: ['Ewe Dangoyaro', 'Perfume', 'Mel'],
            preparo: ['Esmagar a folha no perfume.', 'Adicionar uma colher de mel.', 'Usar como colônia.'],
            ofo: 'Didun ni t\'oyin. Ki inu re dun si mi.', traducao: 'Doce é o mel. Que ela seja doce comigo.'
        }]
    },
    {
        id: 'ak_igbeyawo',
        category: 'love', subCategory: 'akose',
        title: 'Igbeyawo (Para Casar)', nomeYoruba: 'Awure Igbeyawo',
        purpose: 'Acelerar pedido de casamento.',
        oduReference: 'Odi Meji', complexity: 'Alta', tags: ['Casamento', 'Compromisso'],
        niveis: [{
            tipo: 'COMPLETO', estimativa_materiais: 600,
            materiais: ['2 Pombos Brancos', 'Anel', 'Fita Branca', 'Ewe Ifá'],
            preparo: ['Amarrar os pés dos pombos com a fita e o anel.', 'Sacrificar os pombos sobre Ewe Ifá.', 'Lavar o anel no sangue e depois na água.', 'Usar o anel.'],
            ofo: 'Eyele kii sun la ni aya. Ki n ni oko/aya loni.', traducao: 'O pombo não dorme sem companheiro. Que eu tenha marido/esposa hoje.'
        }]
    },
    {
        id: 'ak_ibale_oko',
        category: 'love', subCategory: 'akose',
        title: 'Ibale Oko (Acalmar Marido)', nomeYoruba: 'Ero Iferan',
        purpose: 'Para parceiros agressivos ou nervosos.',
        oduReference: 'Ejiogbe', complexity: 'Baixa', tags: ['Harmonia', 'Paz'],
        niveis: [{
            tipo: 'BÁSICO', estimativa_materiais: 30,
            materiais: ['Água de Coco', 'Açúcar', 'Papel com nome'],
            preparo: ['Colocar o nome dentro do coco.', 'Encher com açúcar.', 'Enterrar no quintal pedindo doçura.'],
            ofo: 'Omi agbon kii gbona. Ki okan re tutu.', traducao: 'Água de coco não esquenta. Que seu coração esfrie.'
        }]
    },
    {
        id: 'ak_ife_giga',
        category: 'love', subCategory: 'akose',
        title: 'Ife Giga (Amor Supremo)', nomeYoruba: 'Iferan Nla',
        purpose: 'União espiritual inquebrável.',
        oduReference: 'Otura Meji', complexity: 'Alta', tags: ['União', 'Eterno'],
        niveis: [{
            tipo: 'COMPLETO', estimativa_materiais: 1000,
            materiais: ['Corrente de Ouro', 'Ewe Odundun', 'Obi', 'Orogbo'],
            preparo: ['Lavar a corrente com sumo de Odundun.', 'Dar Obi e Orogbo para o casal comer junto.', 'Prender a corrente no assentamento de Osun.'],
            ofo: 'Odundun lo ni ki ife wa dun.', traducao: 'Odundun diz que nosso amor será doce.'
        }]
    },
    {
        id: 'ak_atoka_ife',
        category: 'love', subCategory: 'akose',
        title: 'Atoka Ife (Chamariz de Amor)', nomeYoruba: 'Atoka',
        purpose: 'Para ser notado(a) por alguém específico.',
        oduReference: 'Irete Meji', complexity: 'Média', tags: ['Atração'],
        niveis: [{
            tipo: 'MÉDIO', estimativa_materiais: 200,
            materiais: ['Espelho', 'Efun', 'Osun', 'Nome da pessoa'],
            preparo: ['Escrever o nome no espelho com Efun e Osun.', 'Olhar no espelho e chamar a pessoa 7 vezes.', 'Guardar o espelho sob o travesseiro.'],
            ofo: 'Bi oju ba ri, a ri wa. Wa ri mi.', traducao: 'Se os olhos veem, eles nos veem. Venha me ver.'
        }]
    },
    {
        id: 'ak_oyin_ife',
        category: 'love', subCategory: 'akose',
        title: 'Oyin Ife (Mel do Amor)', nomeYoruba: 'Adun Ife',
        purpose: 'Adoçar relacionamento em crise.',
        oduReference: 'Oshe Tura', complexity: 'Baixa', tags: ['Doçura', 'Crise'],
        niveis: [{
            tipo: 'BÁSICO', estimativa_materiais: 20,
            materiais: ['Mel Puro', 'Prato Branco'],
            preparo: ['Escrever os nomes no prato com mel.', 'Lamber o mel cruzando os dedos.', 'Pedir união.'],
            ofo: 'Oyin lo ni ki aye wa dun.', traducao: 'O mel diz que nossa vida será doce.'
        }]
    },
    {
        id: 'ak_didun_ife',
        category: 'love', subCategory: 'akose',
        title: 'Didun Ife (Prazer no Amor)', nomeYoruba: 'Iferan Ibalopo',
        purpose: 'Melhorar a vida sexual do casal.',
        oduReference: 'Ofun Meji', complexity: 'Média', tags: ['Sexo', 'Prazer'],
        niveis: [{
            tipo: 'MÉDIO', estimativa_materiais: 120,
            materiais: ['Pó de Orogbo', 'Gengibre', 'Mel'],
            preparo: ['Misturar o pó de Orogbo com Gengibre e Mel.', 'Tomar uma colher antes de deitar.'],
            ofo: 'Orogbo gbo agbara. Ara wa a ji.', traducao: 'Orogbo traz força. Nosso corpo vai acordar.'
        }]
    },
    {
        id: 'ak_pada_wa',
        category: 'love', subCategory: 'akose',
        title: 'Pada Wa (Volta pra Mim)', nomeYoruba: 'Iferan Apada',
        purpose: 'Trazer ex de volta.',
        oduReference: 'Okanran Meji', complexity: 'Alta', tags: ['Retorno', 'Ex'],
        niveis: [{
            tipo: 'COMPLETO', estimativa_materiais: 400,
            materiais: ['Ewe Alupaida', 'Pertence pessoal', 'Linha Preta/Branca'],
            preparo: ['Enrolar o pertence na folha Alupaida.', 'Amarrar com a linha chamando o nome.', 'Enterrar na porta de casa.'],
            ofo: 'Alupaida, pa okan re da si mi.', traducao: 'Alupaida, vire o coração dele para mim.'
        }]
    },

    // --- CATEGORIA: VITÓRIA (ISEGUN) ---
    {
        id: 'ak_isegun_ota',
        category: 'victory', subCategory: 'akose',
        title: 'Isegun Ota (Vencer Inimigos)', nomeYoruba: 'Isegun',
        purpose: 'Derrotar inimigos declarados.',
        oduReference: 'Ogunda Meji', complexity: 'Alta', tags: ['Vitória', 'Guerra'],
        niveis: [{
            tipo: 'COMPLETO', estimativa_materiais: 500,
            materiais: ['Faca de Ferro', 'Galo Vermelho', 'Ewe Ina'],
            preparo: ['Passar a faca no corpo.', 'Sacrificar o galo sobre a faca.', 'Cobrir com Ewe Ina.', 'Enterrar onde o inimigo passa.'],
            ofo: 'Ogun a se ota. Ina a jo ota.', traducao: 'Ogun vencerá o inimigo. O fogo queimará o inimigo.'
        }]
    },
    {
        id: 'ak_asegun_aye',
        category: 'victory', subCategory: 'akose',
        title: 'Asegun Aye (Vencer o Mundo)', nomeYoruba: 'Asegun',
        purpose: 'Superar dificuldades gerais da vida.',
        oduReference: 'Ejiogbe', complexity: 'Média', tags: ['Vida', 'Superação'],
        niveis: [{
            tipo: 'MÉDIO', estimativa_materiais: 200,
            materiais: ['Ose Dudu', 'Ewe Peregun'],
            preparo: ['Pilar Peregun.', 'Misturar com sabão.', 'Banhar-se na cachoeira.'],
            ofo: 'Peregun a li aso. Ma li aso ire.', traducao: 'Peregun tem roupas novas. Terei roupas de sorte.'
        }]
    },
    {
        id: 'ak_ota_ole',
        category: 'victory', subCategory: 'akose',
        title: 'Ota Ole (Inimigo Fraco)', nomeYoruba: 'Dindin Ota',
        purpose: 'Enfraquecer quem te ataca.',
        oduReference: 'Osa Meji', complexity: 'Baixa', tags: ['Defesa'],
        niveis: [{
            tipo: 'BÁSICO', estimativa_materiais: 50,
            materiais: ['Nome do inimigo', 'Congelador/Gelo', 'Pimenta'],
            preparo: ['Colocar o nome na pimenta.', 'Congelar no gelo.', 'Manter lá até a briga acabar.'],
            ofo: 'Omi tutu pa ina ota.', traducao: 'Água fria apaga o fogo do inimigo.'
        }]
    },
    {
        id: 'ak_ogun_ja',
        category: 'victory', subCategory: 'akose',
        title: 'Ogun Ja (Guerra Acabou)', nomeYoruba: 'Isegun Ogun',
        purpose: 'Encerrar disputas judiciais ou brigas.',
        oduReference: 'Otura Meji', complexity: 'Média', tags: ['Justiça', 'Paz'],
        niveis: [{
            tipo: 'MÉDIO', estimativa_materiais: 300,
            materiais: ['Carneiro (simbólico ou real)', 'Folha da Costa', 'Ose Dudu'],
            preparo: ['Banho com Folha da Costa e sabão.', 'Oferecer comida aos pobres.'],
            ofo: 'Otura a tu ija ka.', traducao: 'Otura desmancha a briga.'
        }]
    },
    {
        id: 'ak_bibo_isegun',
        category: 'victory', subCategory: 'akose',
        title: 'Bibo Isegun (Sacrifício da Vitória)', nomeYoruba: 'Ebó Isegun',
        purpose: 'Agradecer e fixar uma vitória alcançada.',
        oduReference: 'Irete Meji', complexity: 'Média', tags: ['Gratidão'],
        niveis: [{
            tipo: 'MÉDIO', estimativa_materiais: 200,
            materiais: ['Pombo Branco', 'Obi', 'Gim'],
            preparo: ['Sacrificar o pombo ao Ori.', 'Rezar agradecendo.', 'Compartilhar o Obi.'],
            ofo: 'Modupe lowo Ori mi.', traducao: 'Agradeço ao meu Ori.'
        }]
    },

    // --- CATEGORIA: PROTEÇÃO (MADARIKAN) ---
    {
        id: 'ak_madarikan',
        category: 'protection', subCategory: 'akose',
        title: 'Madarikan (Retorno)', nomeYoruba: 'Apadà Ibi',
        purpose: 'Devolver o mal ao remetente.',
        oduReference: 'Okanran Meji', complexity: 'Alta', tags: ['Retorno', 'Defesa'],
        niveis: [{
            tipo: 'COMPLETO', estimativa_materiais: 1200,
            materiais: ['Ewe Alupaida', '7 Pimentas (Atare)', 'Ose Dudu', 'Casco de Caracol', 'Fogo'],
            preparo: ['Queimar a folha e pimentas no casco.', 'Misturar o pó preto ao sabão.', 'Banho à meia-noite.'],
            ofo: 'Alupaida, pa ibi da si olubi.', traducao: 'Alupaida, vire o mal para o dono.'
        }]
    },
    {
        id: 'ak_dabobo',
        category: 'protection', subCategory: 'akose',
        title: 'Dabobo (Escudo)', nomeYoruba: 'Abo',
        purpose: 'Proteção geral contra inveja.',
        oduReference: 'Odi Meji', complexity: 'Média', tags: ['Escudo', 'Inveja'],
        niveis: [{
            tipo: 'MÉDIO', estimativa_materiais: 150,
            materiais: ['Ewe Etiponola', 'Ose Dudu', 'Banha de Ori'],
            preparo: ['Pilar a folha.', 'Misturar com sabão e Ori.', 'Banho matinal.'],
            ofo: 'Etiponola kii ku si oju ona.', traducao: 'Etiponola não morre no caminho.'
        }]
    },
    {
        id: 'ak_aje_protection',
        category: 'protection', subCategory: 'akose',
        title: 'Aje Protection (Contra Bruxaria)', nomeYoruba: 'Abo Lowo Aje',
        purpose: 'Proteção contra ataques de Iyami.',
        oduReference: 'Osa Meji', complexity: 'Alta', tags: ['Bruxaria', 'Iyami'],
        niveis: [{
            tipo: 'COMPLETO', estimativa_materiais: 300,
            materiais: ['Ovos', 'Dendê', 'Ewe Aje'],
            preparo: ['Quebrar ovos na encruzilhada.', 'Regar com Dendê.', 'Banho com Ewe Aje.'],
            ofo: 'Iyami e ma se mi.', traducao: 'Minhas mães, não me ataquem.'
        }]
    },
    {
        id: 'ak_oso_protection',
        category: 'protection', subCategory: 'akose',
        title: 'Oso Protection (Contra Feiticeiros)', nomeYoruba: 'Abo Lowo Oso',
        purpose: 'Proteção contra magos negros.',
        oduReference: 'Oyeku Meji', complexity: 'Alta', tags: ['Feiticeiro', 'Morte'],
        niveis: [{
            tipo: 'COMPLETO', estimativa_materiais: 400,
            materiais: ['Carvão', 'Sal', 'Cinzas'],
            preparo: ['Misturar Carvão, Sal e Cinzas.', 'Soprar na frente de casa.', 'Riscar Oyeku Meji no chão.'],
            ofo: 'Oyeku ni o ye iku. Iku ma wo ile mi.', traducao: 'Oyeku evita a morte. Morte não entre em minha casa.'
        }]
    },
    {
        id: 'ak_ewu_protection',
        category: 'protection', subCategory: 'akose',
        title: 'Ewu Protection (Contra Perigos)', nomeYoruba: 'Abo Lowo Ewu',
        purpose: 'Proteção contra acidentes.',
        oduReference: 'Owonrin Meji', complexity: 'Média', tags: ['Acidente', 'Carro'],
        niveis: [{
            tipo: 'MÉDIO', estimativa_materiais: 100,
            materiais: ['Cabaça', 'Pano Vermelho', 'Oti'],
            preparo: ['Colocar Oti na cabaça.', 'Amarrar com pano vermelho.', 'Deixar no carro ou bolsa.'],
            ofo: 'Owonrin a gbe mi lo, a gbe mi bo.', traducao: 'Owonrin me leva e me traz de volta.'
        }]
    }
];

// ----------------------------------------------------------------------------
// DB_OFO: 30 ENCANTAMENTOS
// ----------------------------------------------------------------------------
export const DB_OFO: OogunItem[] = [
    // CHUVA (OJO)
    { id: 'ofo_ojo_ro', title: 'Chamar Chuva', category: 'power', subCategory: 'ofo', purpose: 'Fazer chover.', nomeYoruba: 'Ofo Ojo Ro', complexity: 'Média', tags: ['Chuva'], oduReference: 'Ejiogbe', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: [], preparo: ['Recitar olhando pro céu.'], ofo: 'Ojo ro! Ojo ro! Sango ran o ni ise.', traducao: 'Chova! Chova! Xangô te mandou um trabalho.' }] },
    { id: 'ofo_ojo_ma_ro', title: 'Parar Chuva', category: 'power', subCategory: 'ofo', purpose: 'Interromper chuva.', nomeYoruba: 'Ofo Ojo Ma Ro', complexity: 'Média', tags: ['Chuva'], oduReference: 'Osa Meji', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: ['Pimenta'], preparo: ['Mastigar pimenta e soprar.'], ofo: 'Ojo ma ro! Efufu gbe lo.', traducao: 'Chuva não caia! Vento leve embora.' }] },
    
    // PAZ (ILAJA) - ACALMAR BRIGA
    { id: 'ofo_ilaja_1', title: 'Acalmar Briga (Geral)', category: 'justice', subCategory: 'ofo', purpose: 'Parar discussões.', nomeYoruba: 'Ofo Ilaja', complexity: 'Baixa', tags: ['Paz'], oduReference: 'Ejiogbe', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: ['Água'], preparo: ['Jogar água no chão.'], ofo: 'Omi tutu pa ina ija.', traducao: 'Água fria apaga o fogo da briga.' }] },
    { id: 'ofo_ilaja_2', title: 'Acalmar Chefe', category: 'justice', subCategory: 'ofo', purpose: 'Acalmar autoridade irritada.', nomeYoruba: 'Ofo Ero', complexity: 'Baixa', tags: ['Chefe'], oduReference: 'Ose Meji', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: [], preparo: ['Recitar mentalmente.'], ofo: 'Odundun a dun okan re.', traducao: 'Odundun vai adoçar seu coração.' }] },
    { id: 'ofo_ilaja_3', title: 'Paz no Lar', category: 'justice', subCategory: 'ofo', purpose: 'Harmonia doméstica.', nomeYoruba: 'Ofo Ile Ero', complexity: 'Baixa', tags: ['Casa'], oduReference: 'Obatala', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: ['Efun'], preparo: ['Soprar Efun.'], ofo: 'Ile ro, bi omi.', traducao: 'Casa acalme-se, como água.' }] },

    // VENDAS (TA OJA)
    { id: 'ofo_oja_1', title: 'Atrair Clientes', category: 'money', subCategory: 'ofo', purpose: 'Chamar compradores.', nomeYoruba: 'Ofo Pe Onibara', complexity: 'Baixa', tags: ['Vendas'], oduReference: 'Ejiogbe', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: [], preparo: ['Recitar na porta.'], ofo: 'E wa ra oja mi. Oyin n fa.', traducao: 'Venham comprar. O mel atrai.' }] },
    { id: 'ofo_oja_2', title: 'Vender Tudo', category: 'money', subCategory: 'ofo', purpose: 'Esvaziar estoque.', nomeYoruba: 'Ofo Ta Tan', complexity: 'Média', tags: ['Vendas'], oduReference: 'Owonrin', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: [], preparo: ['Bater palmas.'], ofo: 'Wara wara ni oja n ta.', traducao: 'Rapidamente o mercado vende.' }] },
    { id: 'ofo_oja_3', title: 'Lucro Rápido', category: 'money', subCategory: 'ofo', purpose: 'Ter lucro no dia.', nomeYoruba: 'Ofo Ere', complexity: 'Baixa', tags: ['Lucro'], oduReference: 'Ogunda', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: [], preparo: [], ofo: 'Aje, wole mi loni.', traducao: 'Riqueza, entre hoje.' }] },

    // MEMÓRIA (ISOYE)
    { id: 'ofo_isoye_1', title: 'Lembrar Sonhos', category: 'power', subCategory: 'ofo', purpose: 'Recordar o que sonhou.', nomeYoruba: 'Ofo Ranti Ala', complexity: 'Baixa', tags: ['Sonhos'], oduReference: 'Ejiogbe', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: ['Água'], preparo: ['Lavar o rosto.'], ofo: 'Oju mi la, ala mi wa.', traducao: 'Meus olhos abrem, meu sonho vem.' }] },
    { id: 'ofo_isoye_2', title: 'Memória para Estudo', category: 'power', subCategory: 'ofo', purpose: 'Aprender Ifá.', nomeYoruba: 'Ofo Kiko', complexity: 'Média', tags: ['Estudo'], oduReference: 'Otura', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: ['Mel'], preparo: ['Lamber mel.'], ofo: 'Oyin ni ki n ranti.', traducao: 'O mel faz eu lembrar.' }] },
    { id: 'ofo_isoye_3', title: 'Clareza Mental', category: 'power', subCategory: 'ofo', purpose: 'Focar a mente.', nomeYoruba: 'Ofo Ori', complexity: 'Baixa', tags: ['Foco'], oduReference: 'Ogbe', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: [], preparo: ['Tocar a testa.'], ofo: 'Ori mi, la mi.', traducao: 'Meu Ori, me abra.' }] },

    // VIAGEM (IRIN AJO)
    { id: 'ofo_irin_1', title: 'Viagem Segura', category: 'protection', subCategory: 'ofo', purpose: 'Proteção na estrada.', nomeYoruba: 'Ofo Ona', complexity: 'Baixa', tags: ['Viagem'], oduReference: 'Ogun', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: [], preparo: [], ofo: 'Ogun a so mi.', traducao: 'Ogun me guardará.' }] },
    { id: 'ofo_irin_2', title: 'Evitar Acidentes', category: 'protection', subCategory: 'ofo', purpose: 'Contra batidas.', nomeYoruba: 'Ofo Ijamba', complexity: 'Média', tags: ['Acidente'], oduReference: 'Owonrin', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: [], preparo: [], ofo: 'Ijamba pada seyin.', traducao: 'Acidente volte para trás.' }] },
    { id: 'ofo_irin_3', title: 'Caminho Aberto', category: 'power', subCategory: 'ofo', purpose: 'Sem trânsito.', nomeYoruba: 'Ofo Asina Ona', complexity: 'Baixa', tags: ['Trânsito'], oduReference: 'Esu', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: [], preparo: [], ofo: 'Esu, la ona.', traducao: 'Exu, abra o caminho.' }] },

    // SAÚDE (AIKU)
    { id: 'ofo_aiku_1', title: 'Afastar Doença', category: 'health', subCategory: 'ofo', purpose: 'Curar mal estar.', nomeYoruba: 'Ofo Arun', complexity: 'Média', tags: ['Doença'], oduReference: 'Oyeku', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: [], preparo: [], ofo: 'Arun lo, Alafia de.', traducao: 'Doença vá, Saúde chegue.' }] },
    { id: 'ofo_aiku_2', title: 'Dor de Cabeça', category: 'health', subCategory: 'ofo', purpose: 'Aliviar dor.', nomeYoruba: 'Ofo Oru', complexity: 'Baixa', tags: ['Dor'], oduReference: 'Ori', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: ['Água'], preparo: ['Pôr água na nuca.'], ofo: 'Ori mi, ma fo mo.', traducao: 'Minha cabeça, não doa mais.' }] },
    { id: 'ofo_aiku_3', title: 'Força Vital', category: 'health', subCategory: 'ofo', purpose: 'Recuperar energia.', nomeYoruba: 'Ofo Agbara', complexity: 'Baixa', tags: ['Energia'], oduReference: 'Ogunda', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: [], preparo: [], ofo: 'Agbara nla, wole mi.', traducao: 'Grande força, entre em mim.' }] },

    // AMOR (IFE) - OFOS SIMPLES
    { id: 'ofo_ife_1', title: 'Atrair Olhar', category: 'love', subCategory: 'ofo', purpose: 'Ser notado.', nomeYoruba: 'Ofo Oju', complexity: 'Baixa', tags: ['Atração'], oduReference: 'Osun', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: [], preparo: [], ofo: 'E wa wo ewa mi.', traducao: 'Venham ver minha beleza.' }] },
    { id: 'ofo_ife_2', title: 'Adoçar Palavras', category: 'love', subCategory: 'ofo', purpose: 'Falar doce.', nomeYoruba: 'Ofo Enu', complexity: 'Baixa', tags: ['Fala'], oduReference: 'Ose', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: ['Mel'], preparo: ['Lamber mel.'], ofo: 'Oro mi a dun bi oyin.', traducao: 'Minha palavra será doce como mel.' }] },
    { id: 'ofo_ife_3', title: 'União', category: 'love', subCategory: 'ofo', purpose: 'Manter juntos.', nomeYoruba: 'Ofo Isokan', complexity: 'Baixa', tags: ['União'], oduReference: 'Ejiogbe', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: [], preparo: [], ofo: 'A o ni pinya.', traducao: 'Não nos separaremos.' }] },

    // PREENCHIMENTO ATÉ 30
    { id: 'ofo_extra_1', title: 'Sorte Geral', category: 'power', subCategory: 'ofo', purpose: 'Sorte no dia.', nomeYoruba: 'Ofo Ire', complexity: 'Baixa', tags: ['Sorte'], oduReference: 'Ejiogbe', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: [], preparo: [], ofo: 'Ire gbogbo, wole.', traducao: 'Toda sorte, entre.' }] },
    { id: 'ofo_extra_2', title: 'Vencer Preguiça', category: 'power', subCategory: 'ofo', purpose: 'Ter ânimo.', nomeYoruba: 'Ofo Ole', complexity: 'Baixa', tags: ['Ânimo'], oduReference: 'Ogun', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: [], preparo: [], ofo: 'Ole kuro, ise de.', traducao: 'Preguiça saia, trabalho chegue.' }] },
    { id: 'ofo_extra_3', title: 'Proteção Noturna', category: 'protection', subCategory: 'ofo', purpose: 'Dormir bem.', nomeYoruba: 'Ofo Oru', complexity: 'Baixa', tags: ['Sono'], oduReference: 'Oyeku', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: [], preparo: [], ofo: 'Oru a sun fonfon.', traducao: 'A noite dormirei profundamente.' }] },
    { id: 'ofo_extra_4', title: 'Afastar Medo', category: 'protection', subCategory: 'ofo', purpose: 'Coragem.', nomeYoruba: 'Ofo Eru', complexity: 'Baixa', tags: ['Medo'], oduReference: 'Ogunda', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: [], preparo: [], ofo: 'Eru ma ba mi.', traducao: 'O medo não me pegará.' }] },
    { id: 'ofo_extra_5', title: 'Bênção da Manhã', category: 'power', subCategory: 'ofo', purpose: 'Começar o dia.', nomeYoruba: 'Ofo Owuro', complexity: 'Baixa', tags: ['Manhã'], oduReference: 'Ejiogbe', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: [], preparo: [], ofo: 'Owuro lo dara.', traducao: 'A manhã é boa.' }] },
    { id: 'ofo_extra_6', title: 'Limpeza', category: 'health', subCategory: 'ofo', purpose: 'Limpar aura.', nomeYoruba: 'Ofo Mimo', complexity: 'Baixa', tags: ['Limpeza'], oduReference: 'Obatala', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: ['Água'], preparo: [], ofo: 'Mo di mimo.', traducao: 'Tornei-me limpo.' }] },
    { id: 'ofo_extra_7', title: 'Vencer Inveja', category: 'protection', subCategory: 'ofo', purpose: 'Contra olho gordo.', nomeYoruba: 'Ofo Oju', complexity: 'Média', tags: ['Inveja'], oduReference: 'Okanran', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: [], preparo: [], ofo: 'Oju buruku ma wo mi.', traducao: 'Olho mau não me olhe.' }] },
    { id: 'ofo_extra_8', title: 'Atrair Presentes', category: 'money', subCategory: 'ofo', purpose: 'Ganhar coisas.', nomeYoruba: 'Ofo Ebun', complexity: 'Baixa', tags: ['Presente'], oduReference: 'Ose', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: [], preparo: [], ofo: 'Ebun a wa sodo mi.', traducao: 'Presentes virão a mim.' }] },
    { id: 'ofo_extra_9', title: 'Falar em Público', category: 'power', subCategory: 'ofo', purpose: 'Eloquência.', nomeYoruba: 'Ofo Oro', complexity: 'Média', tags: ['Fala'], oduReference: 'Otura', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: ['Atare'], preparo: ['Mastigar Atare.'], ofo: 'Oro mi a la.', traducao: 'Minha palavra abrirá caminhos.' }] },
    { id: 'ofo_extra_10', title: 'Afastar Pesadelo', category: 'protection', subCategory: 'ofo', purpose: 'Dormir em paz.', nomeYoruba: 'Ofo Ala Buruku', complexity: 'Baixa', tags: ['Sono', 'Pesadelo'], oduReference: 'Osa', niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 0, materiais: ['Água'], preparo: ['Lavar o rosto antes de dormir.'], ofo: 'Ala buruku, pada seyin. Ala rere, wole.', traducao: 'Pesadelo, volte para trás. Sonho bom, entre.' }] }
];

// ----------------------------------------------------------------------------
// DB_IWOSAN: 30 CURA E BENZIMENTOS
// ----------------------------------------------------------------------------
export const DB_IWOSAN: OogunItem[] = [
    // --- CURA FÍSICA (ARA) ---
    { id: 'iw_arun_inu', title: 'Dor de Barriga', category: 'health', subCategory: 'iwosan', purpose: 'Curar dores estomacais.', nomeYoruba: 'Oogun Inu Rirun', complexity: 'Baixa', tags: ['Estômago', 'Dor'], oduReference: 'Ejiogbe', niveis: [{ tipo: 'BÁSICO', estimativa_materiais: 20, materiais: ['Gengibre', 'Sal', 'Água Morna'], preparo: ['Macerar gengibre.', 'Misturar com sal e água.', 'Beber em jejum.'], ofo: 'Inu, ma run mi mo.', traducao: 'Barriga, não doa mais.' }] },
    { id: 'iw_ori_fifo', title: 'Dor de Cabeça Forte', category: 'health', subCategory: 'iwosan', purpose: 'Aliviar enxaqueca.', nomeYoruba: 'Oogun Ori Fifo', complexity: 'Média', tags: ['Cabeça', 'Dor'], oduReference: 'Osa Meji', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 50, materiais: ['Ewe Odundun', 'Ori (Banha)', 'Pano Branco'], preparo: ['Amassar Odundun com Ori.', 'Aplicar na testa.', 'Amarrar com pano.'], ofo: 'Odundun a mu ori dun.', traducao: 'Odundun acalma a cabeça.' }] },
    { id: 'iw_iba', title: 'Febre Alta', category: 'health', subCategory: 'iwosan', purpose: 'Baixar temperatura.', nomeYoruba: 'Oogun Iba', complexity: 'Média', tags: ['Febre'], oduReference: 'Owonrin', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 40, materiais: ['Ewe Efinrin', 'Limão', 'Mel'], preparo: ['Ferver Efinrin com Limão.', 'Adoçar com Mel.', 'Beber quente.'], ofo: 'Iba lo, otutu de.', traducao: 'Febre vá, frescor chegue.' }] },
    { id: 'iw_oju_didun', title: 'Dor nos Olhos', category: 'health', subCategory: 'iwosan', purpose: 'Limpar visão.', nomeYoruba: 'Oogun Oju', complexity: 'Baixa', tags: ['Olhos'], oduReference: 'Ogbe', niveis: [{ tipo: 'BÁSICO', estimativa_materiais: 10, materiais: ['Água de Coco'], preparo: ['Lavar os olhos com água de coco fresca.'], ofo: 'Oju mi la.', traducao: 'Meus olhos se abrem.' }] },
    { id: 'iw_ehin_didun', title: 'Dor nas Costas', category: 'health', subCategory: 'iwosan', purpose: 'Aliviar coluna.', nomeYoruba: 'Oogun Ehin', complexity: 'Média', tags: ['Costas'], oduReference: 'Ogun', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 60, materiais: ['Epo Pupa', 'Camfora', 'Ewe Tete'], preparo: ['Aquecer Epo com Camfora e Tete.', 'Massagear as costas.'], ofo: 'Ehin mi le koko.', traducao: 'Minhas costas ficam fortes.' }] },
    { id: 'iw_eje_ruru', title: 'Pressão Alta', category: 'health', subCategory: 'iwosan', purpose: 'Controlar hipertensão.', nomeYoruba: 'Oogun Eje Ruru', complexity: 'Alta', tags: ['Pressão'], oduReference: 'Osa', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 100, materiais: ['Ewe Ibepe (Folha Mamão)', 'Alho', 'Água'], preparo: ['Ferver as folhas com alho.', 'Tomar 1 copo por dia.'], ofo: 'Eje ro, bi omi.', traducao: 'Sangue acalme-se, como água.' }] },
    { id: 'iw_ako_iba', title: 'Malária/Infecção', category: 'health', subCategory: 'iwosan', purpose: 'Combater infecções.', nomeYoruba: 'Agbo Iba', complexity: 'Alta', tags: ['Infecção'], oduReference: 'Odi', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 150, materiais: ['Casca de Manga', 'Ewe Dongoyaro', 'Limão'], preparo: ['Cozinhar tudo por 1 hora.', 'Beber o chá amargo.'], ofo: 'Arun jade lara mi.', traducao: 'Doença saia do meu corpo.' }] },
    { id: 'iw_oyun_iwo', title: 'Enjoo na Gravidez', category: 'health', subCategory: 'iwosan', purpose: 'Acalmar estômago de gestante.', nomeYoruba: 'Oogun Aboyun', complexity: 'Baixa', tags: ['Gravidez'], oduReference: 'Oshe', niveis: [{ tipo: 'BÁSICO', estimativa_materiais: 20, materiais: ['Gengibre', 'Mel'], preparo: ['Chá fraco de gengibre com mel.'], ofo: 'Omo inu mi, joko je.', traducao: 'Criança em mim, sente-se quieta.' }] },
    { id: 'iw_egbo_ada', title: 'Ferida que não cicatriza', category: 'health', subCategory: 'iwosan', purpose: 'Curar úlceras.', nomeYoruba: 'Oogun Egbo', complexity: 'Média', tags: ['Ferida'], oduReference: 'Ogun', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 80, materiais: ['Iyerosun', 'Baba de Caracol (Igbin)'], preparo: ['Misturar Iyerosun com a baba.', 'Passar na ferida.'], ofo: 'Igbin kii ni egbo.', traducao: 'O caracol não tem ferida.' }] },
    { id: 'iw_ale_okunrin', title: 'Impotência', category: 'health', subCategory: 'iwosan', purpose: 'Vigor masculino.', nomeYoruba: 'Oogun Ale', complexity: 'Alta', tags: ['Sexual'], oduReference: 'Obarabogbe', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 200, materiais: ['Raiz de Orogbo', 'Gim', 'Mel'], preparo: ['Curtir a raiz no Gim por 7 dias.', 'Beber um cálice.'], ofo: 'Okunrin dide.', traducao: 'Homem levante-se.' }] },

    // --- CURA ESPIRITUAL (EMI) ---
    { id: 'iw_isora', title: 'Banho de Descarrego', category: 'health', subCategory: 'iwosan', purpose: 'Limpar energias ruins.', nomeYoruba: 'We Epe Nu', complexity: 'Média', tags: ['Limpeza'], oduReference: 'Oyeku', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 50, materiais: ['Sal Grosso', 'Ewe Ajeobale', 'Água'], preparo: ['Banho do pescoço para baixo.'], ofo: 'Epe lo, ibi lo.', traducao: 'Maldição vá, mal vá.' }] },
    { id: 'iw_ero_ori', title: 'Acalmar a Mente', category: 'health', subCategory: 'iwosan', purpose: 'Contra ansiedade.', nomeYoruba: 'Ero Ori', complexity: 'Baixa', tags: ['Mente'], oduReference: 'Ogbe', niveis: [{ tipo: 'BÁSICO', estimativa_materiais: 30, materiais: ['Água de Coco', 'Efun'], preparo: ['Lavar a cabeça com a mistura.'], ofo: 'Ori mi tutu.', traducao: 'Minha cabeça está fresca.' }] },
    { id: 'iw_abiku', title: 'Afastar Abiku', category: 'health', subCategory: 'iwosan', purpose: 'Proteger crianças.', nomeYoruba: 'Oogun Abiku', complexity: 'Alta', tags: ['Criança'], oduReference: 'Owonrin', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 300, materiais: ['Guizo', 'Fio Preto/Branco', 'Ewe Abirikolo'], preparo: ['Fazer um amuleto para o tornozelo da criança.'], ofo: 'Duro o, omo mi.', traducao: 'Fique, meu filho.' }] },
    { id: 'iw_martelo', title: 'Quebrar Feitiço', category: 'health', subCategory: 'iwosan', purpose: 'Anular magia negra.', nomeYoruba: 'Tu Epe Ka', complexity: 'Alta', tags: ['Quebra'], oduReference: 'Okanran', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 200, materiais: ['Ovo', 'Pólvora', 'Ewe Alupaida'], preparo: ['Passar o ovo no corpo.', 'Estourar longe de casa.'], ofo: 'Epe pada si elépe.', traducao: 'Feitiço volte ao feiticeiro.' }] },
    { id: 'iw_orun_rere', title: 'Dormir Bem', category: 'health', subCategory: 'iwosan', purpose: 'Contra insônia.', nomeYoruba: 'Oogun Orun', complexity: 'Baixa', tags: ['Sono'], oduReference: 'Odi', niveis: [{ tipo: 'BÁSICO', estimativa_materiais: 20, materiais: ['Alface', 'Chá de Camomila'], preparo: ['Banho morno antes de deitar.'], ofo: 'Orun wole.', traducao: 'Sono entre.' }] },
    { id: 'iw_agbara_emi', title: 'Fortalecer Aura', category: 'health', subCategory: 'iwosan', purpose: 'Aumentar brilho pessoal.', nomeYoruba: 'Oogun Agbara', complexity: 'Média', tags: ['Aura'], oduReference: 'Ejiogbe', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 80, materiais: ['Ewe Iroko', 'Ose Dudu', 'Mel'], preparo: ['Banho matinal.'], ofo: 'Iroko ni gba agbara.', traducao: 'Iroko tem força.' }] },
    { id: 'iw_yeye_osun', title: 'Banho de Beleza', category: 'health', subCategory: 'iwosan', purpose: 'Ficar atraente.', nomeYoruba: 'Ose Ewa', complexity: 'Média', tags: ['Beleza'], oduReference: 'Osun', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 100, materiais: ['Pétalas Amarelas', 'Mel', 'Perfume', 'Leite'], preparo: ['Banho de imersão ou cuia.'], ofo: 'Ewa Osun wole mi.', traducao: 'Beleza de Oxum entre em mim.' }] },
    { id: 'iw_owo_ero', title: 'Mãos de Cura', category: 'health', subCategory: 'iwosan', purpose: 'Para quem trabalha com massagem/cura.', nomeYoruba: 'Owo Iwosan', complexity: 'Alta', tags: ['Profissional'], oduReference: 'Irete', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 200, materiais: ['Ewe Rinrin', 'Ori', 'Ose'], preparo: ['Lavar as mãos sempre com este preparado.'], ofo: 'Owo mi di owo aje.', traducao: 'Minhas mãos viram mãos de cura.' }] },
    { id: 'iw_ibi_gbona', title: 'Afastar Energia Quente', category: 'health', subCategory: 'iwosan', purpose: 'Esfriar ambiente pesado.', nomeYoruba: 'Ero Ile', complexity: 'Média', tags: ['Casa'], oduReference: 'Ose', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 50, materiais: ['Água', 'Anil', 'Ewe Odundun'], preparo: ['Passar pano na casa.'], ofo: 'Ile tutu, okan tutu.', traducao: 'Casa fresca, coração fresco.' }] },
    { id: 'iw_egbe_orun', title: 'Paz com Egbe', category: 'health', subCategory: 'iwosan', purpose: 'Para quem ouve vozes/espíritos.', nomeYoruba: 'Ero Egbe', complexity: 'Alta', tags: ['Espiritual'], oduReference: 'Osa', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 300, materiais: ['Cana de Açúcar', 'Doces', 'Frutas'], preparo: ['Oferenda ao pé de uma árvore.'], ofo: 'Egbe mi, e ma pe mi.', traducao: 'Meus companheiros, não me chamem.' }] },

    // --- BENZIMENTOS (SURE) ---
    { id: 'iw_sure_omo', title: 'Benção para Criança', category: 'health', subCategory: 'iwosan', purpose: 'Proteger bebê.', nomeYoruba: 'Sure Omo', complexity: 'Baixa', tags: ['Bebê'], oduReference: 'Ejiogbe', niveis: [{ tipo: 'BÁSICO', estimativa_materiais: 0, materiais: ['Mão direita'], preparo: ['Impor a mão na cabeça da criança.'], ofo: 'Omo mi, o ni ku. O a dagba.', traducao: 'Meu filho, você não morrerá. Vai crescer.' }] },
    { id: 'iw_sure_aboyun', title: 'Benção para Grávida', category: 'health', subCategory: 'iwosan', purpose: 'Parto seguro.', nomeYoruba: 'Sure Aboyun', complexity: 'Baixa', tags: ['Parto'], oduReference: 'Ogunda', niveis: [{ tipo: 'BÁSICO', estimativa_materiais: 0, materiais: ['Água'], preparo: ['Passar água na barriga.'], ofo: 'Ona a la fun o.', traducao: 'O caminho se abrirá para você.' }] },
    { id: 'iw_sure_ile', title: 'Benção da Casa Nova', category: 'health', subCategory: 'iwosan', purpose: 'Entrar em casa nova.', nomeYoruba: 'Sure Ile', complexity: 'Média', tags: ['Mudança'], oduReference: 'Iwori', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 20, materiais: ['Sal', 'Mel'], preparo: ['Colocar nos cantos.'], ofo: 'Ile yi a dun, a ni iyo.', traducao: 'Esta casa será doce e terá sabor.' }] },
    { id: 'iw_sure_owo', title: 'Benção da Carteira', category: 'money', subCategory: 'iwosan', purpose: 'Dinheiro render.', nomeYoruba: 'Sure Aje', complexity: 'Baixa', tags: ['Dinheiro'], oduReference: 'Ose', niveis: [{ tipo: 'BÁSICO', estimativa_materiais: 0, materiais: ['Sopro'], preparo: ['Soprar a carteira 3x.'], ofo: 'Aje wole, osi jade.', traducao: 'Riqueza entre, pobreza saia.' }] },
    { id: 'iw_sure_irin', title: 'Benção de Viagem', category: 'protection', subCategory: 'iwosan', purpose: 'Ir e voltar bem.', nomeYoruba: 'Sure Ona', complexity: 'Baixa', tags: ['Viagem'], oduReference: 'Ogun', niveis: [{ tipo: 'BÁSICO', estimativa_materiais: 0, materiais: [], preparo: ['Tocar o chão antes de sair.'], ofo: 'Ile a gbe o.', traducao: 'A terra te sustentará.' }] },
    { id: 'iw_sure_onje', title: 'Benção do Alimento', category: 'health', subCategory: 'iwosan', purpose: 'Não fazer mal.', nomeYoruba: 'Sure Onje', complexity: 'Baixa', tags: ['Comida'], oduReference: 'Ejiogbe', niveis: [{ tipo: 'BÁSICO', estimativa_materiais: 0, materiais: [], preparo: [], ofo: 'Onje yi a di aje.', traducao: 'Esta comida virará saúde.' }] },
    { id: 'iw_sure_alafia', title: 'Benção de Saúde', category: 'health', subCategory: 'iwosan', purpose: 'Recuperação rápida.', nomeYoruba: 'Sure Alafia', complexity: 'Baixa', tags: ['Cura'], oduReference: 'Oyeku', niveis: [{ tipo: 'BÁSICO', estimativa_materiais: 0, materiais: [], preparo: ['Mão na testa.'], ofo: 'Alafia ni fun o.', traducao: 'Saúde para você.' }] },
    { id: 'iw_sure_ori', title: 'Benção do Ori', category: 'health', subCategory: 'iwosan', purpose: 'Alinhar destino.', nomeYoruba: 'Sure Ori', complexity: 'Baixa', tags: ['Destino'], oduReference: 'Ogbe', niveis: [{ tipo: 'BÁSICO', estimativa_materiais: 0, materiais: ['Água'], preparo: ['Tocar o topo da cabeça.'], ofo: 'Ori gbe o.', traducao: 'Que seu Ori te apoie.' }] },
    { id: 'iw_sure_ife', title: 'Benção do Casal', category: 'love', subCategory: 'iwosan', purpose: 'Paz na relação.', nomeYoruba: 'Sure Ife', complexity: 'Baixa', tags: ['Amor'], oduReference: 'Oshe', niveis: [{ tipo: 'BÁSICO', estimativa_materiais: 0, materiais: [], preparo: ['Mãos dadas.'], ofo: 'Ife a gbe yin.', traducao: 'O amor sustentará vocês.' }] },
    { id: 'iw_sure_agba', title: 'Benção dos Anciãos', category: 'health', subCategory: 'iwosan', purpose: 'Respeito e longevidade.', nomeYoruba: 'Sure Ogbo', complexity: 'Baixa', tags: ['Velhice'], oduReference: 'Ofun', niveis: [{ tipo: 'BÁSICO', estimativa_materiais: 0, materiais: [], preparo: ['Curvar-se.'], ofo: 'O gbo, o to.', traducao: 'Você envelhecerá e durará.' }] }
];
// ----------------------------------------------------------------------------
// DB_ONDE: 30 AMULETOS E PROTEÇÕES
// ----------------------------------------------------------------------------
export const DB_ONDE: OogunItem[] = [
    // --- AMULETOS DE CORPO (ARA) ---
    { id: 'on_ide_ifa', title: 'Ide Ifá (Pulseira)', category: 'protection', subCategory: 'onde', purpose: 'Proteção contra morte prematura.', nomeYoruba: 'Ide Ifá', complexity: 'Média', tags: ['Proteção', 'Morte'], oduReference: 'Ogbe Oyeku', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 50, materiais: ['Contas Verdes/Marrons', 'Fio de Algodão', 'Iyerosun'], preparo: ['Lavar as contas.', 'Marcar Ogbe Oyeku no Iyerosun.', 'Rezar e enfiar as contas.'], ofo: 'Ide Ifá ni o de iku mole.', traducao: 'O Ide de Ifá prende a morte.' }] },
    { id: 'on_igbadi', title: 'Igbadi (Cinto de Proteção)', category: 'protection', subCategory: 'onde', purpose: 'Contra ataques físicos.', nomeYoruba: 'Igbadi', complexity: 'Alta', tags: ['Corpo', 'Guerra'], oduReference: 'Ogun', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 200, materiais: ['Couro', 'Pó de Ferro', 'Ewe Ina'], preparo: ['Costurar o couro com os itens dentro.', 'Usar na cintura.'], ofo: 'Igbadi a gba ota.', traducao: 'O cinto segura o inimigo.' }] },
    { id: 'on_bante', title: 'Bante (Avental Mágico)', category: 'power', subCategory: 'onde', purpose: 'Desaparecer em perigo.', nomeYoruba: 'Bante Afeeri', complexity: 'Alta', tags: ['Invisibilidade'], oduReference: 'Owonrin', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 500, materiais: ['Pano Vermelho', 'Espelho Quebrado', 'Pó de Osun'], preparo: ['Costurar o avental.', 'Consagrar com Eje.'], ofo: 'Afeeri ni ki n di.', traducao: 'Que eu me torne invisível.' }] },
    { id: 'on_oruka_aluwo', title: 'Anel de Soco', category: 'victory', subCategory: 'onde', purpose: 'Derrubar oponente.', nomeYoruba: 'Oruka Aluwo', complexity: 'Média', tags: ['Luta'], oduReference: 'Ogunda', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 100, materiais: ['Anel de Ferro', 'Ewe Esinsin'], preparo: ['Ferver o anel com a folha.', 'Usar no dedo médio.'], ofo: 'Bi mo lu o, o subu.', traducao: 'Se eu te bater, você cai.' }] },
    { id: 'on_oruka_ere', title: 'Anel de Sorte', category: 'money', subCategory: 'onde', purpose: 'Ganhar em jogos.', nomeYoruba: 'Oruka Aje', complexity: 'Média', tags: ['Jogo'], oduReference: 'Ose', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 150, materiais: ['Anel de Prata', 'Imã', 'Ewe Aje'], preparo: ['Deixar o anel no imã por 7 dias.'], ofo: 'Oruka fa ire wa.', traducao: 'Anel puxe a sorte.' }] },
    { id: 'on_ifunpa', title: 'Ifunpa (Braçadeira)', category: 'protection', subCategory: 'onde', purpose: 'Contra veneno.', nomeYoruba: 'Ifunpa', complexity: 'Média', tags: ['Veneno'], oduReference: 'Osa', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 80, materiais: ['Couro de Cobra', 'Carvão'], preparo: ['Costurar na braçadeira.'], ofo: 'Majele ko ni ran mi.', traducao: 'Veneno não me pegará.' }] },
    { id: 'on_ese_ide', title: 'Tornozeleira', category: 'protection', subCategory: 'onde', purpose: 'Não pisar em feitiço.', nomeYoruba: 'Ide Ese', complexity: 'Baixa', tags: ['Caminho'], oduReference: 'Ejiogbe', niveis: [{ tipo: 'BÁSICO', estimativa_materiais: 30, materiais: ['Contas Pretas/Brancas'], preparo: ['Lavar com Omiero.'], ofo: 'Ese mi ko ni rin si ibi.', traducao: 'Meu pé não andará para o mal.' }] },
    { id: 'on_ileke_oyun', title: 'Colar de Gravidez', category: 'health', subCategory: 'onde', purpose: 'Segurar o bebê.', nomeYoruba: 'Ileke Oyun', complexity: 'Baixa', tags: ['Gravidez'], oduReference: 'Oshe', niveis: [{ tipo: 'BÁSICO', estimativa_materiais: 40, materiais: ['Contas Brancas', 'Búzios'], preparo: ['Usar na cintura.'], ofo: 'Oyun duro.', traducao: 'Gravidez fique.' }] },
    { id: 'on_kondo', title: 'Bastão de Defesa', category: 'protection', subCategory: 'onde', purpose: 'Afastar ladrão.', nomeYoruba: 'Kondo', complexity: 'Média', tags: ['Casa'], oduReference: 'Ogun', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 60, materiais: ['Madeira Dura', 'Fita Vermelha'], preparo: ['Enrolar a fita.', 'Deixar atrás da porta.'], ofo: 'Kondo le ole lo.', traducao: 'Bastão expulse o ladrão.' }] },
    { id: 'on_agbado', title: 'Milho de Bolso', category: 'money', subCategory: 'onde', purpose: 'Nunca faltar dinheiro.', nomeYoruba: 'Agbado Aje', complexity: 'Baixa', tags: ['Dinheiro'], oduReference: 'Ejiogbe', niveis: [{ tipo: 'BÁSICO', estimativa_materiais: 5, materiais: ['7 Grãos de Milho'], preparo: ['Carregar no bolso esquerdo.'], ofo: 'Agbado kii vã omo re.', traducao: 'O milho não falta aos seus filhos.' }] },

    // --- PROTEÇÃO DE CASA (ILE) ---
    { id: 'on_sigidi', title: 'Sigidi (Guardião)', category: 'protection', subCategory: 'onde', purpose: 'Vigiar a casa.', nomeYoruba: 'Sigidi', complexity: 'Alta', tags: ['Guardião'], oduReference: 'Okanran', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 300, materiais: ['Barro', 'Olhos de Cauri', 'Penas'], preparo: ['Modelar o boneco.', 'Consagrar.'], ofo: 'Sigidi, so ile mi.', traducao: 'Sigidi, vigie minha casa.' }] },
    { id: 'on_mariwo', title: 'Mariwo (Cortina)', category: 'protection', subCategory: 'onde', purpose: 'Barrar espíritos.', nomeYoruba: 'Mariwo Ogun', complexity: 'Baixa', tags: ['Porta'], oduReference: 'Ogun', niveis: [{ tipo: 'BÁSICO', estimativa_materiais: 0, materiais: ['Folha de Palmeira Desfiada'], preparo: ['Pendurar na porta.'], ofo: 'Mariwo ko je ki ibi wole.', traducao: 'Mariwo não deixa o mal entrar.' }] },
    { id: 'on_okuta_aro', title: 'Pedra Azul', category: 'health', subCategory: 'onde', purpose: 'Afastar doença da casa.', nomeYoruba: 'Okuta Aro', complexity: 'Baixa', tags: ['Saúde'], oduReference: 'Oyeku', niveis: [{ tipo: 'BÁSICO', estimativa_materiais: 20, materiais: ['Pedra Azul (Waji)'], preparo: ['Colocar num pote com água.'], ofo: 'Aro a gbe arun lo.', traducao: 'O azul levará a doença.' }] },
    { id: 'on_igi_nla', title: 'Estaca de Iroko', category: 'protection', subCategory: 'onde', purpose: 'Firmar a casa.', nomeYoruba: 'Igi Nla', complexity: 'Média', tags: ['Fundação'], oduReference: 'Irosun', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 50, materiais: ['Pedaço de Iroko'], preparo: ['Enterrar nos 4 cantos.'], ofo: 'Ile mi duro sinsin.', traducao: 'Minha casa fica firme.' }] },
    { id: 'on_ate_ile', title: 'Tapete Mágico', category: 'protection', subCategory: 'onde', purpose: 'Limpar pés de visitas.', nomeYoruba: 'Ate Aabo', complexity: 'Média', tags: ['Visita'], oduReference: 'Ose', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 80, materiais: ['Sal', 'Pimenta em pó'], preparo: ['Colocar debaixo do tapete da porta.'], ofo: 'Ibi ese, duro si ita.', traducao: 'Mal dos pés, fique fora.' }] },
    { id: 'on_digi', title: 'Espelho de Porta', category: 'protection', subCategory: 'onde', purpose: 'Refletir inveja.', nomeYoruba: 'Digi Aabo', complexity: 'Baixa', tags: ['Inveja'], oduReference: 'Osa', niveis: [{ tipo: 'BÁSICO', estimativa_materiais: 30, materiais: ['Espelho Pequeno'], preparo: ['Colocar na porta, lado de fora.'], ofo: 'Oju buruku, pada seyin.', traducao: 'Olho mau, volte para trás.' }] },
    { id: 'on_ikoko_aje', title: 'Pote de Riqueza', category: 'money', subCategory: 'onde', purpose: 'Acumular bens.', nomeYoruba: 'Ikoko Aje', complexity: 'Média', tags: ['Poupança'], oduReference: 'Iwori', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 100, materiais: ['Pote', 'Moedas', 'Mel'], preparo: ['Guardar moedas no pote com mel.'], ofo: 'Aje a po si.', traducao: 'A riqueza aumentará.' }] },
    { id: 'on_eyin_aja', title: 'Dente de Cachorro', category: 'protection', subCategory: 'onde', purpose: 'Avisar perigo.', nomeYoruba: 'Eyin Aja', complexity: 'Média', tags: ['Alerta'], oduReference: 'Ogun', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 40, materiais: ['Dente de Cão', 'Fio Vermelho'], preparo: ['Pendurar atrás da porta.'], ofo: 'Aja a gbo si ota.', traducao: 'O cão latirá para o inimigo.' }] },
    { id: 'on_omi_tutu', title: 'Água de Paz', category: 'health', subCategory: 'onde', purpose: 'Harmonia no lar.', nomeYoruba: 'Omi Ero', complexity: 'Baixa', tags: ['Paz'], oduReference: 'Obatala', niveis: [{ tipo: 'BÁSICO', estimativa_materiais: 0, materiais: ['Copo d\'água'], preparo: ['Trocar todo dia.'], ofo: 'Ile tutu.', traducao: 'Casa fresca.' }] },
    { id: 'on_atare_enu', title: 'Pimenta na Boca', category: 'power', subCategory: 'onde', purpose: 'Poder da palavra.', nomeYoruba: 'Atare Ase', complexity: 'Baixa', tags: ['Fala'], oduReference: 'Ejiogbe', niveis: [{ tipo: 'BÁSICO', estimativa_materiais: 5, materiais: ['7 Atares'], preparo: ['Mastigar antes de falar.'], ofo: 'Oro mi a se.', traducao: 'Minha palavra acontecerá.' }] },

    // --- AMULETOS ESPECIAIS (AKANSE) ---
    { id: 'on_owo_ero', title: 'Pulseira de Cobre', category: 'health', subCategory: 'onde', purpose: 'Contra dores articulares.', nomeYoruba: 'Ide Baba', complexity: 'Baixa', tags: ['Saúde'], oduReference: 'Oshe', niveis: [{ tipo: 'BÁSICO', estimativa_materiais: 40, materiais: ['Pulseira de Cobre'], preparo: ['Usar no pulso esquerdo.'], ofo: 'Ara a ya.', traducao: 'O corpo ficará bem.' }] },
    { id: 'on_ileke_esu', title: 'Colar de Esu', category: 'power', subCategory: 'onde', purpose: 'Abrir caminhos.', nomeYoruba: 'Ileke Esu', complexity: 'Média', tags: ['Caminho'], oduReference: 'Osetura', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 60, materiais: ['Contas Pretas/Vermelhas'], preparo: ['Lavar com Oti.'], ofo: 'Esu a la ona.', traducao: 'Exu abrirá o caminho.' }] },
    { id: 'on_ileke_obatala', title: 'Colar de Obatala', category: 'health', subCategory: 'onde', purpose: 'Clareza e paz.', nomeYoruba: 'Ileke Funfun', complexity: 'Média', tags: ['Paz'], oduReference: 'Ejiogbe', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 60, materiais: ['Contas Brancas'], preparo: ['Lavar com Omi e Efun.'], ofo: 'Obatala a gbe mi.', traducao: 'Obatala me apoiará.' }] },
    { id: 'on_apo_idan', title: 'Bolsa Mágica', category: 'power', subCategory: 'onde', purpose: 'Carregar axé.', nomeYoruba: 'Apo Ase', complexity: 'Alta', tags: ['Poder'], oduReference: 'Owonrin', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 200, materiais: ['Couro', 'Pó de Ifá'], preparo: ['Costurar bolsa.'], ofo: 'Ase a wa ninu apo.', traducao: 'O axé estará na bolsa.' }] },
    { id: 'on_bata_ase', title: 'Sapatos de Poder', category: 'victory', subCategory: 'onde', purpose: 'Pisar firme.', nomeYoruba: 'Bata Ase', complexity: 'Média', tags: ['Caminhada'], oduReference: 'Irosun', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 100, materiais: ['Sapatos', 'Iyerosun'], preparo: ['Soprar pó nos sapatos.'], ofo: 'Ese mi a duro.', traducao: 'Meus pés ficarão firmes.' }] },
    { id: 'on_fila_ori', title: 'Gorro de Proteção', category: 'protection', subCategory: 'onde', purpose: 'Proteger o Ori.', nomeYoruba: 'Fila Aabo', complexity: 'Média', tags: ['Cabeça'], oduReference: 'Ogbe', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 80, materiais: ['Gorro Branco', 'Efun'], preparo: ['Marcar Ejiogbe dentro.'], ofo: 'Ori mi a bo.', traducao: 'Minha cabeça estará coberta.' }] },
    { id: 'on_oruka_ife', title: 'Anel de Amor', category: 'love', subCategory: 'onde', purpose: 'Manter amor.', nomeYoruba: 'Oruka Ife', complexity: 'Média', tags: ['Amor'], oduReference: 'Oshe', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 120, materiais: ['Anel Cobre', 'Mel'], preparo: ['Mergulhar no mel.'], ofo: 'Ife a dun.', traducao: 'O amor será doce.' }] },
    { id: 'on_igbale_kekere', title: 'Vassourinha', category: 'protection', subCategory: 'onde', purpose: 'Varrer mal do corpo.', nomeYoruba: 'Igbale', complexity: 'Baixa', tags: ['Limpeza'], oduReference: 'Obaluaye', niveis: [{ tipo: 'BÁSICO', estimativa_materiais: 20, materiais: ['Palha'], preparo: ['Fazer mini vassoura.'], ofo: 'Arun jade.', traducao: 'Doença saia.' }] },
    { id: 'on_okuta_aje', title: 'Pedra da Riqueza', category: 'money', subCategory: 'onde', purpose: 'Atrair ouro.', nomeYoruba: 'Okuta Aje', complexity: 'Baixa', tags: ['Dinheiro'], oduReference: 'Ejiogbe', niveis: [{ tipo: 'BÁSICO', estimativa_materiais: 0, materiais: ['Pedra Pirita'], preparo: ['Carregar na bolsa.'], ofo: 'Aje a teleru.', traducao: 'A riqueza seguirá.' }] },
    { id: 'on_koko_ase', title: 'Nó de Poder', category: 'protection', subCategory: 'onde', purpose: 'Amarrar inimigo.', nomeYoruba: 'Koko', complexity: 'Média', tags: ['Amarração'], oduReference: 'Odi', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 10, materiais: ['Corda'], preparo: ['Dar 7 nós.'], ofo: 'Ota a de.', traducao: 'Inimigo está amarrado.' }] }
];
// ----------------------------------------------------------------------------
// DB_IMULE: 30 PACTOS E ALIANÇAS
// ----------------------------------------------------------------------------
export const DB_IMULE: OogunItem[] = [
    // --- PACTOS COM IYAMI (AGBA) ---
    { id: 'im_iyami_owo', title: 'Pacto de Riqueza', category: 'money', subCategory: 'imule', purpose: 'Obter favor das Mães para dinheiro.', nomeYoruba: 'Imule Aje', complexity: 'Alta', tags: ['Iyami', 'Dinheiro'], oduReference: 'Osa Meji', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 500, materiais: ['16 Ovos', 'Dendê', 'Iyerosun', 'Cabaça'], preparo: ['Arrumar ovos na cabaça.', 'Cobrir com Dendê.', 'Marcar Osa Meji.', 'Deixar na encruzilhada à noite.'], ofo: 'Iyami, e gba ebo mi. E fun mi ni owo.', traducao: 'Minhas Mães, aceitem minha oferta. Me deem dinheiro.' }] },
    { id: 'im_iyami_abo', title: 'Pacto de Proteção', category: 'protection', subCategory: 'imule', purpose: 'Não ser atacado por bruxaria.', nomeYoruba: 'Imule Abo', complexity: 'Alta', tags: ['Iyami', 'Defesa'], oduReference: 'Oyeku Meji', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 400, materiais: ['Fígado de Boi', 'Epo Pupa', 'Sal'], preparo: ['Cozinhar fígado com dendê.', 'Oferecer às Mães.'], ofo: 'E ma pa mi. Omo yin ni mi.', traducao: 'Não me matem. Sou filho de vocês.' }] },
    { id: 'im_iyami_omo', title: 'Pacto de Fertilidade', category: 'health', subCategory: 'imule', purpose: 'Ter filhos.', nomeYoruba: 'Imule Omo', complexity: 'Alta', tags: ['Iyami', 'Filhos'], oduReference: 'Oshe Tura', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 600, materiais: ['Cabra', 'Mel', 'Ovos'], preparo: ['Sacrifício para as Mães.', 'Pedir ventre fértil.'], ofo: 'E fun mi ni omo.', traducao: 'Me deem filhos.' }] },
    { id: 'im_iyami_agbara', title: 'Pacto de Poder', category: 'power', subCategory: 'imule', purpose: 'Ter autoridade espiritual.', nomeYoruba: 'Imule Agbara', complexity: 'Alta', tags: ['Iyami', 'Poder'], oduReference: 'Irete Meji', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 800, materiais: ['Eyele Dudu (Pombo Preto)', 'Osun (Pó Vermelho)', 'Efun (Giz Branco)'], preparo: ['Ir à floresta durante a noite.', 'Marcar o Odu Irete Meji no chão usando Efun e Osun.', 'Segurar o Eyele Dudu e apresentar às Iyami.', 'Sacrificar o animal sobre a marca, deixando o sangue (Eje) cair.', 'Misturar o Eje com a terra consagrada e marcar a testa.'], ofo: 'Ase nla ni ti yin. Iyami E fun mi ni agbara.', traducao: 'O grande poder é de vocês. Minhas Mães, me deem poder.' }] },
    { id: 'im_iyami_isegun', title: 'Pacto de Vitória', category: 'victory', subCategory: 'imule', purpose: 'Vencer inimigos.', nomeYoruba: 'Imule Isegun', complexity: 'Alta', tags: ['Iyami', 'Guerra'], oduReference: 'Okanran', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 500, materiais: ['Galo', 'Pimenta', 'Dendê'], preparo: ['Oferenda quente.'], ofo: 'E ba mi ja.', traducao: 'Lutem por mim.' }] },

    // --- PACTOS COM EGBE (ORUN) ---
    { id: 'im_egbe_alafia', title: 'Pacto de Paz', category: 'health', subCategory: 'imule', purpose: 'Parar de ouvir vozes.', nomeYoruba: 'Imule Egbe', complexity: 'Média', tags: ['Egbe', 'Mente'], oduReference: 'Ogbe', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 200, materiais: ['Frutas', 'Doces', 'Cana'], preparo: ['Festa para Egbe no rio.'], ofo: 'Egbe orun, e ma yonu.', traducao: 'Companheiros do céu, não perturbem.' }] },
    { id: 'im_egbe_owo', title: 'Pacto de Prosperidade', category: 'money', subCategory: 'imule', purpose: 'Sorte vinda do céu.', nomeYoruba: 'Imule Egbe Aje', complexity: 'Média', tags: ['Egbe', 'Dinheiro'], oduReference: 'Ose', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 250, materiais: ['Banana Frita', 'Mel', 'Moedas'], preparo: ['Oferenda em árvore frutífera.'], ofo: 'E gbe aje wa.', traducao: 'Tragam riqueza.' }] },
    { id: 'im_egbe_ife', title: 'Pacto de Amor', category: 'love', subCategory: 'imule', purpose: 'Encontrar parceiro de destino.', nomeYoruba: 'Imule Egbe Ife', complexity: 'Média', tags: ['Egbe', 'Amor'], oduReference: 'Osun', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 150, materiais: ['Espelho', 'Perfume', 'Flores'], preparo: ['Deixar na beira do rio.'], ofo: 'E wa oko rere fun mi.', traducao: 'Busquem um bom marido para mim.' }] },
    { id: 'im_egbe_abiku', title: 'Pacto Abiku', category: 'health', subCategory: 'imule', purpose: 'Manter criança viva.', nomeYoruba: 'Imule Abiku', complexity: 'Alta', tags: ['Egbe', 'Vida'], oduReference: 'Owonrin', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 400, materiais: ['Comida variada', 'Bebidas'], preparo: ['Banquete para os companheiros.'], ofo: 'E ma pe omo yi.', traducao: 'Não chamem esta criança.' }] },
    { id: 'im_egbe_iran', title: 'Pacto de Visão', category: 'power', subCategory: 'imule', purpose: 'Ver o futuro.', nomeYoruba: 'Imule Iran', complexity: 'Alta', tags: ['Egbe', 'Visão'], oduReference: 'Otura', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 300, materiais: ['Água de Chuva', 'Efun'], preparo: ['Lavar os olhos.'], ofo: 'E la oju mi.', traducao: 'Abram meus olhos.' }] },

    // --- PACTOS COM ESU (ONA) ---
    { id: 'im_esu_ona', title: 'Pacto de Caminhos', category: 'power', subCategory: 'imule', purpose: 'Abrir todas as portas.', nomeYoruba: 'Imule Esu', complexity: 'Média', tags: ['Esu', 'Caminho'], oduReference: 'Osetura', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 100, materiais: ['Galo Preto', 'Dendê', 'Oti'], preparo: ['Sacrifício na encruzilhada.'], ofo: 'Esu, la ona.', traducao: 'Exu, abra o caminho.' }] },
    { id: 'im_esu_owo', title: 'Pacto de Dinheiro', category: 'money', subCategory: 'imule', purpose: 'Dinheiro rápido.', nomeYoruba: 'Imule Esu Owo', complexity: 'Média', tags: ['Esu', 'Dinheiro'], oduReference: 'Owonrin', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 150, materiais: ['Moedas', 'Búzios', 'Dendê'], preparo: ['Enterrar na entrada.'], ofo: 'Esu, gbe owo wa.', traducao: 'Exu, traga dinheiro.' }] },
    { id: 'im_esu_ija', title: 'Pacto de Guerra', category: 'victory', subCategory: 'imule', purpose: 'Vencer disputa.', nomeYoruba: 'Imule Esu Ija', complexity: 'Alta', tags: ['Esu', 'Guerra'], oduReference: 'Okanran', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 300, materiais: ['Pimenta', 'Pólvora', 'Galo'], preparo: ['Oferenda explosiva.'], ofo: 'Esu, ba mi ja.', traducao: 'Exu, lute por mim.' }] },
    { id: 'im_esu_abo', title: 'Pacto de Defesa', category: 'protection', subCategory: 'imule', purpose: 'Ninguém entra.', nomeYoruba: 'Imule Esu Abo', complexity: 'Média', tags: ['Esu', 'Defesa'], oduReference: 'Odi', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 100, materiais: ['Cadeado', 'Dendê'], preparo: ['Trancar cadeado com dendê.'], ofo: 'Esu, ti ilekun.', traducao: 'Exu, tranque a porta.' }] },
    { id: 'im_esu_agbara', title: 'Pacto de Comando', category: 'power', subCategory: 'imule', purpose: 'Ser obedecido.', nomeYoruba: 'Imule Esu Ase', complexity: 'Alta', tags: ['Esu', 'Poder'], oduReference: 'Irete', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 200, materiais: ['Chifre', 'Terra de Mercado'], preparo: ['Fazer um chifre de comando.'], ofo: 'Esu, fun mi lase.', traducao: 'Exu, me dê axé.' }] },

    // --- PACTOS COM ILE (TERRA) ---
    { id: 'im_ile_owo', title: 'Pacto da Terra', category: 'money', subCategory: 'imule', purpose: 'Prosperidade fixa.', nomeYoruba: 'Imule Ile', complexity: 'Média', tags: ['Terra', 'Riqueza'], oduReference: 'Iwori', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 100, materiais: ['Inhame', 'Mel', 'Moedas'], preparo: ['Enterrar inhame com moedas.'], ofo: 'Ile, gba ebo.', traducao: 'Terra, aceite a oferta.' }] },
    { id: 'im_ile_abo', title: 'Pacto de Fundação', category: 'protection', subCategory: 'imule', purpose: 'Casa segura.', nomeYoruba: 'Imule Ile Abo', complexity: 'Média', tags: ['Terra', 'Casa'], oduReference: 'Irosun', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 150, materiais: ['Pedra', 'Ferro'], preparo: ['Enterrar nos alicerces.'], ofo: 'Ile mi ko ni wo.', traducao: 'Minha casa não cairá.' }] },
    { id: 'im_ile_eso', title: 'Pacto de Colheita', category: 'money', subCategory: 'imule', purpose: 'Fartura.', nomeYoruba: 'Imule Kore', complexity: 'Baixa', tags: ['Terra', 'Comida'], oduReference: 'Ejiogbe', niveis: [{ tipo: 'BÁSICO', estimativa_materiais: 50, materiais: ['Grãos', 'Água'], preparo: ['Plantar grãos.'], ofo: 'Ile a so eso.', traducao: 'A terra dará frutos.' }] },
    { id: 'im_ile_oku', title: 'Pacto Ancestral', category: 'power', subCategory: 'imule', purpose: 'Conexão com mortos.', nomeYoruba: 'Imule Oku', complexity: 'Alta', tags: ['Terra', 'Morte'], oduReference: 'Oyeku', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 300, materiais: ['Roupa de Morto', 'Gim'], preparo: ['Ritual no cemitério.'], ofo: 'Oku, e dide.', traducao: 'Mortos, levantem-se.' }] },
    { id: 'im_ile_agbara', title: 'Pacto de Domínio', category: 'victory', subCategory: 'imule', purpose: 'Dominar território.', nomeYoruba: 'Imule Ilu', complexity: 'Alta', tags: ['Terra', 'Poder'], oduReference: 'Ogunda', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 400, materiais: ['Terra de 7 lugares', 'Galo'], preparo: ['Misturar terras com sangue.'], ofo: 'Mo ni ile yi.', traducao: 'Eu possuo esta terra.' }] },

    // --- PACTOS DIVERSOS ---
    { id: 'im_aje_shaluga', title: 'Pacto com Aje', category: 'money', subCategory: 'imule', purpose: 'Riqueza extrema.', nomeYoruba: 'Imule Aje Shaluga', complexity: 'Alta', tags: ['Aje', 'Ouro'], oduReference: 'Ejiogbe', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 1000, materiais: ['Conchas', 'Mel', 'Ouro'], preparo: ['Oferenda na praia.'], ofo: 'Aje, wa ba mi gbe.', traducao: 'Riqueza, venha morar comigo.' }] },
    { id: 'im_ogun_agbede', title: 'Pacto com Ogun', category: 'victory', subCategory: 'imule', purpose: 'Vencer guerras.', nomeYoruba: 'Imule Ogun', complexity: 'Alta', tags: ['Ogun', 'Ferro'], oduReference: 'Ogunda', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 500, materiais: ['Cachorro (simbólico)', 'Inhame', 'Dendê'], preparo: ['Oferenda ao ferro.'], ofo: 'Ogun, ja fun mi.', traducao: 'Ogun, lute por mim.' }] },
    { id: 'im_osun_ibu', title: 'Pacto com Osun', category: 'love', subCategory: 'imule', purpose: 'Beleza e amor.', nomeYoruba: 'Imule Osun', complexity: 'Média', tags: ['Osun', 'Amor'], oduReference: 'Oshe', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 300, materiais: ['Ouro', 'Mel', 'Perfume'], preparo: ['Oferenda no rio.'], ofo: 'Osun, fun mi ni ewa.', traducao: 'Oxum, me dê beleza.' }] },
    { id: 'im_sango_oba', title: 'Pacto com Sango', category: 'justice', subCategory: 'imule', purpose: 'Justiça rápida.', nomeYoruba: 'Imule Sango', complexity: 'Alta', tags: ['Sango', 'Justiça'], oduReference: 'Okanran', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 400, materiais: ['Amalá', 'Orogbo'], preparo: ['Oferenda na pedreira.'], ofo: 'Sango, pa ota mi.', traducao: 'Xangô, mate meu inimigo.' }] },
    { id: 'im_obatala_ala', title: 'Pacto com Obatala', category: 'health', subCategory: 'imule', purpose: 'Paz absoluta.', nomeYoruba: 'Imule Obatala', complexity: 'Média', tags: ['Obatala', 'Paz'], oduReference: 'Ejiogbe', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 200, materiais: ['Igbin', 'Efun', 'Inhame Pilado'], preparo: ['Oferenda branca.'], ofo: 'Obatala, fun mi ni alafia.', traducao: 'Obatala, me dê paz.' }] },
    { id: 'im_oya_afefe', title: 'Pacto com Oya', category: 'power', subCategory: 'imule', purpose: 'Mudança rápida.', nomeYoruba: 'Imule Oya', complexity: 'Alta', tags: ['Oya', 'Vento'], oduReference: 'Osa', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 300, materiais: ['Acarajé', 'Vinho'], preparo: ['Oferenda no bambuzal.'], ofo: 'Oya, gbe ibi lo.', traducao: 'Oya, leve o mal embora.' }] },
    { id: 'im_ifa_ela', title: 'Pacto com Ifá', category: 'power', subCategory: 'imule', purpose: 'Sabedoria.', nomeYoruba: 'Imule Ifá', complexity: 'Alta', tags: ['Ifá', 'Saber'], oduReference: 'Ejiogbe', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 600, materiais: ['Ikin', 'Obi', 'Cabra'], preparo: ['Iniciação.'], ofo: 'Ifá, koo mi.', traducao: 'Ifá, me ensine.' }] },
    { id: 'im_ori_apere', title: 'Pacto com Ori', category: 'power', subCategory: 'imule', purpose: 'Realização pessoal.', nomeYoruba: 'Imule Ori', complexity: 'Média', tags: ['Ori', 'Destino'], oduReference: 'Ogbe', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 100, materiais: ['Coco', 'Pano Branco'], preparo: ['Bori.'], ofo: 'Ori mi, gbe mi.', traducao: 'Meu Ori, me apoie.' }] },
    { id: 'im_osanyin_ewe', title: 'Pacto com Osanyin', category: 'health', subCategory: 'imule', purpose: 'Poder das ervas.', nomeYoruba: 'Imule Osanyin', complexity: 'Alta', tags: ['Osanyin', 'Ervas'], oduReference: 'Odi', niveis: [{ tipo: 'COMPLETO', estimativa_materiais: 400, materiais: ['Fumo', 'Cachaça', 'Ervas'], preparo: ['Oferenda na mata.'], ofo: 'Osanyin, jowo ewe.', traducao: 'Osanyin, entregue as ervas.' }] },
    { id: 'im_erinle_ode', title: 'Pacto com Erinle', category: 'money', subCategory: 'imule', purpose: 'Caça farta.', nomeYoruba: 'Imule Erinle', complexity: 'Média', tags: ['Erinle', 'Caça'], oduReference: 'Owonrin', niveis: [{ tipo: 'MÉDIO', estimativa_materiais: 200, materiais: ['Peixe', 'Inhame'], preparo: ['Oferenda no rio.'], ofo: 'Erinle, fun mi ni eran.', traducao: 'Erinle, me dê carne.' }] }
];
// ----------------------------------------------------------------------------
// DB_GIGA: 30 ALTA MAGIA (ACESSO RESTRITO)
// ----------------------------------------------------------------------------
export const DB_GIGA: OogunItem[] = [
    // --- MAGIA DE COMANDO E PODER (ASE) ---
    {
        id: 'gi_afose_nla',
        title: 'Afose Nla (Poder da Palavra)',
        category: 'power', subCategory: 'giga',
        purpose: 'Fazer com que tudo o que for dito aconteça imediatamente.',
        nomeYoruba: 'Afose Alagbara',
        complexity: 'Alta',
        tags: ['Comando', 'Fala', 'Poder'],
        oduReference: 'Ejiogbe',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 3500,
            materiais: ['Ahọn Agiliti (Língua de Lagarto Monitor)', 'Ahọn Eyele (Língua de Pombo)', 'Ewe Abamoda (Folha)', 'Iye Agbe (Pena Azul)', 'Iye Aluko (Pena Vermelha)', 'Ikodide (Pena de Papagaio)', 'Ose Dudu (Sabão Negro)'],
            preparo: [
                'Secar as línguas e as folhas ao sol.',
                'Pilar tudo até virar um pó fino (Agún).',
                'Misturar o pó com Ose Dudu dentro de um chifre de Agbo (Carneiro).',
                'Inserir as penas (Agbe, Aluko, Ikodide) no topo do sabão.',
                'Pendurar o chifre em um local alto, longe de mulheres.',
                'Para usar, tocar a língua no sabão e falar.'
            ],
            ofo: 'Ase! Ohun ti a ba wi fun Ogbo, ni Ogbo n gbo. Ohun ti a ba wi fun Ogba, ni Ogba n gba. Ohun ti mo ba wi loni, ki o se!',
            traducao: 'Axé! O que dizemos ao velho, ele ouve. O que dizemos ao sábio, ele aceita. O que eu disser hoje, que aconteça!'
        }]
    },
    {
        id: 'gi_gbetugbetu',
        title: 'Gbetugbetu (Hipnose)',
        category: 'power', subCategory: 'giga',
        purpose: 'Fazer as pessoas obedecerem sem questionar, como hipnose.',
        nomeYoruba: 'Gbetugbetu',
        complexity: 'Perigosa',
        tags: ['Hipnose', 'Controle'],
        oduReference: 'Ogunda Meji',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 5000,
            materiais: ['Ori Ologbo (Cabeça de Gato)', 'Ewe Esinsin', 'Ewe Aragba', 'Oti (Gim)', 'Ado (Cabaça Pequena)'],
            preparo: [
                'Queimar a cabeça de gato com as folhas em um pote de barro (Ape) até virar pó preto (Edu).',
                'Moer o pó finamente.',
                'Colocar o pó dentro da Ado (cabaça).',
                'Para usar, colocar um pouco do pó na palma da mão esquerda, recitar o Ofó e soprar na direção da pessoa.'
            ],
            ofo: 'Gbetugbetu, gbe won lo! Bi ologbo ba n gbo, a gba. Gbo temi loni!',
            traducao: 'Gbetugbetu, leve-os! Se o gato mia, ele é ouvido. Ouça-me hoje!'
        }]
    },
    {
        id: 'gi_olugbohun',
        title: 'Olugbohun (O Eco)',
        category: 'power', subCategory: 'giga',
        purpose: 'Amplificar a voz espiritual para que os pedidos sejam atendidos pelos Irunmole.',
        nomeYoruba: 'Olugbohun',
        complexity: 'Alta',
        tags: ['Voz', 'Espiritual'],
        oduReference: 'Oyeku Meji',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 4500,
            materiais: ['Ori Akuko (Cabeça de Galo)', 'Ewe Odundun', 'Ewe Tete', 'Iyerosun', 'Opon Ifá'],
            preparo: [
                'Marcar Oyeku Meji no Opon Ifá com Iyerosun.',
                'Rezar o Odu sobre o pó.',
                'Misturar o pó com as folhas piladas e a cabeça de galo seca e moída.',
                'Ingerir uma pequena quantidade com Oti antes de rituais importantes.'
            ],
            ofo: 'Olugbohun, gbo ohun mi. Bi akuko ba ko, aye a gbo. Gbo adura mi!',
            traducao: 'Olugbohun, ouça minha voz. Se o galo canta, o mundo ouve. Ouça minha oração!'
        }]
    },
    {
        id: 'gi_mayehun',
        title: 'Mayehun (Não Recuse)',
        category: 'power', subCategory: 'giga',
        purpose: 'Impedir que alguém negue um pedido seu.',
        nomeYoruba: 'Mayehun',
        complexity: 'Média',
        tags: ['Persuasão', 'Negócios'],
        oduReference: 'Iwori Meji',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 2000,
            materiais: ['Ewe Amunimuye', 'Obi Abata (Noz de Cola)', 'Orogbo (Bitter Kola)', 'Oti'],
            preparo: [
                'Mastigar a folha Amunimuye com um pedaço de Obi e Orogbo.',
                'Cuspir a mistura no chão três vezes dizendo o nome da pessoa.',
                'Beber um gole de Oti e ir falar com a pessoa imediatamente.'
            ],
            ofo: 'Amunimuye, mu iye re wa. O ko gbodo kọ fun mi.',
            traducao: 'Amunimuye, traga a mente dele. Você não ousa me recusar.'
        }]
    },
    {
        id: 'gi_ase_jeun',
        title: 'Aseje (Comida de Poder)',
        category: 'power', subCategory: 'giga',
        purpose: 'Ingerir poder para fortalecer o Axé interno.',
        nomeYoruba: 'Aseje Agbara',
        complexity: 'Alta',
        tags: ['Alimento', 'Axé'],
        oduReference: 'Odi Meji',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 3000,
            materiais: ['Eja Aro (Bagre)', 'Ewe Efinrin', 'Ata Ijosi (Pimenta)', 'Iyerosun'],
            preparo: [
                'Cozinhar o peixe com as folhas e pimenta.',
                'Marcar Odi Meji no Iyerosun e rezar.',
                'Despejar o pó sobre o peixe cozido.',
                'Comer tudo sozinho, sem quebrar os ossos do peixe.'
            ],
            ofo: 'Ase wole mi. Agbara wole mi.',
            traducao: 'Axé entra em mim. Força entra em mim.'
        }]
    },

    // --- MAGIA DE ATAQUE E DEFESA (ABILU / MADARIKAN) ---
    {
        id: 'gi_abilu_iku_nla',
        title: 'Abilu Iku (Ataque Mortal)',
        category: 'victory', subCategory: 'giga',
        purpose: 'Neutralizar inimigo mortalmente perigoso. (USO EXTREMO)',
        nomeYoruba: 'Abilu Iku',
        complexity: 'Perigosa',
        tags: ['Ataque', 'Morte'],
        oduReference: 'Oyeku Meji',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 8000,
            materiais: ['Erupe Varun (Terra de Cemitério)', 'Ori Owiwi (Cabeça de Coruja)', 'Ewe Ina (Folha de Fogo)', 'Ata Pupa (Pimenta Vermelha)'],
            preparo: [
                'À meia-noite, misturar a terra com as folhas e a cabeça de coruja.',
                'Queimar tudo em um pote quebrado.',
                'Soprar o pó na direção da casa do inimigo chamando seu nome 3 vezes.'
            ],
            ofo: 'Iku, lo pa ota mi. Owiwi ni n kede iku.',
            traducao: 'Morte, vá matar meu inimigo. A coruja anuncia a morte.'
        }]
    },
    {
        id: 'gi_madarikan_nla',
        title: 'Madarikan (Retorno Supremo)',
        category: 'protection', subCategory: 'giga',
        purpose: 'Devolver qualquer mal enviado com força triplicada.',
        nomeYoruba: 'Apadà Ibi Nla',
        complexity: 'Alta',
        tags: ['Retorno', 'Defesa'],
        oduReference: 'Okanran Meji',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 4000,
            materiais: ['Ewe Alupaida', 'Ikarahun Igbin (Casco de Caracol)', 'Epo Pupa', 'Ose Dudu'],
            preparo: [
                'Torrar Ewe Alupaida dentro do casco de caracol.',
                'Moer o resultado com Ose Dudu.',
                'Tomar banho com este sabão à noite, pedindo retorno do mal.'
            ],
            ofo: 'Alupaida, pa ibi da si olubi. Bi igbin ba fa, a fa ikarahun re.',
            traducao: 'Alupaida, vire o mal para o dono. Se o caracol rasteja, ele arrasta sua casa.'
        }]
    },
    {
        id: 'gi_asasi',
        title: 'Asasi (Feitiço de Confusão)',
        category: 'victory', subCategory: 'giga',
        purpose: 'Causar confusão mental e desorientação no inimigo.',
        nomeYoruba: 'Asasi',
        complexity: 'Alta',
        tags: ['Confusão', 'Ataque'],
        oduReference: 'Owonrin Meji',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 3500,
            materiais: ['Ori Aja (Cabeça de Cachorro)', 'Ewe Werepe', 'Oti'],
            preparo: [
                'Enterrar a cabeça de cachorro com Ewe Werepe no caminho do inimigo.',
                'Regar com Oti.',
                'Chamar o nome do inimigo e ordenar confusão.'
            ],
            ofo: 'Aja n gbo, were n ja. Ori re o daru.',
            traducao: 'O cachorro late, a loucura ataca. Sua cabeça ficará confusa.'
        }]
    },
    {
        id: 'gi_ajatuka',
        title: 'Ajatuka (Separador)',
        category: 'victory', subCategory: 'giga',
        purpose: 'Separar duas pessoas ou dispersar um grupo conspirador.',
        nomeYoruba: 'Ajatuka',
        complexity: 'Alta',
        tags: ['Separação', 'Conflito'],
        oduReference: 'Ogunda Meji',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 3000,
            materiais: ['Ewe Ina', 'Ewe Aaragba', 'Imi Ojo (Enxofre)', 'Ata'],
            preparo: [
                'Queimar as folhas com enxofre e pimenta.',
                'Soprar o pó onde as pessoas se reúnem.'
            ],
            ofo: 'Ina n jo, ara n san. E tuka!',
            traducao: 'O fogo queima, o trovão estala. Dispersem-se!'
        }]
    },
    {
        id: 'gi_isora_nla',
        title: 'Isora Nla (Corpo Fechado)',
        category: 'protection', subCategory: 'giga',
        purpose: 'Tornar o corpo imune a ataques físicos e espirituais.',
        nomeYoruba: 'Isora',
        complexity: 'Alta',
        tags: ['Imunidade', 'Defesa'],
        oduReference: 'Osa Meji',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 6000,
            materiais: ['Ewe Okira', 'Ewe Eimokun', 'Odidi Atare (Pimenta da Costa Inteira)', 'Awo Ijimere (Couro de Macaco)'],
            preparo: [
                'Queimar tudo em um pote novo até virar pó.',
                'Fazer 21 incisões (Gbere) no peito e esfregar o pó.',
                'Ingerir um pouco do pó com Oti.'
            ],
            ofo: 'Okira kii je ki ota ri o. Ara mi di okuta.',
            traducao: 'Okira não deixa o inimigo te ver. Meu corpo vira pedra.'
        }]
    },

    // --- MAGIA DE TRANSFORMAÇÃO E INVISIBILIDADE (PARADA / AFEERI) ---
    {
        id: 'gi_afeeri',
        title: 'Afeeri (Manto de Invisibilidade)',
        category: 'protection', subCategory: 'giga',
        purpose: 'Tornar-se invisível ou não notado em situações de perigo.',
        nomeYoruba: 'Afeeri',
        complexity: 'Perigosa',
        tags: ['Invisibilidade', 'Fuga'],
        oduReference: 'Owonrin Meji',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 10000,
            materiais: ['Awo Owiwi (Pele de Coruja)', 'Ewe Afeeri', 'Osun', 'Efun'],
            preparo: [
                'Costurar um amuleto com a pele de coruja contendo as folhas.',
                'Consagrar com Osun e Efun em uma encruzilhada à meia-noite.',
                'Usar o amuleto na cintura quando precisar sumir.'
            ],
            ofo: 'Owiwi kii rin osan. Oju ota ko ni ri mi.',
            traducao: 'A coruja não anda de dia. Os olhos do inimigo não me verão.'
        }]
    },
    {
        id: 'gi_kanako',
        title: 'Kanako (Encurtar Caminho)',
        category: 'power', subCategory: 'giga',
        purpose: 'Chegar ao destino rapidamente, dobrando o espaço.',
        nomeYoruba: 'Kanako',
        complexity: 'Alta',
        tags: ['Viagem', 'Tempo'],
        oduReference: 'Ose Meji',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 5000,
            materiais: ['Ewe Kanako', 'Ori Ajapa (Cabeça de Tartaruga)', 'Oruka (Anel de Ferro)'],
            preparo: [
                'Ferver o anel com as folhas e a cabeça de tartaruga.',
                'Deixar secar e colocar o anel no dedo médio do pé esquerdo antes de viajar.'
            ],
            ofo: 'Kanako, fa ona kuru. Ajapa kii rin jin.',
            traducao: 'Kanako, encurte o caminho. A tartaruga não anda longe.'
        }]
    },
    {
        id: 'gi_egbe',
        title: 'Egbe (Teletransporte Espiritual)',
        category: 'protection', subCategory: 'giga',
        purpose: 'Ser transportado para casa em momento de perigo mortal.',
        nomeYoruba: 'Egbe',
        complexity: 'Perigosa',
        tags: ['Teletransporte', 'Salvação'],
        oduReference: 'Ogbe Ogunda',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 12000,
            materiais: ['Ewe Egbe', 'Iye Igun (Pena de Abutre)', 'Ado (Cabaça)'],
            preparo: [
                'Queimar os ingredientes até virar pó.',
                'Guardar na Ado.',
                'Em perigo, bater na Ado 3 vezes e chamar "Egbe gbe mi!".'
            ],
            ofo: 'Egbe gbe mi lo si ile. Igun n fo lo soke.',
            traducao: 'Egbe me leve para casa. O abutre voa para o alto.'
        }]
    },
    {
        id: 'gi_parada',
        title: 'Parada (Transformação)',
        category: 'power', subCategory: 'giga',
        purpose: 'Disfarçar a aparência física ou espiritual.',
        nomeYoruba: 'Parada',
        complexity: 'Perigosa',
        tags: ['Disfarce', 'Ilusão'],
        oduReference: 'Osa Meji',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 8000,
            materiais: ['Awo Agemo (Pele de Camaleão)', 'Ewe Alupaida', 'Ose Dudu'],
            preparo: [
                'Pilar a pele de camaleão com Alupaida.',
                'Misturar ao sabão.',
                'Lavar o rosto com o sabão antes de sair.'
            ],
            ofo: 'Agemo a pa awo da. Eda mi yipada.',
            traducao: 'O camaleão muda de cor. Minha natureza muda.'
        }]
    },
    {
        id: 'gi_agbara_ojiji',
        title: 'Agbara Ojiji (Poder da Sombra)',
        category: 'power', subCategory: 'giga',
        purpose: 'Controlar ou atacar através da sombra.',
        nomeYoruba: 'Ojiji',
        complexity: 'Alta',
        tags: ['Sombra', 'Oculto'],
        oduReference: 'Oyeku Meji',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 4000,
            materiais: ['Erupe Ojiji (Terra da Sombra)', 'Ewe Oloju', 'Atare'],
            preparo: [
                'Pegar terra onde a sombra de alguém caiu.',
                'Misturar com folhas e pimenta.',
                'Usar em rituais para influenciar a pessoa.'
            ],
            ofo: 'Ojiji re wa lowo mi.',
            traducao: 'Sua sombra está na minha mão.'
        }]
    },

    // --- MAGIA DE RIQUEZA E SORTE (OSOLE / AWURE) ---
    {
        id: 'gi_osole_gbigbona',
        title: 'Osole Gbigbona (Riqueza Quente)',
        category: 'money', subCategory: 'giga',
        purpose: 'Atrair grandes somas de dinheiro rapidamente (com consequências).',
        nomeYoruba: 'Osole Nla',
        complexity: 'Perigosa',
        tags: ['Dinheiro', 'Risco'],
        oduReference: 'Irosun Meji',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 15000,
            materiais: ['Ori Ologbo (Cabeça de Gato)', 'Ewe Aje', 'Ewe Sawerepepe', 'Oti (Gim)', 'Ape (Pote)'],
            preparo: [
                'Colocar a cabeça de gato e as folhas no pote.',
                'Queimar até virar pó preto.',
                'Misturar com Oti.',
                'Beber um cálice toda segunda-feira.'
            ],
            ofo: 'Ologbo kii rina. Ki n ri owo nla loni.',
            traducao: 'O gato não perde o caminho. Que eu encontre grande dinheiro hoje.'
        }]
    },
    {
        id: 'gi_awure_ola',
        title: 'Awure Ola (Sorte de Honra)',
        category: 'money', subCategory: 'giga',
        purpose: 'Atrair posições de honra e riqueza estável.',
        nomeYoruba: 'Awure Ola',
        complexity: 'Alta',
        tags: ['Honra', 'Status'],
        oduReference: 'Ejiogbe',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 5000,
            materiais: ['Eyele Funfun (Pombo Branco)', 'Ewe Akoko', 'Oyin (Mel)', 'Efun'],
            preparo: [
                'Sacrificar o pombo sobre as folhas de Akoko.',
                'Deixar secar e moer.',
                'Misturar com mel e lamber todas as manhãs.'
            ],
            ofo: 'Akoko ni fi oye fun ni. Ola nla wa ba mi.',
            traducao: 'Akoko dá títulos. Grande honra venha a mim.'
        }]
    },
    {
        id: 'gi_osole_owo',
        title: 'Osole Owo (Magia de Dinheiro)',
        category: 'money', subCategory: 'giga',
        purpose: 'Fluxo contínuo de dinheiro.',
        nomeYoruba: 'Osole Owo',
        complexity: 'Alta',
        tags: ['Fluxo', 'Dinheiro'],
        oduReference: 'Ose Meji',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 7000,
            materiais: ['Okete (Ratazana)', 'Ewe Aje', 'Atare', 'Oti'],
            preparo: [
                'Queimar a ratazana inteira com Ewe Aje e Atare.',
                'Moer o pó.',
                'Tomar com Oti.'
            ],
            ofo: 'Okete ni n gbe owo wa. Aje wole.',
            traducao: 'A ratazana traz dinheiro. Riqueza entre.'
        }]
    },
    {
        id: 'gi_eyonu_agba',
        title: 'Eyonu Agba (Favor das Mães)',
        category: 'money', subCategory: 'giga',
        purpose: 'Apaziguar as Iyami para que permitam a prosperidade.',
        nomeYoruba: 'Eyonu',
        complexity: 'Alta',
        tags: ['Iyami', 'Permissão'],
        oduReference: 'Osa Meji',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 3000,
            materiais: ['16 Eyin (Ovos)', 'Epo Pupa (Dendê)', 'Iyerosun', 'Opon Ifá'],
            preparo: [
                'Marcar Osa Meji no Opon com Iyerosun.',
                'Rezar para as Iyami.',
                'Cobrir os ovos com muito dendê e o pó rezado.',
                'Levar à encruzilhada.'
            ],
            ofo: 'Iyami Osoronga, e ma binu. E je ki n lowo.',
            traducao: 'Minhas Mães, não se zanguem. Deixem-me ter dinheiro.'
        }]
    },
    {
        id: 'gi_awure_ita',
        title: 'Awure Ita (Sorte na Rua)',
        category: 'money', subCategory: 'giga',
        purpose: 'Encontrar oportunidades na rua.',
        nomeYoruba: 'Awure Ita',
        complexity: 'Média',
        tags: ['Rua', 'Oportunidade'],
        oduReference: 'Owonrin Meji',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 2000,
            materiais: ['Ewe Etiponola', 'Ose Dudu', 'Eyin Adie (Ovo de Galinha)'],
            preparo: [
                'Pilar a folha com o sabão.',
                'Lavar o rosto antes de sair de casa.'
            ],
            ofo: 'Etiponola kii ku si oju ona. Ire pade mi.',
            traducao: 'Etiponola não morre no caminho. Sorte me encontre.'
        }]
    },

    // --- MAGIA DE AMOR E UNIÃO (IFERAN) ---
    {
        id: 'gi_iferan_atoka',
        title: 'Iferan Atoka (Amor Inevitável)',
        category: 'love', subCategory: 'giga',
        purpose: 'Fazer alguém se apaixonar perdidamente.',
        nomeYoruba: 'Iferan Nla',
        complexity: 'Alta',
        tags: ['Amor', 'Amarração'],
        oduReference: 'Oshe Meji',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 4000,
            materiais: ['Ewe Omisinmisin', 'Oyin (Mel)', 'Irun Ori (Cabelo)', 'Ose'],
            preparo: [
                'Misturar o cabelo da pessoa com as folhas piladas.',
                'Adicionar mel e sabão.',
                'Tomar banho pensando na pessoa.'
            ],
            ofo: 'Omisinmisin a mu ife wa. Okan re di temi.',
            traducao: 'A folha doce traz amor. Seu coração é meu.'
        }]
    },
    {
        id: 'gi_iferan_ota',
        title: 'Iferan Ota (Amor de Inimigo)',
        category: 'love', subCategory: 'giga',
        purpose: 'Transformar ódio em amor.',
        nomeYoruba: 'Iferan Ota',
        complexity: 'Alta',
        tags: ['Inimigo', 'Transformação'],
        oduReference: 'Ejiogbe',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 3000,
            materiais: ['Ewe Eruju', 'Oyin', 'Orogbo'],
            preparo: [
                'Moer a folha e o Orogbo.',
                'Misturar com mel.',
                'Oferecer à pessoa ou colocar na comida dela.'
            ],
            ofo: 'Ota di ore. Ija dopin.',
            traducao: 'Inimigo vira amigo. A briga acabou.'
        }]
    },
    {
        id: 'gi_amunimuye_ife',
        title: 'Amunimuye Ife (Controle Amoroso)',
        category: 'love', subCategory: 'giga',
        purpose: 'Controlar a mente do parceiro.',
        nomeYoruba: 'Amunimuye',
        complexity: 'Perigosa',
        tags: ['Controle', 'Amor'],
        oduReference: 'Odi Meji',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 5000,
            materiais: ['Ewe Amunimuye', 'Obi', 'Oti'],
            preparo: [
                'Mastigar a folha com Obi.',
                'Beber Oti.',
                'Beijar a pessoa logo em seguida.'
            ],
            ofo: 'Iye re wa sodo mi.',
            traducao: 'Sua mente vem para mim.'
        }]
    },
    {
        id: 'gi_ife_aiyeraiye',
        title: 'Ife Aiyeraiye (Amor Eterno)',
        category: 'love', subCategory: 'giga',
        purpose: 'União que dura para sempre.',
        nomeYoruba: 'Ife Giga',
        complexity: 'Alta',
        tags: ['Eternidade', 'Casamento'],
        oduReference: 'Obara Meji',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 6000,
            materiais: ['Eyele Meji (2 Pombos)', 'Okuta (Pedra do Rio)', 'Osun'],
            preparo: [
                'Sacrificar os pombos sobre a pedra.',
                'Pintar a pedra com Osun.',
                'Enterrar a pedra no quintal do casal.'
            ],
            ofo: 'Okuta kii ku. Ife wa ko ni ku.',
            traducao: 'A pedra não morre. Nosso amor não morrerá.'
        }]
    },
    {
        id: 'gi_aremo',
        title: 'Oogun Aremo (Concepção)',
        category: 'health', subCategory: 'giga',
        purpose: 'Curar esterilidade difícil.',
        nomeYoruba: 'Aremo',
        complexity: 'Alta',
        tags: ['Fertilidade', 'Filhos'],
        oduReference: 'Oshe Tura',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 8000,
            materiais: ['Eku Emo (Rato Emo)', 'Ewe Emo', 'Ose Dudu'],
            preparo: [
                'Cozinhar o rato com as ervas.',
                'Fazer uma sopa medicinal.',
                'A mulher deve comer sozinha.'
            ],
            ofo: 'Emo ni ki o mu oyun wa.',
            traducao: 'Emo diz que traga a gravidez.'
        }]
    },

    // --- OUTROS SEGREDOS (ASIRI) ---
    {
        id: 'gi_agadagodo',
        title: 'Agadagodo (Cadeado Mágico)',
        category: 'power', subCategory: 'giga',
        purpose: 'Trancar caminhos ou bocas.',
        nomeYoruba: 'Agadagodo',
        complexity: 'Alta',
        tags: ['Trancar', 'Silêncio'],
        oduReference: 'Odi Meji',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 2500,
            materiais: ['Agadagodo (Cadeado Velho)', 'Owu Dudu/Funfun (Linha Preta/Branca)', 'Ewe Amunimuye'],
            preparo: [
                'Enrolar o cadeado com as linhas e folhas.',
                'Recitar o encantamento e trancar o cadeado.'
            ],
            ofo: 'Mo ti pa enu re de. Agadagodo!',
            traducao: 'Eu fechei sua boca. Cadeado!'
        }]
    },
    {
        id: 'gi_ipese_iyami',
        title: 'Ipese Iyami (Oferenda Suprema)',
        category: 'protection', subCategory: 'giga',
        purpose: 'Acalmar a ira das Bruxas em casos graves.',
        nomeYoruba: 'Ipese Nla',
        complexity: 'Alta',
        tags: ['Iyami', 'Paz'],
        oduReference: 'Osa Meji',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 5000,
            materiais: ['Eran Ewure (Cabra)', 'Epo Pupa', 'Ikun (Estômago)'],
            preparo: [
                'Preparar as vísceras da cabra com muito dendê.',
                'Colocar em um alguidar grande.',
                'Levar à floresta à noite, nu.'
            ],
            ofo: 'Iyami, e gba ounje yin. E fi mi sile.',
            traducao: 'Minhas Mães, peguem sua comida. Me deixem em paz.'
        }]
    },
    {
        id: 'gi_asiri_bibo',
        title: 'Asiri Bibo (Segredo Coberto)',
        category: 'power', subCategory: 'giga',
        purpose: 'Manter segredos ocultos para sempre.',
        nomeYoruba: 'Asiri Bibo',
        complexity: 'Média',
        tags: ['Segredo', 'Ocultação'],
        oduReference: 'Iwori Meji',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 2000,
            materiais: ['Ewe Ajeobale', 'Owu Dudu', 'Iho (Buraco)'],
            preparo: [
                'Falar o segredo para a folha.',
                'Amarrar com linha preta.',
                'Enterrar fundo.'
            ],
            ofo: 'Ile bo asiri mi.',
            traducao: 'A terra cobre meu segredo.'
        }]
    },
    {
        id: 'gi_oogun_iku',
        title: 'Oogun Iku (Afastar Morte)',
        category: 'health', subCategory: 'giga',
        purpose: 'Adiar a morte em casos terminais (se Ifá permitir).',
        nomeYoruba: 'Oogun Iku',
        complexity: 'Perigosa',
        tags: ['Vida', 'Morte'],
        oduReference: 'Oyeku Meji',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 20000,
            materiais: ['Agbo (Carneiro)', 'Aso Dudu (Pano Preto)', 'Iroko'],
            preparo: [
                'Vestir o doente com pano preto.',
                'Transferir a doença para o carneiro.',
                'Enterrar o carneiro aos pés de Iroko.'
            ],
            ofo: 'Agbo gba iku re. Iwo yeye.',
            traducao: 'O carneiro aceita sua morte. Você vive.'
        }]
    },
    {
        id: 'gi_oogun_iran',
        title: 'Oogun Iran (Visão Espiritual)',
        category: 'power', subCategory: 'giga',
        purpose: 'Abrir o terceiro olho para ver espíritos.',
        nomeYoruba: 'Iran',
        complexity: 'Alta',
        tags: ['Visão', 'Espíritos'],
        oduReference: 'Iwori Meji',
        niveis: [{
            tipo: 'COMPLETO',
            estimativa_materiais: 4000,
            materiais: ['Omi Oju Igbin (Água do Olho do Caracol)', 'Ewe Oju', 'Efun'],
            preparo: [
                'Pingar a água do caracol nos olhos.',
                'Passar Efun nas pálpebras.',
                'Dormir no santuário.'
            ],
            ofo: 'Oju mi la si orun.',
            traducao: 'Meus olhos abrem para o céu.'
        }]
    }
];

// ----------------------------------------------------------------------------
// ASSENTAMENTOS_DB: BASE DE FUNDAMENTOS DE ORIXÁS
// ----------------------------------------------------------------------------
export const ASSENTAMENTOS_DB: AssentamentoItem[] = [
    // Igba Orunmila
    {
        id: 'igba_orunmila',
        orisha: 'Orunmila',
        title: 'Igba Orunmila',
        nomeYoruba: 'Igbá Ifá',
        description: 'O fundamento máximo do Babalawo. A testemunha do destino.',
        category: 'igba',
        ofo: "Orunmila, Eleri Ipin, Ibikeji Olodumare. A je ju oogun. Obiriti, A p'jo Iku da.",
        maintenance: { ciclo: '4 dias (Ose Ifa)', oferenda_simples: 'Obi e Oti', proibicoes: ['Mulheres menstruadas', 'Roupas escuras'] },
        niveis: [
            {
                tipo: 'COMPLETO (Sacerdotal)',
                estimativa_materiais: 800,
                materiais: ['Ikin Ifá (16 a 21)', 'Pote de Porcelana', 'Iyerosun', 'Pena de Ekodidé', 'Búzios', 'Otas'],
                preparo: ['Lavagem dos Ikins com Omiero.', 'Colocação do Iyerosun no fundo.', 'Os Ikins descansam sobre o pó.', 'O Ekodidé é fixado na tampa.'],
                ofo: 'Orunmila gbe wa o.'
            }
        ]
    },
    // Esu Yangi
    {
        id: 'igba_esu_yangi',
        orisha: 'Esu',
        title: 'Esu Yangí (Laterita)',
        nomeYoruba: 'Èṣù Yangí',
        description: 'A forma mais antiga e primordial de Esu. O mensageiro divino.',
        category: 'igba',
        ofo: "Esu Odara, omokunrin Idolofin. O le sonso sori ori ese elese.",
        maintenance: { ciclo: 'Diário ou Semanal', oferenda_simples: 'Epo Pupa e Oti', proibicoes: ['Aje (Manteiga)', 'Mel (alguns caminhos)'] },
        niveis: [
            {
                tipo: 'COMPLETO (Sacerdotal)',
                estimativa_materiais: 150,
                materiais: ['Pedra Yangí', 'Prato de barro', 'Epo Pupa', 'Oti', 'Atare', 'Moedas', 'Búzios'],
                preparo: ['Lavar a pedra Yangí.', 'Colocar no prato cercado de búzios.', 'Soprar Oti e Atare.', 'Cobrir com Dendê.']
            }
        ]
    },
    // Igba Odu
    {
        id: 'igba_odu',
        orisha: 'Odu',
        title: 'Igba Odu (Igbadu)',
        nomeYoruba: 'Igbá Odù',
        description: 'A Cabaça da Existência. Poder feminino supremo.',
        category: 'igba',
        ofo: "Iya mi Osoronga. A pani ma wa'gun.",
        maintenance: { ciclo: 'Anual', oferenda_simples: 'Eje (Sangue)', proibicoes: ['Ser visto por homens', 'Ser aberto sem ritual'] },
        niveis: [
            {
                tipo: 'COMPLETO (Sacerdotal)',
                estimativa_materiais: 1000,
                materiais: ['Cabaça grande', '4 Cabaças menores', 'Efun, Osun, Edu, Aro', 'Areia mar/rio', 'Algodão'],
                preparo: ['Segredo absoluto de Igbodu.', 'Representação dos 4 elementos.', 'Jamais abrir sem necessidade.']
            }
        ]
    },
    // Ogun
    {
        id: 'igba_ogun',
        orisha: 'Ogun',
        title: 'Assentamento de Ogun',
        nomeYoruba: 'Igbá Ògún',
        description: 'Para proteção, caminhos abertos e vitória.',
        category: 'igba',
        ofo: "Ogun Lakaye, Osinmole. Onile kangun-kangun ode Orun.",
        maintenance: { ciclo: '21 dias', oferenda_simples: 'Epo, Ewa (Feijão)', proibicoes: ['Mentira', 'Traição'] },
        niveis: [
            {
                tipo: 'MÉDIO (Padrão)',
                estimativa_materiais: 400,
                materiais: ['Pedra de Ferro', 'Ferramentas (7)', 'Corrente', 'Marias', 'Epo Pupa', 'Inhame'],
                preparo: ['Lavagem com Omiero.', 'Arrumação no alguidar.', 'Temperar com Dendê.', 'Oferecer Inhame.']
            }
        ]
    },
    // Sango
    {
        id: 'igba_sango',
        orisha: 'Sango',
        title: 'Assentamento de Sango',
        nomeYoruba: 'Igbá Ṣàngó',
        description: 'Justiça, vitória sobre inimigos e estratégia.',
        category: 'igba',
        ofo: "Sango Olukoso. O n yin ina l'enu.",
        maintenance: { ciclo: 'Semanal', oferenda_simples: 'Orogbo, Amala', proibicoes: ['Obi (alguns)', 'Feijão Branco'] },
        niveis: [
            {
                tipo: 'MÉDIO (Padrão)',
                estimativa_materiais: 500,
                materiais: ['Edun Ara', 'Orogbo', 'Ose Dudu', 'Gamela', 'Oxe', 'Sere', 'Epo Pupa', 'Amalá'],
                preparo: ['Lavar Edun Ara com folhas.', 'Arrumar na gamela.', 'Colocar Oxe em destaque.', 'Oferecer Amalá quente.']
            }
        ]
    },
    // Osun
    {
        id: 'igba_osun',
        orisha: 'Osun',
        title: 'Assentamento de Osun',
        nomeYoruba: 'Igbá Ọ̀ṣun',
        description: 'Fertilidade, riqueza, amor e feitiçaria.',
        category: 'igba',
        ofo: "Ore Yeye o! Osun aare wa!",
        maintenance: { ciclo: '16 dias', oferenda_simples: 'Oyin, Omolokun', proibicoes: ['Pato', 'Carne de Porco'] },
        niveis: [
            {
                tipo: 'MÉDIO (Padrão)',
                estimativa_materiais: 600,
                materiais: ['Otás de Rio (5)', 'Búzios (16)', 'Pente Latão', 'Espelho', 'Abébé', 'Louça Amarela', 'Mel'],
                preparo: ['Buscar pedras no rio.', 'Lavar com Omiero doce.', 'Arrumar na sopeira.', 'Cobrir com Mel.']
            }
        ]
    },
    // Ori
    {
        id: 'igba_ori',
        orisha: 'Ori',
        title: 'Igba Ori (Pessoal)',
        nomeYoruba: 'Ile Orí',
        description: 'O Deus pessoal de cada um.',
        category: 'igba',
        ofo: "Ori lo da mi. Ko s'osa ti i da 'ni l'ehi Ori.",
        maintenance: { ciclo: 'Diário', oferenda_simples: 'Omi Tutu, Obi', proibicoes: ['Negligência', 'Falar mal de si'] },
        niveis: [
            {
                tipo: 'BÁSICO (Pessoal)',
                estimativa_materiais: 100,
                materiais: ['Ile Ori (Couro)', '41 Búzios', 'Ori (Manteiga)', 'Pano Branco', 'Areia'],
                preparo: ['Costurar o Ile Ori.', 'Lavar os Búzios.', 'Consagrar com suor/saliva.', 'Guardar em local alto.']
            }
        ]
    },
    // Adimus
    {
        id: 'adimu_sango',
        orisha: 'Sango',
        title: 'Amalá de Sango',
        nomeYoruba: 'Amàlà',
        description: 'Comida predileta do Rei.',
        category: 'offering',
        ofo: "Sango, wa gba ounje re.",
        maintenance: { ciclo: 'N/A', oferenda_simples: 'N/A', proibicoes: [] },
        niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 30, materiais: ['Quiabos', 'Farinha de Inhame', 'Dendê', 'Camarão'], preparo: ['Refogar quiabo com camarão e dendê.', 'Fazer pirão de inhame.', 'Servir quente na gamela.'] }]
    },
    {
        id: 'adimu_osun',
        orisha: 'Osun',
        title: 'Omolokun',
        nomeYoruba: 'Omolokun',
        description: 'Feijão com ovos para fertilidade.',
        category: 'offering',
        ofo: "Osun, fun mi ni ire omo.",
        maintenance: { ciclo: 'N/A', oferenda_simples: 'N/A', proibicoes: [] },
        niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 25, materiais: ['Feijão Fradinho', 'Cebola', 'Camarão', 'Dendê', '5 Ovos'], preparo: ['Cozinhar feijão.', 'Refogar temperos.', 'Misturar.', 'Enfeitar com ovos cozidos.'] }]
    },
    {
        id: 'adimu_esu',
        orisha: 'Esu',
        title: 'Eko com Dendê',
        nomeYoruba: 'Ẹ̀kọ',
        description: 'Para abrir caminhos.',
        category: 'offering',
        ofo: "Esu, la ona fun mi.",
        maintenance: { ciclo: 'N/A', oferenda_simples: 'N/A', proibicoes: [] },
        niveis: [{ tipo: 'ÚNICO', estimativa_materiais: 10, materiais: ['Farinha de Milho Branco', 'Folha de Bananeira', 'Dendê'], preparo: ['Cozinhar mingau duro.', 'Envolver na folha.', 'Esfriar.', 'Regar com dendê.'] }]
    }
];
