import { TOrder } from "@shifter-shop/types";

export type TOrderCreationData = Omit<TOrder, "id" | "date">;
export type TOrderUpdateData = Pick<TOrder, "status">;
