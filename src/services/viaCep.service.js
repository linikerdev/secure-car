import http from "../config/http";

const url = `https://viacep.com.br/ws/`;

export const getCepService = async (cep) => {
  const result = await http.get(`${url}${cep}/json`);
  return result.data;
};
