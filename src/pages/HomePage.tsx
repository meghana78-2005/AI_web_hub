import { useEffect, useState } from 'react';
import { Tool } from '../types/database';

import { ToolCard } from '../components/ToolCard';
import { Loader2, Bot, Sparkles, MessageSquareHeart } from 'lucide-react';
import { LOCAL_TOOLS } from '../lib/localData';

interface HomePageProps {
  onToolClick: (slug: string) => void;
  searchQuery: string;
}

export function HomePage({ onToolClick, searchQuery }: HomePageProps) {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [robotMessage, setRobotMessage] = useState("Hi there! I'm here to help you discover amazing AI tools.");

  useEffect(() => {
    // Always use LOCAL_TOOLS so all 92 tools are always visible
    setTools(LOCAL_TOOLS as any);
    setLoading(false);
  }, []);

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRobotClick = () => {
    const messages = [
      "Did you know AI can generate whole videos now from just text?",
      "Try searching for 'free' tools to get started quickly!",
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
          <p className="text-blue-100 text-lg sm:text-xl">Explore the most powerful Artificial Intelligence tools curated just for you. Click on the robot to see what it has to say!</p>
        </div>
        
        {/* The Robot */}
        <div className="relative z-10 hidden sm:flex flex-col items-center group cursor-pointer" onClick={handleRobotClick}>
          
          <div className="absolute -top-16 right-10 bg-white text-gray-800 text-sm py-2 px-4 rounded-2xl shadow-xl w-48 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:-translate-y-2 transition-all duration-300 z-20">
            <div className="flex items-start gap-2">
              <MessageSquareHeart className="w-4 h-4 text-pink-500 mt-1 flex-shrink-0" />
              <p className="font-medium">{robotMessage}</p>
            </div>
            <div className="absolute -bottom-2 right-12 w-4 h-4 bg-white transform rotate-45"></div>
          </div>

          <div className="w-32 h-32 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.3)] animate-[bounce_3s_ease-in-out_infinite] hover:scale-110 transition-transform hover:rotate-12 duration-500">
            <Bot className="w-20 h-20 text-white" />
          </div>
          <div className="w-20 h-4 bg-black/20 rounded-full blur-sm mt-4 animate-[pulse_3s_ease-in-out_infinite]"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTools.map((tool, idx) => (
          <ToolCard key={tool.id || idx} tool={tool} onClick={onToolClick} />
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-gray-400">
            No tools found matching your search.
          </p>
        </div>
      )}
    </div>
  );
}
