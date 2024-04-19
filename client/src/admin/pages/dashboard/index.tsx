import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { useEffect } from "react";
import { MdPeople, MdOutlineCalendarMonth } from "react-icons/md";
import { AiFillPlusCircle } from "react-icons/ai";
import { getUsersStats } from "@/admin/redux/slices/statsSlice";
import { getUsers } from "@/admin/redux/slices/usersSlice";
import { getBooks } from "@/admin/redux/slices/booksSlice";
import { getAuthors } from "@/admin/redux/slices/authorsSlice";
import { getSeries } from "@/admin/redux/slices/seriesSlice";
import "./index.scss";

export default function Admin() {
  const dispatch = useAppDispatch();
  const stats = useAppSelector(state => state.statsSlice);
  useEffect(() => {
    dispatch(getUsersStats());
    dispatch(getUsers());
    dispatch(getBooks());
    dispatch(getAuthors());
    dispatch(getSeries());
  }, [dispatch]);
  return (
    <div className='dashboard-content p-2'>
      <h2 className="ml-2 mt-2">Users</h2>
      <div className="row">
        <div className="dashboard-item col-4 p-2">
          <div className="dashboard-card p-2 d-f align-items-center">
            <div className="dashboard-card-icon br-full mr-2" style={{ backgroundColor: '#311e61' }}>
              <MdPeople size={22} color="#cb3cff" />
            </div>
            <div className="dashboard-card-info">
              <p className="mb-sm">
                Total users
              </p>
              <h3 className="m-0">
                {stats.userStats.totalUsers}
              </h3>
            </div>
          </div>
        </div>
        <div className="dashboard-item col-4 p-2">
          <div className="dashboard-card p-2 d-f align-items-center">
            <div className="dashboard-card-icon br-full mr-2" style={{ backgroundColor: '#3b3736' }}>
              <MdOutlineCalendarMonth size={22} color="#fdb52a" />
            </div>
            <div className="dashboard-card-info">
              <p className="mb-sm">
                Monthly users
              </p>
              <h3 className="m-0">
                {stats.userStats.monthlyUsers}
              </h3>
            </div>
          </div>
        </div>
        <div className="dashboard-item col-4 p-2">
          <div className="dashboard-card p-2 d-f align-items-center">
            <div className="dashboard-card-icon br-full mr-2" style={{ backgroundColor: '#0a3942' }}>
              <AiFillPlusCircle size={23} color="#05c168" />
            </div>
            <div className="dashboard-card-info">
              <p className="mb-sm">
                New sign ups
              </p>
              <h3 className="m-0">
                {stats.userStats.newUsers}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <h2 className="ml-2 mt-2">User activity</h2>
      <div className="row">
        <div className="dashboard-item col-4 p-2">
          <div className="dashboard-card p-2 d-f align-items-center">
            <div className="dashboard-card-icon br-full mr-2" style={{ backgroundColor: '#311e61' }}>
              <MdPeople size={22} color="#cb3cff" />
            </div>
            <div className="dashboard-card-info">
              <p className="mb-sm">
                Total users
              </p>
              <h3 className="m-0">
                {stats.userStats.totalUsers}
              </h3>
            </div>
          </div>
        </div>
        <div className="dashboard-item col-4 p-2">
          <div className="dashboard-card p-2 d-f align-items-center">
            <div className="dashboard-card-icon br-full mr-2" style={{ backgroundColor: '#3b3736' }}>
              <MdOutlineCalendarMonth size={22} color="#fdb52a" />
            </div>
            <div className="dashboard-card-info">
              <p className="mb-sm">
                Monthly users
              </p>
              <h3 className="m-0">
                {stats.userStats.monthlyUsers}
              </h3>
            </div>
          </div>
        </div>
        <div className="dashboard-item col-4 p-2">
          <div className="dashboard-card p-2 d-f align-items-center">
            <div className="dashboard-card-icon br-full mr-2" style={{ backgroundColor: '#0a3942' }}>
              <AiFillPlusCircle size={23} color="#05c168" />
            </div>
            <div className="dashboard-card-info">
              <p className="mb-sm">
                New sign ups
              </p>
              <h3 className="m-0">
                {stats.userStats.newUsers}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
