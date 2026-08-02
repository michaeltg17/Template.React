import { ProductsGrid } from '@/features/products/components/products-grid';
import { AppLayout } from '@/components/layouts';

export default function AppPage() {
  return (
    <AppLayout>
      <ProductsGrid />
    </AppLayout>
  );
}
