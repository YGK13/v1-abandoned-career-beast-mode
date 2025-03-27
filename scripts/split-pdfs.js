
/**
 * This script is a guide for how to split PDFs using a tool like pdf-lib or pdf.js
 * It's meant to be run manually after installing the necessary dependencies
 * 
 * To use this approach:
 * 1. npm install pdf-lib fs-extra
 * 2. Place your master PDFs in the public/pdfs directory as volume-1-full.pdf, volume-2-full.pdf, etc.
 * 3. Run this script with Node.js
 * 
 * Note: This is a simplified example and may need adjustments based on your specific PDF structure
 */

const fs = require('fs-extra');
const { PDFDocument } = require('pdf-lib');

// This script assumes that your PDFs are already in public/pdfs directory
const INPUT_DIR = './public/pdfs';
const OUTPUT_DIR = './public/pdfs';

// Define chapter information based on page ranges (this should match your actual PDF structure)
const volumes = [
  {
    id: 1,
    file: 'volume-1-full.pdf',
    chapters: [
      { id: 1, title: 'four-conversations', startPage: 1, endPage: 10 },
      { id: 2, title: 'identity-design', startPage: 11, endPage: 20 },
      // Add more chapters as needed with their page ranges
    ]
  },
  // Add more volumes as needed
];

async function splitPDF(inputPath, outputPath, startPage, endPage) {
  try {
    const pdfBytes = await fs.readFile(inputPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    const newPdf = await PDFDocument.create();
    const pages = await newPdf.copyPages(pdfDoc, Array.from(
      { length: endPage - startPage + 1 }, 
      (_, i) => startPage - 1 + i
    ));
    
    pages.forEach(page => newPdf.addPage(page));
    
    const newPdfBytes = await newPdf.save();
    await fs.outputFile(outputPath, newPdfBytes);
    
    console.log(`Created: ${outputPath}`);
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
  }
}

async function main() {
  // Create output directory if it doesn't exist
  await fs.ensureDir(OUTPUT_DIR);
  
  // Process each volume
  for (const volume of volumes) {
    const inputFile = `${INPUT_DIR}/volume-${volume.id}-full.pdf`;
    
    // Check if the master PDF exists
    if (!await fs.pathExists(inputFile)) {
      console.error(`Master PDF not found: ${inputFile}`);
      continue;
    }
    
    // Process each chapter in the volume
    for (const chapter of volume.chapters) {
      const outputFile = `${OUTPUT_DIR}/volume-${volume.id}-chapter-${chapter.id}-${chapter.title}.pdf`;
      
      await splitPDF(
        inputFile,
        outputFile,
        chapter.startPage,
        chapter.endPage
      );
    }
  }
  
  console.log('PDF splitting complete!');
}

main().catch(console.error);
