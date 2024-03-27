import { ListType } from '@/types';
import { Link } from 'react-router-dom';
import { BiSolidBadgeCheck } from "react-icons/bi";
import './index.scss';

interface listCardProps {
  list: ListType
}

const ListCard = ({ list } : listCardProps) => {
  return (
    <div className='list-item col-6 col-md-4 col-xl-3 p-1 p-lg-2'>
      <div className="list-card">
        <img src={list.cover || 'https://rb.gy/47il96'} className='w-100 br-1'/>
        <div className="list-card-footer">
          <div className="list-info">
            <Link className='list-title link-hover' to={`lists/${list._id}`}>
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