import React from 'react';
import { MdHomeFilled, MdSearch, MdFormatQuote, MdPerson } from "react-icons/md";

export default function Navbar() {
  return (
    <header className="navbar navbar-mobile navbar-mobile-dark">
      <div className="container">
        <div className="nav-logo">
          <a href="/">Alexandria</a>
        </div>
        <nav className="nav-menu nav-menu-mobile">
          <ul className="nav-list-mobile">
            <li>
              <a href="/" className="nav-link active">
                <MdHomeFilled className='nav-mobile-icon'/>
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="/" className="nav-link">
                <MdSearch className='nav-mobile-icon'/>
                <span>Search</span>
              </a>
            </li>
            <li>
              <a href="/" className="nav-link">
                <MdFormatQuote className='nav-mobile-icon'/>
                <span>Blogs</span>
              </a>
            </li>
            <li>
              <a href="/" className="nav-link">
                <MdPerson className='nav-mobile-icon'/>
                <span>Profile</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
