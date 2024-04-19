import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthorType, BookType } from "@/types";
import { getBookByGenre } from "@/api/book";
import { getAuthorByGenre } from "@/api/author";
import Preloader from "@/shared/components/preloader/Preloader";
import ErrorPage from "../error";
import "../search/components/search result/index.scss";
import "../search/components/book-search-result/index.scss";
import "../search/components/author-search-result/index.scss";

interface GenrePageState {
  books: BookType[] | null,
  authors: AuthorType[] | null,
  isLoading: boolean,
  error: unknown,
}

const GenrePage = () => {
  const params = useParams();
  const genre = params.genre || "";
  const [data, setData] = useState<GenrePageState>({
    books: null,
    authors: null,
    isLoading: false,
    error: null,
  });
  useEffect(() => {
    const getData = async () => {
      try {
        setData(state => ({ ...state, isLoading: true }));
        const books = await getBookByGenre(genre);
        const authors = await getAuthorByGenre(genre);
        setData(state => ({ ...state, books, authors, isLoading: false }));
      } catch (error) {
        setData(state => ({ ...state, error, isLoading: false }));
      }
    }
    getData();
  }, [genre]);
  return (
    <>
      {
      data.isLoading ?
      <Preloader /> :
      data.error ?
      <ErrorPage /> :
      <div className="page genre-page">
        <div className="container w-lg-75 py-2">
          <h1 className="logo-font">{genre}</h1>
          {
            (data.books && data.books.length > 0) && <div className="result-container my-2">
              {
                data.books?.map(book => (
                  <Link to={`/books/${book._id}`} className="w-100" key={book._id}>
                    <div className="book-search-result d-f w-100 align-items-center">
                      <div className="book-cover-container">
                        <img src={book.cover} alt="" className="book-cover" />
                      </div>
                      <div className="book-info m-0">
                        <p className="link-hover fw-bold m-0">
                          {book.title}
                        </p>
                        <p className="text-secondary book-info-published m-0">
                          {book.published}
                        </p>
                        <p className="text-secondary book-info-author m-0">
                          {book.author.name}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              }
            </div>
          }
          {
            (data.authors && data.authors?.length > 0) && <div className="result-container">
              {
                data.authors.map(author => (
                  <Link to={`/authors/${author._id}`} className="w-100" key={author._id}>
                    <div className="author-search-result d-f align-items-center">
                      <div className="author-image-container">
                        <img src={author.image} alt="" className="author-image" />
                      </div>
                      <div className="ml-1">
                        <p className="m-0 link-hover fw-bold">{author.name}</p>
                      </div>
                    </div>
                  </Link>
                ))
              }
            </div>
          }
        </div>
      </div>
      }
    </>
  )
}

export default GenrePage;