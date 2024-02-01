import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  const theme = useContext(ThemeContext);
  return (
    <div className={`page page-${theme?.theme}`} id='error-page'>
      <div className="container py-3">
        <div className="error-content d-f justify-center p-1 p-md-2">
          <nav className={`shelf-${theme?.theme} shelf w-100 w-md-75 w-lg-50`}>
            <div className="book" id="book-1"></div>
            <div className="book" id="book-2"></div>
            <div className="book" id="empty-book">
              <span>Not</span>
              <span>Found</span>
            </div>
            <div className="book" id="book-3"></div>
            <div className="book" id="book-4"></div>
          </nav>
          <div className="error-text text-center mt-3">
            <h1>Error 404</h1>
            <p>The page you're loking for can't be found</p>
          </div>
          <div className="mt-3 text-center">
            <Link to="/" className={theme?.theme === 'dark' ? 'btn-outline-light btn-sm' : 'btn-outline-dark btn-sm'}>
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
