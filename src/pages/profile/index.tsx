import readingImg from '@/assets/images/reading.jpg';
import readingDarkImg from '@/assets/images/reading-dark.jpg';
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useAppSelector } from '@/hooks/hook';
import Button from '@/shared/components/button/Button';
import { Link } from 'react-router-dom';
import "./index.scss";

export default function Profile() {
  const theme = useAppSelector(state => state.ThemeSlice.theme)
  return (
    <div className='page'>
      <div className="container mb-2 mb-md-0">
        <div className="py-3 row d-f align-items-center signup-content">
          <div className="col-12 col-md-6 text-center">
            <img className='signup-illustrator' src={theme === "dark" ? readingDarkImg : readingImg} alt="" />
            <p className='font-md font-md-lg fw-bold signup-page-text'>Track books you’ve read</p>
            <p className='font-md font-md-lg fw-bold signup-page-text'>Save those you want to read</p>
          </div>
          <div className="col-12 col-md-6 align-items-center mt-3 mt-md-0 d-f signup-btn-group">
            <Link to='/register' className='d-b w-100 text-center'>
              <Button 
                color='primary'
                type='solid'
                className='w-75 w-xl-50 font-sm'>
                Sign up free
              </Button>
            </Link>
            <Button 
              type='outline'
              color={theme === 'dark' ? 'light' : 'dark'}
              className='p-relative w-75 w-xl-50 font-sm mt-1 d-f align-items-center justify-center'>
              <FaGoogle className='signup-btn-icon'/>
              Continue with Google
            </Button>
            <Button 
              type='outline'
              color={theme === 'dark' ? 'light' : 'dark'}
              className='p-relative w-75 w-xl-50 font-sm mt-1 d-f align-items-center justify-center'>
              <FaFacebook className='signup-btn-icon'/>
              Continue with Facebook
            </Button>
            <Button 
              type='outline'
              color={theme === 'dark' ? 'light' : 'dark'}
              className='w-75 w-xl-50 font-sm mt-1'>Log in</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
