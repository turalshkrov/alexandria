import SearchBrar from "./components/searchbar";
import Filter from "./components/filter";
import BrowseGenres from "./components/genres";
import SearchResult from "./components/search result";
import "./index.scss";
import { useAppSelector } from "@/hooks/hook";

export default function Search() {
  const searchKeyword = useAppSelector(state => state.SearchSlice.searchKeyword);
  return (
    <div className='page'>
      <div className="container">
        <SearchBrar />
        <Filter />
        {
          searchKeyword ? 
          <div className="mt-3">
            <SearchResult />
          </div> :
          <BrowseGenres />
        }
      </div>
    </div>
  )
}