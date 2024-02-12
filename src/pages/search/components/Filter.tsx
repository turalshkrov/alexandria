import Button from "@/shared/components/button/Button";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setSearchFilter } from "@/redux/slices/SearchSlice";

export default function Filter() {
  const theme = useAppSelector(state => state.ThemeSlice.theme);
  const searchType: string[] = [
    "All", "Books", "Writers", "Users"
  ];
  const searchFilter = useAppSelector(state => state.SearchSlice.searchFilter);
  const dispatch = useAppDispatch();

  return (
    <div className="filter">
      {
        searchType.map(type => {
          return(
          <Button
            key={type}
            size="sm"
            type="outline"
            color={theme === "dark" ? "light" : "dark"}
            className={searchFilter === type ? "filter-btn filter-btn-active mr-1" : "filter-btn mr-1"}
            onClick={() => dispatch(setSearchFilter(type))}>
            {type}
          </Button>)
        })
      }
    </div>
  )
}