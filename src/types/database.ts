export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  pricing: string;
  view_count: number;
  slug: string;
  category_id: string;
  image_url?: string;
  created_at?: string;
  is_trending?: boolean;
  use_cases?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  created_at?: string;
}
