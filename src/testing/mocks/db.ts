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
  for (let i = 1; i <= 5; i++) {
    await db.product.create({
      id: `product-${i}`,
      title: `Product ${i}`,
      description: `Description for Product ${i}`,
      price: 99.99 * i,
      imageUrl: `https://placehold.co/400x400?text=Product+${i}`,
      category: 'Electronics',
      createdAt: now - i * 100000,
      updatedAt: now - i * 100000,
    });
  }
};