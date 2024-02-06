import { Link } from 'react-router-dom';

interface BlogCardProps {
  blog: {
    id: number,
    title: string,
    tags: string[],
    date: string,
    preview: string
  }
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="col-12  py-2">
      <div className='blog-card' >
        <Link to={`/${blog.id}`} className="blog-title font-lg fw-bold link-hover">{blog.title}</Link>
        <div className="blog-details my-1">
          <span className="blog-date text-secondary pr-2 mr-2">{blog.date}</span>
          { blog.tags && blog.tags.map(tag => <Link to='' key={tag} className='blog-tag link-hover text-secondary mr-1'>{tag}</Link>) }
        </div>
        <p className="blog-preview mt-1">{blog.preview}</p>
        <div className="blog-details">
        </div>
      </div>
    </div>
  )
}
