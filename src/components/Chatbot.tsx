import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles, Mic, MicOff } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { LOCAL_TOOLS } from '../lib/localData';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
}

const QUICK_REPLIES = [
  'How do I use ChatGPT?',
  'Find a video editor',
  'Best free AI tools',
  'Help me write content',
  'AI for coding',
];

// ── How-to usage guides ──
const HOW_TO_GUIDES: Record<string, string> = {
  chatgpt: "Here's how to use **ChatGPT**:\n\n1. Go to chatgpt.com and sign up (free)\n2. Type your question or request in the chat box\n3. Press Enter — ChatGPT will respond instantly\n4. **Tips:** Be specific in your prompts! Instead of 'write an essay', try 'write a 500-word essay about climate change for a high school student'\n\nWant to know about any other tool?",

  midjourney: "Here's how to use **Midjourney**:\n\n1. Join the Midjourney Discord server (midjourney.com)\n2. Go to any #newbies channel\n3. Type `/imagine` followed by your description\n4. Example: `/imagine a futuristic city at sunset, cinematic, 4K`\n5. Choose from 4 generated variations\n\n✨ **Tip:** Add words like 'cinematic', '4K', 'detailed' for better results!",

  "dall-e": "Here's how to use **DALL-E 3**:\n\n1. Open ChatGPT (it's built-in for Plus users) or go to labs.openai.com\n2. Describe the image you want in plain language\n3. Example: 'A cute robot watering flowers in a garden, watercolor style'\n4. Download your generated image\n\n✨ **Tip:** The more descriptive your prompt, the better the results!",

  capcut: "Here's how to use **CapCut**:\n\n1. Download the CapCut app (free on mobile/desktop)\n2. Tap '+' to create a new project and import your video\n3. Use the timeline to cut, trim, and add clips\n4. Add AI features: Auto Captions, Background Remover, or Text-to-Video\n5. Export in your preferred quality\n\n✨ **Tip:** 'Auto Captions' is the most popular feature — it adds subtitles instantly!",

  "github copilot": "Here's how to use **GitHub Copilot**:\n\n1. Install VS Code (or your preferred editor)\n2. Install the 'GitHub Copilot' extension from the marketplace\n3. Sign in with your GitHub account and start a free trial\n4. Start typing code — Copilot will suggest completions in grey\n5. Press **Tab** to accept a suggestion\n\n✨ **Tip:** Write comments in plain English (e.g. `// function to sort array`) and Copilot will write the code!",

  cursor: "Here's how to use **Cursor**:\n\n1. Download Cursor from cursor.sh (it's like VS Code with AI built in)\n2. Open or create a project\n3. Press **Ctrl+K** to ask AI to write or edit code\n4. Press **Ctrl+L** to chat with AI about your codebase\n5. Select code and press Ctrl+K to ask it to refactor or fix bugs\n\n✨ **Tip:** It can read your entire codebase — just ask 'explain this project' in the chat!",

  elevenlabs: "Here's how to use **ElevenLabs**:\n\n1. Go to elevenlabs.io and sign up (free tier available)\n2. Go to 'Text to Speech' in the dashboard\n3. Paste or type your text\n4. Choose a voice from the library (or clone your own!)\n5. Click 'Generate' and download the MP3\n\n✨ **Tip:** The 'Voice Clone' feature lets you upload a voice sample and clone it in seconds!",

  suno: "Here's how to use **Suno**:\n\n1. Go to suno.com and sign in (free to start)\n2. Click 'Create'\n3. Describe the song you want — style, mood, and topic\n4. Example: 'Upbeat pop song about a road trip with friends'\n5. Press 'Create' and Suno generates a full song in seconds!\n\n✨ **Tip:** Use the 'Custom Mode' to write your own lyrics and choose the music style!",

  "stable diffusion": "Here's how to use **Stable Diffusion**:\n\n1. Go to stablediffusionweb.com for a quick online demo (no signup needed)\n2. Type a description in the text box\n3. Click 'Generate Image'\n4. For advanced use: install the Automatic1111 web UI locally for full control\n\n✨ **Tip:** It's completely free and open-source — you can run it on your own computer!",

  canva: "Here's how to use **Canva**:\n\n1. Go to canva.com and sign up (free)\n2. Click 'Create a design' and choose a template size\n3. Browse templates or start from scratch\n4. Click on text/images to edit them\n5. Use 'Magic Write' (the AI feature) to generate text automatically\n6. Click 'Share' → 'Download' to save your design\n\n✨ **Tip:** Canva has thousands of free templates for social media, presentations, and more!",

  jasper: "Here's how to use **Jasper AI**:\n\n1. Sign up at jasper.ai (paid, with a free trial)\n2. Select a template — Blog Post, Ad Copy, Email, etc.\n3. Fill in the context: topic, tone, audience\n4. Click 'Generate' and review the AI-written content\n5. Edit and refine as needed\n\n✨ **Tip:** Use 'Boss Mode' to write long-form documents — Jasper will keep track of context!",

  grammarly: "Here's how to use **Grammarly**:\n\n1. Install the Grammarly browser extension (it's free!)\n2. It automatically activates on any text box (emails, docs, social media)\n3. Red underlines = grammar errors, Blue = style suggestions\n4. Click on an underline to see the suggestion and apply it\n5. Use 'GrammarlyGO' (the AI button) to rewrite or improve whole paragraphs\n\n✨ **Tip:** Connect it to Google Docs for seamless document editing!",

  "notion ai": "Here's how to use **Notion AI**:\n\n1. Open any Notion page\n2. Press **Space bar** to open the AI menu, or select text and click 'Ask AI'\n3. Choose: Summarize, Fix grammar, Translate, Make shorter/longer, etc.\n4. Or type a custom prompt like 'Write a project brief for a mobile app'\n\n✨ **Tip:** Use 'Summarize' on meeting notes — it turns hours of notes into bullet points instantly!",

  runway: "Here's how to use **Runway Gen-2**:\n\n1. Go to runwayml.com and sign up (free credits to start)\n2. Click 'Text/Image to Video'\n3. Type a description or upload an image\n4. Choose video duration and motion settings\n5. Click 'Generate' — your video is ready in under a minute!\n\n✨ **Tip:** Upload a photo of yourself and describe a motion — Runway will animate it!",

  perplexity: "Here's how to use **Perplexity AI**:\n\n1. Go to perplexity.ai (free, no sign-up needed)\n2. Type any question in the search bar\n3. Perplexity gives you a summarized answer with source links\n4. Click 'Related questions' to dig deeper\n5. Enable 'Pro Search' for more detailed research\n\n✨ **Tip:** Great for research — every fact is linked to a real web source so you can verify it!",

  zapier: "Here's how to use **Zapier**:\n\n1. Go to zapier.com and sign up (free tier available)\n2. Click 'Create Zap'\n3. Choose a **Trigger** app (e.g. 'When I get a new email in Gmail...')\n4. Choose an **Action** app (e.g. '...create a row in Google Sheets')\n5. Test and turn on your Zap!\n\n✨ **Tip:** You can connect 6000+ apps — popular combos include Gmail → Slack, or Typeform → Notion!",
};

function getBotResponse(query: string): string | null {
  const q = query.toLowerCase().trim();

  // ── How to use a specific tool ──
  if (/how (do i|to|can i) use|how (does|do) .+ work|how (do i|can i) (start|begin|get started)|guide|tutorial|help (with|using)/.test(q)) {
    for (const [toolKey, guide] of Object.entries(HOW_TO_GUIDES)) {
      if (q.includes(toolKey)) return guide;
    }
    // Generic how-to
    return "I can walk you through how to use any of these tools:\n\n📋 ChatGPT, Midjourney, DALL-E, CapCut, GitHub Copilot, Cursor, ElevenLabs, Suno, Stable Diffusion, Canva, Jasper, Grammarly, Notion AI, Runway, Perplexity, Zapier\n\nJust say **'How do I use [tool name]?'** and I'll give you a step-by-step guide!";
  }

  // ── Greetings ──
  if (/^(hi|hello|hey|hola|yo|sup|howdy|greetings|good (morning|afternoon|evening|day))/.test(q))
    return "Hey there! 👋 Great to see you! I'm your AI Hub Assistant. I can:\n\n🔍 Find AI tools for any task\n📖 Explain **how to use** any tool step-by-step\n🎙️ Listen to your voice (tap 🎤!)\n\nWhat are you looking for today?";

  // ── How are you ──
  if (/how (are|r) (you|u)|how's it going|how do you do|you ok|you good/.test(q))
    return "I'm doing fantastic, thanks for asking! 😄 I spend my days helping people discover amazing AI tools. What can I help YOU with today?";

  // ── Who are you ──
  if (/who are you|what are you|your name|introduce yourself|tell me about yourself/.test(q))
    return "I'm the **AI Web Hub Assistant** 🤖 — your guide to 90+ curated AI tools! I can find tools for any task AND teach you how to use them step by step. Just ask 'How do I use ChatGPT?' to see!";

  // ── What can you do ──
  if (/what can you do|your (features|abilities|skills)|how (do|can) (you|i) (help|use this)/.test(q))
    return "Here's everything I can do:\n\n🔍 **Find AI tools** — 'Find a video editor'\n📖 **How-to guides** — 'How do I use Midjourney?'\n📋 **Browse categories** — 'What categories do you have?'\n🆓 **Filter by price** — 'What tools are free?'\n🎙️ **Voice input** — Tap the 🎤 mic button!\n💬 **Chat!** — I love a good conversation 😄";

  // ── Categories ──
  if (/categor|what (kind|type)|what (tools|ai) do you|show me all|list all/.test(q))
    return "We have tools across 16 categories:\n\n🎬 Video Editing\n🖼️ Image Generation\n✍️ Text & Writing\n💻 Coding Assistants\n🎵 Audio & Music\n📋 Productivity\n🎓 Education\n💰 Finance\n🏥 Healthcare\n⚖️ Legal\n👥 HR & Recruitment\n📊 Data & Analytics\n🔍 Search & Research\n📣 Marketing & SEO\n🤝 Customer Support\n🎨 Design\n\nWhich one interests you?";

  // ── Free tools ──
  if (/free (tool|ai|app|software)|no cost|without paying|gratis/.test(q)) {
    const freeTools = LOCAL_TOOLS.filter(t => t.pricing === 'Free').map(t => t.name);
    return `Here are some completely **free** AI tools:\n\n✅ ${freeTools.slice(0, 8).join('\n✅ ')}\n\nAsk me 'How do I use [tool name]?' and I'll walk you through it!`;
  }

  // ── Joke ──
  if (/joke|funny|laugh|humor|make me (laugh|smile)/.test(q)) {
    const jokes = [
      "Why did the AI refuse to play hide and seek? Because it knew it was always being watched by its training data! 😂",
      "I asked an AI to write me a poem... It wrote 47 variations and asked me to rate them. 🤖",
      "Why don't AI models ever get tired? Because they run on GPU sleep cycles! ⚡",
    ];
    return jokes[Math.floor(Math.random() * jokes.length)] + "\n\nNow shall I find you an AI tool? 😄";
  }

  // ── Thanks ──
  if (/thank|thanks|thx|ty |appreciate|cheers|awesome|great (job|help|work)/.test(q))
    return "You're so welcome! 😊 That's what I'm here for. Anything else I can help with?";

  // ── Goodbye ──
  if (/bye|goodbye|see you|take care|cya|gotta go|later/.test(q))
    return "Goodbye! 👋 Come back anytime you want to discover new AI tools or learn how to use them. Have an amazing day! 🚀";

  // ── Bored ──
  if (/bored|nothing to do|entertain me|surprise me/.test(q))
    return "Oh, I've got just the thing! Did you know **Suno AI** can create a full song from just your text prompt? Or that **v0 by Vercel** builds a full React UI from a description?\n\nAsk me 'How do I use Suno?' and get started!";

  // ── Best tools ──
  if (/(best|top|most popular) (ai|tool|app)/.test(q))
    return "The most popular tools in the hub:\n\n🥇 **ChatGPT** — Best conversational AI\n🥈 **GitHub Copilot** — Best for coding\n🥉 **Midjourney** — Best image generation\n🎬 **CapCut** — Best free video editor\n\nAsk me 'How do I use [name]?' and I'll guide you!";

  // ── YouTube / social ──
  if (/youtube|tiktok|instagram|reel|short|social media/.test(q))
    return "For YouTube & social media content:\n\n🎬 **Invideo AI** — full video from text\n✂️ **Opus Clip** — auto short clips from long videos\n📝 **CapCut** — AI captions & effects\n🎙️ **Descript** — edit video by editing the transcript\n\nAsk me 'How do I use CapCut?' for a guide!";

  // ── Writing ──
  if (/blog|article|essay|write|writing|content (creat|market)/.test(q))
    return "For writing and content:\n\n✍️ **Jasper AI** — marketing content\n📝 **Copy.ai** — fast AI copywriting\n🧠 **Claude 3** — deep, nuanced writing\n📣 **GrammarlyGO** — perfect your prose\n\nAsk 'How do I use Jasper?' to get started!";

  // ── Coding ──
  if (/cod(e|ing|er)|program|developer|debug|javascript|python/.test(q))
    return "For developers:\n\n🤖 **GitHub Copilot** — AI autocomplete in your editor\n⚡ **Cursor** — AI-first code editor\n🆓 **Codeium** — free Copilot alternative\n🎨 **v0 by Vercel** — UI from text prompts\n\nAsk 'How do I use Cursor?' and I'll walk you through it!";

  // ── Image ──
  if (/image|photo|picture|art|illust|draw|design/.test(q))
    return "For image generation:\n\n🎨 **Midjourney** — cinematic quality\n🖼️ **DALL-E 3** — best for complex prompts\n🌟 **Stable Diffusion** — free & open source\n🏆 **Adobe Firefly** — for pro designers\n\nAsk 'How do I use Midjourney?' for a step-by-step guide!";

  // ── Music / audio ──
  if (/music|song|audio|voice|podcast|sound|beat|singing|vocal/.test(q))
    return "For audio and music:\n\n🎵 **Suno** — full song from text\n🎶 **Udio** — high-quality AI music\n🗣️ **ElevenLabs** — most realistic AI voices\n🎙️ **Adobe Podcast AI** — clean up audio quality\n\nAsk 'How do I use ElevenLabs?' for a guide!";

  // ── Education ──
  if (/study|learn|school|student|homework|math|educati|course|tutor/.test(q))
    return "For learning:\n\n📚 **Khan Academy Khanmigo** — personal AI tutor\n🌍 **Duolingo Max** — AI language learning\n📖 **Quizlet AI** — flashcards from your notes\n📷 **Photomath** — scan & solve math instantly\n\nAsk me how to use any of these!";

  // ── Resume / job ──
  if (/resume|cv|job|hire|interview|career|recruit/.test(q))
    return "For job hunting or hiring:\n\n📄 **Rezi** — AI resume builder\n🎤 **Yoodli** — AI interview coaching\n🔍 **Fetcher** — AI recruiting automation\n\nAsk me 'How do I use Rezi?' for a step-by-step walkthrough!";

  // ── Health ──
  if (/health|fitness|mental|workout|diet|nutrition|wellness|medic/.test(q))
    return "For health & wellness:\n\n💆 **Woebot** — mental health CBT chatbot\n🩺 **Ada Health** — AI symptom checker\n🏋️ **Future** — AI personal trainer\n🥗 **Calorie.ai** — track nutrition from photos\n\nWhich area of health can I help you with?";

  // ── Legal ──
  if (/legal|lawyer|contract|law|lawsuit|attorney/.test(q))
    return "For legal tasks:\n\n⚖️ **Harvey AI** — AI for law firms\n📋 **Casetext** — legal research\n🤖 **DoNotPay** — the 'robot lawyer'\n📝 **Spellbook** — contract review in Word\n\nAre you looking for personal legal help or professional tools?";

  return null; // fall through to tool search
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: "Hi there! 👋 I'm your **AI Hub Assistant**.\n\nI can:\n🔍 Find the right AI tool for you\n📖 Explain how to use any tool\n🎙️ Listen to your voice (tap the mic!)\n\nWhat would you like help with?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Voice recognition setup
  const toggleVoice = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice input is not supported in your browser. Try Chrome!');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      // Auto-send after voice input
      setTimeout(() => sendMessage(transcript), 300);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(async () => {
      const query = text.toLowerCase();
      let botResponse = getBotResponse(query);

      if (!botResponse) {
        const stopWords = new Set(['i', 'me', 'my', 'we', 'you', 'your', 'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'do', 'does', 'did', 'and', 'but', 'if', 'or', 'for', 'to', 'of', 'in', 'on', 'at', 'by', 'with', 'about', 'some', 'so', 'not', 'can', 'will', 'just', 'now', 'looking', 'tool', 'tools', 'ai', 'want', 'need', 'find', 'recommend', 'suggest', 'help', 'best', 'good', 'like', 'get', 'use', 'using']);
        const keywords = query.replace(/[^\w\s]/gi, '').split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));

        if (keywords.length === 0) {
          botResponse = "Hmm, I didn't quite catch that! 🤔 Try asking:\n\n• 'Find me a video editor'\n• 'How do I use ChatGPT?'\n• 'What free tools do you have?'\n• Or just say hi! 👋";
        } else {
          const orFilters = keywords.flatMap(kw => [`name.ilike.%${kw}%`, `description.ilike.%${kw}%`]).join(',');
          try {
            let matchingTools = LOCAL_TOOLS.filter(t =>
              keywords.some(kw => t.name.toLowerCase().includes(kw) || t.description.toLowerCase().includes(kw) || t.category_slug.includes(kw))
            );
            if (matchingTools.length === 0) {
              const { data } = await supabase.from('tools').select('*').or(orFilters);
              if (data) matchingTools = data as any;
            }
            if (matchingTools.length > 0) {
              const list = matchingTools.slice(0, 6).map(t => `• **${t.name}** (${t.pricing})`).join('\n');
              botResponse = `I found ${matchingTools.length} tool${matchingTools.length > 1 ? 's' : ''} for you:\n\n${list}\n\nAsk me **'How do I use [tool name]?'** and I'll walk you through any of them! 🔍`;
            } else {
              botResponse = "I couldn't find a tool for that specific request. 😕\n\nTry asking: 'show me video editors' or 'writing tools'. Or ask 'How do I use ChatGPT?' for a usage guide!";
            }
          } catch (e) {
            botResponse = "I'm having trouble right now. 🔧 Please try again or use the search bar above!";
          }
        }
      }

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'bot', content: botResponse! },
      ]);
      setIsTyping(false);
    }, 800);
  };

  const handleSend = () => sendMessage(input);
  const handleKeyPress = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleSend(); };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 z-50 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-6 right-6 w-[360px] sm:w-[420px] bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 z-50 flex flex-col overflow-hidden ${
          isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'
        }`}
        style={{ height: '590px', maxHeight: 'calc(100vh - 48px)' }}
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">AI Hub Assistant</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-blue-100">Online · Ask me how to use any tool!</span>
              </div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'bot' && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-1 shadow">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
              )}
              <div
                className={`px-4 py-2.5 rounded-2xl max-w-[78%] text-sm leading-relaxed whitespace-pre-line shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-br-sm'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-sm border border-gray-100 dark:border-gray-700'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-2 justify-start">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 rounded-bl-sm flex items-center gap-1.5">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick replies */}
        <div className="px-3 py-2 flex gap-2 overflow-x-auto bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 no-scrollbar">
          {QUICK_REPLIES.map((r) => (
            <button
              key={r}
              onClick={() => sendMessage(r)}
              className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              {r}
            </button>
          ))}
        </div>

        {/* Input row with mic button */}
        <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          {isListening && (
            <div className="text-center text-xs text-red-500 font-medium mb-2 animate-pulse flex items-center justify-center gap-1">
              <span className="w-2 h-2 bg-red-500 rounded-full inline-block animate-pulse" />
              Listening... Speak now
            </div>
          )}
          <div className="flex items-center gap-2">
            {/* Mic button */}
            <button
              onClick={toggleVoice}
              title={isListening ? 'Stop listening' : 'Click to speak'}
              className={`p-2.5 rounded-full transition-all flex-shrink-0 ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-blue-100 hover:text-blue-600'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={isListening ? 'Listening...' : 'Ask me anything or say how to use...'}
              className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
