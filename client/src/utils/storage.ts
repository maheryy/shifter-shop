import { StorageKey } from "../types/storage";

export const store = <T>(key: StorageKey, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const retrieve = <T>(key: StorageKey): T | null => {
  const value = localStorage.getItem(key);
  return value ? (JSON.parse(value) as T) : null;
};

export const remove = (key: StorageKey) => localStorage.removeItem(key);
export const clearStorage = () => localStorage.clear();
