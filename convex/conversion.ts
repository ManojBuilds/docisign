import { v } from "convex/values";
import { action } from "./_generated/server";

export const docToPdfConversion = action({
  args: {
    fileData: v.bytes(),
  },
  handler: async (ctx, args) => {
    const fileBlob = new Blob([args.fileData]);
    const conversionServiceUrl = process.env.CONVERSION_SERVICE_URL || 'http://localhost:3001';
    const formData = new FormData();
    formData.append('file', fileBlob, 'document');

    try {
      const convertResponse = await fetch(`${conversionServiceUrl}/api/convert/to-pdf`, {
        method: 'POST',
        body: formData,
      });

      if (!convertResponse.ok) {
        let errorMsg = 'Conversion service error';
        try {
          const errorData = await convertResponse.json();
          errorMsg = errorData.message || errorData.error || errorMsg;
        } catch (e) {
          // Fallback to status text
          errorMsg = convertResponse.statusText || errorMsg;
        }

        console.error('Conversion service error:', {
          status: convertResponse.status,
          statusText: convertResponse.statusText,
          error: errorMsg
        });

        throw new Error(`Conversion failed: ${errorMsg}`);
      }

      const pdfBuffer = await convertResponse.arrayBuffer();

      if (!pdfBuffer || pdfBuffer.byteLength === 0) {
        throw new Error('Conversion resulted in empty PDF');
      }

      const newStorageId = await ctx.storage.store(new Blob([pdfBuffer], { type: 'application/pdf' }));

      return {
        storageId: newStorageId,
        size: pdfBuffer.byteLength,
      };

    } catch (error) {
      console.error('Conversion error:', error);
      if (error instanceof Error) {
        if (error.message.includes('ECONNREFUSED')) {
          throw new Error('Conversion service unavailable. Please ensure the PDF conversion service is running.');
        }
        throw error;
      }
      throw new Error('Internal server error during conversion');
    }
  },
});