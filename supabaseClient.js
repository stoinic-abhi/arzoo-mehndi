// Supabase Client Config
const SUPABASE_URL = "https://joonfutwnylubhnllkju.supabase.co"; // Yahan apna URL daalo
const SUPABASE_ANON_KEY = "sb_publishable_SKVlZT3AM2jAY0G9FuSfZA_ZBRQh-He"; // Yahan apni Anon Key daalo

// Initialize client
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper: Upload file to Supabase Storage Bucket
async function uploadMediaFile(file, folder = "gallery") {
  if (!file) return null;
  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;

  const { data, error } = await supabaseClient.storage
    .from('mehndi-media')
    .upload(fileName, file, { cacheControl: '3600', upsert: true });

  if (error) {
    console.error("Storage upload failed:", error);
    alert("Image upload failed: " + error.message);
    return null;
  }

  const { data: urlData } = supabaseClient.storage
    .from('mehndi-media')
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}