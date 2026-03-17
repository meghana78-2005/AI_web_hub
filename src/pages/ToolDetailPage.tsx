import { useEffect, useState } from 'react';
import { Tool } from '../types/database';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Loader2, ExternalLink } from 'lucide-react';

interface ToolDetailPageProps {
  toolSlug: string;
  onBack: () => void;
}

export function ToolDetailPage({ toolSlug, onBack }: ToolDetailPageProps) {
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTool = async () => {
      try {
        const { data } = await supabase.from('tools').select('*').eq('slug', toolSlug).maybeSingle();
        if (data) setTool(data);
      } catch (error) {
        console.error('Error loading tool:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTool();
  }, [toolSlug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400" />
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tool not found</h2>
        <button onClick={onBack} className="text-blue-600 dark:text-blue-400 hover:underline">
          Go back home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{tool.name}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">{tool.description}</p>
          </div>
          <a href={tool.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
            Visit Website <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Pricing</h2>
          <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium">
            {tool.pricing}
          </span>
        </div>
      </div>
    </div>
  );
}
