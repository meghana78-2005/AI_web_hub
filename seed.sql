-- SQL Script to Populate Your AI Web Hub Database
-- Run this script in your Supabase SQL Editor to bypass Row-Level Security and add 50+ tools!
-- Note: Replace the category_id UUIDs with actual Category IDs from your 'categories' table.
-- If you haven't seeded categories yet, here is a quick seed block for categories too:

INSERT INTO public.categories (name, slug, description, icon) VALUES
('Video Editing', 'video-editing', 'AI tools for video generation, editing, and subtitle creation', 'Video'),
('Image Generation', 'image-generation', 'Create stunning images and art with AI', 'Image'),
('Text & Writing', 'text-writing', 'AI assistants for writing, summarizing, and SEO', 'PenTool'),
('Coding Assistants', 'coding-assistants', 'AI plugins and IDEs to write code faster', 'Terminal'),
('Audio & Music', 'audio-music', 'Generate voices, music, and enhance audio', 'Music'),
('Productivity', 'productivity', 'AI apps to manage time, notes, and tasks', 'Briefcase')
ON CONFLICT (slug) DO NOTHING;

-- Now, inserting a massive list of tools.
-- We use a subquery to match category names to their dynamically generated UUIDs.

WITH cat AS (SELECT id, slug FROM public.categories)
INSERT INTO public.tools (name, description, url, pricing, view_count, slug, category_id) VALUES
-- Video
('Invideo AI', 'Turn text into video instantly with AI-generated scripts and footage.', 'https://invideo.io', 'Freemium', 120, 'invideo-ai', (SELECT id FROM cat WHERE slug='video-editing')),
('Runway Gen-2', 'Advanced generative AI for video creation and editing.', 'https://runwayml.com', 'Paid', 350, 'runway-gen2', (SELECT id FROM cat WHERE slug='video-editing')),
('Sora', 'OpenAI’s text-to-video AI model generating highly realistic scenes.', 'https://openai.com/sora', 'Paid', 500, 'sora-openai', (SELECT id FROM cat WHERE slug='video-editing')),
('Synthesia', 'Create professional AI videos from text with synthetic avatars.', 'https://synthesia.io', 'Paid', 240, 'synthesia', (SELECT id FROM cat WHERE slug='video-editing')),
('CapCut', 'A versatile video editor now supercharged with AI captioning and effects.', 'https://capcut.com', 'Free', 490, 'capcut-ai', (SELECT id FROM cat WHERE slug='video-editing')),
('Veed.io', 'Online AI video editor with auto-subtitles and translater.', 'https://veed.io', 'Freemium', 210, 'veedio', (SELECT id FROM cat WHERE slug='video-editing')),
('Descript', 'Audio and video editing as easy as editing a doc.', 'https://descript.com', 'Freemium', 315, 'descript', (SELECT id FROM cat WHERE slug='video-editing')),
('Opus Clip', 'AI video clipping tool that turns long videos into viral shorts.', 'https://opus.pro', 'Freemium', 410, 'opus-clip', (SELECT id FROM cat WHERE slug='video-editing')),
('Pika Labs', 'An idea-to-video platform that brings your creativity to life.', 'https://pika.art', 'Free', 180, 'pika-labs', (SELECT id FROM cat WHERE slug='video-editing')),
('HeyGen', 'AI video generation platform for engaging business videos with avatars.', 'https://heygen.com', 'Paid', 145, 'heygen', (SELECT id FROM cat WHERE slug='video-editing')),

-- Image
('Midjourney', 'High-quality AI image generation accessible via Discord.', 'https://midjourney.com', 'Paid', 650, 'midjourney', (SELECT id FROM cat WHERE slug='image-generation')),
('DALL-E 3', 'OpenAI’s powerful image generator that seamlessly understands intricate prompts.', 'https://openai.com/dall-e-3', 'Paid', 610, 'dall-e-3', (SELECT id FROM cat WHERE slug='image-generation')),
('Stable Diffusion', 'Open-source deep learning model for text-to-image generation.', 'https://stability.ai', 'Free', 540, 'stable-diffusion', (SELECT id FROM cat WHERE slug='image-generation')),
('Leonardo.ai', 'Generate production-quality assets for your creative projects.', 'https://leonardo.ai', 'Freemium', 280, 'leonardo-ai', (SELECT id FROM cat WHERE slug='image-generation')),
('Adobe Firefly', 'Generative AI made for creators inside Adobe applications.', 'https://adobe.com/firefly', 'Paid', 420, 'adobe-firefly', (SELECT id FROM cat WHERE slug='image-generation')),
('Canva Magic Studio', 'All the power of AI integrated directly into Canva designs.', 'https://canva.com', 'Freemium', 530, 'canva-magic', (SELECT id FROM cat WHERE slug='image-generation')),
('Ideogram', 'AI image generator focusing on highly accurate text rendering in images.', 'https://ideogram.ai', 'Free', 160, 'ideogram-ai', (SELECT id FROM cat WHERE slug='image-generation')),
('Photoroom', 'Create professional images and remove backgrounds instantly.', 'https://photoroom.com', 'Freemium', 230, 'photoroom', (SELECT id FROM cat WHERE slug='image-generation')),

-- Text
('ChatGPT', 'The wildly popular conversational AI standard from OpenAI.', 'https://chatgpt.com', 'Freemium', 1200, 'chatgpt', (SELECT id FROM cat WHERE slug='text-writing')),
('Claude 3', 'Anthropic’s powerful, human-like AI assistant for writing and analysis.', 'https://anthropic.com/claude', 'Freemium', 950, 'claude-3', (SELECT id FROM cat WHERE slug='text-writing')),
('Gemini', 'Google’s multimodal AI model that excels at reasoning and coding.', 'https://gemini.google.com', 'Freemium', 890, 'google-gemini', (SELECT id FROM cat WHERE slug='text-writing')),
('Perplexity AI', 'An AI-powered search engine that answers questions with citations.', 'https://perplexity.ai', 'Freemium', 780, 'perplexity-ai', (SELECT id FROM cat WHERE slug='text-writing')),
('Copy.ai', 'AI powered copywriter that generates high-quality marketing text.', 'https://copy.ai', 'Freemium', 320, 'copy-ai', (SELECT id FROM cat WHERE slug='text-writing')),
('Jasper AI', 'An AI copilot for enterprise marketing teams and content creators.', 'https://jasper.ai', 'Paid', 400, 'jasper-ai', (SELECT id FROM cat WHERE slug='text-writing')),
('Notion AI', 'Write, brainstorm, edit, and summarize directly inside your Notion workspace.', 'https://notion.so', 'Paid', 510, 'notion-ai', (SELECT id FROM cat WHERE slug='text-writing')),
('GrammarlyGO', 'On-demand AI communication assistance inside Grammarly.', 'https://grammarly.com', 'Freemium', 600, 'grammarly-go', (SELECT id FROM cat WHERE slug='text-writing')),

-- Coding
('GitHub Copilot', 'Your AI pair programmer built right into your editor.', 'https://github.com/features/copilot', 'Paid', 820, 'github-copilot', (SELECT id FROM cat WHERE slug='coding-assistants')),
('Cursor', 'The AI-first code editor designed to help you write software faster.', 'https://cursor.sh', 'Freemium', 460, 'cursor-editor', (SELECT id FROM cat WHERE slug='coding-assistants')),
('Codeium', 'Free AI code completion and chat tool for developers.', 'https://codeium.com', 'Free', 310, 'codeium', (SELECT id FROM cat WHERE slug='coding-assistants')),
('Amazon Q Developer', 'Generative AI assistant for software development on AWS.', 'https://aws.amazon.com/q/developer/', 'Freemium', 250, 'amazon-q', (SELECT id FROM cat WHERE slug='coding-assistants')),
('v0 by Vercel', 'Generative AI UI tool to create React components from text prompts.', 'https://v0.dev', 'Freemium', 390, 'v0-vercel', (SELECT id FROM cat WHERE slug='coding-assistants')),
('Tabnine', 'AI assistant for software developers that anticipates your code.', 'https://tabnine.com', 'Paid', 210, 'tabnine', (SELECT id FROM cat WHERE slug='coding-assistants')),

-- Audio
('ElevenLabs', 'The most realistic AI voice generator and text to speech software.', 'https://elevenlabs.io', 'Freemium', 550, 'elevenlabs', (SELECT id FROM cat WHERE slug='audio-music')),
('Suno', 'AI music generation that creates full songs with vocals from a text prompt.', 'https://suno.com', 'Freemium', 480, 'suno-ai', (SELECT id FROM cat WHERE slug='audio-music')),
('Udio', 'A powerful AI tool for creating high-quality music tracks instantly.', 'https://udio.com', 'Free', 340, 'udio', (SELECT id FROM cat WHERE slug='audio-music')),
('Murf.ai', 'Versatile AI voice generator for e-learning, presentations, and videos.', 'https://murf.ai', 'Paid', 190, 'murf-ai', (SELECT id FROM cat WHERE slug='audio-music')),
('Adobe Podcast AI', 'AI-powered audio recording, editing, and voice enhancement tool.', 'https://podcast.adobe.com', 'Free', 270, 'adobe-podcast', (SELECT id FROM cat WHERE slug='audio-music')),

-- Productivity
('Otter.ai', 'Record and review meetings with an AI meeting assistant.', 'https://otter.ai', 'Freemium', 320, 'otter-ai', (SELECT id FROM cat WHERE slug='productivity')),
('Zapier', 'Automate work using AI across 6000+ app integrations.', 'https://zapier.com', 'Freemium', 580, 'zapier-ai', (SELECT id FROM cat WHERE slug='productivity')),
('Tome', 'Generative AI tool for crafting presentations and documents.', 'https://tome.app', 'Freemium', 210, 'tome-ai', (SELECT id FROM cat WHERE slug='productivity')),
('Gamma', 'A new medium for presenting ideas, powered by AI.', 'https://gamma.app', 'Freemium', 270, 'gamma-app', (SELECT id FROM cat WHERE slug='productivity')),
('Fireflies.ai', 'AI notetaker to transcribe, summarize, and analyze meetings.', 'https://fireflies.ai', 'Paid', 180, 'fireflies-ai', (SELECT id FROM cat WHERE slug='productivity'))
ON CONFLICT (slug) DO NOTHING;
