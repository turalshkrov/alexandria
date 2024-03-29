import http from "../api";

export const getAuthors = async (searchKey: string) => {
  const response = await http.get(`/authors?search=${searchKey}`);
  return response.data;
}