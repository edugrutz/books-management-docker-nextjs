import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr?: string) {
  if (!dateStr) return "";

  // Try to parse the date. Handling UTC to avoid timezone shifts for simple dates.
  const date = new Date(dateStr + "T12:00:00Z");
  if (isNaN(date.getTime())) return dateStr;

  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  });
}
