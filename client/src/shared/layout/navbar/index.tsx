import { Link, NavLink } from "react-router-dom";
import { MdHomeFilled, MdSearch, MdArticle, MdPerson } from "react-icons/md";
import "./index.scss";
import { useAppSelector } from "@/hooks/hook";

export default function Navbar() {
  const isAuth = useAppSelector(state => state.authSlice.isAuth);
  return (
    <header className='navbar navbar-mobile' id="header">
      <div className="container">
        <div className="nav-logo">
          <Link to='/'>
            <span>Alexandria</span>
          </Link>
        </div>
        <nav className="nav-menu nav-menu-mobile">
          <ul className="nav-list-mobile">
            <li>
              <NavLink to='/' className='nav-link'>
                <MdHomeFilled className='nav-mobile-icon'/>
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/search" className="nav-link">
                <MdSearch className='nav-mobile-icon'/>
                <span>Search</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/blogs" className="nav-link">
                <MdArticle className='nav-mobile-icon'/>
                <span>Blogs</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={isAuth ? `/profile` : '/login'} className="nav-link">
                <MdPerson className="nav-mobile-icon"/>
                <span>Profile</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
