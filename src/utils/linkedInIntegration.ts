// This file has been refactored and replaced with individual files in src/utils/linkedin
// Keeping this file as a simpler re-export for existing imports that haven't been updated

export type SSOProvider = "google";

// Re-export the simulation function for compatibility
import { simulateImportProcess as _simulateImportProcess } from './linkedin/simulation';
export const simulateImportProcess = _simulateImportProcess;
