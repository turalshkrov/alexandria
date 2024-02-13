import React from 'react'
import { Link } from 'react-router-dom';
import { BsBookmarkPlusFill } from "react-icons/bs";
import "./BookCard.scss";

interface bookCardProps {
  data: {
    id: string,
    title: string,
    author: {
      id: string,
      fullName: string,
    },
    cover: string,
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BookCard: React.FC<bookCardProps> = ({ data }) => {
  return (
  <div className="book-card my-1 d-f">
    <img src={data.cover} alt={data.title} className="book-cover" />
    <div className="card-content w-100 mx-1 d-f justify-space-between">
      <div className="book-info">
        <Link to={`/books/${data.id}`} className='link-hover'>
          <h3 className='book-title'>
            {data.title}
          </h3>
        </Link>
        <p className='book-author'>
          by
          <Link to={`/writers/${data.id}`} className='link-hover'>
            {data.author.fullName}
          </Link>
        </p>
      </div>
      <div className="add-list">
        <BsBookmarkPlusFill size={25}/>
      </div>
    </div>
  </div>
  )
}

export default BookCard;