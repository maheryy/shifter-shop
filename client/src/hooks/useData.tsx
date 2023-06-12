import { useLoaderData } from "react-router-dom";

export function useData<T>() {
  return useLoaderData() as T;
}
