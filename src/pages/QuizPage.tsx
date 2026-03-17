import { useState } from 'react';
import { 
  Bot, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Video, 
  Image as ImageIcon, 
  Type, 
  Code, 
  Music,
  RefreshCw,
  Trophy
} from 'lucide-react';
import { Tool } from '../types/database';
import { LOCAL_TOOLS } from '../lib/localData';

interface Question {
  id: number;
  text: string;
  options: {
    label: string;
    value: string;
    icon?: React.ReactNode;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What do you want to create or do today?",
    options: [
      { label: "Make or Edit Videos", value: "video-editing", icon: <Video className="w-5 h-5" /> },
      { label: "Generate Images / Art", value: "image-generation", icon: <ImageIcon className="w-5 h-5" /> },
      { label: "Write Content / Text", value: "text-writing", icon: <Type className="w-5 h-5" /> },
      { label: "Build / Debug Code", value: "coding-assistants", icon: <Code className="w-5 h-5" /> },
      { label: "Create Music / Audio", value: "audio-music", icon: <Music className="w-5 h-5" /> },
    ]
  },
  {
    id: 2,
    text: "Who are you mainly using this for?",
    options: [
      { label: "Student / Learning", value: "student" },
      { label: "Content Creator / Artist", value: "creator" },
      { label: "Developer / Engineer", value: "developer" },
      { label: "Business / Professional", value: "pro" },
    ]
  },
  {
    id: 3,
    text: "What is your budget preference?",
    options: [
      { label: "Free Tools Only", value: "free" },
      { label: "Freemium / Trials", value: "freemium" },
      { label: "Paid / Professional", value: "paid" },
    ]
  },
  {
    id: 4,
    text: "What matters most to you right now?",
    options: [
      { label: "Ease of Use", value: "easy" },
      { label: "Highest Quality", value: "quality" },
      { label: "Speed / Efficiency", value: "speed" },
      { label: "Customization", value: "custom" },
    ]
  }
];

interface QuizPageProps {
  onToolClick: (slug: string) => void;
  onBack: () => void;
}

export function QuizPage({ onToolClick, onBack }: QuizPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<Tool[]>([]);

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    setIsCalculating(true);
    
    // Simulate thinking
    setTimeout(() => {
      const category = answers[1];
      const budget = answers[3];
      const preference = answers[4];

      let recommendations = LOCAL_TOOLS.filter(t => t.category_slug === category);
      
      if (budget === 'free') {
        recommendations = recommendations.sort((a, b) => {
          if (a.pricing === 'Free' && b.pricing !== 'Free') return -1;
          if (a.pricing !== 'Free' && b.pricing === 'Free') return 1;
          return 0;
        });
      } else if (budget === 'paid') {
        recommendations = recommendations.sort((a,b) => (b.rating || 0) - (a.rating || 0));
      }

      if (preference === 'quality') {
        recommendations = recommendations.sort((a,b) => (b.rating || 0) - (a.rating || 0));
      } else if (preference === 'speed') {
        recommendations = recommendations.filter(t => t.tags?.some((tag: string) => tag.toLowerCase().includes('fast') || tag.toLowerCase().includes('speed')));
        // If too restrictive, fall back to ratings
        if (recommendations.length < 2) recommendations = LOCAL_TOOLS.filter(t => t.category_slug === category).sort((a,b) => (b.rating || 0) - (a.rating || 0));
      }

      setResults(recommendations.slice(0, 3));
      setIsCalculating(false);
      setCurrentStep(QUESTIONS.length);
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setResults([]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {currentStep < QUESTIONS.length ? (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">AI Recommender</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Step {currentStep + 1} of {QUESTIONS.length}</p>
              </div>
            </div>
            {currentStep > 0 && (
              <button 
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-1 text-sm font-medium"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            )}
          </div>

          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight">
              {QUESTIONS[currentStep].text}
            </h2>
            <div className="w-20 h-1.5 bg-blue-600 rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {QUESTIONS[currentStep].options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(QUESTIONS[currentStep].id, option.value)}
                className="group flex items-center gap-4 p-5 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 bg-white dark:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                {option.icon && (
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 text-gray-500 group-hover:text-blue-600 transition-colors">
                    {option.icon}
                  </div>
                )}
                <span className="font-bold text-gray-800 dark:text-white text-lg">{option.label}</span>
                <ChevronRight className="w-5 h-5 ml-auto text-gray-300 group-hover:text-blue-500 transition-colors" />
              </button>
            ))}
          </div>

          <div className="mt-12 flex gap-2">
            {QUESTIONS.map((_, idx) => (
              <div 
                key={idx} 
                className={`flex-1 h-2 rounded-full transition-all duration-500 ${idx <= currentStep ? 'bg-blue-600' : 'bg-gray-100 dark:bg-gray-700'}`}
              />
            ))}
          </div>
        </div>
      ) : isCalculating ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 border-4 border-blue-100 dark:border-gray-700 rounded-full border-t-blue-600 animate-spin"></div>
            <Bot className="w-10 h-10 text-blue-600 absolute inset-0 m-auto animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Finding your perfect match...</h2>
          <p className="text-gray-500 dark:text-gray-400">Our AI is analyzing {LOCAL_TOOLS.length} tools based on your needs.</p>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 rounded-2xl mb-6">
              <Trophy className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Your AI Toolkit is Ready!</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">Based on your goals, we recommend these top tools.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {results.map((tool, idx) => (
              <div 
                key={tool.id} 
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all group flex flex-col relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4">
                   <div className="bg-blue-600 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                     #{idx + 1} Match
                   </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 mt-4">{tool.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center text-yellow-500">
                    <Sparkles className="w-4 h-4 fill-current" />
                    <span className="ml-1 font-bold text-sm">{tool.rating}</span>
                  </div>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{tool.pricing}</span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                  {tool.description}
                </p>

                <button 
                  onClick={() => onToolClick(tool.id)}
                  className="w-full py-4 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-2xl font-bold hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  View Tool Details <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 bg-gray-50 dark:bg-gray-800 px-8 py-6 rounded-3xl">
            <p className="text-gray-600 dark:text-gray-400 font-medium">Not quite what you were looking for?</p>
            <div className="flex gap-4">
              <button 
                onClick={resetQuiz}
                className="flex items-center gap-2 px-6 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                <RefreshCw className="w-4 h-4" /> Retake Quiz
              </button>
              <button 
                onClick={onBack}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
              >
                Browse All Tools
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
