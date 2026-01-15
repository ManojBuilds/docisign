import Docxtemplater from "docxtemplater";
import Pizzip from "pizzip";

/**
 * Replace variables in a DOCX file with provided values
 * @param docxBuffer - ArrayBuffer of the DOCX file
 * @param variables - Key-value pairs to replace in the template
 * @returns ArrayBuffer of the processed DOCX file
 */
export async function replaceVariablesInDocx(
  docxBuffer: ArrayBuffer,
  variables: Record<string, string>
): Promise<ArrayBuffer> {
  try {
    // Load the DOCX file
    const zip = new Pizzip(docxBuffer);

    // Create a docxtemplater instance
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Replace variables in the format {variable_name}
    doc.render(variables);

    // Generate the modified DOCX
    const output = doc.getZip().generate({
      type: "arraybuffer",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    return output;
  } catch (error) {
    console.error("Error processing template:", error);
    throw new Error("Failed to process template with variables");
  }
}

/**
 * Preview template content by converting DOCX to HTML
 * @param docxBuffer - ArrayBuffer of the DOCX file
 * @returns HTML string preview
 */
// export async function previewDocxAsHtml(docxBuffer: ArrayBuffer): Promise<string> {
// This will be implemented if we add live preview
// For now, we'll skip the preview and just process directly
// return "";
// }
