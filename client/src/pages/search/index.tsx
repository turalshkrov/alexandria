import SearchBrar from "./components/searchbar";
import Filter from "./components/filter";
import BrowseGenres from "./components/genres";
import SearchResult from "./components/search result";
import "./index.scss";

export default function Search() {
  return (
    <div className='page'>
      <div className="container">
        <SearchBrar />
        <Filter />
        <BrowseGenres />
        <div className="mt-3">
          <SearchResult />
        </div>
      </div>
    </div>
  )
}