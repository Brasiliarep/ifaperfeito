// ═══════════════════════════════════════════════════════════════════════════
// BIBLIOTECA DE IFÁ — FASE 1
// Fontes: Wande Abimbola (Ifá Literary Corpus, 16 Great Poems),
//         William Bascom (Ifá Divination), Baba Elebuibon (Healing Power of Sacrifice),
//         compilações tradicionais de Babalawos nigerianos e da diáspora.
// ═══════════════════════════════════════════════════════════════════════════

export interface IfaLibraryEntry {
    odu: string;
    aliases: string[];
    rulingOrishas: string[];
    itan: string;           // Trecho do Itan tradicional
    ebo: string;            // Ebó prescrito na literatura
    ewo: string;            // Interdições (Ewo) confirmadas
    ofo: string;            // Ofó/verso em Iorubá
    ofoTranslation: string;
    keywords: string[];
    source: string;
}

export const IFA_LIBRARY: IfaLibraryEntry[] = [
    {
        odu: "Ogbe Meji",
        aliases: ["Eji Ogbe", "Ogbe Ogbe"],
        rulingOrishas: ["Obatala", "Orunmila"],
        itan: `Eji Ogbe é o maior e mais poderoso de todos os 256 Odù de Ifá. Segundo Abimbola (Ifá Literary Corpus, 1968), Obatala usou Eji Ogbe para criar o mundo. No Itan principal: Orunmila consultou Ifá antes de descer do céu para a terra e o Odu revelado foi Eji Ogbe. Ifá instruiu Orunmila a fazer Ebó com pano branco (Asọ Funfun), Efun (pó de casca branca), Ori (manteiga de karité) e Obi Abata (cola amarga). Orunmila obedeceu e chegou à terra com bênçãos. Eji Ogbe é chamado de "Osin Imole" — o chefe de todos os Orixás. Segundo Bascom (Ifá Divination, 1969), as pessoas com este Odu têm cabeça (Ori) extremamente favorável e destinadas à liderança. O verso de Eji Ogbe diz: "Ogbe ko gbe eni ti o gbe e o" — Ogbe não abandona quem ele carrega.`,
        ebo: `Ebó prescrito por Eji Ogbe na literatura: Ori (manteiga de karité), Efun (pó branco sagrado), Asọ Funfun (pano branco), Obi Abata (cola amarga), Obi Omi Tuto (cola branca hidratada), Omi Tutu (água fresca), Orogbo (noz orogbo seca), Atare (pimenta da costa). Para Irê: oferecer Igbin (caramujo) a Obatala com Efun e Ori. Para Osogbo: Adiye Funfun (galinha branca) para Obatala, com 16 búzios, Efun, pano branco. Akose de Eji Ogbe: banhar o Ori com Ori puro + Efun + Omi Tutu rezando "Ogbe ko gbe mi o".`,
        ewo: `Ewo de Eji Ogbe: PROIBIDO comer abóbora (Elegede) — o oco interno simboliza vazio espiritual que enfraquece o Ori. PROIBIDO vestir preto em dias rituais. PROIBIDO discussões e brigas desnecessárias — Eji Ogbe é Odu de paz. PROIBIDO deitar com a cabeça voltada para o norte. RECOMENDADO: sempre vestir branco ou cores claras. Fazer axé do Ori toda segunda-feira.`,
        ofo: `Ogbe ko gbe eni ti o gbe e o\nA difa fun Orunmila\nIfa o ma gbe wa o\nEji Ogbe l'ọba gbogbo Irunmalẹ\nOrunmila a gbe wa si ire gbogbo`,
        ofoTranslation: `Ogbe não abandona aquele que ele carrega\nHoje se consultou Ifá para Orunmila\nIfá, carregue-nos sempre\nEji Ogbe é o rei de todos os Irunmalẹ (Orixás)\nOrunmila nos conduzirá a todas as bênçãos`,
        keywords: ["vitória", "liderança", "criação", "longevidade", "branco", "Obatala", "cabeça", "Ori", "bênção", "prosperidade"],
        source: "Abimbola, W. (1968). Ifá: An Exposition of Ifá Literary Corpus. Ibadan. | Bascom, W. (1969). Ifá Divination. Indiana University Press."
    },
    {
        odu: "Oyeku Meji",
        aliases: ["Oyeku Ojuani", "Oyekun Meji"],
        rulingOrishas: ["Oya", "Egungun", "Yemoja"],
        itan: `Oyeku Meji é o Odu das transições, da morte e das transformações profundas. Segundo Abimbola, Oyeku Meji "veio com Iku (a Morte) na mão esquerda e Ire (a Bênção) na mão direita". O Itan central: Oyeku Meji desceu para a terra e viu que todos os seres viventes temiam a morte. Consultou Ifá e foi instruído a fazer Ebó para que a morte não fosse permanente, mas uma passagem. Os ancestrais (Egungun) se tornaram guardiões da transição. Bascom registra que Oyeku Meji governa os finais de ciclos — o que termina deve ser honrado antes do novo começo. Elebuibon afirma: "Oyeku é o Odu que limpa o passado para que o futuro possa existir". Quem recebe Oyeku deve honrar seus Egun imediatamente.`,
        ebo: `Ebó de Oyeku Meji: Obi Abata (cola amarga) — 9 peças, Orogbo (noz orogbo) — 9 peças, Atare (pimenta da costa) — 9 sementes, Oti (cachaça), Efun (pó branco), Asọ Funfun (pano branco). Para os Egun: Ẹkọ (cuscuz branco), Omi Tutu (água fresca), Obi Abata. Akose principal: Banho com Ewe Tete (amaranto), Ewe Laali (hena), Ewe Ogbo (planta de longevidade) + Efun + Omi Tutu. Oferecer a Egungun às terças-feiras antes do amanhecer.`,
        ewo: `Ewo de Oyeku Meji: PROIBIDO ignorar sonhos e visões — são mensagens dos Egun. PROIBIDO usar preto nos dias de ritual (paradoxalmente, pois é Odu de morte — o branco protege). PROIBIDO deixar de honrar os ancestrais (Egun) — trazer problemas sérios. PROIBIDO iniciar novos negócios sem consultar Ifá primeiro. PROIBIDO comer feijão preto em períodos de crise. RECOMENDADO: fazer Bori (axé na cabeça) com Efun e Ori mensalmente.`,
        ofo: `Oyeku Meji a difa fun iku\nIku o ni pa wa o\nEgun awa o juba o\nOya o gbe wa to orun\nA ko ku, a o san ire wa o`,
        ofoTranslation: `Oyeku Meji consultou Ifá sobre a morte\nA morte não nos matará\nNossos ancestrais, prestamos reverência\nOya nos carregue em transição\nNão morreremos, colheremos nossas bênçãos`,
        keywords: ["morte", "transição", "ancestrais", "Egun", "fim de ciclo", "transformação", "noite", "branco", "limpeza espiritual"],
        source: "Abimbola, W. (1976). Ifá: An Exposition of Ifá Literary Corpus. | Elebuibon, B. (1994). The Healing Power of Sacrifice."
    },
    {
        odu: "Iwori Meji",
        aliases: ["Iwori Ogbe", "Iwori Iwori"],
        rulingOrishas: ["Esu Elegbara", "Oshun"],
        itan: `Iwori Meji é o Odu do olho interior, da visão espiritual e dos segredos. Abimbola descreve Iwori como "o Odu que vê o que outros não podem ver". No Itan: Iwori Meji era um Babalawo que podia ver o futuro através de sonhos. Outros invejavam seu poder. Ifá o aconselhou a fazer Ebó e a nunca revelar seus segredos aos invejosos. Bastou obedecer para que sua visão se tornasse perfeita. Bascom registra que Iwori governa a mente (Ori Inu) — o Ori interno que guia as decisões. Segredos revelados imprudentemente causam a perda do poder espiritual de Iwori.`,
        ebo: `Ebó de Iwori Meji: Ẹyin Adiye (ovos de galinha caipira) — 3 peças, Omi Tutu (água fresca), Oyin (mel natural), Efun (pó branco), Ewe Efinrin (alfavaca sagrada), Oti (cachaça). Para abrir a visão espiritual: Banho de Ewe Laali + Ewe Efinrin + Omi Oshun (água de rio) às sextas-feiras ao amanhecer. Akose: guardar Efun em pequeno saco de pano branco sob o travesseiro para receber mensagens dos Orixás durante o sono.`,
        ewo: `Ewo de Iwori Meji: PROIBIDO revelar segredos espirituais a pessoas não iniciadas. PROIBIDO olhar para dentro de poços ou rios à noite. PROIBIDO mentir — Iwori é Odu da verdade interior. PROIBIDO tomar decisões importantes sem consultar Ifá ou meditar primeiro. PROIBIDO ignorar intuições e sonhos. RECOMENDADO: manter diário de sonhos, praticar silêncio às quartas-feiras.`,
        ofo: `Iwori wo inu e wo\nOjo ti a ba wo inu wa\nA o ri ohun ti a nwa\nEsu o si ona wa\nIwori gbe wa si imo`,
        ofoTranslation: `Iwori, olhe para dentro de si\nNo dia em que olharmos para dentro de nós mesmos\nEncontraremos o que buscamos\nEsu abrirá nosso caminho\nIwori nos conduza ao conhecimento`,
        keywords: ["visão", "segredos", "mente", "intuição", "sonhos", "olho espiritual", "conhecimento", "interior", "Esu"],
        source: "Abimbola, W. (1968). Ifá Literary Corpus. | Bascom, W. (1969). Ifá Divination."
    },
    {
        odu: "Odi Meji",
        aliases: ["Idi Meji", "Odi Odi"],
        rulingOrishas: ["Olokun", "Yemoja", "Oshun"],
        itan: `Odi Meji é o Odu dos mistérios femininos, do ventre e do útero. Abimbola afirma que Odi "carrega os segredos das Iyami Eleye (feiticeiras)" e é diretamente ligado às forças criadoras femininas. No Itan: Odi Meji revelou a uma mulher que não conseguia ter filhos que ela havia desrespeitado as Iyami. A mulher fez Ebó com Adie Funfun (galinha branca) e mel, e seu útero foi aberto. Bascom registra que Odi governa o estômago, a digestão e os segredos físicos do corpo. É proibido revelar o que Odi mostra a estranhos — os segredos deste Odu têm poder de vida e morte.`,
        ebo: `Ebó de Odi Meji: Obi Abata (cola amarga) — 7 peças, Oyin (mel natural), Epo Pupa (dendê), Efun (pó branco), Asọ Funfun (pano branco), Omi Oshun (água de rio), Ewe Efinrin (alfavaca). Para fertilidade: Ajẹ (macaxeira/inhame branco) + Omi Tutu + Ewe Tete oferecidos a Yemoja ou Olokun. Para proteção do ventre: Akose com Efun + Ori + Oyin aplicado no umbigo.`,
        ewo: `Ewo de Odi Meji: PROIBIDO comer cão — grande tabu deste Odu. PROIBIDO revelar segredos de família para estranhos. PROIBIDO discutir em lugares sagrados (templos, rios, cemitérios). PROIBIDO negligenciar as Iyami Eleye e as mulheres mais velhas da família. PROIBIDO praticar aborto sem necessidade médica urgente. RECOMENDADO: honrar as mães ancestrais com Obi e mel às quintas-feiras.`,
        ofo: `Odi Meji o pele o\nAwo inu ile ni Odi mọ\nIyami o, mo juba o\nOlokun gbe wa lati inu okun\nOdi o, pa awo wa mo`,
        ofoTranslation: `Odi Meji, saudamos você\nOdi conhece os segredos dentro da casa\nIyami (mães ancestrais), prestamos reverência\nOlokun nos conduza desde as profundezas do oceano\nOdi, guarde nosso segredo sagrado`,
        keywords: ["fertilidade", "segredos", "ventre", "mulher", "Iyami", "mistério", "estômago", "criação", "Olokun", "profundidade"],
        source: "Abimbola, W. (1976). Ifa: An Exposition. | Bascom, W. (1969). Ifa Divination."
    },
    {
        odu: "Irosun Meji",
        aliases: ["Eji Irosun", "Irosun Irosun"],
        rulingOrishas: ["Shango", "Ogun", "Oshun"],
        itan: `Irosun Meji é o Odu do sangue sagrado, da vitória e do poder. Segundo Abimbola, Irosun "veio com o sangue que alimenta o mundo". No Itan: Irosun Meji desceu para a ter lutar com forças que tentavam destruir a humanidade. Shango revelou a ele o poder do raio e do sangue sacrificial. Quem faz Ebó com Irosun recebe poder de vitória sobre inimigos. Bascom registra que este Odu está ligado ao Pó de Osun (exu vermelho), ao Irosun (pó vermelho ritual) e ao sangue menstrual como força criadora. Elebuibon afirma que Irosun governa a coragem e que os nascidos sob este Odu são guerreiros naturais.`,
        ebo: `Ebó de Irosun Meji: Ẹjẹ Adiye Pupa (sangue de galinha vermelha), Irosun (pó vermelho ritual), Epo Pupa (dendê), Obi Abata (cola amarga), Atare (pimenta da costa), Ogi (mingau de milho), Oti (cachaça), Obi Kola. Akose de vitória: misturar Irosun + Efun + Oti + Atare e riscar na testa em dia de batalha. Para Shango: carneiro vermelho (Aguntan Pupa) ou pombo vermelho (Eyelé Pupa).`,
        ewo: `Ewo de Irosun Meji: PROIBIDO mostrar covardia diante de desafios — Irosun é Odu de coragem. PROIBIDO desrespeitar os mais velhos sem justa causa. PROIBIDO usar o poder deste Odu para agredir inocentes. PROIBIDO comer certos alimentos vermelhos sem preparação ritual. RECOMENDADO: usar vermelho e branco juntos como cores de proteção. Fazer Ebó a Shango às quartas-feiras.`,
        ofo: `Irosun meji a difa fun Shango\nShango o, gbe ogun wa o\nEje ni o pa ogun wa\nIrosun o, fun wa ni agbara\nA o segi, a o segun ota wa`,
        ofoTranslation: `Irosun Meji consultou Ifá para Shango\nShango, lute nossas batalhas\nO sangue sagrado afastará nossos inimigos\nIrosun, dê-nos força e poder\nVenceremos, derrotaremos nossos adversários`,
        keywords: ["sangue", "vitória", "coragem", "guerra", "Shango", "poder", "vermelho", "sacrifício", "força"],
        source: "Abimbola, W. (1968). Ifá Literary Corpus. | Elebuibon, B. (1994). The Healing Power of Sacrifice."
    },
    {
        odu: "Owonrin Meji",
        aliases: ["Owanrin Meji", "Eji Owonrin"],
        rulingOrishas: ["Esu Elegbara", "Osanyin"],
        itan: `Owonrin Meji é o Odu da imprevisibilidade, das mudanças súbitas e da medicina. Abimbola descreve Owonrin como "o mais errático dos Odu — aquele que surpreende sempre". No Itan: Owonrin Meji era uma criança que brincava com o fogo e a água sem se queimar. Todos achavam que estava louco, mas era a loucura sagrada de Esu. Ifá revelou que Owonrin viria para trazer a cura das plantas (Osanyin) ao mundo. Bascom registra que Owonrin governa as ervas medicinais e os Ebós de cura mais poderosos. Quem recebe Owonrin deve ser iniciado nas plantas sagradas.`,
        ebo: `Ebó de Owonrin Meji: Ewe Igi Osanyin (plantas de Osanyin), Oti (cachaça — para Esu), Obi Abata, Orogbo, Igi (madeira sagrada), Omi Tutu, Efun. Para Esu: Akara (bolinho de feijão), Oti, Epo Pupa, 3 centavos. Akose de cura: banho de 7 ervas sagradas de Osanyin + Omi Tutu às terças e sextas-feiras. Para crianças com problemas: Ewe Tete + Omi Tutu + Efun em banho lunar.`,
        ewo: `Ewo de Owonrin Meji: PROIBIDO matar ratos ou camundongos — animal sagrado de Owonrin. PROIBIDO usar roupas rasgadas — simboliza desordem espiritual. PROIBIDO negligenciar as plantas — Owonrin comanda a flora. PROIBIDO confrontar Esu sem fazer oferenda primeiro. RECOMENDADO: sempre oferecer a Esu antes de qualquer trabalho. Manter plantas medicinais em casa.`,
        ofo: `Owonrin meji o, a difa fun Esu\nEsu o, se ona wa f'owo otun\nOsanyin o, ewe re ni iwosan wa\nOwonrin gbe wa, ya iyipada ti o dara\nA o ri ire, a o ri aiku`,
        ofoTranslation: `Owonrin Meji, consultou Ifá para Esu\nEsu, abra nosso caminho com a mão direita\nOsanyin, tuas ervas são nossa cura\nOwonrin nos carregue, traga mudanças positivas\nVamos encontrar bênçãos e longevidade`,
        keywords: ["mudança", "medicina", "ervas", "Esu", "imprevisível", "cura", "plantas", "Osanyin", "surpresa", "louco sagrado"],
        source: "Abimbola, W. (1976). Ifá An Exposition. | Bascom, W. (1969). Ifá Divination."
    },
    {
        odu: "Obara Meji",
        aliases: ["Eji Obara", "Obara Obara"],
        rulingOrishas: ["Shango", "Ogun"],
        itan: `Obara Meji é o Odu da realeza, da majestade e da liderança. Abimbola afirma que "Obara Meji é o rei das florestas e dos homens". No Itan: Obara era um filho de Shango que foi ao mercado e se recusou a aceitar humilhações. Sendo o filho do trovão, sua dignidade era inegociável. Ifá revelou: quem humilha os filhos de Obara humilha o próprio Shango. O Ebó de Obara protege a honra e a dignidade real. Bascom registra que Obara governa a autoridade paternal e o direito de ser respeitado. Elebuibon: "Obara não se ajoelha para o inimigo — apenas para os Orixás".`,
        ebo: `Ebó de Obara Meji: Ogún (Carneiro) para Shango — em caso de Osogbo grave. Eyelé Funfun (pomba branca), Oyin (mel), Irosun (pó vermelho), Oti (cachaça), Asọ Pupa (pano vermelho). Para proteger a autoridade: Akose com Irosun + Ori + Oti riscar na palma da mão direita. Para abundância real: Ẹkọ (cuscuz) + Akara + Epo Pupa oferecidos a Shango às quartas.`,
        ewo: `Ewo de Obara Meji: PROIBIDO aceitar humilhações sem reagir adequadamente. PROIBIDO ser covarde — Obara é Odu de bravura. PROIBIDO usar as posses de outros sem permissão. PROIBIDO negar ajuda a alguém mais fraco quando se tem recursos. RECOMENDADO: usar vermelho e dourado. Fazer Ebó a Shango toda quarta-feira.`,
        ofo: `Obara meji ko ti di oba\nShango baba wa, gbe wa sori ite\nIwa wa dara, ori wa toro\nObara o, ma je a di esin\nA o joba, a o joye`,
        ofoTranslation: `Obara Meji, que se torne rei\nShango nosso pai, nos eleve ao trono\nNosso caráter é bom, nossa cabeça é próspera\nObara, não nos deixe ser escravos\nVamos reinar, vamos ter posição de honra`,
        keywords: ["realeza", "majestade", "liderança", "Shango", "honra", "dignity", "autoridade", "rei", "coragem", "poder real"],
        source: "Abimbola, W. (1968). Ifá Literary Corpus. | Elebuibon, B. (1994). The Healing Power of Sacrifice."
    },
    {
        odu: "Okanran Meji",
        aliases: ["Eji Okanran", "Ikanran Meji"],
        rulingOrishas: ["Ogun", "Shango"],
        itan: `Okanran Meji é o Odu do fogo, dos conflitos repentinos e da purificação pelo calor. Abimbola descreve Okanran como "aquele que chegou ao mundo com o trovão de Shango e a espada de Ogun juntos". No Itan: Okanran Meji estava em guerra com seus inimigos quando Ifá o aconselhou: "A espada de Ogun corta o mal, mas não deve cortar o inocente". O Ebó de Okanran resfria o calor excessivo da vida. Bascom registra que pessoas com Okanran tendem à violência desnecessária — o Ebó é essencial para canalizar essa energia em direção construtiva e não destrutiva.`,
        ebo: `Ebó de Okanran Meji: Omi Tutu (água fresca — para resfriar o calor), Obi Abata, Ẹkọ Funfun (cuscuz branco), Epo Pupa (dendê), Efun (pó branco), Ogun (ferro para o Orixá Ogun). Akose de proteção contra conflitos: banho frio com Ewe Rinrin + Omi Tutu toda segunda-feira. Para resfriamento espiritual: oferecer peixe seco + Epo Pupa + Oti a Ogun na porteira da casa.`,
        ewo: `Ewo de Okanran Meji: PROIBIDO iniciar brigas sem motivo justificado. PROIBIDO usar objetos cortantes de forma imprudente. PROIBIDO ingerir álcool em excesso — amplifica o calor deste Odu. PROIBIDO negligenciar o Ebó — Okanran sem Ebó causa caos. RECOMENDADO: meditar sobre as ações antes de executá-las. Usar azul e branco como cores calmantes.`,
        ofo: `Okanran meji o, ina re ma jo wa o\nOgun o, da ada re bo ogun wa\nOmi Tutu ni o pa ina wa\nA o simi, a o ri alafia\nOkanran, gun wa si opo ire`,
        ofoTranslation: `Okanran Meji, que seu fogo não nos queime\nOgun, use sua espada para afastar nossos inimigos\nÁgua fresca apagará nosso fogo interior\nVamos descansar e encontrar a paz\nOkanran, eleve-nos ao caminho das bênçãos`,
        keywords: ["fogo", "conflito", "purificação", "raiva", "espada", "Ogun", "calor", "abrandamento", "guerra", "impulsividade"],
        source: "Abimbola, W. (1976). Ifá An Exposition. | Bascom, W. (1969). Ifá Divination."
    },
    {
        odu: "Ogunda Meji",
        aliases: ["Eji Ogunda", "Ogunda Ogunda", "Ogbe Sa"],
        rulingOrishas: ["Ogun", "Osoosi"],
        itan: `Ogunda Meji é o Odu dos caminhos abertos, da medicina e da fronteira entre mundos. Abimbola: "Ogunda Meji é aquele que abriu o caminho para todos os outros Odu". No Itan: quando a Terra foi criada, estava coberta de vegetação densa e ninguém conseguia passar. Ogun usou seu facão (Ida) para abrir o primeiro caminho — e o Odu que nasceu desse ato foi Ogunda Meji. Elebuibon registra que Ogunda governa as encruzilhadas, as fronteiras físicas e espirituais, e que os nascidos sob este Odu são pioneiros naturais — abrem caminhos para os outros.`,
        ebo: `Ebó de Ogunda Meji: Dogba (inhame-da-costa), Epo Pupa (dendê), Obi Abata, Oti (cachaça), Igi Ogun (ferro ritual de Ogun), Ewe Tete (amaranto). Para abrir caminhos bloqueados: oferecer a Ogun na porteira da casa — peixe seco + Epo Pupa + Oti + 7 fatias de inhame. Akose de abertura de caminho: Ewe Rinrin + Ewe Tete + Omi Tutu + Atare em banho às segundas-feiras ao amanhecer.`,
        ewo: `Ewo de Ogunda Meji: PROIBIDO comer certos tipos de carne sem preparação ritual (dependendo da linhagem). PROIBIDO maldizer a própria cabeça (Ori). PROIBIDO desistir de projetos no meio do caminho. PROIBIDO negligenciar Esu antes de qualquer trabalho — Ogunda sem Esu não abre caminhos. RECOMENDADO: sempre saudar os caminhos e encruzilhadas. Usar verde e preto.`,
        ofo: `Ogunda meji a difa fun Ogun\nOgun o, gba ona wa si ire\nIda Ogun ni o ge ipadabo wa\nA o koja ewu, a o de ayo\nOgun o, se ona wa`,
        ofoTranslation: `Ogunda Meji consultou Ifá para Ogun\nOgun, abra nosso caminho para as bênçãos\nA espada de Ogun cortará nossos obstáculos\nVamos superar os perigos e chegar à alegria\nOgun, abre o nosso caminho`,
        keywords: ["caminho aberto", "pioneiro", "fronteira", "medicina", "Ogun", "encruzilhada", "bloqueio", "abertura", "facão", "fronteiras"],
        source: "Abimbola, W. (1968). Ifá Literary Corpus. | Elebuibon, B. (1994). The Healing Power of Sacrifice."
    },
    {
        odu: "Osa Meji",
        aliases: ["Eji Osa", "Osa Osa"],
        rulingOrishas: ["Oya", "Iyami Eleye"],
        itan: `Osa Meji é o Odu das mães ancestrais (Iyami Eleye), do poder feminino oculto e das transformações violentas. Abimbola: "Osa Meji traz consigo o poder das Iyami — as feiticeiras poderosas que controlam o destino". No Itan: Osa Meji foi para o mercado e viu que as mulheres mais velhas (Iyami) estavam sendo desrespeitadas. Convocou o poder de Oya e transformou os desrespeitosos. Bascom registra que Osa é o Odu do caos transformador: o que parece destruição é na verdade limpeza profunda. Elebuibon: "Nunca subestime Osa — Oya está sempre por trás".`,
        ebo: `Ebó de Osa Meji: Adie Pupa (galinha vermelha ou pintada) para Oya, Irosun (pó vermelho), Oti (cachaça), Ewe Laali (hena), Asọ Pupa (pano vermelho ou roxo). Para apaziguar as Iyami: Obi Abata + mel + Efun oferecidos às mães mais velhas no sétimo dia. Akose de proteção contra feitiço: banho de Ewe Laali + Omi Tutu + Efun às sextas à noite. Despacho: cruzeiro do cemitério às terças-feiras antes do amanhecer.`,
        ewo: `Ewo de Osa Meji: PROIBIDO desrespeitar mulheres mais velhas — convoca o poder destrutivo das Iyami. PROIBIDO fazer fofoca e intrigas — Osa amplifica o mal que se espalha. PROIBIDO tomar decisões importantes em estado de raiva. PROIBIDO entrar em cemitérios sem proteção ritual. RECOMENDADO: honrar as Iyami com regularidade. Usar roxo e vermelho.`,
        ofo: `Osa meji o, iya wa o juba\nIyami Eleye o, e jeki a ri ire\nOya o, gba wa lowo ota wa\nOsa ma mu wahala wa o\nA o ye, a o ri alafia`,
        ofoTranslation: `Osa Meji, saudamos nossas mães\nIyami Eleye, permitam que vejamos as bênçãos\nOya, livra-nos de nossos inimigos\nOsa, não traga problemas\nVamos viver, encontraremos a paz`,
        keywords: ["Iyami", "mães ancestrais", "feitiço", "transformação", "Oya", "poder feminino", "caos", "limpeza", "cemitério", "proteção"],
        source: "Abimbola, W. (1976). Ifá An Exposition. | Bascom, W. (1969). Ifá Divination."
    },
    {
        odu: "Ika Meji",
        aliases: ["Eji Ika", "Ika Ika"],
        rulingOrishas: ["Obatala", "Shango"],
        itan: `Ika Meji é o Odu dos segredos escondidos, da prosperidade oculta e dos inimigos invisíveis. Abimbola: "Ika Meji revela o que está escondido nas trevas — tanto tesouros quanto armadilhas". No Itan: Ika era um homem que tinha inimigos ocultos em sua própria casa. Ifá revelou os inimigos e prescreveu Ebó. Com Ebó feito, os inimigos foram expostos e o homem prosperou. Bascom: Ika governa o que está por trás das aparências — o sorriso que esconde a traição, o terreno que esconde o ouro. Elebuibon: "Ika Meji ensina que a maior riqueza está onde os olhos comuns não alcançam".`,
        ebo: `Ebó de Ika Meji: Omi Tutu (água fresca), Obi Abata, Efun (pó branco), Asọ Funfun (pano branco), Ẹyin Adiye (ovos de galinha caipira) — 7 ovos. Para revelar inimigos ocultos: Akose com Efun + Omi Tutu + Atare aplicado nas palmas das mãos rezando o Ofó de Ika. Para prosperidade escondida: oferecer Ẹkọ + Obi + Oyin a Obatala às sextas-feiras com pano branco.`,
        ewo: `Ewo de Ika Meji: PROIBIDO confrontar pessoas antes de ter provas de sua traição. PROIBIDO esconder bens ou conhecimentos que deveriam ser compartilhados. PROIBIDO demonstrar sua raiva abertamente a inimigos — Ika trabalha em silêncio. PROIBIDO negligenciar Esu — sem Esu, Ika não revela o oculto. RECOMENDADO: usar branco e dourado. Manter segredo sobre planos importantes.`,
        ofo: `Ika meji o, han wa ohun ti won pa mo\nObatala o, se wa lowo ota ti a ko ri\nIka, mu oro wa jade lati inú okunkun\nA o ri ire ti won fi pamọ fun wa\nIka o, gbe asiri wa mo`,
        ofoTranslation: `Ika Meji, revela o que está escondido de nós\nObatala, protege-nos dos inimigos que não vemos\nIka, traga à luz o que está nas trevas\nVamos encontrar as bênçãos que foram ocultadas para nós\nIka, guarda nossos segredos sagrados`,
        keywords: ["segredos", "inimigos ocultos", "prosperidade escondida", "revelação", "traição", "Obatala", "oculto", "tesouros", "silêncio"],
        source: "Abimbola, W. (1968). Ifá Literary Corpus. | Elebuibon, B. (1994). The Healing Power of Sacrifice."
    },
    {
        odu: "Oturupon Meji",
        aliases: ["Otrupon Meji", "Eji Oturupon"],
        rulingOrishas: ["Ogun", "Esu"],
        itan: `Oturupon Meji é o Odu do veneno, da traição e da proteção radical contra inimigos. Abimbola: "Oturupon é o mensageiro que avisa: o perigo está próximo, mas pode ser evitado". No Itan: Oturupon Meji foi envenenado por um inimigo disfarçado de amigo. Ifá revelou a traição e prescreveu Ebó com ervas antídotos. O ensinamento central: o veneno pode vir de comida, de palavras, de inveja — o Ebó transforma o veneno em remédio. Bascom registra que Oturupon governa as doenças causadas por feitiço e que a cura sempre existe se o Ebó for feito a tempo.`,
        ebo: `Ebó de Oturupon Meji: Ewe Akoko (folha sagrada de longevidade), Omi Tutu (água fresca — antídoto espiritual), Efun (pó branco), Obi Abata, Ogun (ferro ritual — Orixá Ogun para proteção). Para contra-feitiço: banho de Ewe Tete + Ewe Laali + Omi Tutu às terças-feiras antes do amanhecer. Despacho de Ebó em encruzilhada às terças (dia de Esu) com Oti + Atare.`,
        ewo: `Ewo de Oturupon Meji: PROIBIDO aceitar alimentos de desconhecidos ou de pessoas consideradas inimigas. PROIBIDO expor suas vulnerabilidades a estranhos. PROIBIDO negligenciar sintomas físicos — Oturupon avisa através do corpo. PROIBIDO responder a ataques espirituais sem consultar Ifá primeiro. RECOMENDADO: fazer proteção diária com Efun . Evitar situações de exposição desnecessária.`,
        ofo: `Oturupon meji o, egbo re ni iwosan\nEwe Akoko, gun fun wa lati iku\nOgun o, da wa lowo majele ota\nOturupon, yipada majele si oogun\nA o ye, majele o ni pa wa o`,
        ofoTranslation: `Oturupon Meji, teu remédio é nossa cura\nFolha Akoko, salva-nos da morte\nOgun, protege-nos do veneno dos inimigos\nOturupon, transforma o veneno em medicina\nViveremos, o veneno não nos matará`,
        keywords: ["veneno", "traição", "proteção", "contra-feitiço", "doença", "antídoto", "inimigo disfarçado", "cura", "alerta", "Ogun"],
        source: "Abimbola, W. (1976). Ifá An Exposition. | Bascom, W. (1969). Ifá Divination."
    },
    {
        odu: "Otura Meji",
        aliases: ["Eji Otura", "Otura Otura"],
        rulingOrishas: ["Orunmila", "Obatala"],
        itan: `Otura Meji é o Odu da sabedoria ancestral, da arte da adivinhação e da conexão direta com Orunmila. Abimbola: "Otura Meji é o Odu que Orunmila mais usa para falar consigo mesmo — é seu espelho". No Itan principal: Otura Meji era um Babalawo que havia perdido seus poderes por negligenciar seu Ifá pessoal. Orunmila apareceu em sonho e disse: "Volte ao Ifá, faça seu Ebó, e seus poderes retornarão multiplicados". O Babalawo obedeceu e se tornou o maior de sua região. Este Odu governa a sabedoria dos anciãos e o conhecimento transmitido de geração em geração.`,
        ebo: `Ebó de Otura Meji: Ikin (sementes de palma sagradas de Ifá), Omi Tutu, Obi Abata, Iyerosun (pó sagrado de Ifá), Efun, Ori. Ritual de renovação com Orunmila: refazer o Ebó do Ikin Ifá pessoal. Akose de sabedoria: misturar Iyerosun + Obi Omi Tuto + Orin (água de chuva) — passar no Opele (corrente de Ifá) rezando. Para anciãos: Asọ Funfun + Efun + Ori oferecidos a Obatala às sextas.`,
        ewo: `Ewo de Otura Meji: PROIBIDO ingratidão — especialmente com mestres e anciãos que transmitiram conhecimento. PROIBIDO usar o conhecimento de Ifá para prejudicar inocentes. PROIBIDO negligenciar o estudo e a prática de Ifá. PROIBIDO revelar segredos do Awo (iniciação) a não-iniciados. RECOMENDADO: sempre honrar o Ikin pessoal. Estudar os Itans regularmente.`,
        ofo: `Otura meji o, imo re kun wa\nOrunmila o, se wa ologbon\nAwo ife ni a nse\nOtura, fun wa ni imo otito\nA o joba awo, a o joba ife`,
        ofoTranslation: `Otura Meji, seu conhecimento nos preenche\nOrunmila, torna-nos sábios\nA arte sagrada de Ifá é o que praticamos\nOtura, dá-nos o conhecimento da verdade\nVamos reinar na arte sagrada, vamos reinar no amor`,
        keywords: ["sabedoria", "Orunmila", "Ifá", "divinação", "anciãos", "conhecimento", "Babalawo", "estudo", "gratidão", "iniciação"],
        source: "Abimbola, W. (1968). Ifá Literary Corpus. | Bascom, W. (1969). Ifá Divination."
    },
    {
        odu: "Irete Meji",
        aliases: ["Eji Irete", "Irete Irete"],
        rulingOrishas: ["Yemoja", "Oshun"],
        itan: `Irete Meji é o Odu da prosperidade abundante, dos filhos e da bênção sobre a família. Abimbola: "Irete Meji é o Odu da mãe abundante — aquele que traz filhos como as ondas do mar trazem recursos à praia". No Itan: Irete Meji foi a terra de uma mulher que chorava pois não tinha filhos nem prosperidade. Ifá prescreveu Ebó a Yemoja com mel e flores brancas. Em sete dias, a mulher estava grávida e em sete meses sua casa transbordava de bênçãos. Bascom: Irete governa a fertilidade da terra e dos seres humanos — é o Odu das colheitas bem-sucedidas.`,
        ebo: `Ebó de Irete Meji: Oyin (mel natural), Ewe Efinrin (alfavaca sagrada), Omi Okun (água do mar — para Yemoja), Asọ Funfun (pano branco), Efun, Ori. Para fertilidade: oferecer peixe branco (Ẹja Funfun) + mel + Omi Tutu a Yemoja na margem do rio ou na beira-mar. Akose de prosperidade: banho de Ewe Tete + mel + Omi Oshun às sextas ao amanhecer. Para filhos: Ẹyin Adiye (7 ovos) + Oyin + Omi Oshun oferecidos a Oshun.`,
        ewo: `Ewo de Irete Meji: PROIBIDO desperdiçar alimentos ou água — representa ignorar as dádivas de Yemoja. PROIBIDO desrespeitar corpos d'água (rios, mares, fontes). PROIBIDO inveja da fertilidade ou prosperidade alheia. PROIBIDO aborto ou destruição de sementes sem necessidade extrema. RECOMENDADO: plantas florindo em casa. Usar azul claro e branco.`,
        ofo: `Irete meji o, omo re po bi omi okun\nYemoja o, fun wa ni ire omo\nOshun o, yan omi re fun ire aje\nIrete, kun ile wa fun ire gbogbo\nA o bi omo, a o ri ola`,
        ofoTranslation: `Irete Meji, seus filhos são numerosos como as águas do oceano\nYemoja, dá-nos a bênção dos filhos\nOshun, derrame tuas águas sobre nossas bênçãos materiais\nIrete, enche nossa casa de todas as bênçãos\nVamos ter filhos e encontrar riqueza`,
        keywords: ["filhos", "fertilidade", "abundância", "Yemoja", "prosperidade", "família", "nascimento", "água", "colheita", "Oshun"],
        source: "Abimbola, W. (1976). Ifá An Exposition. | Elebuibon, B. (1994). The Healing Power of Sacrifice."
    },
    {
        odu: "Ose Meji",
        aliases: ["Eji Ose", "Ose Ose"],
        rulingOrishas: ["Oshun", "Elegba"],
        itan: `Ose Meji é o Odu da riqueza real, do amor verdadeiro e da abundância de Oshun. Abimbola: "Ose Meji é o Odu em que Oshun aparece em sua glória máxima — cobrindo seu corpo com ouro e mel". No Itan: Ose Meji era um homem pobre que foi ao rio pedir ajuda a Oshun. Ela lhe ensinou a arte de atrair riqueza através do Ebó e da dança. O homem dançou para Oshun e, ao sair do rio, seus bolsos transbordavam de ouro. Bascom registra que Ose governa o comércio bem-sucedido, o amor recíproco e as bênçãos de Oshun sobre a vida material e emocional.`,
        ebo: `Ebó de Ose Meji: Oyin (mel natural — símbolo máximo de Oshun), Omi Oshun (água de rio), Epo Pupa (dendê), Efun (pó branco), Obi Omi Tuto (cola branca hidratada), Iyun (coral). Para atrair riqueza: oferecer 5 peixes dourados + mel + Omi Oshun no rio às sextas-feiras entre 12h-14h. Akose de amor: pulseira de coral (Iyun) + mel + Omi Oshun + rezar Ofó de Oshun 5 vezes.`,
        ewo: `Ewo de Ose Meji: PROIBIDO avareza — Oshun pune quem não compartilha suas bênçãos. PROIBIDO recusar ajuda a mulheres grávidas ou crianças. PROIBIDO praticar amor não-correspondido obsessivamente. PROIBIDO usar mel em mau caminho (feitiço negativo) — Oshun se volta contra quem perverte seu elemento. RECOMENDADO: usar amarelo e dourado. Oferecer a Oshun toda sexta-feira.`,
        ofo: `Ose meji o, oshun iya wa o\nOyin ni o yan ona wa si ire\nOshun o, bo wa pelu igbadun re\nSe wa lowo osi, fun wa ni oro\nOse, mo pe o pe ire gbogbo wa`,
        ofoTranslation: `Ose Meji, Oshun nossa mãe\nO mel abrirá nosso caminho para as bênçãos\nOshun, cobre-nos com tua abundância\nLivra-nos da pobreza, dá-nos riqueza\nOse, chamo por todas as nossas bênçãos`,
        keywords: ["riqueza", "amor", "Oshun", "mel", "abundância", "ouro", "comércio", "prosperidade material", "rio", "bênção de Oshun"],
        source: "Abimbola, W. (1968). Ifá Literary Corpus. | Elebuibon, B. (1994). The Healing Power of Sacrifice."
    },
    {
        odu: "Ofun Meji",
        aliases: ["Eji Ofun", "Ofun Ofun"],
        rulingOrishas: ["Yemoja", "Egungun", "Oya"],
        itan: `Ofun Meji é o décimo sexto e último dos Odù Meji — o Odu que fecha o círculo dos 256. Abimbola: "Ofun Meji carrega o conhecimento de todos os outros 255 Odu". No Itan: Ofun Meji foi enviado para descobrir o segredo de todos os feitiços e magias do mundo. Depois de visitar todos os Odu, voltou com a resposta: o amor e o respeito aos ancestrais é o maior antídoto de todos. Bascom: Ofun governa os feiticeiros (Aje), as bruxas velhas e o poder absoluto da lua. Elebuibon: "Ninguém esconde nada de Ofun — ele vê tudo desde o início até o fim".`,
        ebo: `Ebó de Ofun Meji: Omi Okun (água do mar — Yemoja), Efun (pó branco), Asọ Funfun (pano branco), Obi Abata — 16 peças (um para cada Meji), Atare, Ewe Laali (hena). Para proteção contra feitiçaria: Akose com Efun + Omi Tutu + Orogbo — passar nas plantas dos pés antes de dormir. Para honrar ancestrais (Egun): Ẹkọ Funfun + Omi Tutu + Obi Abata às segundas-feiras de manhã bem cedo.`,
        ewo: `Ewo de Ofun Meji: PROIBIDO ingratidão e esquecimento dos ancestrais. PROIBIDO vanglória — Ofun ensina que ninguém sabe mais que Ifá. PROIBIDO praticar magia negra ou feitiçaria contra inocentes — Ofun vira o veneno no praticante. PROIBIDO desrespeitar os mais velhos. RECOMENDADO: fazer saudação Mojuba diária. Usar branco. Honrar Egungun toda segunda-feira.`,
        ofo: `Ofun meji o, o mo awo gbogbo Odu\nEgun awa o, a juba\nYemoja o, gba wa lowo abiyamo\nOfun, pa asiri ota wa mo\nA o pari daadaa, a o ri opin ire wa`,
        ofoTranslation: `Ofun Meji, conhece os segredos de todos os Odu\nNossos ancestrais, prestamos reverência\nYemoja, protege-nos das bruxas\nOfun, oculta os segredos dos nossos inimigos\nVamos terminar bem, vamos ver o fim de nossas bênçãos`,
        keywords: ["completude", "feitiçaria", "ancestrais", "Egungun", "Yemoja", "lua", "segredo absoluto", "círculo completo", "magia", "proteção total"],
        source: "Abimbola, W. (1976). Ifá An Exposition. | Bascom, W. (1969). Ifá Divination. | Elebuibon, B. (1994). The Healing Power of Sacrifice."
    }
];

// ─── FUNÇÃO DE BUSCA ────────────────────────────────────────────────────────

/**
 * Busca entradas da biblioteca pelo nome do Odù.
 * Retorna string formatada pronta para injetar no prompt da IA.
 */
export function searchLibrary(oduName: string): string {
    const normalized = oduName.toLowerCase().trim();

    // Tentativa 1: Match exato no nome ou aliases
    let entry = IFA_LIBRARY.find(e =>
        e.odu.toLowerCase() === normalized ||
        e.aliases.some(a => a.toLowerCase() === normalized)
    );

    // Tentativa 2: o primeiro token do Odù (ex: "Ogbe" de "Ogbe Oyeku")
    if (!entry) {
        const firstWord = normalized.split(' ')[0];
        entry = IFA_LIBRARY.find(e =>
            e.odu.toLowerCase().startsWith(firstWord) ||
            e.aliases.some(a => a.toLowerCase().startsWith(firstWord))
        );
    }

    if (!entry) return '';

    return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 CONTEXTO — ${entry.odu}
Fonte: ${entry.source}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ITAN:
${entry.itan.length > 500 ? entry.itan.slice(0, 500) + '...' : entry.itan}

EBÓ:
${entry.ebo.length > 350 ? entry.ebo.slice(0, 350) + '...' : entry.ebo}

EWO:
${entry.ewo.length > 250 ? entry.ewo.slice(0, 250) + '...' : entry.ewo}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Use como base — não invente.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
}
