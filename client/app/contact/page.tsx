"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Calendar,
  Globe,
  Users,
  Award,
  Shield,
  Heart,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const contactMethods = [
  {
    icon: Phone,
    title: "Phone Support",
    primary: "+1 (555) 123-4567",
    secondary: "Toll-free: 1-800-PEARLS",
    description: "Speak with our jewelry experts",
    hours: "Mon-Fri 9AM-7PM PST",
  },
  {
    icon: Mail,
    title: "Email Support",
    primary: "support@pearlcrystal.com",
    secondary: "vip@pearlcrystal.com",
    description: "Get detailed assistance via email",
    hours: "Response within 24 hours",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    primary: "Available Now",
    secondary: "Average wait: 2 minutes",
    description: "Instant help from our team",
    hours: "Mon-Sun 8AM-11PM PST",
  },
  {
    icon: Calendar,
    title: "Virtual Consultation",
    primary: "Book an Appointment",
    secondary: "1-on-1 jewelry guidance",
    description: "Personal styling session",
    hours: "By appointment only",
  },
];

const locations = [
  {
    name: "San Francisco Flagship",
    address: "123 Union Square, San Francisco, CA 94108",
    phone: "+1 (415) 555-0123",
    hours: {
      weekdays: "10:00 AM - 8:00 PM",
      saturday: "10:00 AM - 9:00 PM",
      sunday: "11:00 AM - 6:00 PM",
    },
    services: ["Custom Design", "Repairs", "Appraisals", "VIP Lounge"],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
  },
  {
    name: "Beverly Hills Boutique",
    address: "456 Rodeo Drive, Beverly Hills, CA 90210",
    phone: "+1 (310) 555-0456",
    hours: {
      weekdays: "10:00 AM - 7:00 PM",
      saturday: "10:00 AM - 8:00 PM",
      sunday: "12:00 PM - 6:00 PM",
    },
    services: ["Luxury Collection", "Personal Shopping", "Private Events"],
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
  },
  {
    name: "New York Showroom",
    address: "789 5th Avenue, New York, NY 10022",
    phone: "+1 (212) 555-0789",
    hours: {
      weekdays: "9:00 AM - 8:00 PM",
      saturday: "10:00 AM - 9:00 PM",
      sunday: "11:00 AM - 7:00 PM",
    },
    services: ["Exclusive Pieces", "Corporate Gifts", "Bridal Consultation"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
  },
];

const faqs = [
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for all items in original condition. Custom pieces are final sale unless there's a manufacturing defect.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship worldwide to over 25 countries. Shipping costs and delivery times vary by location.",
  },
  {
    question: "How can I care for my pearl jewelry?",
    answer: "Pearls should be stored separately, cleaned with a soft cloth, and kept away from chemicals and perfumes. We provide care instructions with every purchase.",
  },
  {
    question: "Do you offer custom jewelry design?",
    answer: "Absolutely! Our master artisans can create custom pieces based on your specifications. Contact us to schedule a consultation.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and offer financing options for purchases over $500.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    type: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-2xl font-light text-foreground mb-4">
            Thank You!
          </h2>
          <p className="text-muted-foreground mb-8">
            Your message has been received. Our team will get back to you within 24 hours.
          </p>
          <div className="space-y-3">
            <Link
              href="/contact"
              className="block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Send Another Message
            </Link>
            <Link
              href="/"
              className="block text-accent hover:text-accent/80 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <h1 className="text-2xl font-light tracking-tight text-foreground">
              Contact Us
            </h1>
            <div className="w-20" />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight text-foreground mb-6">
            We're Here to
            <br />
            <span className="text-accent">Help You</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have questions about our jewelry? Need styling advice? Our expert team is ready to assist you with personalized service.
          </p>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-light tracking-tight text-foreground mb-4">
              Get in Touch
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the contact method that works best for you. Our dedicated team is here to provide exceptional support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <method.icon className="w-6 h-6 text-accent" />
                </div>
                <h4 className="text-lg font-medium text-foreground mb-2">
                  {method.title}
                </h4>
                <div className="space-y-1 mb-3">
                  <p className="text-accent font-medium">{method.primary}</p>
                  <p className="text-sm text-muted-foreground">{method.secondary}</p>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {method.description}
                </p>
                <p className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full inline-block">
                  {method.hours}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form & Info */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-2xl font-light tracking-tight text-foreground mb-6">
                Send us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-foreground mb-2">
                      Inquiry Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="support">Customer Support</option>
                      <option value="custom">Custom Design</option>
                      <option value="wholesale">Wholesale</option>
                      <option value="press">Press & Media</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief description of your inquiry"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please provide details about your inquiry..."
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Company Info */}
            <div className="space-y-8">
              <div className="bg-card border border-border rounded-xl p-8">
                <h3 className="text-xl font-medium text-foreground mb-6">
                  Business Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-accent mt-1 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Headquarters</p>
                      <p className="text-muted-foreground">123 Union Square, San Francisco, CA 94108</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-accent mt-1 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Business Hours</p>
                      <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 7:00 PM PST</p>
                      <p className="text-muted-foreground">Saturday - Sunday: 10:00 AM - 6:00 PM PST</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Globe className="w-5 h-5 text-accent mt-1 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Global Presence</p>
                      <p className="text-muted-foreground">Serving customers in 25+ countries worldwide</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-8">
                <h3 className="text-xl font-medium text-foreground mb-6">
                  Why Choose Pearl & Crystal?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-accent" />
                    <span className="text-foreground">10+ Years of Excellence</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-accent" />
                    <span className="text-foreground">Lifetime Quality Guarantee</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-accent" />
                    <span className="text-foreground">50,000+ Happy Customers</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Heart className="w-5 h-5 text-accent" />
                    <span className="text-foreground">Handcrafted with Love</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Store Locations */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-light tracking-tight text-foreground mb-4">
              Visit Our Stores
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience our jewelry in person at one of our beautiful locations. Each store offers personalized service and exclusive pieces.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <div key={index} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-medium text-foreground mb-2">
                    {location.name}
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{location.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-muted-foreground">{location.phone}</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Clock className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <div className="text-muted-foreground">
                        <p>Mon-Fri: {location.hours.weekdays}</p>
                        <p>Sat: {location.hours.saturday}</p>
                        <p>Sun: {location.hours.sunday}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-2">Services:</p>
                    <div className="flex flex-wrap gap-1">
                      {location.services.map((service, serviceIndex) => (
                        <span
                          key={serviceIndex}
                          className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-light tracking-tight text-foreground mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-muted-foreground">
              Quick answers to common questions. Can't find what you're looking for? Contact us directly.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="bg-card border border-border rounded-xl p-6 group"
              >
                <summary className="cursor-pointer font-medium text-foreground flex items-center justify-between">
                  {faq.question}
                  <span className="ml-4 shrink-0 transform group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Still have questions?
            </p>
            <Button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Contact Support Team
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}