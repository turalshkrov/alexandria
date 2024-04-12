import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./index.scss";
import { AuthorType, BookType } from "@/types";
import { getBookByGenre } from "@/api/book";
import { getAuthorByGenre } from "@/api/author";
import Preloader from "@/shared/components/preloader/Preloader";
import ErrorPage from "../error";

interface GenrePageState {
  books: BookType[] | null,
  authors: AuthorType[] | null,
  isLoading: boolean,
  error: unknown,
}

const GenrePage = () => {
  const params = useParams();
  const genre = params.genre || "";
  const [ data, setData ] = useState<GenrePageState>({
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
  }, [ genre ]);
  return (
    <>
    {
      data.isLoading ?
      <Preloader /> :
      data.error ?
      <ErrorPage /> :
      <div className="page genre-page">
        <div className="container py-2">
          <h1 className="logo-font">{genre}</h1>

        </div>
      </div>
    }
    </>
  )
}

export default GenrePage;