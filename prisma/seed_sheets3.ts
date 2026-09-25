import { PrismaClient, ProductStatus } from '@prisma/client';

const prisma = new PrismaClient();

const PRODUCTS_BATCH_3 = [
  // EARRINGS
  {
    name: 'Multicolour Floral Stud Earrings',
    slug: 'multicolour-floral-stud-earrings',
    price: 599,
    categorySlug: 'earrings',
    description: 'Beautiful floral earrings featuring vibrant ruby-pink and emerald-green stones with elegant gold detailing. A stylish statement piece perfect for festive occasions.',
    images: ['https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80'],
    stock: 15,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Blue Stone Floral Earrings',
    slug: 'blue-stone-floral-earrings',
    price: 650,
    categorySlug: 'earrings',
    description: 'Elegant floral stud earrings featuring a deep blue center stone surrounded by sparkling clear stones.',
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'],
    stock: 12,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Classic Gold-Tone Chandelier Earrings',
    slug: 'classic-gold-tone-chandelier-earrings',
    price: 799,
    categorySlug: 'earrings',
    description: 'Elegant Gold-Tone Chandelier Earrings featuring a beautiful floral and teardrop design adorned with sparkling stones.',
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'],
    stock: 18,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Ruby Floral Statement Earrings',
    slug: 'ruby-floral-statement-earrings',
    price: 499,
    categorySlug: 'earrings',
    description: 'Elegant floral design adorned with rich ruby-red stones and delicate gold detailing to elevate any look.',
    images: ['https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80'],
    stock: 20,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Emerald Green Statement Earrings',
    slug: 'emerald-green-statement-earrings',
    price: 750,
    categorySlug: 'earrings',
    description: 'Elegant green gemstone earrings with intricate gold detailing. Perfect for festive, party, and special occasions.',
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80'],
    stock: 14,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Ruby Floral Stud Earrings',
    slug: 'ruby-floral-stud-earrings',
    price: 599,
    categorySlug: 'earrings',
    description: 'Elegant floral earrings featuring vibrant ruby-pink stones and sparkling clear accents for a graceful touch.',
    images: ['https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80'],
    stock: 16,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Elegant Crystal Chandelier Earrings',
    slug: 'elegant-crystal-chandelier-earrings',
    price: 780,
    categorySlug: 'earrings',
    description: 'Beautiful gold-tone chandelier earrings featuring sparkling clear stones and delicate floral detailing.',
    images: ['https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80'],
    stock: 10,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Antique Gold Chandelier Earrings',
    slug: 'antique-gold-chandelier-earrings',
    price: 999,
    categorySlug: 'earrings',
    description: 'Elegant antique-gold earrings with intricate floral detailing, sparkling stones, and delicate pink bead accents.',
    images: ['https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80'],
    stock: 9,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Royal Gold-Tone Chandelier Earrings',
    slug: 'royal-gold-tone-chandelier-earrings',
    price: 799,
    categorySlug: 'earrings',
    description: 'Beautiful floral and teardrop chandelier design adorned with sparkling stones for a luxurious statement look.',
    images: ['https://images.unsplash.com/photo-1611591475111-a83d7350c33d?auto=format&fit=crop&w=800&q=80'],
    stock: 15,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Emerald Chandelier Earrings',
    slug: 'emerald-chandelier-earrings',
    price: 750,
    categorySlug: 'earrings',
    description: 'Elegant gold-tone earrings featuring rich green stones and intricate detailing for festive occasions.',
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'],
    stock: 11,
    status: ProductStatus.ACTIVE,
  },

  // ANKLETS & BRACELETS
  {
    name: 'Pearl & Gold Double-Strand Anklet',
    slug: 'pearl-gold-double-strand-anklet',
    price: 499,
    categorySlug: 'bracelets',
    description: 'Elegant double-strand design featuring delicate white pearls and gold-tone beads for timeless charm.',
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'],
    stock: 22,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Elegant Black & Gold Anklet Pair',
    slug: 'elegant-black-gold-anklet-pair',
    price: 499,
    categorySlug: 'bracelets',
    description: 'Beautifully crafted with delicate gold chains and glossy black beads. Stylish and versatile for everyday wear.',
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'],
    stock: 20,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Black Clover Charm Bracelet',
    slug: 'black-clover-charm-bracelet',
    price: 499,
    categorySlug: 'bracelets',
    description: 'Delicate gold-tone bracelet with elegant black clover charms and fine chain detailing.',
    images: ['https://images.unsplash.com/photo-1611591475111-a83d7350c33d?auto=format&fit=crop&w=800&q=80'],
    stock: 25,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Coral Pink Bead Charm Bracelet',
    slug: 'coral-pink-bead-charm-bracelet',
    price: 499,
    categorySlug: 'bracelets',
    description: 'Elegant gold-tone chain bracelet featuring delicate coral-pink bead charms.',
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'],
    stock: 18,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Coral Pink Delicate Bead Bracelet',
    slug: 'coral-pink-delicate-bead-bracelet',
    price: 499,
    categorySlug: 'bracelets',
    description: 'Lightweight gold-tone chain bracelet with delicate coral-pink bead charms. Ideal for daily casual wear.',
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80'],
    stock: 19,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Blue Stone Gold-Tone Bracelet',
    slug: 'blue-stone-gold-tone-bracelet',
    price: 499,
    categorySlug: 'bracelets',
    description: 'Elegant gold-tone bracelet featuring beautiful blue oval stones in a sleek design.',
    images: ['https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80'],
    stock: 16,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Black Beaded Gold-Tone Anklet',
    slug: 'black-beaded-gold-tone-anklet',
    price: 750,
    categorySlug: 'bracelets',
    description: 'Elegant gold-tone anklet adorned with delicate black bead clusters for a timeless statement.',
    images: ['https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80'],
    stock: 14,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Mint Green Beaded Anklet',
    slug: 'mint-green-beaded-anklet',
    price: 750,
    categorySlug: 'bracelets',
    description: 'Delicate gold-tone anklet featuring elegant mint-green beads and subtle gold accents.',
    images: ['https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80'],
    stock: 15,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Ruby Beaded Gold-Tone Anklet',
    slug: 'ruby-beaded-gold-tone-anklet',
    price: 799,
    categorySlug: 'bracelets',
    description: 'Elegant gold-tone anklet featuring delicate ruby-pink beads in a minimalist chain design.',
    images: ['https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80'],
    stock: 12,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Elegant Leaf-Design Anklet',
    slug: 'elegant-leaf-design-anklet',
    price: 750,
    categorySlug: 'bracelets',
    description: 'A delicate gold-tone anklet featuring a beautiful leaf-pattern design for everyday grace.',
    images: ['https://images.unsplash.com/photo-1611591475111-a83d7350c33d?auto=format&fit=crop&w=800&q=80'],
    stock: 20,
    status: ProductStatus.ACTIVE,
  },
];

async function main() {
  console.log('Seeding third batch of 20 products from Google Sheets...');

  const dbCategories = await prisma.category.findMany();
  const catMap = new Map(dbCategories.map((c) => [c.slug, c.id]));

  for (const p of PRODUCTS_BATCH_3) {
    const categoryId = catMap.get(p.categorySlug);
    if (!categoryId) {
      console.warn(`Category slug ${p.categorySlug} not found! Skipping ${p.name}`);
      continue;
    }

    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        price: p.price,
        description: p.description,
        stock: p.stock,
        images: p.images,
        status: p.status,
        categoryId,
      },
      create: {
        name: p.name,
        slug: p.slug,
        price: p.price,
        description: p.description,
        stock: p.stock,
        images: p.images,
        status: p.status,
        categoryId,
      },
    });

    console.log(`✓ Inserted/Updated product: ${p.name} (₹${p.price})`);
  }

  console.log('Finished seeding all 20 products from third batch!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
