import { generatePageMetadata } from "@/lib/metadata";
import PrivacyPolicyPage from "./page.client";

export const metadata = generatePageMetadata.privacyPolicy();

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Privacy Policy</h1>
      <p>This is a placeholder for the privacy policy.</p>
    </div>
  );
}
