import { useContext } from 'react'
import { ThemeContext } from '../../contexts/theme/ThemeContext'

export default function Blogs() {
  const theme = useContext(ThemeContext);
  return (
    <div className={`page page-${theme?.theme}`}>
      <div className="container">
        <h1>Blogs</h1>
      </div> 
    </div>
  )
}
