// src/pages/PdfToImage.jsx

import React, { useState, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import { saveAs } from 'file-saver';
import { Upload, FileText, Loader2, Download, Image, AlertCircle, ChevronDown } from 'lucide-react';

// PDF worker path সেট করুন
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// কনভারশন অপশনসমূহ (শুধু JPEG এবং PNG)
const IMAGE_FORMATS = [
    { label: 'JPEG (.jpg)', mime: 'image/jpeg', extension: 'jpg' },
    { label: 'PNG (.png)', mime: 'image/png', extension: 'png' },
];

export default function PdfToImage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);
    const [error, setError] = useState(null);
    // ডিফল্ট ফরম্যাট JPEG সেট করা হলো
    const [outputFormat, setOutputFormat] = useState(IMAGE_FORMATS[0]); 
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
            setError(null);
        } else {
            setSelectedFile(null);
            setError('Please select a valid PDF file.');
        }
    };

    const convertPdfToImages = async () => {
        if (!selectedFile) {
            setError('Please select a PDF file first.');
            return;
        }

        setIsProcessing(true);
        setError(null);
        setImageUrls([]); 

        try {
            const fileReader = new FileReader();
            fileReader.onload = async () => {
                const typedArray = new Uint8Array(fileReader.result);
                const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
                const newImageUrls = [];
                
                // কনভারশন ফাংশন
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    // স্কেল 2.0 এ সেট করা হলো (উচ্চ রেজোলিউশনের জন্য)
                    const viewport = page.getViewport({ scale: 2.0 }); 

                    const canvas = document.createElement('canvas');
                    const canvasContext = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    
                    // PNG এর ক্ষেত্রে স্বচ্ছতা বজায় রাখতে, JPEG এর জন্য ব্যাকগ্রাউন্ড সাদা 
                    if (outputFormat.mime === 'image/jpeg') {
                        canvasContext.fillStyle = '#FFFFFF';
                        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
                    }

                    await page.render({ canvasContext, viewport }).promise;

                    // নির্বাচিত ফরম্যাটে ডাটা URL তৈরি করুন
                    const quality = outputFormat.mime === 'image/jpeg' ? 0.9 : 1.0;
                    const imageUrl = canvas.toDataURL(outputFormat.mime, quality);
                    
                    newImageUrls.push({ 
                        url: imageUrl, 
                        name: `${selectedFile.name.replace('.pdf', '')}_page_${i}.${outputFormat.extension}` 
                    });
                }

                setImageUrls(newImageUrls);
                setIsProcessing(false);
            };
            fileReader.readAsArrayBuffer(selectedFile);

        } catch (err) {
            console.error("Conversion Error:", err);
            setError('An error occurred during conversion.');
            setIsProcessing(false);
        }
    };
    
    // সমস্ত ইমেজ একবারে ডাউনলোড করার ফাংশন
    const downloadAllImages = () => {
        imageUrls.forEach(img => {
            fetch(img.url)
                .then(res => res.blob())
                .then(blob => saveAs(blob, img.name));
        });
    };

    return (
        <div className="pdf-tool-container">
            <h2 className="tool-title">PDF to Image Converter</h2>
            <p className="tool-subtitle">
                Convert your PDF file into high-quality images: JPG, PNG.
            </p>

            <div className="upload-area" onClick={() => fileInputRef.current.click()}>
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                />
                <Upload size={48} className="upload-icon" />
                {selectedFile ? (
                    <p className="file-name">
                        <FileText size={16} style={{marginRight: '5px'}}/>
                        {selectedFile.name}
                    </p>
                ) : (
                    <p className="upload-text">Drag & drop a PDF here, or click to select file</p>
                )}
            </div>

            {error && (
                <div className="alert-message error">
                    <AlertCircle size={20} />
                    {error}
                </div>
            )}
            
            <div className="conversion-controls">
                <div className="select-format-group">
                    <label>Output Format:</label>
                    <div className="custom-select-wrapper">
                        <select 
                            value={outputFormat.extension} 
                            onChange={(e) => setOutputFormat(IMAGE_FORMATS.find(f => f.extension === e.target.value))}
                            className="custom-select"
                        >
                            {IMAGE_FORMATS.map(format => (
                                <option key={format.extension} value={format.extension}>
                                    {format.label}
                                </option>
                            ))}
                        </select>
                        <ChevronDown size={16} className="select-arrow"/>
                    </div>
                </div>

                <button 
                    className="action-button primary" 
                    onClick={convertPdfToImages}
                    disabled={!selectedFile || isProcessing}
                >
                    {isProcessing ? (
                        <>
                            <Loader2 size={20} className="spinner" />
                            Converting...
                        </>
                    ) : (
                        <>
                            <Image size={20} />
                            Convert to {outputFormat.extension.toUpperCase()}
                        </>
                    )}
                </button>
            </div>

            {imageUrls.length > 0 && (
                <div className="result-section">
                    <h3>Conversion Complete!</h3>
                    <p>{imageUrls.length} page(s) converted to {outputFormat.extension.toUpperCase()}.</p>
                    <button className="action-button secondary" onClick={downloadAllImages}>
                        <Download size={20} />
                        Download All ({outputFormat.extension.toUpperCase()})
                    </button>
                    
                    <div className="image-preview-grid">
                        {imageUrls.map((img, index) => (
                            <div key={index} className="image-preview-item">
                                <img src={img.url} alt={img.name} />
                                <button className="download-single-btn" onClick={() => saveAs(img.url, img.name)}>
                                    Download Page {index + 1}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
