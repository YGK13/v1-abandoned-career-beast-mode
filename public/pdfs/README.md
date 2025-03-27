
# PDF Files for Life Design Books

This directory contains the PDF files for the Life Design book series.

## Directory Structure

- Master volume PDFs should be named `volume-1-full.pdf`, `volume-2-full.pdf`, etc.
- Individual chapter PDFs should follow the naming pattern: `volume-1-chapter-1-four-conversations.pdf`

## How to Split PDFs

You can use various tools to split the master PDFs into individual chapter PDFs:

1. **Using Adobe Acrobat Pro**:
   - Open the master PDF
   - Go to Tools > Organize Pages
   - Use the "Split" tool to divide by page ranges for each chapter

2. **Using Online Tools**:
   - Services like SmallPDF, iLovePDF, or PDF2Go offer PDF splitting functionality
   - Upload your master PDF and specify page ranges for each chapter

3. **Using the provided script**:
   - See the `scripts/split-pdfs.js` file for a Node.js approach
   - You'll need to install dependencies: `npm install pdf-lib fs-extra`
   - Update the page ranges in the script to match your PDF structure

## Important Note

Once you've split the PDFs, make sure the filenames match the patterns referenced in the code:
- For master volumes: `/pdfs/volume-1-full.pdf`
- For chapters: `/pdfs/volume-1-chapter-1-four-conversations.pdf`

If your actual filenames differ, update the references in `src/components/lifedesign/book/data.ts`.
