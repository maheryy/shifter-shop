export const formatPrice = (price?: number) => {
  return price?.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
};

export const formatDisplayDate = (date?: string | Date) => {
  return date
    ? new Date(date).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;
};

export const formatDisplayShortDate = (date?: string | Date) => {
  return date
    ? new Date(date).toLocaleString("fr-FR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })
    : null;
};
