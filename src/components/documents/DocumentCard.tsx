import React from 'react';
import { Document } from '../../pages/DocumentManagementPage'; // Assuming Document interface is exported here

interface DocumentCardProps {
  document: Document;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <h4>{document.name}</h4>
      <p>Type: {document.type || 'N/A'}</p>
      <p>Uploaded: {document.uploadedAt.toLocaleDateString()}</p>
      <button onClick={() => alert('View action for: ' + document.name)}>View</button>
      <button onClick={() => alert('Delete action for: ' + document.name)} style={{ marginLeft: '5px' }}>Delete</button>
    </div>
  );
};

export default DocumentCard;
