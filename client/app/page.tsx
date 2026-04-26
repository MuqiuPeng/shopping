import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import HotSelling from "@/components/hot-selling";
import Recommended from "@/components/recommended";
import Footer from "@/components/footer";
import Link from "next/link";
import ThemedButton from "@/components/theme-button";

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
            <ThemedButton href="/cart" size="lg">
              View Shopping Cart
            </ThemedButton>
            <ThemedButton size="lg">Quick Cart Access</ThemedButton>
            <ThemedButton href="/checkout/success" size="lg">
              View Payment Success
            </ThemedButton>
            <ThemedButton href="/dashboard" size="lg">
              View User Dashboard
            </ThemedButton>
          </div>
        </div>
      </div>

      <HotSelling />
      <Recommended />
      <Footer />
    </div>
  );
}
