
export interface PostSuggestion {
  id: string;
  content: string;
  type: 'industry' | 'trend' | 'opinion' | 'personal' | 'storytelling' | 'data';
  engagement: 'low' | 'medium' | 'high';
  bestTimeToPost: string;
  audienceInsight: string;
  expanded?: boolean;
}

export const getTypeLabel = (type: string): string => {
  switch(type) {
    case 'industry': return 'Industry News';
    case 'trend': return 'Trending Topic';
    case 'opinion': return 'Thought Leadership';
    case 'personal': return 'Personal Story';
    case 'storytelling': return 'Storytelling';
    case 'data': return 'Data-Driven';
    default: return type;
  }
};
