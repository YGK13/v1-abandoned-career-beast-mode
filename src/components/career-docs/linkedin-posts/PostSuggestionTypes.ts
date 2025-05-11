
// Placeholder file after LinkedIn integration removal
// This file contains minimal type definitions to avoid build errors

export interface PostSuggestion {
  id: string;
  title: string;
  content: string;
}

export interface PostSuggestionResponse {
  suggestions: PostSuggestion[];
}
