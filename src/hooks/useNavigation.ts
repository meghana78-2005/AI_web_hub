import { useState } from 'react';

export type Page = 'home' | 'category' | 'tool';

export interface NavigationState {
  page: Page;
  categorySlug?: string;
  toolSlug?: string;
}

export function useNavigation() {
  const [navState, setNavState] = useState<NavigationState>({ page: 'home' });

  const goHome = () => setNavState({ page: 'home' });

  const goToCategory = (categorySlug: string) =>
    setNavState({ page: 'category', categorySlug });

  const goToTool = (toolSlug: string) =>
    setNavState({ page: 'tool', toolSlug });

  return {
    navState,
    goHome,
    goToCategory,
    goToTool,
  };
}
