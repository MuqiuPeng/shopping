import React from "react";
import Link from "next/link";
import Navigation from "@/components/navigation";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

const ContactView = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 left-16 w-48 h-48 bg-primary/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-accent/8 rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm font-medium text-accent-foreground">
              Get in Touch • We're Here to Help
            </div>

            <h1 className="text-4xl lg:text-6xl font-light text-foreground tracking-tight leading-tight">
              Contact{" "}
              <span className="text-transparent bg-linear-to-r from-primary via-accent to-primary bg-clip-text">
                Our Team
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Whether you have questions about our crystal and pearl bracelets
              or need personalized assistance, we're here to help you find the
              perfect piece.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-light text-foreground">
                  How to Reach Us
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our dedicated team is available to assist you with any
                  inquiries about our handcrafted crystal and pearl bracelets.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start space-x-4 p-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <div className="w-12 h-12 bg-linear-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium text-foreground">
                      Phone
                    </h3>
                    <p className="text-muted-foreground">
                      Call us for immediate assistance
                    </p>
                    <p className="text-foreground font-medium">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4 p-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <div className="w-12 h-12 bg-linear-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium text-foreground">
                      Email
                    </h3>
                    <p className="text-muted-foreground">
                      Send us a detailed message
                    </p>
                    <p className="text-foreground font-medium">
                      hello@pearlcrystal.com
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4 p-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <div className="w-12 h-12 bg-linear-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium text-foreground">
                      Showroom
                    </h3>
                    <p className="text-muted-foreground">
                      Visit us for a personal consultation
                    </p>
                    <p className="text-foreground font-medium">
                      123 Jewelry District
                      <br />
                      New York, NY 10013
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-4 p-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <div className="w-12 h-12 bg-linear-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium text-foreground">
                      Business Hours
                    </h3>
                    <p className="text-muted-foreground">
                      When we're available to help
                    </p>
                    <div className="text-foreground font-medium space-y-1">
                      <p>Mon - Fri: 9:00 AM - 7:00 PM</p>
                      <p>Sat - Sun: 10:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-linear-to-br from-card/50 via-secondary/20 to-accent/5 backdrop-blur-sm border border-border/50 rounded-3xl p-8 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-light text-foreground">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground">
                  Tell us about your jewelry needs and we'll get back to you
                  within 24 hours.
                </p>
              </div>

              <form className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:ring-offset-0 focus:border-ring transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:ring-offset-0 focus:border-ring transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-foreground"
                  >
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:ring-offset-0 focus:border-ring transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-foreground"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:ring-offset-0 focus:border-ring transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="custom-order">Custom Order</option>
                    <option value="shipping">Shipping & Returns</option>
                    <option value="care-instructions">Care Instructions</option>
                    <option value="wholesale">Wholesale Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:ring-offset-0 focus:border-ring transition-colors resize-none"
                    placeholder="Tell us about your jewelry needs, preferred styles, or any questions you may have..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl font-light text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quick answers to common questions about our crystal and pearl
              bracelets
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* FAQ Item 1 */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Are your crystals and pearls authentic?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes, we only source genuine, high-quality crystals and pearls.
                Each piece comes with authenticity verification and detailed
                information about its origin.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Do you offer custom sizing?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Absolutely! We provide custom sizing for all our bracelets at no
                additional charge. Simply let us know your wrist measurement
                during checkout.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                What's your return policy?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We offer a 30-day return policy for all items in original
                condition. Returns are free, and we'll provide a prepaid
                shipping label.
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                How should I care for my bracelet?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Each bracelet comes with detailed care instructions. Generally,
                avoid exposure to chemicals and store in a soft pouch when not
                wearing.
              </p>
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
                Ready to Find Your Perfect Piece?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our curated collection of crystal and pearl bracelets,
                each carefully selected for its beauty and positive energy.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5"
              >
                Browse Collection
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-3 border border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-accent/20 transform hover:-translate-y-0.5"
              >
                Learn Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactView;
