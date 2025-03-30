
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { DocumentUpload } from "@/services/documentService";

interface DocumentUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (documentData: DocumentUpload) => Promise<void>;
  isUploading: boolean;
}

const DocumentUploadDialog: React.FC<DocumentUploadDialogProps> = ({
  isOpen,
  onClose,
  onUpload,
  isUploading
}) => {
  const [docTitle, setDocTitle] = useState("");
  const [docType, setDocType] = useState("resume");
  const [docDescription, setDocDescription] = useState("");
  const [docFile, setDocFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!docTitle || !docType || !docFile) {
      return;
    }
    
    await onUpload({
      title: docTitle,
      description: docDescription,
      doc_type: docType,
      file: docFile,
    });
    
    // Reset form after successful upload
    setDocTitle("");
    setDocType("resume");
    setDocDescription("");
    setDocFile(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>
            Upload a document to your secure storage
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="required">Document Title</Label>
              <Input
                id="title"
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                placeholder="Resume 2023"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="docType" className="required">Document Type</Label>
              <Select value={docType} onValueChange={setDocType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="resume">Resume</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="certificate">Certificate</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={docDescription}
                onChange={(e) => setDocDescription(e.target.value)}
                placeholder="Brief description of this document"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="file" className="required">File</Label>
              <div className="border border-input rounded-md p-4">
                <Input
                  id="file"
                  type="file"
                  onChange={(e) => setDocFile(e.target.files?.[0] || null)}
                  className="cursor-pointer"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  required
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Supported formats: PDF, DOCX, JPG, PNG
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Uploading...
                </>
              ) : "Upload Document"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentUploadDialog;
