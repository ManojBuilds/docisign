import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: documentId } = await params;

  return {
    title: "Edit Document - Add Signature Fields | Boopsign",
    description:
      "Add signature fields, text inputs, and checkboxes to your document. Prepare for electronic signing with drag-and-drop editor.",
    keywords: [
      "document editor",
      "signature fields",
      "pdf editor",
      "document preparation",
    ],
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `https://boopsign.com/d/${documentId}/edit`,
    },
  };
}

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
