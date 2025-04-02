
// LinkedIn utility types and functions

export type SSOProvider = "linkedin" | "google";

export const validateLinkedInState = (state: string | null, savedState: string | null): boolean => {
  if (!state || !savedState) return false;
  return state === savedState;
};
