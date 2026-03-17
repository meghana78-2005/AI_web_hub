import { X, ArrowRight } from 'lucide-react';
import { Tool } from '../types/database';

interface ComparisonBarProps {
  selectedTools: Tool[];
  onRemove: (toolId: string) => void;
  onCompare: () => void;
  onClear: () => void;
}

export function ComparisonBar({ selectedTools, onRemove, onCompare, onClear }: ComparisonBarProps) {
  if (selectedTools.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[95%] max-w-2xl">
      <div className="bg-gray-900 dark:bg-blue-950 text-white p-4 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-xl flex items-center justify-between gap-4 animate-in slide-in-from-bottom-10 duration-500">
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-1">
          <div className="flex -space-x-3">
            {selectedTools.map((tool) => (
              <div key={tool.id} className="relative group shrink-0">
                <div className="w-12 h-12 rounded-xl bg-white/10 border-2 border-gray-900 dark:border-blue-950 flex items-center justify-center font-bold text-sm overflow-hidden text-blue-400">
                  {tool.name.charAt(0)}
                </div>
                <button 
                  onClick={() => onRemove(tool.id)}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {selectedTools.length < 2 && (
              <div className="w-12 h-12 rounded-xl border-2 border-dashed border-white/20 flex items-center justify-center text-white/30 text-xs text-center px-1 leading-tight">
                Add Tool
              </div>
            )}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold">{selectedTools.length} tool{selectedTools.length > 1 ? 's' : ''} selected</p>
            <p className="text-[10px] text-white/50 uppercase tracking-widest">Side-by-side comparison</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onClear}
            className="text-xs font-bold text-white/50 hover:text-white transition-colors px-2"
          >
            Clear
          </button>
          <button 
            disabled={selectedTools.length < 2}
            onClick={onCompare}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
              selectedTools.length >= 2 
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30' 
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            {selectedTools.length < 2 ? 'Select 2' : 'Compare Now'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
