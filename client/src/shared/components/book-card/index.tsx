import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { Link } from 'react-router-dom';
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import { BookType } from '@/types';
import { setSelectedBook } from '@/redux/slices/userListsSlice';
import { setIsOpen } from '@/redux/slices/ModalSlice';
import "./index.scss";

interface bookCardProps {
  data: BookType
}

const BookCard: React.FC<bookCardProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(state => state.userSlice.reviews);
  const userRating = reviews?.find(review => review.book === data._id)?.rating;
  const theme = useAppSelector(state => state.ThemeSlice.theme);
  const clickHandle: (id: string) => void = (id) => {
    dispatch(setSelectedBook(id));
    dispatch(setIsOpen({
      id: 'addToList',
      isOpen: true,
    }));
  }
  return (
    <div className="book-item col-6 col-md-4 col-lg-2 p-md-1">
      <div className="book-card w-100">
        <Link to={`/books/${data._id}`}>
          <div className="book-cover-container">
            <img src={data.cover} alt={data.title} className="book-cover w-100" />
          </div>
        </Link>
        <div className="book-info">
          <p className="book-card-rating d-f align-items-center">
            {
              data.rating > 0 && 
              <>
                <IoIosStar size={17} color='#f5c518' />
                <span className='rating-value'>{Number.isInteger(data.rating) ? data.rating + '.0' : data.rating}</span>
              </>
            }
            {
              userRating
              ? <span className='ml-1 d-f align-items-center user-rating' title='Your rating'>
                <IoIosStar size={17} className='' color={theme === 'dark' ? '#9309BF' : '#F44A65'} />
                <span className='rating-value'>{userRating}</span>
              </span>
              : <span className={data.rating > 0 ? 'ml-1 user-rating' : 'user-rating'} title='Rate this book'>
                <IoIosStarOutline size={17} color={theme === 'dark' ? '#9309BF' : '#F44A65'} />
              </span>
            }
          </p>
          <h3 className='book-card-title'>
            <Link className='link-hover' to={`/books/${data._id}`}>
              {data.title}
            </Link>
          </h3>
          <p className='book-card-author'>
            <Link className='link-hover text-secondary' to={`/authors/${data.author._id}`}>
              {data.author.name}
            </Link>
          </p>
        </div>
        <div
          onClick={() => clickHandle(data._id)}
          className="add-to-library">
          <IoIosAdd size={18} />
          <span>Add to library</span>
        </div>
      </div>
    </div>
  )
}

export default BookCard;