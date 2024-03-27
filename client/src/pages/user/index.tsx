import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "@/api/user";
import { useAppSelector } from "@/hooks/hook";
import { UserType, ListType } from "@/types";
import { HiOutlineExternalLink } from "react-icons/hi";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { MdMail, MdLocationOn } from "react-icons/md";
import Preloader from "@/shared/components/preloader/Preloader";
import ErrorPage from "../error";
import "./index.scss";
import { getListsByUser } from "@/api/list";
import ListCard from "@/shared/components/list card";
import ListCardCreate from "@/shared/components/list card create";

const User = () => {
  const authId = useAppSelector(state => state.authSlice.userId); 
  type State = {
    user: UserType | null,
    lists: ListType[],
    isLoading: boolean,
    error: unknown,
  }
  const [ data, setData ] = useState<State>({
    user: null,
    lists: [],
    isLoading: false,
    error: null,
  })
  const params = useParams();
  const userId = params.id;
  useEffect(() => {
    setData(state => ({...state, isLoading: true }))
    getUserById(userId)
      .then(user => setData(state => ({...state, user: user })))
      .catch(error => setData(state => ({...state, error: error })))
    getListsByUser(userId)
      .then(lists => setData(state => ({...state, lists: lists, isLoading: false })))
      .catch(error => setData(state => ({...state, error: error, isLoading: false })))
    
  }, [ userId ]);
  
  return (
    data.isLoading ? <Preloader /> :
    data.error ? <ErrorPage/> :
    <div className='page pt-2' id="profile">
      <div className="container w-xl-75">
        <div className="row">
          <div className="col-12 col-md-3 row">
            <div className="profile-image br-full col-4 col-md-12">
              <img className="w-100 br-full" src={data.user?.profileImage || 'https://rb.gy/mygjaa'} alt="" />
            </div>
            <div className="user-info col-8 px-2 px-md-0 mt-1 mt-sm-2 col-md-12">
              <h3 className="name d-f align-items-center">
                {data.user?.name}
                {data.user?.username === 'alexandria' && <BiSolidBadgeCheck/>}
              </h3>
              <p className="username text-secondary mb-md-1">{data.user?.username}</p>
              { 
                userId === authId &&
                <Link to='/account' className="link-to-account btn btn-sm w-100 d-f align-items-center justify-center">
                  Account
                  <HiOutlineExternalLink/>
                </Link>
              }
            </div>
              <div className="col-12 user-details mt-2">
                <ul>
                  <li className="d-f align-items-center text-secondary user-details-item">
                    <MdMail />
                    {data.user?.email}
                  </li>
                  <li className="d-f align-items-center text-secondary user-details-item">
                    <MdLocationOn />
                    Azerbaijan
                  </li>
                </ul>
              </div>
          </div>
          <div className="lists col-12 col-md-9 px-0 px-md-3 mt-3 mt-md-0">
            <div className="list-header mb-2 d-f align-items-center justify-space-between">
              <h3 className="m-0">{data.user?.name}'s lists</h3>
              { userId === authId &&
                <Link to='/library' className="link-to-library d-f align-items-center justify-center link-hover">
                  Your library
                  <HiOutlineExternalLink/>
                </Link>}
            </div>
            <div className="list-container row">
              {
                userId === authId 
                ? data.lists.filter((_, i) => i < 5) .map(list => <ListCard key={list._id} list={list}/>) 
                : data.lists.map(list => <ListCard key={list._id} list={list}/>)
              }
              {
                userId === authId && <ListCardCreate />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User;