import http from "../api";

export const getAuthors = async (searchKey: string, page: number) => {
  const response = await http.get(`/authors?search=${searchKey}&page=${page}`);
  return response.data;
}

export const getAuthorById = async (id: string) => {
  const response = await http.get(`/authors/${id}`);
  return response.data;
}

export const getAuthorBooks = async (id: string) => {
  const response = await http.get(`/books/author/${id}/`);
  return response.data;
}

export const getAuthorByGenre = async (genre: string, page: number) => {
  const response = await http.get(`/authors/genres/${genre}?page=${page}`);
  return response.data;
}