/*
  # AI Tools Hub Database Schema

  ## Overview
  This migration creates the database structure for the AI Tools Hub platform,
  enabling users to discover and explore AI tools organized by purpose.

  ## New Tables

  ### `categories`
  Stores different categories of AI tools (e.g., Frontend Development, UI/UX Design)
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Category name
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Category description
  - `icon` (text) - Icon name for UI display
  - `created_at` (timestamptz) - Creation timestamp

  ### `tools`
  Stores individual AI tools with their details
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Tool name
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Brief one-line description
  - `detailed_description` (text) - Full description for detail page
  - `category_id` (uuid, foreign key) - References categories table
  - `url` (text) - Official website URL
  - `logo_url` (text) - Tool logo image URL
  - `use_cases` (text[]) - Array of use case strings
  - `pricing` (text) - Pricing model (Free, Freemium, Paid)
  - `is_trending` (boolean) - Whether tool is trending
  - `view_count` (integer) - Number of views
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on all tables
  - Allow public read access for categories and tools
  - Restrict write access (for future admin functionality)
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create tools table
CREATE TABLE IF NOT EXISTS tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  detailed_description text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  url text NOT NULL,
  logo_url text DEFAULT '',
  use_cases text[] DEFAULT '{}',
  pricing text DEFAULT 'Freemium',
  is_trending boolean DEFAULT false,
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tools_category_id ON tools(category_id);
CREATE INDEX IF NOT EXISTS idx_tools_trending ON tools(is_trending);
CREATE INDEX IF NOT EXISTS idx_tools_slug ON tools(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can view tools"
  ON tools FOR SELECT
  TO public
  USING (true);
