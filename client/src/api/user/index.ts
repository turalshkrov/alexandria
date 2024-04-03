import http from "../api";

type EditProfileData = {
  name: string | undefined;
    username: string | undefined;
    location: string | undefined;
    profileImage: string | undefined;
}

export const getUserById = async (id: string | undefined) => {
  if (id?.length !== 24) { throw new Error() }
  const response = await http.get(`/users/${id}`);
  return response.data;
}

export const updateProfile = async (data: EditProfileData) => {
  const response = await http.patch(`/users/update`, { ...data });
  if (response.status === 200) return data;
  return response.data;
}