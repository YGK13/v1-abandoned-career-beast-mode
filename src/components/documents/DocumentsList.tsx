import React from 'react';
import { Document } from '../../pages/DocumentManagementPage'; // Assuming Document interface is exported here
import DocumentCard from './DocumentCard';

interface DocumentsListProps {
  documents: Document[];
}

const DocumentsList: React.FC<DocumentsListProps> = ({ documents }) => {
  if (documents.length === 0) {
    return <p>No documents uploaded yet.</p>;
  }

  return (
    <div>
      <h2>Uploaded Documents</h2>
      {documents.map((doc) => (
        <DocumentCard key={doc.id} document={doc} />
      ))}
    </div>
  );
};

export default DocumentsList;
