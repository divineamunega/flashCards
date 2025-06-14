import { extractText, getDocumentProxy } from "unpdf";

export const readFile = async (buffer) => {
    // Then, load the PDF file into a PDF.js docconsument
    const pdf = await getDocumentProxy(new Uint8Array(buffer));

    // Finally, extract the text from the PDF file
    const { totalPages, text } = await extractText(pdf, { mergePages: true });

    console.log(`Total pages: ${totalPages}`);
    console.log(text);
    return text;
};
