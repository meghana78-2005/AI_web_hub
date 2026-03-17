const catUrl = 'https://htpirbzwbcgfawhtarjr.supabase.co/rest/v1/categories';
const toolUrl = 'https://htpirbzwbcgfawhtarjr.supabase.co/rest/v1/tools';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0cGlyYnp3YmNnZmF3aHRhcmpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NTkzNjAsImV4cCI6MjA4OTIzNTM2MH0.TOV1H5sDLUdRkuI0_EcWSc2wfwTdzZlD4SeQvQdH2wg';

async function run() {
  const catRes = await fetch(catUrl, { headers: { apikey: key, Authorization: `Bearer ${key}` }});
  const cats = await catRes.json();
  let videoCat = cats.find(c => c.name.toLowerCase().includes('video'));
  
  if (!videoCat) {
      if (cats.length > 0) {
          videoCat = cats[0]; 
      } else {
          console.log("No categories found to attach a tool to!");
          return;
      }
  }

  const checkRes = await fetch(`${toolUrl}?select=name`, { headers: { apikey: key, Authorization: `Bearer ${key}` }});
  const tools = await checkRes.json();
  
  if (!tools.find(t => t.name.toLowerCase().includes('video'))) {
      console.log('Inserting video tool...');
      const toolToInsert = {
          name: 'VideoMaster AI',
          description: 'A powerful AI video editing tool that auto edits clips, adds subtitles, and exports in 4k.',
          url: 'https://example.com/videomaster',
          pricing: 'Free',
          view_count: 0,
          slug: 'videomaster-ai-' + Date.now(),
          category_id: videoCat.id
      };
      
      const insertRes = await fetch(toolUrl, {
          method: 'POST',
          headers: {
              'apikey': key,
              'Authorization': `Bearer ${key}`,
              'Content-Type': 'application/json',
              'Prefer': 'return=representation'
          },
          body: JSON.stringify(toolToInsert)
      });
      console.log('Insert response:', await insertRes.text());
  } else {
      console.log('Video tool already exists.');
  }
}
run();
