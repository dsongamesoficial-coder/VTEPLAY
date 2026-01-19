
export interface ContentItem {
  id: string;
  title: string;
  image: string;
  category: 'canais' | 'filmes' | 'series' | 'novelas';
  description?: string;
  rating?: string;
  year?: number;
  videoUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  isSubscribed: boolean;
  createdAt: string;
}
