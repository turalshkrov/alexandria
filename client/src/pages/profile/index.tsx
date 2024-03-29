import Preloader from "@/shared/components/preloader/Preloader";
import ErrorPage from "../error";
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/hooks/hook';
import { BiSolidBadgeCheck } from "react-icons/bi";
import { MdMail, MdLocationOn, MdCalendarMonth } from "react-icons/md";
import { HiOutlineExternalLink } from 'react-icons/hi';
import UserFavoriteBooks from "../user/user-favorite-books";
import '../user/index.scss';
import UserLists from "../user/user-lists";
import UserFavoriteAuthors from "../user/user-favorite-authors";

const Profile = () => {
  const data = useAppSelector(state => state.userSlice);
  const joinedDate = new Date(String(data.user?.createdAt));
  return (
    data.isLoading ? <Preloader /> :
    data.error ? <ErrorPage/> :
    <div className='page pt-2' id="profile">
      <div className="container w-xl-75">
        <div className="row align-items-start">
          <div className="col-12 col-md-3 row">
            <div className="profile-image br-full col-4 col-md-12">
              <img className="w-100 br-full" src={data.user?.profileImage || 'https://rb.gy/mygjaa'} alt="" />
            </div>
            <div className="user-info col-8 px-2 px-md-0 mt-1 mt-sm-2 col-md-12">
              <h3 className="name d-f align-items-center">
                {data.user?.name}
                {data.user?.verified && <BiSolidBadgeCheck size={14}/>}
              </h3>
              <p className="username text-secondary mb-md-1">{data.user?.username}</p>
              <Link to='/account' className="link-to-account btn btn-sm w-100 d-f align-items-center justify-center">
                Account
                <HiOutlineExternalLink/>
              </Link>
            </div>
            <div className="col-12 user-details mt-2">
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
          <div className="col-12 col-md-9 px-0 px-md-1 px-lg-3 mt-2 mt-md-0">
            {
              data.user && data.lists && data.lists.length > 0 &&
              <UserLists username={data.user?.name} lists={data.lists} showCreate={true} />
            }
            {
              data.user && data.user?.favoriteBooks.length > 0 && 
              <UserFavoriteBooks username={data.user?.name} books={data.user.favoriteBooks} />
            }
            {
              data.user && data.user.favoriteAuthors.length > 0 &&
              <UserFavoriteAuthors username={data.user?.name} authors={data.user.favoriteAuthors} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
