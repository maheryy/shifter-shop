import { StorageKey } from "@/types/storage";

export const store = <T>(key: StorageKey, value: T) => {
  localStorage.setItem(
    key,
    typeof value === "string" ? value : JSON.stringify(value)
  );
};

export const retrieve = <T>(key: StorageKey): T | null => {
  const value = localStorage.getItem(key);
  if (!value) return null;

  try {
    return JSON.parse(value) as T;
  } catch (e) {
    return value as T;
  }
};

export const remove = (key: StorageKey) => localStorage.removeItem(key);
