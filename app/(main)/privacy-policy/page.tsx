import { generatePageMetadata } from "@/lib/metadata";
import PrivacyPolicyPage from "./page.client";

export const metadata = generatePageMetadata.privacyPolicy();

export default function PrivacyPolicy() {
  return <PrivacyPolicyPage />;
}