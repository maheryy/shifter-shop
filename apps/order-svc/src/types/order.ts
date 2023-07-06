import { TOrder } from "@shifter-shop/dictionary";

export type TOrderCreationData = Omit<TOrder, "id" | "date">;
export type TOrderUpdateData = Pick<TOrder, "status">;
