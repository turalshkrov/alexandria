import { Link } from "react-router-dom";
import "./index.scss";
import { AuthorType } from "@/types";

interface AuthorCardProps {
  data: AuthorType
}

export default function AuthorCard({ data }: AuthorCardProps) {
  return (
    <div className="card-item col-6 col-md-4 col-lg-2 p-1">
      <div className="author-card py-1 w-100 text-center">
        <div className="px-2">
          <Link to={`authors/${data._id}`}>
            <div className="author-image-container br-full">
              <img src={data.image} className="author-image br-full" />
            </div>
          </Link>
        </div>
        <div className="author-card-info mt-1">
          <h3 className='author-card-fullname'>
            <Link to={`authors/${data._id}`} className="link-hover">
              {data.name}
            </Link>
          </h3>
          <p className='card-secondary'>Writer</p>
        </div>
      </div>
    </div>
  )
}
