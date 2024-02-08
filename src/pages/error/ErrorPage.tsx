import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hook';
import booksImg from '../../assets/images/bookshelf.jpg';
import booksDarkImg from '../../assets/images/bookshelf-dark.jpg';
import Footer from '../../components/footer/Footer';
import Button from '../../components/button/Button';
import "./ErrorPage.scss";

export default function ErrorPage() {
  const theme = useAppSelector(state => state.ThemeSlice.theme);
  return (
    <div className='page' id='error-page'>
      <div className="container py-3 py-md-1">
        <div className="error-content d-f justify-center p-1 p-md-2">
          <div className="bookshelf w-100 w-lg-50 p-relative">
            <img src={theme === 'dark' ? booksDarkImg : booksImg} alt="" className='bookshelf-img w-100'/>
            <h1 className="p-absolute">404</h1>
          </div>
          <div className="error-text text-center mt-2">
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
