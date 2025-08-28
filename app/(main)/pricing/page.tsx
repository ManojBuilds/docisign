import { generatePageMetadata } from "@/lib/metadata";
import PricingPage from "./page.client";

export const metadata = generatePageMetadata.pricing();

export default function Pricing() {
  return <PricingPage />;
}