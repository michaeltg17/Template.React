import { http, HttpResponse } from 'msw';
import { db } from '../db';

export const productHandlers = [
  http.get('/api/products', () => {
    const products = db.product.findMany({});
    return HttpResponse.json({ data: products, meta: { page: 1, total: products.length, totalPages: 1 } });
  }),

  http.post('/api/products', async ({ request }) => {
    const data = await request.json();
    const product = db.product.create(data as any);
    return HttpResponse.json(product, { status: 201 });
  }),

  http.put('/api/products/:id', async ({ params, request }) => {
    const data = await request.json();
    const product = db.product.update({ where: { id: { equals: String(params.id) } }, data: data as any });
    return HttpResponse.json(product);
  }),

  http.delete('/api/products/:id', async ({ params }) => {
    db.product.delete({ where: { id: { equals: String(params.id) } } });
    return new HttpResponse(null, { status: 204 });
  }),
];