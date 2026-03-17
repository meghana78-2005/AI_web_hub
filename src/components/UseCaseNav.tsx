import React from 'react';
import { 
  Video, 
  Image as ImageIcon, 
  Type, 
  Code, 
  Music, 
  Search, 
  BarChart3, 
  Briefcase,
  GraduationCap,
  HeartPulse,
  Scale,
  Users
} from 'lucide-react';

interface UseCase {
  id: string;
  label: string;
  icon: React.ReactNode;
  category: string;
}

const USE_CASES: UseCase[] = [
  { id: 'make-videos', label: 'Make Videos', icon: <Video className="w-4 h-4" />, category: 'video-editing' },
  { id: 'create-art', label: 'Create Art', icon: <ImageIcon className="w-4 h-4" />, category: 'image-generation' },
  { id: 'write-content', label: 'Write Content', icon: <Type className="w-4 h-4" />, category: 'text-writing' },
  { id: 'build-apps', label: 'Build Apps', icon: <Code className="w-4 h-4" />, category: 'coding-assistants' },
  { id: 'make-music', label: 'Make Music', icon: <Music className="w-4 h-4" />, category: 'audio-music' },
  { id: 'analyze-data', label: 'Analyze Data', icon: <BarChart3 className="w-4 h-4" />, category: 'data' },
  { id: 'study-learn', label: 'Study & Learn', icon: <GraduationCap className="w-4 h-4" />, category: 'education' },
  { id: 'run-business', label: 'Run Business', icon: <Briefcase className="w-4 h-4" />, category: 'finance' },
  { id: 'health-wellness', label: 'Health', icon: <HeartPulse className="w-4 h-4" />, category: 'healthcare' },
  { id: 'legal-help', label: 'Legal', icon: <Scale className="w-4 h-4" />, category: 'legal' },
  { id: 'hiring-hr', label: 'HR / Hiring', icon: <Users className="w-4 h-4" />, category: 'hr' },
  { id: 'search-research', label: 'Research', icon: <Search className="w-4 h-4" />, category: 'search' },
];

interface UseCaseNavProps {
  activeUseCase: string | null;
  onUseCaseSelect: (categoryId: string | null) => void;
}

export function UseCaseNav({ activeUseCase, onUseCaseSelect }: UseCaseNavProps) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 px-1">What do you want to do?</h2>
      <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar scroll-smooth">
        <button
          onClick={() => onUseCaseSelect(null)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 font-medium text-sm shadow-sm
            ${activeUseCase === null 
              ? 'bg-blue-600 text-white translate-y-[-2px] shadow-lg shadow-blue-200 dark:shadow-blue-900/20' 
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
        >
          All Tools
        </button>
        {USE_CASES.map((uc) => (
          <button
            key={uc.id}
            onClick={() => onUseCaseSelect(uc.category)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 font-medium text-sm shadow-sm
              ${activeUseCase === uc.category
                ? 'bg-blue-600 text-white translate-y-[-2px] shadow-lg shadow-blue-200 dark:shadow-blue-900/20' 
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <span className={activeUseCase === uc.category ? 'text-white' : 'text-blue-500'}>
              {uc.icon}
            </span>
            {uc.label}
          </button>
        ))}
      </div>
    </div>
  );
}
