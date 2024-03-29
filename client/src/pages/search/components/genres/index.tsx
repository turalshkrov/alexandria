import genres from "./genres.json";
import GenreCard from "@/shared/components/genre card";

export default function BrowseGenres() {
  return (
    <div className="my-2">
      {
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