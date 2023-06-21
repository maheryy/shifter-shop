import { LoaderFunctionArgs } from "react-router-dom";

export interface Loader<T> {
  (args: LoaderFunctionArgs): Promise<T>;
}
