import React from 'react'
import { Link } from 'react-router-dom';
import "./index.scss";

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

const BookCard: React.FC<bookCardProps> = ({ data }) => {
  return (
    <div className="book-item col-6 col-md-4 col-lg-3 p-md-1">
      <Link to={`/books/${data.id}`}>
        <div className="book-card p-md-1 w-100 text-center">
          <img src={data.cover} alt={data.title} className="book-cover w-75 w-md-50" />
          <div className="book-info mt-1">
            <h3 className='book-card-title link-hover'>
              {data.title}
            </h3>
            <p className='book-card-author'>
              {data.author.fullName}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default BookCard;