import http from "../api";

export const getListsByUser = async (id: string | undefined) => {
  if (id?.length !== 24) { throw new Error() }
  const response = await http.get(`/users/${id}/lists`);
  return response.data;
}

export const getLists = async (serachKey: string, page: number) => {
  const response = await http.get(`lists?search=${serachKey}&page=${page}`);
  return response.data;
}