
import { ReactElement } from "react";

export interface BookChapter {
  id: number;
  title: string;
  description: string;
  keyPoints: string[];
  pdfUrl: string;
}

export interface BookVolume {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  badgeColor: string;
  chapters: BookChapter[];
}
