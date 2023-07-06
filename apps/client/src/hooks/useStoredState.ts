import { useLocalStorage } from "usehooks-ts";
import { StorageKey } from "@/types/storage";

function useStoredState<T>(key: StorageKey, initialValue: T) {
  return useLocalStorage(key, initialValue);
}

export default useStoredState;
