import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/theme/ThemeContext";

export default function Footer() {
  const theme = useContext(ThemeContext);
  const year = new Date().getFullYear()
  return (
    <footer className={`footer footer-${theme?.theme}`} id="footer">
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
