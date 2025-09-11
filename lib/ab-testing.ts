// Utility functions for A/B testing
export type HeadlineVariation = "original" | "variationA" | "variationB";

/**
 * Randomly selects a headline variation for A/B testing
 * @returns A randomly selected headline variation
 */
export function getRandomHeadlineVariation(): HeadlineVariation {
  const variations: HeadlineVariation[] = ["original", "variationA", "variationB"];
  const randomIndex = Math.floor(Math.random() * variations.length);
  return variations[randomIndex];
}

/**
 * Gets a headline variation based on a user ID or session ID
 * This ensures the same user always sees the same variation
 * @param identifier - A unique identifier for the user/session
 * @returns A headline variation based on the identifier
 */
export function getHeadlineVariationByIdentifier(identifier: string): HeadlineVariation {
  const variations: HeadlineVariation[] = ["original", "variationA", "variationB"];
  // Simple hash function to convert string to number
  let hash = 0;
  for (let i = 0; i < identifier.length; i++) {
    const char = identifier.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  // Use modulo to select variation
  const index = Math.abs(hash) % variations.length;
  return variations[index];
}