import { BookType } from "@/types";
import { Link } from "react-router-dom";

interface UserFavoriteBooksProps {
  username: string,
  books: BookType[],
}

const UserFavoriteBooks = ({ username, books }: UserFavoriteBooksProps) => {
  return (
    <div className="favorite-books mt-2">
      <h4 className="mt-1 fw-regular">{username}'s favorite books</h4>
      <div className="books-container row p-1">
        {
          books.filter((_, i) => i < 5).map(book => (
            <div className="book col-4 col-md-2 p-1" key={book._id}>
              <Link to={`books/${book._id}`}>
                <img className="w-100" src={book.cover} alt="" />
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default UserFavoriteBooks;