import http from "../api";

export const getBooks = async (searchKey: string, page: number) => {
  const response = await http.get(`/books?search=${searchKey}&page=${page}`);
  return response.data;
}

export const getBookById = async (id: string) => {
  if (id.length !== 24) throw new Error('Id is not valid');
  const response = await http.get(`/books/${id}`);
  return response.data;
}

export const getBookReviews = async (id: string) => {
  if (id.length !== 24) throw new Error('Id is not valid');
  const response = await http.get(`/books/${id}/reviews`);
  return response.data;
}

export const getBookByGenre = async (genre: string) => {
  const response = await http.get(`/books/genres/${genre}`);
  return response.data;
}