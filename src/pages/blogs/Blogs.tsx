import peopleInLibrary from '../../assets/images/people-in-library.jpg';
import peopleInLibraryDark from '../../assets/images/people-in-library-dark.jpg';
import BlogCard from '../../shared/components/blog card/BlogCard';
import { useAppSelector } from '../../hooks/hook';

const blog = {
  id: 1,
  title: '50 Books You Must Read Before You Die',
  tags: ['Must Read', 'Dostoyevsky'],
  date: '12 Feb 2019',
  preview: 'Those who have once tasted the pleasure of reading a book cannot give up this pleasure easily. However, in an age where dozens and hundreds of new books are written and published every day, it has become even more difficult for readers to make the right choice and find a book that will make them enjoy reading.'
}

const blog2 = {
  id: 2,
  title: 'Readers\' Most Anticipated Books of February',
  tags: ['Alexandria'],
  date: '12 Feb 2019',
  preview: 'Those who have once tasted the pleasure of reading a book cannot give up this pleasure easily. However, in an age where dozens and hundreds of new books are written and published every day, it has become even more difficult for readers to make the right choice and find a book that will make them enjoy reading.'
}

export default function Blogs() {
  const theme = useAppSelector(state => state.ThemeSlice.theme);
  return (
    <div className='page'>
      <div className="container py-1">
        <div className="blogs-page-main-img d-f justify-center mb-0 mb-md-2 my-3">
          <img src={theme === 'dark' ? peopleInLibraryDark : peopleInLibrary} alt="" className="w-100 w-lg-75" />
        </div>
        <div className="blogs pt-2 w-100 w-lg-75">
          <div className="page-title mb-3">
            <h1 className='font-xxl'>Blogs</h1>
          </div>
          <div className="blogs-row row">
            <BlogCard blog={blog} />
            <BlogCard blog={blog2} />
            <BlogCard blog={blog} />
            <BlogCard blog={blog2} />
          </div>
        </div>
      </div>
    </div>
  )
}
