import http from "../api"

export const getBlogs = async () => {
  const response = await http.get('/blogs');
  return response.data;
}

export const getBlogById = async (id: string) => {
  const response = await http.get(`/blogs/${id}`);
  return response.data;
}

export const getLastBlog = async () => {
  const response = await http.get('/blogs/get/last');
  return response.data;
}