export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  image?: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
}

const MEJI_DATA: Record<string, { name: string; meaning: string; orishas: string[]; general: string; binary: string }> = {
  'Ejiogbe': {
    name: 'Ejiogbe (Ogbe Meji)',
    meaning: 'O princípio da luz, expansão, alinhamento perfeito e vitória. Representa o despertar, o início de ciclos e a bênção pura.',
    orishas: ['Obatala', 'Ori', 'Eshu'],
    general: 'Caminho aberto, vitória sobre inimigos, necessidade de manter a ética.',
    binary: 'IIII | IIII'
  },
  'Oyeku Meji': {
    name: 'Oyeku Meji',
    meaning: 'O fim de ciclos, a sabedoria ancestral, o feminino, a noite. Representa proteção contra a morte prematura.',
    orishas: ['Egun', 'Oya', 'Xangô'],
    general: 'Necessidade de cultuar ancestrais. Fim de um sofrimento.',
    binary: '0000 | 0000'
  },
  'Iwori Meji': {
    name: 'Iwori Meji',
    meaning: 'Transformação, análise, o chacal que observa. Representa a lógica e a visão espiritual.',
    orishas: ['Ifá', 'Eshu'],
    general: 'Pense antes de agir. Mudanças estão por vir.',
    binary: '0110 | 0110'
  },
  'Odi Meji': {
    name: 'Odi Meji',
    meaning: 'Bloqueio, proteção, renascimento, o feminino reprodutivo.',
    orishas: ['Yemanjá', 'Ogum'],
    general: 'Você está protegido, mas pode se sentir estagnado.',
    binary: '1001 | 1001'
  },
  'Irosun Meji': {
    name: 'Irosun Meji',
    meaning: 'Memória, sangue, profundidade emocional.',
    orishas: ['Xangô', 'Egun', 'Oxum'],
    general: 'Não confie em todos. Guarde seus segredos.',
    binary: '1100 | 1100'
  },
  'Owonrin Meji': {
    name: 'Owonrin Meji',
    meaning: 'Inversão, karma, consequências de ações passadas, magia.',
    orishas: ['Eshu', 'Egun'],
    general: 'O que vai, volta. Cuidado com acidentes.',
    binary: '0011 | 0011'
  },
  'Obara Meji': {
    name: 'Obara Meji',
    meaning: 'Prosperidade repentina, ego, comércio, comunicação.',
    orishas: ['Xangô', 'Oxum', 'Aje'],
    general: 'Mudança de sorte para melhor. Cuidado com a arrogância.',
    binary: '1000 | 1000'
  },
  'Okanran Meji': {
    name: 'Okanran Meji',
    meaning: 'Justiça, problemas legais, disputas, novos caminhos difíceis.',
    orishas: ['Xangô', 'Eshu'],
    general: 'Problemas com a lei ou autoridade. Diga a verdade.',
    binary: '0001 | 0001'
  },
  'Ogunda Meji': {
    name: 'Ogunda Meji',
    meaning: 'Trabalho, ferro, guerra, cirurgia, remoção de obstáculos.',
    orishas: ['Ogum'],
    general: 'Lute pelo que quer. Vitória através do esforço.',
    binary: '1110 | 1110'
  },
  'Osa Meji': {
    name: 'Osa Meji',
    meaning: 'Vento, mudança, feitiçaria, o poder feminino perigoso.',
    orishas: ['Oyá', 'Iyami Aje'],
    general: 'Mudanças incontroláveis. Respeite as mulheres.',
    binary: '0111 | 0111'
  },
  'Ika Meji': {
    name: 'Ika Meji',
    meaning: 'Controle, retração, a cobra, feitiço, maldade.',
    orishas: ['Osoosi', 'Eshu'],
    general: 'Cuidado com quem te cerca. Recolha-se.',
    binary: '0100 | 0100'
  },
  'Oturupon Meji': {
    name: 'Oturupon Meji',
    meaning: 'Resistência, doença, teimosia, a terra.',
    orishas: ['Babalu Aye', 'Ile'],
    general: 'Seja resiliente. Cuide da saúde.',
    binary: '0010 | 0010'
  },
  'Otura Meji': {
    name: 'Otura Meji',
    meaning: 'Liberdade, paz mental, inteligência, diplomacia.',
    orishas: ['Obatala', 'Ifá'],
    general: 'Use a mente, não a força. Busque a paz.',
    binary: '1011 | 1011'
  },
  'Irete Meji': {
    name: 'Irete Meji',
    meaning: 'Pressão, iniciação, terra, humilhação que leva à exaltação.',
    orishas: ['Babalu Aye', 'Ogum'],
    general: 'Você será testado. Mantenha a fé.',
    binary: '1101 | 1101'
  },
  'Ose Meji': {
    name: 'Ose Meji',
    meaning: 'Vitória, amor, dinheiro, beleza, conquista.',
    orishas: ['Oxum', 'Aje'],
    general: 'Vitória sobre adversários. Alegria.',
    binary: '1010 | 1010'
  },
  'Ofun Meji': {
    name: 'Ofun Meji',
    meaning: 'O grande mistério, milagre, generosidade, o branco total.',
    orishas: ['Obatala', 'Oduduwa'],
    general: 'Um milagre vai acontecer. Dê para receber.',
    binary: '0101 | 0101'
  }
};

function mejiTable(): string {
  const rows = Object.values(MEJI_DATA).map(m => {
    return `<tr>
      <td style="font-weight:600;color:#C49E30">${m.name}</td>
      <td style="font-family:monospace">${m.binary}</td>
      <td>${m.orishas.join(', ')}</td>
      <td>${m.meaning.substring(0, 90)}...</td>
      <td>${m.general}</td>
    </tr>`;
  }).join('\n');
  return `<table>
    <thead><tr>
      <th>Odu</th><th>Binário</th><th>Orixás</th><th>Significado</th><th>Interpretação</th>
    </tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}

function articleFooter(): string {
  return `<hr style="border-color:rgba(196,158,48,0.15);margin:32px 0">
<p><em>Artigo publicado no Ifá Oluwo — Codex Sacerdotal. Plataforma digital para Babalawos e praticantes de Ifá.</em></p>`;
}

export const ARTICLES: Article[] = [
  {
    id: '1',
    slug: '16-odus-meji-significados',
    title: 'Os 16 Odus Meji e Seus Significados — Guia Completo',
    description: 'Conheça os 16 Odus principais (Meji) do sistema de Ifá: seus significados, itans (lendas), orixás regentes e interpretações para a vida.',
    publishedAt: '2025-12-01',
    tags: ['odus', 'meji', 'ifá', 'orixás', 'significados', 'itan'],
    content: `<p>Os <strong>16 Odus Meji</strong> são a base do corpus sagrado de Ifá. Cada Meji representa um princípio fundamental do universo e da existência humana. No sistema de divinação, eles correspondem às 16 combinações possíveis onde a perna direita e a perna esquerda do Opele (ou os dois lados do jogo de Ikin) apresentam o mesmo sinal.</p>
    <p>Conhecer os 16 Meji é essencial para qualquer Babaláwo, estudante de Ifá ou pessoa que busca compreender os fundamentos da tradição Yorubá.</p>
    <h2>Tabela dos 16 Odus Meji</h2>
    ${mejiTable()}
    <h2>Detalhamento de Cada Odu Meji</h2>
    <h3>1. Ejiogbe (Ogbe Meji)</h3>
    <p><strong>Rank:</strong> 1º de 256 | <strong>Binário:</strong> IIII | IIII</p>
    <p><strong>Orixás:</strong> Obatala, Ori, Eshu</p>
    <p><strong>Itan:</strong> Ejiogbe se tornou rei dos Odu por fazer o sacrifício completo de humildade.</p>
    <p><strong>Significado:</strong> Luz, expansão, vitória. Início de ciclos e bênção pura.</p>
    <p><strong>Interpretações:</strong> Geral: caminho aberto. Amor: abençoado. Dinheiro: prosperidade. Saúde: boa, cuidado com estresse.</p>
    <h3>2. Oyeku Meji</h3>
    <p><strong>Rank:</strong> 2º de 256 | <strong>Binário:</strong> 0000 | 0000</p>
    <p><strong>Orixás:</strong> Egun, Oya, Xangô</p>
    <p><strong>Itan:</strong> Oyeku trouxe a noite, o mistério e a honra aos ancestrais.</p>
    <p><strong>Significado:</strong> Fim de ciclos, sabedoria ancestral, proteção contra a morte prematura.</p>
    <p><strong>Interpretações:</strong> Geral: cultuar ancestrais. Amor: cármico. Dinheiro: heranças. Saúde: cuidado com depressão.</p>
    <h3>3. Iwori Meji</h3>
    <p><strong>Rank:</strong> 3º de 256 | <strong>Binário:</strong> 0110 | 0110</p>
    <p><strong>Orixás:</strong> Ifá, Eshu</p>
    <p><strong>Itan:</strong> Iwori viajou entre mar e floresta para ver a verdade.</p>
    <p><strong>Significado:</strong> Transformação, análise, lógica e visão espiritual.</p>
    <p><strong>Interpretações:</strong> Geral: pense antes de agir. Amor: paixão intensa. Dinheiro: oportunidades intelectuais. Saúde: visão ou digestão.</p>
    <h3>4. Odi Meji</h3>
    <p><strong>Rank:</strong> 4º de 256 | <strong>Binário:</strong> 1001 | 1001</p>
    <p><strong>Orixás:</strong> Yemanjá, Ogum</p>
    <p><strong>Itan:</strong> Odi cercou seus inimigos. Fala de proteção e útero materno.</p>
    <p><strong>Significado:</strong> Bloqueio, proteção, renascimento, fertilidade.</p>
    <p><strong>Interpretações:</strong> Geral: protegido mas estagnado. Amor: fertilidade alta. Dinheiro: ganhos lentos. Saúde: reprodutiva.</p>
    <h3>5. Irosun Meji</h3>
    <p><strong>Rank:</strong> 5º de 256 | <strong>Binário:</strong> 1100 | 1100</p>
    <p><strong>Orixás:</strong> Xangô, Egun, Oxum</p>
    <p><strong>Itan:</strong> Irosun guardou seus tesouros em um buraco fundo.</p>
    <p><strong>Significado:</strong> Memória, sangue, profundidade emocional.</p>
    <p><strong>Interpretações:</strong> Geral: guarde segredos. Amor: sofrimento. Dinheiro: herança. Saúde: sangue ou olhos.</p>
    <h3>6. Owonrin Meji</h3>
    <p><strong>Rank:</strong> 6º de 256 | <strong>Binário:</strong> 0011 | 0011</p>
    <p><strong>Orixás:</strong> Eshu, Egun</p>
    <p><strong>Itan:</strong> Owonrin inverteu a ordem das coisas. Caos e mudança.</p>
    <p><strong>Significado:</strong> Inversão, karma, consequências, magia.</p>
    <p><strong>Interpretações:</strong> Geral: o que vai volta. Amor: tumultuado. Dinheiro: perdas ou ganhos repentinos. Saúde: acidentes.</p>
    <h3>7. Obara Meji</h3>
    <p><strong>Rank:</strong> 7º de 256 | <strong>Binário:</strong> 1000 | 1000</p>
    <p><strong>Orixás:</strong> Xangô, Oxum, Aje</p>
    <p><strong>Itan:</strong> Obara era pobre e tornou-se rico através de sacrifício.</p>
    <p><strong>Significado:</strong> Prosperidade repentina, ego, comércio.</p>
    <p><strong>Interpretações:</strong> Geral: mudança de sorte. Amor: atração magnética. Dinheiro: riqueza. Saúde: pressão alta.</p>
    <h3>8. Okanran Meji</h3>
    <p><strong>Rank:</strong> 8º de 256 | <strong>Binário:</strong> 0001 | 0001</p>
    <p><strong>Orixás:</strong> Xangô, Eshu</p>
    <p><strong>Itan:</strong> Okanran desafiou a ordem. Justiça e verdade.</p>
    <p><strong>Significado:</strong> Justiça, problemas legais, disputas.</p>
    <p><strong>Interpretações:</strong> Geral: problemas com lei. Amor: brigas. Dinheiro: disputas. Saúde: cardíaco ou dores de cabeça.</p>
    <h3>9. Ogunda Meji</h3>
    <p><strong>Rank:</strong> 9º de 256 | <strong>Binário:</strong> 1110 | 1110</p>
    <p><strong>Orixá:</strong> Ogum</p>
    <p><strong>Itan:</strong> Ogunda dividiu o peixe para satisfazer a todos.</p>
    <p><strong>Significado:</strong> Trabalho, ferro, guerra, cirurgia.</p>
    <p><strong>Interpretações:</strong> Geral: luta e vitória. Amor: disputas. Dinheiro: suor do trabalho. Saúde: cirurgias.</p>
    <h3>10. Osa Meji</h3>
    <p><strong>Rank:</strong> 10º de 256 | <strong>Binário:</strong> 0111 | 0111</p>
    <p><strong>Orixás:</strong> Oyá, Iyami Aje</p>
    <p><strong>Itan:</strong> Osa trouxe o vento e as feiticeiras.</p>
    <p><strong>Significado:</strong> Vento, mudança, feitiçaria, poder feminino.</p>
    <p><strong>Interpretações:</strong> Geral: mudanças incontroláveis. Amor: instabilidade. Dinheiro: voa fácil. Saúde: respiratório.</p>
    <h3>11. Ika Meji</h3>
    <p><strong>Rank:</strong> 11º de 256 | <strong>Binário:</strong> 0100 | 0100</p>
    <p><strong>Orixás:</strong> Osoosi, Eshu</p>
    <p><strong>Itan:</strong> Ika controlou a serpente. Restrição e maldade oculta.</p>
    <p><strong>Significado:</strong> Controle, retração, a cobra.</p>
    <p><strong>Interpretações:</strong> Geral: cuidado com falsidade. Amor: ciúmes. Dinheiro: economize. Saúde: cãibras.</p>
    <h3>12. Oturupon Meji</h3>
    <p><strong>Rank:</strong> 12º de 256 | <strong>Binário:</strong> 0010 | 0010</p>
    <p><strong>Orixás:</strong> Babalu Aye, Ile</p>
    <p><strong>Itan:</strong> Oturupon carrega o fardo do mundo.</p>
    <p><strong>Significado:</strong> Resistência, doença, teimosia.</p>
    <p><strong>Interpretações:</strong> Geral: resiliência. Amor: difícil mas duradouro. Dinheiro: trabalho pesado. Saúde: infecciosas.</p>
    <h3>13. Otura Meji</h3>
    <p><strong>Rank:</strong> 13º de 256 | <strong>Binário:</strong> 1011 | 1011</p>
    <p><strong>Orixás:</strong> Obatala, Ifá</p>
    <p><strong>Itan:</strong> Otura libertou cativos com sabedoria.</p>
    <p><strong>Significado:</strong> Liberdade, paz mental, diplomacia.</p>
    <p><strong>Interpretações:</strong> Geral: use a mente. Amor: intelectual. Dinheiro: comércio ou escrita. Saúde: nervos.</p>
    <h3>14. Irete Meji</h3>
    <p><strong>Rank:</strong> 14º de 256 | <strong>Binário:</strong> 1101 | 1101</p>
    <p><strong>Orixás:</strong> Babalu Aye, Ogum</p>
    <p><strong>Itan:</strong> Irete pisou na terra para marcá-la. Pressão e renascimento.</p>
    <p><strong>Significado:</strong> Pressão, iniciação, humilhação que leva à exaltação.</p>
    <p><strong>Interpretações:</strong> Geral: será testado. Amor: cármico. Dinheiro: perdas antes de ganhos. Saúde: pernas e sangue.</p>
    <h3>15. Ose Meji</h3>
    <p><strong>Rank:</strong> 15º de 256 | <strong>Binário:</strong> 1010 | 1010</p>
    <p><strong>Orixás:</strong> Oxum, Aje</p>
    <p><strong>Itan:</strong> Ose conquistou pelo amor e beleza.</p>
    <p><strong>Significado:</strong> Vitória, amor, dinheiro, fertilidade.</p>
    <p><strong>Interpretações:</strong> Geral: vitória. Amor: grande amor. Dinheiro: prosperidade. Saúde: rins.</p>
    <h3>16. Ofun Meji</h3>
    <p><strong>Rank:</strong> 16º de 256 | <strong>Binário:</strong> 0101 | 0101</p>
    <p><strong>Orixás:</strong> Obatala, Oduduwa</p>
    <p><strong>Itan:</strong> Ofun criou o universo com seu sopro. O grande milagre.</p>
    <p><strong>Significado:</strong> O grande mistério, milagre, generosidade.</p>
    <p><strong>Interpretações:</strong> Geral: milagre. Amor: puro. Dinheiro: riqueza abundante. Saúde: respiratório.</p>
    <h2>Como usar o conhecimento dos 16 Odus Meji</h2>
    <p>Os 16 Odus Meji formam a base de todo o sistema divinatório de Ifá. Consulte <a href="/odu">todos os 256 Odus</a> no Ifá Oluwo.</p>
    ${articleFooter()}`
  },
  {
    id: '2',
    slug: 'o-que-e-ifa-guia-completo',
    title: 'O Que é Ifá? Guia Completo para Iniciantes na Tradição Yorubá',
    description: 'Descubra o que é Ifá, o sistema divinatório e filosófico da tradição Yorubá. Guia completo sobre Orunmila, Odus, Opele, Ikin e como funciona a consulta.',
    publishedAt: '2025-12-05',
    tags: ['ifá', 'iniciante', 'yorubá', 'orunmila', 'guia', 'tradição'],
    content: `<p><strong>Ifá</strong> é um sistema divinatório, filosófico e religioso originário da África Ocidental, entre o povo Yorubá. Mais do que um método de adivinhação, Ifá é um corpus de conhecimento que abrange a criação do universo, a natureza dos Orixás, o destino humano e as leis que regem a existência.</p>
    <h2>O Que Significa Ifá?</h2>
    <p>Ifá significa "sabedoria" ou "conhecimento" na língua Yorubá. É também o nome do Orixá da sabedoria, também conhecido como <strong>Orunmila</strong> (do yorubá: "o céu conhece a salvação"). Orunmila é o testemunho da criação e o portador do destino de cada ser humano.</p>
    <h2>Os Pilares de Ifá</h2>
    <p>O sistema de Ifá se sustenta em três pilares principais:</p>
    <ul>
      <li><strong>Orunmila</strong> — O Orixá da sabedoria e da adivinhação, que presenciou a criação do universo.</li>
      <li><strong>Os Odus</strong> — Os 256 signos ou capítulos sagrados que contêm todo o conhecimento de Ifá.</li>
      <li><strong>Os Babalawos</strong> — Os sacerdotes de Ifá, iniciados e treinados para interpretar os Odus.</li>
    </ul>
    <h2>Como Funciona a Consulta a Ifá?</h2>
    <p>A consulta a Ifá pode ser feita através de dois instrumentos principais: o <strong>Opele (Opelé Ifá)</strong>, uma corrente com oito metades de sementes, e os <strong>Ikin</strong>, 16 caroços sagrados de dendê. Ambos os métodos revelam combinações binárias que correspondem aos 256 Odus.</p>
    <p>O Babaláwo então interpreta o Odu revelado, recitando os itans (lendas) associados e aplicando seus ensinamentos à vida do consulente.</p>
    <h2>Ifá e os Orixás</h2>
    <p>Ifá não é uma religião separada — é o sistema de conhecimento que fundamenta o culto aos Orixás. Cada Odu de Ifá está associado a Orixás específicos, e seus itans revelam a natureza e as histórias dessas divindades.</p>
    <h2>Ifá para Todos</h2>
    <p>Uma das frases mais conhecidas em Ifá é: <em>"Ifá é para todos — não importa sua origem, cor ou crença"</em>. O conhecimento dos Odus é universal e pode ser aplicado por qualquer pessoa que busque orientação e sabedoria.</p>
    ${articleFooter()}`
  },
  {
    id: '3',
    slug: '256-odus-estrutura-significados',
    title: 'Os 256 Odus do Corpus de Ifá — Estrutura e Significados',
    description: 'Conheça a estrutura completa dos 256 Odus do corpus sagrado de Ifá. Entenda como os 16 Odus Meji se combinam para formar todos os signos do sistema divinatório.',
    publishedAt: '2025-12-10',
    tags: ['odus', '256', 'ifá', 'estrutura', 'significados', 'corpus'],
    content: `<p>O corpus sagrado de Ifá é composto por <strong>256 Odus</strong> (ou capítulos), que formam a base de todo o conhecimento do sistema. Cada Odu contém itans (lendas), rezas, ervas, oferendas e orientações para a vida.</p>
    <h2>Como os 256 Odus são Formados</h2>
    <p>Os 256 Odus resultam da combinação dos <strong>16 Odus Meji</strong> (principais) nos lados direito e esquerdo do tabuleiro de Ifá: 16 × 16 = 256. Matematicamente, cada Odu é representado por dois grupos de 4 bits binários (aberto/fechado), totalizando 8 bits (2⁸ = 256).</p>
    <h2>Os 16 Odus Meji (Base)</h2>
    <p>Os 16 Meji são: Ejiogbe, Oyeku, Iwori, Odi, Irosun, Owonrin, Obara, Okanran, Ogunda, Osa, Ika, Oturupon, Otura, Irete, Ose e Ofun. Cada um rege um princípio fundamental do universo.</p>
    <h2>Combinações Possíveis</h2>
    <p>Quando os dois lados apresentam Odus diferentes, o resultado é um Odu composto. Por exemplo, Ogbe do lado direito e Oyeku do lado esquerdo formam o Odu <strong>Ogbe Oyeku</strong>. Cada combinação tem seu próprio nome, significado e interpretação específicos.</p>
    <h2>Ordem dos 256 Odus</h2>
    <p>A ordem tradicional segue o sistema <strong>Ààná</strong> (ou Ààná Ifá), que organiza os Odus em uma sequência específica de aprendizado e recitação. O primeiro Odu é Ejiogbe (Ogbe Meji) e o último é Ofun Meji.</p>
    <h2>Cada Odu Contém</h2>
    <ul>
      <li><strong>Itan</strong> — Lenda ou história sagrada que explica o significado do Odu.</li>
      <li><strong>Orin</strong> — Cantigas e rezas específicas do Odu.</li>
      <li><strong>Ewe</strong> — Ervas e folhas associadas ao Odu para banhos e rituais.</li>
      <li><strong>Ebó</strong> — Oferendas e sacrifícios recomendados.</li>
      <li><strong>Iwòsan</strong> — Medicamentos e preparações espirituais.</li>
    </ul>
    <p>No <a href="/odu">Ifá Oluwo</a>, você pode consultar o significado completo de cada um dos 256 Odus com interpretações para amor, dinheiro e saúde.</p>
    ${articleFooter()}`
  },
  {
    id: '4',
    slug: 'orixas-sistema-ifa',
    title: 'Orixás no Sistema de Ifá: Quem São e Como se Relacionam com os Odus',
    description: 'Conheça os principais Orixás do sistema de Ifá, suas funções, domínios e como cada um se relaciona com os Odus sagrados da tradição Yorubá.',
    publishedAt: '2025-12-15',
    tags: ['orixás', 'ifá', 'yorubá', 'divindades', 'candomblé', 'umbanda'],
    content: `<p>No sistema de Ifá, os <strong>Orixás</strong> são divindades que representam forças da natureza e aspectos da existência humana. Cada Orixá tem uma personalidade, um domínio e uma história, e todos se relacionam com os Odus de maneiras específicas.</p>
    <h2>Orunmila (Ifá)</h2>
    <p>Orunmila é o Orixá da sabedoria e da adivinhação. Ele presenciou a criação do universo e conhece o destino de cada ser humano. É o senhor dos Odus e o patrono dos Babalawos.</p>
    <h2>Exu (Eshu)</h2>
    <p>Exu é o mensageiro, o guardião dos caminhos e o fiscalizador dos rituais. Sem Exu, nada se comunica entre o mundo humano e o divino. Está presente em praticamente todos os Odus.</p>
    <h2>Ogum</h2>
    <p>Ogum é o Orixá do ferro, da guerra, da tecnologia e do trabalho. Regente dos Odus Ogunda Meji e presente em diversos Odus que falam sobre luta, obstáculos e superação.</p>
    <h2>Oxum (Osun)</h2>
    <p>Oxum é a Orixá do amor, da fertilidade, da beleza e da prosperidade. Senhora das águas doces, rege os Odus Ose Meji e Obara Meji, entre outros.</p>
    <h2>Xangô</h2>
    <p>Xangô é o Orixá do trovão, da justiça e do fogo. Rei de Oyó, está presente nos Odus que tratam de justiça, poder e autoridade.</p>
    <h2>Yemanjá</h2>
    <p>Yemanjá é a grande mãe, senhora das águas salgadas. Rege a fertilidade, a maternidade e a proteção familiar. Associada a Odi Meji.</p>
    <h2>Obatala (Orisala)</h2>
    <p>Obatala é o criador dos corpos humanos, senhor do branco e da paz. Pai de quase todos os Orixás, rege Ejiogbe, Otura Meji e Ofun Meji.</p>
    <h2>Oya (Oyá)</h2>
    <p>Oya é a senhora dos ventos, tempestades e do mercado. Guardiã dos cemitérios e guia dos mortos. Associada a Osa Meji.</p>
    <h2>Ossaim (Osanyin)</h2>
    <p>Ossaim é o Orixá das folhas e da medicina sagrada. Conhece o segredo de cada erva e sua aplicação espiritual. Essencial em todos os rituais de cura.</p>
    <h2>Omolu/Obaluaye (Babalu Aye)</h2>
    <p>Omolu é o Orixá da terra, das doenças e da cura. Senhor das epidemias, mas também da recuperação. Associado a Oturupon Meji e Irete Meji.</p>
    <p>Cada Orixá está vinculado a Odus específicos, e conhecer essa relação é fundamental para a prática de Ifá.</p>
    ${articleFooter()}`
  },
  {
    id: '5',
    slug: 'ervas-sagradas-ewe-osanyin',
    title: 'Ervas Sagradas de Ifá: Guia de Uso (Ewe Osanyin)',
    description: 'Guia completo sobre as ervas sagradas de Ifá (Ewe Osanyin). Conheça as principais folhas usadas em rituais, banhos de limpeza e preparações espirituais.',
    publishedAt: '2025-12-20',
    tags: ['ervas', 'folhas', 'ewe', 'osanyin', 'ifá', 'banhos', 'rituais'],
    content: `<p>No sistema de Ifá, as <strong>ervas</strong> (ewe em yorubá) são fundamentais para a prática espiritual. Cada folha tem uma energia específica e está associada a determinados Orixás e Odus. O conhecimento das ervas pertence a <strong>Ossaim (Osanyin)</strong>, o Orixá das folhas e da medicina sagrada.</p>
    <h2>A Importância das Ervas em Ifá</h2>
    <p>As ervas são usadas em banhos de limpeza, defumações, amacis (assentamentos), abô (banhos de ervas) e preparações medicinais. Cada ritual requer ervas específicas, e o Babaláwo deve conhecer suas propriedades espirituais.</p>
    <h2>Ervas Principais e Seus Usos</h2>
    <ul>
      <li><strong>Ewé (Folha da Costa / Boldo):</strong> Limpeza espiritual, descarrego. Associada a Ogum.</li>
      <li><strong>Peregun (Alecrim):</strong> Purificação, proteção, alegria. Associado a Oxum.</li>
      <li><strong>Atò (Manjericão):</strong> Proteção, amor, prosperidade. Uma das ervas mais versáteis.</li>
      <li><strong>Ewé Ireté (Arruda):</strong> Quebra de demanda, proteção pesada. Associada a Exu e Ogum.</li>
      <li><strong>Ewé Odundun (Folha da Fortuna / Saião):</strong> Prosperidade, sorte, dinheiro. Associada a Xangô.</li>
      <li><strong>Ewé Tètè (Caruru / Bredo):</strong> Alimentação ritual, axé. Associada a Obatala.</li>
      <li><strong>Ewé Alukorisa (Levante / Alfavaca):</strong> Limpeza espiritual, banhos de abertura de caminhos.</li>
      <li><strong>Ewé Odan (Guiné):</strong> Proteção contra inimigos, feitiçaria. Associada a Exu.</li>
      <li><strong>Opa (Hortelã):</strong> Refrigério, acalmar, cura espiritual.</li>
    </ul>
    <h2>Cuidados com as Ervas</h2>
    <p>As ervas devem ser colhidas com respeito e autorização espiritual. Nunca se deve colher todas as folhas de um pé — pede-se licença e deixa-se sempre uma oferenda (como mel ou pemba).</p>
    <p>Em Ifá, o ditado diz: <em>"Kò sí ewé, kò sí òrìsà"</em> — sem folhas, não há Orixá.</p>
    ${articleFooter()}`
  },
  {
    id: '6',
    slug: 'opele-ifa-guia-completo',
    title: 'Opele (Opelé Ifá): O Que é, Como Funciona e Seus Significados',
    description: 'Guia completo sobre o Opele Ifá (Opelé), a corrente divinatória de Ifá. Entenda como funciona, os significados dos sinais e a importância deste instrumento sagrado.',
    publishedAt: '2025-12-25',
    tags: ['opele', 'opelé', 'ifá', 'divinação', 'adivinhação', 'babaláwo'],
    content: `<p>O <strong>Opele</strong> (ou Opelé Ifá) é um dos instrumentos divinatórios mais utilizados no sistema de Ifá. É uma corrente composta por oito metades de sementes (ou conchas) presas em uma corrente, que o Babaláwo lança sobre o tabuleiro sagrado (Opon Ifá) para revelar os signos dos Odus.</p>
    <h2>O Que é o Opele?</h2>
    <p>O Opele é formado por uma corrente de metal ou palha da costa com oito elementos divisórios. Cada lado do Opele tem quatro metades que, ao cair, podem ficar viradas para cima (aberto) ou para baixo (fechado).</p>
    <h2>Como Funciona a Jogada do Opele</h2>
    <p>O Babaláwo segura o Opele pelo centro e o lança sobre o Opon Ifá (tabuleiro). As oito metades, ao cair, formam um padrão binário de 8 bits — 4 bits do lado direito e 4 do lado esquerdo. Esse padrão corresponde a um dos 256 Odus.</p>
    <h2>Significados dos Sinais</h2>
    <ul>
      <li><strong>Posição aberta (I):</strong> Ativo, expansivo, positivo.</li>
      <li><strong>Posição fechada (0):</strong> Receptivo, passivo, interior.</li>
    </ul>
    <p>Por exemplo, o Odu Ejiogbe é representado por IIII | IIII (todas as oito posições abertas), simbolizando a luz total.</p>
    <h2>O Opele vs. Ikin</h2>
    <p>O Opele é mais rápido e prático, usado para consultas cotidianas. Os Ikin (16 caroços de dendê) são considerados mais sagrados e são usados em cerimônias formais. Ambos revelam os mesmos Odus.</p>
    <h2>Quem Pode Usar o Opele?</h2>
    <p>Apenas Babalawos iniciados (com a iniciação de Ifá completa) podem manusear o Opele. O instrumento é consagrado e protegido, e seu uso inadequado pode trazer consequências espirituais.</p>
    ${articleFooter()}`
  },
  {
    id: '7',
    slug: 'ikin-16-carocos-dende',
    title: 'Ikin (Ifá): O Segredo dos 16 Caroços de Dendê na Adivinhação',
    description: 'Descubra o significado dos Ikin de Ifá — os 16 caroços sagrados de dendê usados na adivinhação. Entenda o ritual, a sacralidade e a importância deste instrumento.',
    publishedAt: '2026-01-02',
    tags: ['ikin', 'ifá', 'dendê', 'adivinhação', 'ritual', 'sagrado'],
    content: `<p>Os <strong>Ikin</strong> são 16 caroços sagrados de dendê (fruto do dendezeiro, <em>Elaeis guineensis</em>) usados no sistema divinatório de Ifá. Considerados o método mais antigo e reverenciado de comunicação com Orunmila, os Ikin são tratados como objetos sagrados que carregam o axé (força espiritual) de Ifá.</p>
    <h2>A Origem dos Ikin</h2>
    <p>Segundo a tradição, os 16 Ikin representam os 16 Odus Meji que Orunmila trouxe do céu para a Terra. Cada Ikin é associado a um Odu Meji específico, e o conjunto completo simboliza a totalidade do conhecimento de Ifá.</p>
    <h2>O Ritual de Adivinhação com Ikin</h2>
    <p>O processo com Ikin é cerimonial e detalhado:</p>
    <ol>
      <li>O Babaláwo se senta no chão ou banco sagrado, com os Ikin sobre o Opon Ifá.</li>
      <li>Ele reza (mojuba) invocando Orunmila, os ancestrais e as forças espirituais.</li>
      <li>Com a mão direita, ele separa os Ikin em grupos, realizando divisões sucessivas.</li>
      <li>O processo revela marcas na areia ou pó (iyerosun) que formam o padrão binário do Odu.</li>
    </ol>
    <h2>Por Que 16?</h2>
    <p>O número 16 é sagrado em Ifá porque 16 são os Odus Meji, 16 são os Ikin, e 4² = 16 (cada Odu tem dois grupos de 4 bits). A matemática sagrada de Ifá está baseada no número 4 e seus múltiplos.</p>
    <h2>Sacralidade dos Ikin</h2>
    <p>Os Ikin jamais devem tocar o chão. Após o uso, são guardados em um recipiente especial (Kòmo) com pó de iyerosun. Apenas Babalawos iniciados podem tocar os Ikin, e seu manuseio envolve rituais específicos de purificação.</p>
    ${articleFooter()}`
  },
  {
    id: '8',
    slug: 'obi-adivinhacao-coco-yoruba',
    title: 'Obi (Ebô Obi): Adivinhação com Coco na Tradição Yorubá',
    description: 'Conheça o Obi, o sistema de adivinhação com coco na tradição Yorubá. Aprenda sobre os significados das posições, os rituais e a importância do Obi na comunicação com os Orixás.',
    publishedAt: '2026-01-08',
    tags: ['obi', 'coco', 'adivinhação', 'yorubá', 'orixás', 'ritual'],
    content: `<p>O <strong>Obi</strong> (também chamado Ebô Obi) é um sistema de adivinhação praticado na tradição Yorubá que utiliza quatro pedaços de coco para obter respostas dos Orixás. É um dos métodos mais acessíveis e amplamente praticados no Candomblé e em cultos de origem Yorubá.</p>
    <h2>O Que é o Obi?</h2>
    <p>O Obi consiste em quatro pedaços (gomos) de coco seco. Cada pedaço tem um lado côncavo (fechado) e um lado convexo com a casca (aberto). Os quatro pedaços são lançados, e a combinação de abertos e fechados revela a resposta do Orixá.</p>
    <h2>As 5 Combinações Possíveis do Obi</h2>
    <ul>
      <li><strong>Alafia (4 abertos):</strong> Sim absoluto. Tudo está bem.</li>
      <li><strong>Ejife (2 abertos, 2 fechados):</strong> Sim equilibrado. Tudo certo, mas com ressalvas.</li>
      <li><strong>Etawa (3 abertos, 1 fechado):</strong> Sim parcial. Precisa de cuidado ou confirmação.</li>
      <li><strong>Etaworo (1 aberto, 3 fechados):</strong> Sim condicional. Será aceito se houver mais oferenda.</li>
      <li><strong>Oyeku (4 fechados):</strong> Não absoluto. Resposta negativa do Orixá.</li>
    </ul>
    <h2>Como se Consulta o Obi</h2>
    <p>A consulta é simples: após orações e invocação do Orixá, o consulente (ou o pai-de-santo) lança os quatro pedaços de coco no chão. A interpretação depende da combinação e do Orixá consultado.</p>
    <h2>Diferenças entre Obi e Ifá</h2>
    <p>Enquanto Ifá revela Odus com interpretações complexas e itans, o Obi dá respostas diretas de sim/não ou sim condicional. No entanto, ambos derivam do mesmo sistema de conhecimento Yorubá.</p>
    ${articleFooter()}`
  },
  {
    id: '9',
    slug: 'ebo-tipos-rituais-ifa',
    title: 'Rituais de Ebó em Ifá: Tipos, Significados e Como São Feitos',
    description: 'Guia completo sobre os rituais de Ebó (oferendas) em Ifá. Conheça os tipos de ebó, seus significados espirituais e a importância do sacrifício na tradição Yorubá.',
    publishedAt: '2026-01-15',
    tags: ['ebó', 'rituais', 'oferendas', 'ifá', 'sacrifício', 'yorubá'],
    content: `<p><strong>Ebó</strong> é a palavra yorubá para oferenda, sacrifício ou ritual de restauração do equilíbrio espiritual. Em Ifá, o ebó é o mecanismo mais importante para resolver problemas, afastar perigos, atrair bênçãos e restaurar a harmonia entre o ser humano e as forças espirituais. Como diz o ditado yorubá: <em>"A fé sem ebó é vazia"</em>.</p>
    <h2>O Que é Ebó? Restauração do Equilíbrio</h2>
    <p>Ebó não é simplesmente "dar algo" aos Orixás. É um processo ritualístico que envolve intenção clara, rezas específicas, elementos materiais e uma transferência de energias. O ebó funciona como uma troca espiritual: o ser humano oferece algo (comida, animais, ervas, trabalho) em troca do equilíbrio espiritual, da remoção de obstáculos ou da atração de bênçãos.</p>
    <p>A palavra Ebó vem de <em>ebo</em> ("deixar ir" ou "transferir"). As energias negativas, os bloqueios e os perigos são transferidos do consulente para os objetos do ebó, que depois são descartados em locais específicos (encruzilhadas, rios, matas, cemitérios).</p>
    <h2>As Três Grandes Categorias de Ebó</h2>
    <ul>
      <li><strong>Ebó Ilera (Ebó pela Saúde):</strong> Para curar ou prevenir doenças. Envolve ervas específicas (folha da costa, alecrim, manjericão), pão, mel e, em casos mais graves, animais (pombo ou galinha branca). É feito no pé de uma árvore sagrada ou no terreiro.</li>
      <li><strong>Ebó Owo (Ebó pela Prosperidade):</strong> Para atrair dinheiro, trabalho e prosperidade financeira. Envolve moedas, mel, azeite de dendê, obi (coco), orogbo (noz de cola) e, em alguns casos, galinha amarela. Feito em locais de comércio ou na frente da casa.</li>
      <li><strong>Ebó Iré (Ebó de Boa Sorte):</strong> Para atrair boa sorte, amor, paz e bênçãos gerais. Envolve pão, frutas, mel, velas e, em casos específicos, pombo branco ou galinha branca.</li>
    </ul>
    <h2>Os Cinco Tipos Específicos de Ebó</h2>
    <ul>
      <li><strong>Ebó Achó (Alinhamento):</strong> Para alinhar o consulente com seu destino (Ayanmo). É o ebó mais básico e frequente — uma "afinação" espiritual periódica.</li>
      <li><strong>Ebó Títé (Abertura de Caminho):</strong> Para remover obstáculos. Envolve Ogum e geralmente inclui ferramentas de ferro e pimenta.</li>
      <li><strong>Ebó Aba?e (Proteção):</strong> Para proteger contra ataques espirituais, feitiçaria e inveja. Envolve arruda, folha da costa e pemba.</li>
      <li><strong>Ebó ìp?j? (Purificação):</strong> Para limpar energias negativas acumuladas. Geralmente é um banho de ervas seguido de oferenda.</li>
      <li><strong>Ebó K?s? (Retorno):</strong> Para trazer de volta algo perdido — amor, saúde, dinheiro. Envolve ervas de retorno e orações específicas.</li>
    </ul>
    <h2>Como um Ebó é Realizado: Passo a Passo</h2>
    <ol>
      <li><strong>Consagração dos elementos:</strong> Os itens são consagrados com orações e toques de pemba. Cada elemento é associado aos Orixás do Odu revelado.</li>
      <li><strong>Oração (Aw?):</strong> O Babaláwo recita as orações específicas do Odu, invocando os Orixás e pedindo que aceitem a oferenda.</li>
      <li><strong>Transferência (Ope Ifá):</strong> O Babaláwo passa os elementos sobre o corpo do consulente, transferindo simbolicamente as energias negativas. O consulente sopra sobre os elementos, depositando neles seus problemas.</li>
      <li><strong>Rezo final:</strong> Uma oração de selamento confirma que o ebó foi aceito espiritualmente.</li>
      <li><strong>Descarte (Oj?):</strong> Os elementos do ebó são levados ao local indicado (encruzilhada, rio, mata, cemitério) e depositados com uma última oração.</li>
    </ol>
    <h2>Ebó com Sangue vs. Ebó sem Sangue</h2>
    <ul>
      <li><strong>Ebós sem sangue:</strong> A maioria dos ebós não envolve sangue. Pão, mel, frutas, ovos, azeite, obi, orogbo, ervas — a grande maioria das oferendas é vegetariana.</li>
      <li><strong>Ebós com sangue:</strong> Alguns ebós prescritos em Odus específicos envolvem animais (galinha, pombo, cabra, carneiro). O sacrifício é feito com um corte rápido e humano, e a carne é cozida e comida pela comunidade — nunca desperdiçada. O sangue é oferecido aos Orixás como o maior dos presentes.</li>
    </ul>
    <h2>Exemplos de Ebó por Odu</h2>
    <ul>
      <li><strong>Ejiogbe:</strong> Ebó com pão, mel e obi para manter prosperidade e luz.</li>
      <li><strong>Oyeku Meji:</strong> Ebó com pombo preto para honrar ancestrais e afastar a morte.</li>
      <li><strong>Ogunda Meji:</strong> Ebó com ferramenta de ferro e galinha para Ogum.</li>
      <li><strong>Osa Meji:</strong> Ebó com penas, leque e galinha para Oya.</li>
      <li><strong>Ose Meji:</strong> Ebó com espelho, mel e galinha amarela para Oxum.</li>
      <li><strong>Ofun Meji:</strong> Ebó com pão branco, leite e pombo para Obatala.</li>
    </ul>
    <h2>Ebó em Ifá vs. Despacho na Umbanda</h2>
    <ul>
      <li><strong>Ebó de Ifá:</strong> Segue a prescrição exata do Odu revelado. Feito por um Babaláwo. Envolve os 256 Odus e seus itans específicos.</li>
      <li><strong>Despacho Umbanda:</strong> Mais generalizado, sem a especificidade dos Odus. Pode ser feito por médiuns. Envolve entidades (Exus, Caboclos) e não necessariamente os Orixás diretamente.</li>
    </ul>
    <h2>Equívocos Comuns sobre Ebó</h2>
    <ul>
      <li>"Ebó é comprar o Orixá" — Não. Ebó é restaurar equilíbrio, não uma transação comercial.</li>
      <li>"Ebó resolve tudo sozinho" — Ebó abre caminhos, mas o consulente também deve agir no mundo material.</li>
      <li>"Só funciona com sangue" — A maioria dos ebós é sem sangue.</li>
      <li>"Qualquer pessoa pode fazer" — Ebós de Ifá requerem um Babaláwo iniciado.</li>
      <li>"É feitiço" — Ebó é comunicação com forças espirituais, não manipulação.</li>
    </ul>
    <p><em>Ebó ni a ó dà</em> — nós faremos ebó.</p>
    ${articleFooter()}`
  },
  {
    id: '10',
    slug: 'iyami-aje-poder-feminino-yoruba',
    title: 'Iyami Aje e o Poder Feminino na Tradição Yorubá',
    description: 'Conheça Iyami Aje (nossas mães), as divindades femininas do poder na tradição Yorubá. Entenda seu papel em Ifá, a relação com os Odus e o respeito ao feminino sagrado.',
    publishedAt: '2026-01-22',
    tags: ['iyami', 'aje', 'feminino', 'yorubá', 'ifá', 'feiticeira'],
    content: `<p><strong>Iyami Aje</strong> (em yorubá: "nossas mães do poder") são divindades femininas ancestrais que detêm o poder da procriação, da feitiçaria e da justiça. No sistema de Ifá, Iyami Aje ocupa um lugar de profundo respeito e cautela.</p>
    <h2>Quem São Iyami Aje?</h2>
    <p>Iyami Aje são as ancestrais mulheres que carregam o poder (Aje) de criar e destruir. Elas são representadas por aves noturnas (como corujas e urubus) e frequentemente chamadas de "feiticeiras" ou "mães da noite". Em Ifá, são consideradas as guardiãs do poder feminino primordial.</p>
    <h2>Iyami Aje nos Odus</h2>
    <p>O Odu <strong>Osa Meji</strong> é o principal Odu associado a Iyami Aje. Também aparecem em Irete Meji, Irosun Meji e vários Odus que tratam de poder feminino, mistério e transformação.</p>
    <h2>Respeito a Iyami Aje</h2>
    <p>Em Ifá, ensina-se que Iyami Aje não deve ser temida, mas respeitada. Elas são a força feminina que equilibra o universo. Rituais específicos são feitos para apaziguá-las e honrá-las, especialmente por mulheres iniciadas.</p>
    <h2>A Importância do Equilíbrio</h2>
    <p>Ifá ensina que o poder feminino (Aje) e o poder masculino (Agbara) devem estar em equilíbrio. Ignorar Iyami Aje é ignorar metade da força do universo.</p>
    ${articleFooter()}`
  },
  {
    id: '11',
    slug: 'itans-lendas-sagradas-ifa',
    title: 'Os Itans (Lendas) de Ifá: Histórias Sagradas dos Odus',
    description: 'Conheça os Itans de Ifá — as lendas sagradas que ensinam lições de vida através dos Odus. Descubra as histórias mais conhecidas e seu significado espiritual.',
    publishedAt: '2026-02-01',
    tags: ['itans', 'lendas', 'ifá', 'odus', 'histórias', 'sagrado'],
    content: `<p>Os <strong>Itans</strong> são as lendas sagradas de Ifá. Cada um dos 256 Odus tem múltiplos itans que ensinam lições morais, revelam a natureza dos Orixás e mostram o caminho para superar desafios. Os itans são a memória viva da tradição Yorubá.</p>
    <h2>O Que é um Itan?</h2>
    <p>Itan significa "história" ou "lenda" em yorubá. Os itans de Ifá são narrativas que geralmente começam com <em>"Lá no princípio, no tempo de Orunmila..."</em> e contam situações vividas por Orixás, ancestrais e seres humanos que revelam verdades universais.</p>
    <h2>Itans Famosos</h2>
    <ul>
      <li><strong>O Itan de Ejiogbe:</strong> Como Ejiogbe se tornou o rei dos Odus — o poder da humildade.</li>
      <li><strong>O Itan de Obara Meji:</strong> Como um homem pobre se tornou rico oferecendo uma abóbora — a prosperidade vem do sacrifício.</li>
      <li><strong>O Itan de Ogunda Meji:</strong> Como Ogunda dividiu o peixe — a importância do equilíbrio.</li>
      <li><strong>O Itan de Osa Meji:</strong> Como Oya domou os ventos — o poder feminino e a transformação.</li>
    </ul>
    <h2>Como os Itans São Usados na Consulta</h2>
    <p>Quando um Odu é revelado, o Babaláwo recita os itans associados e extrai deles as orientações para o consulente. Cada itan contém uma chave para entender o momento presente e agir corretamente.</p>
    <h2>A Importância dos Itans</h2>
    <p>Os itans são a alma de Ifá. Sem eles, o Odu é apenas um código binário. É pelos itans que o conhecimento de Ifá foi transmitido oralmente por milênios.</p>
    ${articleFooter()}`
  },
  {
    id: '12',
    slug: 'babalawo-sacerdote-ifa',
    title: 'Babaláwo: O Sacerdote de Ifá — Formação e Responsabilidades',
    description: 'Conheça o Babaláwo, o sacerdote de Ifá. Entenda como é a formação, as responsabilidades espirituais e o papel fundamental deste guardião da tradição Yorubá.',
    publishedAt: '2026-02-10',
    tags: ['babaláwo', 'sacerdote', 'ifá', 'iniciação', 'yorubá', 'orunmila'],
    content: `<p><strong>Babaláwo</strong> significa "pai do segredo" em yorubá. É o sacerdote de Ifá, o guardião do conhecimento sagrado dos 256 Odus e o intermediário entre os seres humanos e Orunmila. O Babaláwo é um mestre, conselheiro, médico espiritual e juiz na comunidade.</p>
    <h2>A Formação do Babaláwo</h2>
    <p>A formação de um Babaláwo é longa e rigorosa:</p>
    <ol>
      <li><strong>Iniciação (Itefa):</strong> Cerimônia de iniciação que conecta o iniciado a Orunmila.</li>
      <li><strong>Aprendizado (Iko Ifá):</strong> Anos de estudo dos 256 Odus, itans, rezas e rituais.</li>
      <li><strong>Prática supervisionada:</strong> O noviço acompanha Babalawos experientes.</li>
      <li><strong>Confirmação:</strong> Após dominar o conhecimento, é confirmado como Babaláwo pleno.</li>
    </ol>
    <h2>Responsabilidades do Babaláwo</h2>
    <ul>
      <li>Realizar consultas divinatórias para orientar consulentes.</li>
      <li>Interpretar corretamente os Odus e recitar os itans apropriados.</li>
      <li>Prescrever ebós (oferendas) e rituais específicos.</li>
      <li>Guardar e transmitir o conhecimento oral de Ifá.</li>
      <li>Mediar questões espirituais e comunitárias.</li>
      <li>Realizar cerimônias de iniciação e confirmação.</li>
    </ul>
    <h2>O Babaláwo na Cultura Yorubá</h2>
    <p>O Babaláwo é uma figura central em qualquer comunidade yorubá tradicional. Ele não responde apenas perguntas — ele cura, aconselha e orienta. Sua palavra tem peso de lei espiritual.</p>
    ${articleFooter()}`
  },
  {
    id: '13',
    slug: 'ori-orixa-cabeca-destino-ifa',
    title: 'Ori: O Orixá da Cabeça e o Destino em Ifá',
    description: 'Conheça Ori, o Orixá pessoal da cabeça em Ifá. Entenda a relação entre Ori, destino, escolhas e o caminho espiritual de cada pessoa na tradição Yorubá.',
    publishedAt: '2026-02-18',
    tags: ['ori', 'cabeça', 'destino', 'ifá', 'yorubá', 'espiritual'],
    content: `<p><strong>Ori</strong> é o Orixá pessoal da cabeça de cada ser humano. Na tradição Yorubá, Ori é o guardião do destino individual (Ayanmo) — aquilo que cada pessoa escolheu antes de nascer, diante de Olodumare. Cultuar o próprio Ori é o primeiro e mais importante passo espiritual de qualquer pessoa. Como diz o ditado yorubá: <em>"Ori ko ni Olorun"</em> — Ori é o meu Deus.</p>
    <h2>Ori e o Destino (Ayanmo)</h2>
    <p>Na cosmologia Yorubá, antes de nascer, cada alma se ajoelha diante de Olodumare e escolhe seu destino: sua vida, seus desafios, suas alegrias, suas missões. Ori testemunha essa escolha e a carrega para a vida terrena. O papel de Ori é garantir que a pessoa siga o caminho escolhido — e quando Ori está forte, a pessoa flui com seu destino.</p>
    <p>Ayanmo (destino) não é fixo no sentido ocidental — ele tem caminhos possíveis dentro de uma estrutura. Ori é quem guia a pessoa através desses caminhos. Um Ori forte encontra soluções; um Ori fraco se perde.</p>
    <h2>Ori em Ifá</h2>
    <p>Ifá ensina que Ori é mais importante que qualquer Orixá externo. Sem um Ori forte e equilibrado, nenhum ritual funciona, nenhum ebó se completa, nenhuma bênção se fixa. Os Odus que mais falam sobre Ori são <strong>Ejiogbe</strong> (Ogbe Meji) e <strong>Ofun Meji</strong>. Ejiogbe ensina que Ori é a fonte de toda vitória, e acessar o próprio Ori através de oferendas regulares é o caminho para a luz.</p>
    <p>Existem dois aspectos de Ori: <strong>Ori Inu</strong> (o Ori interior, a consciência espiritual) e <strong>Ori Ode</strong> (o Ori exterior, a cabeça física). O Bori trabalha ambos simultaneamente.</p>
    <h2>Sinais de que Ori Precisa de Fortalecimento</h2>
    <ul>
      <li>Má sorte constante sem motivo aparente</li>
      <li>Dificuldade para manter dinheiro, emprego ou relacionamentos</li>
      <li>Sensação de "cabeça pesada" ou confusão mental</li>
      <li>Medo, ansiedade ou depressão sem causa clínica</li>
      <li>Acidentes frequentes ou problemas de saúde inexplicáveis</li>
      <li>Sensação de que a vida está "travada"</li>
      <li>Sonhos confusos ou pesadelos constantes</li>
    </ul>
    <h2>Bori (Bóri) — O Ritual de Fortalecimento da Cabeça</h2>
    <p><strong>Bori</strong> (ou Ebori) significa "alimentar a cabeça" em yorubá. É o ritual mais importante da tradição, pois fortalece o Ori do consulente, alinhando-o com seu destino e abrindo caminhos. O Bori é sempre o primeiro grande ritual que uma pessoa faz antes de qualquer iniciação (Itefa, Kariocha).</p>
    <h3>Elementos do Bori</h3>
    <ul>
      <li><strong>Obi (Coco):</strong> Pedaços de coco seco, símbolo de comunicação e abertura.</li>
      <li><strong>Orogbo (Noz de Cola):</strong> Fruto sagrado da verdade e aceitação.</li>
      <li><strong>Eja (Peixe):</strong> Representa fartura e alimento espiritual.</li>
      <li><strong>Adie (Galinha):</strong> Oferenda de vida ao Ori.</li>
      <li><strong>Eko (Acarajé):</strong> Alimento sagrado yorubá.</li>
      <li><strong>Mel:</strong> Doçura da vida e bênção do Ori.</li>
      <li><strong>Azeite de Dendê:</strong> Proteção e energia vital.</li>
      <li><strong>Manteiga de Amendoim:</strong> Alimento tradicional do Ori.</li>
    </ul>
    <h3>Passo a Passo do Bori</h3>
    <ol>
      <li><strong>Preparação:</strong> O Babaláwo ou pai-de-santo prepara o altar com os elementos. O consulente senta-se no chão.</li>
      <li><strong>Oração inicial:</strong> Invocação a Olodumare, Orunmila e ao Ori do consulente.</li>
      <li><strong>Alimentação da cabeça:</strong> Os alimentos são passados pela testa e coroa da cabeça enquanto se cantam cantigas de Bori.</li>
      <li><strong>Confirmação:</strong> O Obi é jogado para confirmar que o Ori aceitou a oferenda.</li>
      <li><strong>Abençoamento:</strong> O sacerdote abençoa a cabeça com as mãos, direcionando o axé.</li>
      <li><strong>Consumação:</strong> Os alimentos oferecidos são cozidos e consumidos pelo consulente e presentes.</li>
    </ol>
    <h3>Frequência do Bori</h3>
    <p>O Bori de iniciação é feito uma vez. Depois, recomenda-se um Bori de manutenção a cada 6 meses ou 1 ano. O Babaláwo indicará a frequência ideal para cada pessoa.</p>
    <h3>Cuidados Pós-Bori</h3>
    <ul>
      <li>Evite alimentos pesados e álcool nos primeiros dias</li>
      <li>Repouse espiritualmente, evite conflitos e discussões</li>
      <li>Abstinência sexual por 3 a 7 dias</li>
      <li>Mantenha pensamentos positivos e mente em paz</li>
    </ul>
    <h2>Como Cuidar do Seu Ori no Dia a Dia</h2>
    <p>Além do Bori periódico, o Ori precisa de cuidados diários: pensamentos positivos, evitar excessos (álcool, drogas, comida pesada), banhos de ervas regulares, meditação e oração ao Ori. Antes de pedir algo a qualquer Orixá, agradeça ao seu Ori — ele é o seu primeiro canal de comunicação com o divino.</p>
    ${articleFooter()}`
  },
  {
    id: '14',
    slug: 'ossaim-folhas-medicina-ifa',
    title: 'Ossaim e as Folhas Sagradas: O Poder da Medicina de Ifá',
    description: 'Conheça Ossaim (Osanyin), o Orixá das folhas e da medicina sagrada em Ifá. Descubra o poder curativo das ervas e a importância do conhecimento herbal na tradição Yorubá.',
    publishedAt: '2026-02-28',
    tags: ['ossaim', 'osanyin', 'folhas', 'medicina', 'ifá', 'curandeiro', 'yorubá'],
    content: `<p><strong>Ossaim</strong> (Osanyin) é o Orixá das folhas, das ervas e da medicina sagrada. Na tradição Yorubá, Ossaim conhece o segredo de cada folha e sua aplicação espiritual. Sem Ossaim, não há cura e nem ritual completo.</p>
    <h2>O Poder de Ossaim</h2>
    <p>Ossaim é representado como um homem com uma perna só, apoiado em uma muleta, com um pássaro pousado em seu ombro. Ele carrega um caldeirão com todas as folhas do mundo. Diz a tradição que Ossaim conhece o nome e o poder de cada uma das 401 folhas sagradas.</p>
    <h2>A Importância das Folhas em Ifá</h2>
    <p>Em Ifá, todos os rituais envolvem ervas. Cada Odu tem suas folhas específicas. O conhecimento de Ossaim inclui:</p>
    <ul>
      <li><strong>Folhas de cura:</strong> Tratamento de doenças físicas e espirituais.</li>
      <li><strong>Folhas de limpeza:</strong> Banhos de descarrego e purificação.</li>
      <li><strong>Folhas de defesa:</strong> Amuletos e proteção espiritual.</li>
      <li><strong>Folhas de prosperidade:</strong> Atração de dinheiro e sucesso.</li>
    </ul>
    <h2>Como Ossaim Se Relaciona com os Odus</h2>
    <p>Cada Odu de Ifá tem um conjunto específico de folhas associadas. Um Babaláwo que conhece bem Ossaim sabe exatamente qual erva usar para cada situação revelada na consulta.</p>
    <p><em>Kò sí ewé, kò sí òrìsà</em> — sem folhas, não há Orixá.</p>
    ${articleFooter()}`
  },
  {
    id: '15',
    slug: 'candomble-umbanda-ifa-diferencas',
    title: 'Candomblé, Umbanda e Ifá: Diferenças e Conexões',
    description: 'Entenda as diferenças e semelhanças entre Candomblé, Umbanda e Ifá. Como essas tradições se relacionam, suas origens e práticas distintas no culto aos Orixás.',
    publishedAt: '2026-03-10',
    tags: ['candomblé', 'umbanda', 'ifá', 'orixás', 'religião', 'yorubá', 'brasil'],
    content: `<p>No Brasil, três tradições de matriz africana são frequentemente confundidas: <strong>Candomblé, Umbanda e Ifá</strong>. Embora compartilhem origens comuns na cultura Yorubá, cada uma tem características, práticas e estruturas distintas.</p>
    <h2>Candomblé</h2>
    <p>O Candomblé é uma religião de matriz africana que cultua os Orixás através de cânticos, danças, comidas e rituais específicos. Originou-se na Bahia no século XIX. Seus líderes são pais e mães-de-santo, e o culto aos Orixás é o centro da prática.</p>
    <h2>Umbanda</h2>
    <p>A Umbanda é uma religião brasileira que sintetiza elementos africanos, indígenas, católicos e espíritas. Cultua Orixás, mas também entidades como caboclos, pretos-velhos e crianças. A Umbanda é mais eclética e menos rígida que o Candomblé.</p>
    <h2>Ifá</h2>
    <p>Ifá, como vimos neste guia, é um sistema divinatório e filosófico. É a base do conhecimento que fundamenta o culto aos Orixás, mas não é uma religião no sentido ocidental. Ifá é praticado por Babalawos e pode ser consultado por pessoas de qualquer fé.</p>
    <h2>Principais Diferenças</h2>
    <ul>
      <li><strong>Estrutura:</strong> Candomblé tem hierarquia de terreiro; Umbanda tem centros espíritas; Ifá tem Babalawos independentes.</li>
      <li><strong>Divinação:</strong> Candomblé usa Obi (coco) e Ifá usa Opele/Ikin; Umbanda usa principalmente mediunidade.</li>
      <li><strong>Orixás:</strong> Candomblé cultua Orixás completos; Umbanda tem versões sincréticas; Ifá trata os Orixás como forças dentro dos Odus.</li>
      <li><strong>Sacrifício:</strong> Candomblé e Ifá praticam sacrifícios animais; Umbanda geralmente não.</li>
    </ul>
    <h2>Pontos de Conexão</h2>
    <p>Todas as três tradições cultuam os mesmos Orixás, usam atabaques, cantigas em yorubá e valorizam os ancestrais. Muitos Babalawos também são pais-de-santo no Candomblé, e a Umbanda incorporou vários elementos de Ifá em sua prática.</p>
    ${articleFooter()}`
  },
  {
    id: '17',
    slug: 'diferenca-entidade-divindade-umbanda-candomble',
    title: 'Diferença entre Entidade e Divindade na Umbanda, Candomblé e Ifá',
    description: 'Entenda a diferença fundamental entre entidades espirituais e divindades (Orixás) nas religiões de matriz africana. Guia completo sobre hierarquia espiritual.',
    publishedAt: '2026-03-28',
    tags: ['entidade', 'divindade', 'umbanda', 'candomblé', 'ifá', 'orixás', 'guia espiritual'],
    content: `<p>Uma das dúvidas mais comuns entre praticantes e estudiosos das religiões de matriz africana é a diferença entre <strong>entidades espirituais</strong> e <strong>divindades (Orixás)</strong>. Embora os termos sejam frequentemente usados de forma intercambiável no senso comum, eles designam categorias espirituais distintas.</p>
    <h2>O Que São Divindades?</h2>
    <p>Divindades são <strong>Orixás</strong> — forças da natureza divinizadas, criadas por Olodumare (Deus Supremo) para governar aspectos específicos do universo. Exemplos: Xangô (trovão), Oxum (águas doces), Ogum (ferro). Elas <strong>não encarnam</strong> — nunca foram humanas. São princípios cósmicos.</p>
    <h2>O Que São Entidades?</h2>
    <p>Entidades são <strong>espíritos de humanos que já viveram na Terra</strong> e que, após a morte, evoluíram e se dedicam a ajudar os vivos. Elas incorporam em médiuns nos terreiros de Umbanda e Quimbanda. Exemplos: Exus, Pombas Giras, Caboclos, Pretos-Velhos, Ciganos, Boiadeiros.</p>
    <h2>Diferenças Principais</h2>
    <ul>
      <li><strong>Origem:</strong> Divindades nunca foram humanas; entidades são espíritos de humanos.</li>
      <li><strong>Culto:</strong> Orixás são cultuados com cantigas, comidas e rituais específicos; entidades são incorporadas e trabalham na gira.</li>
      <li><strong>Hierarquia:</strong> Orixás estão acima das entidades na hierarquia espiritual. Entidades servem aos Orixás.</li>
      <li><strong>Ifá:</strong> Ifá lida apenas com Orixás e Odus — não trabalha com entidades incorporadas (isso é da Umbanda/Quimbanda).</li>
      <li><strong>Candomblé:</strong> No Candomblé tradicional, não se incorporam entidades — apenas Orixás são cultuados.</li>
    </ul>
    <h2>Entidades que São Confundidas com Divindades</h2>
    <p>Exu é o caso mais clássico: na Umbanda, Exu é uma entidade (espírito de humano); no Candomblé e Ifá, Exu (Eshu) é um Orixá — divindade mensageira. São conceitos diferentes com o mesmo nome.</p>
    <h2>Resumo para Praticantes</h2>
    <p>Se incorpora e dá passes, é entidade. Se recebe oferendas no chão ou em altares específicos com cantigas em yorubá, é divindade. Toda entidade trabalha sob a regência de um Orixá.</p>
    ${articleFooter()}`
  },
  {
    id: '18',
    slug: 'diferenca-ifa-candomble-umbanda-quimbanda',
    title: 'Diferença entre Ifá, Candomblé, Umbanda e Quimbanda — Guia Completo',
    description: 'Entenda as diferenças fundamentais entre Ifá, Candomblé, Umbanda e Quimbanda. Origens, práticas, hierarquia espiritual e como cada tradição se relaciona com os Orixás.',
    publishedAt: '2026-04-05',
    tags: ['ifá', 'candomblé', 'umbanda', 'quimbanda', 'diferenças', 'orixás', 'religião'],
    content: `<p>As quatro tradições espirituais de matriz africana mais conhecidas no Brasil são <strong>Ifá, Candomblé, Umbanda e Quimbanda</strong>. Embora compartilhem raízes comuns, cada uma tem características, práticas e visões de mundo muito distintas.</p>
    <h2>Ifá — O Sistema Divinatório</h2>
    <p>Ifá é um <strong>sistema de conhecimento</strong> e divinação, não uma religião organizada. Baseia-se nos 256 Odus revelados por Orunmila. Não tem templos fixos nem incorporação de entidades. É praticado por Babalawos iniciados que consultam o Opele ou Ikin para orientar consulentes. Ifá é a <strong>fonte do conhecimento</strong> sobre os Orixás.</p>
    <h2>Candomblé — A Religião dos Orixás</h2>
    <p>O Candomblé é uma <strong>religião</strong> que cultua os Orixás com cânticos, danças, comidas e rituais específicos. Originou-se na Bahia no século XIX. Mantém a língua yorubá como litúrgica. Hierarquia: pai-de-santo/mãe-de-santo, iaôs (iniciados), abiãs. Orixás "baixam" nos filhos-de-santo durante as festas. Não há incorporação de entidades humanas.</p>
    <h2>Umbanda — A Religião Brasileira</h2>
    <p>A Umbanda é uma <strong>religião brasileira</strong> que sintetiza elementos africanos (Orixás), indígenas (Caboclos), católicos (santos) e espíritas (kardecismo). Caracteriza-se pela <strong>incorporação de entidades</strong>: Caboclos, Pretos-Velhos, Crianças (Erês), Exus, Pombas Giras, Boiadeiros, Ciganos, Baianos. Os Orixás são cultuados mas não incorporados diretamente (apenas nas linhas mais africanas).</p>
    <h2>Quimbanda — O Culto aos Exus</h2>
    <p>A Quimbanda é uma <strong>linha espiritual</strong> dentro do contexto umbandista, focada no trabalho com Exus e Pombas Giras. Diferente do senso comum, não é "magia negra" — é o culto às entidades que trabalham na linha da esquerda (força, justiça, descarrego). Tem suas próprias hierarquias de Exus: Exu da Encruzilhada, Exu do Cemitério, Exu das Almas, etc.</p>
    <h2>Comparação Direta</h2>
    <ul>
      <li><strong>Ifá:</strong> Sistema divinatório. Não incorpora. Apenas Babalawos. 256 Odus. Sem templos.</li>
      <li><strong>Candomblé:</strong> Religião. Incorpora Orixás. Pais-de-santo. Culto completo aos Orixás.</li>
      <li><strong>Umbanda:</strong> Religião brasileira. Incorpora entidades. Médiuns. Linhas diversas.</li>
      <li><strong>Quimbanda:</strong> Linha espiritual. Incorpora Exus. Trabalhos de esquerda e direita.</li>
    </ul>
    <h2>Podem se Misturar?</h2>
    <p>Muitos terreiros de Umbanda têm influência de Candomblé. Muitos Babalawos também são pais-de-santo. Quimbanda pode ser uma linha dentro da Umbanda. O importante é respeitar a estrutura de cada tradição.</p>
    ${articleFooter()}`
  },
  {
    id: '19',
    slug: 'todos-os-orixas-lista-completa',
    title: 'Todos os Orixás — Lista Completa de Divindades do Panteão Yorubá',
    description: 'Lista completa de todos os Orixás do panteão Yorubá. Conheça cada divindade, seus domínios, cores, dias da semana, saudações e elementos da natureza.',
    publishedAt: '2026-04-12',
    tags: ['orixás', 'todos', 'lista', 'yorubá', 'panteão', 'divindades', 'candomblé', 'umbanda'],
    content: `<p>O panteão Yorubá é composto por centenas de <strong>Orixás</strong> — divindades que representam forças da natureza e aspectos da existência. No Brasil, cultuamos principalmente os Orixás mais conhecidos, mas a tradição africana reconhece muito mais.</p>
    <h2>Os 16 Orixás Mais Cultuados no Brasil</h2>
    <ul>
      <li><strong>Exu (Eshu):</strong> Mensageiro, guardião dos caminhos. Cor: vermelho e preto. Dia: segunda. Saudação: Laroyê!</li>
      <li><strong>Ogum:</strong> Ferro, guerra, tecnologia. Cor: azul escuro. Dia: terça. Saudação: Ogunhê!</li>
      <li><strong>Oxóssi (Osoosi):</strong> Caça, floresta, fartura. Cor: verde. Dia: quinta. Saudação: Okê Arô!</li>
      <li><strong>Ossaim (Osanyin):</strong> Folhas, medicina sagrada. Cor: verde e branco. Dia: quinta.</li>
      <li><strong>Xangô:</strong> Trovão, justiça, fogo. Cor: vermelho e branco. Dia: quarta. Saudação: Kaô Kabecilê!</li>
      <li><strong>Obaluaie (Omolu):</strong> Terra, doença, cura. Cor: preto e branco. Dia: segunda. Saudação: Atotô!</li>
      <li><strong>Oxumarê:</strong> Arco-íris, renovação. Cor: verde, amarelo. Dia: terça.</li>
      <li><strong>Logunedé:</strong> Jovem guerreiro, caça e pesca. Cor: azul e dourado. Dia: quinta.</li>
      <li><strong>Oxum (Osun):</strong> Amor, fertilidade, água doce, ouro. Cor: amarelo/dourado. Dia: sábado. Saudação: Ora Yê Yê Ô!</li>
      <li><strong>Iemanjá (Yemanjá):</strong> Águas salgadas, maternidade. Cor: azul claro/branco. Dia: sábado. Saudação: Odoyá!</li>
      <li><strong>Nanã:</strong> Águas paradas, morte, sabedoria. Cor: lilás/roxo. Dia: segunda.</li>
      <li><strong>Iansã (Oyá):</strong> Ventos, tempestades, mortos. Cor: marrom/vermelho. Dia: quarta. Saudação: Eparrei!</li>
      <li><strong>Obá:</strong> Guerra feminina, lealdade. Cor: rosa/vermelho. Dia: quarta.</li>
      <li><strong>Ewá:</strong> Visão espiritual, mistério. Cor: vermelho. Dia: quarta.</li>
      <li><strong>Oxalá (Obatala):</strong> Criação, paz, branco. Cor: branco. Dia: sexta. Saudação: Epa Babá!</li>
      <li><strong>Ifá (Orunmila):</strong> Sabedoria, divinação. Cor: verde e amarelo. Dia: sábado.</li>
    </ul>
    <h2>Orixás Africanos Menos Conhecidos</h2>
    <ul>
      <li><strong>Aganju:</strong> Vulcões, terra seca. Pai ou irmão de Xangô.</li>
      <li><strong>Iroko:</strong> Orixá do tempo, árvore sagrada.</li>
      <li><strong>Oce (Ose):</strong> Orixá da caça com cães.</li>
      <li><strong>Ajê (Aje):</strong> Orixá da riqueza e prosperidade.</li>
      <li><strong>Egungum:</strong> Força ancestral, culto aos mortos.</li>
      <li><strong>Ibeji:</strong> Orixá dos gêmeos e crianças.</li>
      <li><strong>Ori:</strong> Orixá pessoal da cabeça e destino.</li>
      <li><strong>Odudua:</strong> Fundador de Ifé, criador da Terra.</li>
      <li><strong>Olokun:</strong> Orixá das profundezas do oceano.</li>
      <li><strong>Esu:</strong> Guardião do axé, aspecto primordial de Exu.</li>
    </ul>
    <h2>Hierarquia dos Orixás</h2>
    <p>Olodumare é o Deus Supremo, acima de todos. Abaixo, Oxalá é o chefe do panteão. Cada Orixá tem seu domínio, e todos se relacionam entre si através dos Odus de Ifá.</p>
    <p>No <a href="/odu">Ifá Oluwo</a>, você pode consultar qual Orixá rege cada Odu.</p>
    ${articleFooter()}`
  },
  {
    id: '20',
    slug: 'exus-pombas-giras-umbanda',
    title: 'Exus e Pombas Giras na Umbanda: Guia Completo das Entidades',
    description: 'Guia completo sobre Exus e Pombas Giras na Umbanda. Conheça suas falanges, características, cores, dias de trabalho e como se manifestam nos terreiros.',
    publishedAt: '2026-04-18',
    tags: ['exus', 'pombas giras', 'umbanda', 'entidades', 'guia', 'esquerda'],
    content: `<p><strong>Exus</strong> e <strong>Pombas Giras</strong> são entidades espirituais que trabalham na Umbanda na chamada "linha da esquerda". Diferente do que muitos pensam, não são entidades do mal — são espíritos evoluídos que lidam com forças densas, abertura de caminhos, descarrego e justiça.</p>
    <h2>O Que São Exus na Umbanda?</h2>
    <p>Exus na Umbanda são <strong>entidades de humanos que viveram na Terra</strong> e hoje trabalham sob a regência do Orixá Exu (Eshu). Eles são os guardiões dos terreiros, abrem os caminhos e executam trabalhos de limpeza espiritual pesada.</p>
    <h2>Principais Exus na Umbanda</h2>
    <ul>
      <li><strong>Exu da Encruzilhada:</strong> Guardião dos cruzamentos. Trabalha com abertura de caminhos.</li>
      <li><strong>Exu do Cemitério (Exu Caveira):</strong> Trabalha com demandas pesadas, ossos e espíritos presos.</li>
      <li><strong>Exu Tranca Rua:</strong> Fecha e abre caminhos. Impede o mal de entrar.</li>
      <li><strong>Exu das Almas:</strong> Trabalha com espíritos sofredores e almas do purgatório.</li>
      <li><strong>Exu Tiriri:</strong> Exu jovem, brincalhão. Trabalha com demandas simples.</li>
      <li><strong>Exu Veludo:</strong> Elegante, senhor. Trabalha com amor e justiça.</li>
      <li><strong>Exu Pinga Fogo:</strong> Rápido, direto. Trabalha com demandas urgentes.</li>
      <li><strong>Exu Calunguinha:</strong> Exu infantil. Trabalha com crianças e famílias.</li>
      <li><strong>Exu Sete Capas:</strong> Trabalha com demandas de justiça pesada.</li>
      <li><strong>Exu Marabô:</strong> Exu cigano. Trabalha com prosperidade e amor.</li>
    </ul>
    <h2>O Que São Pombas Giras?</h2>
    <p>Pombas Giras são a <strong>contraparte feminina</strong> dos Exus. São entidades femininas que trabalham com amor, prosperidade, justiça para mulheres, quebra de demandas e equilíbrio espiritual.</p>
    <h2>Principais Pombas Giras</h2>
    <ul>
      <li><strong>Pomba Gira Cigana:</strong> Trabalha com amor, prosperidade e liberdade.</li>
      <li><strong>Pomba Gira Maria Padilha:</strong> A mais conhecida. Trabalha com relacionamentos e justiça.</li>
      <li><strong>Pomba Gira Rosa Vermelha:</strong> Trabalha com amor e paixão.</li>
      <li><strong>Pomba Gira das Almas:</strong> Trabalha com espíritos femininos.</li>
      <li><strong>Pomba Gira Rainha:</strong> Trabalha com prosperidade e poder feminino.</li>
      <li><strong>Pomba Gira Menina:</strong> Trabalha com questões infantis e familiares.</li>
      <li><strong>Pomba Gira Sete Saias:</strong> Trabalha com demandas pesadas e proteção.</li>
    </ul>
    <h2>Características Gerais de Exus e Pombas Giras</h2>
    <ul>
      <li><strong>Cores:</strong> Vermelho, preto, dourado.</li>
      <li><strong>Dia de trabalho:</strong> Segunda-feira.</li>
      <li><strong>Bebidas:</strong> Cachaça, vinho doce, champanhe.</li>
      <li><strong>Fumo:</strong> Charuto, cigarro, cachimbo.</li>
      <li><strong>Flores:</strong> Rosas vermelhas, cravos.</li>
      <li><strong>Saudação:</strong> Laroyê Exu! (para Exus) / Ora Iô Iô Iô! (para Pombas Giras)</li>
    </ul>
    <h2>Exu na Quimbanda vs Exu na Umbanda</h2>
    <p>Na Umbanda, Exus são entidades de luz que trabalham na esquerda para descarrego e proteção. Na Quimbanda, o trabalho é mais denso, lidando com forças primais e magia.</p>
    ${articleFooter()}`
  },
  {
    id: '21',
    slug: 'entidades-umbanda-caboclos-pretos-velhos-boideiros-ciganos',
    title: 'Entidades da Umbanda: Caboclos, Pretos-Velhos, Boiadeiros, Ciganos, Baianos e Mais',
    description: 'Guia completo sobre todas as entidades da Umbanda. Conheça as linhas de Caboclos, Pretos-Velhos, Erês, Boiadeiros, Baianos, Ciganos e Marinheiros.',
    publishedAt: '2026-04-25',
    tags: ['umbanda', 'entidades', 'caboclos', 'pretos-velhos', 'boiadeiros', 'ciganos', 'baianos', 'marinheiros'],
    content: `<p>A Umbanda é uma religião rica em <strong>linhas espirituais</strong>, cada uma com entidades específicas que incorporam nos médiuns para trabalhar. Conheça todas as principais linhas e entidades.</p>
    <h2>Caboclos</h2>
    <p>Os <strong>Caboclos</strong> são espíritos de indígenas brasileiros que trabalham na Umbanda sob a regência de Oxóssi. São curadores, sábios da floresta, diretos e objetivos.</p>
    <ul>
      <li><strong>Caboclo Sete Flechas:</strong> Guerreiro, protetor. Trabalha com cura.</li>
      <li><strong>Caboclo Tupi:</strong> Sábio, conhecedor de ervas.</li>
      <li><strong>Caboclo Rompe Mato:</strong> Abre caminhos na mata espiritual.</li>
      <li><strong>Caboclo Pena Dourada:</strong> Trabalha com amor e prosperidade.</li>
      <li><strong>Caboclo Ubirajara:</strong> Senhor da lança. Proteção pesada.</li>
      <li><strong>Caboclo Aroeira:</strong> Erveiro, grande curador.</li>
    </ul>
    <p><strong>Saudação:</strong> Okê Caboclo!</p>
    <h2>Pretos-Velhos</h2>
    <p>Os <strong>Pretos-Velhos</strong> são espíritos de antigos escravizados africanos que trabalham sob a regência de Obaluaie e Nanã. São sábios, humildes, pacientes e grandes conselheiros espirituais.</p>
    <ul>
      <li><strong>Pai João de Angola:</strong> Sábio, conselheiro.</li>
      <li><strong>Pai João do Congo:</strong> Trabalha com cura e ervas.</li>
      <li><strong>Pai João da Guiné:</strong> Trabalha com prosperidade.</li>
      <li><strong>Mãe Maria da Penha:</strong> Sábia, conselheira espiritual.</li>
      <li><strong>Mãe Maria Conga:</strong> Trabalha com cura e amor.</li>
      <li><strong>Mãe Benedita:</strong> Conselheira de famílias.</li>
      <li><strong>Pai Tomé:</strong> Trabalha com descarrego leve.</li>
    </ul>
    <p><strong>Saudação:</strong> Louvado sejam os Pretos-Velhos!</p>
    <h2>Erês (Crianças)</h2>
    <p>Os <strong>Erês</strong> ou <strong>Crianças</strong> são entidades infantis que trabalham sob a regência de Oxum e Ibeji. Trazem leveza, alegria e pureza ao terreiro.</p>
    <ul>
      <li><strong>Erê Cosminho:</strong> Brincalhão, alegre.</li>
      <li><strong>Erê Douradinho:</strong> Trabalha com prosperidade.</li>
      <li><strong>Erê da Oxum:</strong> Doce e amoroso.</li>
      <li><strong>Erê do Ibeji:</strong> Protetor das crianças.</li>
    </ul>
    <p><strong>Saudação:</strong> Oni Erê!</p>
    <h2>Boiadeiros</h2>
    <p>Os <strong>Boiadeiros</strong> são espíritos de vaqueiros, tropeiros e peões do sertão brasileiro. Trabalham sob a regência de Ogum. São fortes, diretos e lidam com demandas difíceis.</p>
    <ul>
      <li><strong>Boiadeiro do Sertão:</strong> Trabalha com descarrego pesado.</li>
      <li><strong>Boiadeiro de Ogum:</strong> Força e proteção.</li>
      <li><strong>Boiadeiro Serra Acima:</strong> Abre caminhos onde ninguém passa.</li>
    </ul>
    <p><strong>Saudação:</strong> Ô Boiadeiro!</p>
    <h2>Baianos</h2>
    <p>Os <strong>Baianos</strong> são espíritos de pessoas da Bahia, geralmente ligados ao candomblé e à cultura baiana. Trabalham com coco e pemba, são descontraídos e diretos.</p>
    <ul>
      <li><strong>Baiano de Xangô:</strong> Justiça e verdade.</li>
      <li><strong>Baiano de Ogum:</strong> Demanda e proteção.</li>
      <li><strong>Baiano de Oxum:</strong> Amor e prosperidade.</li>
      <li><strong>Baiano do Coco:</strong> Trabalha com samba de roda e alegria.</li>
    </ul>
    <p><strong>Saudação:</strong> Salve os Baianos!</p>
    <h2>Ciganos</h2>
    <p>Os <strong>Ciganos</strong> são espíritos de ciganos que viveram em diversas partes do mundo. Trabalham sob a regência de Oxum e Exu. São elegantes, diretos e trabalham com prosperidade e amor.</p>
    <ul>
      <li><strong>Cigano Vladimir:</strong> Prosperidade e negócios.</li>
      <li><strong>Cigana Esmeralda:</strong> Amor e liberdade.</li>
      <li><strong>Cigana Carmen:</strong> Trabalhos de amor.</li>
      <li><strong>Cigano Pablo:</strong> Justiça e demandas.</li>
    </ul>
    <p><strong>Saudação:</strong> Salvé os Ciganos!</p>
    <h2>Marinheiros</h2>
    <p>Os <strong>Marinheiros</strong> são espíritos de marujos e navegantes. Trabalham sob Iemanjá. São alegres, dançam como se estivessem no mar e trabalham com limpeza espiritual.</p>
    <ul>
      <li><strong>Marinheiro do Porto:</strong> Trabalha com descarrego.</li>
      <li><strong>Marinheiro dos Mares:</strong> Proteção em viagens.</li>
    </ul>
    <p><strong>Saudação:</strong> Ê Marinheiro!</p>
    <h2>Capangueiros</h2>
    <p>Os <strong>Capangueiros</strong> (ou Jagunços) são entidades de homens do cangaço e capangas do nordeste. Trabalham sob Ogum. São sérios, fechados e lidam com demandas de justiça pesada e proteção.</p>
    <p><strong>Saudação:</strong> Salve os Capangueiros!</p>
    <h2>Malandros</h2>
    <p>Os <strong>Malandros</strong> são espíritos de malandros cariocas. Trabalham sob Exu. São astutos, espertos e trabalham com demandas de justiça e esperteza.</p>
    <p><strong>Saudação:</strong> Ô Malandro!</p>
    ${articleFooter()}`
  },
  {
    id: '22',
    slug: 'quimbanda-entidades-exus-espiritualidade',
    title: 'Entidades da Quimbanda: Exus, Pombas Giras e Magia Espiritual',
    description: 'Conheça as entidades da Quimbanda, seus Exus e Pombas Giras, hierarquia espiritual e a verdade sobre o culto à linha da esquerda na espiritualidade brasileira.',
    publishedAt: '2026-05-02',
    tags: ['quimbanda', 'exus', 'entidades', 'esquerda', 'magia', 'umbanda', 'espiritualidade'],
    content: `<p>A <strong>Quimbanda</strong> é uma linha espiritual brasileira que trabalha com as forças da "esquerda" — Exus, Pombas Giras e entidades que lidam com as energias mais densas e primais da natureza. Diferente do que o senso comum acredita, Quimbanda não é "magia negra" — é simplesmente o culto à forças que a Umbanda não trabalha diretamente.</p>
    <h2>Origens da Quimbanda</h2>
    <p>A Quimbanda tem origens nos cultos de origem banta (Angola, Congo) e na magia europeia, misturadas com elementos indígenas brasileiros. Diferencia-se da Umbanda por trabalhar exclusivamente com Exus e Pombas Giras, sem incorporar Caboclos, Pretos-Velhos ou outras linhas.</p>
    <h2>Hierarquia na Quimbanda</h2>
    <p>A Quimbanda organiza seus Exus em hierarquias específicas:</p>
    <ul>
      <li><strong>Exu Rei:</strong> Comanda falanges de Exus. Ex: Exu Rei da Encruzilhada.</li>
      <li><strong>Exu Governador:</strong> Governa territórios específicos.</li>
      <li><strong>Exu Chefe:</strong> Lidera uma falange específica.</li>
      <li><strong>Exu Guardião:</strong> Protege terreiros e cruzeiros.</li>
      <li><strong>Exu Trabalhador:</strong> Executa trabalhos.</li>
    </ul>
    <h2>Falanges de Exus na Quimbanda</h2>
    <ul>
      <li><strong>Exu da Encruzilhada:</strong> O mais conhecido. Guardião dos cruzamentos dos caminhos.</li>
      <li><strong>Exu Caveira (do Cemitério):</strong> Trabalha com ossos, alma e morte. Grande conhecimento de magia.</li>
      <li><strong>Exu das Almas:</strong> Trabalha com espíritos presos e almas do purgatório.</li>
      <li><strong>Exu Tiriri:</strong> Exu jovem e ágil. Trabalha com demandas rápidas.</li>
      <li><strong>Exu Veludo:</strong> Elegante. Trabalha com amor e demandas emocionais.</li>
      <li><strong>Exu Pinga Fogo:</strong> Direto e intenso. Trabalha com justiça.</li>
      <li><strong>Exu Tranca Rua:</strong> Fecha caminhos para o mal.</li>
      <li><strong>Exu Sete Capas:</strong> Exu de justiça pesada.</li>
      <li><strong>Exu Marabô:</strong> Exu cigano da Quimbanda.</li>
      <li><strong>Exu Calunguinha:</strong> Exu de linha infantil.</li>
    </ul>
    <h2>Pombas Giras na Quimbanda</h2>
    <p>As Pombas Giras na Quimbanda são a contraparte feminina dos Exus, com características específicas:</p>
    <ul>
      <li><strong>Pomba Gira Cigana:</strong> Prosperidade, amor, liberdade.</li>
      <li><strong>Pomba Gira Maria Padilha:</strong> A mais poderosa. Trabalha com amor e justiça feminina.</li>
      <li><strong>Pomba Gira Rainha:</strong> Poder, prosperidade, liderança feminina.</li>
      <li><strong>Pomba Gira Rosa Vermelha:</strong> Amor intenso, paixão.</li>
      <li><strong>Pomba Gira das Almas:</strong> Trabalha com espíritos femininos.</li>
      <li><strong>Pomba Gira Sete Saias:</strong> Descarrego e proteção.</li>
      <li><strong>Pomba Gira Maria Mulambo:</strong> Trabalha com demandas de pobreza e abandono.</li>
    </ul>
    <h2>Ferramentas da Quimbanda</h2>
    <p>Os trabalhos de Quimbanda utilizam instrumentos específicos: a tridente (garfo de Exu), o punhal, a pemba preta e vermelha, a cachaça, o charuto, o cigarro de palha e velas nas cores vermelha e preta.</p>
    <h2>Quimbanda e Magia</h2>
    <p>A Quimbanda trabalha com magia simbólica e direta. Seus rituais envolvem pontos riscados (sigilos), velas, oferendas em encruzilhadas, matas e cemitérios. Todo trabalho de Quimbanda é feito com intenção clara e respeito às forças espirituais.</p>
    <h2>Importante Saber</h2>
    <p>Quimbanda não é "magia do mal". Exus e Pombas Giras são entidades de luz que lidam com energias densas para ajudar quem precisa. O mal não vem da entidade — vem da intenção de quem solicita o trabalho.</p>
    ${articleFooter()}`
  },
  {
    id: '23',
    slug: 'yoruba-lingua-historia-cultura',
    title: 'Iorubá (Yorubá): Língua, História e Cultura de Um Grande Povo',
    description: 'Conheça a língua e a cultura Iorubá (Yorubá). História do povo Yorubá, sua língua tonal, os reinos de Oyó e Ile-Ifé, e sua influência nas Américas.',
    publishedAt: '2026-03-20',
    tags: ['yorubá', 'iorubá', 'língua', 'história', 'cultura', 'áfrica', 'ile-ifé'],
    content: `<p>O povo <strong>Yorubá</strong> (ou Iorubá) é um dos maiores grupos étnicos da África Ocidental, com aproximadamente 40 milhões de pessoas distribuídas principalmente entre Nigéria, Benin e Togo. Sua cultura, língua e tradições espirituais influenciaram profundamente as Américas através da diáspora africana.</p>
    <h2>A Língua Yorubá</h2>
    <p>O yorubá é uma <strong>língua tonal</strong> — o significado das palavras muda conforme o tom (alto, médio, baixo). Por exemplo, <em>igbá</em> pode significar "cabaceira", "200" ou "risada" dependendo do tom. É uma das línguas mais faladas da África, com influência em religiões afro-brasileiras como Candomblé e Umbanda.</p>
    <h2>História do Povo Yorubá</h2>
    <p>A história yorubá remonta a milênios, com a cidade de <strong>Ile-Ifé</strong> considerada o berço da civilização yorubá. Ifé foi o centro político e espiritual, onde Oduduwa estabeleceu a primeira dinastia real. O <strong>Reino de Oyó</strong> (séculos XIV-XIX) foi o império yorubá mais poderoso.</p>
    <h2>O Império de Oyó</h2>
    <p>Oyó foi um império guerreiro e comercial que dominou a região entre os rios Níger e Volta. Xangô, um de seus reis mais famosos, foi divinizado como Orixá do trovão e da justiça.</p>
    <h2>Influência no Brasil e Américas</h2>
    <p>A cultura yorubá chegou às Américas através do tráfico de pessoas escravizadas. No Brasil, o culto aos Orixás se preservou e evoluiu no Candomblé (especialmente no Ketu e Nagô). A língua yorubá é a língua litúrgica do Candomblé, e palavras como "axé", "orixá" e "babaláwo" são de origem yorubá.</p>
    <h2>Yorubá na Diáspora</h2>
    <p>Hoje, a cultura yorubá influencia a música (afoxé, samba-reggae), a dança, e a espiritualidade de milhões de pessoas fora da África. Ifá, como sistema de conhecimento yorubá, tem se expandido globalmente.</p>
    ${articleFooter()}`
  },
  {
    id: '24',
    slug: 'magia-umbanda-quimbanda-tipos-trabalhos',
    title: 'Magia na Umbanda e Quimbanda: Tipos de Trabalhos e Ética Espiritual',
    description: 'Guia completo sobre a magia na Umbanda e Quimbanda. Tipos de trabalhos espirituais, ética, pontos riscados, Exus, Orixás e como identificar charlatanismo.',
    publishedAt: '2026-05-10',
    tags: ['magia', 'umbanda', 'quimbanda', 'trabalhos', 'espiritual', 'exus', 'ética'],
    content: `<p>Quando se fala em <strong>magia</strong> no contexto da Umbanda e da Quimbanda, a primeira coisa que deve ficar clara é que não se trata de "magia negra" ou de algo sobrenatural doentio. Na verdade, a magia nessas tradições é a <strong>aplicação intencional de forças espirituais</strong> para resolver problemas, proteger pessoas e abrir caminhos — sempre dentro de uma lógica ética e espiritual.</p>
    <h2>O Que é Magia na Umbanda e Quimbanda?</h2>
    <p>Na Umbanda, a "magia" se manifesta como <strong>trabalhos espirituais</strong> realizados pelos médiuns e dirigentes, com a ajuda de Exus, Pombas Giras, Caboclos e Orixás. Na Quimbanda, o trabalho é mais direto e focado nas forças da linha da esquerda — Exus e Pombas Giras que lidam com energias densas, descarrego e justiça.</p>
    <p>Em ambas as tradições, a magia envolve <strong>intenção, elementos materiais e conexão espiritual</strong>. Não é pensamento mágico no sentido de "querer algo e acontecer" — é um trabalho estruturado, com regras, hierarquias e responsabilidades.</p>
    <h2>Tipos de Trabalhos Espirituais</h2>
    <ul>
      <li><strong>Trabalho de Proteção:</strong> Cria um campo energético ao redor da pessoa, evitando que energias negativas, olho gordo ou ataques espirituais a atinjam.</li>
      <li><strong>Descarrego Espiritual:</strong> Remove acúmulos de energias densas. Indicado quando alguém se sente pesado, doente sem motivo ou em má sorte constante.</li>
      <li><strong>Abertura de Caminhos:</strong> Remove obstáculos na vida. Exu da Encruzilhada é frequentemente o guia nestes trabalhos.</li>
      <li><strong>Prosperidade:</strong> Trabalhos para atrair fartura, dinheiro e oportunidades. Envolve Ogum, Oxum e Exu Marabô.</li>
      <li><strong>Quebra de Demanda:</strong> Trabalho pesado para desfazer feitiços e maldições. Envolve Exu Caveira ou Exu Sete Capas.</li>
    </ul>
    <h2>A Lei do Retorno</h2>
    <p>Tudo o que você envia para o universo retorna amplificado. Um trabalho feito com intenção de prejudicar alguém voltará contra quem o encomendou e quem o executou. Por isso, nenhum trabalho ético é feito para prejudicar — mesmo na Quimbanda, os trabalhos mais pesados são para proteger, limpar e restaurar o equilíbrio.</p>
    <h2>Magia com Exus vs Magia com Orixás</h2>
    <p>Na Umbanda e Quimbanda, existem duas linhas de força: <strong>magia com Exus</strong> (mais direta, rápida, com cachaça, pemba preta e velas vermelhas) e <strong>magia com Orixás</strong> (mais elaborada, cerimonial, com cantigas em yorubá e comidas rituais). O Exu abre o caminho, e o Orixá abençoa o resultado.</p>
    <h2>Elementos Usados em Trabalhos</h2>
    <ul>
      <li><strong>Velas:</strong> Cada cor corresponde a uma entidade ou finalidade.</li>
      <li><strong>Pemba:</strong> Giz colorido usado para riscar pontos e sigilos.</li>
      <li><strong>Ervas:</strong> Arruda, alecrim, guiné, manjericão.</li>
      <li><strong>Bebidas:</strong> Cachaça, vinho doce, champanhe, cerveja.</li>
      <li><strong>Pólvora:</strong> Usada para acelerar resultados e quebrar obstáculos.</li>
    </ul>
    <h2>Como Identificar Charlatanismo</h2>
    <p>Infelizmente, o espiritualismo atrai charlatões. Sinais de alerta: promessas de "prender" ou "destruir" alguém, valores absurdos, garantia de resultados impossíveis, trabalhos feitos em banheiros ou esquinas, pedidos de dinheiro antecipado sem explicação. Um bom dirigente orienta mesmo que a resposta não seja o que você queria ouvir.</p>
    ${articleFooter()}`
  },
  {
    id: '25',
    slug: 'bori-ritual-fortalecimento-cabeca-ori',
    title: 'Bori (Bóri): O Ritual de Fortalecimento da Cabeça na Tradição Yorubá',
    description: 'Conheça o Bori, o ritual de fortalecimento da cabeça (Ori) na tradição Yorubá. Elementos, passo a passo, significado e importância no Candomblé e Ifá.',
    publishedAt: '2026-05-17',
    tags: ['bori', 'bóri', 'ori', 'cabeça', 'ritual', 'yorubá', 'ifá', 'candomblé'],
    content: `<p>O <strong>Bori</strong> (também grafado Bóri ou Ebori) é um dos rituais mais sagrados e importantes da tradição Yorubá. Significa literalmente <strong>"alimentar a cabeça"</strong> — e nesse contexto, "cabeça" se refere ao <strong>Ori</strong>, o Orixá pessoal de cada indivíduo, o guardião do destino escolhido antes do nascimento. Na tradição Yorubá, existe um ditado fundamental: <em>"Ori ko ni Olorun"</em> — Ori é o meu Deus. Antes de cultuar qualquer Orixá, é preciso primeiro alimentar e fortalecer o próprio Ori.</p>
    <h2>O Que é Bori?</h2>
    <p>Bori é o ritual de fortalecimento e purificação da cabeça. Envolve oferendas específicas a Ori com elementos sagrados que alimentam espiritualmente o destino da pessoa. O Bori é considerado o primeiro passo espiritual de qualquer pessoa na tradição — é ele que harmoniza a cabeça com o destino escolhido e abre caminhos.</p>
    <h2>Em Que Situações Fazer Bori</h2>
    <ul>
      <li>Antes de qualquer iniciação (Itefa, Kariocha)</li>
      <li>Má sorte constante sem motivo aparente</li>
      <li>Antes de decisões importantes (casamento, negócio, mudança)</li>
      <li>Doenças sem causa médica aparente</li>
      <li>Períodos de crise (luto, separação, perda de emprego)</li>
      <li>Renovação periódica (a cada 6 meses ou 1 ano)</li>
    </ul>
    <h2>Elementos do Bori</h2>
    <ul>
      <li><strong>Obi (Coco):</strong> Abertura e comunicação com o Ori.</li>
      <li><strong>Orogbo (Noz de Cola):</strong> Verdade e aceitação do destino.</li>
      <li><strong>Eja (Peixe):</strong> Prosperidade e fartura.</li>
      <li><strong>Adie (Galinha):</strong> Vida e compromisso com o Ori.</li>
      <li><strong>Eko (Acarajé):</strong> Alimento sagrado.</li>
      <li><strong>Mel:</strong> Doçura da vida e harmonia.</li>
      <li><strong>Azeite de Dendê:</strong> Proteção e energia vital.</li>
    </ul>
    <h2>Passo a Passo do Bori</h2>
    <ol>
      <li><strong>Preparação:</strong> Altar montado, consulente sentado no chão.</li>
      <li><strong>Oração inicial:</strong> Invocação a Olodumare, Orunmila e Ori.</li>
      <li><strong>Alimentação:</strong> Os alimentos são passados pela testa e coroa enquanto se cantam cantigas.</li>
      <li><strong>Confirmação:</strong> Obi é jogado para confirmar aceitação.</li>
      <li><strong>Abençoamento:</strong> Benção da cabeça com as mãos, direcionando axé.</li>
      <li><strong>Consumação:</strong> Alimentos cozidos e consumidos pelo consulente.</li>
    </ol>
    <h2>Cuidados Pós-Bori</h2>
    <ul>
      <li>Dieta leve, sem álcool nos primeiros dias</li>
      <li>Repouso espiritual — evite conflitos e discussões</li>
      <li>Abstinência sexual por 3 a 7 dias</li>
      <li>Mantenha pensamentos positivos e mente em paz</li>
      <li>Siga à risca as orientações adicionais do Babaláwo</li>
    </ul>
    <h2>Bori no Candomblé vs Ifá</h2>
    <p>No Candomblé, o Bori é feito pelo pai ou mãe-de-santo no terreiro. Em Ifá, o Bori é feito pelo Babaláwo, que consulta o Odu para determinar quais elementos específicos oferecer. Em ambos, o princípio é o mesmo: alimentar o Ori para que ele guie o destino com clareza.</p>
    ${articleFooter()}`
  },
  {
    id: '26',
    slug: 'amuletos-patuas-protecao-espiritual-umbanda-ifa',
    title: 'Amuletos e Patuás: Proteção Espiritual na Umbanda, Candomblé e Ifá',
    description: 'Guia completo sobre amuletos e patuás de proteção espiritual. Figa de guiné, pemba, patuá de Exu, guia de Orixá e como consagrar e cuidar dos seus amuletos.',
    publishedAt: '2026-05-24',
    tags: ['amuletos', 'patuás', 'proteção', 'espiritual', 'umbanda', 'candomblé', 'ifá', 'axé'],
    content: `<p>Na tradição de matriz africana, a <strong>proteção espiritual</strong> é uma necessidade diária. Para isso, existem os amuletos e patuás — objetos consagrados que carregam axé (força espiritual) e servem como escudos contra energias negativas, olho gordo e ataques espirituais.</p>
    <h2>Diferença entre Amuleto e Patuá</h2>
    <ul>
      <li><strong>Amuleto:</strong> Objeto de proteção pessoal — pedra, dente, pena, figa, guia. Carregado no corpo (colar, pulseira, carteira).</li>
      <li><strong>Patuá:</strong> Sacola ou embrulho consagrado com ervas, pós, pemba e outros elementos. Pendurado em portas ou guardado em casa.</li>
    </ul>
    <h2>Amuletos Comuns na Tradição</h2>
    <ul>
      <li><strong>Figa de Guiné:</strong> Mão de ferro ou madeira fechada, o amuleto mais conhecido do Candomblé. Usado para afastar olho gordo.</li>
      <li><strong>Arruda:</strong> Ramo seco ou fresco carregado no bolso para quebra de demanda.</li>
      <li><strong>Pemba:</strong> Giz consagrado. Pemba preta para Exu, branca para Oxalá, vermelha para proteção.</li>
      <li><strong>Fio de Contas:</strong> Colar de contas com as cores do Orixá de cabeça.</li>
      <li><strong>Guia de Proteção:</strong> Fio consagrado com cores específicas, o amuleto mais pessoal do praticante.</li>
      <li><strong>Dente de Javali:</strong> Proteção pesada, usado em trabalhos de Ogum.</li>
      <li><strong>Ferradura:</strong> Sorte e proteção, associada a Ogum e Exu.</li>
    </ul>
    <h2>O Patuá de Exu</h2>
    <p>Feito com sacola de pano preto ou vermelho contendo pemba preta e vermelha, arruda, guiné, cinzas de charuto e o ponto riscado da entidade. Pendurado na porta da casa para proteção. Nunca deve ser aberto por quem não foi autorizado.</p>
    <h2>O Patuá de Ogum</h2>
    <p>Focado em proteção em demandas e abertura de caminhos difíceis. Contém pedras de rio, ferramentas de ferro, arruda, louro e cinzas de defumação de Ogum.</p>
    <h2>Guias de Proteção de Cada Orixá</h2>
    <ul>
      <li><strong>Exu:</strong> Preto e vermelho — 9+1 ou 18+1 contas</li>
      <li><strong>Ogum:</strong> Azul escuro — 9+1 contas</li>
      <li><strong>Oxóssi:</strong> Verde — 9+1 contas</li>
      <li><strong>Oxum:</strong> Amarelo/dourado — 9+1 contas</li>
      <li><strong>Xangô:</strong> Vermelho e branco — 9+1 contas</li>
      <li><strong>Iemanjá:</strong> Azul claro e branco — 9+1 contas</li>
      <li><strong>Oxalá:</strong> Branco — 9+1 contas</li>
    </ul>
    <h2>Como Consagrar e Cuidar dos Amuletos</h2>
    <ul>
      <li><strong>Consagração:</strong> Lavar com ervas (arruda, alecrim), defumar, passar azeite e orar invocando o Orixá.</li>
      <li><strong>Limpeza:</strong> A cada lua nova, defume e repasse azeite no amuleto.</li>
      <li><strong>Não emprestar:</strong> Amuletos carregam sua energia pessoal e não devem ser emprestados.</li>
      <li><strong>Descarte:</strong> Se não quiser mais, devolva à natureza (enterre ou jogue em rio/mar) — nunca no lixo.</li>
    </ul>
    ${articleFooter()}`
  },
  {
    id: '27',
    slug: 'defumacao-ervas-como-fazer-limpeza-espiritual',
    title: 'Defumação Espiritual: Ervas, Defumadores e Como Fazer',
    description: 'Guia completo de defumação espiritual com ervas. Receitas de defumadores, como limpar ambientes e cuidados na Umbanda, Candomblé e Ifá.',
    publishedAt: '2026-05-31',
    tags: ['defumação', 'ervas', 'defumador', 'limpeza', 'espiritual', 'umbanda', 'candomblé'],
    content: `<p>A <strong>defumação</strong> é uma das práticas mais antigas e universais da humanidade, e nas tradições de matriz africana ela tem um papel fundamental: a <strong>limpeza espiritual de ambientes e pessoas</strong>. Na Umbanda, Candomblé e Ifá, a defumação é usada para purificar energias, afastar vibras negativas e preparar ambientes para rituais.</p>
    <h2>Para Que Serve a Defumação?</h2>
    <ul>
      <li><strong>Limpeza de ambientes:</strong> Remove energias densas acumuladas em casas e locais de trabalho.</li>
      <li><strong>Preparação ritualística:</strong> Antes de giras e consultas, o espaço é defumado.</li>
      <li><strong>Proteção diária:</strong> Defumação regular mantém a casa protegida.</li>
      <li><strong>Descarrego pessoal:</strong> O banho de fumaça limpa a aura.</li>
    </ul>
    <h2>Ervas para Defumação</h2>
    <ul>
      <li><strong>Arruda:</strong> Quebra de demanda e proteção pesada.</li>
      <li><strong>Alecrim:</strong> Purificação e proteção leve. Acalma o ambiente.</li>
      <li><strong>Alfazema:</strong> Paz e harmonia. Excelente para quartos.</li>
      <li><strong>Guiné:</strong> Proteção contra inimigos e feitiçaria.</li>
      <li><strong>Mirra:</strong> Elevação espiritual e conexão com Orixás elevados.</li>
      <li><strong>Benjoim:</strong> Concentração e prosperidade.</li>
      <li><strong>Manjericão:</strong> Amor e harmonia familiar.</li>
      <li><strong>Louro:</strong> Proteção e sabedoria.</li>
    </ul>
    <h2>Receitas de Defumadores por Objetivo</h2>
    <ul>
      <li><strong>Proteção geral:</strong> Arruda + guiné + louro</li>
      <li><strong>Paz e harmonia:</strong> Alecrim + alfazema + manjericão</li>
      <li><strong>Quebra de demanda:</strong> Arruda + guiné + pimenta da costa</li>
      <li><strong>Prosperidade:</strong> Benjoim + alecrim + folha de louro</li>
      <li><strong>Elevação espiritual:</strong> Mirra + benjoim + sálvia</li>
    </ul>
    <h2>Como Fazer a Defumação de Ambiente</h2>
    <ol>
      <li><strong>Prepare:</strong> Abra portas e janelas para a saída de energias negativas.</li>
      <li><strong>Acenda:</strong> Coloque carvão em brasa no defumador e deposite as ervas.</li>
      <li><strong>Ore:</strong> Peça proteção ao Orixá ou entidade de sua devoção.</li>
      <li><strong>Caminhe:</strong> Comece pela porta principal, vá pelos cantos das paredes, portas e janelas.</li>
      <li><strong>Encerre:</strong> Agradeça e apague o defumador em segurança.</li>
    </ol>
    <h2>Defumação Pessoal (Banho de Fumaça)</h2>
    <p>Passe o defumador ao redor do corpo, de cima para baixo, para limpar a aura pessoal. Recomendado após visitas a locais públicos lotados, encontros com pessoas de energia pesada ou antes de dormir.</p>
    <h2>Cuidados de Segurança</h2>
    <ul>
      <li>Defume sempre em ambientes ventilados</li>
      <li>Tenha água ou extintor por perto</li>
      <li>Remova crianças e animais do local durante a defumação</li>
    </ul>
    <h2>Frequência Ideal</h2>
    <p>Recomenda-se defumar a casa pelo menos uma vez por semana (segundas ou sextas-feiras). Em períodos de crise, pode-se defumar diariamente. Terreiros devem ser defumados antes e depois de cada uso.</p>
    ${articleFooter()}`
  },
  {
    id: '28',
    slug: 'oferendas-orixas-comidas-sagradas',
    title: 'Oferendas para Orixás: Comidas Sagradas e Seus Significados',
    description: 'Guia completo sobre oferendas (ebó) para cada Orixá. Comidas sagradas, preparo, significado e como entregar oferendas no Candomblé, Ifá e Umbanda.',
    publishedAt: '2026-06-07',
    tags: ['oferendas', 'orixás', 'comidas', 'sagradas', 'candomblé', 'ifá', 'umbanda', 'axé'],
    content: `<p>Nas tradições de matriz africana, as <strong>oferendas</strong> (também chamadas de ebó) são a forma mais direta de comunicação com os Orixás. Cada Orixá tem suas comidas sagradas preferidas — preparar e oferecer essas comidas com respeito e fé é um ato de gratidão e conexão espiritual.</p>
    <h2>A Importância das Oferendas</h2>
    <p>O ebó não é simplesmente "dar comida". É um ritual de troca de energia: o ofertante oferece alimento, trabalho e fé; o Orixá oferece proteção, bênção e axé. Em Ifá, o ebó é o primeiro passo para resolver qualquer problema revelado na consulta.</p>
    <h2>Exu (Eshu)</h2>
    <ul>
      <li><strong>Padê:</strong> Farofa de dendê com cebola picada, pimenta e camarão seco.</li>
      <li><strong>7 pimentas:</strong> Pimentas de diferentes cores.</li>
      <li><strong>Cachaça:</strong> Bebida forte oferecida em copo pequeno.</li>
    </ul>
    <h2>Ogum</h2>
    <ul>
      <li><strong>Feijão preto com farofa de dendê:</strong> A combinação clássica.</li>
      <li><strong>Inhame assado:</strong> Raiz sagrada.</li>
      <li><strong>Cerveja preta:</strong> Bebida de força.</li>
    </ul>
    <h2>Oxóssi</h2>
    <ul>
      <li><strong>Milho verde:</strong> Assado ou cozido.</li>
      <li><strong>Frutas:</strong> Banana, melancia, manga.</li>
      <li><strong>Catá (Axoxô):</strong> Mingau de milho com coco.</li>
    </ul>
    <h2>Oxum</h2>
    <ul>
      <li><strong>Omolocum:</strong> Feijão fradinho cozido com cebola e camarão.</li>
      <li><strong>Canjica:</strong> Mingau branco de milho.</li>
      <li><strong>Mel:</strong> Doce natural essencial.</li>
    </ul>
    <h2>Iemanjá</h2>
    <ul>
      <li><strong>Ebô de arroz:</strong> Arroz branco cozido em pano branco.</li>
      <li><strong>Manjar:</strong> Pudim de coco branco em forma de lua.</li>
      <li><strong>Peixe frito:</strong> Inteiro, sem tempero forte.</li>
      <li><strong>Flores brancas:</strong> Rosas e lírios.</li>
    </ul>
    <h2>Xangô</h2>
    <ul>
      <li><strong>Amalá:</strong> Quiabo cozido com camarão e azeite de dendê.</li>
      <li><strong>Vinho tinto:</strong> Sangue e força do trovão.</li>
    </ul>
    <h2>Obaluaie (Omolu)</h2>
    <ul>
      <li><strong>Pipoca com azeite de dendê:</strong> Oferecida espalhada no chão.</li>
    </ul>
    <h2>Iansã (Oyá)</h2>
    <ul>
      <li><strong>Acarajé:</strong> Exclusivo de Iansã — nenhum outro Orixá recebe acarajé.</li>
      <li><strong>Feijão fradinho:</strong> Cozido, sem tempero forte.</li>
    </ul>
    <h2>Oxalá (Obatala)</h2>
    <ul>
      <li><strong>Canjica branca:</strong> Sem açúcar.</li>
      <li><strong>Inhame:</strong> Cozido, sem tempero.</li>
      <li><strong>Água mineral:</strong> Em copo de vidro.</li>
      <li><strong>Nunca:</strong> Dendê, sal ou pimenta. Oxalá é branco puro.</li>
    </ul>
    <h2>Como Entregar a Oferenda</h2>
    <p>Cada Orixá tem um local específico: Exu e Ogum no chão ou encruzilhada; Oxum em rio ou cachoeira; Iemanjá no mar; Xangô no pé de árvore. Coloque a comida sobre folhas do Orixá, acenda velas na cor correspondente e faça sua prece com fé e gratidão.</p>
    <h2>Ebó vs Oferenda vs Despacho</h2>
    <ul>
      <li><strong>Ebó:</strong> Termo geral para qualquer oferecimento ou sacrifício em Ifá.</li>
      <li><strong>Oferenda:</strong> Alimento oferecido a um Orixá em agradecimento ou pedido.</li>
      <li><strong>Despacho:</strong> Entrega de trabalhos espirituais em locais específicos para afastar males.</li>
    </ul>
    ${articleFooter()}`
  },
  {
    id: '29',
    slug: 'pontos-riscados-sigilos-umbanda-quimbanda',
    title: 'Pontos Riscados na Umbanda e Quimbanda: Sigilos e Seus Significados',
    description: 'Guia completo sobre pontos riscados (sigilos) na Umbanda e Quimbanda. Elementos, cores, entidades e como são usados em velas e trabalhos espirituais.',
    publishedAt: '2026-06-14',
    tags: ['pontos riscados', 'sigilos', 'umbanda', 'quimbanda', 'exus', 'entidades', 'magia'],
    content: `<p>Os <strong>pontos riscados</strong> são uma das expressões visuais mais poderosas da Umbanda e da Quimbanda. São desenhos feitos com pemba (giz colorido) no chão durante as giras, representando a <strong>assinatura espiritual de uma entidade</strong> e carregando símbolos que direcionam energia para um trabalho específico.</p>
    <h2>O Que São Pontos Riscados?</h2>
    <p>Quando uma entidade incorpora em um médium, uma das primeiras coisas que faz é riscar seu ponto no chão com pemba. Esse desenho contém elementos simbólicos que identificam a entidade, seu poder e o tipo de trabalho que será realizado. O ponto riscado é o "cartão de visita espiritual" da entidade.</p>
    <h2>Para Que Servem os Pontos Riscados?</h2>
    <ul>
      <li><strong>Identificação da entidade:</strong> Cada Exu, Pomba Gira e Caboclo tem seu ponto único.</li>
      <li><strong>Abertura de caminhos:</strong> Pontos com setas e flechas indicam direcionamento.</li>
      <li><strong>Proteção:</strong> Pontos com cruzeiros e tridentes criam barreiras espirituais.</li>
      <li><strong>Conexão espiritual:</strong> O ato de riscar abre o canal entre a entidade e o mundo material.</li>
    </ul>
    <h2>Elementos dos Pontos Riscados</h2>
    <ul>
      <li><strong>Cruzeiro:</strong> Proteção e fé. Comum em Pretos-Velhos e Oxalá.</li>
      <li><strong>Setas e flechas:</strong> Direcionamento e abertura. Comuns em Caboclos.</li>
      <li><strong>Estrela:</strong> Orientação e conexão com o divino.</li>
      <li><strong>Lua:</strong> Feminino, intuição e mistério. Presente em Pombas Giras.</li>
      <li><strong>Sol:</strong> Força e vitalidade. Usado em Ogum e Xangô.</li>
      <li><strong>Ondas:</strong> Águas. Comuns em Iemanjá.</li>
      <li><strong>Encruzilhada:</strong> O símbolo mais icônico de Exu.</li>
      <li><strong>Tridente:</strong> Ferramenta de Exu, poder e comando.</li>
    </ul>
    <h2>Cores e Seus Significados</h2>
    <ul>
      <li><strong>Vermelho:</strong> Exu, Pomba Gira, força, urgência</li>
      <li><strong>Preto:</strong> Proteção pesada, quebra de demanda</li>
      <li><strong>Branco:</strong> Paz, Oxalá, limpeza espiritual</li>
      <li><strong>Azul:</strong> Iemanjá, Ogum, água</li>
      <li><strong>Amarelo:</strong> Oxum, prosperidade, amor</li>
      <li><strong>Verde:</strong> Oxóssi, natureza, fartura</li>
      <li><strong>Lilás:</strong> Nanã, sabedoria ancestral</li>
      <li><strong>Rosa:</strong> Amor suave, Pombas Giras</li>
    </ul>
    <h2>Pontos Riscados de Principais Entidades</h2>
    <ul>
      <li><strong>Exu da Encruzilhada:</strong> Encruzilhada com tridente no centro. O ponto mais conhecido.</li>
      <li><strong>Pomba Gira:</strong> Lua crescente com coração ou labirinto.</li>
      <li><strong>Caboclo:</strong> Flechas cruzadas e coroa de penas.</li>
      <li><strong>Preto-Velho:</strong> Cruzeiro e terço. Simples e humilde.</li>
      <li><strong>Boiadeiro:</strong> Laço de boi e estrela.</li>
    </ul>
    <h2>Ponto de Entidade vs Ponto de Orixá</h2>
    <ul>
      <li><strong>Ponto de entidade:</strong> Desenhado durante a gira com pemba. Temporário.</li>
      <li><strong>Ponto de Orixá:</strong> Mais permanente, pintado em altares e assentamentos. Segue padrões formais.</li>
    </ul>
    <h2>Como Usar Pontos Riscados em Velas</h2>
    <p>Desenhe o ponto da entidade na vela com pemba antes de acendê-la. A vela carregará a energia do ponto durante toda a queima. Também é possível riscar o ponto do Exu Protetor na porta da casa para criar uma barreira espiritual.</p>
    ${articleFooter()}`
  },
  {
    id: '30',
    slug: 'magia-umbanda-quimbanda-tipos-trabalhos',
    title: 'Magia na Umbanda e Quimbanda: Tipos de Trabalhos e Ética Espiritual',
    description: 'Entenda os tipos de trabalhos espirituais na Umbanda e Quimbanda, a diferença entre magia de cura e magia negra, e a ética que rege esses rituais.',
    publishedAt: '2026-07-12',
    tags: ['umbanda', 'quimbanda', 'magia', 'trabalhos', 'exu', 'pomba-gira', 'ética'],
    content: `<p>A <strong>magia na Umbanda e na Quimbanda</strong> é um universo vasto e frequentemente mal compreendido. Ao contrário do que o imaginário popular sugere, a maioria dos trabalhos espirituais nessas tradições é voltada para cura, proteção, abertura de caminhos e resolução de conflitos — não para o mal.</p>
    <h2>O Que São Trabalhos Espirituais?</h2>
    <p>Trabalhos espirituais são rituais realizados com a intermediação de entidades (Exus, Pombas Giras, Caboclos, Pretos-Velhos) ou Orixás para alcançar um objetivo específico: afastar doenças, atrair amor, prosperar financeiramente, proteger a família ou resolver situações difíceis.</p>
    <h2>Tipos de Trabalhos na Umbanda</h2>
    <ul>
      <li><strong>Trabalho de Cura:</strong> Conduzido por Caboclos e Pretos-Velhos. Envolve passes, banhos de ervas, defumações e imposição de mãos. Objetivo: saúde física e emocional.</li>
      <li><strong>Trabalho de Abertura de Caminhos:</strong> Conduzido por Exus e Caboclos. Envolve velas, pontos riscados e oferendas em encruzilhadas. Objetivo: remover bloqueios e criar oportunidades.</li>
      <li><strong>Trabalho de Amor:</strong> Conduzido por Pombas Giras e Oxum. Envolve mel, perfume, flores e orações específicas. Objetivo: reconciliação, atração e fortalecimento de vínculos.</li>
      <li><strong>Trabalho de Proteção:</strong> Conduzido por Ogum e Exus guardiões. Envolve ferramenta de ferro, pemba e pontos riscados. Objetivo: criar barreiras espirituais contra ataques e inveja.</li>
      <li><strong>Trabalho de Descarrego:</strong> Conduzido por Pretos-Velhos. Envolve banho de sal grosso, defumação e descarte de materiais negativos. Objetivo: limpar energias pesadas acumuladas.</li>
    </ul>
    <h2>Quimbanda: Quando o Trabalho é Mais Pesado</h2>
    <p>A Quimbanda é uma linha espiritual que trabalha exclusivamente com Exus e Pombas Giras. Diferentemente da Umbanda, que tem uma perspectiva mais ampla, a Quimbanda especializa-se em trabalhos de força — proteção pesada, quebra de demandas e amarrações espirituais.</p>
    <p>Não é correto dizer que a Quimbanda é "magia negra" — ela trabalha com forças densas da natureza, mas com objetivos que podem ser tanto positivos quanto negativos, dependendo da intenção do solicitante.</p>
    <h2>A Ética Espiritual dos Trabalhos</h2>
    <p>Toda tradição responsável tem uma ética. As principais diretrizes são:</p>
    <ul>
      <li><strong>Lei do Retorno:</strong> O que você envia retorna multiplicado. Trabalhos de mal voltam para quem os encomenda.</li>
      <li><strong>Livre-arbítrio:</strong> Trabalhos que forçam a vontade de outra pessoa (amarrações extremas) geram débito espiritual grave.</li>
      <li><strong>Intenção:</strong> A intenção do solicitante e do sacerdote determina a natureza do trabalho.</li>
      <li><strong>Responsabilidade:</strong> Um bom pai ou mãe de santo não realiza qualquer trabalho — ele orienta e age dentro dos limites éticos da tradição.</li>
    </ul>
    <h2>Como Identificar um Trabalho Responsável</h2>
    <p>Desconfie de quem promete resultados garantidos, cobra valores absurdos, pede segredo total ou ameaça consequências caso você não faça o trabalho. Um sacerdote sério orienta, não coage.</p>
    ${articleFooter()}`
  },
  {
    id: '31',
    slug: 'bori-ritual-fortalecimento-cabeca-ori',
    title: 'Bori (Bóri): O Ritual de Fortalecimento da Cabeça na Tradição Yorubá',
    description: 'Saiba o que é o Bori, o ritual sagrado de fortalecimento do Ori (cabeça) na tradição Yorubá. Entenda quando fazer, como funciona e seus benefícios espirituais.',
    publishedAt: '2026-07-12',
    tags: ['bori', 'ori', 'cabeça', 'ritual', 'yorubá', 'ifá', 'candomblé'],
    content: `<p>O <strong>Bori</strong> (ou Bóri) é um dos rituais mais importantes da tradição Yorubá. Literalmente significa "alimentar a cabeça" — é um processo de fortalecimento e alinhamento do Ori (o Orixá pessoal da cabeça) com o destino individual da pessoa.</p>
    <h2>O Que é o Ori?</h2>
    <p>Ori é o guardião do destino pessoal de cada ser humano. Na cosmologia Yorubá, antes de nascer, cada alma escolhe seu caminho diante de Olodumare, e Ori testemunha essa escolha. Um Ori forte e equilibrado garante que a pessoa siga seu caminho com clareza, força e bênção.</p>
    <h2>Por Que Fazer o Bori?</h2>
    <p>O Bori é recomendado em momentos de:</p>
    <ul>
      <li>Má sorte persistente ou sensação de "bloqueio"</li>
      <li>Início de um novo ciclo de vida (casamento, novo emprego, mudança)</li>
      <li>Doença ou desequilíbrio emocional</li>
      <li>Confusão mental ou falta de direção</li>
      <li>Antes de consultas divinatórias importantes</li>
      <li>Como manutenção espiritual periódica (anual)</li>
    </ul>
    <h2>Como o Bori é Realizado</h2>
    <p>O Bori é conduzido por um Babaláwo ou Iyalorixá iniciado. O processo geral envolve:</p>
    <ol>
      <li><strong>Preparação:</strong> O consulente veste branco e passa por uma limpeza espiritual inicial.</li>
      <li><strong>Invocação:</strong> O sacerdote invoca Ori, Orunmila e os Orixás da pessoa.</li>
      <li><strong>Alimentação da Cabeça:</strong> Substâncias sagradas são aplicadas sobre a cabeça: obi, obi abata, orogbo, obi kola (nozes sagradas), mel, manteiga de ori (karité), água fresca, vinho de palma e, em casos específicos, sangue de animais.</li>
      <li><strong>Orações (Ofó):</strong> Rezas em yorubá são entoadas, pedindo fortalecimento do Ori e alinhamento com o destino.</li>
      <li><strong>Repouso:</strong> O consulente permanece em silêncio e repouso por um período determinado.</li>
      <li><strong>Encerramento:</strong> O sacerdote consulta o Obi para confirmar que Ori aceitou a oferenda.</li>
    </ol>
    <h2>Materiais Usados no Bori</h2>
    <ul>
      <li><strong>Obi (coco da Índia):</strong> Purificação e comunicação com os Orixás</li>
      <li><strong>Ori (manteiga de karité):</strong> Suavização e proteção da cabeça</li>
      <li><strong>Mel:</strong> Doçura e atração de bênçãos</li>
      <li><strong>Obi abata e Orogbo:</strong> Fortalecem a consulta oracular</li>
      <li><strong>Água fresca (omi tutu):</strong> Refrescamento e paz</li>
      <li><strong>Ewé (folhas sagradas):</strong> Fortalecimento do axé</li>
    </ul>
    <h2>Bori no Candomblé vs. Bori em Ifá</h2>
    <p>No Candomblé, o Bori é um ritual de iniciação e manutenção conduzido pelo pai ou mãe de santo. Em Ifá, o Bori é prescrito e realizado pelo Babaláwo, seguindo as orientações do Odu revelado na consulta. Ambos têm o mesmo objetivo: fortalecer e alinhar o Ori.</p>
    <p>O Bori é, acima de tudo, um ato de autocuidado espiritual — um momento de conexão com a própria essência e destino.</p>
    ${articleFooter()}`
  },
  {
    id: '32',
    slug: 'amuletos-patuas-protecao-espiritual-umbanda-ifa',
    title: 'Amuletos e Patuás: Proteção Espiritual na Umbanda, Candomblé e Ifá',
    description: 'Conheça os principais amuletos e patuás usados na Umbanda, Candomblé e Ifá para proteção espiritual. Saiba como funcionam, como preparar e como usar corretamente.',
    publishedAt: '2026-07-12',
    tags: ['amuletos', 'patuás', 'proteção', 'umbanda', 'candomblé', 'ifá', 'ritual'],
    content: `<p><strong>Amuletos e patuás</strong> são objetos imbuídos de axé (força espiritual) através de rituais específicos, usados para proteção, atração de bênçãos e afastamento de energias negativas. Estão presentes em praticamente todas as tradições de matriz africana.</p>
    <h2>O Que é um Patuá?</h2>
    <p>O patuá é uma bolsa pequena, geralmente de couro ou tecido na cor do Orixá protetor, contendo ervas, pedras, raízes, pós rituais e orações escritas. É consagrado pelo sacerdote com rezas, sopros e axé dos Orixás. Quando pronto, torna-se um "escudo espiritual portátil".</p>
    <h2>Tipos de Amuletos por Tradição</h2>
    <h3>Em Ifá</h3>
    <ul>
      <li><strong>Ide de Ifá:</strong> Pulseira de contas verdes e amarelas consagrada a Orunmila. Protege e identifica o iniciado em Ifá.</li>
      <li><strong>Ileke (Fios de contas):</strong> Colares específicos de cada Orixá. Cada cor e padrão corresponde a uma divindade.</li>
      <li><strong>Obi abata consagrado:</strong> A noz de cola consagrada funciona como proteção temporária em situações de perigo.</li>
      <li><strong>Akose Ifá:</strong> Preparações medicinais-espirituais prescritas pelo Babaláwo após a revelação de um Odu.</li>
    </ul>
    <h3>Na Umbanda</h3>
    <ul>
      <li><strong>Patuá de Ogum:</strong> Proteção para caminhos, viagens e trabalho. Contém ferro, pimenta e ervas de Ogum.</li>
      <li><strong>Patuá de Exu:</strong> Abre caminhos e protege em situações de conflito. Contém pemba preta e vermelha.</li>
      <li><strong>Guia de Preto-Velho:</strong> Rosário de contas pretas e brancas para paz e cura.</li>
      <li><strong>Patuá de Iemanjá:</strong> Para proteção de crianças e da família. Contém conchas e arruda.</li>
    </ul>
    <h3>No Candomblé</h3>
    <ul>
      <li><strong>Bentinho:</strong> Pequeno saquinho de palha da costa com ervas e pós rituais do Orixá do iniciado.</li>
      <li><strong>Contra-egum:</strong> Tira de palha da costa usada no pulso esquerdo para afastar espíritos dos mortos.</li>
      <li><strong>Adjá:</strong> Sineta ritual que também funciona como objeto de proteção para quem a porta.</li>
    </ul>
    <h2>Como Funciona um Amuleto?</h2>
    <p>Um amuleto não é magia pelo objeto em si — é a consagração que o torna efetivo. O processo envolve: escolha do objeto certo para o objetivo, limpeza e purificação do objeto, consagração com orações, sopros e axé do Orixá, e ativação pelo sacerdote através de rituais específicos.</p>
    <h2>Como Usar Corretamente</h2>
    <ul>
      <li>Use próximo ao corpo, de preferência perto do coração ou na cintura.</li>
      <li>Não deixe outros tocarem seu amuleto pessoal.</li>
      <li>Renove periodicamente com o sacerdote que o fez.</li>
      <li>Se o amuleto se romper ou perder, pode significar que ele absorveu um ataque espiritual — agradeça e faça um novo.</li>
    </ul>
    <h2>Amuletos que Não Funcionam</h2>
    <p>Amuletos comprados em lojas sem consagração ritual são apenas objetos decorativos. A força espiritual vem do processo ritual, não do material em si.</p>
    ${articleFooter()}`
  },
  {
    id: '33',
    slug: 'defumacao-ervas-como-fazer-limpeza-espiritual',
    title: 'Defumação Espiritual: Ervas, Defumadores e Como Fazer',
    description: 'Guia completo sobre defumação espiritual. Aprenda as ervas certas, como preparar defumadores e o ritual correto para limpar ambientes e pessoas na tradição afro-brasileira.',
    publishedAt: '2026-07-12',
    tags: ['defumação', 'ervas', 'limpeza', 'espiritual', 'umbanda', 'candomblé', 'ritual'],
    content: `<p>A <strong>defumação</strong> é um dos rituais de limpeza espiritual mais utilizados nas tradições afro-brasileiras. A fumaça impregnada com o axé das ervas sagradas tem o poder de dissolver energias negativas, purificar ambientes e proteger pessoas.</p>
    <h2>Por Que a Fumaça Limpa?</h2>
    <p>Na cosmovisão das religiões de matriz africana, energias densas e espíritos negativos têm dificuldade de existir em ambientes com fumaça de ervas sagradas. A fumaça atua como um "desinfetante espiritual", carregando as energias negativas para o alto enquanto deixa no ambiente a vibração das ervas e dos Orixás a elas associados.</p>
    <h2>Ervas para Defumação e Seus Objetivos</h2>
    <h3>Para Limpeza e Descarrego</h3>
    <ul>
      <li><strong>Guiné:</strong> A mais poderosa para quebra de demandas e afastamento de energias pesadas.</li>
      <li><strong>Arruda:</strong> Corta feitiços e protege contra inveja e mau-olhado.</li>
      <li><strong>Espada de São Jorge:</strong> Proteção forte, afasta espíritos negativos.</li>
      <li><strong>Pinheiro:</strong> Purificação profunda e renovação de energias.</li>
    </ul>
    <h3>Para Proteção</h3>
    <ul>
      <li><strong>Alecrim:</strong> Proteção leve, atrai paz e bênçãos.</li>
      <li><strong>Manjericão:</strong> Proteção e prosperidade. Muito usado em ambientes de trabalho.</li>
      <li><strong>Louro:</strong> Proteção e vitória. Consagrado a Xangô e Ogum.</li>
      <li><strong>Eucalipto:</strong> Limpeza de ambientes com doenças e purificação do ar.</li>
    </ul>
    <h3>Para Atração (Amor e Prosperidade)</h3>
    <ul>
      <li><strong>Rosa:</strong> Amor, harmonia e paz no lar.</li>
      <li><strong>Canela:</strong> Prosperidade, dinheiro e atração.</li>
      <li><strong>Cravo:</strong> Força, proteção e limpeza.</li>
      <li><strong>Incenso de Benjoim:</strong> Elevação espiritual e atração de boas energias.</li>
    </ul>
    <h2>Como Preparar um Defumador Caseiro</h2>
    <ol>
      <li>Escolha as ervas de acordo com seu objetivo.</li>
      <li>Misture as ervas frescas ou secas em um recipiente resistente ao calor (um prato de barro ou coco seco).</li>
      <li>Acenda um carvão vegetal e coloque as ervas por cima.</li>
      <li>Deixe a fumaça se espalhar naturalmente pelo ambiente.</li>
    </ol>
    <h2>O Ritual de Defumação Correto</h2>
    <ol>
      <li><strong>Intenção:</strong> Antes de acender, diga em voz alta ou mentalmente o objetivo da defumação.</li>
      <li><strong>Direção:</strong> Comece pelos cantos do ambiente (onde as energias se acumulam) e vá em direção ao centro.</li>
      <li><strong>Circulação:</strong> Passe a fumaça em todos os cômodos, inclusive banheiros e armários.</li>
      <li><strong>Pessoas:</strong> Para defumar uma pessoa, passe a fumaça da cabeça aos pés, na frente e nas costas.</li>
      <li><strong>Janelas:</strong> Abra janelas após a defumação para que as energias negativas saiam com a fumaça.</li>
    </ol>
    <h2>Frequência Recomendada</h2>
    <ul>
      <li>Ambientes residenciais: uma vez por semana ou sempre que sentir a energia pesada.</li>
      <li>Ambientes comerciais: duas a três vezes por semana.</li>
      <li>Pessoas: quando necessário, especialmente após situações de conflito ou doença.</li>
    </ul>
    <p>A defumação é uma das práticas espirituais mais acessíveis e efetivas. Com as ervas certas e a intenção adequada, qualquer pessoa pode realizar uma limpeza espiritual básica em sua casa.</p>
    ${articleFooter()}`
  },
  {
    id: '34',
    slug: 'oferendas-orixas-comidas-sagradas',
    title: 'Oferendas para Orixás: Comidas Sagradas e Seus Significados',
    description: 'Guia completo das oferendas e comidas sagradas de cada Orixá. Aprenda o que oferecer a Exu, Ogum, Iemanjá, Xangô, Oxum e outros Orixás da tradição Yorubá.',
    publishedAt: '2026-07-12',
    tags: ['oferendas', 'orixás', 'comidas', 'sagradas', 'ebó', 'ritual', 'yorubá'],
    content: `<p>As <strong>oferendas</strong> (ebós) são uma das formas mais diretas de comunicação com os Orixás na tradição Yorubá. Cada Orixá tem preferências específicas em relação a comidas, bebidas, cores e locais de oferenda. Conhecer essas preferências é fundamental para que a oferenda seja aceita.</p>
    <h2>Por Que Fazer Oferendas?</h2>
    <p>Na cosmovisão Yorubá, os Orixás são forças vivas que interagem com o mundo através de rituais. As oferendas são uma forma de fortalecer essa conexão, agradecer bênçãos recebidas, pedir auxílio e manter o equilíbrio entre o mundo humano e o espiritual.</p>
    <h2>Oferendas por Orixá</h2>
    <h3>Exu</h3>
    <ul>
      <li><strong>Comidas:</strong> Farofa com azeite de dendê, pipoca, feijão fradinho, carne assada</li>
      <li><strong>Bebidas:</strong> Cachaça, vinho tinto, cerveja preta</li>
      <li><strong>Cores:</strong> Preto e vermelho</li>
      <li><strong>Local:</strong> Encruzilhadas, portões, entradas</li>
    </ul>
    <h3>Ogum</h3>
    <ul>
      <li><strong>Comidas:</strong> Feijão verde, inhame cozido, feijoada, acaçá</li>
      <li><strong>Bebidas:</strong> Vinho tinto, cachaça</li>
      <li><strong>Cores:</strong> Azul-marinho e verde</li>
      <li><strong>Local:</strong> Estradas, trilhas, locais de construção</li>
    </ul>
    <h3>Iemanjá</h3>
    <ul>
      <li><strong>Comidas:</strong> Bolo de arroz, banana, melão, flores brancas, acaçá</li>
      <li><strong>Bebidas:</strong> Água de coco, mel, champanhe</li>
      <li><strong>Cores:</strong> Azul-claro e branco</li>
      <li><strong>Local:</strong> Mar, rios, lagos</li>
    </ul>
    <h3>Xangô</h3>
    <ul>
      <li><strong>Comidas:</strong> Amalá (quiabo com carne), carurú, abará</li>
      <li><strong>Bebidas:</strong> Vinho tinto, cachaça</li>
      <li><strong>Cores:</strong> Vermelho e branco</li>
      <li><strong>Local:</strong> Pedreira, montanhas, cemitérios (entradas)</li>
    </ul>
    <h3>Oxum</h3>
    <ul>
      <li><strong>Comidas:</strong> Mel, abóbora, milho, feijão-fradinho com dendê, banana</li>
      <li><strong>Bebidas:</strong> Mel, champanhe, vinho branco</li>
      <li><strong>Cores:</strong> Amarelo e dourado</li>
      <li><strong>Local:</strong> Rios, cachoeiras, fontes de água doce</li>
    </ul>
    <h3>Obatala (Oxalá)</h3>
    <ul>
      <li><strong>Comidas:</strong> Acaçá, canjica branca, inhame cozido sem sal, coco</li>
      <li><strong>Bebidas:</strong> Água fresca, leite de coco</li>
      <li><strong>Cores:</strong> Branco</li>
      <li><strong>Local:</strong> Topos de morros, templos, altares em casa</li>
    </ul>
    <h3>Oxóssi</h3>
    <ul>
      <li><strong>Comidas:</strong> Inhame, milho, frutas da mata, canjica amarela</li>
      <li><strong>Bebidas:</strong> Mel, cerveja</li>
      <li><strong>Cores:</strong> Verde e amarelo</li>
      <li><strong>Local:</strong> Matas, florestas, parques</li>
    </ul>
    <h3>Omolu/Obaluaye</h3>
    <ul>
      <li><strong>Comidas:</strong> Pipoca, milho torrado, feijão preto, batata doce</li>
      <li><strong>Bebidas:</strong> Água, cerveja preta</li>
      <li><strong>Cores:</strong> Preto, branco e vermelho</li>
      <li><strong>Local:</strong> Cemitérios, hospitais (entorno)</li>
    </ul>
    <h2>Regras Gerais para Oferendas</h2>
    <ul>
      <li>Prepare os alimentos com cuidado, higiene e respeito.</li>
      <li>Faça a oferenda com o coração aberto, sem pressa.</li>
      <li>Ore ao Orixá durante a preparação e ao depositar a oferenda.</li>
      <li>Nunca faça oferenda por medo — faça por gratidão e conexão.</li>
      <li>Não deixe alimentos putrificando em casa por muito tempo.</li>
    </ul>
    <p>As oferendas são o alimento dos Orixás. Quando feitas com intenção pura e conhecimento correto, são o caminho mais direto para fortalecer sua conexão com o sagrado.</p>
    ${articleFooter()}`
  },
  {
    id: '35',
    slug: 'pontos-riscados-sigilos-umbanda-quimbanda-significados',
    title: 'Pontos Riscados na Umbanda e Quimbanda: Sigilos, Símbolos e Significados',
    description: 'Guia completo sobre pontos riscados na Umbanda e Quimbanda. Entenda o que são os sigilos espirituais, como funcionam e os símbolos das principais entidades.',
    publishedAt: '2026-07-12',
    tags: ['pontos-riscados', 'sigilos', 'umbanda', 'quimbanda', 'exu', 'pomba-gira', 'símbolos'],
    content: `<p>Os <strong>pontos riscados</strong> são sigilos espirituais usados na Umbanda e Quimbanda como assinatura das entidades — uma espécie de "identidade visual" sagrada que concentra a energia e o axé de cada ser espiritual. Cada entidade tem seu próprio ponto, único e inconfundível.</p>
    <h2>O Que São Pontos Riscados?</h2>
    <p>Ponto riscado é um símbolo desenhado com pemba (giz ritual branco, vermelho ou preto) que representa e invoca uma entidade espiritual específica. Quando o médium ou sacerdote risca o ponto, está literalmente "chamando" aquela entidade e criando um portal de comunicação entre o mundo físico e o espiritual.</p>
    <h2>Por Que São Chamados "Riscados"?</h2>
    <p>Porque são literalmente riscados — desenhados à mão livre com pemba no chão, em velas, paredes de templos ou em objetos rituais. Cada linha tem um significado: linhas retas representam caminhos abertos; curvas representam o feminino e o mistério; encruzilhadas representam o ponto de encontro entre os mundos.</p>
    <h2>Elementos Simbólicos nos Pontos</h2>
    <ul>
      <li><strong>Cruzeiro:</strong> Proteção e fé. Comum em Pretos-Velhos e Oxalá.</li>
      <li><strong>Setas e flechas:</strong> Direcionamento e abertura. Comuns em Caboclos.</li>
      <li><strong>Estrela:</strong> Orientação e conexão com o divino.</li>
      <li><strong>Lua:</strong> Feminino, intuição e mistério. Presente em Pombas Giras.</li>
      <li><strong>Sol:</strong> Força e vitalidade. Usado em Ogum e Xangô.</li>
      <li><strong>Ondas:</strong> Águas. Comuns em Iemanjá.</li>
      <li><strong>Encruzilhada:</strong> O símbolo mais icônico de Exu.</li>
      <li><strong>Tridente:</strong> Ferramenta de Exu, poder e comando.</li>
    </ul>
    <h2>Pontos Riscados das Principais Entidades</h2>
    <ul>
      <li><strong>Exu da Encruzilhada:</strong> Encruzilhada com tridente no centro. O ponto mais conhecido da Quimbanda.</li>
      <li><strong>Pomba Gira:</strong> Lua crescente com coração ou espiral. Representa o poder feminino e a sedução espiritual.</li>
      <li><strong>Caboclo:</strong> Flechas cruzadas e coroa de penas. Representa o guerreiro e caçador ancestral.</li>
      <li><strong>Preto-Velho:</strong> Cruzeiro e cajado. Simples e humilde, como a entidade.</li>
      <li><strong>Boiadeiro:</strong> Laço de boi e estrela. Traz a energia do sertão.</li>
      <li><strong>Marinheiro:</strong> Âncora e ondas. Representa as águas e a liberdade.</li>
    </ul>
    <h2>Como Usar Pontos Riscados</h2>
    <p>Os pontos riscados têm aplicações práticas no dia a dia ritual:</p>
    <ul>
      <li><strong>Em velas:</strong> Risque o ponto da entidade na vela com pemba antes de acender. A vela carregará aquela energia durante toda a queima.</li>
      <li><strong>No chão do terreiro:</strong> Durante a gira, o médiun risca o ponto antes de incorporar a entidade, preparando o espaço para recebê-la.</li>
      <li><strong>Em portas e entradas:</strong> O ponto de Exu Guardião pode ser riscado na entrada da casa para proteção.</li>
      <li><strong>Em objetos rituais:</strong> Facas, taças e ferramentas recebem os pontos de suas entidades.</li>
    </ul>
    <h2>Ponto Cantado vs. Ponto Riscado</h2>
    <p>Não confunda ponto riscado (sigilo visual) com ponto cantado (música ritual). São dois tipos diferentes de "ponto" que coexistem na tradição: o ponto riscado invoca visualmente, o ponto cantado invoca através da vibração sonora. Juntos, criam um campo de energia mais poderoso.</p>
    <h2>Quem Pode Riscar Pontos?</h2>
    <p>Em princípio, médiuns desenvolvidos e sacerdotes. No entanto, pontos simples de proteção (como o cruzeiro de Preto-Velho) podem ser usados por qualquer pessoa com orientação adequada. Pontos de Quimbanda requerem conhecimento e iniciação específicos.</p>
    ${articleFooter()}`
  }
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find(a => a.slug === slug);
}
