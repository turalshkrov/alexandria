import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className='footer bg-light'>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 pb-2 pb-md-0">
            <h3 className="footer-header">Pages</h3>
            <ul className="footer-social-list">
              <li>
                <Link to="">
                  <FaFacebookF />
                </Link>
              </li>
              <li>
                <Link to="">
                  <FaTwitter />
                </Link>
              </li>
              <li>
                <Link to="">
                  <FaLinkedinIn />
                </Link>
              </li>
              <li>
                <Link to="">
                  <FaInstagram />
                </Link>
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
                <Link to='/about'>Services</Link>
              </li>
              <li>
                <Link to='/about'>Appointments</Link>
              </li>
              <li>
                <Link to='/about'>Contact Us</Link>
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
      </div>
    </footer>
  )
}
