
import React from "react";
import DashboardCard from "./DashboardCard";
import { useDocumentCard } from "./document-card/useDocumentCard";
import DocumentCardHeader from "./document-card/DocumentCardHeader";
import DocumentDescription from "./document-card/DocumentDescription";
import DocumentCardActions from "./document-card/DocumentCardActions";
import DocumentCardPreview from "./document-card/DocumentCardPreview";

interface DocumentCardProps {
  id: string;
  title: string;
  type: string;
  date: string;
  fileSize?: string;
  thumbnailUrl?: string;
  description?: string | null;
  filePath?: string | null;
  onClick?: () => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  id,
  title,
  type,
  date,
  fileSize = "N/A",
  description,
  filePath,
  onClick
}) => {
  const {
    formattedDate,
    documentTypeLabel,
    isPreviewable,
    isDetailsOpen,
    setIsDetailsOpen,
    toggleDetails,
    isPreviewOpen,
    setIsPreviewOpen,
    previewUrl,
    handlePreview,
    handleDownload
  } = useDocumentCard({
    id,
    title, 
    type, 
    date, 
    filePath
  });
  
  return (
    <>
      <DashboardCard
        className="h-full transition-all hover:shadow-md"
        onClick={onClick}
      >
        <div className="flex flex-col h-full">
          <DocumentCardHeader
            title={title}
            documentTypeLabel={documentTypeLabel}
            formattedDate={formattedDate}
            description={description}
            fileSize={fileSize}
            toggleDetails={toggleDetails}
          />
          
          <DocumentDescription
            isOpen={isDetailsOpen}
            description={description}
          />
          
          <DocumentCardActions
            handlePreview={handlePreview}
            handleDownload={handleDownload}
            isPreviewable={isPreviewable}
            hasFilePath={!!filePath}
          />
        </div>
      </DashboardCard>
      
      <DocumentCardPreview
        isOpen={isPreviewOpen}
        setIsOpen={setIsPreviewOpen}
        previewUrl={previewUrl}
        title={title}
        documentTypeLabel={documentTypeLabel}
        date={date}
        handleDownload={handleDownload}
      />
    </>
  );
};

export default DocumentCard;
