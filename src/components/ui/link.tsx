import NextLink from 'next/link';
import { cn } from '@/utils/cn';
import { ComponentProps } from 'react';

export const Link = ({ className, ...props }: ComponentProps<typeof NextLink>) => {
  return <NextLink className={cn('text-blue-600 hover:underline', className)} {...props} />;
};
