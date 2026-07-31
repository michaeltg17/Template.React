import { AppLayout } from '@/components/layouts';
import { Login } from '@/features/auth/components/login-form';
import { Suspense } from 'react';

const LoginPage = () => (
  <AppLayout>
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      </div>
    </div>
  </AppLayout>
);

export default LoginPage;
