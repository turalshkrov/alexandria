import BookCard from "@/shared/components/book-card";
import { useAppSelector } from "@/hooks/hook";
import { useEffect, useState } from "react";
import { getBooks } from "@/api/book";
import { AuthorType, BookType, ListType } from "@/types";
import Preloader from "@/shared/components/preloader/Preloader";
import { getAuthors } from "@/api/author";
import AuthorCard from "@/shared/components/author-card";

interface SearchResult {
  books: BookType[] | null,
  authors: AuthorType[] | null,
  lists: ListType[] | null,
  isLoading: boolean,
  error: unknown,
}

const SearchResult = () => {
  const [ searchResult, setSearchResult ] = useState<SearchResult>({
    books: null,
    authors: null,
    lists: null,
    isLoading: false,
    error: null,
  });
  const searchFilter = useAppSelector(state => state.SearchSlice.searchFilter);
  const searchKeyword = useAppSelector(state => state.SearchSlice.searchKeyword);
  useEffect(() => {
    const search = async () => {
      try {
        if (searchKeyword) {
          setSearchResult(state => ({ ...state, isLoading: true }));
          const books = await getBooks(searchKeyword);
          const authors = await getAuthors(searchKeyword);
          setSearchResult(state => ({ ...state, books, authors, isLoading: false, }));
        }
      } catch (error) {
        setSearchResult(state => ({ ...state, error: error }));
      }
    }
    search();
  }, [ searchKeyword ]);

  return (
    <div className="search-result">
      {
        searchResult.isLoading ?
        <Preloader /> :
        <>
          <h2 className="my-2 fw-regular">{`Search "${searchKeyword}"`}</h2>
          {
            (searchFilter === 'books' || searchFilter === 'all') &&
            <>
              <div className="books-result-header d-f align-items-center justify-between">
                <h2>Books</h2>
                
              </div>
              <div className="row books-container mb-3">
                {
                  searchResult.books?.filter((_, i) => i < 6).map(book => {
                    return (
                      <BookCard
                        key={book._id}
                        data={book}
                      />
                    )
                  })
                }
              </div>
            </>
          }
          {
            (searchFilter === 'writers' || searchFilter === 'all') &&
            <>
              <h2>Writers</h2>
              <div className="row">
                {
                  searchResult.authors?.filter((_, i) => i < 6).map(author => (
                    <AuthorCard
                      key={author._id}
                      data={author}
                    />
                  ))
                }
              </div>
            </>
          }
        </>
      }
    </div>
  )
}

export default SearchResult;