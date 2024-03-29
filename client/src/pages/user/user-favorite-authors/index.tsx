import { AuthorType } from "@/types";
import { Link } from "react-router-dom";

interface UserFavoriteBooksProps {
  username: string,
  authors: AuthorType[],
}

const UserFavoriteAuthors = ({ username, authors }: UserFavoriteBooksProps) => {
  return (
    <div className="favorite-authors mt-2">
      <h4 className="mb-1 fw-regular">{username}'s favorite authors</h4>
      <div className="books-container row p-1">
        {
          authors.filter((_, i) => i < 5).map(author => (
            <div className="book col-4 col-md-2 p-1" key={author._id}>
              <Link to={`books/${author._id}`}>
                <img className="w-100 br-full" src={author.image} alt="" />
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default UserFavoriteAuthors;