import BlogCard from '@/pages/blogs/blog card/BlogCard';
import "./index.scss";
import { BlogType } from '@/types';
import { useEffect, useState } from 'react';
import { getBlogs } from '@/api/blog';
import Preloader from '@/shared/components/preloader/Preloader';
import ErrorPage from '../error';

interface BlogsPageState {
  blogs: BlogType[] | null,
  isLoading: boolean,
  error: unknown,
}

export default function Blogs() {
  const [ data, setData ] = useState<BlogsPageState>({
    blogs: null,
    isLoading: false,
    error: null,
  });
  useEffect(() => {
    const getData = async () => {
      try {
        setData(state => ({ ...state, isLoading: true }));
        const blogs = await getBlogs();
        setData(state => ({ ...state, blogs, isLoading: false }));
      } catch (error) {
        setData(state => ({ ...state, error, isLoading: false }));
      }
    }
    getData();
  }, [ ]);
  return (
    <>
    {
      data.isLoading ?
      <Preloader /> :
      data.error ?
      <ErrorPage /> :
      <div className='page'>
        <div className="container py-2">
          <div className="blogs w-100 w-lg-75">
            <div className="page-title mb-md-2">
              <h1 className='font-xl logo-font'>Blogs from Alexandria</h1>
            </div>
            <div className="blogs-row row">
              {
                data.blogs?.map(blog => (
                  <BlogCard blog={blog} key={blog._id}/>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    }
    </>
  )
}
