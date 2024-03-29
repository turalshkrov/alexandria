import http from "../api";

export const getBooks = async (searchKey: string) => {
  const response = await http.get(`/books?search=${searchKey}`);
  return response.data;
}