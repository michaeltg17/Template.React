import { authHandlers } from './handlers/auth';
import { productHandlers } from './handlers/products';

export const handlers = [...authHandlers, ...productHandlers];
