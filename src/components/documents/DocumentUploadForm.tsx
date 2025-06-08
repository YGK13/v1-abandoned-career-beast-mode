import React, { useState, ChangeEvent } from 'react';

interface DocumentUploadFormProps {
  onFileUpload: (file: File) => void;
}

const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
      setSelectedFile(null); // Reset after upload
      // Clear the file input visually if possible (might need a ref or key change)
      const fileInput = document.getElementById('file-upload-input') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    } else {
      alert('Please select a file first.');
    }
  };

  return (
    <div>
      <h3>Upload New Document</h3>
      <input type="file" id="file-upload-input" onChange={handleFileChange} />
      <button onClick={handleSubmit} style={{ marginLeft: '10px' }}>Upload</button>
    </div>
  );
};

export default DocumentUploadForm;
