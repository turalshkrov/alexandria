import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setSearchKeyword } from "@/redux/slices/SearchSlice";

export default function SearchBrar() {
  const [ inputFocus, setInputFocus ] = useState(false);
  const theme = useAppSelector(state => state.ThemeSlice.theme);
  const searchKeyword = useAppSelector(state => state.SearchSlice.searchKeyword);
  const dispatch = useAppDispatch();
  return (
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
        value={searchKeyword}
        type="text"
        placeholder='What do you want to read?' 
        className="search-input mx-1"
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
        onChange={(e) => dispatch(setSearchKeyword(e.target.value.trim()))}/>
    </div>
  )
}
