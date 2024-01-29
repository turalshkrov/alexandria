import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/theme/ThemeContext";

export default function Footer() {
  const theme = useContext(ThemeContext)
  return (
    <footer className={`footer footer-${theme?.theme} pb-5 pb-md-3`} id="footer">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 pb-2 pb-md-0">
            <h3 className="footer-header">Pages</h3>
            <ul className="footer-social-list">
              <li>
                <a href="/">
                  <FaFacebookF />
                </a>
              </li>
              <li>
                <a href="/">
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a href="/">
                  <FaLinkedinIn />
                </a>
              </li>
              <li>
                <a href="/">
                  <FaInstagram />
                </a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-4 pb-2 pb-md-0">
            <h3 className="footer-header">Explore</h3>
            <ul>
              <li>
                <Link to='/about'>About Us</Link>
              </li>
              <li>
                <Link to='/services'>Services</Link>
              </li>
              <li>
                <Link to='/appointments'>Appointments</Link>
              </li>
              <li>
                <Link to='/contact'>Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-4 pb-2 pb-md-0">
            <h3 className="footer-header">Keep in touch</h3>
            <div className="row">
              <div className="col-4 mb-1">Address :</div>
              <div className="col-8 mb-1">Baku, Azerbaijan</div>
              <div className="col-4 mb-1">Mail :</div>
              <div className="col-8 mb-1">turalhsh@code.edu.az</div>
              <div className="col-4 mb-1">Phone :</div>
              <div className="col-8 mb-1">+994 55 859 38 78</div>
            </div>
          </div>
        </div>
        <hr className="my-2" />
        <p className="text-center">
          Designed and developed by <a href="/" className="fw-bold">turalshkrov</a>
        </p>
      </div>
    </footer>
  )
}
