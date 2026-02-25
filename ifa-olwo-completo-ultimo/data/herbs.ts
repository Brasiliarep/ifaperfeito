
import { HerbInfo } from '../types';

// Keys are now simplified to the core name (lowercase, no accents) for easier matching
export const HERB_DATABASE: Record<string, HerbInfo> = {
    'rinrin': {
        yorubaName: 'Ewe Rinrin',
        scientificName: 'Peperomia pellucida',
        commonName: 'Erva de Jabuti / Língua de Sapo',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Peperomia_pellucida_in_Kerala.jpg/640px-Peperomia_pellucida_in_Kerala.jpg',
        description: 'Usada para calma, frescor e atrair coisas boas. Folha carnuda e brilhante.'
    },
    'odundun': {
        yorubaName: 'Ewe Odundun',
        scientificName: 'Kalanchoe pinnata',
        commonName: 'Folha da Costa / Saião',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Kalanchoe_pinnata_fleur.jpg/640px-Kalanchoe_pinnata_fleur.jpg',
        description: 'A "Rei das Ervas". Usada para tudo que precisa de calma (tutu), cura e proteção.'
    },
    'saiao': { // Alias for Odundun
        yorubaName: 'Ewe Odundun',
        scientificName: 'Kalanchoe pinnata',
        commonName: 'Folha da Costa / Saião',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Kalanchoe_pinnata_fleur.jpg/640px-Kalanchoe_pinnata_fleur.jpg',
        description: 'A "Rei das Ervas". Usada para tudo que precisa de calma (tutu), cura e proteção.'
    },
    'tete': {
        yorubaName: 'Ewe Tete',
        scientificName: 'Amaranthus viridis',
        commonName: 'Bredo / Caruru',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Amaranthus_viridis.jpg/640px-Amaranthus_viridis.jpg',
        description: 'Erva primordial. "Tete a tete gbe ile" (Tete que chega cedo em casa). Para prosperidade e inícios.'
    },
    'aje': {
        yorubaName: 'Ewe Aje',
        scientificName: 'Alternanthera tenella',
        commonName: 'Periquito / Apaga-Fogo',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Alternanthera_tenella_2.jpg/640px-Alternanthera_tenella_2.jpg',
        description: 'A erva da riqueza e das bruxas (Iyami). Essencial para magias de dinheiro.'
    },
    'akoko': {
        yorubaName: 'Ewe Akoko',
        scientificName: 'Newbouldia laevis',
        commonName: 'Isopo / Akoko',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Newbouldia_laevis.jpg/640px-Newbouldia_laevis.jpg',
        description: 'A folha da coroação. Usada para cargos, títulos e honrarias.'
    },
    'efinrin': {
        yorubaName: 'Ewe Efinrin',
        scientificName: 'Ocimum gratissimum',
        commonName: 'Alfavaca / Manjericão',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Ocimum_gratissimum_0001.jpg/640px-Ocimum_gratissimum_0001.jpg',
        description: 'Usada para banhos de descarrego, limpeza estomacal e espantar maus espíritos.'
    },
    'peregun': {
        yorubaName: 'Ewe Peregun',
        scientificName: 'Dracaena fragrans',
        commonName: 'Pau d\'Água / Coqueiro de Vênus',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Dracaena_fragrans_Tour._1.jpg/640px-Dracaena_fragrans_Tour._1.jpg',
        description: 'Símbolo de vitória e resistência. "Peregun a li aso" (Peregun tem roupas novas).'
    },
    'pau dagua': { // Alias
        yorubaName: 'Ewe Peregun',
        scientificName: 'Dracaena fragrans',
        commonName: 'Pau d\'Água / Coqueiro de Vênus',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Dracaena_fragrans_Tour._1.jpg/640px-Dracaena_fragrans_Tour._1.jpg',
        description: 'Símbolo de vitória e resistência. "Peregun a li aso" (Peregun tem roupas novas).'
    },
    'ewuro': {
        yorubaName: 'Ewe Ewuro',
        scientificName: 'Vernonia amygdalina',
        commonName: 'Alumã / Boldo Baiano',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Vernonia_amygdalina.jpg/640px-Vernonia_amygdalina.jpg',
        description: 'Amarga, mas cura. Usada para retirar energias negativas profundas e doenças.'
    },
    'alupaida': {
        yorubaName: 'Ewe Alupaida',
        scientificName: 'Uraria picta',
        commonName: 'Língua de Vaca / Alupaida',
        imageUrl: 'https://inaturalist-open-data.s3.amazonaws.com/photos/109594255/medium.jpg',
        description: 'A folha que mata o mal. "Alupaida pa ibi da" (Alupaida muda o mal para bem).'
    },
    'sawerepepe': {
        yorubaName: 'Ewe Sawerepepe',
        scientificName: 'Cyathula prostrata',
        commonName: 'Erva de Exu / Pega-Pega',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Cyathula_prostrata.jpg/640px-Cyathula_prostrata.jpg',
        description: 'A erva da sorte rápida e da atração de clientes.'
    },
    'obi': {
        yorubaName: 'Obi',
        scientificName: 'Cola acuminata',
        commonName: 'Noz de Cola',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Cola_acuminata_-_Köhler–s_Medizinal-Pflanzen-043.jpg/640px-Cola_acuminata_-_Köhler–s_Medizinal-Pflanzen-043.jpg',
        description: 'A noz sagrada da comunicação com os Orixás.'
    },
    'orogbo': {
        yorubaName: 'Orogbo',
        scientificName: 'Garcinia kola',
        commonName: 'Bitter Kola',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Garcinia_kola_seeds.jpg/640px-Garcinia_kola_seeds.jpg',
        description: 'A noz da longevidade, consagrada a Sango.'
    }
};
