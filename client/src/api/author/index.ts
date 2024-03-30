import http from "../api";

export const getAuthors = async (searchKey: string, page: number) => {
  const response = await http.get(`/authors?search=${searchKey}&page=${page}`);
  return response.data;
}