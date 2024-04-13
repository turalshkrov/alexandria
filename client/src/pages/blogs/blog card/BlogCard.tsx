import { BlogType } from '@/types';
import { Link } from 'react-router-dom';

type BlogCardProps = {
  blog: BlogType
}

export default function BlogCard({ blog }: BlogCardProps) {
  const date = new Date(String(blog.date)).toDateString();
  return (
    <div className="col-12  py-2">
      <div className='blog-card' >
        <Link to={`/blogs/${blog._id}`} className="blog-title font-lg fw-bold link-hover">{blog.title}</Link>
        <div className="blog-details my-1">
          <span className="blog-date text-secondary pr-2 mr-2">{date}</span>
          <span className='text-secondary'>By Alexandria</span>
        </div>
        <p className="blog-preview mt-1">{blog.preview}</p>
        <div className="blog-details">
        </div>
      </div>
    </div>
  )
}
