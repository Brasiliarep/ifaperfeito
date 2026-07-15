export type CategoriaEntidade =
  | 'Exu'
  | 'Pombagira'
  | 'Exu Mirim'
  | 'Orixá'
  | 'Vodun'
  | 'Nkisi'
  | 'Divindade Suprema'
  | 'Mensageiro Divino'
  | 'Orixá Primordial'
  | 'Caboclo'
  | 'Pretovelho'
  | 'Guerreiro'
  | 'Ancestral'
  | 'Loa';

export interface EncyclopediaEntity {
  id: string;
  nome: string;
  categoria: CategoriaEntidade;

  // 1. Identificação Multilíngue
  nomeYoruba?: string;
  nomeLucumi?: string;
  nomeIngles?: string;
  nomeEspanhol?: string;
  variacoesRegionais?: string[];

  // Campos Básicos
  linha?: string;
  reino?: string;
  falange?: string;
  historiaTradicional: string;
  caracteristicas?: string[];
  simbolos: string[];
  cores: string[];
  elementosNaturais: string[];
  diaTradicional?: string;
  saudacao: string;

  // 2 e 3. Biografia e Quem Foi
  quemFoi?: string;
  personalidade?: string[];
  biografia?: {
    nascimento?: string;
    feitos?: string[];
    transformacao?: string;
  };

  // 4. Genealogia
  genealogia?: {
    pai?: string;
    mae?: string;
    irmaos?: string[];
    esposasMaridos?: string[];
    filhos?: string[];
  };

  // 5 e 6. Linha do Tempo e Itans
  linhaDoTempoMitica?: string[];
  itans?: {
    titulo: string;
    historia: string;
    licao?: string;
  }[];

  // 7. Personalidade detalhada (bloco extra)

  // 8. Domínios Espirituais
  dominios?: string[];

  // 9. Correspondências Naturais
  correspondencias?: {
    arvores?: string[];
    locaisNatureza?: string[];
    metaisPedras?: string[];
    animais?: string[];
  };

  // 12 a 14. Ervas, Comidas e Ewó (Tabus)
  ervas?: {
    liturgicas?: string[];
    medicinais?: string[];
  };
  comidas?: string[];
  ewoTabus?: { tabu: string; motivo: string }[];

  // 15. Qualidades (Caminhos)
  qualidades?: {
    nome: string;
    descricao: string;
  }[];

  // 16 a 19. Cultos Regionais
  cultos?: {
    tradicionalAfricano?: string;
    brasil?: string;
    cuba?: string;
    eua?: string;
    europa?: string;
  };

  // 20 a 22. Orikis, Cantigas, Orações
  orikis?: {
    yoruba: string;
    traducao: string;
  }[];
  cantigas?: {
    yoruba?: string;
    portugues?: string;
    espanhol?: string;
  }[];
  oracoes?: string[];

  // 23 a 24. Cultura e História
  templosHistoricos?: string[];
  influenciaCultural?: string[];

  // SEO e Metadados
  pesquisasRelacionadas?: string[];
  palavrasChaveSEO: string[];
  palavrasChaveMultiIdiomas?: {
    pt: string[];
    en: string[];
    es: string[];
    yo: string[];
  };
  perguntasFrequentes: { pergunta: string; resposta: string }[];
  referencias: string[];

  // Mídia
  imagens?: string[];
  pontosRiscados?: string[];
  pontosCantados?: string[];
}
