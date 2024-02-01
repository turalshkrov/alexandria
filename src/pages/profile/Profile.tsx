import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import readingImg from '../../../src/img/reading.jpg';
import readingDarkImg from '../../../src/img/reading-dark.jpg';
import Footer from '../../components/footer/Footer';
import { FaGoogle, FaFacebook } from "react-icons/fa";

export default function Profile() {
  const theme = useContext(ThemeContext)
  return (
    <div className={`page page-${theme?.theme}`}>
      <div className="container mb-2 mb-md-0">
        <div className="py-3 row d-f align-items-center signup-content">
          <div className="col-12 col-md-6 text-center">
            <img className='signup-illustrator' src={theme?.theme === "dark" ? readingDarkImg : readingImg} alt="" />
            <p className='font-md font-md-lg fw-bold signup-page-text'>Track books you’ve read</p>
            <p className='font-md font-md-lg fw-bold signup-page-text'>Save those you want to read</p>
          </div>
          <div className="col-12 col-md-6 align-items-center mt-3 mt-md-0 d-f signup-btn-group">
            <button className={`btn btn-solid-primary-${theme?.theme} w-75 w-xl-50 font-sm`}>Sign up free</button>
            <button className={`btn-outline-${theme?.theme === 'dark' ? 'light' : 'dark'} p-relative w-75 w-xl-50 font-sm mt-1 d-f align-items-center justify-center`}>
              <FaGoogle className='signup-btn-icon'/>
              Continue with Google
              </button>
              <button className={`btn-outline-${theme?.theme === 'dark' ? 'light' : 'dark'} p-relative w-75 w-xl-50 font-sm mt-1 d-f align-items-center justify-center`}>
                <FaFacebook className='signup-btn-icon'/>
                Continue with Facebook
                </button>
            <button className={`btn-outline-${theme?.theme === 'dark' ? 'light' : 'dark'} w-75 w-xl-50 font-sm mt-1`}>Log in</button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
