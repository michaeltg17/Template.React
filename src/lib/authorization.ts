import type { User } from '@/types/api';

export const canCreateProduct = (user?: User | null): boolean => user?.role === 'ADMIN';
export const canUpdateProduct = (user?: User | null): boolean => user?.role === 'ADMIN';
export const canDeleteProduct = (user?: User | null): boolean => user?.role === 'ADMIN';
