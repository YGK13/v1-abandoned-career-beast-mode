import React from "react";

export const getProviderConfig = (provider: string) => {
  // This is a placeholder that will be rebuilt later
  return {
    icon: null,
    label: provider,
    className: "bg-primary hover:bg-primary/90 text-white"
  };
};

export const getSupabaseProvider = (provider: string): string => {
  // Placeholder function
  return provider;
};
