
// LinkedIn integration types
export type SSOProvider = "google" | "linkedin";

// LinkedIn profile interface
export interface LinkedInProfile {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  profileUrl: string;
  accessToken?: string;
  refreshToken?: string | null;
  expiresIn?: number;
  tokenType?: string;
}
