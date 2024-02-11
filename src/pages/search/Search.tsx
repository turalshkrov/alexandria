import Filter from "./components/Filter";
import SearchBrar from "./components/SearchBar";
import "./Search.scss";

export default function Search() {
  return (
    <div className='page'>
      <div className="container">
        <div className="search-header px-1 px-md-0 py-2">
          <SearchBrar />
        </div>
        <Filter />
      </div>
    </div>
  )
}
