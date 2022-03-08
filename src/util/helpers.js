export const getPriceFromString = (price) =>
  parseInt(price.replace(/[^\d,]+/g, ""));

export const formCurrency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});


