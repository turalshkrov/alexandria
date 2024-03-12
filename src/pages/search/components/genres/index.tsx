import { useAppSelector } from "@/hooks/hook";
import genres from "./genres.json";
import GenreCard from "@/shared/components/genre card";

export default function BrowseGenres() {
  const searchKeyword = useAppSelector(state => state.SearchSlice.searchKeyword);
  return (
    <div className="my-2">
      {
        !searchKeyword &&
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
        </>
      }
    </div>
  )
}