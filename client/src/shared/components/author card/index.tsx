import { Link } from "react-router-dom";
import "./index.scss";

interface AuthorCardProps {
  data: {
    id: string,
    fullName: string,
    image: string
  }
}

export default function AuthorCard({ data }: AuthorCardProps) {
  return (
    <div className="card-item col-6 col-md-4 col-lg-2 p-1">
      <div className="author-card py-1 w-100 text-center">
        <Link to={`authors/${data.id}`}>
          <img src={data.image} alt={data.fullName} className="card-cover px-2 w-100 br-full" />
        </Link>
        <div className="author-card-info mt-1">
          <h3 className='author-card-fullname'>
            <Link to={`authors/${data.id}`} className="link-hover">
              {data.fullName}
            </Link>
          </h3>
          <p className='card-secondary'>Writer</p>
        </div>
      </div>
    </div>
  )
}
