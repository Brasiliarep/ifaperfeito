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
    slug: 'magia-umbanda-quimbanda-trabalhos-espirituais-guia',
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
    slug: 'bori-ritual-alimentar-cabeca-destino',
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
    slug: 'amuletos-patuas-protetores-espirituais-completo',
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
    slug: 'defumacao-ritual-limpeza-espiritual-casa',
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
    slug: 'oferendas-orixas-guia-completo-comidas-sagradas',
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
  },
  {
    id: '35',
    slug: 'como-consultar-oraculo-ifa-guia-completo',
    title: 'Como Consultar o Oráculo de Ifá: Guia Completo para Iniciantes',
    description: 'Aprenda como consultar o Oráculo de Ifá passo a passo. Conheça os métodos de adivinhação yorubá, desde o Opele até o Ikin, e como interpretar os Odus.',
    publishedAt: '2026-07-16',
    tags: ['ifá', 'oráculo', 'adivinhação', 'yorubá', 'odu', 'opele', 'ikin'],
    content: `<p>O <strong>Oráculo de Ifá</strong> é o sistema de adivinhação mais antigo e completo da tradição Yorubá. Considerado a "boca de Olodumare" na terra, Ifá revela caminhos, destinos e soluções para os problemas da vida através da revelação dos 256 Odus.</p>
    <h2>O Que é Ifá?</h2>
    <p>Ifá é um sistema oracular milenar originário dos Yorubás da África Ocidental (Nigéria, Benim, Togo). É um dos sistemas de adivinhação mais precisos do mundo, reconhecido pela UNESCO como Patrimônio Cultural Imaterial da Humanidade em 2005.</p>
    <p>Ifá não é religião — é um sistema oracular que pode ser consultado por pessoas de qualquer religião. No entanto, está profundamente enraizado na cultura e espiritualidade Yorubá.</p>
    <h2>Quem Pode Consultar Ifá?</h2>
    <p>Há duas formas de consultar Ifá:</p>
    <ul>
      <li><strong>Consultar um Babaláwo:</strong> É o método recomendado. O Babaláwo é o sacerdote iniciado em Ifá, treinado para interpretar os Odus e prescrever soluções.</li>
      <li><strong>Consultar para si mesmo:</strong> Pessoas iniciadas em Ifá podem fazer consultas próprias, mas sempre com orientação de um Babaláwo mais experiente.</li>
    </ul>
    <p><strong>Importante:</strong> Pessoas não iniciadas NÃO devem tentar consultar Ifá por conta própria. O Oráculo requer preparação espiritual e conhecimento que só a iniciação proporciona.</p>
    <h2>Principais Métodos de Consulta</h2>
    <h3>1. Opele (Corrente de Adivinhação)</h3>
    <p>O Opele é uma corrente de metal com 8 peças semicirculares (coppies) presas a uma corrente. É o método mais rápido e comum para consultas do dia a dia.</p>
    <ul>
      <li><strong>Como funciona:</strong> O Babaláwo joga o Opele no chão. As peças caem em posições abertas (Oxê) ou fechadas (Oxã), formando um padrão que revela o Odu.</li>
      <li><strong>Velocidade:</strong> Revela o Odu em uma única jogada.</li>
      <li><strong>Uso:</strong> Consultas rápidas, perguntas simples, orientações do dia a dia.</li>
    </ul>
    <h3>2. Ikin (16 Cocozeiras de Palmeira)</h3>
    <p>O Ikin é o método mais sagrado e antigo de Ifá. Usa 16 nozes de palmeira (cocozeiras) que são jogadas em uma superfície de casca de palmeira.</p>
    <ul>
      <li><strong>Como funciona:</strong> As 16 nozes são divididas em dois montes. O Babaláwo conta cada monte e verifica se há nozes soltas. O padrão revela o Odu.</li>
      <li><strong>Velocidade:</strong> Mais lento — pode levar várias jogadas para revelar o Odu.</li>
      <li><strong>Uso:</strong> Consultas profundas, destinos de vida, rituais importantes.</li>
    </ul>
    <h3>3. Obi (Coco da Índia)</h3>
    <p>O Obi é o método mais simples e acessível. Usa um coco da Índia que é quebrado ao meio.</p>
    <ul>
      <li><strong>Como funciona:</strong> O coco é quebrado e as duas metades são jogadas no chão. Se ambas as cascas voltarem para cima (Oxê), a resposta é sim. Se uma para cima e outra para baixo (Oxã), a resposta é não.</li>
      <li><strong>Velocidade:</strong> Instantâneo — resposta em uma jogada.</li>
      <li><strong>Uso:</strong> Perguntas simples de sim/não, confirmações, oferendas.</li>
    </ul>
    <h3>4. Merindilogun (16 Coco)</h3>
    <p>O Merindilogun é uma extensão do Obi, usando 16 pedaços de coco em vez de apenas um.</p>
    <ul>
      <li><strong>Como funciona:</strong> Os 16 pedaços são jogados e o padrão revela qual Odu está se manifestando.</li>
      <li><strong>Velocidade:</strong> Mais rápido que o Ikin, mais completo que o Obi.</li>
      <li><strong>Uso:</strong> Consultas intermediárias, orientações específicas.</li>
    </ul>
    <h2>Os 256 Odus de Ifá</h2>
    <p>Ifá possui 256 Odus (códigos oraculares), cada um com milhares de versos, histórias (Itans) e prescrições rituais. Os 16 Odus Meji são os principais, e cada um deles se ramifica em mais 16 Odus menores.</p>
    <h2>Como é uma Consulta?</h2>
    <ol>
      <li><strong>Preparação:</strong> O consulente faz uma oferenda (ebó) para abrir a consulta.</li>
      <li><strong>Invocação:</strong> O Babaláwo invoca Orunmila e os Orixás.</li>
      <li><strong>Jogada:</strong> O método de consulta é utilizado (Opele, Ikin, etc.).</li>
      <li><strong>Revelação:</strong> O Odu é identificado e interpretado.</li>
      <li><strong>Orientação:</strong> O Babaláwo transmite a mensagem de Ifá.</li>
      <li><strong>Prescrição:</strong> Se necessário, um ebó é prescrito para resolver o problema.</li>
    </ol>
    <h2>O que Significa "Fazer Ebó"?</h2>
    <p>Ebó é a oferenda prescrita pelo Oráculo para equilibrar uma situação. Pode ser simples (frutas, velas, ervas) ou complexo (animais, rituais específicos). O ebó não é "pagamento" — é uma ação espiritual que alinha a pessoa com seu destino.</p>
    <h2>Dicas para uma Boa Consulta</h2>
    <ul>
      <li>Escolha um Babaláwo de confiança, indicado por pessoas que você conhece.</li>
      <li>Vá à consulta com perguntas claras e específicas.</li>
      <li>Seja honesto — Ifá sabe tudo, não adianta esconder.</li>
      <li>Siga as orientações recebidas — o Oráculo não fala à toa.</li>
      <li>Faça o ebó prescrito — ele é parte fundamental da solução.</li>
    </ul>
    <p>Ifá é um dos maiores presentes que a humanidade recebeu da África. Consultá-lo com respeito e fé pode transformar vidas.</p>
    ${articleFooter()}`
  },
  {
    id: '36',
    slug: 'significado-orixas-lista-completa-tradicao-yoruba',
    title: 'Significado dos Orixás: Lista Completa da Tradição Yorubá',
    description: 'Conheça o significado de cada Orixá da tradição Yorubá. Lista completa com nomes, funções, elementos, cores e qualidades dos principais Orixás do Candomblé e Ifá.',
    publishedAt: '2026-07-16',
    tags: ['orixás', 'yorubá', 'candomblé', 'ifá', 'significado', 'divindades'],
    content: `<p>Os <strong>Orixás</strong> são as divindades da tradição Yorubá, cada uma representando uma força da natureza e um aspecto da vida humana. Conhecer os Orixás é fundamental para entender o Candomblé, a Umbanda e o Sistema Ifá.</p>
    <h2>O Que São os Orixás?</h2>
    <p>Os Orixás são forças energéticas que personificam os elementos da natureza e as qualidades humanas. Não são "deuses" no sentido ocidental — são forças vivas que interagem com o mundo através dos rituais, cantos e oferendas.</p>
    <p>Segundo a tradição, todos os Orixás foram criados por Olodumare (Deus Supremo) e cada um tem uma função específica no equilíbrio do universo.</p>
    <h2>Os Orixás mais Conhecidos</h2>
    <h3>Oxalá (Obatala) — O Pai de Todos</h3>
    <ul>
      <li><strong>Função:</strong> Criação, sabedoria, paz, pureza</li>
      <li><strong>Cor:</strong> Branco</li>
      <li><strong>Elemento:</strong> Ar, éter</li>
      <li><strong>Dia:</strong> Quinta-feira</li>
      <li><strong>Oferendas:</strong> Acaçá, leite de coco, arroz branco</li>
    </ul>
    <h3>Exu — O Guardião das Encruzilhadas</h3>
    <ul>
      <li><strong>Função:</strong> Comunicação, abertura de caminhos, proteção</li>
      <li><strong>Cor:</strong> Preto e vermelho</li>
      <li><strong>Elemento:</strong> Fogo, terra</li>
      <li><strong>Dia:</strong> Segunda-feira</li>
      <li><strong>Oferendas:</strong> Cachaça, pipoca, farofa de azeite</li>
    </ul>
    <h3>Ogum — O Guerreiro</h3>
    <ul>
      <li><strong>Função:</strong> Guerra, tecnologia, caminhos, força</li>
      <li><strong>Cor:</strong> Azul-marinho, vermelho</li>
      <li><strong>Elemento:</strong> Fogo, metal</li>
      <li><strong>Dia:</strong> Terça-feira</li>
      <li><strong>Oferendas:</strong> Feijão carioca, inhame, vinho tinto</li>
    </ul>
    <h3>Oxóssi — O Caçador</h3>
    <ul>
      <li><strong>Função:</strong> Caça, prosperidade, natureza, fartura</li>
      <li><strong>Cor:</strong> Verde e azul</li>
      <li><strong>Elemento:</strong> Floresta, água</li>
      <li><strong>Dia:</strong> Quinta-feira (também segunda)</li>
      <li><strong>Oferendas:</strong> Milho cozido, frutas, cerveja</li>
    </ul>
    <h3>Oxum — A Rainha das Águas Doces</h3>
    <ul>
      <li><strong>Função:</strong> Amor, fertilidade, riqueza,beleza</li>
      <li><strong>Cor:</strong> Amarelo e dourado</li>
      <li><strong>Elemento:</strong> Água doce, ouro</li>
      <li><strong>Dia:</strong> Sábado</li>
      <li><strong>Oferendas:</strong> Mel, abóbora, milho, inhame</li>
    </ul>
    <h3>Xangô — O Rei do Trovão</h3>
    <ul>
      <li><strong>Função:</strong> Justiça, poder, fogo, trovão</li>
      <li><strong>Cor:</strong> Vermelho e branco</li>
      <li><strong>Elemento:</strong> Fogo, trovão</li>
      <li><strong>Dia:</strong> Quarta-feira e sexta-feira</li>
      <li><strong>Oferendas:</strong> Amalá (quiabo), vinho tinto, acaçá</li>
    </ul>
    <h3>Iemanjá — A Rainha do Mar</h3>
    <ul>
      <li><strong>Função:</strong> Maternidade, proteção, fertilidade, equilíbrio</li>
      <li><strong>Cor:</strong> Azul-claro e branco</li>
      <li><strong>Elemento:</strong> Mar, ondas</li>
      <li><strong>Dia:</strong> Sábado (também 31 de dezembro)</li>
      <li><strong>Oferendas:</strong> Bolo de arroz, flores brancas, espelhos</li>
    </ul>
    <h3>Nanã — A Mãe da Terra</h3>
    <ul>
      <li><strong>Função:</strong> Maternidade ancestral, terra, sabedoria antiga</li>
      <li><strong>Cor:</strong> Roxo e violeta</li>
      <li><strong>Elemento:</strong> Terra, lama</li>
      <li><strong>Dia:</strong> Segunda-feira</li>
      <li><strong>Oferendas:</strong> Abóbora, inhame, arroz com feijão</li>
    </ul>
    <h3>Omolu (Obaluaye) — O Senhor das Doenças</h3>
    <ul>
      <li><strong>Função:</strong> Cura, doenças, renascimento, transformação</li>
      <li><strong>Cor:</strong> Preto e vermelho</li>
      <li><strong>Elemento:</strong> Terra, fogo</li>
      <li><strong>Dia:</strong> Terça-feira</li>
      <li><strong>Oferendas:</strong> Pipoca, milho torrado, batata doce</li>
    </ul>
    <h3>Iansã — A Rainha Guerreira</h3>
    <ul>
      <li><strong>Função:</strong> Guerra, ventos, transformação, liberdade</li>
      <li><strong>Cor:</strong> Vermelho e prata</li>
      <li><strong>Elemento:</strong> Vento, fogo</li>
      <li><strong>Dia:</strong> Quarta-feira</li>
      <li><strong>Oferendas:</strong> Carne de panela, melancia, vinho tinto</li>
    </ul>
    <h3>Oxumaré — O Arco-Íris</h3>
    <ul>
      <li><strong>Função:</strong> Transformação, dualidade, riqueza, fertilidade</li>
      <li><strong>Cor:</strong> Amarelo e preto</li>
      <li><strong>Elemento:</strong> Água, arco-íris</li>
      <li><strong>Dia:</strong> Quinta-feira</li>
      <li><strong>Oferendas:</strong> Banana, milho, melancia</li>
    </ul>
    <h2>Orixás Menos Conhecidos</h2>
    <h3>Olokun — O Dono do Fundo do Mar</h3>
    <ul>
      <li><strong>Função:</strong> Mistério, profundidade, riqueza, silêncio</li>
      <li><strong>Cor:</strong> Azul-marinho e dourado</li>
      <li><strong>Elemento:</strong> Água profunda</li>
    </ul>
    <h3>Logunedé — O Caçador Jovem</h3>
    <ul>
      <li><strong>Função:</strong> Caça, arte, música, jovialidade</li>
      <li><strong>Cor:</strong> Verde e amarelo</li>
      <li><strong>Elemento:</strong> Floresta, água</li>
    </ul>
    <h3>Iroko — A Árvore Sagrada</h3>
    <ul>
      <li><strong>Função:</strong> Proteção, sabedoria, força, estabilidade</li>
      <li><strong>Cor:</strong> Verde e marrom</li>
      <li><strong>Elemento:</strong> Árvore, terra</li>
    </ul>
    <h3>Oxaguian — O Guerreiro Jovem</h3>
    <ul>
      <li><strong>Função:</strong> Guerra, justiça, coragem, militância</li>
      <li><strong>Cor:</strong> Vermelho e prata</li>
      <li><strong>Elemento:</strong> Fogo, metal</li>
    </ul>
    <h3>Oduduwa — O Pai da Humanidade</h3>
    <ul>
      <li><strong>Função:</strong> Criação, ancestrais, liderança, fundação</li>
      <li><strong>Cor:</strong> Verde e vermelho</li>
      <li><strong>Elemento:</strong> Terra, pedra</li>
    </ul>
    <h3>Ossaine — O Senhor das Folhas</h3>
    <ul>
      <li><strong>Função:</strong> Medicina, ervas, cura, conhecimento botânico</li>
      <li><strong>Cor:</strong> Verde e branco</li>
      <li><strong>Elemento:</strong> Floresta, plantas</li>
    </ul>
    <h3>Ibeji — Os Gêmeos Divinos</h3>
    <ul>
      <li><strong>Função:</strong> Alegria, infância, fertilidade, equilíbrio</li>
      <li><strong>Cor:</strong> Amarelo e azul</li>
      <li><strong>Elemento:</strong> Água doce, brinquedos</li>
    </ul>
    <h3>Dada — A Dona das Folhas</h3>
    <ul>
      <li><strong>Função:</strong> Natureza, cura, feminino, maternidade</li>
      <li><strong>Cor:</strong> Verde e branco</li>
      <li><strong>Elemento:</strong> Floresta, plantas</li>
    </ul>
    <h2>Como Escolher "Seu" Orixá?</h2>
    <p>Na tradição Yorubá, você não escolhe o Orixá — ele é revelado através da consulta oracular (Ifá ou Merindilogun). No entanto, é comum sentir atração natural por certos Orixás, o que pode ser um indicativo de qual divindade está mais presente na sua vida.</p>
    <p>Para uma identificação precisa, consulte um Babaláwo ou Iyalorixá de confiança.</p>
    ${articleFooter()}`
  },
  {
    id: '37',
    slug: 'oferendas-orixas-guia-pratico-para-cada-divindade',
    title: 'Oferendas para Orixás: Guia Prático para Cada Divindade',
    description: 'Guia completo e prático das oferendas para cada Orixá. Saiba o que oferecer, onde e como fazer oferendas corretas na tradição Yorubá.',
    publishedAt: '2026-07-16',
    tags: ['oferendas', 'orixás', 'ebó', 'ritual', 'yorubá', 'candomblé', 'ifá'],
    content: `<p>As <strong>oferendas</strong> (ebós) são a linguagem de comunicação entre os seres humanos e os Orixás. Cada divindade tem preferências específicas, e oferecer o que é certo no momento certo é fundamental para que a oferenda seja aceita.</p>
    <h2>Regras Gerais das Oferendas</h2>
    <ul>
      <li><strong>Limpeza:</strong> Sempre lave as mãos e o ambiente antes de fazer uma oferenda.</li>
      <li><strong>Intenção:</strong> A oferenda carrega sua intenção. Pense no que deseja enquanto oferece.</li>
      <li><strong>Respeito:</strong> Nunca faça uma oferenda com raiva ou má vontade.</li>
      <li><strong>Simplicidade:</strong> Uma oferenda simples feita com fé vale mais que uma complexa sem sentimento.</li>
    </ul>
    <h2>Oferendas por Orixá</h2>
    <h3>Oxalá (Obatala)</h3>
    <p><strong>Oferendas principais:</strong></p>
    <ul>
      <li>Acaçá (bolo de farinha de milho)</li>
      <li>Leite de coco</li>
      <li>Arroz branco</li>
      <li>Agua fresca em vaso de barro</li>
      <li>Mel branco</li>
    </ul>
    <p><strong>Local:</strong> Topo de morros, altares em casa, templos</p>
    <p><strong>Dica:</strong> Oxalá só aceita oferendas brancas. Nunca ofereça algo com cor.</p>
    <h3>Exu</h3>
    <p><strong>Oferendas principais:</strong></p>
    <ul>
      <li>Cachaça (preferencialmente de alho)</li>
      <li>Pipoca</li>
      <li>Farofa com azeite de dendê</li>
      <li>Feijão fradinho</li>
      <li>Carne assada</li>
    </ul>
    <p><strong>Local:</strong> Encruzilhadas, portões, entradas de casas</p>
    <p><strong>Dica:</strong> Exu gosta de falar diretamente. Ofereça com honestidade, sem rodeios.</p>
    <h3>Ogum</h3>
    <p><strong>Oferendas principais:</strong></p>
    <ul>
      <li>Feijão verde (carioquinha)</li>
      <li>Inhame cozido</li>
      <li>Feijoada</li>
      <li>Vinho tinto</li>
      <li>Ferramentas de ferro (facas, espadas pequenas)</li>
    </ul>
    <p><strong>Local:</strong> Estradas, trilhas, locais de construção</p>
    <p><strong>Dica:</strong> Ogum gosta de ação. Se está pedindo um caminho, mostre que está pronto para lutar.</p>
    <h3>Oxóssi</h3>
    <p><strong>Oferendas principais:</strong></p>
    <ul>
      <li>Milho cozido</li>
      <li>Frutas da mata (goiaba, caju, jabuticaba)</li>
      <li>Canjica amarela</li>
      <li>Mel</li>
      <li>Cerveja</li>
    </ul>
    <p><strong>Local:</strong> Matas, florestas, parques</p>
    <p><strong>Dica:</strong> Oxóssi é caçador. Se está pedindo prosperidade, mostre que valoriza a natureza.</p>
    <h3>Oxum</h3>
    <p><strong>Oferendas principais:</strong></p>
    <ul>
      <li>Mel</li>
      <li>Abóbora</li>
      <li>Milho</li>
      <li>Feijão-fradinho com dendê</li>
      <li>Banana</li>
      <li>Espelho</li>
    </ul>
    <p><strong>Local:</strong> Rios, cachoeiras, fontes de água doce</p>
    <p><strong>Dica:</strong> Oxum ama beleza. Ofereça com cuidado, tudo limpo e bonito.</p>
    <h3>Xangô</h3>
    <p><strong>Oferendas principais:</strong></p>
    <ul>
      <li>Amalá (quiabo com carne moída)</li>
      <li>Carurú</li>
      <li>Abará</li>
      <li>Vinho tinto</li>
      <li>Machadinha de madeira</li>
    </ul>
    <p><strong>Local:</strong> Pedreira, montanhas, cemitérios (entradas)</p>
    <p><strong>Dica:</strong> Xangô é rei e juiz. Ofereça com dignidade e verdade.</p>
    <h3>Iemanjá</h3>
    <p><strong>Oferendas principais:</strong></p>
    <ul>
      <li>Bolo de arroz</li>
      <li>Flores brancas</li>
      <li>Espelho</li>
      <li>Combing (pente)</li>
      <li>Água de coco</li>
      <li>Mel</li>
    </ul>
    <p><strong>Local:</strong> Mar, rios, lagos</p>
    <p><strong>Dica:</strong> 31 de dezembro é o dia principal de Iemanjá no Brasil. Muitas oferendas são levadas ao mar.</p>
    <h3>Nanã</h3>
    <p><strong>Oferendas principais:</strong></p>
    <ul>
      <li>Abóbora</li>
      <li>Inhame</li>
      <li>Arroz com feijão</li>
      <li>Água de chuva</li>
      <li>Flores roxas</li>
    </ul>
    <p><strong>Local:</strong> Beira de rios, pântanos, lama</p>
    <p><strong>Dica:</strong> Nanã é mãe da terra. Ofereça com humildade e gratidão.</p>
    <h3>Omolu (Obaluaye)</h3>
    <p><strong>Oferendas principais:</strong></p>
    <ul>
      <li>Pipoca</li>
      <li>Milho torrado</li>
      <li>Batata doce</li>
      <li>Feijão preto</li>
      <li>Água</li>
    </ul>
    <p><strong>Local:</strong> Terreiro, floresta, encruzilhadas</p>
    <p><strong>Dica:</strong> Omolu é sério. Ofereça com respeito e fé na cura.</p>
    <h3>Iansã</h3>
    <p><strong>Oferendas principais:</strong></p>
    <ul>
      <li>Carne de panela</li>
      <li>Melancia</li>
      <li>Vinho tinto</li>
      <li>Molho de pimenta</li>
      <li>Flores vermelhas</li>
    </ul>
    <p><strong>Local:</strong> Cemitérios, margens de rios, praias</p>
    <p><strong>Dica:</strong> Iansã é guerreira. Ofereça com coragem e determinação.</p>
    <h3>Oxumaré</h3>
    <p><strong>Oferendas principais:</strong></p>
    <ul>
      <li>Banana</li>
      <li>Milho</li>
      <li>Melancia</li>
      <li>Água de coco</li>
      <li>Fitas coloridas</li>
    </ul>
    <p><strong>Local:</strong> Encruzilhadas, beira de estradas</p>
    <p><strong>Dica:</strong> Oxumaré é dualidade. Ofereça equilibrando elementos.</p>
    <h2>O Que NÃO Fazer</h2>
    <ul>
      <li>Nunca ofereça algo podre ou estragado.</li>
      <li>Nunca ofereça o que o Orixá não gosta (ex: sal para Oxalá).</li>
      <li>Nunca faça oferendas com raiva ou má vontade.</li>
      <li>Nunca descarte oferendas em locais impróprios.</li>
    </ul>
    <p>As oferendas são um ato de amor e fé. Feitas com o coração, elas fortalecem a conexão com os Orixás e trazem equilíbrio à vida.</p>
    ${articleFooter()}`
  },
  {
    id: '38',
    slug: 'ervas-sagradas-usos-medicina-espiritual-ewo-osanyin',
    title: 'Ervas Sagradas: Usos na Medicina e na Espiritualidade Yorubá',
    description: 'Guia completo das ervas sagradas (Ewé) da tradição Yorubá. Conheça as principais folhas, seus usos medicinais e espirituais no Candomblé e Ifá.',
    publishedAt: '2026-07-16',
    tags: ['ervas', 'folhas', 'ewé', 'osanyin', 'medicina', 'espiritual', 'candomblé', 'ifá'],
    content: `<p>As <strong>ervas sagradas</strong> (Ewé na língua Yorubá) são fundamentais na tradição Yorubá. Cada Orixá tem suas folhas preferidas, e o conhecimento das ervas é tão importante quanto o conhecimento dos Orixás.</p>
    <h2>O Que é Ewé?</h2>
    <p>Ewé é a palavra Yorubá para "folha" ou "erva". Na tradição, as folhas são consideradas seres vivos com espíritos próprios, regidos pela divindade Osanyin (Ossaim), o senhor das folhas.</p>
    <p>Cada folha tem um uso específico: algumas são para cura, outras para proteção, outras para limpeza espiritual, outras para atração.</p>
    <h2>Principais Ervas e Seus Usos</h2>
    <h3>Para Limpeza e Descarrego</h3>
    <ul>
      <li><strong>Guiné:</strong> A mais poderosa para quebra de demandas e afastamento de energias pesadas. Usada em defumações e banhos.</li>
      <li><strong>Arruda:</strong> Corta feitiços e protege contra inveja e mau-olhado. Usada em defumações e patuás.</li>
      <li><strong>Espada de São Jorge:</strong> Proteção forte, afasta espíritos negativos. Usada em ramos e defumações.</li>
      <li><strong>Pinheiro:</strong> Purificação profunda e renovação de energias. Usado em defumações.</li>
    </ul>
    <h3>Para Proteção</h3>
    <ul>
      <li><strong>Alecrim:</strong> Proteção leve, atrai paz e bênçãos. Usado em defumações e chás.</li>
      <li><strong>Manjericão:</strong> Proteção e prosperidade. Muito usado em ambientes de trabalho.</li>
      <li><strong>Louro:</strong> Proteção e vitória. Consagrado a Xangô e Ogum.</li>
      <li><strong>Eucalipto:</strong> Limpeza de ambientes com doenças e purificação do ar.</li>
    </ul>
    <h3>Para Atração (Amor e Prosperidade)</h3>
    <ul>
      <li><strong>Rosa:</strong> Amor, harmonia e paz no lar. Pétalas usadas em banhos e oferendas.</li>
      <li><strong>Canela:</strong> Prosperidade, dinheiro e atração. Usada em defumações e banhos.</li>
      <li><strong>Cravo:</strong> Força, proteção e limpeza. Usado em defumações e patuás.</li>
      <li><strong>Incenso de Benjoim:</strong> Elevação espiritual e atração de boas energias.</li>
    </ul>
    <h3>Ervas de Cada Orixá</h3>
    <h4>Oxalá</h4>
    <ul>
      <li>Algodão, assa-peixe, cipreste, mutamba, samba-lobão</li>
    </ul>
    <h4>Ogum</h4>
    <ul>
      <li>Alfavaca-cravo, arruda,Boldo-do-Chile, espada-de-São-Jorge, louro</li>
    </ul>
    <h4>Oxóssi</h4>
    <ul>
      <li>Alfavaca-de-folha-miúda, arruda, cipó-nogueira, sapatinha, taioba</li>
    </ul>
    <h4>Oxum</h4>
    <ul>
      <li>Alfazema, arruda, cipó-nogueira, mutamba, sálvia</li>
    </ul>
    <h4>Xangô</h4>
    <ul>
      <li>Alfazema, arruda, espada-de-São-Jorge, louro, saboneteiro</li>
    </ul>
    <h4>Iemanjá</h4>
    <ul>
      <li>Agrião, arruda, cipó-mil-homens, picão-preto, samba-lobão</li>
    </ul>
    <h4>Nanã</h4>
    <ul>
      <li>Alfazema, arruda, cipreste, samba-lobão, terra</li>
    </ul>
    <h4>Omolu</h4>
    <ul>
      <li>Alfazema, arruda, espada-de-São-Jorge, pinheiro, sálvia</li>
    </ul>
    <h4>Iansã</h4>
    <ul>
      <li>Alfazema, arruda, espada-de-São-Jorge, lírio-do-campo, sálvia</li>
    </ul>
    <h2>Como Usar as Ervas</h2>
    <h3>Defumação</h3>
    <p>A defumação é o uso mais comum. As ervas são queimadas em carvão ou brasa, e a fumaça purifica o ambiente e as pessoas.</p>
    <h3>Banhos</h3>
    <p>Folhas fervidas em água são usadas para banhos de limpeza, proteção e atração. O banho deve ser tomado do pescoço para baixo, sem enxaguar.</p>
    <h3>Chás</h3>
    <p>Algumas ervas podem ser consumidas como chás para fins medicinais e espirituais. Sempre consulte um sacerdote antes de ingerir.</p>
    <h3>Patuás e Amuletos</h3>
    <p>Folhas secas são colocadas em patuás (saquinhos de tecido) para proteção pessoal.</p>
    <h2>Osanyin — O Senhor das Folhas</h2>
    <p>Osanyin (Ossaim) é o Orixá que guarda todo o conhecimento sobre as ervas sagradas. Ele é representado por uma haste de ferro com 12 ou 16 ramos, cada um simbolizando um tipo de folha.</p>
    <p>Na tradição, diz-se que "não há doença que não tenha cura, desde que se conheça a folha certa". Esse conhecimento é transmitido de geração em geração nos terreiros.</p>
    <h2>Precauções</h2>
    <ul>
      <li>Nunca use ervas sem orientação de um sacerdote experiente.</li>
      <li>Algumas ervas são tóxicas se ingeridas incorretamente.</li>
      <li>Respeite a natureza — não colha ervas de forma predatória.</li>
      <li>As ervas devem ser colhidas nos dias e horários certos, conforme a tradição.</li>
    </ul>
    <p>O conhecimento das ervas sagradas é um dos pilares da tradição Yorubá. Estudar e respeitar as folhas é honrar a sabedoria ancestral.</p>
    ${articleFooter()}`
  },
  {
    id: '39',
    slug: 'como-comecar-candomble-guia-iniciantes',
    title: 'Como Começar no Candomblé: Guia para Iniciantes',
    description: 'Guia completo para quem quer conhecer o Candomblé. Saiba como funciona, como encontrar um terreiro, o que esperar dos rituais e como iniciar sua jornada espiritual.',
    publishedAt: '2026-07-16',
    tags: ['candomblé', 'iniciantes', 'terreiro', 'yorubá', 'religião', 'espiritualidade'],
    content: `<p>O <strong>Candomblé</strong> é uma das tradições espirituais mais ricas e profundas do Brasil. Se você está curioso sobre essa religião ancestral, este guia vai ajudar a entender como começar.</p>
    <h2>O Que é o Candomblé?</h2>
    <p>O Candomblé é uma religião de matriz africana que surgiu no Brasil durante o período da escravidão. Os africanos trazidos para o Brasil mantiveram viva a fé nos Orixás, adaptando os rituais às novas condições de vida.</p>
    <p>O Candomblé é baseado na tradição Yorubá da Nigéria e Benim, e seus pilares são:</p>
    <ul>
      <li><strong>Os Orixás:</strong> Divindades que representam forças da natureza</li>
      <li><strong>A ancestralidade:</strong> Honra aos ancestrais que vieram antes de nós</li>
      <li><strong>A natureza:</strong> Respeito e conexão com o meio ambiente</li>
      <li><strong>A comunidade:</strong> O terreiro é uma família</li>
    </ul>
    <h2>Como Encontrar um Terreiro?</h2>
    <p>Encontrar um terreiro sério é o passo mais importante. Aqui vão dicas:</p>
    <ul>
      <li><strong>Procure indicações:</strong> Pergunte a pessoas de confiança que pratiquem a religião.</li>
      <li><strong>Visite vários terreiros:</strong> Não se contente com o primeiro. Cada terreiro tem uma energia diferente.</li>
      <li><strong>Observe:</strong> Note como os membros se tratam, como são recebidos os visitantes.</li>
      <li><strong>Pergunte:</strong> Um terreiro sério responde suas dúvidas com paciência e sem pressão.</li>
      <li><strong>Desconfie:</strong> De quem cobra valores absurdos, promete milagres ou exige segredo total.</li>
    </ul>
    <h2>O que Esperar na Primeira Visita?</h2>
    <p>A primeira visita ao terreiro geralmente é para assistir a um.axé (cerimônia). Aqui vai o que esperar:</p>
    <ul>
      <li><strong>Vestimenta:</strong> Use roupas brancas (se possível) ou discretas.</li>
      <li><strong>Respeito:</strong> Silêncio durante os rituais, não fotografar sem permissão.</li>
      <li><strong>Recepção:</strong> Você será recebido com hospitalidade. Não tenha vergonha de perguntar.</li>
      <li><strong>Duração:</strong> Os rituais podem durar horas. Tenha paciência.</li>
      <li><strong>Alimentação:</strong> Geralmente há comida compartilhada no final.</li>
    </ul>
    <h2>Como Funciona o Candomblé?</h2>
    <h3>A Estrutura do Terreiro</h3>
    <ul>
      <li><strong>Pai ou Mãe de Santo (Iyalorixá ou Babalorixá):</strong> Líder espiritual do terreiro.</li>
      <li><strong>Ogãs:</strong> Homens que servem os Orixás sem incorporar.</li>
      <li><strong>Iaquequerês:</strong> Assistentes do terreiro.</li>
      <li><strong>Médiuns:</strong> Pessoas que incorporam os Orixás durante as giras.</li>
      <li><strong>Acólitos:</strong> Pessoas em fase de aprendizado.</li>
    </ul>
    <h3>Os Rituais</h3>
    <ul>
      <li><strong>Gira:</strong> Cerimônia onde os Orixás se manifestam através dos médiuns.</li>
      <li><strong>axé:</strong> Dia de festa e trabalho com os Orixás.</li>
      <li><strong>Initiação:</strong> Ritual de entrada formal na religião (feche de cabeça).</li>
      <li><strong>Despacho:</strong> Trabalho espiritual para resolver problemas específicos.</li>
    </ul>
    <h2>Precisa Fazer Iniciação?</h2>
    <p>Não. Você pode frequentar o terreiro como visitante, participar das festas e receber orientações sem se iniciar. A iniciação é um passo sério e deve ser feita quando você estiver pronto.</p>
    <p>Muitas pessoas frequentam terreiros por anos antes de decidir se iniciam. Não há pressa.</p>
    <h2>O Que o Candomblé NÃO É</h2>
    <ul>
      <li><strong>NÃO é macumba:</strong> Macumba é um termo pejorativo usado para difamar a religião.</li>
      <li><strong>NÃO é magia negra:</strong> O Candomblé trabalha com forças da natureza para o bem.</li>
      <li><strong>NÃO é seita:</strong> Não há controle mental, nem proibição de ter outras amizades.</li>
      <li><strong>NÃO é para todos os momentos:</strong> Requer dedicação e respeito.</li>
    </ul>
    <h2>Dicas para Iniciantes</h2>
    <ul>
      <li>Estude antes de frequentar. Leia livros, assista documentários.</li>
      <li>Respeite a tradição — não tente adaptar à sua conveniência.</li>
      <li>Seja paciente — a espiritualidade não tem atalhos.</li>
      <li>Mantenha a fé — mesmo quando não entender tudo.</li>
      <li>Honre seus ancestrais — eles são a ponte entre você e os Orixás.</li>
    </ul>
    <p>Começar no Candomblé é uma jornada de vida. Com fé, respeito e paciência, você encontrará uma comunidade que acolhe e transforma.</p>
    ${articleFooter()}`
  },
  {
    id: '40',
    slug: 'por-que-exu-confundido-diabo-nao-e-o-diabo',
    title: 'Por que Exu é Confundido com o Diabo? A Verdade sobre a Figura de Exu',
    description: 'Entenda por que Exu da Umbanda e Candomblé NÃO é o diabo cristão. Descubra a verdadeira origem dessa confusão e qual é o papel real de Exu na espiritualidade.',
    publishedAt: '2026-07-16',
    tags: ['exu', 'diabo', 'umbanda', 'candomblé', 'preconceito', 'yorubá'],
    content: `<p>Uma das maiores confusões na espiritualidade brasileira é a associação de <strong>Exu com o diabo cristão</strong>. Essa confusão tem origem histórica e é alimentada pelo preconceito. Vamos esclarecer isso de uma vez por todas.</p>
    <h2>Quem é Exu na Tradição Yorubá?</h2>
    <p>Exu é uma das divindades mais importantes do panteão Yorubá. Ele é o <strong>guardião das encruzilhadas</strong>, o mensageiro entre os Orixás e os seres humanos, e o protetor dos limiares (portões, entradas, cruzamentos).</p>
    <p>Exu não é mau — ele é <strong>neutro</strong>. Ele é o "caroneiro" que leva as mensagens dos Orixás aos humanos e vice-versa. Sem Exu, nenhuma oferenda chegaria ao seu destino.</p>
    <h2>Origem da Confusão</h2>
    <p>A confusão começou durante a colonização portuguesa:</p>
    <ul>
      <li><strong>Evangelização forçada:</strong> Os colonizadores queriam erradicar a fé africana.</li>
      <li><strong>Estratégia de conversão:</strong> Associaram Exu ao diabo cristão para assustar os escravizados.</li>
      <li><strong>Preconceito:</strong> Qualquer prática africana era rotulada como "diabólica".</li>
      <li><strong>Falta de conhecimento:</strong> Os colonizadores não entenderam (ou não quiseram entender) a espiritualidade Yorubá.</li>
    </ul>
    <h2>Diferenças entre Exu e o Diabo</h2>
    <ul>
      <li><strong>Exu:</strong> Guardião das encruzilhadas, mensageiro, protetor, neutro.</li>
      <li><strong>Diabo:</strong> Inimigo de Deus, tentador, puro mal (na teologia cristã).</li>
    </ul>
    <p>Exu não "cai do céu" como anjo rebelde. Exu não tenta ninguém. Exu não é inimigo de Deus (Olodumare).</p>
    <h2>Os Muitos Faces de Exu</h2>
    <p>Exu não é apenas uma entidade — há diversos Exus com funções diferentes:</p>
    <ul>
      <li><strong>Exu Lagibá:</strong> Guardião das encruzilhadas, o mais conhecido.</li>
      <li><strong>Exu Tranca Ruas:</strong> Protege e abre caminhos.</li>
      <li><strong>Exu Caveira:</strong> Trabalha com morte e renascimento.</li>
      <li><strong>Exu Mirim:</strong> Exu jovem, protetor das crianças.</li>
      <li><strong>Exu do Muro:</strong> Protege as casas e famílias.</li>
    </ul>
    <h2>Por que a Confusão Persiste?</h2>
    <ul>
      <li><strong>Mídia:</strong> Filmes e séries retratam Exu como demônio.</li>
      <li><strong>Religiões evangélicas:</strong> Muitas continuam associando Exu ao diabo.</li>
      <li><strong>Ignorância:</strong> Pessoas que não conhecem a tradição repetem o preconceito.</li>
      <li><strong>Uso indevido:</strong> Algumas pessoas usam Exu para fins negativos, reforçando o estigma.</li>
    </ul>
    <h2>Como Respeitar Exu</h2>
    <ul>
      <li>Nunca chame Exu de "diabo" na frente de praticantes.</li>
      <li>Estude a tradição antes de emitir opinião.</li>
      <li>Respeite quem cultua Exu — é uma fé legítima.</li>
      <li>Lembre: Exu é essencial para que os Orixás cheguem até nós.</li>
    </ul>
    <p>Exu é uma figura respeitável e necessária na espiritualidade Yorubá. Entender isso é o primeiro passo para superar o preconceito.</p>
    ${articleFooter()}`
  },
  {
    id: '41',
    slug: 'verdadeira-funcao-pomba-gira-espiritualidade',
    title: 'A Verdadeira Função de uma Pomba Gira na Espiritualidade',
    description: 'Conheça o papel real das Pombas Giras na Umbanda e no Candomblé. Entenda por que elas são importantes e como trabalham pela transformação e equilíbrio.',
    publishedAt: '2026-07-16',
    tags: ['pomba-gira', 'umbanda', 'candomblé', 'espiritualidade', 'feminino'],
    content: `<p>As <strong>Pombas Giras</strong> são uma das figuras mais incompreendidas da espiritualidade brasileira. Muitas vezes associadas apenas a "magia negra" ou "amarração", elas têm um papel muito mais profundo e transformador.</p>
    <h2>O Que é uma Pomba Gira?</h2>
    <p>Pomba Gira é uma linha espiritual feminina que trabalha com forças da natureza, energia sexual, transformação e justiça. Elas são manifestações do princípio feminino em sua forma mais livre e independente.</p>
    <p>Assim como Exu é o guardião das encruzilhadas, Pomba Gira é a <strong>guardiã da liberdade feminina</strong> e da transformação pessoal.</p>
    <h2>Quem Foi Maria Padilha?</h2>
    <p>Maria Padilha é a Pomba Gira mais conhecida no Brasil. Segundo a tradição, ela foi uma mulher portuguesa que veio para o Brasil durante a colonização. Sua história varia conforme a linhagem, mas em todas elas ela representa a mulher que não se submete e luta pela sua liberdade.</p>
    <h2>As Muitas Pombas Giras</h2>
    <ul>
      <li><strong>Pomba Gira Rainha:</strong> A mais poderosa, lidera as outras.</li>
      <li><strong>Pomba Gira Maria Padilha:</strong> A mais famosa, protetora do amor.</li>
      <li><strong>Pomba Gira Das Almas:</strong> Trabalha com ancestrais e mortos.</li>
      <li><strong>Pomba Gira Rainha do Farol:</strong> Ilumina caminhos e protege viajantes.</li>
      <li><strong>Pomba Gira Tranca-Rua:</strong> Protege e resolve problemas difíceis.</li>
    </ul>
    <h2>A Função Real das Pombas Giras</h2>
    <ul>
      <li><strong>Transformação:</strong> Elas ajudam a pessoa a se libertar de situações que a prendem.</li>
      <li><strong>Proteção feminina:</strong> Protegem mulheres de agressões e abusos.</li>
      <li><strong>Justiça:</strong> Trabalham contra injustiças e abusos de poder.</li>
      <li><strong>Liberdade:</strong> Ajudam pessoas a encontrarem sua verdadeira identidade.</li>
      <li><strong>Equilíbrio:</strong> Restauram o equilíbrio emocional e espiritual.</li>
    </ul>
    <h2>Pomba Gira e Amor</h2>
    <p>A associação de Pomba Gira com "amarração amorosa" é um dos maiores equívocos. Na verdade:</p>
    <ul>
      <li>Pomba Gira <strong>liberta</strong> pessoas de relacionamentos tóxicos.</li>
      <li>Ela <strong>fortalece</strong> a autoestima e a independência.</li>
      <li>Ela <strong>protege</strong> quem sofre violência doméstica.</li>
    </ul>
    <p>Trabalhos de "amarração" com Pomba Gira são, na verdade, trabalhos de <strong>proteção e liberdade</strong>, não de aprisionamento.</p>
    <h2>Como se Relacionar com Pomba Gira</h2>
    <ul>
      <li>Respeite — ela é uma entidade séria e poderosa.</li>
      <li>Não peça coisas negativas — ela trabalha pelo bem.</li>
      <li>Seja honesto — ela sabe tudo sobre você.</li>
      <li>Agradeça — a gratidão é fundamental.</li>
    </ul>
    <p>Pomba Gira é uma energia de transformação e liberdade. Entender isso é superar o preconceito e acessar uma das forças mais poderosas da espiritualidade brasileira.</p>
    ${articleFooter()}`
  },
  {
    id: '42',
    slug: 'amarração-amorosa-pomba-gira-perigo-pecado',
    title: 'É Perigoso ou Pecado Fazer Amarração Amorosa com Pomba Gira?',
    description: 'Verdade sobre amarração amorosa com Pomba Gira. Entenda o que realmente acontece nesses trabalhos e por que a maioria não é o que parece.',
    publishedAt: '2026-07-16',
    tags: ['pomba-gira', 'amarração', 'amor', 'umbanda', 'candomblé'],
    content: `<p>A pergunta sobre <strong>amarração amorosa com Pomba Gira</strong> é uma das mais frequentes na internet. Vamos esclarecer a verdade sobre esse tema.</p>
    <h2>O Que é Amarração Amorosa?</h2>
    <p>A amarração amorosa é um trabalho espiritual que visa prender a vontade de uma pessoa, forçando-a a amar ou voltar para quem fez o trabalho.</p>
    <p><strong>Importante:</strong> Na tradição séria da Umbanda e do Candomblé, amarrações que forçam a vontade de outra pessoa são <strong>antiéticas</strong> e geram débito espiritual.</p>
    <h2>Por que as Pessoas Buscam Amarrações?</h2>
    <ul>
      <li>Medo de perder o parceiro</li>
      <li>Dependência emocional</li>
      <li>Revanchismo ("ele me largou, vou prender ele")</li>
      <li>Falta de autoestima</li>
    </ul>
    <h2>O Que Acontece de Verdade?</h2>
    <p>Quando alguém busca uma "amarração" com Pomba Gira, o que geralmente acontece é:</p>
    <ul>
      <li><strong>Trabalho de proteção:</strong> A pessoa é protegida de morens tóxicos.</li>
      <li><strong>Trabalho de corte:</strong> O vínculo doentio é cortado para libertar a pessoa.</li>
      <li><strong>Trabalho de autonomia:</strong> A pessoa recupera sua independência emocional.</li>
    </ul>
    <p>Pombas Giras sérias <strong>não prendem</strong> — elas <strong>libertam</strong>.</p>
    <h2>É Pecado?</h2>
    <p>Na perspectiva cristã, sim. Na perspectiva da Umbanda/Candomblé:</p>
    <ul>
      <li><strong>Aprender a vontade de alguém:</strong> É antiético e gera débito.</li>
      <li><strong>Proteger alguém de um relacionamento tóxico:</strong> É ético e benéfico.</li>
      <li><strong>Fortalecer alguém para superar uma separação:</strong> É ético e benéfico.</li>
    </ul>
    <h2>Consequências de uma Amarração</h2>
    <ul>
      <li><strong>Para quem faz:</strong> Débito espiritual, dependência, sofrimento futuro.</li>
      <li><strong>Para quem sofre:</strong> Perda de livre-arbítrio, desequilíbrio emocional.</li>
      <li><strong>Para o relacionamento:</strong> Não há amor real — apenas force.</li>
    </ul>
    <h2>O Que Fazer em Vez de Amarração?</h2>
    <ul>
      <li><strong>Trabalho de corte:</strong> Liberte-se do relacionamento doentio.</li>
      <li><strong>Trabalho de autoestima:</strong> Fortaleça-se para atrair o amor certo.</li>
      <li><strong>Trabalho de prosperidade amorosa:</strong> Atraia alguém compatível.</li>
      <li><strong>Terapia:</strong> Busque ajuda profissional para superar a dependência.</li>
    </ul>
    <p>A verdadeira espiritualidade trabalha pela liberdade, não pela prisão. Desconfie de quem oferece amarrações — provavelmente não é alguém sério.</p>
    ${articleFooter()}`
  },
  {
    id: '43',
    slug: 'exu-caveira-verdade-historia',
    title: 'Quem é o Exu Caveira? A Verdadeira História',
    description: 'Conheça a verdadeira história do Exu Caveira, uma das entidades mais temidas e respeitadas da Umbanda. Entenda sua função e por que ele não é perigoso.',
    publishedAt: '2026-07-16',
    tags: ['exu', 'exu-caveira', 'umbanda', 'morte', 'transformação'],
    content: `<p>O <strong>Exu Caveira</strong> é uma das entidades mais temidas e incompreendidas da Umbanda. Muitas pessoas têm medo dele, mas a verdade é que ele é um dos Exus mais importantes e benéficos.</p>
    <h2>Quem é o Exu Caveira?</h2>
    <p>O Exu Caveira é a manifestação de Exu que trabalha com a <strong>morte e o renascimento</strong>. Ele é representado por uma caveira (crânio) e trabalha nos cemitérios e locais de transição.</p>
    <p>Ele não é um "assassino" — ele é o <strong>guardião da transição</strong> entre a vida e a morte.</p>
    <h2>Qual é a Função do Exu Caveira?</h2>
    <ul>
      <li><strong>Proteção contra morte prematura:</strong> Ele afasta energias que podem causar acidentes ou doenças fatais.</li>
      <li><strong>Transformação:</strong> Ele ajuda a pessoa a "morrer" para o que não serve mais e renascer.</li>
      <li><strong>Cura de doenças graves:</strong> Ele trabalha com doenças que a medicina não consegue explicar.</li>
      <li><strong>Proteção de cemitérios:</strong> Ele guardia os cemitérios e afasta espíritos negativos.</li>
    </ul>
    <h2>Por que Ele é "Assustador"?</h2>
    <p>O Exu Caveira é assustador porque trabalha com a <strong>morte</strong> — um tema que todos temem. Mas na espiritualidade:</p>
    <ul>
      <li>Morte não é o fim — é transição.</li>
      <li>Exu Caveira não mata — ele protege.</li>
      <li>Ele é como um médico que faz cirurgias difíceis — parece assustador, mas salva vidas.</li>
    </ul>
    <h2>Como se Relacionar com o Exu Caveira?</h2>
    <ul>
      <li><strong>Respeito:</strong> Ele é uma entidade séria e poderosa.</li>
      <li><strong>Fé:</strong> Crer que ele pode ajudar.</li>
      <li><strong>Gratidão:</strong> Agradecer pelas proteções recebidas.</li>
      <li><strong>Não ter medo:</strong> Medo bloqueia a ajuda dele.</li>
    </ul>
    <h2>Oferendas para o Exu Caveira</h2>
    <ul>
      <li>Cachaça</li>
      <li>Cigarro</li>
      <li>Pipoca</li>
      <li>Farofa de azeite</li>
      <li>Flores brancas e vermelhas</li>
    </ul>
    <p>O Exu Caveira é um protetor poderoso. Entender sua função é superar o medo e acessar uma das energias mais transformadoras da Umbanda.</p>
    ${articleFooter()}`
  },
  {
    id: '44',
    slug: 'deixar-cachaca-cigarro-pade-encruzilhada',
    title: 'O que Significa Deixar Cachaça, Cigarro ou Padê na Encruzilhada?',
    description: 'Entenda o significado de deixar oferendas na encruzilhada para Exu. Saiba o que é um padê, quando fazer e como oferecer corretamente.',
    publishedAt: '2026-07-16',
    tags: ['exu', 'padê', 'encruzilhada', 'oferenda', 'umbanda'],
    content: `<p>Deixar oferendas na <strong>encruzilhada</strong> é uma das práticas mais comuns da Umbanda e do Candomblé. Mas o que significa isso na prática?</p>
    <h2>O Que é uma Encruzilhada?</h2>
    <p>A encruzilhada é o local onde duas ou mais estradas se encontram. Na espiritualidade Yorubá, ela é o <strong>ponto de encontro entre o mundo dos vivos e o mundo espiritual</strong>.</p>
    <p>Exu é o guardião das encruzilhadas — é por isso que as oferendas são deixadas nesses locais.</p>
    <h2>O Que é um Padê?</h2>
    <p>O padê é uma oferenda completa para Exu, geralmente contendo:</p>
    <ul>
      <li>Cachaça (vinho de cana)</li>
      <li>Cigarro</li>
      <li>Pipoca</li>
      <li>Farofa com azeite de dendê</li>
      <li>Feijão fradinho</li>
      <li>Carne assada</li>
    </ul>
    <p>O padê é uma oferenda de <strong>agradecimento e pedido</strong>. É como convidar Exu para uma refeição.</p>
    <h2>Quando Fazer um Padê?</h2>
    <ul>
      <li><strong>Na segunda-feira:</strong> Dia de Exu.</li>
      <li><strong>Quando pede uma graça:</strong> Antes de algo importante.</li>
      <li><strong>Em agradecimento:</strong> Depois de receber algo pedido.</li>
      <li><strong>Em desobrigação:</strong> Para saldar débitos espirituais.</li>
    </ul>
    <h2>Como Fazer o Padê?</h2>
    <ol>
      <li><strong>Limpeza:</strong> Lave as mãos e o local.</li>
      <li><strong>Intenção:</strong> Pense no que deseja pedir ou agradecer.</li>
      <li><strong>Preparação:</strong> Coloque os alimentos em um prato de barro ou papel.</li>
      <li><strong>Oração:</strong> Fale com Exu de coração, explicando o motivo.</li>
      <li><strong>Depósito:</strong> Deixe o padê no centro da encruzilhada.</li>
      <li><strong>Saída:</strong> Vá embora sem olhar para trás.</li>
    </ol>
    <h2>O Que Significa Cachaça para Exu?</h2>
    <p>Cachaça é a bebida mais associada a Exu. Ela representa:</p>
    <ul>
      <li><strong>Força:</strong> A energia da cana-de-açúcar.</li>
      <li><strong>Coragem:</strong> O "fogo" que limpa e protege.</li>
      <li><strong>Comunicação:</strong> A cachaça "abre o caminho" para as mensagens.</li>
    </ul>
    <h2>O Que Significa Cigarro para Exu?</h2>
    <p>Cigarro representa:</p>
    <ul>
      <li><strong>Fumaça:</strong> Que sobe e leva as mensagens.</li>
      <li><strong>Paz:</strong> O ato de sentar e fumar é de contemplação.</li>
      <li><strong>Comunicação:</strong> Fumar junto é ato de convívio.</li>
    </ul>
    <h2>Precauções</h2>
    <ul>
      <li>Nunca faça padê com raiva ou má vontade.</li>
      <li>Nunca volte para pegar o que deixou.</li>
      <li>Nunca faça padê para fins negativos.</li>
      <li>Se não tem certeza, consulte um sacerdote.</li>
    </ul>
    <p>O padê é um ato de fé e respeito. Feito com o coração, abre caminhos e traz proteção.</p>
    ${articleFooter()}`
  },
  {
    id: '45',
    slug: 'diferenca-exu-orixa-exu-entidade-trabalhador',
    title: 'Qual a Diferença entre o Exu Orixá e o Exu Entidade/Trabalhador?',
    description: 'Entenda a diferença fundamental entre Exu como Orixá (divindade) e Exu como entidade trabalhadora na Umbanda e no Candomblé.',
    publishedAt: '2026-07-16',
    tags: ['exu', 'orixá', 'entidade', 'umbanda', 'candomblé'],
    content: `<p>Uma das confusões mais comuns na espiritualidade é a diferença entre <strong>Exu Orixá</strong> e <strong>Exu Entidade</strong>. Vamos esclarecer isso.</p>
    <h2>Exu Orixá</h2>
    <p>O Exu Orixá é a <strong>divindade maior</strong> — Exu Lagibá (ou Exu Marabo). Ele é:</p>
    <ul>
      <li><strong>Divindade:</strong> Uma força da natureza criada por Olodumare.</li>
      <li><strong>Guardião das encruzilhadas:</strong> Protege todas as encruzilhadas do mundo.</li>
      <li><strong>Presente em todos os terreiros:</strong> Todo terreiro tem uma representação de Exu Lagibá.</li>
      <li><strong>Cultuado coletivamente:</strong> Suas oferendas são feitas em grupo, no terreiro.</li>
    </ul>
    <h2>Exu Entidade/Trabalhador</h2>
    <p>O Exu Entidade é uma <strong>manifestação individual</strong> de Exu que trabalha com uma pessoa específica. Ele é:</p>
    <ul>
      <li><strong>Entidade:</strong> Uma manifestação de Exu que pode ter vindo como humano.</li>
      <li><strong>Trabalhador:</strong> Trabalha diretamente com uma pessoa (seu "filho" ou consulente).</li>
      <li><strong>Individual:</strong> Cada pessoa tem seu Exu de trabalho.</li>
      <li><strong>Cultuado individualmente:</strong> Suas oferendas são feitas pela pessoa.</li>
    </ul>
    <h2>Diferenças Práticas</h2>
    <ul>
      <li><strong>Orixá:</strong> É como o "governo" — cuida de todos.</li>
      <li><strong>Entidade:</strong> É como o "advogado pessoal" — cuida de você.</li>
    </ul>
    <h2>Como Saber Qual é o Meu Exu?</h2>
    <p>Para descobrir qual Exu trabalha com você, consulte um Babaláwo ou Médium experiente. Geralmente é revelado através de:</p>
    <ul>
      <li>Consulta com Obi (coco)</li>
      <li>Consulta com Merindilogun (16 coco)</li>
      <li>Incorporação em gira</li>
    </ul>
    <h2>Posso Trabalhar com Exu sem Ser Iniciado?</h2>
    <p>Sim, você pode:</p>
    <ul>
      <li>Fazer padê na encruzilhada</li>
      <li>Acender vela de segunda-feira</li>
      <li>Pedir proteção</li>
    </ul>
    <p>Mas para trabalhos mais profundos, é necessário iniciar-se em um terreiro.</p>
    <h2>Conclusão</h2>
    <p>Tanto Exu Orixá quanto Exu Entidade são importantes. O primeiro cuida de todos, o segundo cuida de você. Ambos trabalham pelo equilíbrio e proteção.</p>
    ${articleFooter()}`
  },
  {
    id: '46',
    slug: 'pomba-gira-maria-padilha-famosa-historia',
    title: 'Quem é a Pomba Gira Maria Padilha e Por que Ela é Tão Famosa?',
    description: 'Conheça a história de Maria Padilha, a Pomba Gira mais famosa do Brasil. Entenda por que ela é tão cultuada e qual é sua verdadeira função.',
    publishedAt: '2026-07-16',
    tags: ['pomba-gira', 'maria-padilha', 'umbanda', 'candomblé', 'amor'],
    content: `<p><strong>Maria Padilha</strong> é a Pomba Gira mais conhecida e cultuada do Brasil. Sua fama vai além dos terreiros — ela é conhecida até por quem não pratica a religião.</p>
    <h2>Quem foi Maria Padilha?</h2>
    <p>A história de Maria Padilha varia conforme a linhagem, mas a versão mais comum é:</p>
    <ul>
      <li><strong>Origem:</strong> Maria Padilha foi uma mulher portuguesa que veio para o Brasil durante a colonização.</li>
      <li><strong>Período:</strong> Séculos XVI-XVII.</li>
      <li><strong>Profissão:</strong> Alguns dizem que era prostitua, outros que era uma mulher livre e independente.</li>
      <li><strong>Morte:</strong> Morreu no Brasil, mas sua energia permaneceu forte.</li>
    </ul>
    <p>Na espiritualidade, Maria Padilha é uma <strong>Pomba Gira Rainha</strong> — a mais poderosa das Pombas Giras.</p>
    <h2>Por que Ela é Tão Famosa?</h2>
    <ul>
      <li><strong>Resultados:</strong> Dizem que ela resolve problemas difíceis.</li>
      <li><strong>Proteção:</strong> Ela protege mulheres de agressões.</li>
      <li><strong>Amor:</strong> Ela ajuda em questões amorosas (mas não de amarração).</li>
      <li><strong>Carisma:</strong> Ela tem uma energia muito forte e marcante.</li>
      <li><strong>Mídia:</strong> Filmes e novelas mencionaram Maria Padilha.</li>
    </ul>
    <h2>Qual é a Verdadeira Função?</h2>
    <ul>
      <li><strong>Proteção feminina:</strong> Ela é a guardiã das mulheres.</li>
      <li><strong>Libertação:</strong> Ela ajuda mulheres a se libertarem de relacionamentos abusivos.</li>
      <li><strong>Justiça:</strong> Ela trabalha contra injustiças contra mulheres.</li>
      <li><strong>Fortalecimento:</strong> Ela ajuda mulheres a encontrarem sua força interior.</li>
    </ul>
    <h2>Como se Relacionar com Maria Padilha?</h2>
    <ul>
      <li><strong>Respeito:</strong> Ela é uma entidade séria e poderosa.</li>
      <li><strong>Honestidade:</strong> Ela sabe tudo — não minta.</li>
      <li><strong>Gratidão:</strong> Agradeça pelas ajudas recebidas.</li>
      <li><strong>Não peça coisas negativas:</strong> Ela trabalha pelo bem.</li>
    </ul>
    <h2>Oferendas para Maria Padilha</h2>
    <ul>
      <li>Perfume (rosa ou jasmim)</li>
      <li>Batom vermelho</li>
      <li>Cigarro</li>
      <li>Café sem açúcar</li>
      <li>Moeda</li>
      <li>Flores vermelhas</li>
    </ul>
    <h2>Precauções</h2>
    <ul>
      <li>Nunca peça para Maria Padilha fazer mal a alguém.</li>
      <li>Nunca use o nome dela para intimidar.</li>
      <li>Nunca minta — ela puni mentirosos.</li>
    </ul>
    <p>Maria Padilha é uma entidade poderosa e benéfica. Entender sua verdadeira função é superar o preconceito e acessar uma energia de proteção e libertação.</p>
    ${articleFooter()}`
  },
  {
    id: '47',
    slug: 'como-pedir-protecao-exu-tranca-ruas',
    title: 'Como Pedir Proteção ao Exu Tranca Ruas?',
    description: 'Guia completo para pedir proteção ao Exu Tranca Ruas. Saiba como funciona, quando pedir e como fazer uma oferenda simples para ele.',
    publishedAt: '2026-07-16',
    tags: ['exu', 'tranca-ruas', 'proteção', 'umbanda', 'caminhos'],
    content: `<p>O <strong>Exu Tranca Ruas</strong> é um dos Exus mais procurados para resolver problemas de caminhos bloqueados e situações difíceis.</p>
    <h2>Quem é o Exu Tranca Ruas?</h2>
    <p>O Exu Tranca Ruas é a manifestação de Exu que <strong>abre e tranca caminhos</strong>. Ele é:</p>
    <ul>
      <li><strong>Protetor:</strong> Fecha portas que não devem ser abertas.</li>
      <li><strong>Abridor:</strong> Abre portas que estão trancadas.</li>
      <li><strong>Guardião:</strong> Protege contra inimigos e inveja.</li>
    </ul>
    <h2>Quando Pedir ao Exu Tranca Ruas?</h2>
    <ul>
      <li><strong>Caminhos bloqueados:</strong> Quando tudo parece dar errado.</li>
      <li><strong>Problemas judiciais:</strong> Processos, advogados, tribunais.</li>
      <li><strong>Problemas financeiros:</strong> Dívidas, falta de dinheiro.</li>
    </ul>
    <h2>Como Pedir?</h2>
    <ol>
      <li><strong>Limpeza:</strong> Lave as mãos e o ambiente.</li>
      <li><strong>Intenção:</strong> Claramente diga o que precisa.</li>
      <li><strong>Oferenda:</strong> Deixe o padê na encruzilhada.</li>
      <li><strong>Oração:</strong> Fale com sinceridade.</li>
      <li><strong>Agradecimento:</strong> Agradeça antecipadamente.</li>
    </ol>
    <h2>Oferendas para o Exu Tranca Ruas</h2>
    <ul>
      <li>Cachaça</li>
      <li>Cigarro</li>
      <li>Pipoca</li>
      <li>Farofa de azeite</li>
      <li>Moeda</li>
    </ul>
    <h2>Pontos Cantados</h2>
    <p>O ponto mais conhecido do Exu Tranca Ruas é:</p>
    <p>"Tranca ruas, tranca pra abrir, tranca pra fechar. Eu tranco as ruas dos meus inimigos, e abro as ruas do meu bem."</p>
    <h2>Dicas</h2>
    <ul>
      <li>Seja específico no pedido.</li>
      <li>Não peça coisas negativas.</li>
      <li>Acredite que vai resolver.</li>
      <li>Se não resolver, consulte um sacerdote.</li>
    </ul>
    <p>O Exu Tranca Ruas é um protetor poderoso. Com fé e respeito, ele pode abrir caminhos onde tudo parecia fechado.</p>
    ${articleFooter()}`
  },
  {
    id: '48',
    slug: 'entidade-mais-forte-umbanda-resposta',
    title: 'Qual é a Entidade Mais Forte da Umbanda?',
    description: 'Descubra qual é a entidade mais poderosa da Umbanda e por que. Entenda que a força não depende da entidade, mas da conexão com ela.',
    publishedAt: '2026-07-16',
    tags: ['umbanda', 'entidade', 'força', 'espiritualidade'],
    content: `<p>Uma das perguntas mais frequentes na internet é: <strong>"Qual é a entidade mais forte da Umbanda?"</strong> A resposta pode surpreendê-lo.</p>
    <h2>Não Há uma "Mais Forte"</h2>
    <p>A verdade é que <strong>não existe uma entidade "mais forte"</strong> que as outras. Cada entidade tem sua função e sua força específica:</p>
    <ul>
      <li><strong>Orixás:</strong> São as divindades maiores — forças da natureza.</li>
      <li><strong>Exus:</strong> São os guardiões e mensageiros.</li>
      <li><strong>Pretos Velhos:</strong> São curadores e conselheiros.</li>
      <li><strong>Caboclos:</strong> São guerreiros e protetores.</li>
      <li><strong>Pombas Giras:</strong> São transformadoras e libertadoras.</li>
    </ul>
    <h2>O Que Determina a "Força"?</h2>
    <p>A força de uma entidade não depende dela — depende da <strong>conexão</strong> com ela:</p>
    <ul>
      <li><strong>Fé:</strong> Quanto mais fé, mais forte a conexão.</li>
      <li><strong>Respeito:</strong> Respeitar a entidade fortalece o vínculo.</li>
      <li><strong>Obediência:</strong> Seguir as orientações da entidade.</li>
      <li><strong>Consagração:</strong> Uma entidade bem consagrada é mais forte.</li>
    </ul>
    <h2>A Entidade Mais Forte Para VOCÊ</h2>
    <p>A entidade mais forte é a que <strong>trabalha com você</strong> — seu Orixá de cabeça, seu Exu de trabalho, sua Pomba Gira.</p>
    <p>Uma pessoa que tem fé no Preto Velho e segue suas orientações terá mais resultado do que alguém que busca a "entidade mais forte" sem compromisso.</p>
    <h2>Mitos</h2>
    <ul>
      <li><strong>"Exu é mais forte que Orixá":</strong> Falso. Exu trabalha com Orixás, não contra eles.</li>
      <li><strong>"Pomba Gira é mais forte que Preto Velho":</strong> Falso. São funções diferentes.</li>
      <li><strong>"Quanto mais entidades, mais forte":</strong> Falso. Uma conexão profunda vale mais que dez superficiais.</li>
    </ul>
    <h2>Conclusão</h2>
    <p>A "entidade mais forte" é a que você mais se conecta. Invista nessa conexão, não em busca de poder.</p>
    ${articleFooter()}`
  },
  {
    id: '49',
    slug: 'umbanda-acredita-deus-dogmas',
    title: 'A Umbanda Acredita em Deus? Quais São Seus Dogmas?',
    description: 'Entenda se a Umbanda acredita em Deus, como ela concebe o divino e quais são seus princípios e dogmas fundamentais.',
    publishedAt: '2026-07-16',
    tags: ['umbanda', 'deus', 'dogmas', 'espiritualidade', 'princípios'],
    content: `<p>Uma das dúvidas mais comuns sobre a Umbanda é: <strong>"A Umbanda acredita em Deus?"</strong> A resposta é sim, mas de uma forma diferente do cristianismo.</p>
    <h2>Como a Umbanda Concebe Deus?</h2>
    <p>A Umbanda acredita em <strong>Olodumare</strong> (ou Olorum), que é o Deus Supremo, criador de todas as coisas. No entanto:</p>
    <ul>
      <li><strong>Não tem imagem:</strong> Olodumare é invisível, intocável.</li>
      <li><strong>Não tem templo:</strong> Não se faz "igreja" para Olodumare.</li>
      <li><strong>Não se invoca diretamente:</strong> Os Orixás são os intermediários.</li>
    </ul>
    <h2>Diferenças com o Cristianismo</h2>
    <ul>
      <li><strong>Cristianismo:</strong> Deus é pai, tem filho (Jesus), tem Espírito Santo.</li>
      <li><strong>Umbanda:</strong> Olodumare é o criador supremo, os Orixás são suas forças na terra.</li>
    </ul>
    <h2>Os Princípios da Umbanda</h2>
    <ol>
      <li><strong>Crença em Um Deus Supremo:</strong> Olodumare.</li>
      <li><strong>Imortalidade da alma:</strong> A alma continua vivendo após a morte.</li>
      <li><strong>Reencarnação:</strong> A alma renasce para evoluir.</li>
      <li><strong>Assistência dos espíritos:</strong> Os espíritos (Orixás, Pretos Velhos, etc.) ajudam os vivos.</li>
      <li><strong>Livre-arbítrio:</strong> Cada pessoa escolhe seu caminho.</li>
      <li><strong>Caridade:</strong> Ajudar o próximo é o maior mandamento.</li>
    </ol>
    <h2>A Umbanda é Religião ou Seita?</h2>
    <p>A Umbanda é uma <strong>religião legítima</strong>, reconhecida pelo Estado brasileiro. Não é seita porque:</p>
    <ul>
      <li>Não proíbe contato com familiares.</li>
      <li>Não exige doações obrigatórias.</li>
      <li>Não controla a vida dos membros.</li>
      <li>Respeita o livre-arbítrio.</li>
    </ul>
    <h2>Conclusão</h2>
    <p>A Umbanda acredita em Deus (Olodumare), mas de uma forma mais ampla e inclusiva. Seus princípios são baseados em caridade, amor e respeito à vida.</p>
    ${articleFooter()}`
  },
  {
    id: '50',
    slug: 'tomar-passe-umbanda-o-que-e-o-que-sente',
    title: 'O que é Tomar Passe na Umbanda e O que se Sente?',
    description: 'Entenda o que é tomar passe na Umbanda, como funciona o ritual e quais são as sensações que a pessoa sente durante e depois do passe.',
    publishedAt: '2026-07-16',
    tags: ['passe', 'umbanda', 'limpeza', 'espiritual', 'benzimento'],
    content: `<p><strong>Tomar passe</strong> é uma das práticas mais comuns da Umbanda. Mas o que é isso na prática?</p>
    <h2>O Que é um Passe?</h2>
    <p>O passe é um <strong>ritual de limpeza e proteção espiritual</strong>. É feito por um médium ou sacerdote que passa as mãos (ou ferramentas) sobre o corpo da pessoa para remover energias negativas e trazer equilíbrio.</p>
    <h2>Como Funciona?</h2>
    <ol>
      <li><strong>Preparação:</strong> A pessoa senta ou fica em pé, relaxada.</li>
      <li><strong>Invocação:</strong> O médium invoca a entidade que vai fazer o passe.</li>
      <li><strong>Passadas:</strong> O médium passa as mãos ou ferramentas (velas, ramas, folhas) sobre o corpo da pessoa.</li>
      <li><strong>Despacho:</strong> Às vezes, o médium faz um despacho (joga água, flor de laranjeira, etc.).</li>
      <li><strong>Oração:</strong> O médium faz uma oração final de proteção.</li>
    </ol>
    <h2>O que se Sente durante o Passe?</h2>
    <ul>
      <li><strong>Calor:</strong> Muitas pessoas sentem uma onda de calor passando pelo corpo.</li>
      <li><strong>Tontura leve:</strong> Pode haver uma leve tontura, sinal de que energias estão sendo removidas.</li>
      <li><strong>Formigamento:</strong> Sensação de formigamento nas mãos ou no corpo.</li>
      <li><strong>Alívio:</strong> Sensação imediata de alívio e leveza.</li>
      <li><strong>Choro:</strong> Algumas pessoas choram, liberando emoções reprimidas.</li>
    </ul>
    <h2>O que se Sente depois do Passe?</h2>
    <ul>
      <li><strong>Leveza:</strong> Sensação de que um peso foi tirado dos ombros.</li>
      <li><strong>Paz:</strong> Calma e serenidade.</li>
      <li><strong>Sono:</strong> Muitas pessoas sentem sono depois do passe.</li>
      <li><strong> Clareza:</strong> Pensamentos mais claros e objetivos.</li>
    </ul>
    <h2>Quando Tomar Passe?</h2>
    <ul>
      <li>Quando se sente pesado ou "azarado".</li>
      <li>Depois de um contato com pessoas que drenam energia.</li>
      <li>Antes de uma situação importante (prova, reunião, viagem).</li>
      <li>Quando se passa por um momento difícil.</li>
      <li>Como manutenção espiritual periódica.</li>
    </ul>
    <h2>Tipos de Passe</h2>
    <ul>
      <li><strong>Passe de mão:</strong> O mais comum, feito apenas com as mãos.</li>
      <li><strong>Passe de vela:</strong> Utiliza uma vela acesa para limpar.</li>
      <li><strong>Passe de ramas:</strong> Utiliza ramos de plantas (alfazema, arruda, etc.).</li>
      <li><strong>Passe de água:</strong> Utiliza água com ervas.</li>
    </ul>
    <h2>Dicas</h2>
    <ul>
      <li>Relaxe e confie no médium.</li>
      <li>Não resista às sensações — elas são normais.</li>
      <li>Beba água depois do passe.</li>
      <li>Descanse um pouco antes de voltar às atividades.</li>
    </ul>
    <p>Tomar passe é uma prática simples e poderosa de limpeza espiritual. Com fé e abertura, os resultados são imediatos.</p>
    ${articleFooter()}`
  },
  {
    id: '51',
    slug: 'como-saber-se-tenho-orixa-na-cabeca',
    title: 'Como Saber se Tenho um Orixá na Cabeça?',
    description: 'Entenda o que significa ter um Orixá de cabeça e como descobrir qual é a sua divindade guia na Umbanda e no Candomblé.',
    publishedAt: '2026-07-16',
    tags: ['orixá', 'cabeça', 'iniciação', 'umbanda', 'candomblé'],
    content: `<p>Uma das perguntas mais comuns para quem está iniciando na espiritualidade é: <strong>"Como saber se tenho um Orixá na cabeça?"</strong></p>
    <h2>O Que Significa Ter Orixá na Cabeça?</h2>
    <p>Ter um Orixá na cabeça significa que você já passou pelo <strong>fechamento de cabeça</strong> (iniciação menor) ou pela <strong>iniciação maior</strong> (kofá, xirê, etc.). É um compromisso formal com um Orixá específico.</p>
    <h2>Se Você JÁ Foi Iniciado</h2>
    <p>Se você já passou por algum ritual de iniciação, significa que você JÁ TEM um Orixá na cabeça. Pode ser:</p>
    <ul>
      <li><strong>Orixá de cabeça:</strong> A divindade que rege sua vida.</li>
      <li><strong>Orixá guia:</strong> A divindade que te guia no dia a dia.</li>
    </ul>
    <h2>Como Descobrir o Seu?</h2>
    <ul>
      <li><strong>Consulta com Babaláwo/Iyanifá:</strong> O mais indicado. Um sacerdote experiente pode revelar qual é o seu Orixá.</li>
      <li><strong>Incorporação:</strong> Em uma gira, o Orixá pode se manifestar através de você.</li>
      <li><strong>Sinais:</strong> Certos sinais na sua vida podem indicar qual Orixá trabalha com você.</li>
    </ul>
    <h2>Sinais Comuns</h2>
    <ul>
      <li><strong>Oxalá:</strong> Pessoa calma, sábia, que gosta de paz.</li>
      <li><strong>Ogum:</strong> Pessoa guerreira, corajosa, que gosta de justiça.</li>
      <li><strong>Iansã:</strong> Pessoa forte, temperamental, protetora.</li>
      <li><strong>Oxum:</strong> Pessoa carinhosa, vaidosa, que gosta de beleza.</li>
      <li><strong>Xangô:</strong> Pessoa justa, firme, que não tolera mentira.</li>
      <li><strong>Ogum:</strong> Pessoa trabalhadora, que gosta de resolver problemas.</li>
      <li><strong>Oxóssi:</strong> Pessoa que gosta de natureza, caça, fartura.</li>
      <li><strong>Nanã:</strong> Pessoa maternal, que cuida dos outros.</li>
    </ul>
    <h2>Posso Descobrir sozinho?</h2>
    <p>É difícil. O melhor é sempre consultar um sacerdote experiente. Mas você pode observar:</p>
    <ul>
      <li>Quais Orixás você sente mais atração.</li>
      <li>Quais Orixás aparecem mais nos seus sonhos.</li>
      <li>Quais Orixás você sente mais durante as giras.</li>
    </ul>
    <h2>Conclusão</h2>
    <p>Se você já foi iniciado, você já tem um Orixá na cabeça. Para descobrir qual é, consulte um sacerdote. A resposta vai chegar no momento certo.</p>
    ${articleFooter()}`
  },
  {
    id: '52',
    slug: 'quantas-vidas-ancestrais-anteriores-espiritualidade',
    title: 'Quantas Vidas eu Já Vivi? Como Saber sobre minhas Vidas Anteriores?',
    description: 'Entenda o conceito de reencarnação na Umbanda e no Candomblé. Saiba como ter acesso às suas vidas anteriores e o que isso significa.',
    publishedAt: '2026-07-16',
    tags: ['reencarnação', 'vidas-anteriores', 'ancestrais', 'umbanda', 'candomblé'],
    content: `<p>A pergunta sobre <strong>quantas vidas já vivemos</strong> é uma das mais fascinantes na espiritualidade.</p>
    <h2>O Conceito de Reencarnação</h2>
    <p>Na Umbanda e no Candomblé, acreditamos que a alma <strong>renasce várias vezes</strong> para evoluir. Cada vida é uma escola:</p>
    <ul>
      <li><strong>Vida 1:</strong> Aprendizado básico (amor, respeito).</li>
      <li><strong>Vidas seguintes:</strong> Desafios mais complexos.</li>
      <li><strong>Objetivo:</strong> Alcançar a perfeição espiritual.</li>
    </ul>
    <h2>Quantas Vidas?</h2>
    <p>Não há um número fixo. Depende da evolução de cada alma:</p>
    <ul>
      <li><strong>Almas novas:</strong> Poucas vidas (10-50).</li>
      <li><strong>Almas intermediárias:</strong> Várias vidas (50-200).</li>
      <li><strong>Almas avançadas:</strong> Muitas vidas (200+).</li>
    </ul>
    <p>O importante não é o número, mas o que você aprendeu nelas.</p>
    <h2>Como Saber sobre Vidas Anteriores?</h2>
    <ul>
      <li><strong>Consulta espiritual:</strong> Um sacerdote pode revelar informações.</li>
      <li><strong>Sonhos:</strong> Às vezes sonhamos com cenas que parecem vidas passadas.</li>
      <li><strong>Meditação:</strong> Em meditação profunda, podemos acessar memórias.</li>
      <li><strong>Reações inexplicáveis:</strong> Medo ou atração por coisas que não fazem sentido.</li>
    </ul>
    <h2>Para que Serve Saber?</h2>
    <ul>
      <li><strong>Autoconhecimento:</strong> Entender por que certas coisas acontecem.</li>
      <li><strong>Reparação:</strong> Corrigir erros do passado.</li>
      <li><strong>Evolução:</strong> Acelerar o aprendizado.</li>
      <li><strong>Perdão:</strong> Perdoar a si mesmo e aos outros.</li>
    </ul>
    <h2>Cuidados</h2>
    <ul>
      <li>Não fique obcecado pelo passado.</li>
      <li>Foque no presente — é onde a evolução acontece.</li>
      <li>Use as informações para melhorar, não para justificar.</li>
    </ul>
    <p>Saber sobre vidas anteriores é uma ferramenta poderosa de autoconhecimento, mas deve ser usada com sabedoria.</p>
    ${articleFooter()}`
  },
  {
    id: '53',
    slug: 'como-falar-com-espirito-guia-ancestral',
    title: 'Como Falar com Meu Espírito Guia ou Ancestral?',
    description: 'Guia prático para se comunicar com espíritos guias e ancestrais na Umbanda e no Candomblé. Técnicas simples de conexão.',
    publishedAt: '2026-07-16',
    tags: ['espírito-guia', 'ancestrais', 'comunicação', 'umbanda', 'candomblé'],
    content: `<p>Muitas pessoas querem saber como <strong>falar com seus espíritos guias e ancestrais</strong>. Na Umbanda e no Candomblé, isso é possível e comum.</p>
    <h2>O Que são Espíritos Guias?</h2>
    <p>Espíritos guias são <strong>almas evoluídas</strong> que escolheram ajudar uma pessoa específica durante sua jornada na terra. Eles podem ser:</p>
    <ul>
      <li><strong>Ancestrais familiares:</strong> Avós, bisavós que já morreram.</li>
      <li><strong>Ancestrais espirituais:</strong> Pessoas que não eram da sua família, mas que se conectaram com você.</li>
      <li><strong>Orixás:</strong> As divindades que trabalham com você.</li>
    </ul>
    <h2>Como se Comunicar?</h2>
    <ol>
      <li><strong>Oração:</strong> Fale com eles em pensamento ou em voz alta.</li>
      <li><strong>Meditação:</strong> Sente-se em silêncio e ouça as respostas.</li>
      <li><strong>Journaling:</strong> Escreva cartas para eles e espere respostas.</li>
      <li><strong>Sonhos:</strong> Peça para eles aparecerem nos seus sonhos.</li>
      <li><strong>Candle Reading:</strong> Acenda uma vela e observe as chamas.</li>
    </ol>
    <h2>Onde Conversar?</h2>
    <ul>
      <li><strong>Local limpo:</strong> Um cantinho reservado em casa.</li>
      <li><strong>Natureza:</strong> Parques, praias, florestas.</li>
      <li><strong>Terreiro:</strong> Durante as giras.</li>
    </ul>
    <h2>Como Saber se Eles Ouviram?</h2>
    <ul>
      <li><strong>Sinais:</strong> Números repetidos, penas, moedas.</li>
      <li><strong>Sonhos:</strong> Mensagens claras nos sonhos.</li>
      <li><strong>Sensações:</strong> Calor, formigamento, paz.</li>
      <li><strong>Eventos:</strong> Coisas que acontecem de forma sincronizada.</li>
    </ul>
    <h2>Respeito é Essencial</h2>
    <ul>
      <li>Nunca peça coisas negativas.</li>
      <li>Agradeça sempre.</li>
      <li>Respeite o livre-arbítrio de todos.</li>
      <li>Não force respostas — elas chegam no momento certo.</li>
    </ul>
    <p>Falar com espíritos guias é natural e benéfico. Com fé e respeito, você建立ará uma conexão profunda e transformadora.</p>
    ${articleFooter()}`
  },
  {
    id: '54',
    slug: 'sonho-com-morte-mau-pressagio-espiritualidade',
    title: 'Sonhar com Morte é Mau Presságio? O Que a Espiritualidade Diz?',
    description: 'Entenda o significado espiritual de sonhar com morte na Umbanda e no Candomblé. Descubra por que nem sempre é algo ruim.',
    publishedAt: '2026-07-16',
    tags: ['sonho', 'morte', 'presságio', 'umbanda', 'espiritualidade'],
    content: `<p>Sonhar com morte é um dos sonhos mais assustadores, mas na espiritualidade, <strong>nem sempre é mau presságio</strong>.</p>
    <h2>O Que Significa Sonhar com Morte?</h2>
    <p>Na Umbanda e no Candomblé, sonhar com morte geralmente significa:</p>
    <ul>
      <li><strong>Transição:</strong> Uma mudança importante está chegando.</li>
      <li><strong>Fim de ciclo:</strong> Algo da sua vida está terminando.</li>
      <li><strong>Renascimento:</strong> Uma nova fase está começando.</li>
    </ul>
    <h2>Tipos de Sonho com Morte</h2>
    <ul>
      <li><strong>Morrer você:</strong> Fim de uma fase, renascimento.</li>
      <li><strong>Morrer alguém conhecido:</strong> Fim de uma relação ou fase dessa pessoa.</li>
      <li><strong>Morrer alguém desconhecido:</strong> Mudança geral na sua vida.</li>
      <li><strong>Morte violenta:</strong> Fim rápido e inesperado de algo.</li>
    </ul>
    <h2>Quando É Mau Presságio?</h2>
    <ul>
      <li><strong>Se o sonho é recorrente:</strong> Pode ser um alerta.</li>
      <li><strong>Se você sente medo intenso:</strong> Pode haver algo a ser feito.</li>
      <li><strong>Se há sinais na vida real:</strong> Coincidências preocupantes.</li>
    </ul>
    <h2>O Que Fazer?</h2>
    <ul>
      <li><strong>Não entre em pânico:</strong> A maioria dos sonhos não são proféticos.</li>
      <li><strong>Consulte um sacerdote:</strong> Se o sonho é recorrente e assustador.</li>
      <li><strong>Proteção:</strong> Acenda uma vela, faça uma prece.</li>
      <li><strong>Aceitação:</strong> Entenda que a mudança pode ser positiva.</li>
    </ul>
    <h2>Sinais de Morte (não nos sonhos)</h2>
    <ul>
      <li>Pássaro batendo na janela.</li>
      <li>Vela apagando sozinha.</li>
      <li>Espelho quebrando.</li>
      <li>Relógio parando.</li>
    </ul>
    <p>Sonhar com morte não é necessariamente ruim. É um convite para refletir sobre mudanças e renascimento.</p>
    ${articleFooter()}`
  },
  {
    id: '55',
    slug: 'como-tirar-virado-azar-despacho-espiritual',
    title: 'Como Tirar o Virado do Azar? Despacho Espiritual Simples',
    description: 'Guia para fazer um despacho espiritual caseiro para tirar o azar e as energias negativas. Receitas simples e seguras.',
    publishedAt: '2026-07-16',
    tags: ['despacho', 'azar', 'limpeza', 'umbanda', 'energias-negativas'],
    content: `<p>Se você está sentindo azar ou energias pesadas, um <strong>despacho espiritual</strong> pode ajudar.</p>
    <h2>O Que é um Despacho?</h2>
    <p>O despacho é um <strong>trabalho de limpeza espiritual</strong> que utiliza ervas, velas e outros elementos para afastar energias negativas.</p>
    <h2>Despacho Simples em Casa</h2>
    <h3>Ingredientes:</h3>
    <ul>
      <li>1 vela branca</li>
      <li>Flor de laranjeira ou alecrim</li>
      <li>Água</li>
      <li>Sal grosso</li>
    </ul>
    <h3>Modo de Fazer:</h3>
    <ol>
      <li>Coloque a vela em um prato com água.</li>
      <li>Adicione as ervas na água.</li>
      <li>Acenda a vela com intenção de limpeza.</li>
      <li>Ore pedindo proteção e afastamento do azar.</li>
      <li>Deixe a vela queimar até apagar.</li>
      <li>Jogue a água em um local de escoamento (não no vaso).</li>
    </ol>
    <h2>Outros Despachos</h2>
    <ul>
      <li><strong>Despacho com sal:</strong> Espalhe sal grosso nos cantos da casa e jogue fora no dia seguinte.</li>
      <li><strong>Despacho com alecrim:</strong> Ferva alecrim, coe e banhe-se com a água.</li>
      <li><strong>Despacho com defumação:</strong> Use sálvia ou arruda para defumar a casa.</li>
    </ul>
    <h2>Dicas</h2>
    <ul>
      <li>Faça com fé e intenção.</li>
      <li>Não faça com raiva.</li>
      <li>Se não resolver, consulte um sacerdote.</li>
    </ul>
    <p>O despacho é uma ferramenta poderosa para limpar energias e recomeçar com vibração nova.</p>
    ${articleFooter()}`
  },
  {
    id: '56',
    slug: 'exu-7-encruzilhadas-nao-e-diabo-completo',
    title: 'Exu das 7 Encruzilhadas: Não é o Diabo! Verdade Completa',
    description: 'Toda a verdade sobre Exu das 7 Encruzilhadas. Entenda sua origem, função e por que ele é um dos Exus mais respeitados da Umbanda.',
    publishedAt: '2026-07-16',
    tags: ['exu', '7-encruzilhadas', 'umbanda', 'verdade', 'preconceito'],
    content: `<p><strong>Exu das 7 Encruzilhadas</strong> é um dos Exus mais poderosos e incompreendidos da Umbanda.</p>
    <h2>Quem é Exu das 7 Encruzilhadas?</h2>
    <p>Exu das 7 Encruzilhadas é a manifestação de Exu que trabalha nas <strong>encruzilhadas de 7 estradas</strong>. Ele é:</p>
    <ul>
      <li><strong>Guardião:</strong> Protege as 7 encruzilhadas.</li>
      <li><strong>Mensageiro:</strong> Leva e traz mensagens dos Orixás.</li>
      <li><strong>Abridor de caminhos:</strong> Abre onde está fechado.</li>
    </ul>
    <h2>Por que 7?</h2>
    <p>O número 7 é sagrado na Umbanda:</p>
    <ul>
      <li>7 dias da semana.</li>
      <li>7 cores do arco-íris.</li>
      <li>7 notas musicais.</li>
      <li>7 encruzilhadas = todas as direções.</li>
    </ul>
    <h2>Por que não é o Diabo?</h2>
    <ul>
      <li><strong>Origem Yorubá:</strong> Exu é africano, não cristão.</li>
      <li><strong>Função:</strong> Ele protege, não destrói.</li>
      <li><strong>Neutro:</strong> Trabalha pelo bem quando bem orientado.</li>
    </ul>
    <h2>Como se Relacionar?</h2>
    <ul>
      <li>Respeito e fé.</li>
      <li>Oferendas adequadas.</li>
      <li>Obediência às orientações.</li>
    </ul>
    <p>Exu das 7 Encruzilhadas é uma entidade poderosa e benéfica. Entender isso é superar o preconceito.</p>
    ${articleFooter()}`
  },
  {
    id: '57',
    slug: 'pomba-gira-negativa-o-que-fazer',
    title: 'Como Saber se uma Pomba Gira está Trabalhando Contra Mim?',
    description: 'Entenda os sinais de que uma Pomba Gira pode estar trabalhando contra você e o que fazer para se proteger.',
    publishedAt: '2026-07-16',
    tags: ['pomba-gira', 'proteção', 'umbanda', 'energia-negativa'],
    content: `<p>Uma das dúvidas mais comuns é: <strong>"Estou sofrendo ação de Pomba Gira?"</strong></p>
    <h2>Sinais Possíveis</h2>
    <ul>
      <li><strong>Problemas no amor:</strong> Relacionamentos que sempre dão errado.</li>
      <li><strong>Desinteresse sexual:</strong> Perda de libido inexplicável.</li>
      <li><strong>Medo noturno:</strong> Sensação de presença à noite.</li>
      <li><strong>Dificuldade financeira:</strong> Dinheiro que não entra.</li>
      <li><strong>Discórdia familiar:</strong> Brigas constantes em casa.</li>
    </ul>
    <h2>Importante</h2>
    <p>Nem todo problema é Pomba Gira. Muitas vezes são:</p>
    <ul>
      <li>Problemas psicológicos.</li>
      <li>Estresse.</li>
      <li>Problemas reais de relacionamento.</li>
    </ul>
    <h2>O Que Fazer?</h2>
    <ol>
      <li><strong>Consulte um sacerdote:</strong> Só ele pode confirmar.</li>
      <li><strong>Proteção:</strong> Banho de ervas, defumação.</li>
      <li><strong>Oferendas:</strong> Para sua Pomba Gira de trabalho.</li>
      <li><strong>Fé:</strong> Confie que será resolvido.</li>
    </ol>
    <p>Não entre em pânico. Consulte um profissional antes de tirar conclusões.</p>
    ${articleFooter()}`
  },
  {
    id: '58',
    slug: 'orixas-dias-semana-quais-dias-oferecer',
    title: 'Os Orixás e os Dias da Semana: O Que Oferecer em Cada Dia',
    description: 'Guia completo dos dias da semana na Umbanda e no Candomblé. Saiba qual Orixá é cultuado em cada dia e quais oferendas fazer.',
    publishedAt: '2026-07-16',
    tags: ['orixá', 'dias-da-semana', 'oferecimentos', 'umbanda', 'candomblé'],
    content: `<p>Cada dia da semana na Umbanda e no Candomblé é regido por um Orixá diferente.</p>
    <h2>Segunda-feira — Exu</h2>
    <ul>
      <li><strong>Cor:</strong> Preto e vermelho.</li>
      <li><strong>Oferendas:</strong> Cachaça, cigarro, pipoca.</li>
    </ul>
    <h2>Terça-feira — Ogum</h2>
    <ul>
      <li><strong>Cor:</strong> Azul escuro.</li>
      <li><strong>Oferendas:</strong> Carne de porco, cerveja.</li>
    </ul>
    <h2>Quarta-feira — Oxalá</h2>
    <ul>
      <li><strong>Cor:</strong> Branco.</li>
      <li><strong>Oferendas:</strong> Mel, frutas brancas.</li>
    </ul>
    <h2>Quinta-feira — Xangô</h2>
    <ul>
      <li><strong>Cor:</strong> Vermelho e branco.</li>
      <li><strong>Oferendas:</strong> Carne de cabrito, amendoim.</li>
    </ul>
    <h2>Sexta-feira — Oxum/Iansã</h2>
    <ul>
      <li><strong>Cor:</strong> Dourado (Oxum) e vermelho (Iansã).</li>
      <li><strong>Oferendas:</strong> Mel, flores (Oxum); pimenta, pano vermelho (Iansã).</li>
    </ul>
    <h2>Sábado — Nanã/Iemanjá</h2>
    <ul>
      <li><strong>Cor:</strong> Marrom (Nanã) e azul (Iemanjá).</li>
      <li><strong>Oferendas:</strong> Arroz, feijão (Nanã); flores, perfume (Iemanjá).</li>
    </ul>
    <h2>Domingo — Oxóssi</h2>
    <ul>
      <li><strong>Cor:</strong> Verde.</li>
      <li><strong>Oferendas:</strong> Frutas, milho.</li>
    </ul>
    <h2>Dicas</h2>
    <ul>
      <li>Ofereça sempre com fé.</li>
      <li>Não precisa oferecer tudo — escolha o que puder.</li>
      <li>O mais importante é a intenção.</li>
    </ul>
    <p>Cultuar os Orixás nos dias corretos fortalece a conexão e traz equilíbrio.</p>
    ${articleFooter()}`
  },
  {
    id: '59',
    slug: 'limpar-casa-energia-negativa-remedios-naturais',
    title: 'Como Limpar sua Casa de Energias Negativas: Remedios Naturais',
    description: 'Receitas naturais e caseiras para limpar sua casa de energias negativas. Ervas, velas e defumação para proteger seu lar.',
    publishedAt: '2026-07-16',
    tags: ['limpeza', 'energias-negativas', 'casa', 'remédios-naturais', 'proteção'],
    content: `<p>Manter a casa livre de energias negativas é essencial para o bem-estar.</p>
    <h2>1. Defumação com Sálvia ou Arruda</h2>
    <ul>
      <li>Acenda um molho de sálvia ou arruda.</li>
      <li>Passe por todos os cômodos, cantos e portas.</li>
      <li>Diga: "Com esta defumação, afasto todo mal desta casa."</li>
    </ul>
    <h2>2. Sal Grosso</h2>
    <ul>
      <li>Espalhe sal grosso nos cantos da casa.</li>
      <li>Deixe por 24 horas.</li>
      <li>Jogue fora (não no vaso).</li>
    </ul>
    <h2>3. Banho de Ervas</h2>
    <ul>
      <li>Ferva alecrim, arruda ou manjerição.</li>
      <li>Coe e coloque em um frasco com atomizador.</li>
      <li>Pulverize pela casa.</li>
    </ul>
    <h2>4. Vela Branca</h2>
    <ul>
      <li>Acenda uma vela branca no centro da casa.</li>
      <li>Deixe queimar até o final.</li>
      <li>Diga uma oração de proteção.</li>
    </ul>
    <h2>5. Água com Limão</h2>
    <ul>
      <li>Corte limões ao meio.</li>
      <li>Coloque em pratos nos cantos da casa.</li>
      <li>Troque quando secarem.</li>
    </ul>
    <h2>Frequência Recomendada</h2>
    <ul>
      <li><strong>Semanal:</strong> Defumação leve.</li>
      <li><strong>Mensal:</strong> Limpeza com sal.</li>
      <li><strong>Quando necessário:</strong> Após brigas, visitas indesejadas, etc.</li>
    </ul>
    <p>Manter a casa energizada é fundamental para o equilíbrio da família.</p>
    ${articleFooter()}`
  },
  {
    id: '60',
    slug: 'preto-velho-mais-forte-brasil-quem-ele',
    title: 'Quem é o Preto Velho Mais Forte do Brasil?',
    description: 'Conheça os Preto Velhos mais poderosos da Umbanda brasileira. Entenda por que cada um é único e qual a verdadeira força de um Preto Velho.',
    publishedAt: '2026-07-16',
    tags: ['preto-velho', 'umbanda', 'curandeirismo', 'espiritualidade'],
    content: `<p>A pergunta sobre qual é o <strong>Preto Velho mais forte</strong> é comum, mas a resposta pode surpreendê-lo.</p>
    <h2>Não Há um "Mais Forte"</h2>
    <p>Assim como os Orixás, cada Preto Velho tem sua força e sua função:</p>
    <ul>
      <li><strong>Preto Velho da Cruz:</strong> O mais conhecido, traz saúde e paz.</li>
      <li><strong>Preto Velho do Alecrim:</strong> Trabalha com limpeza e proteção.</li>
      <li><strong>Preto Velho da Pedra:</strong> Trabalha com firmeza e proteção.</li>
      <li><strong>Preto Velho da Horta:</strong> Trabalha com ervas e cura.</li>
    </ul>
    <h2>O Que Determine a "Força"?</h2>
    <ul>
      <li><strong>Fé do consulente:</strong> Quanto mais fé, mais resultado.</li>
      <li><strong>Consagração do Preto Velho:</strong> Um Preto Velho bem trabalhado é mais forte.</li>
      <li><strong>Experiência do sacerdote:</strong> Quem faz a gira influencia no resultado.</li>
    </ul>
    <h2>O Preto Velho Mais Forte para VOCÊ</h2>
    <p>É aquele que <strong>trabalha com você</strong>. A conexão pessoal é mais importante que a "fama" da entidade.</p>
    <h2>Como Saber Qual é o Meu?</h2>
    <ul>
      <li>Consulte um sacerdote.</li>
      <li>Observe os Preto Velhos que aparecem nas suas giras.</li>
      <li>Note qual você sente mais conexão.</li>
    </ul>
    <p>A verdadeira força está na conexão, não no nome.</p>
    ${articleFooter()}`
  },
  {
    id: '61',
    slug: 'como-saber-se-estou-amarrado-espiritualmente',
    title: 'Como Saber se Estou Amarrado Espiritualmente?',
    description: 'Sinais de que você pode estar espiritualmente amarrado e o que fazer para se libertar. Entenda a diferença entre amarração e outros problemas.',
    publishedAt: '2026-07-16',
    tags: ['amarração', 'espiritual', 'proteção', 'umbanda', 'libertação'],
    content: `<p>A amarração espiritual é quando uma pessoa prende a energia de outra, bloqueando seu desenvolvimento.</p>
    <h2>Sinais de Amarração</h2>
    <ul>
      <li><strong>Trabalho que não prospera:</strong> Sempre há um obstáculo no último momento.</li>
      <li><strong>Relacionamentos que não funcionam:</strong> Você atrai pessoas erradas.</li>
      <li><strong>Salúde que não melhora:</strong> Médicos não encontram a causa.</li>
      <li><strong>Financeiro travado:</strong> Dinheiro não entra, sempre há uma despesa.</li>
      <li><strong>Medo constante:</strong> Sensação de que algo ruim vai acontecer.</li>
      <li><strong>Pesadelos:</strong> Sonhos ruins recorrentes.</li>
    </ul>
    <h2>Diferença entre Amarração e Outros Problemas</h2>
    <ul>
      <li><strong>Amarração:</strong> Bloqueio intencional, feito por outra pessoa.</li>
      <li><strong>Débito espiritual:</strong> Algo que você fez em vidas passadas.</li>
      <li><strong>Problema psicológico:</strong> Depressão, ansiedade.</li>
      <li><strong>Problema real:</strong> Falta de habilidade, falta de oportunidade.</li>
    </ul>
    <h2>O Que Fazer?</h2>
    <ol>
      <li><strong>Consulte um sacerdote:</strong> Só ele pode confirmar.</li>
      <li><strong>Trabalho de corte:</strong> Para desfazer a amarração.</li>
      <li><strong>Proteção:</strong> Banho de ervas, defumação.</li>
      <li><strong>Fé:</strong> Confie que será resolvido.</li>
    </ol>
    <p>Não entre em pânico. A maioria dos problemas NÃO é amarração. Consulte um profissional antes de tirar conclusões.</p>
    ${articleFooter()}`
  },
  {
    id: '62',
    slug: 'como-fazer-banho-de-ervas-protecao',
    title: 'Como Fazer um Banho de Ervas para Proteção?',
    description: 'Receitas de banhos de ervas para proteção espiritual. Aprenda a preparar banhos de alecrim, arruda, manjerição e mais.',
    publishedAt: '2026-07-16',
    tags: ['banho', 'ervas', 'proteção', 'umbanda', 'limpeza'],
    content: `<p>Banho de ervas é uma das práticas mais antigas e eficazes da espiritualidade brasileira.</p>
    <h2>Banho de Alecrim (Proteção)</h2>
    <ul>
      <li><strong>Ingredientes:</strong> Um punhado de alecrim fresco, 1 litro de água.</li>
      <li><strong>Modo:</strong> Ferva a água, coloque o alecrim, coe. Use no banho.</li>
      <li><strong>Intenção:</strong> Afastar o mal, trazer proteção.</li>
    </ul>
    <h2>Banho de Arruda (Corte)</h2>
    <ul>
      <li><strong>Ingredientes:</strong> Um punhado de arruda, 1 litro de água.</li>
      <li><strong>Modo:</strong> Ferva a água, coloque a arruda, coe. Use no banho.</li>
      <li><strong>Intenção:</strong> Cortar amarrações e energias negativas.</li>
    </ul>
    <h2>Banho de Manjerição (Abertura)</h2>
    <ul>
      <li><strong>Ingredientes:</strong> Um punhado de manjerição, 1 litro de água.</li>
      <li><strong>Modo:</strong> Ferva a água, coloque o manjerição, coe. Use no banho.</li>
      <li><strong>Intenção:</strong> Abrir caminhos, trazer fartura.</li>
    </ul>
    <h2>Banho de Erva de Santa Maria (Sono)</h2>
    <ul>
      <li><strong>Ingredientes:</strong> Um punhado de erva de santa maria, 1 litro de água.</li>
      <li><strong>Modo:</strong> Ferva a água, coloque a erva, coe. Use no banho antes de dormir.</li>
      <li><strong>Intenção:</strong> Acalmar, trazer sono tranquilo.</li>
    </ul>
    <h2>Como Tomar o Banho</h2>
    <ol>
      <li>Lave-se com sabão neutro.</li>
      <li>Despeje a água do banho da cabeça aos pés.</li>
      <li>Não se enxague com água da torneira.</li>
      <li>Seque com toalha limpa.</li>
      <li> Vista roupas limpas.</li>
    </ol>
    <h2>Dicas</h2>
    <ul>
      <li>Faça com fé e intenção.</li>
      <li>Não compartilhe a água do banho.</li>
      <li>Jogue a água em local de escoamento.</li>
    </ul>
    <p>Banho de ervas é uma prática poderosa para limpar e proteger a energia.</p>
    ${articleFooter()}`
  },
  {
    id: '63',
    slug: 'o-que-e-descarrego-espiritual-como-funciona',
    title: 'O que é Descarrego Espiritual e Como Funciona?',
    description: 'Entenda o que é um descarrego espiritual, quando é necessário e como funciona na Umbanda e no Candomblé.',
    publishedAt: '2026-07-16',
    tags: ['descarrego', 'limpeza', 'umbanda', 'candomblé', 'energia'],
    content: `<p>O descarrego espiritual é um <strong>trabalho de limpeza energética</strong> mais profundo que o passe.</p>
    <h2>O Que é Descarrego?</h2>
    <p>Descarrego é quando um sacerdote <strong>tira do corpo da pessoa energias pesadas</strong> que estão causando problemas.</p>
    <h2>Quando é Necessário?</h2>
    <ul>
      <li>Quando o passe não resolve.</li>
      <li>Quando há uma "carga" muito forte.</li>
      <li>Quando a pessoa está muito doente sem motivo.</li>
      <li>Quando há interferência espiritual forte.</li>
    </ul>
    <h2>Como Funciona?</h2>
    <ol>
      <li><strong>Diagnóstico:</strong> O sacerdote identifica o problema.</li>
      <li><strong>Preparação:</strong> Prepara as ervas e ferramentas.</li>
      <li><strong>Trabalho:</strong> Passa as mãos e ferramentas sobre o corpo.</li>
      <li><strong>Despacho:</strong> Joga as energias em um despacho.</li>
      <li><strong>Oração:</strong> Fecha com uma oração de proteção.</li>
    </ol>
    <h2>O que se Sente?</h2>
    <ul>
      <li><strong>Durante:</strong> Calor intenso, formigamento, às vezes dor.</li>
      <li><strong>Depois:</strong> Alívio imediato, mas pode haver cansaço.</li>
    </ul>
    <h2>Cuidados</h2>
    <ul>
      <li>Não tome sol por 24 horas.</li>
      <li>Não coma comida pesada.</li>
      <li>Descanse bastante.</li>
      <li>Siga as orientações do sacerdote.</li>
    </ul>
    <p>O descarrego é um trabalho sério e deve ser feito apenas por sacerdotes experientes.</p>
    ${articleFooter()}`
  },
  {
    id: '64',
    slug: 'significado-sonhar-orixas-qual-orixa-apareceu',
    title: 'O que Significa Sonhar com Orixás? Qual Orixá Apareceu?',
    description: 'Interpretação dos sonhos com Orixás na Umbanda e no Candomblé. Descubra o que significa cada Orixá aparecer no seu sonho.',
    publishedAt: '2026-07-16',
    tags: ['sonho', 'orixá', 'umbanda', 'candomblé', 'interpretação'],
    content: `<p>Sonhar com Orixás é um <strong>presente espiritual</strong>. Mas o que significa cada um?</p>
    <h2>Oxalá</h2>
    <ul>
      <li><strong>Significado:</strong> Paz, sabedoria, novos começos.</li>
      <li><strong>Mensagem:</strong> Esteja calmo e confie no processo.</li>
    </ul>
    <h2>Ogum</h2>
    <ul>
      <li><strong>Significado:</strong> Força, coragem, luta.</li>
      <li><strong>Mensagem:</strong> Lute pelo que quer, mas com sabedoria.</li>
    </ul>
    <h2>Iansã</h2>
    <ul>
      <li><strong>Significado:</strong> Transformação, paixão, mudança.</li>
      <li><strong>Mensagem:</strong> Algo está prestes a mudar radicalmente.</li>
    </ul>
    <h2>Oxum</h2>
    <ul>
      <li><strong>Significado:</strong> Amor, beleza, fartura.</li>
      <li><strong>Mensagem:</strong> Cuide de si mesmo, você é digno de amor.</li>
    </ul>
    <h2>Xangô</h2>
    <ul>
      <li><strong>Significado:</strong> Justiça, firmeza, verdade.</li>
      <li><strong>Mensagem:</strong> Seja justo em tudo que fizer.</li>
    </ul>
    <h2>Oxóssi</h2>
    <ul>
      <li><strong>Significado:</strong> Natureza, fartura, prosperidade.</li>
      <li><strong>Mensagem:</strong> Prosperidade está chegando.</li>
    </ul>
    <h2>Iemanjá</h2>
    <ul>
      <li><strong>Significado:</strong> Proteção materna, abundância.</li>
      <li><strong>Mensagem:</strong> Você está protegido.</li>
    </ul>
    <h2>Nanã</h2>
    <ul>
      <li><strong>Significado:</strong> Ancestrais, sabedoria antiga.</li>
      <li><strong>Mensagem:</strong> Conecte-se com seus ancestrais.</li>
    </ul>
    <h2>Dicas</h2>
    <ul>
      <li>Anote o sonho imediatamente.</li>
      <li>Observe os detalhes (cores, lugares, pessoas).</li>
      <li>Consulte um sacerdote se não entender.</li>
    </ul>
    <p>Sonhar com Orixás é uma graça. Aprenda a interpretar as mensagens.</p>
    ${articleFooter()}`
  },
  {
    id: '65',
    slug: 'como-se-proteger-de-inveja-olho-gordo',
    title: 'Como se Proteger da Inveja e do Olho Gordo?',
    description: 'Técnicas simples e eficazes para se proteger da inveja e do olho gordo na vida cotidiana. Remedios caseiros e proteção espiritual.',
    publishedAt: '2026-07-16',
    tags: ['inveja', 'olho-gordo', 'proteção', 'umbanda', 'energia-negativa'],
    content: `<p>A inveja é uma das energias mais comuns e danosas que podemos encontrar.</p>
    <h2>O que é Inveja?</h2>
    <p>Inveja é quando alguém <strong>deseja o que você tem</strong> com má intenção. Essa energia pode causar:</p>
    <ul>
      <li>Azar.</li>
      <li>Doença.</li>
      <li>Problemas financeiros.</li>
      <li>Discórdia.</li>
    </ul>
    <h2>Sinais de Inveja</h2>
    <ul>
      <li>Coisas boas que sempre dão errado no último momento.</li>
      <li>Pessoas que elogiam muito e depois você se sente mal.</li>
      <li>Pessoas que fazem comentários maldosos.</li>
    </ul>
    <h2>Como se Proteger</h2>
    <ul>
      <li><strong>Azul:</strong> Use roupa azul ou azul-marinho.</li>
      <li><strong>Sal grosso:</strong> Coloque nos bolsos ou cantos da casa.</li>
      <li><strong>Defumação:</strong> Use arruda ou sálvia.</li>
      <li><strong>Água benta:</strong> Pendure na porta.</li>
      <li><strong>Oração:</strong> Peça proteção aos seus guias.</li>
    </ul>
    <h2>O Que NÃO Fazer</h2>
    <ul>
      <li>Não conte suas conquistas para todos.</li>
      <li>Não se vanglorie.</li>
      <li>Não guardade raiva.</li>
    </ul>
    <p>Proteger-se da inveja é essencial para manter a paz e a prosperidade.</p>
    ${articleFooter()}`
  },
  {
    id: '66',
    slug: 'como-invocar-orixas-simples-iniciante',
    title: 'Como Invocar os Orixás de Forma Simples para Iniciantes',
    description: 'Guia prático para iniciantes sobre como invocar Orixás de forma simples e segura. Orações, velas e oferendas básicas.',
    publishedAt: '2026-07-16',
    tags: ['invocação', 'orixá', 'iniciante', 'umbanda', 'candomblé'],
    content: `<p>Invocar Orixás não precisa ser complicado. Aqui vai um guia para iniciantes.</p>
    <h2>O Que Significa Invocar?</h2>
    <p>Invocar é <strong>chamar a atenção</strong> de um Orixá para uma conversa ou pedido.</p>
    <h2>Como Invocar?</h2>
    <ol>
      <li><strong>Escolha o dia:</strong> Cada Orixá tem seu dia (veja nossa lista).</li>
      <li><strong>Preparação:</strong> Lave-se, vista roupas limpas.</li>
      <li><strong>Vela:</strong> Acenda uma vela da cor do Orixá.</li>
      <li><strong>Oração:</strong> Fale com o Orixá de coração.</li>
      <li><strong>Oferecimento:</strong> Deixe uma oferenda simples.</li>
    </ol>
    <h2>Exemplos de Orações Simples</h2>
    <ul>
      <li><strong>Oxalá:</strong> "Oxalá, pai de todos, traga paz para minha vida."</li>
      <li><strong>Ogum:</strong> "Ogum, guerreiro, abra meus caminhos."</li>
      <li><strong>Oxum:</strong> "Oxum, mãe do ouro, traga fartura e amor."</li>
      <li><strong>Xangô:</strong> "Xangô, rei da justiça, seja justo comigo."</li>
    </ul>
    <h2>Dicas</h2>
    <ul>
      <li>Simplicidade é fundamental.</li>
      <li>Fé é mais importante que ritual.</li>
      <li>Não peça coisas negativas.</li>
      <li>Agradeça sempre.</li>
    </ul>
    <p>Invocar Orixás é natural e acessível a todos.</p>
    ${articleFooter()}`
  },
  {
    id: '67',
    slug: 'como-cortar-laço-de-amor-amarração-espiritual',
    title: 'Como Cortar Laço de Amarração Amorosa Espiritualmente',
    description: 'Guia para desfazer uma amarração amorosa espiritualmente. Técnicas de corte energético e proteção.',
    publishedAt: '2026-07-16',
    tags: ['corte', 'amarração', 'amor', 'espiritual', 'proteção'],
    content: `<p>Se você está em um relacionamento que não funciona ou está sofrendo uma amarração, existem formas de se libertar.</p>
    <h2>Como Saber se é Amarração?</h2>
    <ul>
      <li>Você não consegue pensar em outra pessoa.</li>
      <li>Sente uma força te prendendo.</li>
      <li>Sabe que não é bom, mas não consegue sair.</li>
    </ul>
    <h2>Como Cortar o Laço</h2>
    <ol>
      <li><strong>Consiga uma faca ou tesoura:</strong> Símbolo de corte.</li>
      <li><strong>Acenda uma vela:</strong> Branca para limpeza.</li>
      <li><strong>Diga em voz alta:</strong> "Corto todo laço que me prende a [nome]."</li>
      <li><strong>Faça o movimento:</strong> Corte o ar na frente do corpo.</li>
      <li><strong>Jogue água:</strong> Banho de arruda ou alecrim.</li>
    </ol>
    <h2>Outras Formas</h2>
    <ul>
      <li><strong>Defumação:</strong> Use arruda para queimar o laço.</li>
      <li><strong>Sal grosso:</strong> Espalhe nos cantos da casa.</li>
      <li><strong>Consulte um sacerdote:</strong> Para trabalhos mais profundos.</li>
    </ul>
    <h2>Cuidados</h2>
    <ul>
      <li>Não olhe para trás.</li>
      <li>Não volte atrás.</li>
      <li>Foque em você.</li>
    </ul>
    <p>Cortar laços é um ato de libertação. Faça com fé e determinação.</p>
    ${articleFooter()}`
  },
  {
    id: '68',
    slug: 'como-saber-se-tenho-debito-espiritual',
    title: 'Como Saber se Tenho Débito Espiritual?',
    description: 'Entenda o que é débito espiritual, como saber se você tem um e o que fazer para saldar. Dívida kármica e vidas passadas.',
    publishedAt: '2026-07-16',
    tags: ['débito-espiritual', 'dívida-kármica', 'umbanda', 'karma'],
    content: `<p>Débito espiritual é quando você <strong>deve algo de vidas passadas</strong> e precisa pagar nesta vida.</p>
    <h2>O Que é Débito Espiritual?</h2>
    <p>É uma <strong>dívida kármica</strong> que você contraiu em vidas passadas e precisa saldar agora.</p>
    <h2>Sinais de Débito Espiritual</h2>
    <ul>
      <li><strong>Problemas recorrentes:</strong> Mesmo problema, vida após vida.</li>
      <li><strong>Relacionamentos difíceis:</strong> Pessoas que te fazem sofrer.</li>
      <li><strong>Doenças inexplicáveis:</strong> Médicos não encontram a causa.</li>
      <li><strong>Financeiro travado:</strong> Dinheiro nunca é suficiente.</li>
    </ul>
    <h2>Como Saber se Tenho?</h2>
    <ul>
      <li><strong>Consulta espiritual:</strong> Um sacerdote pode revelar.</li>
      <li><strong>Reflexão:</strong> Se você sempre passa pelo mesmo problema.</li>
      <li><strong>Sonhos:</strong> Sonhos recorrentes com situações semelhantes.</li>
    </ul>
    <h2>Como Saldar?</h2>
    <ul>
      <li><strong>Resignação:</strong> Aceitar e aprender com o problema.</li>
      <li><strong>Caridade:</strong> Ajudar quem precisa.</li>
      <li><strong>Trabalho espiritual:</strong> Despachos e oferendas.</li>
      <li><strong>Mudança de atitude:</strong> Agir diferente do passado.</li>
    </ul>
    <h2>Dicas</h2>
    <ul>
      <li>Não entre em desespero.</li>
      <li>Todo débito pode ser saldado.</li>
      <li>O importante é aprender.</li>
    </ul>
    <p>Débito espiritual é uma oportunidade de evolução. Enfrente-o com fé e sabedoria.</p>
    ${articleFooter()}`
  },
  {
    id: '69',
    slug: 'como-atrar-dinheiro-espiritualmente',
    title: 'Como Atrair Dinheiro Espiritualmente? Orações e Oferendas',
    description: 'Técnicas espirituais para atrair prosperidade e dinheiro. Orações, oferendas e trabalhos para a fartura.',
    publishedAt: '2026-07-16',
    tags: ['prosperidade', 'dinheiro', 'oração', 'umbanda', 'fartura'],
    content: `<p>Atrair dinheiro espiritualmente é possível com fé e as técnicas certas.</p>
    <h2>Quem Ajudar?</h2>
    <ul>
      <li><strong>Oxóssi:</strong> Orixá da fartura e caça.</li>
      <li><strong>Oxum:</strong> Orixá do ouro e prosperidade.</li>
      <li><strong>Ogum:</strong> Orixá que abre caminhos.</li>
    </ul>
    <h2>Orações Simples</h2>
    <ul>
      <li><strong>Para Oxóssi:</strong> "Oxóssi, senhor da caça, traga fartura para minha vida."</li>
      <li><strong>Para Oxum:</strong> "Oxum, mãe do ouro, multiplique meu dinheiro."</li>
      <li><strong>Para Ogum:</strong> "Ogum, guerreiro, abra os caminhos do dinheiro."</li>
    </ul>
    <h2>Oferendas</h2>
    <ul>
      <li><strong>Para Oxóssi:</strong> Frutas, milho, cerveja.</li>
      <li><strong>Para Oxum:</strong> Mel, flores douradas, perfume.</li>
      <li><strong>Para Ogum:</strong> Carne de porco, cerveja.</li>
    </ul>
    <h2>Dicas Práticas</h2>
    <ul>
      <li>Acenda uma vela dourada toda sexta-feira.</li>
      <li>Espalhe sal grosso nos cantos da casa.</li>
      <li>Defume com arruda.</li>
      <li>Aja de acordo com a fé (trabalhe, estude, etc.).</li>
    </ul>
    <h2>Ervas para Prosperidade</h2>
    <ul>
      <li><strong>Alecrim:</strong> Proteção e prosperidade.</li>
      <li><strong>Manjericão:</strong> Atrai dinheiro.</li>
      <li><strong>Arruda:</strong> Afasta o azar.</li>
    </ul>
    <p>Atrair dinheiro é possible, mas requer fé, ação e alinhamento espiritual.</p>
    ${articleFooter()}`
  },
  {
    id: '70',
    slug: 'basta-de-terreiro-como-funciona-beneficios',
    title: 'O que é Basta de Terreiro? Como Funciona e Quais os Benefícios',
    description: 'Entenda o que é o Basta de Terreiro, como funciona esse ritual de proteção e quais são os benefícios para quem participa.',
    publishedAt: '2026-07-16',
    tags: ['basta', 'terreiro', 'proteção', 'umbanda', 'candomblé'],
    content: `<p>O Basta é um dos rituais mais importantes da Umbanda e do Candomblé.</p>
    <h2>O Que é o Basta?</h2>
    <p>O Basta é um <strong>trabalho coletivo de proteção</strong> feito no terreiro para afastar energias negativas e trazer equilíbrio a todos.</p>
    <h2>Como Funciona?</h2>
    <ol>
      <li><strong>Preparação:</strong> O terreiro é preparado com velas, ervas e ferramentas.</li>
      <li><strong>Trabalho:</strong> Os médiuns incorporam os Orixás e trabalham em conjunto.</li>
      <li><strong>Despacho:</strong> As energias negativas são jogadas fora.</li>
      <li><strong>Compartilhamento:</strong> Todos recebem um pouco da proteção.</li>
    </ol>
    <h2>Benefícios</h2>
    <ul>
      <li><strong>Proteção coletiva:</strong> Todos ficam protegidos.</li>
      <li><strong>Limpeza energética:</strong> Afasta energias pesadas.</li>
      <li><strong>Fortalecimento:</strong> Aumenta a energia do terreiro.</li>
      <li><strong>Comunidade:</strong> Fortalece os laços entre os membros.</li>
    </ul>
    <h2>Quando é Feito?</h2>
    <ul>
      <li>Quando há muita energia negativa no terreiro.</li>
      <li>Depois de trabalhos difíceis.</li>
      <li>Em datas comemorativas.</li>
    </ul>
    <h2>Como Participar?</h2>
    <ul>
      <li>Compareça ao terreiro.</li>
      <li>Participe com fé.</li>
      <li>Siga as orientações do sacerdote.</li>
    </ul>
    <p>O Basta é um momento de renovação e proteção para toda a comunidade do terreiro.</p>
    ${articleFooter()}`
  },
  {
    id: '71',
    slug: 'como-fazer-simbolo-de-orixa-em-casa',
    title: 'Como Fazer o Símbolo de um Orixá em Casa',
    description: 'Guia para confeccionar símbolos e pontos riscados dos Orixás em casa. Materiais, técnicas e significados.',
    publishedAt: '2026-07-16',
    tags: ['símbolo', 'orixá', 'ponto-riscado', 'umbanda', 'candomblé'],
    content: `<p>Fazer o símbolo de um Orixá em casa é uma forma de <strong>conexão e devoção</strong>.</p>
    <h2>O Que são Símbolos?</h2>
    <p>Os símbolos são <strong>desenhos sagrados</strong> que representam cada Orixá. Eles são usados em terreiros e em trabalhos espirituais.</p>
    <h2>Materiais Necessários</h2>
    <ul>
      <li>Folha de papel ou cartolina.</li>
      <li>Lápis de cor ou canetinhas.</li>
      <li>Régua.</li>
      <li>Borracha.</li>
    </ul>
    <h2>Como Fazer</h2>
    <ol>
      <li><strong>Pesquise:</strong> Busque imagens dos símbolos dos Orixás.</li>
      <li><strong>Escolha:</strong> Qual Orixá você quer representar.</li>
      <li><strong>Desenhe:</strong> Copie o símbolo com cuidado.</li>
      <li><strong>Colora:</strong> Use as cores corretas do Orixá.</li>
      <li><strong>Sagre:</strong> Coloque em um local adequado.</li>
    </ol>
    <h2>Exemplos de Cores</h2>
    <ul>
      <li><strong>Oxalá:</strong> Branco.</li>
      <li><strong>Ogum:</strong> Azul escuro.</li>
      <li><strong>Iansã:</strong> Vermelho.</li>
      <li><strong>Oxum:</strong> Dourado.</li>
      <li><strong>Xangô:</strong> Vermelho e branco.</li>
      <li><strong>Oxóssi:</strong> Verde.</li>
      <li><strong>Iemanjá:</strong> Azul.</li>
    </ul>
    <h2>Onde Colocar?</h2>
    <ul>
      <li>No seu cantinho espiritual.</li>
      <li>No quarto.</li>
      <li>Na sala.</li>
    </ul>
    <h2>Dicas</h2>
    <ul>
      <li>Faça com fé e carinho.</li>
      <li>Não precisa ser perfeito — o importante é a intenção.</li>
      <li>Pesquise a origem antes de desenhar.</li>
    </ul>
    <p>Fazer símbolos é uma forma bonita de se conectar com os Orixás.</p>
    ${articleFooter()}`
  },
  {
    id: '72',
    slug: 'como-saber-se-fui-incorporado-na-gira',
    title: 'Como Saber se Fui Incorporado numa Gira?',
    description: 'Entenda o que é incorporação na Umbanda, como saber se você incorporou e o que sentir durante e depois do evento.',
    publishedAt: '2026-07-16',
    tags: ['incorporação', 'gira', 'umbanda', 'mediumnidade', 'entidade'],
    content: `<p>A incorporação é o momento em que uma <strong>entidade se manifesta através do corpo</strong> de um médium.</p>
    <h2>O Que é Incorporação?</h2>
    <p>Incorporação é quando uma entidade (Orixá, Preto Velho, Exu, etc.) <strong>usa o corpo de uma pessoa</strong> para falar, curar ou orientar.</p>
    <h2>Como Saber se Incorporou?</h2>
    <ul>
      <li><strong>Memória:</strong> Você não lembra do que aconteceu.</li>
      <li><strong>Sensação:</strong> Sente-se cansado e confuso.</li>
      <li><strong>Relato:</strong> Outros contam o que você disse ou fez.</li>
      <li><strong>Mudança de voz:</strong> Sua voz mudou durante o evento.</li>
      <li><strong>Mudança de postura:</strong> Você se comportou diferente.</li>
    </ul>
    <h2>O que se Sente Durante?</h2>
    <ul>
      <li><strong>Dor de cabeça:</strong> Muitos médiuns sentem.</li>
      <li><strong>Tontura:</strong> Sensação de desmaio.</li>
      <li><strong>Formigamento:</strong> Nas mãos e no corpo.</li>
      <li><strong>Choro:</strong> Liberação emocional.</li>
    </ul>
    <h2>O que Fazer Depois?</h2>
    <ul>
      <li>Descanse.</li>
      <li>Beba água.</li>
      <li>Não tome sol.</li>
      <li>Anote o que lembra.</li>
    </ul>
    <h2>Posso Forçar uma Incorporação?</h2>
    <p><strong>NUNCA.</strong> Incorporação é um dom e deve acontecer naturalmente. Forçar pode causar danos psicológicos e espirituais.</p>
    <h2>Como Desenvolver a Mediumnidade?</h2>
    <ul>
      <li>Frequentar o terreiro.</li>
      <li>Participar das giras.</li>
      <li>Ter um sacerdote orientando.</li>
      <li>Ter fé e paciência.</li>
    </ul>
    <p>A incorporação é um processo natural. Com tempo e orientação, você entenderá melhor sua mediumnidade.</p>
    ${articleFooter()}`
  },
  {
    id: '73',
    slug: 'o-que-e-axé-como-aumentar-sua-energia',
    title: 'O que é Axé e Como Aumentar sua Energia Espiritual?',
    description: 'Entenda o conceito de Axé na Umbanda e no Candomblé. Saiba como aumentar sua energia espiritual e vibração.',
    publishedAt: '2026-07-16',
    tags: ['axé', 'energia', 'vibração', 'umbanda', 'candomblé'],
    content: `<p><strong>Axé</strong> é uma das palavras mais importantes da espiritualidade Yorubá.</p>
    <h2>O Que é Axé?</h2>
    <p>Axé é a <strong>energia vital</strong> que move todas as coisas. É a força de vida, o poder espiritual que sustenta o universo.</p>
    <h2>O Que Aumenta o Axé?</h2>
    <ul>
      <li><strong>Fé:</strong> Crer aumenta a energia.</li>
      <li><strong>Oração:</strong> Comunicação com o divino.</li>
      <li><strong>Caridade:</strong> Ajudar o próximo.</li>
      <li><strong>Alegria:</strong> Celebração e gratidão.</li>
      <li><strong>Natureza:</strong> Contato com a terra.</li>
      <li><strong>Música:</strong> Cantos e toques sagrados.</li>
    </ul>
    <h2>O Que Diminui o Axé?</h2>
    <ul>
      <li><strong>Tristeza:</strong> Bloqueia a energia.</li>
      <li><strong>Raiva:</strong> Drena a vitalidade.</li>
      <li><strong>Medo:</strong> Paralisa o fluxo.</li>
      <li><strong>Inveja:</strong> Contamina a energia.</li>
      <li><strong>Mentira:</strong> Afasta as boas energias.</li>
    </ul>
    <h2>Como Aumentar na Prática</h2>
    <ol>
      <li><strong>Acenda uma vela:</strong> Todos os dias.</li>
      <li><strong>Ore:</strong> Mesmo que em pensamento.</li>
      <li><strong>Dance:</strong> Mova o corpo com alegria.</li>
      <li><strong>Cante:</strong> Mesmo que sozinho.</li>
      <li><strong>Agradeça:</strong> Pela vida e pelas coisas boas.</li>
    </ol>
    <h2>Axé nos Terreiros</h2>
    <p>Nos terreiros, o Axé é construído coletivamente através de:</p>
    <ul>
      <li>Cantos.</li>
      <li>Danças.</li>
      <li>Tambor.</li>
      <li>Incorporação.</li>
    </ul>
    <p>Axé é vida. Cultive-o todos os dias.</p>
    ${articleFooter()}`
  },
  {
    id: '74',
    slug: 'como-fazer-defumacao-casa-espiritos-negativos',
    title: 'Como Fazer Defumação na Casa para Afastar Espíritos Negativos?',
    description: 'Guia completo para defumação caseira com sálvia, arruda e outras ervas. Aprenda a limpar sua casa de espíritos negativos.',
    publishedAt: '2026-07-16',
    tags: ['defumação', 'espíritos', 'proteção', 'casa', 'ervas'],
    content: `<p>Defumação é uma das práticas mais antigas e eficazes para <strong>limpar energias negativas</strong>.</p>
    <h2>O Que é Defumação?</h2>
    <p>Defumação é queimar ervas sagradas para <strong>afastar energias e espíritos negativos</strong>.</p>
    <h2>Ervas para Defumação</h2>
    <ul>
      <li><strong>Sálvia:</strong> A mais conhecida, limpa tudo.</li>
      <li><strong>Arruda:</strong> Corta amarrações e afasta o mal.</li>
      <li><strong>Alecrim:</strong> Proteção e prosperidade.</li>
      <li><strong>Manjerição:</strong> Abre caminhos.</li>
      <li><strong>Erva de Santa Maria:</strong> Sono e paz.</li>
    </ul>
    <h2>Como Fazer</h2>
    <ol>
      <li><strong>Prepare:</strong> Amarre as ervas em um molho.</li>
      <li><strong>Acenda:</strong> Deixe queimar até formar brasa.</li>
      <li><strong>Apague:</strong> Apague a chama, mantendo a brasa.</li>
      <li><strong>Passe:</strong> Leve pela casa, cantos e portas.</li>
      <li><strong>Ore:</strong> Diga uma oração de proteção.</li>
    </ol>
    <h2>Onde Passar?</h2>
    <ul>
      <li>Cantos da casa.</li>
      <li>Portas e janelas.</li>
      <li>Embaixo da cama.</li>
      <li>No quarto.</li>
      <li>Na sala.</li>
    </ul>
    <h2>Frequência</h2>
    <ul>
      <li><strong>Semanal:</strong> Para manutenção.</li>
      <li><strong>Após brigas:</strong> Para limpar a energia.</li>
      <li><strong>Quando necessário:</strong> Quando sentir energia pesada.</li>
    </ul>
    <h2>Cuidados</h2>
    <ul>
      <li>Nunca deixe sem supervisão.</li>
      <li>Cuidado com fumaça (janelas abertas).</li>
      <li>Nunca use com raiva.</li>
    </ul>
    <p>Defumação é uma prática poderosa e segura para proteger seu lar.</p>
    ${articleFooter()}`
  },
  {
    id: '75',
    slug: 'como-descobrir-seu-orixa-guia-por-nascimento',
    title: 'Como Descobrir seu Orixá de Acordo com o Dia de Nascimento?',
    description: 'Tabela completa mostrando qual Orixá rege cada dia da semana de nascimento. Descubra qual é o seu Orixá guia.',
    publishedAt: '2026-07-16',
    tags: ['orixá', 'nascimento', 'dia-da-semana', 'umbanda', 'candomblé'],
    content: `<p>Uma das formas mais simples de descobrir seu Orixá é pelo <strong>dia da semana em que você nasceu</strong>.</p>
    <h2>Dia de Nascimento x Orixá</h2>
    <ul>
      <li><strong>Segunda-feira:</strong> Exu ou Omolu.</li>
      <li><strong>Terça-feira:</strong> Ogum.</li>
      <li><strong>Quarta-feira:</strong> Oxalá.</li>
      <li><strong>Quinta-feira:</strong> Xangô.</li>
      <li><strong>Sexta-feira:</strong> Oxum ou Iansã.</li>
      <li><strong>Sábado:</strong> Nanã ou Iemanjá.</li>
      <li><strong>Domingo:</strong> Oxóssi.</li>
    </ul>
    <h2>Atenção</h2>
    <p>Esta é apenas uma <strong>referência básica</strong>. O Orixá de cabeça pode ser diferente, dependendo de:</p>
    <ul>
      <li>Orixá de barriga (mãe).</li>
      <li>Orixá de casa (pai).</li>
      <li>Iniciação.</li>
    </ul>
    <h2>Como Confirmar?</h2>
    <ul>
      <li><strong>Consulta com Babaláwo:</strong> O mais indicado.</li>
      <li><strong>Incorporação:</strong> Em gira.</li>
      <li><strong>Sinais:</strong> Observe suas preferências e habilidades.</li>
    </ul>
    <h2>Sinais Comuns</h2>
    <ul>
      <li><strong>Segunda (Exu):</strong> Pessoas que gostam de resolver problemas.</li>
      <li><strong>Terça (Ogum):</strong> Pessoas guerreiras e diretas.</li>
      <li><strong>Quarta (Oxalá):</strong> Pessoas calmas e sábias.</li>
      <li><strong>Quinta (Xangô):</strong> Pessoas justas e firmes.</li>
      <li><strong>Sexta (Oxum/Iansã):</strong> Pessoas carinhosas ou passionais.</li>
      <li><strong>Sábado (Nanã/Iemanjá):</strong> Pessoas maternas ou protetoras.</li>
      <li><strong>Domingo (Oxóssi):</strong> Pessoas que gostam de natureza.</li>
    </ul>
    <p>Descubra seu Orixá pelo dia de nascimento e comece a se conectar com sua espiritualidade.</p>
    ${articleFooter()}`
  },
  {
    id: '76',
    slug: 'como-se-proteger-de-magoa-espiritual-trabalho',
    title: 'Como se Proteger de um Trabalho Espiritual Ruim?',
    description: 'Técnicas de proteção espiritual contra trabalhos ruins, maldições e energias negativas. Defesa espiritual caseira.',
    publishedAt: '2026-07-16',
    tags: ['proteção', 'trabalho-ruim', 'maldição', 'umbanda', 'defesa'],
    content: `<p>Se você sente que está sofrendo um <strong>trabalho espiritual ruim</strong>, existem formas de se proteger.</p>
    <h2>Sinais de Trabalho Ruim</h2>
    <ul>
      <li>Azar constante.</li>
      <li>Doenças inexplicáveis.</li>
      <li>Problemas em cascata.</li>
      <li>Sensação de presença.</li>
      <li>Pesadelos recorrentes.</li>
    </ul>
    <h2>Como se Proteger</h2>
    <ol>
      <li><strong>Oração:</strong> Peça proteção aos Orixás e guias.</li>
      <li><strong>Defumação:</strong> Use arruda ou sálvia.</li>
      <li><strong>Banho de ervas:</strong> Alecrim, arruda, manjerição.</li>
      <li><strong>Sal grosso:</strong> Espalhe nos cantos da casa.</li>
      <li><strong>Vela:</strong> Acenda uma vela branca.</li>
    </ol>
    <h2>O que NÃO Fazer</h2>
    <ul>
      <li>Nunca tente desfazer sozinho se não sabe o que fazer.</li>
      <li>Nunca confronte a pessoa que fez o trabalho.</li>
      <li>Nunca entre em pânico.</li>
    </ul>
    <h2>Quando Consultar um Sacerdote?</h2>
    <ul>
      <li>Quando o problema persiste.</li>
      <li>Quando os sintomas são graves.</li>
      <li>Quando você não sabe o que fazer.</li>
    </ul>
    <h2>Previna-se</h2>
    <ul>
      <li>Mantenha a casa limpa e energizada.</li>
      <li>Não conte seus problemas para todos.</li>
      <li>Não aceite presentes de pessoas suspeitas.</li>
      <li>Defume regularmente.</li>
    </ul>
    <p>Proteger-se é um direito. Use as técnicas corretas e busque ajuda quando necessário.</p>
    ${articleFooter()}`
  },
  {
    id: '77',
    slug: 'como-fazer-oracao-para-acalmar-a-mente',
    title: 'Como Fazer uma Oração para Acalmar a Mente e o Coração?',
    description: 'Orações simples e poderosas para acalmar a mente, trazer paz e equilibrar as emoções. Guia prático de prece.',
    publishedAt: '2026-07-16',
    tags: ['oração', 'paz', 'acalmar', 'mente', 'emoções'],
    content: `<p>Quando a mente está agitada, uma <strong>oração simples</strong> pode trazer paz imediata.</p>
    <h2>Oração para Acalmar</h2>
    <p>"Pai/Mãe, guia meus passos. Acalma minha mente, serena meu coração. Que a paz de Oxalá invada minha vida. Que eu encontre forças para enfrentar os desafios. Assim seja."</p>
    <h2>Como Fazer</h2>
    <ol>
      <li><strong>Sente-se:</strong> Em um local tranquilo.</li>
      <li><strong>Feche os olhos:</strong> Concentre-se na respiração.</li>
      <li><strong>Fale:</strong> Em voz alta ou em pensamento.</li>
      <li><strong>Sinta:</strong> A paz entrando no seu corpo.</li>
      <li><strong>Agradeça:</strong> Pela paz recebida.</li>
    </ol>
    <h2>Outras Orações</h2>
    <ul>
      <li><strong>Para Oxalá:</strong> "Oxalá, pai de todos, traga paz para minha vida."</li>
      <li><strong>Para Iemanjá:</strong> "Iemanjá, mãe do mar, acalme minhas águas internas."</li>
      <li><strong>Para Oxum:</strong> "Oxum, mãe do ouro, traga beleza e paz."</li>
    </ul>
    <h2>Quando Orar?</h2>
    <ul>
      <li>Quando acordar.</li>
      <li>Antes de dormir.</li>
      <li>Quando estiver nervoso.</li>
      <li>Quando tomar uma decisão importante.</li>
    </ul>
    <h2>Dicas</h2>
    <ul>
      <li>Repetição ajuda.</li>
      <li>Não precisa ser perfeito — fale de coração.</li>
      <li>A fé é mais importante que as palavras.</li>
    </ul>
    <p>Uma oração sincera pode transformar o dia.</p>
    ${articleFooter()}`
  },
  {
    id: '78',
    slug: 'como-saber-se-tenho-entidade-me-seguindo',
    title: 'Como Saber se Tenho uma Entidade me Seguindo?',
    description: 'Sinais de que uma entidade espiritual pode estar acompanhando você. Como identificar e o que fazer.',
    publishedAt: '2026-07-16',
    tags: ['entidade', 'companheiro', 'espiritual', 'umbanda', 'sinais'],
    content: `<p>Muitas pessoas sentem que estão sendo <strong>acompanhadas por uma entidade</strong>. Como saber?</p>
    <h2>Sinais Comuns</h2>
    <ul>
      <li><strong>Sensação de presença:</strong> Sente que alguém está perto.</li>
      <li><strong>Sonhos recorrentes:</strong> Sonha com a mesma pessoa.</li>
      <li><strong>Voz interna:</strong> Ouve conselhos na sua mente.</li>
      <li><strong>Mudança de humor:</strong> De repente, fica calmo ou agitado.</li>
      <li><strong>Pássaros ou animais:</strong> Aparecem de forma incomum.</li>
    </ul>
    <h2>É Ruim?</h2>
    <p><strong>Não necessariamente.</strong> Pode ser:</p>
    <ul>
      <li><strong>Um Orixá:</strong> Seu guia espiritual.</li>
      <li><strong>Um Preto Velho:</strong> Que quer ajudar.</li>
      <li><strong>Um ancestral:</strong> Da sua família.</li>
      <li><strong>Uma entidade negativa:</strong> Raro, mas possível.</li>
    </ul>
    <h2>Como Saber?</h2>
    <ul>
      <li><strong>Consulte um sacerdote:</strong> Ele pode confirmar.</li>
      <li><strong>Observe a entidade:</strong> O que ela faz? Ajudou ou atrapalhou?</li>
      <li><strong>Ore:</strong> Peça clareza.</li>
    </ul>
    <h2>O Que Fazer?</h2>
    <ul>
      <li><strong>Se é boa:</strong> Agradeça e peça orientação.</li>
      <li><strong>Se é ruim:</strong> Consulte um sacerdote para resolver.</li>
    </ul>
    <p>Não tenha medo. A maioria das entidades que aparecem são para ajudar.</p>
    ${articleFooter()}`
  },
  {
    id: '79',
    slug: 'como-tirar-mau-olhado-com-agua-e-sal',
    title: 'Como Tirar o Mau Olhado com Água e Sal?',
    description: 'Receita simples e eficaz para remover o mau olhado usando água e sal. Técnica ancestral de limpeza energética.',
    publishedAt: '2026-07-16',
    tags: ['mau-olhado', 'água', 'sal', 'limpeza', 'proteção'],
    content: `<p>Água e sal são dois elementos poderosos para <strong>remover energias negativas</strong>.</p>
    <h2>Receita para Tirar o Mau Olhado</h2>
    <ul>
      <li>1 copo de água.</li>
      <li>1 colher de sal grosso.</li>
    </ul>
    <h2>Modo de Fazer</h2>
    <ol>
      <li><strong>Prepare:</strong> Coloque a água em um copo de vidro.</li>
      <li><strong>Adicione:</strong> O sal grosso.</li>
      <li><strong>Ore:</strong> Diga: "Com esta água e sal, afasto todo mau olhado de mim e da minha família."</li>
      <li><strong>Passe:</strong> Passe o copo pelo corpo, de cima para baixo.</li>
      <li><strong>Jogue:</strong> Jogue a água em um local de escoamento.</li>
    </ol>
    <h2>Outros Usos</h2>
    <ul>
      <li><strong>Banho:</strong> Coloque sal na água do banho.</li>
      <li><strong>Casa:</strong> Espalhe sal grosso nos cantos.</li>
      <li><strong>Trabalho:</strong> Coloque um copo de água e sal no trabalho.</li>
    </ul>
    <h2>Dicas</h2>
    <ul>
      <li>Faça com fé.</li>
      <li>Não conte para ninguém (para manter o poder).</li>
      <li>Repita se necessário.</li>
    </ul>
    <p>Água e sal são simples, mas poderosos. Use-os com sabedoria.</p>
    ${articleFooter()}`
  },
  {
    id: '80',
    slug: 'como-fazer-acende-luz-orixas-espirituais',
    title: 'Como Acender uma Luz para os Orixás Espirituais?',
    description: 'Guia para acender velas e luzes para os Orixás. Cores, dias e orações para cada divindade.',
    publishedAt: '2026-07-16',
    tags: ['vela', 'luz', 'orixá', 'umbanda', 'candomblé'],
    content: `<p>Acender uma <strong>vela para os Orixás</strong> é uma das práticas mais simples e poderosas.</p>
    <h2>O Que Significa?</h2>
    <p>A vela representa a <strong>luz espiritual</strong> que guia e protege. Acendê-la é um ato de fé e conexão.</p>
    <h2>Cores das Velas</h2>
    <ul>
      <li><strong>Branca:</strong> Oxalá, paz, purificação.</li>
      <li><strong>Vermelha:</strong> Ogum, Iansã, Xangô.</li>
      <li><strong>Azul:</strong> Iemanjá, Oxalá.</li>
      <li><strong>Amarela/Dourada:</strong> Oxum, prosperidade.</li>
      <li><strong>Verde:</strong> Oxóssi, natureza.</li>
      <li><strong>Preta:</strong> Exu, proteção.</li>
      <li><strong>Rosa:</strong> Pomba Gira, amor.</li>
    </ul>
    <h2>Como Acender</h2>
    <ol>
      <li><strong>Escolha a cor:</strong> De acordo com o Orixá.</li>
      <li><strong>Limpe:</strong> Lave a vela e o local.</li>
      <li><strong>Acenda:</strong> Com intenção e fé.</li>
      <li><strong>Ore:</strong> Fale com o Orixá.</li>
      <li><strong>Deixe queimar:</strong> Até o final.</li>
    </ol>
    <h2>Oração Simples</h2>
    <p>"Com esta vela, acendo a luz para [nome do Orixá]. Que sua presença ilumine minha vida. Assim seja."</p>
    <h2>Quando Acender?</h2>
    <ul>
      <li>No dia do Orixá.</li>
      <li>Quando precisar de ajuda.</li>
      <li>Em agradecimento.</li>
      <li>Para proteção.</li>
    </ul>
    <h2>Dicas</h2>
    <ul>
      <li>Nunca apague a vela antes do final.</li>
      <li>Nunca acenda com raiva.</li>
      <li>A fé é mais importante que a vela.</li>
    </ul>
    <p>Acender uma vela é um ato de fé e esperança. Faça com o coração.</p>
    ${articleFooter()}`
  },
  {
    id: '81',
    slug: 'como-cortar-mau-olhado-de-pessoa',
    title: 'Como Cortar o Mau Olhado de uma Pessoa?',
    description: 'Técnicas espirituais para cortar o mau olhado proveniente de outra pessoa. Proteção e corte energético.',
    publishedAt: '2026-07-16',
    tags: ['mau-olhado', 'corte', 'proteção', 'energia', 'umbanda'],
    content: `<p>Se você identificou que o <strong>mau olhado vem de uma pessoa específica</strong>, existem técnicas para cortar essa energia.</p>
    <h2>Sinais de Mau Olhado Pessoal</h2>
    <ul>
      <li>Sente-se mal perto de alguém.</li>
      <li>Após ver essa pessoa, sente-se doente.</li>
      <li>Essa pessoa sempre fala mal de você.</li>
      <li>Os problemas começam depois de um encontro.</li>
    </ul>
    <h2>Técnicas de Corte</h2>
    <ul>
      <li><strong>Com sal grosso:</strong> Coloque no bolso e jogue fora.</li>
      <li><strong>Com arruda:</strong> Defume e jogue as cinzas fora.</li>
      <li><strong>Com água bente:</strong> Bata na porta e espalhe.</li>
      <li><strong>Com oração:</strong> Peça ao Orixá que corte o laço.</li>
    </ul>
    <h2>Oração para Corte</h2>
    <p>"Corte todo mal que [nome] me faz. Que a energia negativa volte para quem a enviou. Assim seja."</p>
    <h2>Cuidados</h2>
    <ul>
      <li>Nunca deseje mal de volta.</li>
      <li>Não confronte a pessoa.</li>
      <li>Mantenha a paz no coração.</li>
    </ul>
    <p>Cortar o mau olhado é um ato de proteção, não de vingança.</p>
    ${articleFooter()}`
  },
  {
    id: '82',
    slug: 'como-saber-se-estou-vibrando-baixo-espiritualmente',
    title: 'Como Saber se Estou Vibrando Baixo Espiritualmente?',
    description: 'Sinais de que sua vibração espiritual está baixa e como elevá-la. Entenda a importância da vibração na espiritualidade.',
    publishedAt: '2026-07-16',
    tags: ['vibração', 'energia', 'espiritual', 'baixa', 'elevação'],
    content: `<p>A <strong>vibração espiritual</strong> é a energia que você irradia. Quando está baixa, a vida fica difícil.</p>
    <h2>Sinais de Vibração Baixa</h2>
    <ul>
      <li><strong>Tristeza constante:</strong> Sem motivo aparente.</li>
      <li><strong>Cansaço:</strong> Sem energia para nada.</li>
      <li><strong>Isolamento:</strong> Não quer ver ninguém.</li>
      <li><strong>Problemas:</strong> Tudo dá errado.</li>
      <li><strong>Negatividade:</strong> Pensamentos ruins.</li>
      <li><strong>Dificuldade para orar:</strong> Não sente fé.</li>
    </ul>
    <h2>Por Que Acontece?</h2>
    <ul>
      <li>Contato com pessoas que drenam energia.</li>
      <li>Alimentação ruim.</li>
      <li>Falta de sono.</li>
      <li>Estresse.</li>
      <li>Trabalhos espirituais.</li>
    </ul>
    <h2>Como Elevá-la?</h2>
    <ul>
      <li><strong>Música alegre:</strong> Ouça cantos de terreiro.</li>
      <li><strong>Natureza:</strong> Caminhe na grama.</li>
      <li><strong>Banho:</strong> Banho de ervas.</li>
      <li><strong>Defumação:</strong> Limpe a casa.</li>
      <li><strong>Ajuda:</strong> Ajudar alguém.</li>
      <li><strong>Gratidão:</strong> Agradeça pelas coisas boas.</li>
    </ul>
    <h2>Dicas</h2>
    <ul>
      <li>Não se julgue.</li>
      <li>Faça uma coisa por vez.</li>
      <li>Peça ajuda aos guias.</li>
    </ul>
    <p>Elevar a vibração é um processo. Comece devagar e seja paciente.</p>
    ${articleFooter()}`
  },
  {
    id: '83',
    slug: 'como-fazer-oracao-de-segunda-feira-exu',
    title: 'Como Fazer a Oração de Segunda-feira para Exu?',
    description: 'Oração completa para Exu toda segunda-feira. Guia de como pedir proteção e abertura de caminhos.',
    publishedAt: '2026-07-16',
    tags: ['oração', 'exu', 'segunda-feira', 'proteção', 'caminhos'],
    content: `<p>A <strong>segunda-feira é o dia de Exu</strong>. Fazer uma oração neste dia traz proteção e abertura de caminhos.</p>
    <h2>Oração para Exu</h2>
    <p>"Exu, guardião das encruzilhadas, mensageiro dos Orixás, venho pedir sua proteção. Abra meus caminhos, afaste os inimigos, traga prosperidade para minha vida. Que eu nunca falte o necessário. Assim seja."</p>
    <h2>Como Fazer</h2>
    <ol>
      <li><strong>Prepare-se:</strong> Lave as mãos e o rosto.</li>
      <li><strong>Acenda uma vela:</strong> Vermelha ou preta.</li>
      <li><strong>Fale a oração:</strong> Em voz alta ou pensamento.</li>
      <li><strong>Espere:</strong> Sinta a presença de Exu.</li>
      <li><strong>Agradeça:</strong> Pela proteção recebida.</li>
    </ol>
    <h2>Oferendas Simples</h2>
    <ul>
      <li>Cigarro (se fuma).</li>
      <li>Café.</li>
      <li>Pipoca.</li>
    </ul>
    <h2>Dicas</h2>
    <ul>
      <li>Faça toda segunda-feira.</li>
      <li>Seja específico no pedido.</li>
      <li>Nunca peça coisas negativas.</li>
    </ul>
    <p>Segunda-feira é o dia certo para conectar-se com Exu.</p>
    ${articleFooter()}`
  },
  {
    id: '84',
    slug: 'como-saber-se-tenho-duende-espiritual-casa',
    title: 'Como Saber se Tenho Duende Espiritual na Casa?',
    description: 'Sinais da presença de duendes espirituais em casa. Entenda o que são e como conviver com eles.',
    publishedAt: '2026-07-16',
    tags: ['duende', 'casa', 'espiritual', 'criatura', 'natureza'],
    content: `<p>Duendes são <strong>espíritos da natureza</strong> que podem habitar casas e terrenos.</p>
    <h2>O Que são Duendes?</h2>
    <p>São entidades da natureza que vivem em árvores, pedras e locais específicos. Podem ser:</p>
    <ul>
      <li><strong>Amigáveis:</strong> Ajudam, brincam.</li>
      <li><strong>Travessos:</strong> Escondem coisas, fazem bagunça.</li>
      <li><strong>Bravos:</strong> Atrapalham, causam medo.</li>
    </ul>
    <h2>Sinais de Presença</h2>
    <ul>
      <li>Coisas que somem e reaparecem.</li>
      <li>Ruídos estranhos à noite.</li>
      <li>Movimentos no canto dos olhos.</li>
      <li>Animais agindo estranho.</li>
      <li>Crianças pequenas apontando para "amiguinhos".</li>
    </ul>
    <h2>O Que Fazer?</h2>
    <ul>
      <li><strong>Respeite:</strong> Não xingue nem ofenda.</li>
      <li><strong>Ofereça:</strong> Leite, mel, pão.</li>
      <li><strong>Defume:</strong> Com sálvia ou arruda.</li>
      <li><strong>Pague:</strong> Às vezes, querem algo específico.</li>
    </ul>
    <h2>Cuidados</h2>
    <ul>
      <li>Não os acuestione.</li>
      <li>Não conte para todos.</li>
      <li>Mantenha a casa limpa.</li>
    </ul>
    <p>Duendes são parte da natureza. Respeite-os e eles respeitarão você.</p>
    ${articleFooter()}`
  },
  {
    id: '85',
    slug: 'como-curar-ansiedade-com-espiritualidade',
    title: 'Como Curar a Ansiedade com Espiritualidade?',
    description: 'Técnicas espirituais para aliviar a ansiedade. Orações, meditação e práticas para acalmar a mente.',
    publishedAt: '2026-07-16',
    tags: ['ansiedade', 'cura', 'espiritual', 'paz', 'meditação'],
    content: `<p>A ansiedade pode ser <strong>aliviada com práticas espirituais</strong>.</p>
    <h2>Por Que Acontece?</h2>
    <p>A ansiedade muitas vezes vem de:</p>
    <ul>
      <li>Medo do futuro.</li>
      <li>Culpa do passado.</li>
      <li>Falta de fé.</li>
      <li>Energias pesadas.</li>
    </ul>
    <h2>Técnicas Espirituais</h2>
    <ul>
      <li><strong>Oração:</strong> Fale com seus guias.</li>
      <li><strong>Meditação:</strong> Sente-se em silêncio.</li>
      <li><strong>Respiração:</strong> Respire fundo 10 vezes.</li>
      <li><strong>Banho:</strong> Banho de alecrim ou manjerição.</li>
      <li><strong>Defumação:</strong> Limpe a casa.</li>
    </ul>
    <h2>Oração para Ansiedade</h2>
    <p>"Oxalá, acalma minha mente. Que eu confie no processo. Que eu aceite o que não posso mudar. Assim seja."</p>
    <h2>Dicas</h2>
    <ul>
      <li>Pratique todos os dias.</li>
      <li>Não se cobre demais.</li>
      <li>Cuide do corpo também.</li>
      <li>Busque ajuda profissional se necessário.</li>
    </ul>
    <p>A espiritualidade pode ajudar, mas não substitui tratamento médico.</p>
    ${articleFooter()}`
  },
  {
    id: '86',
    slug: 'como-receber-um-passe-espiritual-em-casa',
    title: 'Como Receber um Passe Espiritual em Casa?',
    description: 'Guia para receber um passe espiritual em casa. Preparação, durante e depois do passe.',
    publishedAt: '2026-07-16',
    tags: ['passe', 'casa', 'espiritual', 'limpeza', 'proteção'],
    content: `<p>Receber um <strong>passe em casa</strong> é possível quando há um médium disponível.</p>
    <h2>Preparação</h2>
    <ul>
      <li><strong>Local:</strong> Lugar limpo e tranquilo.</li>
      <li><strong>Pessoa:</strong> Sentada ou em pé, relaxada.</li>
      <li><strong>Médium:</strong> Lavar as mãos e preparar-se.</li>
    </ul>
    <h2>Durante o Passe</h2>
    <ul>
      <li><strong>Relaxe:</strong> Não force nada.</li>
      <li><strong>Respire:</strong> Normalmente.</li>
      <li><strong>Sinta:</strong> As energias passando.</li>
      <li><strong>Não resista:</strong> Deixe fluir.</li>
    </ul>
    <h2>Depois do Passe</h2>
    <ul>
      <li><strong>Descanse:</strong> Não se agite.</li>
      <li><strong>Beba água:</strong> Hidrate-se.</li>
      <li><strong>Não tome sol:</strong> Por 24 horas.</li>
      <li><strong>Anote:</strong> O que sentiu.</li>
    </ul>
    <h2>O Que Fazer se Não tiver Médium?</h2>
    <ul>
      <li>Acenda uma vela branca.</li>
      <li>Defume a casa.</li>
      <li> Tome um banho de ervas.</li>
      <li>Ore pedindo proteção.</li>
    </ul>
    <p>Receber passe é um ato de fé e abertura. Faça com o coração aberto.</p>
    ${articleFooter()}`
  },
  {
    id: '87',
    slug: 'como-saber-se-fui-marcado-por-morte',
    title: 'Como Saber se Fui Marcado pela Morte? Sinais e Proteção',
    description: 'Entenda o que significa ser "marcado pela morte" na espiritualidade. Sinais, significado e como se proteger.',
    publishedAt: '2026-07-16',
    tags: ['morte', 'marca', 'espiritual', 'proteção', 'umbanda'],
    content: `<p>Ser <strong>"marcado pela morte"</strong> é uma expressão que assusta, mas tem significado específico.</p>
    <h2>O Que Significa?</h2>
    <p>Ser marcado pela morte significa que uma <strong>energia de transição</strong> está sobre você. Pode ser:</p>
    <ul>
      <li><strong>Transição espiritual:</strong> Uma mudança profunda.</li>
      <li><strong>Fim de ciclo:</strong> Algo precisa acabar.</li>
      <li><strong>Alerta:</strong> Cuidado com sua saúde.</li>
    </ul>
    <h2>Sinais</h2>
    <ul>
      <li>Pesadelos com morte.</li>
      <li>Medo constante de morrer.</li>
      <li>Doenças inexplicáveis.</li>
      <li>Acidentes frequentes.</li>
      <li>Visões de pessoas mortas.</li>
    </ul>
    <h2>É Mau?</h2>
    <p><strong>Não necessariamente.</strong> Pode ser:</p>
    <ul>
      <li>Um chamado para mudar.</li>
      <li>Uma limpeza espiritual.</li>
      <li>Um novo começo.</li>
    </ul>
    <h2>Como se Proteger?</h2>
    <ul>
      <li><strong>Consulte um sacerdote:</strong> Para orientação.</li>
      <li><strong>Ore:</strong> Peça proteção aos Orixás.</li>
      <li><strong>Defume:</strong> Limpe a casa.</li>
      <li><strong>Banho:</strong> Banho de ervas.</li>
    </ul>
    <h2>Dicas</h2>
    <ul>
      <li>Não entre em pânico.</li>
      <li>Mantenha a fé.</li>
      <li>Cuide da saúde.</li>
    </ul>
    <p>Ser marcado pela morte é um chamado para mudar, não para morrer.</p>
    ${articleFooter()}`
  },
  {
    id: '88',
    slug: 'como-fazer-santa-ceia-espiritual-para-dinheiro',
    title: 'Como Fazer uma Santa Ceia Espiritual para Dinheiro?',
    description: 'Guia para fazer uma Santa Ceia espiritual para atrair prosperidade e dinheiro. Tradição e prática.',
    publishedAt: '2026-07-16',
    tags: ['santa-ceia', 'dinheiro', 'prosperidade', 'espiritual', 'tradição'],
    content: `<p>A <strong>Santa Ceia</strong> é um trabalho espiritual para atrair prosperidade e dinheiro.</p>
    <h2>O Que é?</h2>
    <p>É um <strong>trabalho coletivo</strong> onde várias pessoas oferecem alimentos para os Orixás, pedindo fartura.</p>
    <h2>Como Funciona?</h2>
    <ol>
      <li><strong>Preparação:</strong> Cada pessoa traz um prato de comida.</li>
      <li><strong>Montagem:</strong> Coloca-se tudo em uma mesa.</li>
      <li><strong>Oração:</strong> Reza-se coletivamente.</li>
      <li><strong>Compartilhamento:</strong> Todos comem juntos.</li>
      <li><strong>Doação:</strong> O que sobra é doado.</li>
    </ol>
    <h2>Comida para Prosperidade</h2>
    <ul>
      <li>Arroz.</li>
      <li>Feijão.</li>
      <li>Carne.</li>
      <li>Frutas.</li>
      <li>Pão.</li>
      <li>Doces.</li>
    </ul>
    <h2>Onde Fazer?</h2>
    <ul>
      <li>Em casa.</li>
      <li>No terreiro.</li>
      <li>Em comunidade.</li>
    </ul>
    <h2>Dicas</h2>
    <ul>
      <li>Faça com alegria.</li>
      <li>Compartilhe com amor.</li>
      <li>Doque o que sobrar.</li>
      <li>Agradeça sempre.</li>
    </ul>
    <p>A Santa Ceia é uma prática de comunhão e prosperidade.</p>
    ${articleFooter()}`
  },
  {
    id: '89',
    slug: 'como-saber-se-tenho-maldição-de-familia',
    title: 'Como Saber se Tenho uma Maldição de Família?',
    description: 'Sinais de que existe uma maldição ou débito espiritual na família. Como identificar e resolver.',
    publishedAt: '2026-07-16',
    tags: ['maldição', 'família', 'débito', 'espiritual', 'resolução'],
    content: `<p>Algumas famílias passam por <strong>problemas recorrentes</strong> que podem ser sinais de maldição familiar.</p>
    <h2>Sinais de Maldição Familiar</h2>
    <ul>
      <li><strong>Problemas recorrentes:</strong> Mesmo problema geração após geração.</li>
      <li><strong>Mortes prematuras:</strong> Vários membros morrem jovens.</li>
      <li><strong>Pobreza:</strong> Ninguém prospera.</li>
      <li><strong>Doenças:</strong> Doenças hereditárias inexplicáveis.</li>
      <li><strong>Divórcios:</strong> Todos se separam.</li>
    </ul>
    <h2>O Que Pode Causar?</h2>
    <ul>
      <li>Ações de ancestrais.</li>
      <li>Débitos espirituais.</li>
      <li>Trabalhos feitos contra a família.</li>
      <li>Maldições proferidas.</li>
    </ul>
    <h2>Como Resolver?</h2>
    <ol>
      <li><strong>Consulte um sacerdote:</strong> Para diagnóstico.</li>
      <li><strong>Trabalho familiar:</strong> Para toda a família.</li>
      <li><strong>Desobrigação:</strong> Para saldar débitos.</li>
      <li><strong>Perdão:</strong> Perdoe os ancestrais.</li>
      <li><strong>Mudança:</strong> Quebre o ciclo com novas atitudes.</li>
    </ol>
    <h2>Dicas</h2>
    <ul>
      <li>Não entre em desespero.</li>
      <li>Todo problema tem solução.</li>
      <li>A mudança começa em você.</li>
      <li>Paciência e fé.</li>
    </ul>
    <p>Maldição familiar é sério, mas pode ser resolvido com trabalho e fé.</p>
    ${articleFooter()}`
  },
  {
    id: '90',
    slug: 'como-fazer-oracao-para-paz-no-casaral',
    title: 'Como Fazer uma Oração para Trazer Paz no Lar?',
    description: 'Orações simples e poderosas para trazer paz e harmonia para o lar. Guia de preces caseiras.',
    publishedAt: '2026-07-16',
    tags: ['oração', 'lar', 'paz', 'harmonia', 'família'],
    content: `<p>A <strong>paz no lar</strong> é o mais importante. Uma oração pode transformar a família.</p>
    <h2>Oração para Paz no Lar</h2>
    <p>"Oxalá, pai de todos, traga paz para este lar. Que o amor governe nossa casa. Que a discórdia se afaste. Que todos se amoem e respeitem. Assim seja."</p>
    <h2>Como Fazer</h2>
    <ol>
      <li><strong>Reúna a família:</strong> Se possível.</li>
      <li><strong>Acenda uma vela:</strong> Branca.</li>
      <li><strong>Fale a oração:</strong> Juntos ou em pensamento.</li>
      <li><strong>Abraçe:</strong> Se estiver com a família.</li>
    </ol>
    <h2>Outras Orações</h2>
    <ul>
      <li><strong>Para Oxum:</strong> "Oxum, mãe do amor, encha esta casa de amor."</li>
      <li><strong>Para Iemanjá:</strong> "Iemanjá, mãe do mar, traga calma e paz."</li>
      <li><strong>Para Nanã:</strong> "Nanã, mãe dos ancestrais, traga sabedoria."</li>
    </ul>
    <h2>Dicas</h2>
    <ul>
      <li>Pratique todos os dias.</li>
      <li>Não aponte erros dos outros.</li>
      <li>Seja o primeiro a perdoar.</li>
      <li>Ame sem condições.</li>
    </ul>
    <p>Paz no lar começa com uma oração sincera.</p>
    ${articleFooter()}`
  }
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find(a => a.slug === slug);
}
