import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import Footer from '../../components/footer/Footer';
import peopleInLibrary from '../../img/people-in-library.jpg';
import peopleInLibraryDark from '../../img/people-in-library-dark.jpg';
import { Link } from 'react-router-dom';

export default function Blogs() {
  const theme = useContext(ThemeContext);
  return (
    <div className={`page page-${theme?.theme}`}>
      <div className="container py-1">
        <div className="blogs-page-main-img d-f justify-center mb-0 mb-md-2 mt-3 mt-md-1">
          <img src={theme?.theme === 'dark' ? peopleInLibraryDark : peopleInLibrary} alt="" className="w-100 w-lg-75" />
        </div>
        <div className="blogs pt-2 w-100 w-lg-75">
          <div className="page-title mb-3">
            <h1>articles and blogs for you</h1>
          </div>
          <div className="blog my-2 row">
            <div className="col-4 col-md-3 blog-img">
              <img src="https://wineandquill.files.wordpress.com/2016/02/slider50image.jpg" alt="" className='w-100'/>
            </div>
            <div className="col-8 col-md-9 pl-0 pl-1">
              <Link to=''>
                <h2 className='blog-title-link font-md font-md-lg'>50 Books You Must Read Before You Die</h2>
              </Link>
              <p className="text-secondary fw-bold">From alinino.az</p>
              <p className='text-secondary d-n d-md-b'>
                Those who have once tasted the pleasure of reading a book cannot give up this pleasure easily. However, in an age where dozens and hundreds of new books are written and published every day, it has become even more difficult for readers to make the right choice and find a book that will make them enjoy reading.
                <Link to='' className='ml-1 link-hover-primary'>Read more</Link>
              </p>
            </div>
          </div>
          <div className="blog my-2 row">
            <div className="col-4 col-md-3 blog-img">
              <img src="https://qph.cf2.quoracdn.net/main-qimg-290c18667a4150c6c3c4260a82bea210-lq" alt="" className='w-100'/>
            </div>
            <div className="col-8 col-md-9 pl-0 pl-1">
              <Link to=''>
                <h2 className='blog-title-link font-md font-md-lg'>30 books we should read before we turn 30</h2>
              </Link>
              <p className="text-secondary fw-bold">From alinino.az</p>
              <p className='text-secondary d-n d-md-b'>
                I agree with you that they say, "Some books don't age". However, let's not forget one thing that our reading age plays a significant role in the formation of our outlook and outlook on life. There are books that can be better read as a teenager or young adult. In this regard, we present to you thirty books from world literature that you must read under the age of thirty.
                <Link to='' className='ml-1 link-hover-primary'>Read more</Link>
              </p>
            </div>
          </div>
          <div className="blog my-2 row">
            <div className="col-4 col-md-3 blog-img">
              <img src="https://qph.cf2.quoracdn.net/main-qimg-fd4def5f599c2b7403bd6f9690189da4.webp" alt="" className='w-100'/>
            </div>
            <div className="col-8 col-md-9 pl-0 pl-1">
              <Link to=''>
                <h2 className='blog-title-link font-md font-md-lg'>10 best-selling books in the world</h2>
              </Link>
              <p className="text-secondary fw-bold">From alinino.az</p>
              <p className='text-secondary d-n d-md-b'>
                We will consider the 10 most popular books in the world. Let's immediately note that we did not include them in this list because it is impossible to estimate the circulation and sales of some books - Bible, Koran, "Quotations of Mao Zedong", "Odyssey". The Bible, which entered the Guinness Book of Records as the best-selling book in history, has sold more than 5 billion copies.
                <Link to='' className='ml-1 link-hover-primary'>Read more</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer /> 
    </div>
  )
}
