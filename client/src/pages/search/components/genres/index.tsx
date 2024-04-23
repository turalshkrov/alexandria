import { useAppSelector } from "@/hooks/hook";
import GenreCard from "@/shared/components/genre card";

export default function BrowseGenres() {
  const searchKeyword = useAppSelector(state => state.SearchSlice.searchKeyword);
  const genres = useAppSelector(state => state.SearchSlice.genres);
  return (
    <>
      {
        searchKeyword.length < 3 &&
        <div className="my-2">
        <h2 className="mb-2">Browse All</h2>
        <div className="genres">
          {
            genres.map(genre => {
              return(
                <GenreCard
                  key={genre._id}
                  id={genre._id}
                  title={genre.name}
                  cover={genre.cover}
                />
              )
            })
          }
        </div>
        </div>
      }
      </>
  )
}