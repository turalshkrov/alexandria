export type UserType = {
  _id: string,
  name: string,
  username: string,
  email: string,
  password: string,
  profileImage: string,
  createdAt: Date,
  updatedAt: Date,
  active: boolean,
  newMail?: string,
}

export type ListType = {
  _id: string,
  user: UserType,
  title: string,
  cover: string,
  books: [],
  createdAt: Date,
  updatedAt: Date,
}