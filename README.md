## Overview
PDF Archon is a complete browser-based PDF management tool. It allows users to edit, sign, merge, split, rotate, and compress PDF files directly from their browser without the need for server uploads. All operations run locally, ensuring data privacy, high speed, and smooth performance.

---

## Live Demo
Project is deployed and live at:  
https://pdf-osp.vercel.app

---

## Features

### 1. Edit PDF
- Add, edit, move, and resize text annotations on PDFs.  
- Double-click to edit text content, drag to reposition, or remove if needed.  
- Font size and positioning can be adjusted freely.

### 2. Add Media or Signatures
- Upload signatures or images using drag-and-drop functionality.  
- Resize, crop, and move media freely for better placement.  
- Image compression and scaling included for optimized performance.

### 3. Merge and Split PDFs
- Merge multiple PDFs into one consolidated document.  
- Split a large PDF into smaller parts quickly and efficiently.

### 4. Rotate Pages
- Rotate single or multiple PDF pages and instantly preview changes.

### 5. Compress PDFs
- Adjustable compression slider with real-time preview of estimated size.  
- Displays output size before download to ensure balanced quality and storage efficiency.

### 6. Security and Performance
- 100% client-side — no server interaction, ensuring complete privacy.  
- Uses **pdf-lib** and **react-pdf** for in-browser PDF rendering and editing.

### 7. Responsive and Optimized
- Built with TailwindCSS and Vite for a clean, fast, responsive UI.  
- Works perfectly on both desktop and mobile browsers.


---


## How It Works
- The app uses **pdf-lib** to manipulate PDFs entirely on the client side.
- **react-pdf** renders PDFs for preview.
- Annotations (text, images) are managed as state and drawn dynamically onto the document.
- The final edited PDF is generated in-memory and offered for download.
- The project is deployed via GitHub Pages using the `gh-pages` package.

---

## Future Enhancements
- [ ] AI-powered document summarization and auto form-filling.
- [ ] Smart signature detection and alignment.
- [ ] Integration with cloud storage platforms such as Google Drive or Dropbox.
- [ ] Undo/Redo functionality for editing actions.
- [ ] Enhanced mobile drag and touch event handling.

---

