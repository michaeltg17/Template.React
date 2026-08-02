import { cn } from '@/utils/cn';

const spinnerVariants = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-16 w-16',
  xl: 'h-24 w-24',
  '2xl': 'h-32 w-32',
};

export const Spinner = ({ size = 'md' }: { size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' }) => {
  return (
    <div
      className={cn(
        spinnerVariants[size],
        'animate-spin rounded-full border-2 border-gray-300 border-t-gray-600',
      )}
    />
  );
};
