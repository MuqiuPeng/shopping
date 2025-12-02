"use client";

import { Star, MessageCircle } from "lucide-react";
import { useState } from "react";

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

interface ProductMetadataProps {
  description?: string;
  reviews?: Review[];
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    date: "December 1, 2024",
    comment:
      "Absolutely stunning bracelet! The pearls are high quality and the craftsmanship is excellent. I wear it every day and receive so many compliments.",
    verified: true,
  },
  {
    id: 2,
    name: "Emily Chen",
    rating: 5,
    date: "November 28, 2024",
    comment:
      "Perfect gift for my mother. She loves it! The packaging was beautiful and the bracelet exceeded expectations.",
    verified: true,
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    rating: 4,
    date: "November 25, 2024",
    comment:
      "Beautiful bracelet, my wife loves it. The only reason for 4 stars instead of 5 is that it took a bit longer to arrive than expected.",
    verified: false,
  },
  {
    id: 4,
    name: "Jennifer Lee",
    rating: 5,
    date: "November 20, 2024",
    comment:
      "Elegant and timeless design. The quality is outstanding and it's very comfortable to wear all day long.",
    verified: true,
  },
];

const ProductMetadata = ({
  description = "No Description.",
  reviews = mockReviews,
}: ProductMetadataProps) => {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", name: "Description" },
    { id: "reviews", name: `Reviews (${reviews.length})` },
  ];

  return (
    <div className="mt-16">
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
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

      <div className="py-8">
        {activeTab === "description" && (
          <div
            className="prose prose-sm dark:prose-invert max-w-none text-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description ?? "" }}
          />
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-foreground">
                Customer Reviews
              </h3>
              <button className="flex items-center space-x-2 text-accent hover:text-accent/80 transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">Write a review</span>
              </button>
            </div>

            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-foreground">
                          {review.name}
                        </span>
                        {review.verified && (
                          <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "fill-accent text-accent"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {review.date}
                    </span>
                  </div>
                  <p className="text-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductMetadata;
