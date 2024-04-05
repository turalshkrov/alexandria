import http from "../api";

export const getListsByUser = async (id: string | undefined) => {
  if (id?.length !== 24) { throw new Error() }
  const response = await http.get(`/users/${id}/lists`);
  return response.data;
}

export const getListById = async (id: string | undefined) => {
  if (id?.length !== 24) { throw new Error() }
  const response = await http.get(`/lists/${id}`);
  return response.data;
}

export const getLists = async (serachKey: string, page: number) => {
  const response = await http.get(`lists?search=${serachKey}&page=${page}`);
  return response.data;
}

export const createNewList = async (title: string) => {
  const response = await http.post('lists/create', { title });
  return response.data;
}

export const updateList = async (id: string, title: string) => {
  const response = await http.patch(`lists/${id}`, { title });
  if (response.status === 200) return { id, title };
  return response.data;
}

export const deleteListById = async (id: string) => {
  const response = await http.delete(`/lists/${id}`);
  if (response.status === 200) return id;
  return response.data;
}

export const addBookToList = async (listId: string, bookId: string) => {
  const response = await http.patch(`/lists/${listId}/add-book`, { bookId });
  const list = response.data.list;
  return { listId, list };
}

export const removeBookFromList = async (listId: string, bookId: string) => {
  const response = await http.patch(`/lists/${listId}/remove-book`, { bookId });
  const list = response.data.list;
  return { listId, list };
}
