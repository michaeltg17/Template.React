export type BaseEntity = {
  id: string;
  createdAt: number;
  updatedAt: number;
};

export type Entity<T> = T & BaseEntity;

export type User = Entity<{
  firstName: string;
  lastName: string;
  email: string;
  role: 'ADMIN' | 'USER';
}>;

export type AuthResponse = {
  jwt: string;
  user: User;
};

export type Product = Entity<{
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}>;

export type Meta = {
  page: number;
  total: number;
  totalPages: number;
};
