
import React from "react";
import { Linkedin, Twitter, Globe, GithubIcon } from "lucide-react";

interface SourceLabelProps {
  source: string;
}

const SourceLabel: React.FC<SourceLabelProps> = ({ source }) => {
  // Function to render source icon
  const renderSourceIcon = () => {
    switch (source.toLowerCase()) {
      case 'linkedin':
        return <Linkedin size={14} className="text-[#0077B5]" />;
      case 'twitter':
        return <Twitter size={14} className="text-[#1DA1F2]" />;
      case 'github':
        return <GithubIcon size={14} className="text-[#333]" />;
      case 'executive network':
        return <Globe size={14} className="text-[#4A5568]" />;
      case 'angellist':
      case 'wellfound':
        return <Globe size={14} className="text-[#333]" />;
      case 'y combinator':
        return <Globe size={14} className="text-[#FF6600]" />;
      default:
        return <Globe size={14} className="text-muted-foreground" />;
    }
  };

  return (
    <div className="absolute top-3 right-3 z-10 flex items-center gap-1">
      {renderSourceIcon()}
      <span className="text-xs text-muted-foreground">{source}</span>
    </div>
  );
};

export default SourceLabel;
