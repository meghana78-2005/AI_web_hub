import { useEffect, useState } from 'react';
import { Category, Tool } from '../types/database';
import { LOCAL_TOOLS, LOCAL_CATEGORIES } from '../lib/localData';
import { ToolCard } from '../components/ToolCard';
import { ArrowLeft, Loader2, Bot } from 'lucide-react';
import * as Icons from 'lucide-react';

interface CategoryPageProps {
  categorySlug: string;
  onToolClick: (slug: string) => void;
  onBack: () => void;
  onCompareToggle: (tool: Tool) => void;
  selectedToolIds: string[];
}

export function CategoryPage({
  categorySlug,
  onToolClick,
  onBack,
  onCompareToggle,
  selectedToolIds
}: CategoryPageProps) {
  const [category, setCategory] = useState<Category | null>(null);
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPricing, setSelectedPricing] = useState<string>('all');

  useEffect(() => {
    // Load from local data
    const foundCategory = LOCAL_CATEGORIES.find(c => c.slug === categorySlug);
    if (foundCategory) {
      setCategory(foundCategory);
      const categoryTools = LOCAL_TOOLS.filter(t => t.category_slug === categorySlug);
      setTools(categoryTools);
    }
    setLoading(false);
  }, [categorySlug]);

  const filteredTools =
    selectedPricing === 'all'
      ? tools
      : tools.filter((tool) => tool.pricing === selectedPricing);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Category not found
        </h2>
        <button
          onClick={onBack}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Go back home
        </button>
      </div>
    );
  }

  const IconComponent = (Icons[category.icon as keyof typeof Icons] as React.ElementType) || Icons.Folder;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </button>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
            <IconComponent className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {category.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Filter by pricing:
        </span>
        <div className="flex gap-2">
          {['all', 'Free', 'Freemium', 'Paid'].map((pricing) => (
            <button
              key={pricing}
              onClick={() => setSelectedPricing(pricing)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPricing === pricing
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {pricing === 'all' ? 'All' : pricing}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <ToolCard 
            key={tool.id} 
            tool={tool} 
            onClick={onToolClick}
            isSelectedForComparison={selectedToolIds.includes(tool.id)}
            onCompareToggle={() => onCompareToggle(tool)}
          />
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
          <Bot className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-xl font-bold text-gray-900 dark:text-white mb-2">No tools found</p>
          <p className="text-gray-600 dark:text-gray-400">Try changing your filters or check other categories.</p>
        </div>
      )}
    </div>
  );
}
