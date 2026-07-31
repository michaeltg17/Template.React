'use client';

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Login } from './login-form';
import { Suspense } from 'react';

export const LoginDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
