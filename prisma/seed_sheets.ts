import { PrismaClient, ProductStatus } from '@prisma/client';

const prisma = new PrismaClient();

const PRODUCTS = [
  // NECKLACES
  {
    name: 'Ruby Bloom',
    slug: 'ruby-bloom',
    price: 1999,
    categorySlug: 'necklaces',
    description: 'Premium floral ruby necklace with intricate detailing and a rich gold finish, accompanied by matching statement earrings.',
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'],
    stock: 10,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Emerald Royale',
    slug: 'emerald-royale',
    price: 2190,
    categorySlug: 'necklaces',
    description: 'Premium statement necklace set with gold detailing, rich ruby tones, elegant green drops, and delicate pearls. Comes with matching statement earrings.',
    images: ['https://images.unsplash.com/photo-1611591475111-a83d7350c33d?auto=format&fit=crop&w=800&q=80'],
    stock: 8,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Nila',
    slug: 'nila',
    price: 1099,
    categorySlug: 'necklaces',
    description: 'Gold-toned necklace featuring a large emerald-green pendant studded with AD stones, paired with matching statement earrings.',
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80'],
    stock: 12,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Coral Veda',
    slug: 'coral-veda',
    price: 1599,
    categorySlug: 'necklaces',
    description: 'Gold-toned necklace with vibrant coral stones, delicate pearl accents, and an elegant matching centre pendant. Paired with matching earrings.',
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'],
    stock: 15,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Aaranya',
    slug: 'aaranya',
    price: 1199,
    categorySlug: 'necklaces',
    description: 'Multicolour gemstone necklace with delicate crystal detailing, crafted in a warm mehndi-gold tone for an elegant traditional look.',
    images: ['https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80'],
    stock: 14,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Blush Petal Elegance',
    slug: 'blush-petal-elegance',
    price: 1399,
    categorySlug: 'necklaces',
    description: 'A delicate gold necklace adorned with soft blush-pink stones, sparkling crystals, and intricate floral motifs.',
    images: ['https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80'],
    stock: 9,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Ruby Fleur',
    slug: 'ruby-fleur',
    price: 899,
    categorySlug: 'necklaces',
    description: 'A graceful gold necklace featuring a sparkling floral lattice design, crystal accents, and a rich ruby-red teardrop pendant. Includes matching earrings.',
    images: ['https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80'],
    stock: 20,
    status: ProductStatus.ACTIVE,
  },

  // BRACELETS / BEADS & CRYSTALS
  {
    name: 'Rainbow Royale Chain',
    slug: 'rainbow-royale-chain',
    price: 899,
    categorySlug: 'bracelets',
    description: 'Rainbow Royale — a graceful gold-tone gemstone chain featuring vibrant multicoloured stones and ornate filigree beads (Length: 20 inches).',
    images: ['https://images.unsplash.com/photo-1611591475111-a83d7350c33d?auto=format&fit=crop&w=800&q=80'],
    stock: 18,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Coral Beauty Chain',
    slug: 'coral-beauty-chain',
    price: 750,
    categorySlug: 'bracelets',
    description: 'Bold coral beads meet intricate gold accents in this elegant gold-plated chain (Length: 26 inches).',
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'],
    stock: 15,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Emerald Grace Chain',
    slug: 'emerald-grace-chain',
    price: 899,
    categorySlug: 'bracelets',
    description: 'Rich green crystal beads with intricate gold-plated accents, a graceful blend of elegance and timeless charm (Length: 20 inches).',
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80'],
    stock: 10,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Pearl Garden Chain',
    slug: 'pearl-garden-chain',
    price: 899,
    categorySlug: 'bracelets',
    description: 'Elegant pearls and green stones paired with delicate gold-plated accents for a timeless, graceful look (Length: 26 inches).',
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'],
    stock: 16,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Ruby Crystal Chain',
    slug: 'ruby-crystal-chain',
    price: 899,
    categorySlug: 'bracelets',
    description: 'Glossy ruby-red stones with ornate gold-plated accents, crafted for a rich and elegant statement (Length: 20 inches).',
    images: ['https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80'],
    stock: 11,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Coral Pearl Elegance Chain',
    slug: 'coral-pearl-elegance-chain',
    price: 599,
    categorySlug: 'bracelets',
    description: 'Timeless oval pearls paired with vibrant coral beads and delicate gold detailing (Length: 26 inches).',
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'],
    stock: 25,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Round Coral Pearl Charm Chain',
    slug: 'round-coral-pearl-charm-chain',
    price: 490,
    categorySlug: 'bracelets',
    description: 'Delicate coral-red beads and lustrous pearls, beautifully paired with gold detailing for an elegant everyday statement (Length: 24 inches).',
    images: ['https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80'],
    stock: 30,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Ruby Pearl Bloom Necklace Set',
    slug: 'ruby-pearl-bloom-necklace-set',
    price: 799,
    categorySlug: 'bracelets',
    description: 'An exquisite 3-strand pearl necklace with a floral gold pendant, ruby-toned stones, and delicate pearl drop. Comes with matching earrings (Length: 18 inches).',
    images: ['https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80'],
    stock: 14,
    status: ProductStatus.ACTIVE,
  },

  // RINGS
  {
    name: 'Midnight Bloom Ring',
    slug: 'midnight-bloom-ring',
    price: 399,
    categorySlug: 'rings',
    description: 'Floral ring studded with AD stones and featuring a deep blue halo. Size adjustable for perfect fit.',
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'],
    stock: 25,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Ruby Royale Ring',
    slug: 'ruby-royale-ring',
    price: 277,
    categorySlug: 'rings',
    description: 'Statement rectangular-cut ring featuring deep ruby stones, framed with sparkling accents and polished gold tones (Size 7).',
    images: ['https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80'],
    stock: 20,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Crystal Royale Ring',
    slug: 'crystal-royale-ring',
    price: 299,
    categorySlug: 'rings',
    description: 'Statement rectangular-cut ring featuring brilliant crystal stones, framed with sparkling accents and polished gold tones (Size 6.5).',
    images: ['https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80'],
    stock: 15,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Celeste Bloom Ring',
    slug: 'celeste-bloom-ring',
    price: 310,
    categorySlug: 'rings',
    description: 'Floral-inspired gold ring adorned with sparkling crystal petals, designed to add a graceful touch of elegance. Size adjustable.',
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'],
    stock: 18,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Heart Open Ring',
    slug: 'heart-open-ring',
    price: 199,
    categorySlug: 'rings',
    description: 'A gold open ring featuring a sparkling heart-shaped pavé design paired with a sleek hollow circle, a graceful symbol of love and elegance. Size adjustable.',
    images: ['https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80'],
    stock: 30,
    status: ProductStatus.ACTIVE,
  },
];

async function main() {
  console.log('Seeding products from Google Sheets...');

  // Ensure default categories exist
  const categories = [
    { name: 'Necklaces', slug: 'necklaces' },
    { name: 'Rings', slug: 'rings' },
    { name: 'Bracelets & Chains', slug: 'bracelets' },
    { name: 'Earrings', slug: 'earrings' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  const dbCategories = await prisma.category.findMany();
  const catMap = new Map(dbCategories.map((c) => [c.slug, c.id]));

  for (const p of PRODUCTS) {
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

  console.log('Finished seeding all 20 products!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
