import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "@/api/user";
import { useAppSelector } from "@/hooks/hook";
import { UserType } from "@/types";
import { HiOutlineExternalLink } from "react-icons/hi";
import Preloader from "@/shared/components/preloader/Preloader";
import ErrorPage from "../error";
import "./index.scss";

const User = () => {
  const authId = useAppSelector(state => state.authSlice.userId);  
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
  const params = useParams();
  const userId = params.id;
  useEffect(() => {
    setUser(user => ({...user, isLoading: true }))
    getUserById(userId)
    .then(data => setUser(state => ({...state, data: data, isLoading: false })))
    .catch(error => setUser(state => ({...state, error: error, isLoading: false })))
  }, [ userId ]);
  return (
    user.isLoading ? <Preloader /> :
    user.error ? <ErrorPage/> :
    <div className='page' id="profile">
      <div className="container w-md-75 my-2">
        <div className="row">
          <div className="col-12 col-md-3 col-xl-2 row">
            <div className="profile-image br-full col-4 col-md-12">
              <img className="w-100 br-full" src={user.data?.profileImage || 'https://rb.gy/mygjaa'} alt="" />
            </div>
            <div className="user-info col-8 px-2 px-md-0 mt-1 mt-sm-2 col-md-12">
              <h3 className="name">{user.data?.name}</h3>
              <p className="username text-secondary mb-md-1">{user.data?.username}</p>
              { userId === authId &&
              <Link to='/account'>
                <button 
                  className="link-to-account btn w-100 d-f align-items-center justify-center">
                  Account
                  <HiOutlineExternalLink/>
                  </button>
              </Link>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User;