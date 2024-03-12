import booksDark from '@/assets/images/book-dark.jpg';
import books from '@/assets/images/book.jpg';
import BlogCard from '@/pages/blogs/blog card/BlogCard';
import { useAppSelector } from '@/hooks/hook';
import "./index.scss";

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
        <div className="blogs-page-header w-lg-75 d-f align-items-center my-1">
          <div className="blogs-page-header-text mt-2 px-2 px-md-4 w-100 w-md-50 text-center">
            <h1>Discover & Read More</h1>
          </div>
          <img src={theme === 'dark' ? booksDark : books} alt="" className="w-100 w-md-50" />
        </div>
        <div className="blogs pt-2 w-100 w-lg-75">
          <div className="page-title mb-md-2">
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
