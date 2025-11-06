"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Heart,
  Award,
  Users,
  Gem,
  ShieldCheck,
  Star,
  Clock,
  Globe,
  ChevronRight,
  Play,
  Quote,
} from "lucide-react";
import Link from "next/link";

const milestones = [
  {
    year: "2015",
    title: "Foundation",
    description: "Pearl & Crystal was founded with a vision to make exquisite jewelry accessible to everyone.",
  },
  {
    year: "2017",
    title: "Global Expansion",
    description: "Expanded to international markets, serving customers across 25 countries.",
  },
  {
    year: "2019",
    title: "Sustainable Sourcing",
    description: "Implemented ethical sourcing practices and partnered with certified pearl farms.",
  },
  {
    year: "2021",
    title: "Artisan Collective",
    description: "Launched our artisan collective program, supporting traditional jewelry makers.",
  },
  {
    year: "2023",
    title: "Innovation Lab",
    description: "Opened our innovation lab for developing new techniques in pearl and crystal crafting.",
  },
  {
    year: "2024",
    title: "Digital Excellence",
    description: "Launched our enhanced digital platform for personalized jewelry experiences.",
  },
];

const values = [
  {
    icon: Gem,
    title: "Authenticity",
    description: "Every piece is crafted with genuine pearls and crystals, sourced from the finest locations worldwide.",
  },
  {
    icon: Heart,
    title: "Craftsmanship",
    description: "Our master artisans bring decades of experience to create timeless pieces that last generations.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description: "Each piece undergoes rigorous quality checks to ensure it meets our exceptional standards.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Your satisfaction is our priority. We're committed to providing exceptional service and support.",
  },
  {
    icon: Globe,
    title: "Sustainability",
    description: "We're dedicated to responsible sourcing and supporting local communities worldwide.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Recognized globally for our innovative designs and commitment to jewelry excellence.",
  },
];

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b15b?w=300&h=300&fit=crop&crop=face",
    quote: "Every piece tells a story, and I want that story to be one of beauty, elegance, and timeless craftsmanship.",
  },
  {
    name: "Master Li Wei",
    role: "Chief Artisan",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    quote: "With 30 years of experience, I believe in preserving traditional techniques while embracing innovation.",
  },
  {
    name: "Emma Rodriguez",
    role: "Head of Quality",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    quote: "Quality is not just about perfection, it's about creating pieces that bring joy for a lifetime.",
  },
];

const stats = [
  { number: "50,000+", label: "Happy Customers" },
  { number: "25", label: "Countries Served" },
  { number: "10+", label: "Years of Excellence" },
  { number: "100%", label: "Authentic Materials" },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("story");

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
              About Pearl & Crystal
            </h1>
            <div className="w-20" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
          <div className="absolute top-40 right-20 w-16 h-16 bg-secondary/20 rounded-full blur-xl" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight text-foreground mb-6">
            Crafting Beauty,
            <br />
            <span className="text-accent">Creating Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            For over a decade, Pearl & Crystal has been dedicated to creating exquisite jewelry that celebrates life's most precious moments.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-light text-accent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: "story", name: "Our Story" },
              { id: "values", name: "Our Values" },
              { id: "team", name: "Our Team" },
              { id: "timeline", name: "Timeline" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {activeTab === "story" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-light tracking-tight text-foreground">
                  The Pearl & Crystal Legacy
                </h3>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    Our journey began in 2015 with a simple yet profound vision: to create jewelry that not only adorns but also tells a story. Founded by Sarah Chen, a passionate jewelry designer with a deep appreciation for traditional craftsmanship, Pearl & Crystal was born from the desire to bridge ancient artisanal techniques with contemporary design aesthetics.
                  </p>
                  <p>
                    What started as a small studio in San Francisco has grown into a globally recognized brand, yet we've never lost sight of our core mission - creating authentic, beautiful jewelry that celebrates the unique beauty of pearls and crystals. Each piece in our collection is a testament to the skilled artisans who craft them and the natural wonders that inspire them.
                  </p>
                  <p>
                    Today, Pearl & Crystal serves customers in over 25 countries, but our commitment remains unchanged: to create jewelry that becomes a cherished part of your personal story, passed down through generations as a symbol of beauty, quality, and timeless elegance.
                  </p>
                </div>
                <div className="flex items-center space-x-4 pt-4">
                  <button className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                    <Play className="w-4 h-4" />
                    <span>Watch Our Story</span>
                  </button>
                  <Link
                    href="/contact"
                    className="flex items-center space-x-2 text-accent hover:text-accent/80 transition-colors"
                  >
                    <span>Visit Our Studio</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
                  <img
                    src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop"
                    alt="Jewelry crafting process"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-xl p-4 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground text-sm">Certified Excellence</div>
                      <div className="text-xs text-muted-foreground">Global Quality Standards</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "values" && (
            <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto">
                <h3 className="text-3xl font-light tracking-tight text-foreground mb-4">
                  Our Core Values
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  These principles guide everything we do, from sourcing materials to crafting each piece, ensuring that every customer receives jewelry of exceptional quality and beauty.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h4 className="text-lg font-medium text-foreground mb-3">
                      {value.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "team" && (
            <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto">
                <h3 className="text-3xl font-light tracking-tight text-foreground mb-4">
                  Meet Our Team
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Behind every beautiful piece is a team of passionate individuals dedicated to excellence, craftsmanship, and creating jewelry that brings joy to your life.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="relative mb-6">
                      <div className="aspect-square w-48 mx-auto rounded-2xl overflow-hidden bg-secondary">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-full p-2 shadow-lg">
                        <Quote className="w-4 h-4 text-accent" />
                      </div>
                    </div>
                    <h4 className="text-xl font-medium text-foreground mb-1">
                      {member.name}
                    </h4>
                    <p className="text-accent text-sm mb-4">{member.role}</p>
                    <blockquote className="text-muted-foreground leading-relaxed italic">
                      "{member.quote}"
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "timeline" && (
            <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto">
                <h3 className="text-3xl font-light tracking-tight text-foreground mb-4">
                  Our Journey
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  From a small studio to a global brand, discover the key milestones that have shaped Pearl & Crystal into what it is today.
                </p>
              </div>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-px" />
                
                <div className="space-y-12">
                  {milestones.map((milestone, index) => (
                    <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      {/* Timeline dot */}
                      <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-accent rounded-full transform -translate-x-1.5 md:-translate-x-1.5 border-4 border-background shadow-lg" />
                      
                      {/* Content */}
                      <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                              {milestone.year}
                            </div>
                            <Clock className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <h4 className="text-lg font-medium text-foreground mb-2">
                            {milestone.title}
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-light tracking-tight text-foreground mb-6">
            Ready to Start Your Story?
          </h3>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Discover our exquisite collection and find the perfect piece that speaks to your unique style and personality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore Collection
            </Link>
            <Link
              href="/contact"
              className="border border-input px-8 py-3 rounded-lg font-medium hover:bg-secondary transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}