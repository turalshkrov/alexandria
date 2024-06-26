import { useAppSelector } from '@/hooks/hook';
import { Link } from 'react-router-dom';
import readingImg from '@/assets/images/reading.png';
import Button from '@/shared/components/button';
import "./index.scss";

export default function LoginPage() {
  const theme = useAppSelector(state => state.ThemeSlice.theme);
  
  return (
    <div className='page page-vertical-center'>
      <div className="container mb-2 mb-md-0">
        <div className="py-3 row d-f align-items-center signup-content">
          <div className="col-12 col-md-6 text-center">
            <img className='signup-illustrator' src={readingImg} alt="" />
            <p className='font-md font-md-lg fw-bold signup-page-text'>Track books you’ve read</p>
            <p className='font-md font-md-lg fw-bold signup-page-text'>Save those you want to read</p>
          </div>
          <div className="col-12 col-md-6 align-items-center mt-3 mt-md-0 d-f signup-btn-group">
            <Link to='/signup' className='d-b w-100 text-center'>
              <Button
                color='primary'
                style='solid'
                className='w-75 w-xl-50'>
                Sign up free
              </Button>
            </Link>
            <Link to='/signin' className='d-b w-100 text-center'>
              <Button
                style='outline'
                color={theme === 'dark' ? 'light' : 'dark'}
                className='w-75 w-xl-50 mt-1'>
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}