import http from "../api";

export const getUserById = async (id: string | undefined) => {
  if (id?.length !== 24) { throw new Error() }
  const response = await http.get(`/users/${id}`);
  return response.data;
}