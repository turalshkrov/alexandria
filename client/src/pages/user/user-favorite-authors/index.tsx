import { AuthorType } from "@/types";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

interface UserFavoriteBooksProps {
  username: string,
  authors: AuthorType[],
}

const UserFavoriteAuthors = ({ username, authors }: UserFavoriteBooksProps) => {
  const [ collapse, setCollapse ] = useState(true);
  const handleCollapse = () => {
    setCollapse(!collapse);
  }
  return (
    <div className="favorite-authors mt-2">
      <div className="favarotie-books-header d-f align-items-center justify-space-between">
      <h4 className="mb-1 fw-regular">{username}'s favorite authors</h4>
        <p className="show-all d-f align-items-center justify-center link-hover m-0" onClick={handleCollapse}>
          Show {collapse ? 'all' : 'less'}
          <IoIosArrowDown className={collapse ? "arrow" : "arrow arrow-up"}/>
        </p>
      </div>
      <div className="books-container row p-1">
        {
          authors.filter((_, i) => i < (collapse ? 6 : authors.length)).map(author => (
            <div className="author col-4 col-md-2 p-1" key={author._id}>
              <Link to={`/authors/${author._id}`}>
                <div className="favorite-author-image-container" style={{ background: `url(${author.image})`}}>
                </div>
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default UserFavoriteAuthors;