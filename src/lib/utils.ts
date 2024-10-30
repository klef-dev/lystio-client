import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createQueryString = (
  pathname: string,
  query: Record<string, unknown> = {}
) => {
  const keys = Object.keys(query);
  const queryParams = new URLSearchParams();
  keys.forEach((key) => {
    const value = query[key];

    if (typeof value === "string" && !value.trim()) {
      queryParams.delete(key);
    } else if (Array.isArray(value)) {
      queryParams.set(key, value.join(",").toLowerCase());
    } else if (`${value}`.trim()) {
      queryParams.set(key, value as string);
    }
  });
  return `${pathname}?${queryParams.toString()}`;
};
