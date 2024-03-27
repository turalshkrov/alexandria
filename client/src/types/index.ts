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
  location: string,
  favoriteBooks: [],
  favoriteAuthors: [],
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