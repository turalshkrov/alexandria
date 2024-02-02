import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme/ThemeContext';

interface BlogCardProps {
  data: {
    cover: string,
    title: string,
    author: string,
    date: string,
    text: string
  }
}

export default function BlogCard({ data }: BlogCardProps) {
  const theme = useContext(ThemeContext);
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-1">
      <div className={`blog-card blog-card-${theme?.theme} row`}>
        <img src={data.cover} alt="" className="blog-cover w-100"/>
        <div className="blog-details py-2">
          <h2 className="blog-title">{data.title}</h2>
          <p className="blog-author text-secondary fw-bold">{data.author}</p>
        </div>
      </div>
    </div>
  )
}
