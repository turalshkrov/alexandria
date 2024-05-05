import { BookType } from "@/types";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

interface UserFavoriteBooksProps {
  username: string,
  books: BookType[],
}

const UserFavoriteBooks = ({ username, books }: UserFavoriteBooksProps) => {
  const [ collapse, setCollapse ] = useState(true);
  const handleCollapse = () => {
    setCollapse(!collapse);
  }
  return (
    <div className="favorite-books mt-2">
      <div className="favarotie-books-header d-f align-items-center justify-space-between">
        <h4 className="fw-regular m-0">{username}'s favorite books</h4>
        <p className="show-all d-f align-items-center justify-center link-hover m-0" onClick={handleCollapse}>
          Show {collapse ? 'all' : 'less'}
          <IoIosArrowDown className={collapse ? "arrow" : "arrow arrow-up"}/>
        </p>
      </div>
      <div className="books-container row p-1">
        {
          books.filter((_, i) => i < (collapse ? 6 : books.length)).map(book => (
            <div className="book col-4 col-md-2 p-1" key={book._id}>
              <Link to={`/books/${book._id}`}>
                <div className="favorite-book-cover-container" style={{ background: `url(${book.cover})`}}>
                </div>
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default UserFavoriteBooks;