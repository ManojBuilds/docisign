import { v } from "convex/values";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { api, internal } from "./_generated/api";
import { internalAction } from "./_generated/server";

export const generateSignedPdf = internalAction({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    console.log("Generating signed PDF for document:", args.documentId);
    const document = await ctx.runQuery(api.documents.getDocument, { documentId: args.documentId });
    if (!document) throw new Error("Document not found");

    const signatureFields = await ctx.runQuery(api.signatureFields.getDocumentSignatureFields, { documentId: args.documentId });
    if (!signatureFields) throw new Error("Signature fields not found");

    console.log(`Found ${signatureFields.length} signature fields for document ${args.documentId}`);
    const completedFields = signatureFields.filter((field: any) => field.isCompleted && field.signatureData);
    console.log(`Found ${completedFields.length} completed signature fields to embed`);

    const pdfFile = await ctx.storage.get(document.fileStorageId);
    if (!pdfFile) throw new Error("PDF file not found");

    const pdfDoc = await PDFDocument.load(await pdfFile.arrayBuffer());
    const timesItalicFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const SIGNATURE_FONT_SIZE = 12;

    for (const field of signatureFields) {
      if (field.isCompleted && field.signatureData) {
        const page = pdfDoc.getPage(field.page - 1);
        const { height: pageHeight } = page.getSize();

        const isDataUrl = field.signatureData.startsWith('data:');

        if (isDataUrl) {
          // Embed image (signature, initial, or uploaded image)
          try {
            const dataUrlParts = field.signatureData.split(',');
            if (dataUrlParts.length !== 2) continue;

            const base64Data = dataUrlParts[1];
            const imageBytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

            let signatureImage;
            if (field.signatureData.includes('image/png')) {
              signatureImage = await pdfDoc.embedPng(imageBytes);
            } else if (field.signatureData.includes('image/jpeg') || field.signatureData.includes('image/jpg')) {
              signatureImage = await pdfDoc.embedJpg(imageBytes);
            } else {
              console.warn("Unsupported image type in signature data");
              continue;
            }

            page.drawImage(signatureImage, {
              x: field.x,
              y: pageHeight - field.y - field.height,
              width: field.width,
              height: field.height,
            });
          } catch (err) {
            console.error("Failed to embed signature image:", err);
          }
        } else {
          const textHeight = timesItalicFont.heightAtSize(SIGNATURE_FONT_SIZE);

          page.drawText(field.signatureData, {
            x: field.x + 4, // Padding
            y: pageHeight - field.y - field.height + (field.height - textHeight) / 2 + 2,
            font: timesItalicFont,
            size: SIGNATURE_FONT_SIZE,
            color: rgb(0, 0, 0),
            maxWidth: field.width - 8,
          });
        }
      }
    }

    const pdfBytes = await pdfDoc.save();

    // Store the new signed PDF
    const newFileId = await ctx.storage.store(new Blob([pdfBytes as any], { type: "application/pdf" }));

    // Delete the old PDF file to prevent storage bloat
    const oldFileId = document.fileStorageId;
    await ctx.storage.delete(oldFileId);

    // Update the document to reference the new file
    await ctx.runMutation(internal.documents.updateDocumentFile, {
      documentId: args.documentId,
      fileStorageId: newFileId,
    });

    console.log("Signed PDF generated and stored with ID:", newFileId);
    console.log("Old PDF file deleted:", oldFileId);
  },
});
