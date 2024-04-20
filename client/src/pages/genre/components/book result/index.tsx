import { Link } from "react-router-dom";
import { BookType } from "@/types";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/hook";
import { PulseLoader } from "react-spinners";
import { IoIosArrowDown } from "react-icons/io";
import { getBookByGenre } from "@/api/book";

interface AuthorsResultState {
  books: BookType[],
  isLoading: boolean,
  error: unknown,
}

const BookResult = ({ genre} : { genre: string }) => {
  const searchFilter = useAppSelector(state => state.SearchSlice.searchFilter);
  const [authorsResult, setAuthorsResult] = useState<AuthorsResultState>({
    books: [],
    isLoading: false,
    error: null,
  });
  const [page, setPage] = useState(1);
  useEffect(() => {
    const searchAuthors = async () => {
      setPage(1);
      try {
        setAuthorsResult(state => ({ ...state, isLoading: true }));
        const books = await getBookByGenre(genre, 1);
        setAuthorsResult(state => ({ ...state, books, isLoading: false }));
      } catch (error) {
        setAuthorsResult(state => ({ ...state, error: error, isLoading: false }));
      }
    }
    searchAuthors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre]);
  const getMoreResult = async () => {
    try {
      setAuthorsResult(state => ({ ...state, isLoading: true }));
      const books = await getBookByGenre(genre, page + 1);
      setAuthorsResult(state => ({ ...state, books: [...state.books, ...books], isLoading: false }));
    } catch (error) {
      setAuthorsResult(state => ({ ...state, error: error, isLoading: false }));
    }
  }
  const onClickMoreResult = async () => {
    await getMoreResult();
    setPage(page => page + 1);
  }
  return (
    <>
      {(searchFilter === 'authors' || searchFilter === 'all') &&
        <>
          <h2>Books</h2>
          <div className="row result-container mb-2">
            {
              authorsResult.books.map(data => {
                return (
                  <Link to={`/books/${data._id}`} className="w-100" key={data._id}>
                    <div className="book-search-result d-f w-100 align-items-center">
                      <div className="book-cover-container">
                        <img src={data.cover} alt="" className="book-cover" />
                      </div>
                      <div className="book-info m-0">
                        <p className="link-hover fw-bold m-0">
                          {data.title}
                        </p>
                        <p className="text-secondary book-info-published m-0">
                          {data.published}
                        </p>
                        <p className="text-secondary book-info-author m-0">
                          {data.author.name}
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              })
            }
            {(!authorsResult.books || !authorsResult.books.length) && <p className="result-not-found w-100 m-0 p-1">No result found</p>}
            <>
              {
                authorsResult.isLoading ?
                  <p className="w-100 m-0 mt-1 p-1 d-f align-items-center justify-center books-loading">
                    <PulseLoader
                      size={10}
                      color="#656D76"
                      speedMultiplier={0.5}
                    />
                  </p> :
                  <p className="m-0 mt-1 p-1 fw-bold show-more text-secondary d-f align-items-center"
                    onClick={onClickMoreResult}>
                    Show more result
                    <IoIosArrowDown />
                  </p>
              }
            </>
          </div>
        </>
      }
    </>
  )
}

export default BookResult;