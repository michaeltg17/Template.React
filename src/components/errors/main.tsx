import { Button } from '@/components/ui/button';

export const MainErrorFallback = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Something went wrong</h1>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Reload
        </Button>
      </div>
    </div>
  );
};
