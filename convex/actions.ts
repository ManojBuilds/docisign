import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export const generateSignedPdf = internalAction({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    console.log("Generating signed PDF for document:", args.documentId);
    const document = await ctx.runQuery(api.documents.getDocument, { documentId: args.documentId });
    if (!document) throw new Error("Document not found");

    const signatureFields = await ctx.runQuery(api.signatureFields.getDocumentSignatureFields, { documentId: args.documentId });
    if (!signatureFields) throw new Error("Signature fields not found");

    console.log(`Found ${signatureFields.length} signature fields for document ${args.documentId}`);
    const completedFields = signatureFields.filter(field => field.isCompleted && field.signatureData);
    console.log(`Found ${completedFields.length} completed signature fields to embed`);

    const pdfFile = await ctx.storage.get(document.fileStorageId);
    if (!pdfFile) throw new Error("PDF file not found");

    const pdfDoc = await PDFDocument.load(await pdfFile.arrayBuffer());
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const SIGNATURE_FONT_SIZE = 12; // Increased size for better readability

    for (const field of signatureFields) {
      if (field.isCompleted && field.signatureData) {
        const page = pdfDoc.getPage(field.page - 1);
        const { height: pageHeight } = page.getSize();

        const isImage = field.signatureData.startsWith('data:image/');

        if (isImage) {
          // Embed image (signature, initial, or uploaded image)
          let signatureImage;
          if (field.signatureData.includes('image/png')) {
            signatureImage = await pdfDoc.embedPng(field.signatureData);
          } else {
            signatureImage = await pdfDoc.embedJpg(field.signatureData);
          }

          page.drawImage(signatureImage, {
            x: field.x,
            y: pageHeight - field.y - field.height,
            width: field.width,
            height: field.height,
          });
        } else {
          // For regular text content (date, text fields)
          const textHeight = helveticaFont.heightAtSize(SIGNATURE_FONT_SIZE);
          page.drawText(field.signatureData, {
            x: field.x + 4, // Padding
            y: pageHeight - field.y - field.height + (field.height - textHeight) / 2 + 2,
            font: helveticaFont,
            size: SIGNATURE_FONT_SIZE,
            color: rgb(0, 0, 0),
            maxWidth: field.width - 8,
          });
        }
      }
    }

    const pdfBytes = await pdfDoc.save();
    // @ts-expect-error fix it later
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const newFileId = await ctx.storage.store(blob);

    await ctx.runMutation(internal.documents.updateDocumentFile, {
      documentId: args.documentId,
      fileStorageId: newFileId,
    });
  },
});
