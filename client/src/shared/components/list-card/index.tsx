import { ListType } from '@/types';
import { Link } from 'react-router-dom';
import { BiSolidBadgeCheck } from "react-icons/bi";
import './index.scss';

interface listCardProps {
  list: ListType
}

const ListCard = ({ list } : listCardProps) => {
  return (
    <div className='list-item col-6 col-md-3 p-1 p-xxl-2'>
      <div className="list-card">
        <Link className='list-title link-hover' to={`/lists/${list._id}`}>
          <div className="list-cover-container w-100 p-relative">
            {
              list?.books.length ?
              <img src={list.books[0].cover} className="list-cover-main-img" /> :
              <div className="list-cover-main-img-empty"></div>
            }
            <div className="list-cover-bg-book-1"></div>
            <div className="list-cover-bg-book-2"></div>
          </div>
        </Link>
        <div className="list-card-footer mt-1">
          <div className="list-info">
            <Link className='list-title link-hover' to={`/lists/${list._id}`}>
              {list.title}
            </Link>
            <p className='list-author text-secondary d-f align-items-center'>
              {list.user.name}
              {list.user.username === 'alexandria' && <BiSolidBadgeCheck size={12}/>}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListCard;