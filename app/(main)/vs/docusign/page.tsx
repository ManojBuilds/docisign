import { generatePageMetadata } from "@/lib/metadata";
import VsDocusignPage from "./page.client";

export const metadata = generatePageMetadata.comparison('DocuSign');

export default function VsDocusign() {
  return <VsDocusignPage />;
}