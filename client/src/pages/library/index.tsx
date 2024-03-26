import { useAppSelector } from '@/hooks/hook';
import { MdPerson } from "react-icons/md";
import './index.scss';
import { Link } from 'react-router-dom';

const Library = () => {
  const user = useAppSelector(state => state.userSlice.user);
  return (
    <div className='page'>
      <div className="container px-md-3">
        <div className="library-header w-100 d-f justify-space-between align-items-center py-1">
          <h2 className='m-0'>Your Library</h2>
          <div className="">
            <Link to='/account' className='d-f align-item-center'>
              <MdPerson size={24}/>
              <h3 className='ml-1 mb-0 fw-regular'>{ user?.name }</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Library;