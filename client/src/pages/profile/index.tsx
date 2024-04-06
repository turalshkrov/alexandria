import Preloader from "@/shared/components/preloader/Preloader";
import ErrorPage from "../error";
import UserFavoriteBooks from "../user/user-favorite-books";
import UserLists from "../user/user-lists";
import UserFavoriteAuthors from "../user/user-favorite-authors";
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/hooks/hook';
import { BiSolidBadgeCheck } from "react-icons/bi";
import { MdMail, MdLocationOn, MdCalendarMonth } from "react-icons/md";
import { HiOutlineExternalLink } from 'react-icons/hi';
import '../user/index.scss';

const Profile = () => {
  const userData = useAppSelector(state => state.userSlice);
  const listsData = useAppSelector(state => state.userListsSlice);
  const joinedDate = new Date(String(userData.user?.createdAt));
  return (
    userData.isLoading ? <Preloader /> :
    userData.error ? <ErrorPage/> :
    <div className='page pt-2' id="profile">
      <div className="container w-xl-75">
        <div className="row align-items-start">
          <div className="col-12 col-md-3 row">
            <div className="profile-image br-full col-4 col-md-12" style={{ background: `url(${userData.user?.profileImage || 'https://rb.gy/mygjaa'})` }}>
            </div>
            <div className="user-info col-8 px-2 px-md-0 mt-1 mt-sm-2 col-md-12">
              <h3 className="name d-f align-items-center">
                {userData.user?.name}
                {userData.user?.verified && <BiSolidBadgeCheck size={14}/>}
              </h3>
              <p className="username text-secondary mb-md-1">{userData.user?.username}</p>
              <Link to='/account' className="link-to-account btn btn-sm w-100 d-f align-items-center justify-center">
                Account
                <HiOutlineExternalLink/>
              </Link>
            </div>
            <div className="col-12 user-details mt-2">
              <ul>
                <li className="d-f align-items-center text-secondary user-details-item">
                  <MdMail />
                  {userData.user?.email}
                </li>
                <li className="d-f align-items-center text-secondary user-details-item">
                  <MdLocationOn />
                  {userData.user?.location}
                </li>
                <li className="d-f align-items-center text-secondary user-details-item">
                  <MdCalendarMonth />
                  Joined in {joinedDate.toDateString()}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-md-9 px-0 px-md-1 px-lg-3 mt-2 mt-md-0">
            {
              userData.user && listsData.lists && listsData.lists.length > 0 &&
              <UserLists username={userData.user?.name} lists={listsData.lists} showCreate={true} />
            }
            {
              userData.user && userData.user?.favoriteBooks.length > 0 && 
              <UserFavoriteBooks username={userData.user?.name} books={userData.user.favoriteBooks} />
            }
            {
              userData.user && userData.user.favoriteAuthors.length > 0 &&
              <UserFavoriteAuthors username={userData.user?.name} authors={userData.user.favoriteAuthors} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
