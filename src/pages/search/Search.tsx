import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useAppSelector } from "../../hooks/hook";

export default function Search() {
  const [ inputFocus, setInputFocus ] = useState(false);
  const theme = useAppSelector(state => state.theme.theme)
  return (
    <div className='page'>
      <div className="container">
        <div className="search-header px-1 px-md-0 py-2">
          <div className={`search-bar d-f align-items-center px-2 py-1 input-focus-${inputFocus}`}>
            <FaSearch 
              className='search-icon'
              color={
              theme === 'dark' ? 
              inputFocus ? '#E6EDF3' 
              : '#848D97' 
              : inputFocus ? '#1F2328'
              : '#656D76'}/>
            <input type="text"
              placeholder='What do want to read?' 
              className="search-input mx-1"
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}/>
          </div>
        </div>
      </div>
    </div>
  )
}
