import { formCurrency, getPriceFromString } from "../util/helpers";

export const calcFromPrice = (priceBase, percent) =>
  Math.round((priceBase * percent) / 10);

export const insuranceDetails = (quote) => {
  const parcelas = 9;
  const { vehicle_price, types } = quote;
  const price = getPriceFromString(vehicle_price.Valor);

  const insurance = {
    base: {
      value: calcFromPrice(price, 0.2),
      formated: formCurrency.format(calcFromPrice(price, 0.2)),
    },
    services: [],
    total: calcFromPrice(price, 0.5),
    parcelas: {},
  };

  for (let i = 0; i < types.length; i++) {
    const quotaFromTypeService = calcFromPrice(price, types[i].value);
    insurance.services.push({
      ...types[i],
      price: quotaFromTypeService,
      price_formated: formCurrency.format(quotaFromTypeService),
    });
    insurance.total += quotaFromTypeService;
  }

  const valorParcela = insurance.total / parcelas;
  for (let i = 1; i <= parcelas; i++) {
    insurance.parcelas[i] = {
      value: valorParcela,
      formated: formCurrency.format(valorParcela),
    };
  }
  insurance.total_formated = formCurrency.format(insurance.total);

  return insurance;
};
