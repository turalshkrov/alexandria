import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setSearchFilter } from "@/redux/slices/SearchSlice";

export default function Filter() {
  const searchType: string[] = [
    "all", "books", "authors", "lists"
  ];

  const searchFilter = useAppSelector(state => state.SearchSlice.searchFilter);
  const searchKeyword = useAppSelector(state => state.SearchSlice.searchKeyword);
  const dispatch = useAppDispatch();
  return (
    <>
    {
    searchKeyword.length > 2 ?
    <div className="ml-md-2 ml-lg-3 mt-2 d-n d-md-b">
    <h2>Advanced search</h2>
    <p className="text-secondary filter-header-text">
      Create a more specific search using filter
    </p>
    <div className="filter mt-2">
      {
        searchType.map(value => {
          return( 
          <p
            id={value}
            key={value}
            className={searchFilter === value ? "filter-item filter-item-active mr-1" : "filter-item mr-1"}
            onClick={() => dispatch(setSearchFilter(value))}>
            {value}
          </p>)
        })
      }
    </div>
    </div>
    : null
    }
    </>
  )
}