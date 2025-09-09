import { v } from "convex/values";
import { internalAction, internalMutation, mutation, query } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export const generateSignedPdf = internalAction({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const document = await ctx.runQuery(api.documents.getDocument, { documentId: args.documentId });
    if (!document) throw new Error("Document not found");

    const signatureFields = await ctx.runQuery(api.signatureFields.getDocumentSignatureFields, { documentId: args.documentId });
    if (!signatureFields) throw new Error("Signature fields not found");

    const pdfFile = await ctx.storage.get(document.fileStorageId);
    if (!pdfFile) throw new Error("PDF file not found");

    const pdfDoc = await PDFDocument.load(await pdfFile.arrayBuffer());
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const FONT_SIZE = 10; // Fixed font size for all text fields

    for (const field of signatureFields) {
      if (field.isCompleted && field.signatureData) {
        const page = pdfDoc.getPage(field.page - 1);
        const { height: pageHeight } = page.getSize();

        if (field.fieldType === 'signature' || field.fieldType === 'initial') {
          const signatureImage = await pdfDoc.embedPng(field.signatureData);
          page.drawImage(signatureImage, {
            x: field.x,
            y: pageHeight - field.y - field.height,
            width: field.width,
            height: field.height,
          });
        } else if (field.fieldType === 'text' || field.fieldType === 'date') {
          const textHeight = font.heightAtSize(FONT_SIZE);
          page.drawText(field.signatureData, {
            x: field.x + 3, // Small horizontal padding
            y: pageHeight - field.y - field.height + (field.height - textHeight) / 2,
            font,
            size: FONT_SIZE,
            color: rgb(0, 0, 0),
            maxWidth: field.width - 6, // Keep text within bounds
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
