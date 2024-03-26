import { useAppSelector } from '@/hooks/hook';
import { MdPerson } from "react-icons/md";
import './index.scss';
import { Link } from 'react-router-dom';
import { UserType } from '@/types';
import { useEffect, useState } from 'react';
import { getUserById } from '@/api/user';

const Library = () => {
  type State = {
    data: UserType | null,
    isLoading: boolean,
    error: unknown,
  }
  const [ user, setUser ] = useState<State>({
    data: null,
    isLoading: false,
    error: null,
  })
  const userId = useAppSelector(state => state.authSlice.userId);
  useEffect(() => {
    setUser(user => ({...user, isLoading: true }))
    getUserById(userId)
    .then(data => setUser(state => ({...state, data: data, isLoading: false })))
    .catch(error => setUser(state => ({...state, error: error, isLoading: false })))
  }, [ userId ]);
  useEffect
  return (
    <div className='page'>
      <div className="container px-md-3">
        <div className="library-header w-100 d-f justify-space-between align-items-center py-1">
          <h2 className='m-0'>Your Library</h2>
          <div className="">
            <Link to='/account' className='d-f align-item-center'>
              <MdPerson size={24}/>
              <h3 className='ml-1 mb-0 fw-regular'>{ user?.data?.name }</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Library;