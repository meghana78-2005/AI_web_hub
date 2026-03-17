import { ArrowLeft, Check, Star, Bot } from 'lucide-react';
import { LOCAL_TOOLS } from '../lib/localData';

interface ComparisonPageProps {
  toolIds: string[];
  onBack: () => void;
  onToolClick: (slug: string) => void;
}

export function ComparisonPage({ toolIds, onBack, onToolClick }: ComparisonPageProps) {
  const tools = LOCAL_TOOLS.filter(t => toolIds.includes(t.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={onBack} 
        className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors mb-8 font-medium"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Tools
      </button>

      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Tool Comparison</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Compare features, pricing, and ratings side-by-side to find the best fit for your workflow.</p>
      </div>

      <div className="overflow-x-auto pb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-tl-3xl text-left border-b border-gray-100 dark:border-gray-700 w-1/4">Feature</th>
              {tools.map((tool, idx) => (
                <th 
                  key={tool.id} 
                  className={`p-6 bg-white dark:bg-gray-800 text-left border-b border-gray-100 dark:border-gray-700 min-w-[300px] ${idx === tools.length - 1 ? 'rounded-tr-3xl' : ''}`}
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {tool.name.charAt(0)}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{tool.name}</h2>
                    <button 
                      onClick={() => onToolClick(tool.id)}
                      className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline text-left"
                    >
                      View Details
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {/* Description */}
            <tr>
              <td className="p-6 font-bold border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">Description</td>
              {tools.map(tool => (
                <td key={tool.id} className="p-6 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 align-top">
                  <p className="text-sm leading-relaxed">{tool.description}</p>
                </td>
              ))}
            </tr>
            {/* Rating */}
            <tr>
              <td className="p-6 font-bold border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">Rating</td>
              {tools.map(tool => (
                <td key={tool.id} className="p-6 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <div className="flex items-center gap-1.5 text-yellow-500 font-bold">
                    <Star className="w-4 h-4 fill-current" />
                    {tool.rating || 'N/A'}
                  </div>
                </td>
              ))}
            </tr>
            {/* Pricing */}
            <tr>
              <td className="p-6 font-bold border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">Pricing Model</td>
              {tools.map(tool => (
                <td key={tool.id} className="p-6 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                   <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-bold">
                     {tool.pricing}
                   </span>
                </td>
              ))}
            </tr>
            {/* Tags */}
            <tr>
              <td className="p-6 font-bold border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-bl-3xl">Highlights</td>
              {tools.map((tool, idx) => (
                <td 
                  key={tool.id} 
                  className={`p-6 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 ${idx === tools.length - 1 ? 'rounded-br-3xl' : ''}`}
                >
                  <div className="flex flex-wrap gap-2">
                    {tool.tags?.map((tag: string, i: number) => (
                      <div key={i} className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-md">
                        <Check className="w-3 h-3 text-green-500" /> {tag}
                      </div>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-12 text-center p-12 bg-blue-50 dark:bg-gray-800/50 rounded-3xl border border-blue-100 dark:border-gray-700">
        <Bot className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Need more help choosing?</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 font-medium">Try our AI Recommender Quiz to get a personalized toolkit based on your goals.</p>
        <button 
           onClick={onBack}
           className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 dark:shadow-none"
        >
          Check AI Quiz
        </button>
      </div>
    </div>
  );
}
