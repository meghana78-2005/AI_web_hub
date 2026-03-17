import { useState } from 'react';

export type Page = 'home' | 'category' | 'tool' | 'quiz' | 'compare';

export interface NavigationState {
  page: Page;
  categorySlug?: string;
  toolSlug?: string;
  toolIds?: string[];
}

export function useNavigation() {
  const [navState, setNavState] = useState<NavigationState>({ page: 'home' });

  const goHome = () => setNavState({ page: 'home' });

  const goToCategory = (categorySlug: string) =>
    setNavState({ page: 'category', categorySlug });

  const goToTool = (toolSlug: string) =>
    setNavState({ page: 'tool', toolSlug });

  const goToQuiz = () =>
    setNavState({ page: 'quiz' });

  const goToCompare = (toolIds: string[]) =>
    setNavState({ page: 'compare', toolIds });

  return {
    navState,
    goHome,
    goToCategory,
    goToTool,
    goToQuiz,
    goToCompare,
  };
}
