import http from "../config/http";

const baseUrl = `https://parallelum.com.br/fipe/api/v1`;

export const getFipeMarcasService = async () => {
  const result = await http.get(`${baseUrl}/carros/marcas`);
  return result.data;
};
export const getFipeModeloService = async (marcaId) => {
  const result = await http.get(`${baseUrl}/carros/marcas/${marcaId}/modelos`);
  return result.data;
};
export const getFipeAnoService = async (marcaId, modeloId) => {
  const result = await http.get(
    `${baseUrl}/carros/marcas/${marcaId}/modelos/${modeloId}/anos`
  );
  return result.data;
};
export const getFipeValorService = async (marcaId, modeloId, anoId) => {
  const result = await http.get(
    `${baseUrl}/carros/marcas/${marcaId}/modelos/${modeloId}/anos/${anoId}`
  );
  return result.data;
};
