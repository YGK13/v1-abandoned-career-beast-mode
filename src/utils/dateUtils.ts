
import { format, formatDistanceToNow } from "date-fns";

/**
 * Format a date string to a readable format
 */
export const formatDate = (dateString: string): string => {
  try {
    return format(new Date(dateString), "MMM d, yyyy");
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};

/**
 * Get a relative time string (e.g. "2 days ago")
 */
export const timeAgo = (dateString: string): string => {
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  } catch (error) {
    console.error("Error calculating time ago:", error);
    return "Unknown time";
  }
};

/**
 * Check if a date is in the future
 */
export const isFutureDate = (dateString: string): boolean => {
  try {
    return new Date(dateString) > new Date();
  } catch (error) {
    console.error("Error checking if date is in future:", error);
    return false;
  }
};
