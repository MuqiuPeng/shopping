import { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/navigation";

const AboutView = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 right-16 w-48 h-48 bg-primary/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-accent/8 rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm font-medium text-accent-foreground">
                  Since 1990s • 30+ Years of Excellence
                </div>

                <h1 className="text-4xl lg:text-6xl font-light text-foreground tracking-tight leading-tight">
                  Crafting{" "}
                  <span className="text-transparent bg-linear-to-r from-primary via-accent to-primary bg-clip-text">
                    Timeless Elegance
                  </span>
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  For over three decades, we've been dedicated to creating
                  exceptional crystal and pearl bracelets that celebrate life's
                  most precious moments.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5"
                >
                  Explore Collection
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 border border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-accent/20 transform hover:-translate-y-0.5"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="aspect-square bg-linear-to-br from-card via-secondary/20 to-accent/10 rounded-3xl border border-border/50 backdrop-blur-sm p-8 shadow-xl shadow-primary/5">
                <div className="h-full flex items-center justify-center">
                  {/* Decorative Crystal/Pearl Pattern */}
                  <div className="grid grid-cols-3 gap-6">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-12 h-12 rounded-full ${
                          i % 2 === 0
                            ? "bg-linear-to-br from-accent/30 to-primary/30"
                            : "bg-linear-to-br from-primary/30 to-accent/30"
                        } backdrop-blur-sm border border-accent/20 animate-pulse`}
                        style={{
                          animationDelay: `${i * 0.2}s`,
                          animationDuration: "3s",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-light text-foreground mb-6">
                Our Story
              </h2>
              <div className="w-16 h-1 bg-linear-to-r from-accent to-primary rounded-full"></div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Founded in the early 1990s, our journey began with a simple
                  yet profound vision: to create jewelry that captures the
                  natural beauty and spiritual energy of crystals and pearls.
                  What started as a small family business has grown into a
                  trusted name in the world of fine bracelet craftsmanship.
                </p>

                <p>
                  Over the past thirty years, we've witnessed the evolution of
                  jewelry trends, but our commitment to quality and authenticity
                  has remained unwavering. Each piece in our collection is
                  carefully selected and crafted to not only enhance your
                  personal style but also to bring positive energy and meaning
                  to your daily life.
                </p>

                <p>
                  Today, we continue to honor traditional craftsmanship while
                  embracing modern design sensibilities, ensuring that every
                  bracelet tells a unique story of elegance, spirituality, and
                  timeless beauty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision we make and every piece
              we create
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Quality Craftsmanship */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 space-y-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
              <div className="w-16 h-16 bg-linear-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-linear-to-br from-accent to-primary rounded-full"></div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-medium text-foreground">
                  Quality Craftsmanship
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every bracelet is meticulously crafted with attention to
                  detail, ensuring durability and timeless beauty that lasts for
                  generations.
                </p>
              </div>
            </div>

            {/* Authentic Materials */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 space-y-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
              <div className="w-16 h-16 bg-linear-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-linear-to-br from-primary to-accent rounded-full"></div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-medium text-foreground">
                  Authentic Materials
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We source only genuine crystals and pearls, each carefully
                  selected for their natural beauty, energy, and spiritual
                  significance.
                </p>
              </div>
            </div>

            {/* Customer Connection */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 space-y-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
              <div className="w-16 h-16 bg-linear-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-linear-to-br from-accent to-primary rounded-full"></div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-medium text-foreground">
                  Customer Connection
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Building lasting relationships with our customers through
                  personalized service and creating pieces that resonate with
                  their unique journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-20 bg-linear-to-br from-secondary/10 to-accent/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-light text-foreground">
                Three Decades of Excellence
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                From our humble beginnings to becoming a trusted name in crystal
                and pearl jewelry, our legacy is built on unwavering commitment
                to quality and customer satisfaction.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
              <div className="space-y-2">
                <div className="text-3xl font-light text-transparent bg-linear-to-r from-primary to-accent bg-clip-text">
                  30+
                </div>
                <p className="text-sm text-muted-foreground uppercase tracking-wide">
                  Years of Experience
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-3xl font-light text-transparent bg-linear-to-r from-primary to-accent bg-clip-text">
                  10K+
                </div>
                <p className="text-sm text-muted-foreground uppercase tracking-wide">
                  Happy Customers
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-3xl font-light text-transparent bg-linear-to-r from-primary to-accent bg-clip-text">
                  500+
                </div>
                <p className="text-sm text-muted-foreground uppercase tracking-wide">
                  Unique Designs
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-3xl font-light text-transparent bg-linear-to-r from-primary to-accent bg-clip-text">
                  100%
                </div>
                <p className="text-sm text-muted-foreground uppercase tracking-wide">
                  Authentic Materials
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-linear-to-br from-card/50 via-secondary/20 to-accent/5 backdrop-blur-sm border border-border/50 rounded-3xl p-12 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-light text-foreground">
                Begin Your Journey
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover the perfect crystal or pearl bracelet that speaks to
                your soul. Each piece carries the energy and beauty of nature's
                finest creations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5"
              >
                Shop Collection
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-accent/20 transform hover:-translate-y-0.5"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutView;
