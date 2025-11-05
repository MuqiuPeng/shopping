import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import HotSelling from "@/components/hot-selling"
import Recommended from "@/components/recommended"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <HotSelling />
      <Recommended />
      <Footer />
    </div>
  )
}
