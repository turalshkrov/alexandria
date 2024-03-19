import React from 'react'
import { Link } from 'react-router-dom';
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import "./index.scss";
import { useAppSelector } from '@/hooks/hook';

interface bookCardProps {
  data: {
    id: string,
    title: string,
    rating?: number,
    userRating?: number,
    author: {
      id: string,
      fullName: string,
    },
    cover: string,
  }
}

const BookCard: React.FC<bookCardProps> = ({ data }) => {
  const theme = useAppSelector(state => state.ThemeSlice.theme);
  const clickHandle: (id: string) => void = (id) => {
    console.log(id);
  }
  return (
    <div className="book-item col-6 col-md-4 col-lg-2 p-md-1">
      <div className="book-card p-md-1 w-100">
        <Link to={`/books/${data.id}`}>
          <img src={data.cover} alt={data.title} className="book-cover w-100" />
        </Link>
        <div className="book-info mt-2">
          <p className="book-card-rating d-f align-items-center">
            <IoIosStar size={17} color='#f5c518' />
            <span className='rating-value'>{data.rating && Number.isInteger(data.rating) ? data.rating + '.0' : data.rating}</span>
            {
              data.userRating
                ? <span className='ml-1 d-f align-items-center user-rating'>
                  <IoIosStar size={17} className='' color={theme === 'dark' ? '#9309BF' : '#F44A65'} />
                  <span className='rating-value'>{data.userRating}</span>
                </span>
                : <span className='ml-1 user-rating'>
                  <IoIosStarOutline size={17} className='ml-1' color={theme === 'dark' ? '#9309BF' : '#F44A65'} />
                </span>
            }
          </p>
          <h3 className='book-card-title'>
            <Link className='link-hover' to={`/books/${data.id}`}>
              {data.title}
            </Link>
          </h3>
          <p className='book-card-author'>
            <Link className='link-hover text-secondary' to={`/writers/${data.author.id}`}>
              {data.author.fullName}
            </Link>
          </p>
        </div>
        <div
          onClick={() => clickHandle(data.id)}
          className="add-to-library">
          <IoIosAdd size={18} />
          <span>Add to library</span>
        </div>
      </div>
    </div>
  )
}

export default BookCard;