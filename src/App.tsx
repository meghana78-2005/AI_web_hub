import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ToolDetailPage } from './pages/ToolDetailPage';
import { useNavigation } from './hooks/useNavigation';
import { Chatbot } from './components/Chatbot';

function App() {
  const { navState, goHome, goToTool } = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (navState.page !== 'home') {
      goHome();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar onSearch={handleSearch} searchQuery={searchQuery} />

      {navState.page === 'home' && (
        <HomePage
          onToolClick={goToTool}
          searchQuery={searchQuery}
        />
      )}

      {navState.page === 'category' && navState.categorySlug && (
        <CategoryPage
          categorySlug={navState.categorySlug}
          onToolClick={goToTool}
          onBack={goHome}
        />
      )}

      {navState.page === 'tool' && navState.toolSlug && (
        <ToolDetailPage toolSlug={navState.toolSlug} onBack={goHome} />
      )}

      <Chatbot />
    </div>
  );
}

export default App;
