import { ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { linkToProductDetail } from "@/utils";

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: number;
  canConfirm: boolean;
  image: string;
}

interface OrdersContentProps {
  orders: Order[];
  onConfirmDelivery: (orderId: string) => void;
}

export default function OrdersContent({
  orders,
  onConfirmDelivery,
}: OrdersContentProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-light text-foreground">My Orders</h2>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="font-medium text-foreground">{order.id}</div>
                <div className="text-sm text-muted-foreground flex items-center space-x-4 mt-1">
                  <span>Order Date: {order.date}</span>
                  <span>Items: {order.items}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-foreground">
                  ${order.total}
                </div>
                <div
                  className={`text-sm px-2 py-1 rounded-full text-center mt-1 ${
                    order.status === "Completed"
                      ? "bg-accent/10 text-accent"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {order.status}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary">
                  <img
                    src={order.image}
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Link
                  href={linkToProductDetail(order.id)}
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  View Details <ChevronRight className="w-4 h-4 inline" />
                </Link>
              </div>

              {order.canConfirm && (
                <Button
                  onClick={() => onConfirmDelivery(order.id)}
                  size="sm"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Confirm Delivery
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
