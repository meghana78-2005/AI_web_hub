import { useEffect, useState, useMemo } from 'react';
import { Tool } from '../types/database';

import { ToolCard } from '../components/ToolCard';
import { Loader2, Bot, Sparkles, MessageSquareHeart, Trophy, Zap, MousePointer2, Star } from 'lucide-react';
import { LOCAL_TOOLS } from '../lib/localData';
import { UseCaseNav } from '../components/UseCaseNav';

interface HomePageProps {
  onToolClick: (slug: string) => void;
  searchQuery: string;
  selectedTools: Tool[];
  onCompareToggle: (tool: Tool) => void;
}

export function HomePage({ 
  onToolClick, 
  searchQuery, 
  selectedTools,
  onCompareToggle
}: HomePageProps) {
  const [activeUseCase, setActiveUseCase] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [robotMessage, setRobotMessage] = useState("Hi there! I'm here to help you discover amazing AI tools.");

  useEffect(() => {
    // Artificial delay for smooth transition
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredTools = useMemo(() => {
    return LOCAL_TOOLS.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.tags?.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesUseCase = !activeUseCase || tool.category_slug === activeUseCase;
      
      return matchesSearch && matchesUseCase;
    });
  }, [searchQuery, activeUseCase]);

  // Curated "Best Tool For..." selections
  const bestTools = useMemo(() => [
    { label: 'Best for Beginners', toolId: 't1', icon: <MousePointer2 className="w-5 h-5 text-green-500" />, desc: 'ChatGPT is the perfect starting point.' },
    { label: 'Best for Quality', toolId: 'i1', icon: <Trophy className="w-5 h-5 text-yellow-500" />, desc: 'Midjourney leads in artistic quality.' },
    { label: 'Best for Speed', toolId: 'c2', icon: <Zap className="w-5 h-5 text-blue-500" />, desc: 'Cursor makes coding lightning fast.' },
    { label: 'Top Rated', toolId: 'v3', icon: <Star className="w-5 h-5 text-purple-500" />, desc: 'Sora is the most advanced video AI.' }
  ], []);

  const handleRobotClick = () => {
    const messages = [
      "Did you know AI can generate whole videos now from just text?",
      "Try the 'Use Case' filters to find tools for a specific task!",
      "I think you look great today! Also, check out the Image Generation tools.",
      "Beep boop! Need help writing code? Check out the Coding Assistants.",
      "If you're looking to save time, the Productivity category is for you."
    ];
    setRobotMessage(messages[Math.floor(Math.random() * messages.length)]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Interactive Robot Dashboard Header */}
      <div className="relative mb-12 p-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-between group">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
        <div className="relative z-10 text-white max-w-xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 flex items-center gap-3">
            AI Tools Discovery Hub <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
          </h1>
          <p className="text-blue-100 text-lg sm:text-xl">Discover {LOCAL_TOOLS.length}+ powerful AI tools curated for your workflow.</p>
          <div className="mt-6 flex flex-wrap gap-4">
             <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-sm font-medium">
               🔥 12 Categories
             </div>
             <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-sm font-medium">
               ⭐ Verified Ratings
             </div>
          </div>
        </div>
        
        {/* The Robot */}
        <div className="relative z-10 hidden sm:flex flex-col items-center group cursor-pointer" onClick={handleRobotClick}>
          <div className="absolute -top-20 right-0 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm py-4 px-6 rounded-3xl shadow-2xl w-64 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-20 border border-blue-100 dark:border-gray-700">
            <div className="flex items-start gap-3">
              <MessageSquareHeart className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" />
              <p className="font-semibold leading-relaxed">{robotMessage}</p>
            </div>
            <div className="absolute -bottom-2 right-12 w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45 border-r border-b border-blue-100 dark:border-gray-700"></div>
          </div>

          <div className="w-32 h-32 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.3)] animate-[bounce_3s_ease-in-out_infinite] hover:scale-110 transition-transform hover:rotate-12 duration-500">
            <Bot className="w-20 h-20 text-white" />
          </div>
          <div className="w-20 h-4 bg-black/20 rounded-full blur-sm mt-4 animate-[pulse_3s_ease-in-out_infinite]"></div>
        </div>
      </div>

      {/* Use Case Navigation */}
      <UseCaseNav activeUseCase={activeUseCase} onUseCaseSelect={setActiveUseCase} />

      {!activeUseCase && !searchQuery && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Best Tool For...</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestTools.map((bt, idx) => {
              const tool = LOCAL_TOOLS.find(t => t.id === bt.toolId);
              return (
                <div 
                  key={idx} 
                  className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => tool && onToolClick(tool.id)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                      {bt.icon}
                    </div>
                    <span className="font-bold text-gray-800 dark:text-white text-sm">{bt.label}</span>
                  </div>
                  <h3 className="font-bold text-lg text-blue-600 dark:text-blue-400 mb-1">{tool?.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{bt.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {activeUseCase ? 'Results' : 'All Featured Tools'}
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          Showing {filteredTools.length} tools
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTools.map((tool, idx) => (
          <ToolCard 
            key={tool.id || idx} 
            tool={tool} 
            onClick={onToolClick}
            isSelectedForComparison={selectedTools.some(t => t.id === tool.id)}
            onCompareToggle={() => onCompareToggle(tool)}
          />
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
          <Bot className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">No tools found</h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            We couldn't find any tools matching your current search or filters. Try selecting a different use case or clearing your search.
          </p>
          <button 
            onClick={() => {setActiveUseCase(null);}}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 dark:shadow-none"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
