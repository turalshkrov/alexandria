import { useParams } from "react-router-dom";
import "../search/components/search result/index.scss";
import "../search/components/book-search-result/index.scss";
import "../search/components/author-search-result/index.scss";
import AuthorResult from "./components/author result";
import BookResult from "./components/book result";


const GenrePage = () => {
  const params = useParams();
  const genre = params.genre || "";
  return (
    <div className="page genre-page">
      <div className="container w-lg-75 py-2">
        <h1 className="logo-font">{genre}</h1>
        <div className="mt-2">
          <BookResult genre={genre}/>
          <AuthorResult genre={genre}/>
        </div>
      </div>
    </div>

  )
}

export default GenrePage;