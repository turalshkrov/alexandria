import GenreCard from "@/shared/components/genre card/GenreCard";
import Filter from "./components/Filter";
import SearchBrar from "./components/SearchBar";
import genres from "./components/genres.json";
import { useAppSelector } from "@/hooks/hook";
import "./Search.scss";

export default function Search() {
  const searchKeyword = useAppSelector(state => state.SearchSlice.searchKeyword)
  return (
    <div className='page'>
      <div className="container">
        <div className="search-header px-1 px-md-0 py-2">
          <SearchBrar />
        </div>
        { searchKeyword ? <Filter /> : null}
        <div className="mt-2">
        {
          !searchKeyword ?
          <>
          <h2 className="mb-2">Browse All</h2>
          <div className="genres">
            {
              genres.map(genre => {
                return(
                  <GenreCard
                    key={genre.id}
                    id={genre.id}
                    title={genre.title}
                    cover={genre.cover}
                   />
                )
              })
            }
            </div>
          </> : null
        }
        </div>
      </div>
    </div>
  )
}
