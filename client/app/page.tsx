import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import HotSelling from "@/components/hot-selling";
import Recommended from "@/components/recommended";
import Footer from "@/components/footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />

      {/* Quick Cart Access Demo */}
      <div className="py-8 px-4 text-center bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-light text-foreground mb-4">
            🛒 New Features Demo
          </h3>
          <p className="text-muted-foreground mb-6">
            Explore our new shopping cart design with complete checkout flow and
            coupon functionality
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cart"
              className="inline-flex items-center px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium"
            >
              View Shopping Cart
            </Link>
            <Link
              href="/checkout/success"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              View Payment Success
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center px-6 py-3 bg-secondary text-secondary-foreground border border-border rounded-lg hover:bg-secondary/80 transition-colors font-medium"
            >
              View User Dashboard
            </Link>
          </div>
        </div>
      </div>

      <HotSelling />
      <Recommended />
      <Footer />
    </div>
  );
}
