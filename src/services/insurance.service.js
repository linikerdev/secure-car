import { formCurrency, getPriceFromString } from "../util/helpers";
import { insuranceBasePercent, insuranceParcel } from "../config/insurance";

const getBaseCar = (price) => ({
  value: calcFromPrice(price, insuranceBasePercent),
  formated: formCurrency.format(calcFromPrice(price, insuranceBasePercent)),
});

export const calcFromPrice = (priceBase, percent) =>
  Math.round((priceBase * percent) / 10);

export const insuranceDetails = (quote) => {
  const { vehicle_price, types } = quote;
  const price = getPriceFromString(vehicle_price.Valor);

  const insurance = {
    base: getBaseCar(price),
    services: [],
    total: getBaseCar(price).value,
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

  const valorParcela = insurance.total / insuranceParcel;
  for (let i = 1; i <= insuranceParcel; i++) {
    insurance.parcelas[i] = {
      value: valorParcela,
      formated: formCurrency.format(valorParcela),
    };
  }
  insurance.total_formated = formCurrency.format(insurance.total);

  return insurance;
};
