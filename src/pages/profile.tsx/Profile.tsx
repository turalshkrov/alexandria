import { useContext } from 'react'
import { ThemeContext } from '../../contexts/theme/ThemeContext'

export default function Profile() {
  const theme = useContext(ThemeContext)
  return (
    <div className={`page page-${theme?.theme}`}>
      <div className="container">
        <h1>Profile</h1>
      </div>
    </div>
  )
}
