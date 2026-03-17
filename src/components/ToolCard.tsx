import { useState } from 'react';
import { Tool } from '../types/database';
import { ExternalLink, TrendingUp, Eye, Star, Sparkles } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
  onClick: (slug: string) => void;
  isSelectedForComparison?: boolean;
  onCompareToggle?: (e: React.MouseEvent) => void;
}

export function ToolCard({ tool, onClick, isSelectedForComparison, onCompareToggle }: ToolCardProps) {
  const [imgError, setImgError] = useState(false);
  
  // Extract domain for Clearbit logo API
  let domain = '';
  try {
    domain = new URL(tool.url).hostname.replace('www.', '');
  } catch {
    domain = tool.url; 
  }

  return (
    <div
      onClick={() => onClick(tool.slug || tool.id)}
      className="group flex flex-col justify-between cursor-pointer p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl overflow-hidden shadow-inner shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
            {!imgError && domain ? (
              <img 
                src={`https://logo.clearbit.com/${domain}?size=128`} 
                alt={`${tool.name} logo`}
                className="w-full h-full object-cover bg-white"
                onError={() => setImgError(true)}
              />
            ) : (
              tool.name.charAt(0)
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {tool.name}
              </h3>
              {onCompareToggle && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCompareToggle(e);
                  }}
                  className={`p-1 rounded-md border transition-all ${
                    isSelectedForComparison 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-400 opacity-0 group-hover:opacity-100'
                  }`}
                  title="Compare tool"
                >
                  <Sparkles className="w-3 h-3 fill-current" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                {tool.pricing}
              </span>
              {tool.is_trending && (
                <span className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400">
                  <TrendingUp className="w-3 h-3" />
                  Trending
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
          {tool.rating && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs font-bold border border-yellow-100 dark:border-yellow-800">
              <Star className="w-3 h-3 fill-current" />
              {tool.rating}
            </div>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
        {tool.description}
      </p>

      {tool.tags && tool.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tool.tags.map((tag, index) => (
            <span
              key={index}
              className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md border
                ${tag.toLowerCase().includes('hot') || tag.toLowerCase().includes('trending')
                  ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-800'
                  : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800'
                }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {tool.use_cases && tool.use_cases.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tool.use_cases.slice(0, 2).map((useCase, index) => (
            <span
              key={index}
              className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-600"
            >
              {useCase}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Eye className="w-3 h-3" />
        <span>{tool.view_count.toLocaleString()} views</span>
      </div>
    </div>
  );
}
