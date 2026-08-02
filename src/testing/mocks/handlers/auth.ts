import { http, HttpResponse } from 'msw';
import { db } from '../db';

export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    const user = db.user.findFirst({ where: { email: { equals: body.email } } });

    if (!user || body.password !== 'password123') {
      return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    return HttpResponse.json(
      { user, jwt: 'fake-jwt' },
      { headers: { 'Set-Cookie': 'auth_token=fake-jwt; HttpOnly; Path=/' } },
    );
  }),

  http.get('/api/auth/me', ({ cookies }) => {
    if (!cookies.auth_token) {
      return HttpResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }
    const user = db.user.findFirst({ where: {} });
    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return HttpResponse.json({ data: user });
  }),

  http.post('/api/auth/logout', () => {
    return new HttpResponse(null, {
      status: 200,
      headers: { 'Set-Cookie': 'auth_token=; HttpOnly; Path=/; Max-Age=0' },
    });
  }),
];
