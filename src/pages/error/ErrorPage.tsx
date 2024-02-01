import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { Link } from 'react-router-dom';
import booksImg from '../../img/books-and-publication.jpg';
import booksDarkImg from '../../img/books-and-publication-dark.jpg';
import Footer from '../../components/footer/Footer';

export default function ErrorPage() {
  const theme = useContext(ThemeContext);
  return (
    <div className={`page page-${theme?.theme}`} id='error-page'>
      <div className="container py-3 py-md-1">
        <div className="error-content d-f justify-center p-1 p-md-2">
          <img src={theme?.theme === 'dark' ? booksDarkImg : booksImg} alt="" className='w-75 w-md-25 error-img my-md-2'/>
          <div className="error-text text-center mt-3">
            <h1>Error 404</h1>
            <p>The page you're loking for can't be found</p>
          </div>
          <div className="mt-3 mt-md-1 text-center">
            <Link to="/" className={`btn btn-solid-primary-${theme?.theme}`}>
              Back to home
            </Link>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
