import { PrismaClient, ProductStatus } from '@prisma/client';

const prisma = new PrismaClient();

const PRODUCTS_BATCH_2 = [
  // NECKLACES & HARAMS
  {
    name: 'Mid Long Kundan Necklace',
    slug: 'mid-long-kundan-necklace',
    price: 1300,
    categorySlug: 'necklaces',
    description: 'Handwoven antique gold chain with vibrant multicolor kundan pendant. Perfect for festive occasions and adding a graceful touch to any traditional outfit.',
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'],
    stock: 12,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Navaratna Peacock Choker Necklace',
    slug: 'navaratna-peacock-choker-necklace',
    price: 1199,
    categorySlug: 'necklaces',
    description: 'Navaratna peacock choker with delicate pearl drops. Antique Matt gold finish perfect for all festive celebrations.',
    images: ['https://images.unsplash.com/photo-1611591475111-a83d7350c33d?auto=format&fit=crop&w=800&q=80'],
    stock: 15,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Antique Gold Kundan Maala',
    slug: 'antique-gold-kundan-maala',
    price: 1099,
    categorySlug: 'necklaces',
    description: 'Antique gold finish Maala studded with ruby, emerald, and sparkling white stones. High-statement traditional piece.',
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80'],
    stock: 10,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Premium Kemp Stone Mid Haram Set',
    slug: 'premium-kemp-stone-mid-haram-set',
    price: 1299,
    categorySlug: 'necklaces',
    description: 'Kemp stone haram detailed with green and red kundan and pearl hangings. Antique gold finish with matching earrings.',
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'],
    stock: 8,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Antique Chandbali Haram Set',
    slug: 'antique-chandbali-haram-set',
    price: 1399,
    categorySlug: 'necklaces',
    description: 'Lightweight Antique Chandbali long necklace with matching earrings. Crafted for comfortable all-day festive wear.',
    images: ['https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80'],
    stock: 14,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Double Sided Kundan Haram',
    slug: 'double-sided-kundan-haram',
    price: 1399,
    categorySlug: 'necklaces',
    description: 'Gold plated antique haram featuring detailed Devi motifs on one side and sparkling kundan stones on the reverse.',
    images: ['https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80'],
    stock: 9,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Mango Kemp Long Necklace Set',
    slug: 'mango-kemp-long-necklace-set',
    price: 1999,
    categorySlug: 'necklaces',
    description: 'Antique matte finish gold replica mango necklace with ruby stone detailing and matching statement earrings.',
    images: ['https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80'],
    stock: 7,
    status: ProductStatus.ACTIVE,
  },

  // KADAS & TEMPLE BANGLES
  {
    name: 'Antique Peacock Emerald Kada',
    slug: 'antique-peacock-emerald-kada',
    price: 599,
    categorySlug: 'bracelets',
    description: 'Antique peacock Kada featuring a rich emerald centre stone and sparkling AD stones (Size 2.4).',
    images: ['https://images.unsplash.com/photo-1611591475111-a83d7350c33d?auto=format&fit=crop&w=800&q=80'],
    stock: 20,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Ruby Emerald Temple Lakshmi Bangles',
    slug: 'ruby-emerald-temple-lakshmi-bangles',
    price: 499,
    categorySlug: 'bracelets',
    description: 'Antique finish ruby-emerald temple bangles adorned with intricate Lakshmi motifs (Size 2.8).',
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'],
    stock: 25,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Antique Matt Finish Bangle Set of 4',
    slug: 'antique-matt-finish-bangle-set-4',
    price: 999,
    categorySlug: 'bracelets',
    description: 'Matte finish ruby-emerald bangle set of 4 pieces. Designed for everyday elegance and ethnic celebrations (Size 2.8).',
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80'],
    stock: 15,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Matt Finish Lakshmi Pearl Kada',
    slug: 'matt-finish-lakshmi-pearl-kada',
    price: 399,
    categorySlug: 'bracelets',
    description: 'Lightweight Matt finish Lakshmi kada surrounded by a delicate cluster of pearls (Size 2.8).',
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'],
    stock: 30,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Emerald Wave AD Gold Kada',
    slug: 'emerald-wave-ad-gold-kada',
    price: 599,
    categorySlug: 'bracelets',
    description: 'Emerald squared wave gold Kada with high-polish antique polish and sparkling AD white diamonds (Size 2.6, 2.8).',
    images: ['https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80'],
    stock: 18,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'AD Diamond Black Flower Kada',
    slug: 'ad-diamond-black-flower-kada',
    price: 525,
    categorySlug: 'bracelets',
    description: 'Premium quality AD stone diamond black flower Kada with high polish finish and floral motifs (Size 2.6, 2.8).',
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'],
    stock: 14,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Antique Gold Ruby Emerald AD Bangle',
    slug: 'antique-gold-ruby-emerald-ad-bangle',
    price: 550,
    categorySlug: 'bracelets',
    description: 'Best seller ruby emerald AD stone bangle in premium antique gold finish (Size 2.6, 2.8).',
    images: ['https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80'],
    stock: 22,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Ruby Pink AD Diamond Lattice Kada',
    slug: 'ruby-pink-ad-diamond-lattice-kada',
    price: 550,
    categorySlug: 'bracelets',
    description: 'Premium party wear ruby pink AD diamond lattice Kada with lightweight gold polish (Size 2.4, 2.6).',
    images: ['https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80'],
    stock: 16,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Antique Ruby White AD Stone Kada',
    slug: 'antique-ruby-white-ad-stone-kada',
    price: 475,
    categorySlug: 'bracelets',
    description: 'Single piece party wear Kada with rich ruby stone accents and white AD diamond stones (Size 2.4).',
    images: ['https://images.unsplash.com/photo-1611591475111-a83d7350c33d?auto=format&fit=crop&w=800&q=80'],
    stock: 19,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Navaratna 4-Piece Thin Kada Set',
    slug: 'navaratna-4-piece-thin-kada-set',
    price: 520,
    categorySlug: 'bracelets',
    description: 'Navaratna 4-piece thin Kada set in premium non-fading antique gold polish (Size 2.8).',
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'],
    stock: 12,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Lakshmi Lotus Kemp Temple Kada',
    slug: 'lakshmi-lotus-kemp-temple-kada',
    price: 400,
    categorySlug: 'bracelets',
    description: 'Heavy temple wear Lakshmi lotus kemp Kada in premium antique Matt finish (Size 2.6).',
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80'],
    stock: 17,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Emerald Rectangle AD Stone Kada',
    slug: 'emerald-rectangle-ad-stone-kada',
    price: 499,
    categorySlug: 'bracelets',
    description: 'Emerald green rectangle stone AD Kada in premium gold finish (Size 2.6, 2.10).',
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'],
    stock: 21,
    status: ProductStatus.ACTIVE,
  },
  {
    name: 'Kemp Stone Crown Openable Kada',
    slug: 'kemp-stone-crown-openable-kada',
    price: 450,
    categorySlug: 'bracelets',
    description: 'Ruby emerald white kemp stone crown Kada with convenient openable adjustable design (Size 2.8).',
    images: ['https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80'],
    stock: 25,
    status: ProductStatus.ACTIVE,
  },
];

async function main() {
  console.log('Seeding second batch of 20 products from Google Sheets...');

  const dbCategories = await prisma.category.findMany();
  const catMap = new Map(dbCategories.map((c) => [c.slug, c.id]));

  for (const p of PRODUCTS_BATCH_2) {
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

  console.log('Finished seeding all 20 products from second batch!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
