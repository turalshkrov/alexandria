import http from "../api"

export const getSeriesById = async (id: string) => {
  const response = await http.get(`/series/${id}`);
  return response.data;
}