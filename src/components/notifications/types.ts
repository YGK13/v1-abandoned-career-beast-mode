
// Notification types for our tips notification system
export type NotificationType = "career" | "skills" | "networking" | "mindset" | "productivity" | "onboarding";

export interface TipCategory {
  id: NotificationType;
  name: string;
  description: string;
  enabled: boolean;
  sampleTip?: SampleTip;
}

export interface SampleTip {
  title: string;
  content: string;
  icon: string;
}

export type TimePreference = "morning" | "afternoon" | "evening";

export interface NotificationMethod {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  timePreference: TimePreference;
}

export interface OnboardingSequence {
  enabled: boolean;
  daysRemaining: number;
  lastSent: string | null;
}
