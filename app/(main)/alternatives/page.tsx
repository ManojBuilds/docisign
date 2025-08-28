import { generatePageMetadata } from "@/lib/metadata";
import AlternativePage from "./page.client";

export const metadata = generatePageMetadata.alternatives();

export default function Alternative() {
  return <AlternativePage />;
}