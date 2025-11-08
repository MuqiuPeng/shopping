import { SignIn as ClerkSignInForm } from "@clerk/nextjs";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In - Diamond Bracelet Collection",
  description:
    "Sign in to your account to access our exclusive diamond bracelet collection.",
};

export default function SignInViewPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-secondary/10 to-accent/5 flex items-center justify-center px-4 py-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/10 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 space-y-6">
          {/* Brand Logo/Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-linear-to-br from-primary/20 to-accent/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-accent/20">
                <div className="w-8 h-8 bg-linear-to-br from-primary to-accent rounded-full"></div>
              </div>
              <div className="absolute -inset-2 bg-linear-to-br from-accent/20 to-primary/20 rounded-full blur-xl opacity-50"></div>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="space-y-3">
            <h1 className="text-3xl font-light text-foreground tracking-wide">
              Welcome Back
            </h1>
            <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Sign in to access your exclusive diamond bracelet collection and
              manage your orders
            </p>
          </div>
        </div>

        {/* Sign In Form Container */}

        {/* Clerk Sign In Form */}
        <div className="flex justify-center">
          <ClerkSignInForm
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent border-0 shadow-none",
                headerTitle: "text-foreground font-light text-xl",
                headerSubtitle: "text-muted-foreground text-sm",
                socialButtonsBlockButton:
                  "bg-secondary border-border hover:bg-secondary/80 text-secondary-foreground",
                socialButtonsBlockButtonText:
                  "text-secondary-foreground font-medium",
                dividerLine: "bg-border",
                dividerText:
                  "text-muted-foreground text-xs uppercase tracking-wide",
                formFieldInput:
                  "bg-input border-border focus:ring-ring focus:ring-offset-0 focus:border-ring",
                formFieldLabel: "text-foreground font-medium",
                formButtonPrimary:
                  "bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary/20",
                footerActionLink: "text-accent hover:text-accent/80",
                identityPreviewText: "text-foreground",
                identityPreviewEditButton: "text-accent hover:text-accent/80",
              },
            }}
          />
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center space-y-4">
          <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
            <span>Don't have an account?</span>
            <Link
              href="/auth/sign-up"
              className="text-accent hover:text-accent/80 font-medium transition-colors duration-200"
            >
              Create one
            </Link>
          </div>

          <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
            <Link
              href="/contact"
              className="hover:text-foreground transition-colors duration-200"
            >
              Contact Support
            </Link>
            <span>•</span>
            <Link
              href="/about"
              className="hover:text-foreground transition-colors duration-200"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
