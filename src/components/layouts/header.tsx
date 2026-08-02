'use client';

import Link from 'next/link';
import { LogOut, User, Shield, Plus } from 'lucide-react';
import { useUser, useLogout } from '@/lib/auth';
import { LoginDialog } from '@/features/auth/components/login-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { User as UserType } from '@/types/api';
import { useCreateProductStore } from '@/stores/create-product';
import { canCreateProduct } from '@/lib/authorization';

const UserMenu = ({ user }: { user: UserType }) => {
  const logout = useLogout({});
  const { open: openCreateProduct } = useCreateProductStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-200">
          {user.role === 'ADMIN' ? <Shield className="h-4 w-4" /> : <User className="h-4 w-4" />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="text-sm font-medium">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-xs text-muted-foreground">{user.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {canCreateProduct(user) && (
          <DropdownMenuItem onClick={() => openCreateProduct()}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => logout.mutate()} className="text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Header = () => {
  const { data: user } = useUser();

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          Template<span className="text-primary">.React</span>
        </Link>
        <div className="flex items-center gap-3">
          {user && <UserMenu user={user} />}
          {!user && <LoginDialog />}
        </div>
      </div>
    </header>
  );
};
