import { Package, ShoppingBag, Heart } from "lucide-react";
import Link from "next/link";
import { linkToProductDetail } from "@/utils";

interface User {
  name: string;
  email: string;
  phone: string;
  homeAddress: string;
  avatar: string;
  memberSince: string;
  totalOrders: number;
  totalSpent: number;
}

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: number;
  canConfirm: boolean;
  image: string;
}

interface Favorite {
  id: number;
  name: string;
  price: string;
  image: string;
  inStock: boolean;
}

interface OverviewContentProps {
  user: User;
  recentOrders: Order[];
  favoritesCount: number;
}

export default function OverviewContent({
  user,
  recentOrders,
  favoritesCount,
}: OverviewContentProps) {
  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-accent/10 via-accent/5 to-transparent border border-accent/20 rounded-2xl p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-secondary">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-light text-foreground">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
            <p className="text-sm text-muted-foreground">
              Member since: {user.memberSince}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <Package className="w-8 h-8 text-accent mx-auto mb-3" />
          <div className="text-2xl font-medium text-foreground">
            {user.totalOrders}
          </div>
          <div className="text-sm text-muted-foreground">Total Orders</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <ShoppingBag className="w-8 h-8 text-accent mx-auto mb-3" />
          <div className="text-2xl font-medium text-foreground">
            ${user.totalSpent}
          </div>
          <div className="text-sm text-muted-foreground">Total Spent</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <Heart className="w-8 h-8 text-accent mx-auto mb-3" />
          <div className="text-2xl font-medium text-foreground">
            {favoritesCount}
          </div>
          <div className="text-sm text-muted-foreground">Favorite Items</div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-light text-foreground mb-4">
          Recent Orders
        </h3>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary">
                  <img
                    src={order.image}
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-foreground">{order.id}</div>
                  <div className="text-sm text-muted-foreground">
                    {order.date}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-foreground">
                  ${order.total}
                </div>
                <div className="text-sm text-accent">{order.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
