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
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const FONT_SIZE = 8; // Smaller font size for audit information
    const SIGNATURE_FONT_SIZE = 10; // Font size for regular text fields

    for (const field of signatureFields) {
      if (field.isCompleted && field.signatureData) {
        const page = pdfDoc.getPage(field.page - 1);
        const { height: pageHeight } = page.getSize();

        if (field.fieldType === 'signature') {
          // Embed signature image
          const signatureImage = await pdfDoc.embedPng(field.signatureData);

          // Calculate the position for signature and audit information
          let signatureX = field.x;
          let signatureY = pageHeight - field.y - field.height;
          let signatureWidth = field.width;
          let signatureHeight = field.height;

          // If audit trail exists, we need to make room for both signature and audit info
          if (field.auditTrail) {
            // Calculate space needed for audit information (two lines of text)
            const textHeight = helveticaFont.heightAtSize(FONT_SIZE);
            const auditInfoHeight = textHeight * 2 + 2; // 2 lines of text with 2 units spacing
            const signatureAreaHeight = field.height - auditInfoHeight;

            // Draw the signature in the top portion of the field
            page.drawImage(signatureImage, {
              x: signatureX,
              y: signatureY + auditInfoHeight, // Move up to account for audit text below
              width: signatureWidth,
              height: signatureAreaHeight, // Reduced height to make space for audit info
            });

            // Add audit information below the signature (two separate lines)
            const line1Y = signatureY + textHeight + 2; // First line
            const line2Y = signatureY + 2; // Second line

            const dateText = `${new Date(field.auditTrail.signedAt).toLocaleString()}`;
            const ipText = `${field.auditTrail.ip}`;

            // Add the audit information text on separate lines
            page.drawText(dateText, {
              x: signatureX,
              y: line1Y,
              font: helveticaFont,
              size: FONT_SIZE,
              color: rgb(0.5, 0.5, 0.5), // Gray color for audit info
            });

            page.drawText(ipText, {
              x: signatureX,
              y: line2Y,
              font: helveticaFont,
              size: FONT_SIZE,
              color: rgb(0.5, 0.5, 0.5), // Gray color for audit info
            });
          } else {
            // If no audit info, just draw the signature as before
            page.drawImage(signatureImage, {
              x: signatureX,
              y: signatureY,
              width: signatureWidth,
              height: signatureHeight,
            });
          }
        } else if (field.fieldType === 'text' || field.fieldType === 'date' || field.fieldType === 'initial') {
          // For text fields, add in the audit info as well if available
          const textHeight = helveticaFont.heightAtSize(SIGNATURE_FONT_SIZE);
          page.drawText(field.signatureData, {
            x: field.x + 3, // Small horizontal padding
            y: pageHeight - field.y - field.height + (field.height - textHeight) / 2,
            font: helveticaFont,
            size: SIGNATURE_FONT_SIZE,
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
