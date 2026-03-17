import { supabase } from './src/lib/supabase.js';

async function checkTools() {
  const { data, error } = await supabase.from('tools').select('*');
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Tools:', data.map(t => t.name));
  }
}

checkTools();
