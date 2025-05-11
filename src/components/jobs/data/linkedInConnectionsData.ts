
// Temporary mock data file to replace LinkedIn connections after LinkedIn integration removal
// This file provides empty placeholder data to avoid build errors

export interface LinkedInConnection {
  id: string;
  name: string;
  title: string;
  company: string;
  connectionStrength: "strong" | "medium" | "weak";
  imageUrl: string;
  email: string;
  linkedInUrl: string;
}

// Returns an empty array since LinkedIn integration was removed
export const getConnectionsForCompany = (company: string): LinkedInConnection[] => {
  console.log(`LinkedIn integration has been removed. No connections data available for ${company}`);
  return [];
};
