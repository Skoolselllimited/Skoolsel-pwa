import { formatDistanceToNowStrict, parseISO } from 'date-fns';

/**
 * Converts UTC date to a user-friendly relative time string (e.g., "2 months ago").
 * @param publishedAt ISO string (e.g., "2024-12-22T01:01:34.031060Z")
 * @returns Formatted relative time string
 */
export function formatRelativeTime(publishedAt: string | null): string {
  if (!publishedAt) return 'Unknown';

  const date = parseISO(publishedAt); // Convert string to Date object
  return formatDistanceToNowStrict(date, { addSuffix: true });
}
