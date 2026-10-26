export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(p: string): string {
  if (!p) return "";
  if (p.startsWith("http://") || p.startsWith("https://") || p.startsWith("data:")) {
    return p;
  }
  const cleanPath = p.startsWith("/") ? p : `/${p}`;
  return `${BASE_PATH}${cleanPath}`;
}
