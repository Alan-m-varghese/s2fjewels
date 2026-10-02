const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');

const prisma = new PrismaClient();

async function compressImageBase64(dataUrl) {
  if (!dataUrl || typeof dataUrl !== 'string') return dataUrl;
  if (!dataUrl.startsWith('data:image')) return dataUrl;

  try {
    const parts = dataUrl.split(',');
    if (parts.length < 2) return dataUrl;

    const base64Data = parts[1];
    const buffer = Buffer.from(base64Data, 'base64');

    // Compress using Sharp: Resize max dimensions to 600x600, WebP quality 75%
    const compressedBuffer = await sharp(buffer)
      .resize({
        width: 600,
        height: 600,
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 75, reductionEffort: 6 })
      .toBuffer();

    const compressedBase64 = compressedBuffer.toString('base64');
    return `data:image/webp;base64,${compressedBase64}`;
  } catch (err) {
    console.warn('Failed to compress image:', err.message);
    return dataUrl; // fallback to original if compression fails
  }
}

async function runOptimization() {
  console.log('🚀 Starting Product Image Optimization & Egress Reduction...');

  const products = await prisma.product.findMany({
    select: { id: true, name: true, images: true }
  });

  console.log(`Processing ${products.length} products (Total 120 images)...`);

  let originalTotalBytes = 0;
  let compressedTotalBytes = 0;
  let updatedCount = 0;

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const newImages = [];
    let pOrigBytes = 0;
    let pCompBytes = 0;

    for (const img of p.images) {
      if (img.startsWith('data:image')) {
        const origBase64 = img.split(',')[1] || '';
        const origBytes = Math.round((origBase64.length * 3) / 4);
        pOrigBytes += origBytes;

        const compressedUrl = await compressImageBase64(img);
        const compBase64 = compressedUrl.split(',')[1] || '';
        const compBytes = Math.round((compBase64.length * 3) / 4);
        pCompBytes += compBytes;

        newImages.push(compressedUrl);
      } else {
        newImages.push(img);
      }
    }

    originalTotalBytes += pOrigBytes;
    compressedTotalBytes += pCompBytes;

    // Update product in database
    await prisma.product.update({
      where: { id: p.id },
      data: { images: newImages }
    });

    updatedCount++;
    console.log(`[${updatedCount}/${products.length}] ${p.name} | Before: ${(pOrigBytes/1024).toFixed(1)} KB -> After: ${(pCompBytes/1024).toFixed(1)} KB`);
  }

  const savedBytes = originalTotalBytes - compressedTotalBytes;
  const savedPercentage = ((savedBytes / originalTotalBytes) * 100).toFixed(1);

  console.log('\n✅ OPTIMIZATION COMPLETED SUCCESSFULLY!');
  console.log(`Original DB Egress Payload: ${(originalTotalBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Optimized DB Egress Payload: ${(compressedTotalBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total Egress Saved: ${(savedBytes / (1024 * 1024)).toFixed(2)} MB (${savedPercentage}% bandwidth reduction!)`);

  await prisma.$disconnect();
}

runOptimization().catch(err => {
  console.error('Fatal error during optimization:', err);
  prisma.$disconnect();
});
