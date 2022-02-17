import http from "../config/http";

const baseUrl = `https://parallelum.com.br/fipe/api/v1`;

export const getBrandService = async () => {
  const result = await http.get(`${baseUrl}/carros/marcas`);
  return result.data;
};

export const getModelsService = async (brand) => {
  const result = await http.get(`${baseUrl}/carros/marcas/${brand}/modelos`);
  return result.data;
};

export const getVersionService = async (brand, model) => {
  const result = await http.get(
    `${baseUrl}/carros/marcas/${brand}/modelos/${model}/anos`
  );
  return result.data;
};

export const getPricesService = async (brand, model, version) => {
  const result = await http.get(
    `${baseUrl}/carros/marcas/${brand}/modelos/${model}/anos/${version}`
  );
  return result.data;
};
