
export interface ContentItem {
  id: string;
  title: string;
  image: string;
  category: 'canais' | 'filmes' | 'series' | 'novelas';
  description?: string;
  rating?: string;
  year?: number;
}

export interface User {
  name: string;
  email: string;
  isSubscribed: boolean;
}
