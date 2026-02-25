// ─── PLACEHOLDER — ODÙ 5-16 will be injected ─────────────────────────────────

export interface TreatiseChapter {
    id: string;
    title: string;
    subtitle?: string;
    content: string;
    section: 'intro' | 'meji' | 'appendix';
}

export const TREATISE_CHAPTERS: TreatiseChapter[] = [

    // ════════════════════════════════════════════════════════════════
    // SECÇÃO I — INTRODUÇÃO E FUNDAMENTOS
    // ════════════════════════════════════════════════════════════════

    {
        id: 'prefacio',
        section: 'intro',
        title: 'Prefácio — A Palavra Sagrada de Orunmila',
        subtitle: 'Origem, missão e estrutura deste Corpus',
        content: `IFÁ — O CONHECIMENTO SUPREMO

"Ifá ni Babá mi. Orunmila ni olúwo mi."
(Ifá é meu Pai. Orunmila é meu Mestre Supremo.)
— Saudação tradicional do Babalawo

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

O que você tem em mãos é o Corpus de Ifá — o maior sistema de conhecimento oral da humanidade, preservado durante milênios pelo povo Yorùbá da África Ocidental e levado para as Américas, Europa e todo o mundo através da diáspora africana. Este tratado é uma compilação das fontes primárias da literatura de Ifá registradas por Wande Abimbola (Ifá: An Exposition of Ifá Literary Corpus, 1976; Ifá Divination Poetry, 1977; Sixteen Great Poems of Ifá, 1975), William Bascom (Ifa Divination: Communication Between Gods and Men in West Africa, 1969), Baba Ifayemi Elebuibon (The Healing Power of Sacrifice, 1994), bem como compilações tradicionais de Babalawos nigerianos, cubanos e brasileiros.

O SISTEMA IFÁ

Ifá é simultaneamente: (1) um sistema de adivinhação; (2) um corpo de literatura sagrada; (3) uma filosofia de vida; (4) um sistema médico; (5) uma cosmologia. Em 2005, a UNESCO reconheceu o sistema de adivinhação de Ifá como Patrimônio Cultural Imaterial da Humanidade, afirmando: "O sistema de adivinhação Ifá representa um conjunto de tradições espirituais estabelecidas há séculos pelo povo Yorùbá".

O repositório central do Corpus de Ifá é o conjunto dos 256 Odù — 16 Odù Meji (maiores) e 240 Odù menores (compostos). Cada Odù contém: Itan (histórias/mitos), Ese Ifá (versos sagrados), Ebó (oferendas e sacrifícios), Ewo (interdições), Akose (medicina herbal), e ensinamentos filosóficos.

Segundo Wande Abimbola: "O corpus literário de Ifá é um vasto repositório do conhecimento Yorùbá. Cobre todos os aspectos da experiência humana."

QUEM É ORUNMILA?

Orunmila (também chamado de Ìfá, Agbonmiregun, Eleriipin) é o Orixá da Sabedoria e da Divinação. Ele esteve presente (eru aayan) durante a criação do universo por Olodumare e, por isso, conhece o destino (Ayanmo) de todas as criaturas. Orunmila não é apenas um Orixá — ele é o Testemunho do Destino (Eleriipin = "dono do destino de cada ser").

Os títulos sagrados de Orunmila:
• Agbonmiregun — "O que sustenta os ossos contra a terra" (a sabedoria que impede a queda)
• Eleriipin — "O dono da testemunha do destino"
• Akere-finusogbon — "O pequeno que fala com sabedoria profunda"
• Igbakeji Olodumare — "O Segundo em Comando de Deus"

A ESTRUTURA DOS 256 ODÙ

Os 256 Odù são formados pela combinação dos 16 Odù principais. Na adivinhação com Opele (corrente) ou Ikin (sementes de palma), cada posição pode ser "aberta" (dois pontos: ⁞) ou "fechada" (um ponto: ⸽), formando dois grupos de quatro — o Odu Osi (esquerda) e o Odù Otun (direita). A combinação dos dois grupos resulta no Odù revelado para a consulta.

Os 16 Odù Meji Principais (em ordem de precedência):
1. Eji Ogbe — 2. Oyeku Meji — 3. Iwori Meji — 4. Odi Meji — 5. Irosun Meji
6. Owonrin Meji — 7. Obara Meji — 8. Okanran Meji — 9. Ogunda Meji — 10. Osa Meji
11. Ika Meji — 12. Oturupon Meji — 13. Otura Meji — 14. Irete Meji — 15. Ose Meji — 16. Ofun Meji

O BABALAWO — SACERDOTE DE IFÁ

Babalawo significa literalmente "Pai que possui os segredos" (Baba = Pai; Awo = segredo/mistério). O Babalawo é o sacerdote iniciado de Orunmila, responsável por consultar o oráculo de Ifá em nome dos clientes, prescrever Ebós, preparar Akoses e transmitir o Corpus para as gerações futuras.

A iniciação do Babalawo é chamada de Itefa ou Isefa. É um processo multianual sob a orientação de um Babalawo sênior (Olúwo). O iniciado deve memorizar centenas de Itans e Versos, aprender a preparar os materiais rituais e desenvolver a capacidade de interpretar os Odù com precisão e compaixão.`
    },

    {
        id: 'cosmologia',
        section: 'intro',
        title: 'Parte I — Cosmologia de Ifá',
        subtitle: 'Olodumare, Orixás, Egungun e a criação do mundo',
        content: `A COSMOLOGIA YORÙBÁ SEGUNDO IFÁ

Ifá ensina que no princípio existia apenas Olodumare (Deus Supremo, Ser Absoluto, Criador de Tudo). Olodumare é inefável — não tem forma, está além de toda compreensão humana. Para criar o universo, Olodumare enviou os Irunmalè (Orixás) como seus agentes.

OS CINCO ELEMENTOS DA CRIAÇÃO (segundo Ogbe Meji):

1. OMI (Água) — O primeiro elemento. Yemoja e Olokun governam as águas. Antes do céu e da terra existirem, havia apenas as águas primordiais.

2. INA (Fogo) — Shango é o rei do fogo celestial. O trovão é a voz de Olodumare. O fogo purifica e transforma.

3. ATI AFEFE (Ar/Vento) — Oya governa os ventos e as tempestades. O ar é o sopro de vida (Emi) que Olodumare soprou nos seres vivos.

4. ILU AYE (Terra) — Obatala moldou os corpos humanos do barro. Onile (dono da terra) e Osun são guardiões do solo.

5. OWO OKANKAN (Energia Primordial) — A força vital que anima toda a criação. Chamada de Ashe ou Axé — o poder divino que flui através de tudo.

ORIKI OLODUMARE (Hino ao Ser Supremo):
"Olodumare ooo, Oba ti o ni ekeji.
Oba ti o ni ibere, ti o ni opin.
Eleda gbogbo enia, Eleda gbogbo eranko.
A gbe wa ni ojo ibi, a o gbe wa ni ojo iku.
Ase."

Tradução:
"Olodumare, o Rei sem igual.
O Rei sem começo, sem fim.
Criador de todo ser humano, criador de todo animal.
Tu nos sustentaste no dia do nascimento, Tu nos sustentas no dia da morte.
Que assim seja."

O CONCEITO DE ORI

Ori significa literalmente "cabeça" — mas em Ifá, Ori é muito mais que a cabeça física. Ori é o Orixá pessoal de cada ser humano — a parte da divindade que habita dentro de cada pessoa. Escolhemos nosso Ori (e consequentemente nosso destino/Ayanmo) antes de nascer, no Orun (céu), perante Olodumare.

Ori é o único Orixá que jamais abandona seu filho. Mesmo quando todos os outros Orixás se afastam, Ori permanece. Por isso Orunmila ensina: "Ori mi, jowo gba mi" (Minha cabeça, por favor me salva).

O DESTINO (AYANMO) E O LIVRE-ARBÍTRIO

Ifá ensina um equilíbrio fascinante: cada pessoa tem um destino (Ayanmo) escolhido antes de nascer, mas o Ebó (sacrifício/oferenda) pode modificar os caminhos desse destino. Esta é a razão fundamental da existência do Babalawo e do sistema de adivinhação — não para "prever o futuro" de forma fatalista, mas para identificar o caminho do Ayanmo e fazer os Ebós necessários para que o Irê (bênção) prevaleça sobre o Osogbo (adversidade).

Os 4 tipos de Ayanmo:
1. Ayanmo Rere — Destino bom, confirmado pelos Ebós
2. Ayanmo Buruku — Destino difícil, que pode ser transformado pelo Ebó
3. Ayanmo Gbàdùn — Destino de prazer e alegrias terrestres
4. Ayanmo Ariku — Destino de longevidade especial

MOJUBA — A SAUDAÇÃO SAGRADA

Antes de qualquer trabalho com Ifá, o Babalawo deve proferir o Mojuba — a saudação aos Orixás, aos ancestrais e a Orunmila:

"Mojuba Olodumare.
Mojuba Orunmila Baba mi.
Mojuba Esu Laroye, ode orun.
Mojuba gbogbo Irunmalè.
Mojuba gbogbo Egungun.
Iboru, Iboya, Iboshishe.
Ase o."

Tradução:
"Reverencio Olodumare.
Reverencio Orunmila, meu Pai.
Reverencio Esu Laroye, o mensageiro do céu.
Reverencio todos os Orixás.
Reverencio todos os Ancestrais.
Iboru, Iboya, Iboshishe (que as bênçãos se manifestem).
Que assim seja."`
    },

    // ════════════════════════════════════════════════════════════════
    // OS 16 ODÙ MEJI
    // ════════════════════════════════════════════════════════════════

    {
        id: 'eji-ogbe',
        section: 'meji',
        title: 'Eji Ogbe — O Primeiro entre Todos',
        subtitle: 'O Odu da Criação, da Vitória e da Luz Suprema',
        content: `EJI OGBE — BABA OGBE ALAKESIN

"Ogbe kò gbé eni tí kò gbé e o
Baba Ogbe alakesin, oba gbogbo Irunmalè
Òun ni ibere, òun ni opin gbogbo Odu"

Tradução:
"Ogbe não abandona quem ele carrega
Pai Ogbe o Grande, rei de todos os Orixás
Ele é o começo, ele é o fim de todos os Odù"

━━━ IDENTIDADE E NATUREZA ━━━

Eji Ogbe é o Odù mais poderoso e sênior de todos os 256 Odù de Ifá. Ele é chamado de "Osin Imolè" — o Chefe de Todos os Orixás. Seu sinal no Opon Ifá é o mais aberto de todos: oito marcas duplas (||) em ambas as colunas, representando a abertura total, a luz plena, a via completamente desobstruída.

Segundo Wande Abimbola (Sixteen Great Poems of Ifa, 1975), Eji Ogbe foi o único Odù que existia antes da criação do mundo. Quando Olodumare decidiu criar o universo, foi Eji Ogbe quem primeiro desceu do Orun (céu) para dar início à criação.

Orixás Regentes: Obatala (primário), Orunmila, Ela (aspecto jovem de Orunmila)
Número sagrado: 8 e 16
Cores: Branco (Funfun), Prata
Dia de força: Domingo
Domínios: Criação, vitória, longevidade, liderança, sabedoria ancestral

━━━ ITAN (HISTÓRIA SAGRADA) ━━━

HISTÓRIA 1 — A DESCIDA DE OGBE PARA A TERRA

No início dos tempos, Olodumare chamou todos os Odù ao Orun e anunciou que iria criar a terra (Aiye). Ordenou que um voluntário descesse primeiro para iniciar a criação. Todos os Odù hesitaram — a terra era desconhecida, potencialmente perigosa.

Apenas Eji Ogbe se levantou e disse: "Baba Olodumare, eu vou."

Olodumare ficou satisfeito e consultou Ifá para Eji Ogbe antes de sua descida. O Babalawo que consultou para ele foi chamado de "Ogbe Alara-lele-inuwa" (o que faz brilhar o interior). O Odu que caiu foi o próprio Eji Ogbe — o destino confirmando o destino.

O Babalawo prescreveu: "Faça Ebó com pano branco (Asọ Funfun), Efun (pó branco sagrado), Ori (manteiga de karité), Obi Abata (cola amarga) e Omi Tutu (água fresca). Agradeça a Obatala antes de descer."

Eji Ogbe fez o Ebó e desceu à terra. Ao chegar, encontrou apenas caos e trevas. Com o poder de seu Ori e o Ebó realizado, ele abriu o primeiro caminho (Ona) e plantou a primeira árvore. Todos os outros Odù desceram depois dele, cada um encontrando um caminho já aberto graças a Eji Ogbe.

Por isso Eji Ogbe é chamado de "Baba" — pai de todos os outros Odù.

HISTÓRIA 2 — OGBE E A VITÓRIA SOBRE OS INIMIGOS

Havia um rei poderoso que tinha muitos inimigos querendo destroná-lo. Seus conselheiros lhe disseram que havia quatro forças conspirado contra ele: inveja, mentira, traição e força bruta. O rei consultou Orunmila através do Babalawo.

O Odù revelado foi Eji Ogbe. O Babalawo recitou o verso:

"Ogbe kosi ibi ti yoo buru fun mi
Gbogbo ota mi yoo subu mo ese mi
Bi ewe ti n da riro, bee ni ota mi yoo da fun ire mi"

(Ogbe, não há lugar que será ruim para mim / Todos os meus inimigos cairão a meus pés / Como as folhas que se dobram com o vento, assim meus inimigos se dobrarão em minha bênção)

O Babalawo prescreveu Ebó com Igbin (caramujo branco — sagrado para Obatala), Efun, Asọ Funfun e Omi Tutu. O rei fez o Ebó no domingo ao amanhecer. Em sete dias, todos os quatro inimigos foram expostos sem que o rei precisasse agir — a verdade se revelou por si mesma, pois Eji Ogbe é o Odù da verdade absoluta (Otitọ).

━━━ ESE IFÁ — VERSOS SAGRADOS ━━━

VERSO 1 (Fonte: Abimbola, Sixteen Great Poems, 1975):

"Ọpẹlẹ fẹrẹ tanran-tanran
A difa fun Orunmila
Baba nlo rei Oke Igeti
Ebo ni won ni ko waa se
O gbebo, o rubo
Orunmila bọ sori Oke Igeti
O ri ire gbogbo"

Tradução verso a verso:
"O Opele estende-se brilhantemente para os dois lados
Consultou Ifá para Orunmila
O Pai que ia ao monte Igeti
Ebó foi o que lhe disseram para fazer
Ele ouviu, ele fez o Ebó
Orunmila ascendeu ao Monte Igeti
E encontrou todas as bênçãos"

VERSO 2:
"Arira fewu alada
A difa fun Ogbe
Ti yoo lo si ile Oyeku
Ebo ni won ni ko waa se
Ogbe o gbebo, Ogbe o rubo
Ogbe bori Oyeku
Oru ti o mo, o di aro"

Tradução verso a verso:
"O raio que usa uma roupa de espada
Consultou Ifá para Ogbe
Que ia à casa de Oyeku (a morte)
Ebó foi o que lhe disseram para fazer
Ogbe ouviu, Ogbe fez o Ebó
Ogbe venceu Oyeku (a morte)
A noite que não reconhecia, tornou-se amanhecer"

━━━ EBÓ DE EJI OGBE ━━━

MATERIAIS (Ebó Completo):
• Igbin (Caramujo branco — sagrado de Obatala): 16 peças
• Efun (Pó branco sagrado/Casca de Caracol): à vontade
• Ori (Manteiga de Karité pura): 1 pote
• Asọ Funfun (Pano branco novo): 1 metro
• Obi Abata (Noz de Cola Amarga): 4 peças
• Orogbo (Noz Orogbo Seca): 4 peças
• Omi Tutu (Água Fresca/Natural): 1 cuia
• Obi Omi Tuto (Cola Branca Hidratada): 4 peças
• Atare (Pimenta da Costa): 8 sementes

PREPARO:
1. Ao amanhecer do domingo, banha-se com Efun diluído em Omi Tutu rezando: "Obatala gba mi, Eji Ogbe gbe mi"
2. Espalha-se o Efun sobre o Asọ Funfun branco
3. Coloca-se os 16 Igbin sobre o pano, cada um untado com Ori
4. Adiciona-se Obi Abata, Orogbo, Obi Omi Tuto e Atare ao redor
5. Profere-se o Ofó: "Ogbe ko gbe eni ti o gbe e o. Ori mi dara, ona mi gba, ire wa ba mi' Ase"
6. Deixa-se a oferenda sob uma árvore branca (árvore de Obatala) ou em local alto e luminoso

━━━ EWO (INTERDIÇÕES) ━━━

• PROIBIDO comer abóbora (Elegede) — o oco representa vazio espiritual
• PROIBIDO vestir preto em dias de ritual ou trabalho espiritual
• PROIBIDO discussões desnecessárias — Eji Ogbe é Odù de paz e dignidade
• PROIBIDO mentir — Eji Ogbe governa a Verdade (Otitọ) absoluta
• PROIBIDO deitar com a cabeça voltada para o norte
• PROIBIDO negligenciar os mais velhos e os ancestrais
• RECOMENDADO: vestir branco aos domingos, fazer axé do Ori semanalmente, honrar Obatala com regularidade`
    },

    {
        id: 'oyeku-meji',
        section: 'meji',
        title: 'Oyeku Meji — O Senhor das Transições',
        subtitle: 'O Odù da Morte, dos Ancestrais e da Transformação Profunda',
        content: `OYEKU MEJI — BABA ARIKU BABAWA

"Oyeku Meji Arikú Babawa
Olori Egungun, Oba Orun
A difa fun Ikú tii se omo Olodumare"

Tradução:
"Oyeku Meji, Pai que sobrevive à morte
Chefe dos Ancestrais, Rei do Céu
Consultou Ifá para Ikú (a Morte) que é filho de Olodumare"

━━━ IDENTIDADE E NATUREZA ━━━

Oyeku Meji é o segundo dos 16 Odù Meji, mas é o mais temido e respeitado depois de Eji Ogbe. Seu sinal no Opon Ifá é oposto ao de Eji Ogbe: oito marcas simples (|) em ambas as colunas, representando o fechamento total, a noite absoluta, o fim dos ciclos.

Segundo Wande Abimbola, "Oyeku Meji veio com Ikú (a Morte) na mão esquerda e Irê (a Bênção) na mão direita. Quem faz o Ebó recebe a bênção; quem negligencia enfrenta o Osogbo."

Oyeku Meji governa tudo que tem fim: ciclos de vida, relacionamentos que terminaram sua missão, energias que precisam ser liberadas para que o novo possa nascer. Não é um Odù de destruição gratuita — é o Odù da transformação necessária.

Orixás Regentes: Oya, Egungun (ancestrais masculinos), Yemoja, Nana Buruku
Número sagrado: 9
Cores: Branco com preto (preto apenas nos detalhes exteriores)
Dia de força: Segunda-feira (dia dos Egungun)
Domínios: Morte, ancestrais, transformação, finalização, noite, lua

━━━ ITAN (HISTÓRIA SAGRADA) ━━━

HISTÓRIA 1 — OYEKU E A MORTE QUE APRENDEU A VOLTAR

No início, quando Olodumare criou os seres humanos, a Morte (Ikú) era permanente — quando alguém morria, nunca mais voltava de forma alguma. Os familiares ficavam em luto eterno. Orunmila viu o sofrimento das famílias e decidiu consultar Ifá sobre como transformar a morte.

O Odù revelado foi Oyeku Meji. O Babalawo prescreveu: "Faça Ebó com pano branco, 9 Obi Abata, 9 Orogbo, Omi Tutu para Yemoja e 1 Caramujo branco para Obatala. Ore para que a morte se torne uma passagem, não uma prisão."

Orunmila fez o Ebó. Oya (a Orixá dos ventos e das transformações) concordou em ser a guardiã da transição entre os mundos. Egungun (os ancestrais masculinos) concordaram em retornar ao mundo dos vivos em forma ritualística para consolar e guiar os familiares.

Desde então, Oyeku Meji governa não apenas a morte mas a passagem — o portal entre o Aiye (mundo dos vivos) e o Orun (mundo dos mortos/ancestrais).

HISTÓRIA 2 — O HOMEM QUE DESCONSIDEROU OYEKU

Um comerciante próspero consultou Ifá antes de uma grande viagem. O Odù revelado foi Oyeku Meji. O Babalawo disse: "Hoje não é dia de viagem. Há forças de Ikú no caminho. Faça o Ebó primeiro."

O comerciante, arrogante por sua prosperidade, respondeu: "Eu sei o que estou fazendo. Não tenho tempo para Ebós."

Partiu em viagem. Na estrada, seu carro quebrou. Enquanto esperava socorro, uma tempestade chegou subitamente. Ele sobreviveu, mas perdeu toda a mercadoria que levava — o equivalente a meses de trabalho.

Ao retornar, voltou ao Babalawo envergonhado. O Babalawo disse: "Oyeku Meji não pune — ele avisa. Você não ouviu o aviso, mas Oya mostrou misericórdia e guardou sua vida. Agora faça o Ebó e honre os Egungun."

O comerciante fez o Ebó de Oyeku Meji e durante três dias rezou aos seus ancestrais. Nunca mais desrespeitou o oráculo.

━━━ ESE IFÁ — VERSOS SAGRADOS ━━━

VERSO 1 (Fonte: Bascom, Ifa Divination, 1969):
"Ofu-fu-fu lorun nlo
Ofu-fu-fu lorun nwaye
A difa fun Oyeku
Ti nlo rei ile Iku
Ebo ni won ni ko waa se
Oyeku o gbebo, Oyeku o rubo
Ni jo ti Oyeku de ile Iku
Iku sare bale niwaju Oyeku
Oyeku ko ku
Oyeku yege"

Tradução verso a verso:
"Com o sopro, o céu passa
Com o sopro, o dia nasce
Consultou Ifá para Oyeku
Que ia à casa de Ikú (a Morte)
Ebó foi o que lhe disseram para fazer
Oyeku ouviu, Oyeku fez o Ebó
No dia em que Oyeku chegou à casa da Morte
A Morte prostrou-se aos pés de Oyeku
Oyeku não morreu
Oyeku transcendeu"

━━━ EBÓ DE OYEKU MEJI ━━━

MATERIAIS:
• Obi Abata (Noz de Cola Amarga): 9 peças
• Orogbo (Noz Orogbo Seca): 9 peças
• Atare (Pimenta da Costa): 9 sementes
• Efun (Pó Branco Sagrado): à vontade
• Asọ Funfun (Pano Branco): 1 metro
• Omi Tutu (Água Fresca): 1 cuia
• Oti (Cachaça de Cana): para os Egungun
• Ẹkọ Funfun (Cuscuz Branco): 1 porção
• Ewe Tete (Folha de Amaranto): 9 folhas
• Ewe Ogbo (Planta de Longevidade): 9 folhas

PREPARO:
1. Às segundas-feiras antes do amanhecer, preparar banho com Ewe Tete + Ewe Ogbo + Efun + Omi Tutu
2. Colocar Ẹkọ Funfun + Obi Abata + Omi Tutu e Oti na entrada da casa para os Egungun
3. Proferir o Ofó: "Egungun mi o, e juba mi o. Emi o ku. Iku o ni pa mi. Oyeku gbe mi."
4. Tradução: "Meus ancestrais, reverencio vocês. Eu não morrerei. A morte não me matará. Oyeku me sustente."
5. Deixar a oferenda por 9 dias, renovando a água fresca diariamente

━━━ EWO (INTERDIÇÕES) ━━━

• PROIBIDO ignorar sonhos — são mensagens dos Egungun e de Oyeku
• PROIBIDO recusar-se a honrar os ancestrais
• PROIBIDO fazer negócios ou casamentos sem consultar Ifá primeiro (Oyeku avisa)
• PROIBIDO vestir completamente preto por longos períodos — use sempre algum elemento branco
• PROIBIDO comer feijão preto em períodos de crise espiritual
• PROIBIDO negligenciar o Bori (axé na cabeça) — o Ori precisa ser fortalecido neste Odù
• RECOMENDADO: honrar Egungun toda segunda-feira, manter altar de ancestrais na casa`
    },

    {
        id: 'iwori-meji',
        section: 'meji',
        title: 'Iwori Meji — O Olho Interior',
        subtitle: 'O Odù da Visão Espiritual, dos Segredos e do Conhecimento Profundo',
        content: `IWORI MEJI — BABA OLUGBOHUN

"Iwori Meji, oju inu wa
A ri ohun ti oju ita ko ri
Imo re po bi omi okun"

Tradução:
"Iwori Meji, o olho interior
Que vê o que o olho externo não vê
Teu conhecimento é amplo como as águas do oceano"

━━━ IDENTIDADE E NATUREZA ━━━

Iwori Meji é o terceiro dos 16 Odù Meji. Governa a mente interior (Ori Inu), a visão espiritual, os segredos e o conhecimento oculto. Segundo Wande Abimbola, Iwori "é o Odù que vê o que outros não conseguem ver — o Odù dos segredos do coração."

Iwori Meji está intimamente ligado à capacidade de Orunmila de conhecer o futuro. É o Odù dos Babalawos que têm visão profética, dos sonhos proféticos e da intuição espiritual.

Orixás Regentes: Esu Elegbara, Oshun (aspecto sábio)
Número sagrado: 3 e 7
Cores: Verde e amarelo, branco
Dia de força: Quarta-feira
Domínios: Visão espiritual, segredos, mente, intuição, sonhos, sabedoria interior

━━━ ITAN (HISTÓRIA SAGRADA) ━━━

HISTÓRIA 1 — IWORI E O PRESENTE DA VISÃO

Iwori era um jovem filho de Babalawo que cresceu sem conseguir ver o futuro como seu pai. Envergonhado, foi ao Babalawo mais antigo da região e disse: "Consulto Ifá para os outros, mas não consigo ver meu próprio destino. Por quê?"

O ancião consultou Ifá. Iwori Meji foi revelado. O Babalawo disse: "Você está olhando para fora quando deveria olhar para dentro. A visão que Orunmila deu a você não está nos olhos físicos — está no Ori Inu (cabeça interior). Faça o Ebó e aprenda a silenciar."

Iwori fez o Ebó: ovos de galinha + mel + ervas de Oshun + Omi Oshun (água de rio). Passou 7 dias em meditação, acordando antes do amanhecer, sentando em silêncio contemplando seu próprio Ori. Na sétima noite, Orunmila apareceu em sonho e disse: "A visão sempre esteve dentro de você. O barulho do mundo externo a bloqueava."

Ao acordar, Iwori descobriu que podia ver — não com claridade de raio-x como esperava, mas com a sutileza da intuição verdadeira: sabia quando as pessoas mentiam, sentia quando o perigo estava próximo, ouvia as mensagens dos ancestrais nos sonhos.

HISTÓRIA 2 — O SEGREDO QUE SALVOU O REINO

Um rei tinha um segredo que, se revelado, poderia destruir seu reinado. Ao consultar Ifá, o Odù Iwori Meji foi revelado. O Babalawo disse: "Há alguém em sua corte que conhece seu segredo e planeja usá-lo contra você. Mas o segredo que você teme revelar é, na verdade, sua maior proteção — pois é a verdade."

O rei, com coragem, reuniu toda a corte e revelou o segredo ele mesmo, antes que o inimigo pudesse fazê-lo de forma distorcida. A honestidade do rei comoveu o povo. O conspirador foi exposto. O reino ficou mais unido do que nunca.

Ensinamento de Iwori Meji: O segredo guardado com medo destrói. O segredo revelado com sabedoria e no momento certo protege e liberta.

━━━ ESE IFÁ — VERSOS SAGRADOS ━━━

VERSO 1:
"Iwori wo inu è wo
Inu rẹ dara bi omi
Omi tó mọ, omi tó yọ
A difa fun Iwori
Ti nlo rei Ile Imo
Ẹbo ni won ni kó wáá ṣe
Iwori gbẹbọ, Iwori rúbọ
Iwori de Ile Imo
O ri imo ti ò rí rí"

Tradução verso a verso:
"Iwori olhe para dentro de si
Seu interior é bom como a água
Água que é pura, água que flui
Consultou Ifá para Iwori
Que ia à Casa do Conhecimento
Ebó foi o que lhe disseram para fazer
Iwori ouviu, Iwori fez o Ebó
Iwori chegou à Casa do Conhecimento
E encontrou o conhecimento que nunca havia visto"

━━━ EBÓ DE IWORI MEJI ━━━

MATERIAIS:
• Eyin Adiye (Ovos de Galinha Caipira): 3 ovos
• Oyin (Mel Natural): 1 pote
• Omi Oshun (Água de Rio): 1 cuia
• Ewe Efinrin (Alfavaca Sagrada): 7 folhas
• Efun (Pó Branco): à vontade
• Ati (Algodão Branco): 1 bola
• Oti Oti (Cachaça): para Esu

PREPARO:
1. Às quartas-feiras ao amanhecer, prepara-se Omi Oshun com Ewe Efinrin
2. Em silêncio absoluto, quebram-se os 3 ovos em tigela branca
3. Adiciona-se mel + Efun + folhas, misturando com mãos limpas
4. Apoia-se a mistura sobre a cabeça (Ori) por 7 minutos em meditação silenciosa
5. Ofó: "Ori mi, eko mi, imo mi. Ki Iwori ṣii oju inu mi. Ki n ri ohun ti Orunmila ri." (Minha cabeça, minha mente, meu conhecimento. Que Iwori abra meu olho interior. Que eu veja o que Orunmila vê.)
6. Despacho: verter a mistura em rio corrente às quartas-feiras

━━━ EWO (INTERDIÇÕES) ━━━

• PROIBIDO revelar segredos espirituais a não-iniciados
• PROIBIDO olhar para dentro de poços ou rios à noite sem proteção ritual
• PROIBIDO mentir — Iwori governa a verdade interior
• PROIBIDO tomar decisões importantes sem meditação prévia
• PROIBIDO ignorar sonhos e visões — são mensagens de Ori e Orunmila
• PROIBIDO falar em excesso — Iwori aprecia o silêncio sábio
• RECOMENDADO: diário de sonhos, meditação antes do amanhecer, estudar os versos de Ifá`
    },

    {
        id: 'odi-meji',
        section: 'meji',
        title: 'Odi Meji — Os Mistérios do Ventre',
        subtitle: 'O Odù das Forças Femininas, da Fertilidade e dos Segredos Ocultos',
        content: `ODI MEJI — BABA OMO ALADE

"Odi Meji awọ inu ilẹ
Awo inú obinrin
Gbọ́gbọ ohun tó wà nínú ilẹ̀ ni Odi mọ"

Tradução:
"Odi Meji, o segredo interior da terra
O segredo interior da mulher
Tudo o que existe dentro da terra, Odi conhece"

━━━ IDENTIDADE E NATUREZA ━━━

Odi Meji é o quarto dos 16 Odù Meji. É o Odù dos mistérios femininos, do ventre gerador, das forças criativas ocultas. Wande Abimbola descreve Odi como "o Odù que carrega os segredos mais profundos — o que está dentro, o que está escondido, o que precisa ser protegido."

Odi governa o útero, a gestação, os segredos familiares, as forças das Iyami Eleye (as poderosas mães ancestrais/feiticeiras). É um Odù de extremo cuidado — os segredos de Odi não devem ser revelados levianamente.

Orixás Regentes: Olokun (profundezas), Yemoja, Oshun (aspecto misterioso), as Iyami Eleye
Número sagrado: 7
Cores: Azul escuro, verde-mar, branco
Dia de força: Quinta-feira
Domínios: Fertilidade, ventre, segredos, mistérios femininos, profundezas, gestação

━━━ ITAN (HISTÓRIA SAGRADA) ━━━

HISTÓRIA 1 — ODI E O SEGREDO DA FERTILIDADE

Uma mulher de nome Alaran não conseguia ter filhos. Após anos de tentativas, consultou Ifá. O Babalawo lançou o Opele e o Odù Odi Meji foi revelado.

O Babalawo disse: "Odi revela que há um bloqueio espiritual em seu útero. Você, sem saber, desconsiderou as Iyami Eleye — as mães ancestrais — e elas fecharam o portal da fertilidade. O Ebó vai abrir este portal."

Ebó prescrito: 7 Obi Abata + mel puro + Omi Oshun (água de rio) + inhame branco (Ajẹ Funfun) + Ewe Efinrin + pano azul. Tudo isso oferecido à beira do rio com os joelhos no chão, pedindo perdão às Iyami.

Alaran fez o Ebó por 7 dias consecutivos. Na vigésima primeira noite, sonhou com uma mulher anciã de beleza sobrenatural que lhe disse: "Filha, te perdoamos. Tua prece foi ouvida." Em três meses, Alaran estava grávida de gêmeos.

HISTÓRIA 2 — O PROIBIDO QUE SE TORNA NECESSÁRIO

Em uma vila, havia um segredo ancestral que todos conheciam mas ninguém falava: o fundador da vila havia cometido uma injustiça gerações atrás. Este segredo criava bloqueios espirituais em toda a comunidade — doenças, perdas, conflitos.

O Babalawo consultou Ifá para a comunidade. Odi Meji foi revelado. "O que está enterrado precisa ser reconhecido antes que possa ser curado. O segredo que vocês carregam está envenenando o solo espiritual desta terra."

Com ritual adequado, a comunidade reuniu-se, reconheceu o erro do passado, fez Ebó coletivo e prometeu reparação simbólica. Os bloqueios se dissiparam progressivamente.

Ensinamento de Odi Meji: Alguns segredos não devem ser revelados. Outros devem — especialmente quando sua permanência causa dano. A sabedoria está em discernir quando.

━━━ ESE IFÁ — VERSOS SAGRADOS ━━━

VERSO 1:
"Odi má ṣi mọ́
Odi má tì mọ́
A difa fun Odi
Ti yóò bímọ lọ́dọ̀ Olókun
Ẹbo ní won ní kó wáá ṣe
Odi gbẹbọ, Odi rúbọ
Odi bímọ tó pọ̀ bí omi"

Tradução verso a verso:
"Odi não abre com leveza
Odi não fecha com leveza
Consultou Ifá para Odi
Que teria filhos junto a Olokun
Ebó foi o que lhe disseram para fazer
Odi ouviu, Odi fez o Ebó
Odi teve filhos numerosos como a água"

━━━ EBÓ DE ODI MEJI ━━━

MATERIAIS:
• Obi Abata (Noz de Cola Amarga): 7 peças
• Oyin (Mel Natural): 1 pote
• Omi Oshun (Água de Rio): 1 cuia
• Ajẹ Funfun (Inhame Branco): 1 peça
• Ewe Efinrin (Alfavaca Sagrada): 7 folhas
• Asọ Buluu (Pano Azul Escuro): 1 metro
• Efun (Pó Branco): à vontade

PREPARO:
1. Às quintas-feiras ao entardecer, preparar oferenda à beira de rio ou mar
2. Ajoelhar (joelhos no chão — sinal de reverência às Iyami)
3. Proferir pedido de licença às Iyami Eleye: "Iyami mi o, e gba mi o. Mo toro afowofi ninu ire gbogbo"
4. (Tradução: "Minhas mães, recebam-me. Peço gentilmente todas as bênçãos")
5. Colocar o Inhame branco na água, coberto de mel, envolvido com pano azul
6. Adicionar os outros itens rezando pedido específico (filhos, saúde, lar)
7. NUNCA revelar o conteúdo deste Ebó a ninguém — é segredo de Odi

━━━ EWO (INTERDIÇÕES) ━━━

• PROIBIDO comer cão — tabu absoluto de Odi Meji
• PROIBIDO revelar segredos de família para estranhos
• PROIBIDO discutir em locais sagrados (templos, rios, cemitérios)
• PROIBIDO desrespeitar mulheres grávidas ou crianças pequenas
• PROIBIDO negligenciar as Iyami Eleye e as mulheres mais velhas da família
• PROIBIDO praticar interrupção de gravidez sem extrema necessidade médica
• RECOMENDADO: oferecer mel às Iyami nas quintas-feiras, manter silêncio sobre questões familiares`
    },

    {
        id: 'irosun-meji',
        section: 'meji',
        title: 'Irosun Meji — O Sangue Ancestral',
        subtitle: 'O Odù da Linhagem, do Sacrifício e da Vitória pelo Sangue',
        content: `IROSUN MEJI — BABA ONISANGO

"Irosun Meji, eje l'eje
Eje l'ogun, eje ni imo
Olori Onisango, a gb'eje bo Orunmila"

Tradução:
"Irosun Meji, sangue é sangue
Sangue é medicina, sangue é conhecimento
Chefe dos portadores de sangue, que oferece sangue a Orunmila"

━━━ IDENTIDADE E NATUREZA ━━━

Irosun Meji é o quinto dos 16 Odù Meji. Governa o sangue, a linhagem genética, os ciclos menstruais, os sacrifícios com Eje (sangue), e a memória ancestral transmitida através do DNA espiritual. É o Odù de Shango no aspecto guerreiro.

Orixás Regentes: Shango (principal), Ogun (secundário), Yemoja (no aspecto menstrual)
Número sagrado: 5
Cores: Vermelho e branco
Dia de força: Sábado
Domínios: Sangue, linhagem, sacrifício animal, saúde sanguínea, vigor

━━━ ITAN ━━━

Um guerreiro chamado Orisagun estava perdendo todas as batalhas, não por falta de força, mas por falta de proteção espiritual. Consultou Ifá — saiu Irosun Meji. O Babalawo disse: "Você abandonou o culto de seus ancestrais guerreiros. Eles não protegem quem esquece deles. Faça Ebó com Adiye Pupa (galinha vermelha) para Shango e despeje o Eje sobre sua espada (Obe)."

O guerreiro fez o Ebó. Shango tomou seu Eje como sinal de aliança. Na próxima batalha, o guerreiro foi invencível — não porque ficou mais forte fisicamente, mas porque os ancestrais guerreiros de sua linhagem vieram lutar ao seu lado.

Ensinamento: O sangue une os vivos e os ancestrais. Quem mantém o culto ancestral nunca luta sozinho.

━━━ ESE IFÁ ━━━

"Eje l'eje, eje l'owo
A difa fun Orisagun
Ti o lo jagun fun Orunmila
Ebo ni won ni ko waa se
O gbebo, o rubo
Orisagun jagun, Orisagun segun"

Tradução:
"Sangue é sangue, sangue é poder
Consultou Ifá para Orisagun
Que foi guerrear para Orunmila
Ebó foi o que lhe disseram para fazer
Ele ouviu, ele fez o Ebó
Orisagun guerreou, Orisagun venceu"

━━━ EBÓ ━━━

Materiais: Adiye Pupa (Galinha Vermelha), Oti (Cachaça), Epo Pupa (Azeite de Dendê), Pimenta Vermelha (Tatashe), Ferro velho (Irin), Iyerosun (Pó Sagrado de Ifá), Asọ Pupa (Pano Vermelho).
Preparo: Oferecer a galinha vermelha a Shango no sábado ao entardecer. Derramar o Eje sobre o Iyerosun traçando o sinal de Irosun. Rezar: "Shango mi, Jakuta mi. Eje yi ni ami igbejo fun o. Gba mi, ja fun mi." (Shango meu, Trovão meu. Este sangue é minha renovação de aliança. Recebe-me, briga por mim.)

━━━ EWO ━━━

• PROIBIDO comer inhame com óleo de palma misturados (combinação de Shango e Ogun causa conflito)
• PROIBIDO derramar sangue desnecessariamente ou matar sem propósito ritual
• PROIBIDO ignorar familiares doentes — Irosun governa saúde sanguínea
• PROIBIDO usar roupas vermelhas em conflitos — atrai mais fogo
• RECOMENDADO: cultuar Shango regularmente, verificar saúde do sangue (exames médicos)`
    },

    {
        id: 'owonrin-meji',
        section: 'meji',
        title: 'Owonrin Meji — O Caos Criativo',
        subtitle: 'O Odù das Reviravoltas, da Imprevisibilidade e do Renascimento',
        content: `OWONRIN MEJI — BABA ALASEJUA

"Owonrin Meji, okunrin orum
A n'da ohun ti a ko ni ro
Reversal of fortune, ire lati osogbo"

Tradução:
"Owonrin Meji, homem poderoso do céu
Que cria o que não se espera
Inversão da fortuna, bênção nascida do desastre"

━━━ IDENTIDADE E NATUREZA ━━━

Owonrin Meji é o sexto Odù Meji. É o Odù da imprevisibilidade absoluta — os planos mudam, o inesperado acontece. Mas Owonrin não é simplesmente caos destrutivo: é o caos criativo que precede uma nova ordem. A tempestade que limpa o ar.

Orixás Regentes: Esu Elegbara (principal), Shango, Oya
Número sagrado: 6 e 12
Cores: Preto e vermelho (de Esu), multicolorido
Dia de força: Segunda-feira (dia de Esu)
Domínios: Mudanças repentinas, acidentes, revelações, renovação forçada, criatividade extrema

━━━ ITAN ━━━

Um homem de nome Akanke tinha um negócio próspero. Consultou Ifá — saiu Owonrin Meji. O Babalawo advertiu: "Uma mudança violenta vem. Não é punição — é repositioning espiritual. Faça o Ebó ou seja surpreendido sem proteção."

Akanke não fez o Ebó. Em um mês, seu armazém pegou fogo — toda a mercadoria perdida. Arrasado, voltou ao Babalawo. "O fogo de Shango limpou sua energia estagnada. Você estava em caminho errado e sua teimosia não deixava você ver. O que parece destruição é a fundação do próximo ciclo."

Akanke recomeçou no ramo certo. Em três anos era mais próspero do que antes — mas desta vez no caminho do Ayanmo.

━━━ ESE IFÁ ━━━

"Owonrin w'ode, Owonrin w'ile
Okankan ko le da Owonrin duro
A difa fun Owonrin
Ti o d'aye lati orun
Ebo ni won ni ko waa se
Owonrin gbebo, Owonrin rubo
Gbogbo osogbo di ire ni owo Owonrin"

Tradução:
"Owonrin entra no mundo, Owonrin entra em casa
Nada pode deter Owonrin
Consultou Ifá para Owonrin
Que desceu do céu à terra
Ebó foi o que lhe disseram para fazer
Owonrin ouviu, Owonrin fez o Ebó
Todo osogbo tornou-se irê nas mãos de Owonrin"

━━━ EBÓ ━━━

Materiais: 21 Obi Abata, 21 Atare, Oti (Cachaça) — 1 garrafa, Igi Obi (madeira de cola), Asọ Pupa Dudu (pano preto e vermelho), Omi Tutu.
Preparo: Na encruzilhada mais próxima, ao amanhecer de segunda-feira, oferecer tudo a Esu Elegbara. Rezar: "Esu Odara, ki o si fun mi ni ona tuntun. Ohun ti bajẹ je ki o tun se." (Esu Odara, abra para mim o novo caminho. O que se quebrou, que seja refeito.) Jogar os 21 Obi Abata no chão em sinal de consulta antes de partir.

━━━ EWO ━━━

• PROIBIDO resistir a mudanças quando todos os sinais apontam para elas
• PROIBIDO tomar emprestado o que não pode pagar — Owonrin amplifica dívidas
• PROIBIDO fazer planos rígidos sem margem para imprevistos
• PROIBIDO comer milho fermentado (ogi) — provoca instabilidade
• RECOMENDADO: cultuar Esu toda segunda-feira, manter flexibilidade em todos os projetos`
    },

    {
        id: 'obara-meji',
        section: 'meji',
        title: 'Obara Meji — O Rei Próspero',
        subtitle: 'O Odù da Realeza, do Comércio e da Eloquência',
        content: `OBARA MEJI — BABA OBA OLORI

"Obara Meji, oba ti o ni ekeji
Oro enu re dun bi oyin
Ogo re tan bi ina orun"

Tradução:
"Obara Meji, rei sem segundo
Suas palavras são doces como mel
Sua glória brilha como o sol"

━━━ IDENTIDADE E NATUREZA ━━━

Obara Meji é o sétimo Odù Meji. Governa a realeza, a liderança, o comércio próspero, a eloquência e o poder da palavra. É o Odù dos reis (Oba), dos comerciantes bem-sucedidos e dos oradores. Shango e Obatala compartilham sua regência, mas Shango é o primário.

Orixás Regentes: Shango (aspecto real), Obatala (dignidade), Oshun (riqueza)
Número sagrado: 6
Cores: Vermelho e branco, amarelo e ouro
Dia de força: Sábado
Domínios: Realeza, liderança, dinheiro, eloquência, status social, honra

━━━ ITAN ━━━

Havia um homem que vendia abóboras no mercado. Consultou Ifá — saiu Obara Meji. O Babalawo disse: "Há riqueza escondida em seus produtos. A abóbora que você vê como ordinária, Obara vê como veículo de prosperidade. Faça o Ebó e mude a forma como você se apresenta no mercado."

O homem fez o Ebó: cobriu sua banca com pano vermelho, colocou Obi Abata e Orogbo como oferenda a Shango antes de cada dia de mercado, e aprendeu a falar de seus produtos com eloquência e orgulho.

Em um ano, era o maior fornecedor de hortifrutigranjeiros da região. Outros vendedores o copiaram, mas nenhum conseguia o mesmo resultado — faltava o Ebó, a aliança com Obara.

━━━ ESE IFÁ ━━━

"Oba to b'oja de
Oja re di oja tuntun
A difa fun Obara
Ti yoo j'oba lori gbogbo oja
Ebo ni won ni ko waa se
Obara gbebo, Obara rubo
Obara di oba gbogbo oja"

Tradução:
"O rei que chega ao mercado
Seu mercado torna-se um mercado novo
Consultou Ifá para Obara
Que seria rei sobre todos os mercados
Ebó foi o que lhe disseram para fazer
Obara ouviu, Obara fez o Ebó
Obara tornou-se rei sobre todos os mercados"

━━━ EBÓ ━━━

Materiais: Adiye Pupa (Galinha Vermelha), Owo (Dinheiro — nota mais valiosa disponível), Obi Abata (6 peças), Orogbo (6 peças), Asọ Pupa (Pano Vermelho), Epo Pupa (Azeite de Dendê), Oti (Cachaça).
Preparo: No sábado ao meio-dia (hora de Shango), preparar a oferenda sobre pano vermelho. Rezar: "Shango Oba Koso, gba mi lowo Arun, gba mi lowo Iku, fun mi ni ogo ati owo." (Shango Rei de Koso, salva-me da doença, salva-me da morte, dá-me honra e dinheiro.) Despachar no topo de um morro ou árvore alta.

━━━ EWO ━━━

• PROIBIDO mendigar ou pedir emprestado com humilhação — fere a realeza do Ori
• PROIBIDO falar mal de si mesmo em público — a palavra cria realidade em Obara
• PROIBIDO usar roupas rasgadas ou descuidadas em dias importantes
• PROIBIDO descuidar da aparência — Obara é Odù de dignidade e apresentação
• RECOMENDADO: cultivar eloquência, vestir-se bem, tratar todos com respeito real`
    },

    {
        id: 'okanran-meji',
        section: 'meji',
        title: 'Okanran Meji — A Força Conflitante',
        subtitle: 'O Odù dos Processos, da Justiça e da Transformação pelo Conflito',
        content: `OKANRAN MEJI — BABA ISAKARI

"Okanran meji o
Okunrin ija, okunrin ogun
Sugbon ofin ni o ma gba segun"

Tradução:
"Okanran Meji
Homem de luta, homem de guerra
Mas é a lei que sempre prevalece"

━━━ IDENTIDADE E NATUREZA ━━━

Okanran Meji é o oitavo Odù Meji. Governa disputas, processos legais, conflitos, justiça e a força que destrói para reconstruir. É o Odù de Shango como Rei da Justiça e de Esu como provocador. Quando Okanran aparece, há algum conflito no caminho — mas também a possibilidade de vitória pela justiça.

Orixás Regentes: Shango (justiça), Esu Elegbara, Ogun
Número sagrado: 4 e 8
Cores: Vermelho e preto
Dia de força: Quarta-feira
Domínios: Conflito, processos legais, justiça, rivalidade, agressividade, renovação violenta

━━━ ITAN ━━━

Um homem de nome Laro tinha uma terra disputada por seu vizinho agressivo. O vizinho tinha amigos no governo e contratou advogados caros. Laro, pobre, foi ao Babalawo. Saiu Okanran Meji.

O Babalawo disse: "Este Odù é difícil, mas não impossível. Shango, o rei da justiça, está do seu lado — mas você precisa fazer o Ebó para accordar-lhe. Não tente combater com força bruta; use a lei e a verdade."

Laro fez o Ebó de Okanran: 4 Obi Abata + ferro velho (Irin Ogun) + pergaminhos com documentos da terra escritos dentro de caixa vermelha oferecida a Shango. Rezou: "Shango Jakuta, awo ile ejo, gbemi lowo ota mi. Otito ni mi, otito ni segun."

O vizinho, por arrogância, cometeu fraude documental durante o processo. A fraude foi descoberta. A terra foi devolvida a Laro. Shango fez justiça.

━━━ ESE IFÁ ━━━

"Ija ija maa won
Sugbon otito maa segun
A difa fun Laro
Ti o lo ja fun ile re
Ebo ni won ni ko waa se
Laro gbebo, Laro rubo
Otito segun, Ija duro"

Tradução:
"Luta, luta sempre há
Mas a verdade sempre vence
Consultou Ifá para Laro
Que foi lutar pela sua terra
Ebó foi o que lhe disseram para fazer
Laro ouviu, Laro fez o Ebó
A verdade venceu, o conflito cessou"

━━━ EBÓ ━━━

Materiais: Obi Abata (4 peças), Irin Ogun (Ferro Velho — qualquer objeto de ferro), Asọ Pupa (Pano Vermelho), Oti (Cachaça), Epo Pupa (Azeite de Dendê), Iyerosun (Pó de Ifá).
Preparo: Na quarta-feira ao pôr do sol, colocar o ferro no centro do pano vermelho. Despejar Oti + Epo Pupa sobre o ferro rezando: "Ogun gba mi, Shango se idajo fun mi. Ota mi o le segun mi." (Ogun protege-me, Shango faz justiça por mim. Meu inimigo não pode me vencer.) Colocar na frente da porta da casa por 4 dias.

━━━ EWO ━━━

• PROIBIDO iniciar brigas desnecessárias — Okanran amplifica conflitos 10x
• PROIBIDO mentir em contextos legais ou formais
• PROIBIDO comer alimentos amargos em excesso (feijão amargo, folhas amargas)
• PROIBIDO dormir com inimigos conhecidos nas proximidades sem proteção ritual
• RECOMENDADO: cultivar diplomacia, cultivar aliados poderosos e honestos`
    },

    {
        id: 'ogunda-meji',
        section: 'meji',
        title: 'Ogunda Meji — O Abridor de Caminhos',
        subtitle: 'O Odù da Desobstrução, do Trabalho e da Medicina',
        content: `OGUNDA MEJI — BABA OGUN ONIRE

"Ogunda Meji, ologun onire
Obe re lona, obe re kogiri
Ona ti ti di, Ogun ni o si"

Tradução:
"Ogunda Meji, guerreiro da bênção
Sua faca abre o caminho, sua faca derruba o muro
O caminho que estava fechado, Ogun é o que abre"

━━━ IDENTIDADE E NATUREZA ━━━

Ogunda Meji é o nono Odù Meji. Governa Ogun — o Orixá do ferro, do trabalho, dos caminhos e da medicina cirúrgica. É o Odù dos médicos, dos cirurgiões, dos soldados, dos motoristas, dos ferreiros e de todos que trabalham com ferro.

Orixás Regentes: Ogun (principal), Esu (caminhos), Orunmila (medicina de Ifá)
Número sagrado: 3 e 7
Cores: Verde e preto
Dia de força: Terça-feira
Domínios: Caminhos, trabalho, cirurgia, ferro, desobstrução, força física

━━━ ITAN ━━━

Os caminhos do mundo estavam tomados por mato denso e impenetrável. Nenhum ser vivo conseguia passar — nem para caçar, nem para comerciar, nem para visitar familiares. Olodumare convocou os Orixás e perguntou: "Quem vai abrir os caminhos?"

Obatala tentou com brandura — o mato resistiu. Shango tentou com fogo — queimou tudo mas o mato voltou. Oya tentou com o vento — apenas dobrou, não cortou.

Ogun pegou sua faca (Àdá) e seu facão (Obe), desceu para o mato cantando: "Ogun ko jẹun, Ogun n'lo ṣiṣẹ" (Ogun não comeu, Ogun foi trabalhar). Trabalhou por sete dias e sete noites sem parar, abrindo estradas, trilhas e caminhos. Quando terminou, todos os seres puderam se mover livremente.

Por esse serviço, Olodumare deu a Ogun o domínio sobre todo o ferro e toda estrada.

━━━ ESE IFÁ ━━━

"Obe gbe obe gbe
A difa fun Ogun
Ti n lo sise fun Olodumare
Ebo ni won ni ko waa se
Ogun gbebo, Ogun rubo
Ogun gba ade, Ogun gba ogo
Gbogbo ona tun si"

Tradução:
"A faca levanta, a faca levanta
Consultou Ifá para Ogun
Que foi trabalhar para Olodumare
Ebó foi o que lhe disseram para fazer
Ogun ouviu, Ogun fez o Ebó
Ogun recebeu a coroa, Ogun recebeu a glória
Todos os caminhos foram abertos"

━━━ EBÓ ━━━

Materiais: Oti (Cachaça) — para Ogun, Imi Eku e Imi Eja (ratos e peixes defumados), Igi Obi (madeira de cola), Ferro velho (Irin), Epo Pupa (Azeite de Dendê), Obi Abata (3 kolas) e Atare.
Preparo: Na terça-feira ao entardecer, levar os materiais a uma encruzilhada de estrada (não de cemitério). Despejar a cachaça sobre o ferro rezando: "Ogun Onire, si na fun mi. Gbogbo idena ki o fọ. Iṣẹ mi ki o ṣẹgun." (Ogun da bênção, abre meu caminho. Que todos os bloqueios se quebrem. Que meu trabalho vença.) Deixar os materiais na encruzilhada.

━━━ EWO ━━━

• PROIBIDO guardar rancor — Ogun não protege quem acumula amargura
• PROIBIDO recusar trabalho legítimo — Ogunda é Odù do trabalhador
• PROIBIDO comer com as mãos sujas — Ogun exige respeito e limpeza
• PROIBIDO ingerir bebidas antes de dirigir (Ogun governa estradas)
• RECOMENDADO: cultuar Ogun toda terça-feira, honrar ferreiros e médicos cirurgiões`
    },

    {
        id: 'osa-meji',
        section: 'meji',
        title: 'Osa Meji — A Tempestade da Transformação',
        subtitle: 'O Odù das Mudanças Radicais, de Oya e dos Ventos do Destino',
        content: `OSA MEJI — BABA OSA IRETE

"Osa Meji, afefe nla
O n'fọn gbogbo ohun ti o bajẹ
Lati jeki o tuntun waye"

Tradução:
"Osa Meji, o grande vento
Que derruba tudo que está apodrecido
Para que o novo possa nascer"

━━━ IDENTIDADE E NATUREZA ━━━

Osa Meji é o décimo Odù Meji. Governa Oya — a Orixá dos ventos, das tempestades, das transformações rápidas e dos mercados (Oja). É o Odù da mudança radical, da transmutação súbita. Quando Osa aparece, uma transformação profunda está em curso.

Orixás Regentes: Oya (principal), Shango (companheiro), Egungun
Número sagrado: 9
Cores: Marrom, vinho escuro, multicolorido (cores de Oya)
Dia de força: Quarta-feira
Domínios: Tempestades, mudanças, mercado, transmutação, Egungun, ventos

━━━ ITAN ━━━

Havia uma mulher de nome Ayaba que tinha medo de mudanças — recusava novos empregos, novos domicílios, novas oportunidades. Sua vida estagnava. Consultou Ifá — saiu Osa Meji.

O Babalawo disse: "Oya está chamando você. Ela não pede com gentileza — ela manda como a tempestade. Se você não fizer o Ebó e abraçar a mudança voluntariamente, Oya virá e removerá tudo o que está estagnado à força."

Ayaba recusou o Ebó. Em dois meses perdeu o emprego, o marido pediu separação e ela foi forçada a mudar de cidade. Em nova cidade, encontrou o trabalho certo, novas amizades e um propósito que nunca havia imaginado.

"Oya destruiu minha estagnação para me dar liberdade," ela disse depois. "Deveria ter feito o Ebó antes."

━━━ ESE IFÁ ━━━

"Afefe n'bo, afefe n'lo
Oya n'lo sise fun Orunmila
A difa fun Osa
Ti yoo pada ile re
Ebo ni won ni ko waa se
Osa gbebo, Osa rubo
Gbogbo ohun ti bajẹ di tuntun"

Tradução:
"O vento vém, o vento vai
Oya vai trabalhar para Orunmila
Consultou Ifá para Osa
Que voltaria para sua casa
Ebó foi o que lhe disseram para fazer
Osa ouviu, Osa fez o Ebó
Tudo que estava estragado tornou-se novo"

━━━ EBÓ ━━━

Materiais: Pano Roxo-vinho (Asọ Pupa Dudu), 9 Atare, Oti (Cachaça), Oy (sementes de Oya — Igba Oya), Ewe Iya (folha sagrada de Oya), Omi Okun (água de lagoa ou açude), Efun.
Preparo: Na quarta-feira ao entardecer, preparar banho com Ewe Iya + Omi Okun + Efun. Após o banho, colocar 9 Atare + Oti em encruzilhada ventosa rezando: "Oya mi, olori afefe, ki o pa gbogbo idena mo. Ki o mu ire tuntun wa mi." (Oya minha, chefe dos ventos, que derrube todos os bloqueios. Que traga novas bênçãos para mim.)

━━━ EWO ━━━

• PROIBIDO ter medo de mudanças — em Osa, quem resist ao vento é derrubado
• PROIBIDO usar peles de animais em excesso — ofende Oya
• PROIBIDO negligenciar os Egungun — Osa governa ancestrais e mortos recentes
• PROIBIDO entrar em cemitérios sem proteção e sem permissão ritual
• RECOMENDADO: fazer oferendas a Oya regularmente, cultivar coragem para mudanças`
    },

    {
        id: 'ika-meji',
        section: 'meji',
        title: 'Ika Meji — O Tecelão do Destino',
        subtitle: 'O Odù das Habilidades Especiais, dos Artesãos e da Transmissão do Saber',
        content: `IKA MEJI — BABA ARIRA OLOGBON

"Ika Meji, ologbon ile orun
Onisowo imo ati owo
A n'tan imo fun won ti ko m'imo"

Tradução:
"Ika Meji, o sábio da casa do céu
Comerciante de conhecimento e prosperidade
Que ilumina os que não têm conhecimento"

━━━ IDENTIDADE E NATUREZA ━━━

Ika Meji é o décimo primeiro Odù Meji. Governa habilidades especiais (Ogbon), artesanato, aprendizagem, transmissão de conhecimento, tecelagem e todas as artes manuais. É o Odù dos artistas, curandeiros herbalistas, professores e artesãos.

Orixás Regentes: Orunmila (conhecimento), Obatala (perfeição artística), Oshun (doçura e arte)
Número sagrado: 11
Cores: Amarelo-ouro com branco
Dia de força: Quinta-feira
Domínios: Habilidades manuais, artesanato, medicina herbal, ensinamento, transmissão cultural

━━━ ITAN ━━━

Um tecelão de nome Oluwafemi era o melhor de sua região, mas atingiu um nível de habilidade e não conseguia mais evoluir. Consultou Ifá — saiu Ika Meji.

O Babalawo disse: "Seu problema não é falta de habilidade — é falta de dedicação ao Orunmila. Você tem o dom, mas não agradece o Dador do dom. Faça o Ebó e ensine a três aprendizes gratuitamente — pois Ika ensina que o conhecimento transmitido se multiplica, e o retido se murcha."

Femi fez o Ebó e ensinou três jovens. Algo interessante aconteceu: ao ensiná-los, ele próprio desenvolveu técnicas que nunca havia imaginado. Seus tecidos tornaram-se famosos em dez regiões.

Ensinamento de Ika: O mestre que não transmite seu conhecimento eventualmente o perde. O mestre que transmite recebe de volta multiplicado.

━━━ ESE IFÁ ━━━

"Ika n'ko, ika n'ko
Ogbon to ba n'de ko sonu
A difa fun Ika
Ti o lo ko eniyan l'ogbon
Ebo ni won ni ko waa se
Ika gbebo, Ika rubo
Ogbon Ika tan kaakiri aye"

Tradução:
"Ika ensina, Ika ensina
O conhecimento adquirido não se perde
Consultou Ifá para Ika
Que foi ensinar sabedoria às pessoas
Ebó foi o que lhe disseram para fazer
Ika ouviu, Ika fez o Ebó
A sabedoria de Ika espalhou-se pelo mundo"

━━━ EBÓ ━━━

Materiais: Oyin (Mel), Eyin Adiye (3 ovos brancos de galinha), Efun (Pó Branco), Omi Oshun (Água de Rio), Atare (11 sementes), Asọ Pupa/Funfun (pano amarelo e branco).
Preparo: Na quinta-feira ao amanhecer, preparar um banho especial com mel + ovos + Efun + Omi Oshun. Lavar cabeça (Ori) e mãos (ferramentas do aprendiz/artesão) com esta mistura. Ofó: "Ika mi so imo fun mi. Ki owo mi mọ iṣẹ rere. Ki Orunmila se mi l'olukọni." (Ika, dá-me conhecimento. Que minhas mãos conheçam o bom trabalho. Que Orunmila seja meu professor.)

━━━ EWO ━━━

• PROIBIDO guardar conhecimento por inveja — Ika pune o mestre ciumento
• PROIBIDO usar as mãos para o mal (roubar, machucar sem necessidade)
• PROIBIDO degradar artesãos, professores ou curandeiros
• PROIBIDO abandonar projetos a meio caminho — Ika valoriza a conclusão
• RECOMENDADO: ensinar pelo menos uma habilidade a outro, estudar herbalismo e artes`
    },

    {
        id: 'oturupon-meji',
        section: 'meji',
        title: 'Oturupon Meji — A Cura Profunda',
        subtitle: 'O Odù da Medicina Ancestral, da Cura e dos Mistérios do Corpo',
        content: `OTURUPON MEJI — BABA OSANYIN ONISẸGUN

"Oturupon Meji, onisẹgun nla
Ewe ni ogun, ewe ni aye
Osanyin gbogbo arun san"

Tradução:
"Oturupon Meji, o grande curandeiro
As ervas são medicina, as ervas são vida
Osanyin cura todas as doenças"

━━━ IDENTIDADE E NATUREZA ━━━

Oturupon Meji é o décimo segundo Odù Meji. Governa a medicina herbal (Akose), a cura de doenças profundas, o Orixá Osanyin (dono das ervas sagradas), e os mistérios do corpo humano. É o Odù dos curandeiros tradicionais, médicos e Babalawo-Onisẹgun.

Orixás Regentes: Osanyin (ervas e cura), Ogun (medicina cirúrgica), Obatala (corpo físico)
Número sagrado: 12 e 4
Cores: Verde-escuro, branco
Dia de força: Sábado
Domínios: Doenças crônicas, medicina herbal, cura de ossos, distúrbios mentais, energias parasitárias

━━━ ITAN ━━━

Uma doença nova chegou a uma vila e os médicos não sabiam curá-la. O Babalawo consultou Ifá — saiu Oturupon Meji. A mensagem foi clara: "Esta doença não é apenas física — tem origem espiritual. Há um Ori (cabeça/destino) perturbado e Osanyin precisa ser consultado."

O Babalawo chamou um especialista em Akose (medicina herbal de Ifá). Juntos, prepararam: banho de Ewe Ibeji (gêmeos sagrados) + Ewe Tete + Ewe Efinrin + Osun (pó vermelho sagrado) + Omi Tutu (água fresca).

Após sete dias de tratamento, os doentes melhoraram. A doença recuou porque Oturupon Meji ensina: "Toda cura física exige também cura espiritual. Tratar apenas o corpo é tratar metade do ser humano."

━━━ ESE IFÁ ━━━

"Ewe n'bo, ewe n'lo
Osanyin n'san arun
A difa fun Oturupon
Ti o lo wu arun kuro ninu aye
Ebo ni won ni ko waa se
Oturupon gbebo, Oturupon rubo
Gbogbo arun salo lodo Oturupon"

Tradução:
"As ervas vêm, as ervas vão
Osanyin cura a doença
Consultou Ifá para Oturupon
Que foi remover doenças do mundo
Ebó foi o que lhe disseram para fazer
Oturupon ouviu, Oturupon fez o Ebó
Todas as doenças fugiram de Oturupon"

━━━ EBÓ (AKOSE) ━━━

Materiais: Ewe Tete (Amaranto), Ewe Efinrin (Alfavaca Sagrada), Ewe Ibeji (Folhas de São João), Osun (Pó Vermelho Sagrado), Omi Tutu (Água Fresca), Efun (Pó Branco), Ori (Manteiga de Karité), Obi Abata (4 peças).
Preparo: Macerar as ervas em Omi Tutu fria por 24h. Adicionar Efun + Ori + Osun. Banhar a pessoa doente por 4 dias consecutivos, começando de sábado. Rezar sobre o banho: "Osanyin wa wo emi mi. Arun gbogbo, jade. Ara mi di tutu, ara mi di rere." (Osanyin, vem examinar meu ser. Toda doença, sai. Meu corpo torna-se fresco, meu corpo torna-se bom.)

━━━ EWO ━━━

• PROIBIDO desperdiçar comida — corpo saudável exige respeito ao alimento
• PROIBIDO tomar medicamentos sem avaliar a origem da doença (física ou espiritual)
• PROIBIDO maltratar plantas sagradas — são os filhos de Osanyin
• PROIBIDO ser descuidado com a higiene corporal e espiritual
• RECOMENDADO: cultivar ervas sagradas em casa, fazer Bori regularmente, consultar Ifá para doenças persistentes`
    },

    {
        id: 'otura-meji',
        section: 'meji',
        title: 'Otura Meji — A Bênção do Amor Divino',
        subtitle: 'O Odù das Relações, da Prosperidade e de Oshun',
        content: `OTURA MEJI — BABA OTURA NIRAN

"Otura Meji, omo Oshun
Ife re po bi omi odo
Ore re to bi ile orun"

Tradução:
"Otura Meji, filho de Oshun
Seu amor é abundante como o rio
Sua gentileza é como a casa do céu"

━━━ IDENTIDADE E NATUREZA ━━━

Otura Meji é o décimo terceiro Odù Meji. Governa relacionamentos amorosos, casamento, diplomacia, prosperidade financeira e o poder da gentileza. É o Odù de Oshun no aspecto de guardiã do amor e da riqueza.

Orixás Regentes: Oshun (primária), Obatala (paz), Orunmila
Número sagrado: 5 e 15
Cores: Amarelo, dourado, âmbar
Dia de força: Sexta-feira
Domínios: Amor, casamento, fertilidade, dinheiro, diplomacia, beleza, artes

━━━ ITAN ━━━

Um homem rico mas solitário consultou Ifá. Saiu Otura Meji. O Babalawo disse: "Você tem riqueza mas não tem amor — e sem amor, a riqueza é vazia. Oshun está apontando para você a pessoa certa, mas você está com os olhos fechados por teimosia. Faça o Ebó de Otura e abra o coração."

Ebó: mel + água de rio + flores amarelas + 5 moedas douradas + espelho pequeno, tudo oferecido ao rio.

O homem fez o Ebó. Dentro de três meses conheceu uma mulher que amaria profundamente. Casaram-se. Sua riqueza dobrou — não porque casou com alguém rica, mas porque a harmonia interior (Ire Ife) atraiu mais prosperidade.

Ensinamento de Otura: O amor e o dinheiro não são opostos. Coração aberto atrai ambos.

━━━ ESE IFÁ ━━━

"Oshun ya odo re
Omi re dun bi oyin
A difa fun Otura
Ti yoo ri ife ati owo
Ebo ni won ni ko waa se
Otura gbebo, Otura rubo
Ife ati owo wa pade Otura"

Tradução:
"Oshun escava seu rio
Sua água é doce como mel
Consultou Ifá para Otura
Que encontraria amor e dinheiro
Ebó foi o que lhe disseram para fazer
Otura ouviu, Otura fez o Ebó
Amor e dinheiro encontraram Otura"

━━━ EBÓ ━━━

Materiais: Oyin (Mel Natural), Omi Oshun (Água de Rio), Ododo Osun (Flores Amarelas), Owo Kogba (5 Moedas Douradas), Eyin Adiye Funfun (Ovo de Galinha Branca), Asọ Ofeefee (Pano Amarelo).
Preparo: Na sexta-feira ao entardecer, à beira de um rio. Deitar os materiais na água enquanto se faz pedido específico ao coração: amor, casamento, prosperidade. Rezar: "Oshun Yeyé, gbami lowo ibanuje. Fun mi ni ife otito ati owo rere." (Oshun, Doce Mãe, salva-me do desgosto. Dá-me amor verdadeiro e boa prosperidade.)

━━━ EWO ━━━

• PROIBIDO ser avaro — Oshun não bênção quem guarda tudo
• PROIBIDO negligenciar a aparência pessoal — Otura governa beleza e cuidado
• PROIBIDO relações desonestas ou traição — Oshun pune o infiel severamente
• PROIBIDO falar palavras duras em momentos de conflito amoroso
• RECOMENDADO: cultuar Oshun às sextas-feiras, usar dourado e amarelo, tratar-se com mel`
    },

    {
        id: 'irete-meji',
        section: 'meji',
        title: 'Irete Meji — A Longevidade Suprema',
        subtitle: 'O Odù dos Anciãos, da Sabedoria Acumulada e da Vida Longa',
        content: `IRETE MEJI — BABA IRETE PONRI

"Irete Meji, agba ile orun
O n'gbo ojo meta, o n'gbo odun meta
Ogbon re po bi omi osa"

Tradução:
"Irete Meji, os mais velhos do céu
Que viveu três dias, que viveu três anos
Sua sabedoria é como as águas do oceano"

━━━ IDENTIDADE E NATUREZA ━━━

Irete Meji é o décimo quarto Odù Meji. Governa a longevidade, o envelhecimento com sabedoria, a acumulação de experiências, a velhice digna e o respeito aos anciãos. É o Odù dos Ori Agba (ancestrais vivos idosos).

Orixás Regentes: Obatala (longevidade), Orunmila (sabedoria), Nana Buruku (velhice sagrada)
Número sagrado: 7 e 14
Cores: Branco, azul-claro, cinza-prata
Dia de força: Domingo
Domínios: Longevidade, velhice, sabedoria acumulada, paciência, respeito, tradição

━━━ ITAN ━━━

Havia um ancião que se envergonhava de sua velhice, cobrindo a barba branca e fingindo ser jovem. Consultou Ifá — saiu Irete Meji. O Babalawo disse: "A barba branca que você esconde é sua coroa. Cada ruga em sua face é um verso de Ifá que você viveu. A velhice não é fraqueza — é a acumulação do que Orudumare te deu."

O ancião entendeu. Passou a exibir sua barba branca com orgulho. Jovens passaram a buscá-lo para conselho. Tornou-se o sábio mais consultado da região. Morreu aos 94 anos com dois livros de memórias escritos — seu legado para os filhos.

━━━ ESE IFÁ ━━━

"Ojo meta, odun meta
Agbado n'dagba, enia n'dagba
A difa fun Irete
Ti yoo gbe aye gigun
Ebo ni won ni ko waa se
Irete gbebo, Irete rubo
Irete gbe aye ogbon odun"

Tradução:
"Três dias, três anos
O milho cresce, o ser humano cresce
Consultou Ifá para Irete
Que viveria uma vida longa
Ebó foi o que lhe disseram para fazer
Irete ouviu, Irete fez o Ebó
Irete viveu trinta anos a mais"

━━━ EBÓ ━━━

Materiais: Igbin (Caramujos Brancos — 14 peças), Efun, Ori (Manteiga de Karité), Ewe Ogbo (Erva da Longevidade), Omi Tutu, Asọ Funfun, Obì Abata (7 peças).
Preparo: No domingo ao amanhecer, preparar banho de Ewe Ogbo + Omi Tutu + Efun. Após banho, untar a cabeça com Ori enquanto reza: "Ori mi, ki o gbe mi laaye. Ki aiku ati aisan ko ba mi. Irete gbe mi fun ojo girin." (Minha cabeça, que me mantenha vivo. Que a morte prematura e a doença não me alcancem. Irete me sustenta por muitos dias.)

━━━ EWO ━━━

• PROIBIDO desrespeitar anciãos — Irete governa os mais velhos
• PROIBIDO agir com impaciência — Irete ensina que a bênção tem seu tempo certo
• PROIBIDO apressar processos naturais
• PROIBIDO negligenciar a própria saúde — longevidade exige autocuidado
• RECOMENDADO: honrar pais e avós, cultivar paciência, documentar a própria história`
    },

    {
        id: 'ose-meji',
        section: 'meji',
        title: 'Ose Meji — A Fertilidade Abundante',
        subtitle: 'O Odù da Criatividade, da Multiplicação e dos Milagres',
        content: `OSE MEJI — BABA OSE OTURA

"Ose Meji, omo ati ere
Owo ni i poju, omo ni i poju
Gbogbo ire wa ba Ose"

Tradução:
"Ose Meji, filhos e prosperidade
Dinheiro que transborda, filhos que transbordam
Toda bênção encontra Ose"

━━━ IDENTIDADE E NATUREZA ━━━

Ose Meji é o décimo quinto Odù Meji. Governa fertilidade em todos os sentidos: filhos, projetos, criatividade, prosperidade multiplicada, milagres inesperados. É o Odù de Oshun no aspecto de fecundidade máxima.

Orixás Regentes: Oshun (abundância), Ibeji (gêmeos — fertilidade duplicada), Orunmila
Número sagrado: 5 e 10
Cores: Amarelo intenso, verde-limão, dourado
Dia de força: Sábado
Domínios: Fertilidade, filhos, criatividade, multiplicação financeira, milagres

━━━ ITAN ━━━

Uma família estava há anos tentando ter filhos. Consultaram Ifá três vezes — sempre saía Ose Meji. O Babalawo disse: "Ose não mente. Há filhos prontos para nascer nesta família. O bloqueio é um Ewo descumprido: alguém na família proibiu sua filha de comer certos alimentos durante a gravidez por ignorância, e o Ibeji (espírito dos gêmeos) se ofendeu."

Com permissão ritual, a avó da mulher confessou o tabu violado. Fizeram Ebó conjunto para os Ibeji. Em um ano, a mulher teve gêmeos — menino e menina.

"Quando Ose Meji se pronuncia, a fertilidade está próxima. Mas ela exige que os portões espirituais sejam abertos."

━━━ ESE IFÁ ━━━

"Omo po bi eegun igbo
Owo po bi omi odo
A difa fun Ose
Ti yoo bi omo ati ri owo
Ebo ni won ni ko waa se
Ose gbebo, Ose rubo
Omo ati owo kun ile Ose"

Tradução:
"Filhos numerosos como espinhos da floresta
Dinheiro numeroso como água do rio
Consultou Ifá para Ose
Que teria filhos e encontraria dinheiro
Ebó foi o que lhe disseram para fazer
Ose ouviu, Ose fez o Ebó
Filhos e dinheiro encheram a casa de Ose"

━━━ EBÓ ━━━

Materiais: Ibeji (2 estatuetas dos Gêmeos Sagrados), Oyin (Mel), Omi Oshun (Água de Rio), Ajẹ Funfun (Inhame Branco — 2 peças), Obi Funfun (Cola Branca — 10 peças), Asọ Ofeefee (Pano Amarelo).
Preparo: Preparar as 2 estatuetas Ibeji, untar com mel e colocar em pano amarelo. Oferecer 2 inhames brancos + 10 kolas brancas + Omi Oshun. Rezar: "Ibeji mi, e gba mi. Omo ni mo fe, ire ni mo fe. Ose gbe mi lati wa ire gbogbo." (Meus Ibeji, recebam-me. Filhos quero, bênçãos quero. Ose me sustente para encontrar todas as bênçãos.)

━━━ EWO ━━━

• PROIBIDO rejeitar crianças ou demonstrar antipatia por bebês
• PROIBIDO comer os últimos restos de comida sem deixar algo (privação gera privação)
• PROIBIDO ser mesquinho com presentes para crianças
• PROIBIDO negligenciar o culto aos Ibeji se já houver gêmeos na família
• RECOMENDADO: cultuar Oshun e Ibeji, fazer doações regulares, celebrar cada vitória`
    },

    {
        id: 'ofun-meji',
        section: 'meji',
        title: 'Ofun Meji — O Grande Mistério Final',
        subtitle: 'O Décimo Sexto Odù: Morte, Renascimento e a Grande Transformação',
        content: `OFUN MEJI — BABA OFUN MEJI TOBI

"Ofun Meji, awo ikilo
O ni iku, o ni aisan
Sugbon o si tun ni isoji ati iye"

Tradução:
"Ofun Meji, os segredos do aviso
Tem a morte, tem a doença
Mas também tem o renascimento e a vida"

━━━ IDENTIDADE E NATUREZA ━━━

Ofun Meji é o décimo sexto e último dos Odù Meji principais. É o Odù das transformações mais profundas, da morte e do renascimento espiritual, das doenças graves que precedem curas milagrosas. Governa o fim de um ciclo e o início de outro totalmente novo.

Orixás Regentes: Oya (transformação/morte), Obatala (renascimento), Egungun (ancestrais que guiam a transição)
Número sagrado: 16
Cores: Branco e preto (alternados — os dois extremos da vida)
Dia de força: Segunda-feira
Domínios: Transformação radical, doença grave, morte espiritual/cura, fins de ciclos, recomeços absolutos

━━━ ITAN ━━━

Um Babalawo de nome Awise havia acumulado muita sabedoria mas também muita arrogância. Certo dia, Ifá o advertiu através de Ofun Meji: "Sua arrogância está construindo um abismo entre você e Orunmila. Uma doença vai chegar — não para matar, mas para transformar."

O Babalawo, com arrogância, disse: "Eu sou Babalawo. Doenças não me alcançam."

Em seis meses, adoeceu gravemente. Ficou acamado por um ano. Neste ano de imobilidade, revisou toda sua vida, cada cliente que atendeu com descuido, cada verso que recitou sem cuidado. Quando curou, emergiu um Babalawo completamente diferente — humilde, preciso, compassivo. Os clientes diziam: "Ele morreu e nasceu de novo."

Ofun Meji não destrói para destruir. Ele destrói para reconstruir melhor.

━━━ ESE IFÁ ━━━

"Ojo iku ti ko si lola
Ojo isoji ti o mbo siwaju
A difa fun Ofun
Ti yoo ku ati tun wa laaye
Ebo ni won ni ko waa se
Ofun gbebo, Ofun rubo
Ofun ku, Ofun ji, Ofun tun bẹrẹ"

Tradução:
"O dia da morte que não anunciou
O dia do renascimento que vem à frente
Consultou Ifá para Ofun
Que morreria e renasceria
Ebó foi o que lhe disseram para fazer
Ofun ouviu, Ofun fez o Ebó
Ofun morreu, Ofun acordou, Ofun recomeçou"

━━━ EBÓ ━━━

Materiais: Asọ Funfun ati Dudu (Pano branco e preto), Efun, Eedu (Carvão Sagrado), Ori (Manteiga de Karité), 16 Obi Abata, Omi Tutu, Oti para Oya e Egungun.
Preparo: Às segundas-feiras ao entardecer, colocar o pano branco e preto lado a lado. Sobre o branco: Efun + Ori + 8 Obi. Sobre o preto: Eedu + Oti + 8 Obi. Rezar: "Oya mi, gba mi kuro ninu ohun ti o ku ninu mi. Jeki ohun elemi ninu mi ye. Ofun gbe mi si igbehin tuntun." (Oya minha, remove de mim o que está morto em mim. Que o que é vida em mim viva. Ofun leva-me ao novo destino.)

━━━ EWO ━━━

• PROIBIDO resistir às transformações radicais que chegam — Ofun é o fim necessário
• PROIBIDO temer a morte espiritual — ela precede sempre o renascimento
• PROIBIDO descuidar da saúde física e mental quando todo o corpo pede atenção
• PROIBIDO usar objetos quebrados ou deteriorados por muito tempo — símbolo de ciclo não encerrado
• RECOMENDADO: encerrar ciclos com consciência, fazer Bori regularmente, cultuar Oya e Egungun`
    },

    // ════════════════════════════════════════════════════════════════
    // APÊNDICES
    // ════════════════════════════════════════════════════════════════

    {
        id: 'glossario',
        section: 'appendix',
        title: 'Apêndice I — Glossário Yorùbá-Português',
        subtitle: 'Termos essenciais do Corpus de Ifá',
        content: `GLOSSÁRIO SAGRADO DE IFÁ
Termos Yorùbá e seus significados no contexto litúrgico de Ifá

━━━ A ━━━

ADIYE — Galinha. Adiye Pupa = galinha vermelha (para Shango/Ogun). Adiye Funfun = galinha branca (para Obatala/Orunmila).

AGBO — Carneiro. Sagrado para Shango. Usado em Ebós de realeza e poder.

AKOSE — Medicina herbal tradicional de Ifá. Preparada por Babalawo-Onisẹgun.

ASE / AXÉ — Força vital divina que permeia toda a criação. "Poder que faz as coisas acontecerem."

ASO — Pano/tecido. Asọ Funfun = pano branco. Asọ Pupa = pano vermelho. Asọ Dudu = pano preto.

ATARE — Pimenta da Costa (Afromomum melegueta). Uma das quatro oferendas fundamentais de Ifá.

AWO — Segredo/mistério. Também título de sacerdote iniciado.

AYANMO — Destino escolhido antes do nascimento.

━━━ B ━━━

BABALAWO — "Pai que possui os segredos." Sacerdote de Orunmila/Ifá.

BORI — Ritual de axé na cabeça (Ori). Fortalece o Ori/destino pessoal.

━━━ E ━━━

EBO / EBÓ — Oferenda/sacrifício prescrito por Ifá para transformar o destino.

EFUN — Pó branco sagrado feito de casca de caramujo (Igbin) pulverizada. Sagrado para Obatala.

EJE — Sangue. Fundamental em Ebós de Irosun, Ogunda e outros Odù martiais.

EMI — Espírito/Sopro de vida. Parte do ser humano dada por Olodumare.

EPO PUPA — Azeite de dendê (óleo de palma vermelho). Oferenda essencial para Eshu, Ogun, Shango.

ESU / ELEGBA / ELEGBARA — Orixá mensageiro, guardião de caminhos e encruzilhadas. DEVE ser reverenciado primeiro em qualquer ritual.

EWE — Folha/erva sagrada. Cada Orixá possui suas folhas específicas.

EWO — Interdição/tabu. O que é proibido para determinado Odù.

━━━ I ━━━

IBEJI — Os Gêmeos Sagrados. Orixás da multiplicação e das crianças.

IFA — 1) O sistema de adivinhação. 2) Outro nome de Orunmila. 3) O conjunto de 256 Odù.

IKU — A Morte (personificada como força espiritual). Filha de Olodumare.

IRAWO — Estrela/destino astral. Cada pessoa nasce sob um Irawo (Orunmila conhece todos).

IRE — Bênção, prosperidade, favor espiritual. Oposto de Osogbo.

IROSUN / OSUN — Pó vermelho sagrado feito de madeira de Pterocarpus osun. Representa o sangue ancestral.

ISEFA / ITEFA — Iniciação no culto de Ifá. Isefa = para leigos (3 dias). Itefa = iniciação completa do Babalawo (vários anos).

ITAN — História sagrada/mito do Corpus de Ifá.

IYEROSUN — Pó amarelo-alaranjado da madeira Baphia nitida. Base da escrita no Opon Ifá.

━━━ K ━━━

KOLA — Ver Obi Abata (Cola Amarga).

━━━ M ━━━

MERINDILOGUN — Sistema de adivinhação dos 16 búzios. Usado por Babalosaim e sacerdotes de Oshun.

MOJUBA — Oração de reverência/saudação. Indispensável antes de qualquer trabalho ritual.

━━━ O ━━━

OBI ABATA — Noz de cola amarga (Cola acuminata). Uma das quatro oferendas fundamentais de Ifá. Usada para consulta e como oferenda.

OBI OMI TUTO — Kola branca hidratada. Usada em oferendas de paz e Obatala.

ODÙ — Os 256 capítulos do Corpus de Ifá. Combinação binária de marcas abertas e fechadas.

OLODUMARE — O Ser Supremo, Deus Absoluto segundo a tradição Yorùbá.

OMINISEGUM (OMI TUTU) — Água fresca/natural. A mais básica das oferendas em Ifá.

OPELE — Corrente divinatória com 8 sementes de Schrebera arborea. Ferramenta do Babalawo.

IKIN — Sementes de palma (Elaeis guineensis). A ferramenta mais sagrada de Orunmila.

OPON IFA — O tabuleiro sagrado circular onde o Iyerosun é espalhado e os Odù são traçados.

ORI — "Cabeça." O Orixá pessoal interior de cada ser humano. O mais importante Orixá individual.

OROGBO — Noz amarga seca (Garcinia kola). Uma das quatro oferendas fundamentais de Ifá.

ORIXÁ / ORISÀ — Divindades do panteão Yorùbá. Agentes de Olodumare no universo.

ORUN — O céu, o mundo espiritual, domínio dos Orixás e ancestrais.

ORUNMILA — O Orixá da Sabedoria e da Divinação. Dono do Corpus de Ifá.

OSOGBO — Adversidade, infortúnio, Osogbo espiritual. Oposto de Irê.

OTI — Cachaça de cana-de-açúcar. Oferenda para Esu, Ogun e ancestrais masculinos.

OYIN — Mel. Oferenda para Oshun e Otura Meji.

━━━ R ━━━

RIRU / RUBO — Realizar o Ebó.

━━━ T ━━━

TETE — Amaranto (Amaranthus spp.). Ewe frequente em banhos de Oyeku Meji e Ogunna Meji.

━━━ Y ━━━

YEMOJA — Orixá das águas doces, mãe de muitos Orixás. Governa rios, maternidade e proteção.`
    },

    {
        id: 'filosofia',
        section: 'appendix',
        title: 'Apêndice II — A Filosofia de Ifá: Iwapele e Iwa Rere',
        subtitle: 'Os princípios éticos e filosóficos do Corpus de Ifá',
        content: `A FILOSOFIA ÉTICA DE IFÁ

Ifá não é apenas um sistema de adivinhação — é uma filosofia de vida completa e coerente. Seus pilares éticos são expressos nos conceitos de Iwapele (caráter suave/gentil) e Iwa Rere (caráter bom/virtuoso).

━━━ IWAPELE — O CARÁTER SUAVE ━━━

Segundo Wande Abimbola: "O conceito mais importante em toda a filosofia de Ifá é Iwapele — o caráter suave, sereno, equilibrado. Orunmila ensina que sem Iwapele, nenhuma bênção permanece."

Iwapele inclui:
• Paciência (Suru) — A virtude número 1 em Ifá
• Honestidade (Otito) — Falar a verdade sempre
• Respeito pelos mais velhos (Biba Agba woniyi)
• Humildade (Irele) — Nunca se achar superior aos outros
• Gratidão (Ope) — Agradecer a Olodumare e aos Orixás diariamente

A ausência de Iwapele desfaz todos os efeitos dos Ebós. "Um homem pode fazer 1000 Ebós, mas sem Iwapele, Orunmila não pode protegê-lo."

━━━ IWA RERE — O BOM CARÁTER ━━━

Iwa Rere é a expressão prática de Iwapele — como a pessoa age no mundo. Inclui:

1. OTITO (Verdade) — Dizer a verdade mesmo quando custa algo
2. SU-SU (Generosidade) — Compartilhar sempre, especialmente com os menos afortunados
3. OPE (Gratidão) — Que é o combustível das bênçãos contínuas
4. ANA (Paciência) — Que permite que o destino se manifeste sem ser forçado
5. IFARADA (Tolerância) — Que preserva as relações e o axé coletivo

━━━ OS 16 PRINCÍPIOS FILOSÓFICOS DE IFÁ ━━━

Cada Odù Meji carrega um princípio filosófico central:

1. EJI OGBE — "A verdade é a arma mais poderosa."
2. OYEKU MEJI — "Honre os que vieram antes de você."
3. IWORI MEJI — "Conheça a si mesmo antes de conhecer o mundo."
4. ODI MEJI — "Alguns segredos protegem; outros destroem. Saiba a diferença."
5. IROSUN MEJI — "O sangue que flui une os vivos e os mortos."
6. OWONRIN MEJI — "Toda destruição carrega as sementes de uma nova criação."
7. OBARA MEJI — "Porte-se como rei, independente do que a vida apresente."
8. OKANRAN MEJI — "A injustiça sempre se revela — seja paciente."
9. OGUNDA MEJI — "O trabalho honesto abre todos os caminhos."
10. OSA MEJI — "A tempestade que você teme é o vento que limpa sua vida."
11. IKA MEJI — "O conhecimento transmitido é o único que cresce."
12. OTURUPON MEJI — "Curar o espírito é curar o corpo."
13. OTURA MEJI — "O amor é a primeira e a última riqueza."
14. IRETE MEJI — "A velhice sábia é o mais alto nível da iniciação."
15. OSE MEJI — "A generosidade atrai a multiplicação."
16. OFUN MEJI — "Todo fim é o início de algo maior."

━━━ O PAPEL DO EBÓ NA FILOSOFIA DE IFÁ ━━━

Ebó não é superstição ou "mágica" — é um ato filosófico profundo: é a afirmação prática de que o ser humano tem agência em seu destino. Quando alguém faz um Ebó:

1. Reconhece que há forças maiores do que ele mesmo (humildade)
2. Age concretamente para mudar sua situação (determinação)
3. Conecta-se com os Orixás e os ancestrais (comunidade espiritual)
4. Demonstra sua intenção ao universo através da ação física (comprometimento)

Por isso Orunmila diz: "Quem ouve e faz o Ebó, Ifá abençoa. Quem ouve e não faz, Ifá lamenta."

━━━ IFÁ E A MODERNIDADE ━━━

O Corpus de Ifá não é incompatível com a vida moderna. Seus ensinamentos sobre:
• Saúde mental (Iwapele como equilíbrio emocional)
• Medicina preventiva (Akose e Ewo como higiene e nutrição)
• Comunidade e pertencimento (Egbé e culto aos ancestrais)
• Propósito de vida (Ayanmo como vocação)
• Resiliência (Ebó como ação transformadora)

...são profundamente relevantes para os desafios do século XXI.

Como disse o Babalawo Wande Abimbola: "Ifá é the most sophisticated philosophical and spiritual tradition to emerge from Africa. It is a system of thought that has much to offer the modern world."

━━━━━━━━━━━━━━━━━━

IBORU, IBOYA, IBOSHISHE.
Que Orunmila nos guie.
Ase o.`
    },

];
