export type UserType = {
  _id: string,
  name: string,
  username: string,
  email: string,
  password: string,
  profileImage: string,
  location: string,
  createdAt: Date,
  updatedAt: Date,
  active: boolean,
  verified: boolean,
  favoriteBooks: BookType[],
  favoriteAuthors: AuthorType[],
}

export type ListType = {
  _id: string,
  user: UserType,
  title: string,
  books: BookType[],
  createdAt: Date,
  updatedAt: Date,
}

export type BookType = {
  _id: string,
  title: string, 
  originalTitle: string,
  author: AuthorType,
  published: string,
  genres: [],
  language: string,
  description: string,
  rating: number,
  ratingsCount: number,
  cover: string,
  series?: {
    _id: string,
    title: string,
    description: string,
    books: string[],
  },
}

export type AuthorType = {
  _id: string,
  name: string,
  nativeName: string,
  born: string,
  died?: string,
  genres: [],
  authorInfo: string,
  image: string,
}

export type ReviewType = {
  _id: string,
  user: UserType,
  book: string,
  rating: number,
  title: string,
  content: string,
  date: Date,
}

export type SeriesType = {
  _id: string,
  title: string,
  description: string,
  books: BookType[],
}

export type GenreType = {
  _id: string,
  name: string,
  cover: string,
}

export type BlogType = {
  _id: string,
  title: string,
  preview: string,
  content: string,
  date: Date,
}

export type CreateBookData = {
  title: string,
  originalTitle: string,
  author: string,
  series?: string,
  published: string,
  cover: string,
  genres: string[],
  language: string,
  description: string,
}

export type AuthorData = {
  name: string,
  nativeName: string,
  born: string,
  died?: string,
  genres: string[],
  authorInfo: string,
  image: string,
}

export type SeriesData = {
  title: string,
  description: string,
  books?: string[],
}
