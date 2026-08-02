import { factory, primaryKey } from '@mswjs/data';

const schema = {
  user: {
    id: primaryKey(() => 'x' as string),
    firstName: () => '',
    lastName: () => '',
    email: () => '',
    role: () => '',
  },
  product: {
    id: primaryKey(() => 'x' as string),
    title: () => '',
    description: () => '',
    price: () => 0,
    imageUrl: () => '',
    category: () => '',
    createdAt: () => 0,
    updatedAt: () => 0,
  },
};

export const db = factory(schema);

export const initializeDb = async () => {
  await db.user.create({
    id: 'user-1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    role: 'ADMIN',
  });

  await db.user.create({
    id: 'user-2',
    firstName: 'Regular',
    lastName: 'User',
    email: 'user@example.com',
    role: 'USER',
  });

  const now = Date.now();
  const products = [
    {
      id: 'product-1',
      title: 'Wireless Headphones',
      description: 'Premium noise-cancelling headphones with 30-hour battery life and crystal-clear audio quality.',
      price: 149.99,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      category: 'Electronics',
    },
    {
      id: 'product-2',
      title: 'Leather Wallet',
      description: 'Handcrafted genuine leather bifold wallet with RFID blocking and multiple card slots.',
      price: 59.99,
      imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop',
      category: 'Accessories',
    },
    {
      id: 'product-3',
      title: 'Smart Watch',
      description: 'Feature-packed smartwatch with health monitoring, GPS tracking, and water resistance.',
      price: 299.99,
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      category: 'Electronics',
    },
    {
      id: 'product-4',
      title: 'Running Shoes',
      description: 'Lightweight performance running shoes with responsive cushioning and breathable mesh upper.',
      price: 129.99,
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      category: 'Footwear',
    },
    {
      id: 'product-5',
      title: 'Coffee Mug',
      description: 'Artisan handcrafted ceramic mug, perfect for morning coffee. Microwave and dishwasher safe.',
      price: 24.99,
      imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop',
      category: 'Home & Kitchen',
    },
  ];

  for (let i = 0; i < products.length; i++) {
    await db.product.create({
      ...products[i],
      createdAt: now - (i + 1) * 100000,
      updatedAt: now - (i + 1) * 100000,
    });
  }
};