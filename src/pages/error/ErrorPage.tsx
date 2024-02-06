import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hook';
import booksImg from '../../assets/images/books-and-publication.jpg';
import booksDarkImg from '../../assets/images/books-and-publication-dark.jpg';
import Footer from '../../components/footer/Footer';
import Button from '../../components/button/Button';

export default function ErrorPage() {
  const theme = useAppSelector(state => state.ThemeSlice.theme);
  return (
    <div className='page' id='error-page'>
      <div className="container py-3 py-md-1">
        <div className="error-content d-f justify-center p-1 p-md-2">
          <img src={theme === 'dark' ? booksDarkImg : booksImg} alt="" className='w-75 w-md-25 error-img my-md-2'/>
          <div className="error-text text-center mt-3">
            <h1>Error 404</h1>
            <p>The page you're loking for can't be found</p>
          </div>
          <div className="mt-3 mt-md-1 text-center">
            <Link to="/">
              <Button className='font-sm'>
                Back to home
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
