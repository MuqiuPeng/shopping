import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
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
            Dashboard
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
