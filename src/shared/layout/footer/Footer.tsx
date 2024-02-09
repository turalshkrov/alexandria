import { Link } from "react-router-dom";
import "./Footer.scss";

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className='footer' id="footer">
      <div className="container">
        <ul className="footer-links d-f align-items-end">
          <li>
            <span>{year} Alexandria</span>
          </li>
          <li className="ml-1 ml-md-2">
            <Link to='/about'>About</Link>
          </li>
          <li className="ml-1 ml-md-2">
            <Link to='/contact'>Contact</Link>
          </li>
          <li className="ml-1 ml-md-2">
            <Link to="/privacy">Privacy</Link>
          </li>
          <li className="ml-1 ml-md-2">
            <Link to='/cookies'>Manage Cookies</Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
