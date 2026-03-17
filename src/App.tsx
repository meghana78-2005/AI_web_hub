import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ToolDetailPage } from './pages/ToolDetailPage';
import { QuizPage } from './pages/QuizPage';
import { ComparisonPage } from './pages/ComparisonPage';
import { ComparisonBar } from './components/ComparisonBar';
import { useNavigation } from './hooks/useNavigation';
import { Chatbot } from './components/Chatbot';
import { Tool } from './types/database';

function App() {
  const { navState, goHome, goToTool, goToQuiz, goToCompare } = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTools, setSelectedTools] = useState<Tool[]>([]);

  const handleCompareToggle = (tool: Tool) => {
    setSelectedTools(prev => {
      const isSelected = prev.some(t => t.id === tool.id);
      if (isSelected) {
        return prev.filter(t => t.id !== tool.id);
      } else {
        if (prev.length >= 3) {
           alert("You can compare up to 3 tools at a time.");
           return prev;
        }
        return [...prev, tool];
      }
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (navState.page !== 'home') {
      goHome();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar 
        onSearch={handleSearch} 
        searchQuery={searchQuery} 
        onQuizClick={goToQuiz}
        onHomeClick={goHome}
      />

      {navState.page === 'home' && (
        <HomePage
          onToolClick={goToTool}
          searchQuery={searchQuery}
          selectedTools={selectedTools}
          onCompareToggle={handleCompareToggle}
        />
      )}

      {navState.page === 'category' && navState.categorySlug && (
        <CategoryPage
          categorySlug={navState.categorySlug}
          onToolClick={goToTool}
          onBack={goHome}
          onCompareToggle={handleCompareToggle}
          selectedToolIds={selectedTools.map(t => t.id)}
        />
      )}

      {navState.page === 'tool' && navState.toolSlug && (
        <ToolDetailPage toolSlug={navState.toolSlug} onBack={goHome} />
      )}

      {navState.page === 'quiz' && (
        <QuizPage onToolClick={goToTool} onBack={goHome} />
      )}

      {navState.page === 'compare' && navState.toolIds && (
        <ComparisonPage 
          toolIds={navState.toolIds} 
          onBack={goHome} 
          onToolClick={goToTool} 
        />
      )}

      <ComparisonBar 
        selectedTools={selectedTools}
        onRemove={(id) => setSelectedTools(prev => prev.filter(t => t.id !== id))}
        onClear={() => setSelectedTools([])}
        onCompare={() => goToCompare(selectedTools.map(t => t.id))}
      />

      <Chatbot />
    </div>
  );
}

export default App;
