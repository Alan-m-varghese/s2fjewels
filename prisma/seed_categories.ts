import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CATEGORIES = [
  { name: 'Necklace', slug: 'necklaces' },
  { name: 'Long chains', slug: 'long-chains' },
  { name: 'Bangles', slug: 'bangles' },
  { name: 'Bracelets', slug: 'bracelets' },
  { name: 'Anklets', slug: 'anklets' },
  { name: 'Earings', slug: 'earrings' },
  { name: 'Rings', slug: 'rings' },
  { name: 'Combo set', slug: 'combo-set' },
];

async function main() {
  console.log('Seeding strict 8 categories...');

  const catMap: Record<string, string> = {};

  for (const cat of CATEGORIES) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name },
      create: cat,
    });
    catMap[cat.slug] = created.id;
    console.log(`✓ Category: ${created.name} (${created.slug}) -> ID: ${created.id}`);
  }

  // Handle aliases (e.g. if category with slug 'earings' or 'longchains' exists, map or update)
  const aliasMappings: Record<string, string> = {
    'necklace': 'necklaces',
    'earings': 'earrings',
    'longchain': 'long-chains',
    'longchains': 'long-chains',
    'comboset': 'combo-set',
    'combo': 'combo-set',
  };

  for (const [alias, targetSlug] of Object.entries(aliasMappings)) {
    const existingAliasCat = await prisma.category.findUnique({ where: { slug: alias } });
    if (existingAliasCat && catMap[targetSlug]) {
      // Reassign products from alias category to target category
      await prisma.product.updateMany({
        where: { categoryId: existingAliasCat.id },
        data: { categoryId: catMap[targetSlug] },
      });
      // Delete alias category
      await prisma.category.delete({ where: { id: existingAliasCat.id } });
      console.log(`Merged alias category '${alias}' into '${targetSlug}'`);
    }
  }

  // Fetch all products to re-classify strictly based on product name/slug
  const allProducts = await prisma.product.findMany();
  console.log(`Re-classifying ${allProducts.length} products...`);

  let updatedCount = 0;

  for (const p of allProducts) {
    const name = p.name.toLowerCase();
    const slug = p.slug.toLowerCase();
    let targetCategorySlug = 'necklaces';

    if (name.includes('anklet') || slug.includes('anklet')) {
      targetCategorySlug = 'anklets';
    } else if (
      name.includes('earring') ||
      name.includes('stud') ||
      name.includes('chandelier') ||
      name.includes('earings') ||
      slug.includes('earring') ||
      slug.includes('stud')
    ) {
      targetCategorySlug = 'earrings';
    } else if (name.includes('ring') || slug.includes('ring')) {
      targetCategorySlug = 'rings';
    } else if (
      name.includes('kada') ||
      name.includes('bangle') ||
      slug.includes('kada') ||
      slug.includes('bangle')
    ) {
      targetCategorySlug = 'bangles';
    } else if (name.includes('bracelet') || slug.includes('bracelet')) {
      targetCategorySlug = 'bracelets';
    } else if (
      name.includes('set') ||
      name.includes('combo') ||
      name.includes('haram set') ||
      name.includes('necklace set') ||
      slug.includes('set') ||
      slug.includes('combo')
    ) {
      targetCategorySlug = 'combo-set';
    } else if (
      name.includes('chain') ||
      name.includes('maala') ||
      name.includes('mid long') ||
      name.includes('long necklace') ||
      slug.includes('chain') ||
      slug.includes('maala')
    ) {
      targetCategorySlug = 'long-chains';
    } else {
      targetCategorySlug = 'necklaces';
    }

    const targetCatId = catMap[targetCategorySlug];
    if (targetCatId && p.categoryId !== targetCatId) {
      await prisma.product.update({
        where: { id: p.id },
        data: { categoryId: targetCatId },
      });
      updatedCount++;
      console.log(`Updated '${p.name}' -> ${targetCategorySlug}`);
    }
  }

  console.log(`Successfully re-classified ${updatedCount} products into strict 8 categories!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
