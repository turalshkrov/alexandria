import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { useEffect } from "react";
import { getGenres } from "@/redux/slices/SearchSlice";
import GenreCard from "@/shared/components/genre card";

export default function BrowseGenres() {
  const dispatch = useAppDispatch();
  const searchKeyword = useAppSelector(state => state.SearchSlice.searchKeyword);
  const genres = useAppSelector(state => state.SearchSlice.genres);
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);
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