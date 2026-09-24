import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

export const supabase = createClient(
  supabaseUrl.startsWith('http') ? supabaseUrl : 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);

export async function uploadProductImage(file: File): Promise<string> {
  try {
    if (!supabaseUrl.startsWith('http') || !supabaseAnonKey || supabaseAnonKey.includes('placeholder')) {
      console.warn('Supabase credentials not configured. Returning data URL placeholder.');
      // Return a base64 / blob object URL fallback for preview
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      const mimeType = file.type || 'image/jpeg';
      return `data:${mimeType};base64,${base64}`;
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `product-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(filePath, file, { cacheControl: '3600', upsert: true });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage.from('products').getPublicUrl(filePath);
    return data.publicUrl;
  } catch (error) {
    console.error('Failed to upload image to Supabase Storage:', error);
    // Fallback data URL
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    return `data:${file.type || 'image/jpeg'};base64,${base64}`;
  }
}
