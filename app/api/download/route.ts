
import { NextRequest, NextResponse } from "next/server";

/**
 * This route is public to allow signers to download their signed documents
 * via the link provided in their email without needing to authenticate.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const filename = searchParams.get("filename") || "document.pdf";

  if (!url) {
    return new NextResponse("URL is required", { status: 400 });
  }

  // Security check: Only allow proxying Convex storage URLs or local dev URLs
  const isAllowedHost =
    url.includes(".convex.cloud") ||
    url.includes("localhost") ||
    url.includes("127.0.0.1") ||
    url.startsWith("/"); // Allow relative URLs if any

  if (!isAllowedHost) {
    return new NextResponse("Invalid download URL", { status: 403 });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const blob = await response.blob();
    const headers = new Headers();

    // Force download by setting Content-Disposition
    headers.set("Content-Disposition", `attachment; filename="${filename}"`);
    headers.set("Content-Type", "application/pdf");

    return new NextResponse(blob, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Download proxy error:", error);
    return new NextResponse("Failed to download file", { status: 500 });
  }
}
