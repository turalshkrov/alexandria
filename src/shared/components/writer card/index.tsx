import { Link } from "react-router-dom";
import "./index.scss";

interface WriterCardProps {
  data: {
    id: string,
    fullName: string,
    image: string
  }
}

export default function WriterCard({ data }: WriterCardProps) {
  return (
    <div className="card-item col-6 col-md-4 col-lg-2 p-1">
      <div className="writer-card py-1 w-100 text-center">
        <Link to={`writers/${data.id}`}>
          <img src={data.image} alt={data.fullName} className="card-cover px-2 w-100 br-full" />
        </Link>
        <div className="witer-card-info mt-1">
          <h3 className='writer-card-fullname'>
            <Link to={`writers/${data.id}`} className="link-hover">
              {data.fullName}
            </Link>
          </h3>
          <p className='card-secondary'>Writer</p>
        </div>
      </div>
    </div>
  )
}
