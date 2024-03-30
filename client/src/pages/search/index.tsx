import SearchBrar from "./components/searchbar";
import Filter from "./components/filter";
import BrowseGenres from "./components/genres";
import SearchResult from "./components/search result";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/hook";
import { setSearchFilter, setSearchKeyword } from "@/redux/slices/SearchSlice";
import "./index.scss";

export default function Search() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setSearchKeyword(''));
    dispatch(setSearchFilter('all'));
  }, [dispatch]);
  return (
  <>
    { 
    // 
    <div className='page'>
      <div className="container">
        <SearchBrar />
        <BrowseGenres />
        <div className="row">
          <div className="col-12 col-md-8">
            <SearchResult /> 
          </div>
          <div className="col-12 col-md-4">
            <Filter />
          </div>
        </div>
      </div>
    </div>
    }
  </>
  )
}