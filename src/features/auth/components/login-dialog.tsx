'use client';

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Login } from './login-form';
import { Suspense } from 'react';
import { UserIcon } from 'lucide-react';

export const LoginDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <UserIcon className="h-4 w-4" />
          Login
        </Button>
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