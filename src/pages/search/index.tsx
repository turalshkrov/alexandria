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
        <SearchResult />
      </div>
    </div>
  )
}