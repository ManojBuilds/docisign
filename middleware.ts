import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/d/(.*)",
  "/account/billing",
  "/callback",
  "/success",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Protect dashboard and documents
    "/dashboard(.*)",
    "/d/(.*)",
    // Auth routes
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/callback(.*)",
    "/success(.*)",
    // Account and billing
    "/account(.*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
