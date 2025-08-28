import { generatePageMetadata } from "@/lib/metadata";
import HomePage from "./page.client";

export const metadata = generatePageMetadata.homepage();

export default function Home() {
  return <HomePage />;
}