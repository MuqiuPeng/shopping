import NotFound from '@/features/order/component/not-found';
import OrderDetailView from '@/features/order/view/order-detail-view';
import { getOrderById } from '@/repositories/order/order.repo';

interface PageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;

  const existingOrder = await getOrderById(id);

  if (!existingOrder) {
    return <NotFound />;
  }

  return <OrderDetailView id={id} order={existingOrder} />;
};

export default page;
