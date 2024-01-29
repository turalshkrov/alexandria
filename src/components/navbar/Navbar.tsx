import { useContext } from "react";
import { ThemeContext } from '../../contexts/theme/ThemeContext';
import { NavLink } from "react-router-dom";
import { MdHomeFilled, MdSearch, MdArticle, MdPerson } from "react-icons/md";

export default function Navbar() {
  const theme = useContext(ThemeContext);
  return (
    <header className={`navbar navbar-mobile navbar-mobile-${theme?.theme}`} id="header">
      <div className="container">
        <div className="nav-logo">
          <span>Alexandria</span>
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
              <NavLink to="/profile" className="nav-link">
                <MdPerson className='nav-mobile-icon'/>
                <span>Profile</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
