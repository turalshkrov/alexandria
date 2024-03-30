import http from "../api";

export const getBooks = async (searchKey: string, page: number) => {
  const response = await http.get(`/books?search=${searchKey}&page=${page}`);
  return response.data;
}