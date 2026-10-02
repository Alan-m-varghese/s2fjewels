const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function measure() {
  try {
    const products = await prisma.product.findMany({
      select: { id: true, name: true, images: true }
    });

    console.log(`Analyzing ${products.length} products...`);
    let totalBytes = 0;
    let totalImageCount = 0;
    const stats = [];

    for (const p of products) {
      let productBytes = 0;
      for (const img of p.images) {
        totalImageCount++;
        let bytes = 0;
        if (img.startsWith('data:image')) {
          // Estimate base64 byte length
          const base64Str = img.split(',')[1] || '';
          bytes = Math.round((base64Str.length * 3) / 4);
        } else if (img.startsWith('http')) {
          bytes = 100 * 1024; // External URL placeholder estimate
        } else {
          bytes = img.length;
        }
        productBytes += bytes;
      }
      totalBytes += productBytes;
      stats.push({
        id: p.id,
        name: p.name,
        imagesCount: p.images.length,
        sizeMB: (productBytes / (1024 * 1024)).toFixed(2)
      });
    }

    console.log('--- DB IMAGE METRICS ---');
    console.log(`Total Products: ${products.length}`);
    console.log(`Total Images: ${totalImageCount}`);
    console.log(`Total Database Image Payload: ${(totalBytes / (1024 * 1024)).toFixed(2)} MB`);
    console.log('\nTop 5 Largest Products in Payload:');
    stats.sort((a, b) => b.sizeMB - a.sizeMB).slice(0, 5).forEach(s => {
      console.log(`- ${s.name}: ${s.sizeMB} MB (${s.imagesCount} images)`);
    });

  } catch (err) {
    console.error('Error measuring images:', err);
  } finally {
    await prisma.$disconnect();
  }
}

measure();
