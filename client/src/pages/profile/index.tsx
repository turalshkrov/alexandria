import Preloader from "@/shared/components/preloader/Preloader";
import ErrorPage from "../error";
import ListCard from "@/shared/components/list card";
import ListCardCreate from '@/shared/components/list card create';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/hooks/hook';
import { BiSolidBadgeCheck } from "react-icons/bi";
import { MdMail, MdLocationOn, MdCalendarMonth } from "react-icons/md";
import { HiOutlineExternalLink } from 'react-icons/hi';
import '../user/index.scss';


const Profile = () => {
  const data = useAppSelector(state => state.userSlice);
  const joinedDate = new Date(String(data.user?.createdAt))
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
          <div className="lists col-12 col-md-9 px-0 px-md-1 px-lg-3 mt-2 mt-md-0">
            <div className="list-header mb-1 d-f align-items-center justify-space-between">
              <h3 className="m-0">{data.user?.name}'s lists</h3>
              <Link to='/library' className="link-to-library d-f align-items-center justify-center link-hover">
                Your library
                <HiOutlineExternalLink/>
              </Link>
            </div>
            <div className="list-container row">
              {
                data.lists?.filter((_, i) => i < 5) .map(list => <ListCard key={list._id} list={list}/>) 
              }
              <ListCardCreate />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
