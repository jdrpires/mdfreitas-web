export function isIndexable(
  environment: Record<string, string | undefined>,
): boolean {
  return (
    environment.VERCEL_ENV === "production" &&
    environment.SITE_INDEXABLE === "true"
  );
}
