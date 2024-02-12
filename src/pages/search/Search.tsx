import SearchBrar from "./components/SearchBar";
import Filter from "./components/Filter";
import BrowseGenres from "./components/BrowseGenres";
import "./Search.scss";

export default function Search() {
  return (
    <div className='page'>
      <div className="container">
        <SearchBrar />
        <Filter />
        <BrowseGenres />
      </div>
    </div>
  )
}
