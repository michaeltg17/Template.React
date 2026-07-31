import { randEmail, randFirstName, randLastName, randNumber, randWord, randUrl } from '@ngneat/falso';
import { db } from './mocks/db';

export const generateUser = (overrides?: Partial<ReturnType<typeof db.user.create>>) => {
  return db.user.create({
    id: crypto.randomUUID(),
    firstName: randFirstName(),
    lastName: randLastName(),
    email: randEmail(),
    role: 'USER',
    ...overrides,
  });
};

export const generateAdmin = () => generateUser({ role: 'ADMIN' });

export const generateProduct = (overrides?: Partial<ReturnType<typeof db.product.create>>) => {
  const now = Date.now();
  return db.product.create({
    id: crypto.randomUUID(),
    title: `${randWord()} ${randWord()}`,
    description: `${randWord()} ${randWord()} ${randWord()}`,
    price: randNumber({ min: 1, max: 999 }),
    imageUrl: randUrl(),
    category: randWord(),
    createdAt: now,
    updatedAt: now,
    ...overrides,
  });
};