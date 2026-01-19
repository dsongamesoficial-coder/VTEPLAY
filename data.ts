import { ContentItem } from './types';

export const HERO_SLIDES = [
  {
    id: '1',
    title: 'BBB 26: Acompanhe 24h',
    image: 'https://images.unsplash.com/photo-1593072092524-3200b2046326?q=80&w=1920&auto=format&fit=crop',
    description: 'A casa mais vigiada do Brasil agora na VTEPLAY. Assista a todas as câmeras em tempo real.',
    category: 'canais'
  },
  {
    id: '2',
    title: 'Pedaço de Mim',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop',
    description: 'A primeira novela original Netflix Brasil. Um drama intenso sobre maternidade e segredos.',
    category: 'novelas'
  },
  {
    id: '3',
    title: 'Pantanal',
    image: 'https://images.unsplash.com/photo-1440613905118-99b921706b5c?q=80&w=1920&auto=format&fit=crop',
    description: 'O épico que parou o Brasil. A saga de Juma Marruá e a família Leôncio em 4K.',
    category: 'novelas'
  },
  {
    id: '4',
    title: 'Premiere: Brasileirão',
    image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1920&auto=format&fit=crop',
    description: 'Assista a todos os jogos do seu time do coração ao vivo e em alta definição.',
    category: 'canais'
  }
];

export const CANAIS: ContentItem[] = [
  // ABERTOS & REGIONAIS
  { id: 'c1', title: 'Globo Nordeste', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/TV_Globo_logo.svg/1024px-TV_Globo_logo.svg.png', category: 'canais' },
  { id: 'c11', title: 'SBT Ao Vivo', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/SBT_logo.svg/1200px-SBT_logo.svg.png', category: 'canais' },
  { id: 'c13', title: 'Record TV', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/RecordTV_logo.svg/1200px-RecordTV_logo.svg.png', category: 'canais' },
  { id: 'c12', title: 'Band', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Band_logo.svg/1200px-Band_logo.svg.png', category: 'canais' },
  
  // INFANTIL
  { id: 'kids1', title: 'Disney Channel', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Disney_Channel_logo.svg/1200px-Disney_Channel_logo.svg.png', category: 'canais' },
  { id: 'kids2', title: 'Cartoon Network', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Cartoon_Network_2010_logo.svg/1200px-Cartoon_Network_2010_logo.svg.png', category: 'canais' },

  // CLÁSSICOS 24H
  { id: '24h1', title: 'Chaves 24 Horas', image: 'https://upload.wikimedia.org/wikipedia/pt/thumb/f/f6/El_Chavo_del_Ocho.svg/1200px-El_Chavo_del_Ocho.svg.png', category: 'canais' },
  
  // ESPORTES & NOTÍCIAS
  { id: 'sp1', title: 'SporTV 1', image: 'https://upload.wikimedia.org/wikipedia/pt/thumb/a/ab/Logotipo_SporTV.png/250px-Logotipo_SporTV.png', category: 'canais' },
  { id: 'pre1', title: 'Premiere 1', image: 'https://upload.wikimedia.org/wikipedia/pt/thumb/e/e0/Logotipo_Premiere.png/250px-Logotipo_Premiere.png', category: 'canais' },
  { id: 'news2', title: 'BandNews TV', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/BandNews_TV_logo.svg/1200px-BandNews_TV_logo.svg.png', category: 'canais' },
  { id: 'c7', title: 'GloboNews', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Globonews_2021.png/1200px-Globonews_2021.png', category: 'canais' },
];

export const FILMES: ContentItem[] = [
  // NETFLIX ORIGINALS
  { id: 'f_n1', title: 'O Irlandês', image: 'https://picsum.photos/seed/irlandes/400/600', category: 'filmes', year: 2019 },
  { id: 'f_n2', title: 'Glass Onion', image: 'https://picsum.photos/seed/glass/400/600', category: 'filmes', year: 2022 },
  { id: 'f_n3', title: 'Alerta Vermelho', image: 'https://picsum.photos/seed/rednotice/400/600', category: 'filmes', year: 2021 },
  { id: 'f_n4', title: 'A Sociedade da Neve', image: 'https://picsum.photos/seed/snowsociety/400/600', category: 'filmes', year: 2024 },
  
  // GLOBOPLAY / CINEMA NACIONAL
  { id: 'f_g1', title: 'Cidade de Deus', image: 'https://picsum.photos/seed/cityofgod/400/600', category: 'filmes', year: 2002 },
  { id: 'f_g2', title: 'Tropa de Elite', image: 'https://picsum.photos/seed/tropadeelite/400/600', category: 'filmes', year: 2007 },
  { id: 'f_g3', title: 'O Auto da Compadecida', image: 'https://picsum.photos/seed/auto/400/600', category: 'filmes', year: 2000 },
  { id: 'f_g4', title: 'Bacurau', image: 'https://picsum.photos/seed/bacurau/400/600', category: 'filmes', year: 2019 },
];

export const SERIES: ContentItem[] = [
  // NETFLIX HITS
  { id: 's_n1', title: 'Stranger Things', image: 'https://picsum.photos/seed/stranger/400/600', category: 'series', year: 2016 },
  { id: 's_n2', title: 'Wandinha', image: 'https://picsum.photos/seed/wednesday/400/600', category: 'series', year: 2022 },
  { id: 's_n3', title: 'The Crown', image: 'https://picsum.photos/seed/crown/400/600', category: 'series', year: 2016 },
  { id: 's_n4', title: 'La Casa de Papel', image: 'https://picsum.photos/seed/moneyheist/400/600', category: 'series', year: 2017 },
  
  // GLOBOPLAY ORIGINALS
  { id: 's_g1', title: 'Todas as Flores', image: 'https://picsum.photos/seed/flores/400/600', category: 'series', year: 2022 },
  { id: 's_g2', title: 'Os Outros', image: 'https://picsum.photos/seed/others/400/600', category: 'series', year: 2023 },
];

export const NOVELAS: ContentItem[] = [
  // GLOBOPLAY (CLÁSSICOS E MODERNOS)
  { id: 'n_g1', title: 'Avenida Brasil', image: 'https://picsum.photos/seed/avenida/400/600', category: 'novelas', year: 2012 },
  { id: 'n_g2', title: 'Pantanal', image: 'https://picsum.photos/seed/pantanal/400/600', category: 'novelas', year: 2022 },
  { id: 'n_g3', title: 'Verdades Secretas', image: 'https://picsum.photos/seed/verdades/400/600', category: 'novelas', year: 2015 },
  { id: 'n_g4', title: 'Renascer', image: 'https://picsum.photos/seed/renascer/400/600', category: 'novelas', year: 2024 },
  { id: 'n_g5', title: 'Terra e Paixão', image: 'https://picsum.photos/seed/terra/400/600', category: 'novelas', year: 2023 },
  { id: 'n_g6', title: 'O Clone', image: 'https://picsum.photos/seed/clone/400/600', category: 'novelas', year: 2001 },
  { id: 'n_g7', title: 'Vale Tudo', image: 'https://picsum.photos/seed/valetudo/400/600', category: 'novelas', year: 1988 },
  { id: 'n_g8', title: 'Senhora do Destino', image: 'https://picsum.photos/seed/senhora/400/600', category: 'novelas', year: 2004 },

  // NETFLIX ORIGINALS
  { id: 'n_n1', title: 'Pedaço de Mim', image: 'https://picsum.photos/seed/pedaco/400/600', category: 'novelas', year: 2024 },
  { id: 'n_n2', title: 'Rebelde', image: 'https://picsum.photos/seed/rebelden/400/600', category: 'novelas', year: 2022 },
  { id: 'n_n3', title: 'Coração Marcado', image: 'https://picsum.photos/seed/coracao/400/600', category: 'novelas', year: 2022 },

  // SBT+ (INFANTIL E CLÁSSICOS)
  { id: 'n_s1', title: 'Carrossel', image: 'https://picsum.photos/seed/carrossel/400/600', category: 'novelas', year: 2012 },
  { id: 'n_s2', title: 'Chiquititas', image: 'https://picsum.photos/seed/chiquititas/400/600', category: 'novelas', year: 2013 },
  { id: 'n_s3', title: 'As Aventuras de Poliana', image: 'https://picsum.photos/seed/poliana/400/600', category: 'novelas', year: 2018 },
  // Removed invalid 'size' property to match ContentItem interface
  { id: 'n_s4', title: 'Cúmplices de um Resgate', image: 'https://picsum.photos/seed/cumplices/400/600', category: 'novelas', year: 2015 },
  { id: 'n_s5', title: 'Poliana Moça', image: 'https://picsum.photos/seed/polianam/400/600', category: 'novelas', year: 2022 },
  { id: 'n_s6', title: 'A Infância de Romeu e Julieta', image: 'https://picsum.photos/seed/romeu/400/600', category: 'novelas', year: 2023 },
];