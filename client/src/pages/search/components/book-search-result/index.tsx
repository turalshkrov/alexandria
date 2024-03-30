import { BookType } from "@/types";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/hooks/hook";
import { useEffect, useState } from "react";
import { getBooks } from "@/api/book";
import { IoIosArrowDown } from "react-icons/io";
import PulseLoader from "react-spinners/PulseLoader";
import "./index.scss";

interface BooksResultState {
  books: BookType[],
  isLoading: boolean,
  error: unknown,
}

const BookSearchResult = () => {
  const searchKeyword = useAppSelector(state => state.SearchSlice.searchKeyword);
  const searchFilter = useAppSelector(state => state.SearchSlice.searchFilter);
  const [booksResult, setBookResult] = useState<BooksResultState>({
    books: [],
    isLoading: false,
    error: null,
  });
  const [page, setPage] = useState(1);
  useEffect(() => {
    const searchBooks = async () => {
      setPage(1);
      try {
        setBookResult(state => ({ ...state, isLoading: true }));
        const books = await getBooks(searchKeyword, 1);
        setBookResult(state => ({ ...state, books, isLoading: false }));
      } catch (error) {
        setBookResult(state => ({ ...state, error: error }));
      }
    }
    searchBooks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword]);
  const getMoreResult = async () => {
    try {
      setBookResult(state => ({ ...state, isLoading: true }));
      const books = await getBooks(searchKeyword, page + 1);
      setBookResult(state => ({ ...state, books: [ ...state.books, ...books ], isLoading: false }));
    } catch (error) {
      setBookResult(state => ({ ...state, error: error }));
    }
  }
  const onClickMoreResult = async () => {
    await getMoreResult();
    setPage(page => page + 1);
  }
  return (
    <>
      
      {(searchFilter === 'books' || searchFilter === 'all') &&
        <>
          <h2>Books</h2>
          <div className="row result-container mb-2">
            {
              booksResult.books?.map(data => {
                return (
                  <Link to={`books/${data._id}`} className="w-100" key={data._id}>
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
            {(!booksResult.books || !booksResult.books.length) && <p className="result-not-foun w-100 m-0 p-1">No result found</p>}
            <>
              {
                booksResult.isLoading ?
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

export default BookSearchResult;