import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "@/api/user";
import { useAppSelector } from "@/hooks/hook";
import { UserType, ListType } from "@/types";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { MdMail, MdLocationOn, MdCalendarMonth } from "react-icons/md";
import { getListsByUser } from "@/api/list";
import Preloader from "@/shared/components/preloader/Preloader";
import ErrorPage from "../error";
import UserLists from "./user-lists";
import UserFavoriteBooks from "./user-favorite-books";
import UserFavoriteAuthors from "./user-favorite-authors";
import EmptyLibrary from "./empty-library";
import "./index.scss";

const User = () => {
  const authId = useAppSelector(state => state.userSlice.user?._id);
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
  const joinedDate = new Date(String(data.user?.createdAt));
  return (
    userId === authId ? <Navigate to='/profile'/> :
    data.isLoading ? <Preloader /> :
    data.error ? <ErrorPage/> :
    <div className='page pt-2' id="profile">
      <div className="container w-xl-75">
        <div className="row align-items-start">
          <div className="col-12 col-md-3 row">
            <div className="profile-image br-full col-4 col-md-12" style={{ background: `url(${data.user?.profileImage || 'https://rb.gy/mygjaa'})` }}>
            </div>
            <div className="user-info col-8 px-2 px-md-0 mt-1 mt-sm-2 col-md-12">
              <h3 className="name d-f align-items-center">
                {data.user?.name}
                {data.user?.verified && <BiSolidBadgeCheck/>}
              </h3>
              <p className="username text-secondary mb-md-1">{data.user?.username}</p>
            </div>
            <div className="col-12 user-details">
              <ul>
                <li className="d-f align-items-center text-secondary user-details-item">
                  <MdMail />
                  {data.user?.email}
                </li>
                <li className="d-f align-items-center text-secondary user-details-item">
                  <MdLocationOn />
                  {data.user?.location}
                </li>
                <li className="d-f align-items-center text-secondary user-details-item">
                  <MdCalendarMonth />
                  Joined in {joinedDate.toDateString()}
                </li>
              </ul>
            </div>
          </div>
          <div className="lists col-12 col-md-9 px-0 px-md-3 mt-3 mt-md-0">
            {
              data.user && data.lists && data.lists.length > 0 &&
              <UserLists username={data.user?.name} lists={data.lists.filter((_, i) => i < 5)} showCreate={false} />
            }
            {
              data.user && data.user?.favoriteBooks.length > 0 && 
              <UserFavoriteBooks username={data.user?.name} books={data.user.favoriteBooks.filter((_, i) => i < 5)} />
            }
            {
              data.user && data.user.favoriteAuthors.length > 0 &&
              <UserFavoriteAuthors username={data.user?.name} authors={data.user.favoriteAuthors.filter((_, i) => i < 5)} />
            }
            {
              data.user && data.lists && data.lists.length === 0 && 
              data.user?.favoriteBooks.length === 0 && data.user?.favoriteAuthors.length === 0 &&
              <EmptyLibrary />
            }
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default User;