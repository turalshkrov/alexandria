import { useAppSelector } from "@/hooks/hook";
import BookSearchResult from "../book-search-result";
import AuthorSearchResult from "../author-search-result";
import ListSearchResult from "../list-search-result";
import "./index.scss";

const SearchResult = () => {
  const searchKeyword = useAppSelector(state => state.SearchSlice.searchKeyword);
  return (
    <div className="search-result">
      <h1 className="mb-3 mt-1 fw-regular">{`Search "${searchKeyword}"`}</h1>
      {
        (searchKeyword.length > 2) &&
        <>
          <BookSearchResult />
          <AuthorSearchResult />
          <ListSearchResult />
        </>
      }
    </div>
  )
}

export default SearchResult;