
import { HerbInfo } from '../types';

// Keys are now simplified to the core name (lowercase, no accents) for easier matching
export const HERB_DATABASE: Record<string, HerbInfo> = {
    'rinrin': {
        yorubaName: 'Ewe Rinrin',
        scientificName: 'Peperomia pellucida',
        commonName: 'Erva de Jabuti / Língua de Sapo',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Peperomia_pellucida_in_Kerala.jpg/640px-Peperomia_pellucida_in_Kerala.jpg',
        description: 'Usada para calma, frescor e atrair coisas boas. Folha carnuda e brilhante.',
        classification: 'ero',
        element: 'water',
        orishas: ['Oshun', 'Obatala'],
        liturgy: 'Banhos de frescor (tutu), limpeza de Ori e atrair prosperidade.'
    },
    'odundun': {
        yorubaName: 'Ewe Odundun',
        scientificName: 'Kalanchoe pinnata',
        commonName: 'Folha da Costa / Saião',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Kalanchoe_pinnata_fleur.jpg/640px-Kalanchoe_pinnata_fleur.jpg',
        description: 'A "Rei das Ervas". Usada para tudo que precisa de calma (tutu), cura e proteção.',
        classification: 'ero',
        element: 'water',
        orishas: ['Obatala', 'Oshun', 'Ifa'],
        liturgy: 'Essencial em quase todos os Ebós de paz e cura. Lavagem de assentamentos.'
    },
    'saiao': {
        yorubaName: 'Ewe Odundun',
        scientificName: 'Kalanchoe pinnata',
        commonName: 'Folha da Costa / Saião',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Kalanchoe_pinnata_fleur.jpg/640px-Kalanchoe_pinnata_fleur.jpg',
        description: 'A "Rei das Ervas". Usada para tudo que precisa de calma (tutu), cura e proteção.',
        classification: 'ero',
        element: 'water',
        orishas: ['Obatala', 'Oshun', 'Ifa'],
        liturgy: 'Essencial em quase todos os Ebós de paz e cura. Lavagem de assentamentos.'
    },
    'tete': {
        yorubaName: 'Ewe Tete',
        scientificName: 'Amaranthus viridis',
        commonName: 'Bredo / Caruru',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Amaranthus_viridis.jpg/640px-Amaranthus_viridis.jpg',
        description: 'Erva primordial. "Tete a tete gbe ile" (Tete que chega cedo em casa). Para prosperidade e inícios.',
        classification: 'ero',
        element: 'earth',
        orishas: ['Ifa', 'Oshun', 'Iyami'],
        liturgy: 'Usada para apaziguar e trazer sorte imediata. Comida de Orixá.'
    },
    'aje': {
        yorubaName: 'Ewe Aje',
        scientificName: 'Alternanthera tenella',
        commonName: 'Periquito / Apaga-Fogo',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Alternanthera_tenella_2.jpg/640px-Alternanthera_tenella_2.jpg',
        description: 'A erva da riqueza e das bruxas (Iyami). Essencial para magias de dinheiro.',
        classification: 'gun',
        element: 'fire',
        orishas: ['Iyami', 'Oshun', 'Exu'],
        liturgy: 'Trabalhos de prosperidade (Aje) e proteção contra feitiçaria.'
    },
    'akoko': {
        yorubaName: 'Ewe Akoko',
        scientificName: 'Newbouldia laevis',
        commonName: 'Isopo / Akoko',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Newbouldia_laevis.jpg/640px-Newbouldia_laevis.jpg',
        description: 'A folha da coroação. Usada para cargos, títulos e honrarias.',
        classification: 'ero',
        element: 'air',
        orishas: ['Ogun', 'Sango', 'Obatala'],
        liturgy: 'Assentamentos de Orixá e rituais de consagração de títulos.'
    },
    'efinrin': {
        yorubaName: 'Ewe Efinrin',
        scientificName: 'Ocimum gratissimum',
        commonName: 'Alfavaca / Manjericão',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Ocimum_gratissimum_0001.jpg/640px-Ocimum_gratissimum_0001.jpg',
        description: 'Usada para banhos de descarrego, limpeza estomacal e espantar maus espíritos.',
        classification: 'gun',
        element: 'air',
        orishas: ['Exu', 'Ogun', 'Oya'],
        liturgy: 'Limpeza de ambientes e banhos de proteção energética forte.'
    },
    'peregun': {
        yorubaName: 'Ewe Peregun',
        scientificName: 'Dracaena fragrans',
        commonName: 'Pau d\'Água / Coqueiro de Vênus',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Dracaena_fragrans_Tour._1.jpg/640px-Dracaena_fragrans_Tour._1.jpg',
        description: 'Símbolo de vitória e resistência. "Peregun a li aso" (Peregun tem roupas novas).',
        classification: 'gun',
        element: 'earth',
        orishas: ['Ogun', 'Osanyin'],
        liturgy: 'Usada para vencer demandas e abrir caminhos fechados.'
    },
    'pau dagua': {
        yorubaName: 'Ewe Peregun',
        scientificName: 'Dracaena fragrans',
        commonName: 'Pau d\'Água / Coqueiro de Vênus',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Dracaena_fragrans_Tour._1.jpg/640px-Dracaena_fragrans_Tour._1.jpg',
        description: 'Símbolo de vitória e resistência. "Peregun a li aso" (Peregun tem roupas novas).',
        classification: 'gun',
        element: 'earth',
        orishas: ['Ogun', 'Osanyin'],
        liturgy: 'Vencer demandas e proteção.'
    },
    'ewuro': {
        yorubaName: 'Ewe Ewuro',
        scientificName: 'Vernonia amygdalina',
        commonName: 'Alumã / Boldo Baiano',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Vernonia_amygdalina.jpg/640px-Vernonia_amygdalina.jpg',
        description: 'Amarga, mas cura. Usada para retirar energias negativas profundas e doenças.',
        classification: 'gun',
        element: 'earth',
        orishas: ['Obatala', 'Babalu Aye'],
        liturgy: 'Banhos de descarrego pesado e rituais de cura física.'
    },
    'alupaida': {
        yorubaName: 'Ewe Alupaida',
        scientificName: 'Uraria picta',
        commonName: 'Língua de Vaca / Alupaida',
        imageUrl: 'https://inaturalist-open-data.s3.amazonaws.com/photos/109594255/medium.jpg',
        description: 'A folha que monta o mal. "Alupaida pa ibi da" (Alupaida muda o mal para bem).',
        classification: 'gun',
        element: 'fire',
        orishas: ['Exu', 'Ogun', 'Sango'],
        liturgy: 'Magia de proteção e inversão de feitiços negativos.'
    },
    'sawerepepe': {
        yorubaName: 'Ewe Sawerepepe',
        scientificName: 'Cyathula prostrata',
        commonName: 'Erva de Exu / Pega-Pega',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Cyathula_prostrata.jpg/640px-Cyathula_prostrata.jpg',
        description: 'A erva da sorte rápida e da atração de clientes.',
        classification: 'gun',
        element: 'air',
        orishas: ['Exu', 'Oshun'],
        liturgy: 'Afose (feitiço de voz) e banhos de atração financeira rápida.'
    },
    'obi': {
        yorubaName: 'Obi Abata',
        scientificName: 'Cola acuminata',
        commonName: 'Noz de Cola',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Cola_acuminata_-_Köhler–s_Medizinal-Pflanzen-043.jpg/640px-Cola_acuminata_-_Köhler–s_Medizinal-Pflanzen-043.jpg',
        description: 'A noz sagrada da comunicação com os Orixás.',
        classification: 'ero',
        element: 'earth',
        orishas: ['Todos'],
        liturgy: 'Oráculo de consulta e oferenda principal para apaziguar Orixás.'
    },
    'orogbo': {
        yorubaName: 'Orogbo',
        scientificName: 'Garcinia kola',
        commonName: 'Bitter Kola',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Garcinia_kola_seeds.jpg/640px-Garcinia_kola_seeds.jpg',
        description: 'A noz da longevidade, consagrada a Sango.',
        classification: 'gun',
        element: 'fire',
        orishas: ['Sango', 'Egum'],
        liturgy: 'Oferenda para justiça, força e longevidade.'
    },
    'iye': {
        yorubaName: 'Ewe Iye',
        scientificName: 'Spondias mombin',
        commonName: 'Cajazeiro / Tapareba',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Spondias_mombin_Leaves.jpg/640px-Spondias_mombin_Leaves.jpg',
        description: 'A folha da memória e inteligência.',
        classification: 'ero',
        element: 'air',
        orishas: ['Iyami', 'Oya'],
        liturgy: 'Invocação das Iyamis e trabalhos de memória/aprendizado.'
    },
    'gbegbe': {
        yorubaName: 'Ewe Gbegbe',
        scientificName: 'Icacina trichantha',
        commonName: 'Gbegbe',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png',
        description: 'A folha que transporta desejos.',
        classification: 'ero',
        element: 'air',
        orishas: ['Exu'],
        liturgy: 'Usada em mensageiros e para fazer pedidos chegarem ao destino.'
    }
};
