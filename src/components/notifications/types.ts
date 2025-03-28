
// Notification types for our tips notification system
export type NotificationType = "career" | "skills" | "networking" | "mindset" | "productivity" | "onboarding";

export interface TipCategory {
  id: NotificationType;
  name: string;
  description: string;
  enabled: boolean;
}

export interface NotificationMethod {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface OnboardingSequence {
  enabled: boolean;
  daysRemaining: number;
  lastSent: string | null;
}
