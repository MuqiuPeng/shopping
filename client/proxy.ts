import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

const isProtectedRoute = createRouteMatcher([
  // User Account & Profile
  "/dashboard(.*)", // User dashboard - personal account management

  // Purchase & Payment Flow
  "/checkout(.*)", // Checkout process - requires authentication before payment
  "/orders(.*)", // Order history and tracking
  "/cart/checkout", // Cart checkout (if separate from /checkout)

  // User Data & Preferences
  "/profile(.*)", // User profile settings
  "/account(.*)", // Account settings and preferences
  "/wishlist(.*)", // Saved items/wishlist
  "/addresses(.*)", // Saved shipping addresses
  "/payment-methods(.*)", // Saved payment methods

  // Customer Service (Authenticated)
  "/returns(.*)", // Return/refund requests
  "/reviews/write(.*)", // Writing product reviews
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  if (isProtectedRoute(req)) await auth.protect();
});
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
