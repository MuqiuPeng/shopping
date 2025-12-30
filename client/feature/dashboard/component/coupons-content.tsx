import { Gift, Calendar, Ticket } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Coupon {
  id: number;
  title: string;
  description: string;
  code: string;
  expiry: string;
  status: string;
  minAmount: number;
}

interface CouponsContentProps {
  coupons: Coupon[];
}

export default function CouponsContent({ coupons }: CouponsContentProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-light text-foreground">Coupons</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className={`bg-card border rounded-xl p-6 relative overflow-hidden ${
              coupon.status === "available"
                ? "border-accent/30 bg-accent/5"
                : "border-border opacity-60"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Gift className="w-5 h-5 text-accent" />
                  <h3 className="font-medium text-foreground">
                    {coupon.title}
                  </h3>
                </div>
                <p className="text-lg font-light text-accent">
                  {coupon.description}
                </p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="flex items-center space-x-2">
                    <span>Coupon Code:</span>
                    <code className="bg-background px-2 py-1 rounded text-foreground font-mono">
                      {coupon.code}
                    </code>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Valid until: {coupon.expiry}</span>
                  </div>
                  <div>Minimum spend: ${coupon.minAmount}</div>
                </div>
              </div>

              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  coupon.status === "available"
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {coupon.status === "available" ? "Available" : "Used"}
              </div>
            </div>

            {coupon.status === "available" && (
              <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10">
                <Ticket className="w-full h-full text-accent" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-6 text-center">
        <Gift className="w-12 h-12 text-accent mx-auto mb-4" />
        <h3 className="text-lg font-light text-foreground mb-2">
          More Coupons
        </h3>
        <p className="text-muted-foreground mb-4">
          Follow our promotions page to get more exclusive coupons
        </p>
        <Link href="/promotions">
          <Button>Get Coupons</Button>
        </Link>
      </div>
    </div>
  );
}
