
import React from "react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

interface DocumentDescriptionProps {
  isOpen: boolean;
  description: string | null;
}

const DocumentDescription: React.FC<DocumentDescriptionProps> = ({ 
  isOpen, 
  description 
}) => {
  return (
    <Collapsible open={isOpen} className="mb-3">
      <CollapsibleContent className="text-sm text-muted-foreground pt-2 pb-1">
        {description ? (
          <p className="line-clamp-3">{description}</p>
        ) : (
          <p className="italic">No description provided</p>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default DocumentDescription;
