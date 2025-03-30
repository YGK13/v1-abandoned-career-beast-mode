
import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, FileText, Upload, Image, ChevronDown, Filter } from "lucide-react";

interface DocumentsHeaderProps {
  onUploadClick: () => void;
}

const DocumentsHeader: React.FC<DocumentsHeaderProps> = ({ onUploadClick }) => {
  return (
    <header className="mb-8">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold">Document Repository</h1>
          <p className="text-muted-foreground mt-1">Manage your career documents</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Filter size={16} />
            <span>Filter</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-1">
                <Plus size={16} />
                <span>Add Document</span>
                <ChevronDown size={14} className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem 
                className="flex gap-2 cursor-pointer"
                onClick={onUploadClick}
              >
                <Upload size={16} />
                <span>Upload File</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-2 cursor-pointer">
                <FileText size={16} />
                <span>Create Resume</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-2 cursor-pointer">
                <Image size={16} />
                <span>Capture Screenshot</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DocumentsHeader;
