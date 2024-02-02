import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import Footer from '../../components/footer/Footer';
import peopleInLibrary from '../../img/people-in-library.jpg';
import peopleInLibraryDark from '../../img/people-in-library-dark.jpg';
import { Link } from 'react-router-dom';
import BlogCard from '../../components/blog card/BlogCard';

const blog = {
  cover: 'https://images.gr-assets.com/blogs/1706218363p8/2718.jpg',
  title: '50 Books You Must Read Before You Die',
  author: 'Alexandria',
  date: '',
  text: 'Those who have once tasted the pleasure of reading a book cannot give up this pleasure easily. However, in an age where dozens and hundreds of new books are written and published every day, it has become even more difficult for readers to make the right choice and find a book that will make them enjoy reading.'
}

const blog2 = {
  cover: 'https://images.gr-assets.com/blogs/1706290104p8/2730.jpg',
  title: 'Readers\' Most Anticipated Books of February',
  author: 'Alexandria',
  date: '',
  text: 'Those who have once tasted the pleasure of reading a book cannot give up this pleasure easily. However, in an age where dozens and hundreds of new books are written and published every day, it has become even more difficult for readers to make the right choice and find a book that will make them enjoy reading.'
}

export default function Blogs() {
  const theme = useContext(ThemeContext);
  return (
    <div className={`page page-${theme?.theme}`}>
      <div className="container py-1">
        <div className="blogs-page-main-img d-f justify-center mb-0 mb-md-2 mt-3 mt-md-1">
          <img src={theme?.theme === 'dark' ? peopleInLibraryDark : peopleInLibrary} alt="" className="w-100 w-lg-75" />
        </div>
        <div className="blogs pt-2 w-100">
          <div className="page-title mb-3">
            <h1>articles and blogs for you</h1>
          </div>
          <div className="blogs-row row">
            <BlogCard data={blog} />
            <BlogCard data={blog2} />
            <BlogCard data={blog} />
            <BlogCard data={blog2} />
          </div>
        </div>
      </div>
      <Footer /> 
    </div>
  )
}
