import type { StorageKey } from "@/types/storage";

export function setToLocalStorage(
  key: StorageKey,
  value: NonNullable<unknown>,
): void {
  try {
    const serializedValue = JSON.stringify(value);

    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting item ${key} in localStorage.`, error);
  }
}

export function getFromLocalStorage<T>(key: StorageKey): T | null {
  try {
    const serializedValue = localStorage.getItem(key);

    if (!serializedValue) {
      return null;
    }

    return JSON.parse(serializedValue);
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage.`, error);

    return null;
  }
}

export function removeFromLocalStorage(key: StorageKey): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item ${key} from localStorage.`, error);
  }
}

export function clearLocalStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage.", error);
  }
}
