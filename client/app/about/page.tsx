import AboutView from "@/feature/about/view/about-view";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us - Crystal & Pearl Bracelet Collection",
  description:
    "Discover our 30+ year legacy of crafting exquisite crystal and pearl bracelets. Learn about our commitment to quality, craftsmanship, and timeless elegance.",
};

export default function AboutPage() {
  return <AboutView />;
}
