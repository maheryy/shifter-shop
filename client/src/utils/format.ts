export const formatPrice = (price: number) => {
  return price.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
};
