import http from "../config/http";

const baseUrl = `https://servicodados.ibge.gov.br/api/v1/`;

export const getStateService = async () => {
  const result = await http.get(`${baseUrl}/localidades/estados`);
  return result.data;
};

export const getCitiesFromStateService = async (state) => {
  const result = await http.get(
    `${baseUrl}/localidades/estados/${state}/municipios`
  );
  return result.data;
};
