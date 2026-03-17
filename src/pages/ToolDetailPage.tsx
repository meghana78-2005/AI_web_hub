import { useEffect, useState, useMemo } from 'react';
import { Tool } from '../types/database';
import { LOCAL_TOOLS } from '../lib/localData';
import { ArrowLeft, Loader2, ExternalLink, Star, MessageSquare, User, Send, ThumbsUp, Bot } from 'lucide-react';

interface ToolDetailPageProps {
  toolSlug: string;
  onBack: () => void;
}

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
}

export function ToolDetailPage({ toolSlug, onBack }: ToolDetailPageProps) {
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviewText, setReviewText] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock initial reviews
  const initialReviews: Review[] = useMemo(() => [
    { id: '1', user: 'Sarah J.', rating: 5, comment: 'Absolutely essential for my daily workflow! Saved me hours already.', date: '2 days ago', likes: 12 },
    { id: '2', user: 'Mike R.', rating: 4, comment: 'Great tool, though the UI takes a little while to get used to.', date: '1 week ago', likes: 5 },
    { id: '3', user: 'Alex Chen', rating: 5, comment: 'The AI accuracy is mind-blowing. Highly recommend checking this out.', date: '3 weeks ago', likes: 24 }
  ], []);

  useEffect(() => {
    // Load from LOCAL_TOOLS instead of Supabase for consistency
    const foundTool = LOCAL_TOOLS.find(t => t.id === toolSlug || t.slug === toolSlug);
    if (foundTool) {
      setTool(foundTool);
    }
    setLoading(false);
  }, [toolSlug]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setReviewText('');
      setIsSubmitting(false);
      alert('Review submitted! (This is a demo, your review won\'t be permanently saved)');
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400" />
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <Bot className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Tool not found</h2>
        <button onClick={onBack} className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
          Return to Hub
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 font-medium transition-colors group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Discovery Hub
      </button>

      {/* Main Tool Header */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100 dark:border-gray-700 mb-10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 dark:bg-blue-900/10 rounded-bl-full pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 relative z-10">
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-4">
               {tool.rating && (
                 <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-lg font-bold text-sm">
                   <Star className="w-4 h-4 fill-current" />
                   {tool.rating}
                 </div>
               )}
               <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-lg">
                 {tool.pricing}
               </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">{tool.name}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">{tool.description}</p>
            
            <div className="flex flex-wrap gap-2 mt-6">
              {tool.tags?.map((tag, i) => (
                <span key={i} className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 shrink-0 w-full md:w-auto">
            <a 
              href={tool.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-200 dark:shadow-none transform hover:-translate-y-1"
            >
              Visit Official Website <ExternalLink className="w-5 h-5" />
            </a>
            <p className="text-center text-xs text-gray-400 font-medium">Verified Link • Safely Browse</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Reviews</h2>
            <span className="text-gray-400 font-medium text-lg ml-1">({initialReviews.length})</span>
          </div>

          <div className="space-y-6">
            {initialReviews.map((review) => (
              <div key={review.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{review.user}</h4>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-200 dark:text-gray-600'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{review.comment}</p>
                <button className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-blue-600 transition-colors">
                  <ThumbsUp className="w-3.5 h-3.5" /> Useful ({review.likes})
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add Review Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-blue-50 dark:bg-gray-800/50 p-8 rounded-3xl border border-blue-100 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Write a Review</h3>
            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUserRating(star)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${userRating >= star ? 'bg-yellow-400 text-white shadow-lg shadow-yellow-200 dark:shadow-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'}`}
                    >
                      <Star className={`w-6 h-6 ${userRating >= star ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Share your experience</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="What do you think of this tool?"
                  className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-600 focus:ring-2 focus:ring-blue-600 transition-all min-h-[120px] outline-none text-gray-800 dark:text-white"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !reviewText.trim()}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 dark:shadow-none disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>Submit Review <Send className="w-5 h-5" /></>
                )}
              </button>
              <p className="text-[10px] text-gray-400 text-center font-medium uppercase tracking-widest">A Hub for AI Excellence</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
