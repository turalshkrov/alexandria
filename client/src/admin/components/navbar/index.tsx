import { NavLink } from "react-router-dom";
import { MdPerson, MdArticle, MdDashboard } from "react-icons/md";
import { BiSolidBook } from "react-icons/bi";
import { FaPen } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import "./index.scss";

const AdminNavBar = () => {
  return (
    <div className="admin-navbar">
      <aside className='p-2'>
        <h3 className='title mb-2'>Dashboard</h3>
        <NavLink to='admin-dashboard/index' className='d-f align-items-center'>
          <MdDashboard size={18}/>
          Dashboard
        </NavLink>
        <NavLink to='admin-dashboard/users' className='d-f align-items-center'>
          <MdPerson size={18}/>
          Users
        </NavLink>
        <NavLink to='admin-dashboard/books' className='d-f align-items-center'>
          <BiSolidBook size={17}/>
          Books
        </NavLink>
        <NavLink to='admin-dashboard/authors' className='d-f align-items-center'>
          <FaPen size={16}/>
          Authors
        </NavLink>
        <NavLink to='admin-dashboard/series' className='d-f align-items-center'>
          <ImBooks size={18}/>
          Series
        </NavLink>
        <NavLink to='admin-dashboard/blogs' className='d-f align-items-center'>
          <MdArticle size={18}/>
          Blogs
        </NavLink>
      </aside>
    </div>
  )
}

export default AdminNavBar;