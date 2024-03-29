import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setSearchKeyword } from "@/redux/slices/SearchSlice";
import { FaSearch } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export default function SearchBrar() {
  const [ inputFocus, setInputFocus ] = useState(false);
  const [ searchTerm, setSearchTerm ] = useState('');
  const theme = useAppSelector(state => state.ThemeSlice.theme);
  const searchKeyword = useAppSelector(state => state.SearchSlice.searchKeyword);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(setSearchKeyword(searchTerm));
    }, 1000);
    return () => clearTimeout(delayDebounceFn)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ searchTerm ]);

  const handleSearchKeyClear = () => {
    dispatch(setSearchKeyword(""));
    setSearchTerm("");
  }

  return (
    <div className="search-header py-2">
      <div className={`search-bar d-f align-items-center px-2 py-1 input-focus-${inputFocus}`}>
        <FaSearch 
          className='search-icon'
          color={
          theme === 'dark' ? 
          inputFocus ? '#E6EDF3' 
          : '#848D97' 
          : inputFocus ? '#1F2328'
          : '#656D76'}/>
        <input
          value={searchTerm}
          type="text"
          placeholder='What do you want to read?' 
          className="search-input mx-1"
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          onChange={(e) => setSearchTerm(e.target.value)}/>
        {
          searchKeyword && 
          <FaXmark 
            className="clear-input"
            onClick={handleSearchKeyClear}/>
        }
      </div>
    </div>
  )
}
