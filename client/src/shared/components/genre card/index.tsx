import { Link } from "react-router-dom";
import "./index.scss";

type GenreCardProps = {
  id: string | number,
  title: string,
  cover: string,
}

export default function GenreCard(props: GenreCardProps) {
  return (
    <div className="genre-card-container">
      <Link to={`/genres/${props.id}`}>
        <div 
          className="genre-card" 
          id={props.title}>
          <div className="genre-content p-1">
            <h2 className="genre-title">{props.title}</h2>
            <img className="genre-book" src={props.cover} alt="" />
          </div>
        </div>
      </Link>
    </div>
  )
}
