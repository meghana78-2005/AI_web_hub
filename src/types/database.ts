export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  pricing: string;
  view_count: number;
  slug?: string;
  category_slug?: string;
  image_url?: string;
  is_trending?: boolean;
  use_cases?: string[];
  rating?: number;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  created_at?: string;
}
