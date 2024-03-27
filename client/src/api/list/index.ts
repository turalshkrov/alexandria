import http from "../api";

export const getListsByUser = async (id: string | undefined) => {
  if (id?.length !== 24) { throw new Error() }
  const response = await http.get(`/users/${id}/lists`);
  return response.data;
}