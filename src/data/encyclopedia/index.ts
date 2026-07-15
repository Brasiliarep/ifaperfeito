import { EncyclopediaEntity, CategoriaEntidade } from './types';
import { DIVINDADES_DATA } from './divindades';
import { ESHU_DOSSIER } from './eshu-dossier';
import { OGUN_DOSSIER } from './ogun-dossier';
import { ORUNMILA_DOSSIER } from './orunmila-dossier';
import { OBATALA_DOSSIER } from './obatala-dossier';
import { ORIXAS_MIGRADOS_DATA } from './orixas-migrados';
import { ORIXAS_CELESTE_FEMININOS_DATA } from './orixas-celeste-femininos';
import { ORIXAS_NATUREZA_DATA } from './orixas-natureza';
import { ORIXAS_TERRA_DATA } from './orixas-terra';
import { ORIXAS_DIVERSOS_DATA } from './orixas-diversos';
import { EXUS_DATA } from './exus';
import { EXUS_NOVOS_DATA } from './exus-novos';
import { EXUS_BATCH3_DATA } from './exus-batch3';
import { EXUS_BATCH4_DATA } from './exus-batch4';
import { POMBAGIRAS_DATA } from './pombagiras';
import { POMBAGIRAS_NOVAS_DATA } from './pombagiras-novas';
import { POMBAGIRAS_BATCH3_DATA } from './pombagiras-batch3';
import { POMBAGIRAS_BATCH4_DATA } from './pombagiras-batch4';
import { VODUNS_DATA } from './voduns';
import { NKISIS_DATA } from './nkisis';
import { ANCESTRAIS_EGUNS_DATA } from './ancestrais-eguns';
import { CABOCLOS_PRETOS_VELHOS_DATA } from './caboclos-pretos-velhos';
import { ORIXAS_RESTANTES_DATA } from './orixas-restantes';
import { VODUN_LOA_DATA } from './vodun-loa';
import { ROLES_TERREIRO_DATA } from './roles-terreiro';
import { ENTIDADES_MESA_DATA } from './entidades-mesa';

export type { EncyclopediaEntity, CategoriaEntidade };

export const ENCYCLOPEDIA_DATA: EncyclopediaEntity[] = [
  // Divindades Supremas
  ...DIVINDADES_DATA,
  // Dossiês Completos (27 blocos)
  ESHU_DOSSIER,
  OGUN_DOSSIER,
  ORUNMILA_DOSSIER,
  OBATALA_DOSSIER,
  // Orixás Celestes e Femininos
  ...ORIXAS_CELESTE_FEMININOS_DATA,
  // Orixás da Natureza (Caça, Ervas, Peixes)
  ...ORIXAS_NATUREZA_DATA,
  // Orixás da Terra e Doença
  ...ORIXAS_TERRA_DATA,
  // Orixás Migrados (Oxum, Iemanjá, Xangô, Olokun, Babalú-Ayé)
  ...ORIXAS_MIGRADOS_DATA,
  // Orixás Diversos (Agricultura, Montanhas, Gêmeos, Prosperidade, etc.)
  ...ORIXAS_DIVERSOS_DATA,
  // Exus
  ...EXUS_DATA,
  ...EXUS_NOVOS_DATA,
  ...EXUS_BATCH3_DATA,
  ...EXUS_BATCH4_DATA,
  // Pombagiras
  ...POMBAGIRAS_DATA,
  ...POMBAGIRAS_NOVAS_DATA,
  ...POMBAGIRAS_BATCH3_DATA,
  ...POMBAGIRAS_BATCH4_DATA,
  // Voduns (Fon/Dahomey)
  ...VODUNS_DATA,
  // Nkisis (Kongo/Bantu)
  ...NKISIS_DATA,
  // Ancestrais e Eguns
  ...ANCESTRAIS_EGUNS_DATA,
  // Caboclos, Pretos Velhos, Guerreiros (Umbanda)
  ...CABOCLOS_PRETOS_VELHOS_DATA,
  // Orixás Restantes
  ...ORIXAS_RESTANTES_DATA,
  // Loa (Vodou Haitiano)
  ...VODUN_LOA_DATA,
  // Roles do Terreiro
  ...ROLES_TERREIRO_DATA,
  // Entidades de Mesa (Umbanda)
  ...ENTIDADES_MESA_DATA,
];
