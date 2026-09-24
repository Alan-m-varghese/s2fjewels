import { PrismaClient, Role, ProductStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create initial Admin user
  const adminPasswordHash = await bcrypt.hash('admin123456', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@s2fjewels.com' },
    update: {},
    create: {
      name: 'S2F Admin',
      email: 'admin@s2fjewels.com',
      passwordHash: adminPasswordHash,
      role: Role.ADMIN,
      phone: '+919876543210',
    },
  });
  console.log('Admin user created:', adminUser.email);

  // Create initial Customer user
  const customerPasswordHash = await bcrypt.hash('customer123', 10);
  const customerUser = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      name: 'Riya Sharma',
      email: 'customer@example.com',
      passwordHash: customerPasswordHash,
      role: Role.CUSTOMER,
      phone: '+919876543211',
    },
  });
  console.log('Sample customer user created:', customerUser.email);

  // Create Categories
  const categories = [
    { name: 'Rings', slug: 'rings' },
    { name: 'Necklaces', slug: 'necklaces' },
    { name: 'Earrings', slug: 'earrings' },
    { name: 'Bracelets', slug: 'bracelets' },
  ];

  const createdCategories: Record<string, string> = {};

  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    createdCategories[cat.slug] = created.id;
  }
  console.log('Categories created');

  // Create Products
  const products = [
    {
      name: 'Solitaire Diamond Ring 18K Gold',
      slug: 'solitaire-diamond-ring-18k-gold',
      description: 'Handcrafted 18k yellow gold solitaire ring featuring a 1-carat certified brilliant-cut diamond. Elegant, timeless, and pristine.',
      price: 49999.00,
      stock: 15,
      categoryId: createdCategories['rings'],
      images: [
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80'
      ],
      status: ProductStatus.ACTIVE,
    },
    {
      name: 'Royal Heritage Emerald Choker Necklace',
      slug: 'royal-heritage-emerald-choker-necklace',
      description: 'Exquisite Kundan choker studded with natural Zambian emeralds and freshwater pearls. Crafted in 22K gold foil finish.',
      price: 89999.00,
      stock: 8,
      categoryId: createdCategories['necklaces'],
      images: [
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80'
      ],
      status: ProductStatus.ACTIVE,
    },
    {
      name: 'Classic Rose Gold Diamond Hoop Earrings',
      slug: 'classic-rose-gold-diamond-hoop-earrings',
      description: 'Delicate 14k rose gold hoops studded with micro-pave diamonds. Lightweight design suitable for everyday luxury.',
      price: 24999.00,
      stock: 25,
      categoryId: createdCategories['earrings'],
      images: [
        'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'
      ],
      status: ProductStatus.ACTIVE,
    },
    {
      name: 'Vedic Gold Temple Bangle Bracelet',
      slug: 'vedic-gold-temple-bangle-bracelet',
      description: 'Intricately carved temple jewelry bangle set in 22k solid gold with ruby gemstone accents.',
      price: 65499.00,
      stock: 12,
      categoryId: createdCategories['bracelets'],
      images: [
        'https://images.unsplash.com/photo-1611591475179-62cd3c2f2353?auto=format&fit=crop&w=800&q=80'
      ],
      status: ProductStatus.ACTIVE,
    }
  ];

  for (const prod of products) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {},
      create: prod,
    });
  }
  console.log('Sample products created');

  console.log('Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
