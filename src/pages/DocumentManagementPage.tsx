import React, { useState } from 'react';
import DocumentUploadForm from '../components/documents/DocumentUploadForm';
import DocumentsList from '../components/documents/DocumentsList';

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt: Date;
}

const DocumentManagementPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const handleFileUpload = (file: File) => {
    if (!file) return;

    const newDocument: Document = {
      id: Date.now().toString() + '-' + Math.random().toString(36).substring(2,9), // Simple unique ID
      name: file.name,
      type: file.type,
      uploadedAt: new Date(),
    };
    setDocuments((prevDocuments) => [...prevDocuments, newDocument]);
    console.log('File uploaded (mock):', newDocument);
  };

  return (
    <div>
      <h1>My Documents</h1>
      <DocumentUploadForm onFileUpload={handleFileUpload} />
      <DocumentsList documents={documents} />
    </div>
  );
};

export default DocumentManagementPage;
