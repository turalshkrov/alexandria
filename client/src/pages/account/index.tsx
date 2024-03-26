import { MdPerson, MdSettings, MdBrush, MdMail, MdInfo, MdCookie, MdAdminPanelSettings } from "react-icons/md";
import { BsShieldLockFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./index.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { logOut } from "@/redux/slices/userSlice";

const settingsLinks = 
[ { label: "profile", icon: <MdPerson size={18} className="mr-1 text-secondary" /> },
  { label: "account", icon: <MdSettings size={18} className="mr-1 text-secondary" /> },
  { label: "theme", icon: <MdBrush size={18} className="mr-1 text-secondary" /> } ];

const loginLinks = 
[ { label: "update mail", icon: <MdMail size={18} className="mr-1 text-secondary" /> },
  { label: "update password", icon: <BsShieldLockFill size={18} className="mr-1 text-secondary" /> } ];

const infoLinks = 
[ { label: "about alexandria", icon: <MdInfo size={18} className="mr-1 text-secondary" /> },
  { label: "coockies", icon: <MdCookie size={18} className="mr-1 text-secondary" /> } ];

const Account = () => {
  const userRole = useAppSelector(state => state.userSlice.role);
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(logOut());
    location.reload();
  }

  return (
    <div className="page">
      <div className="container my-2">
        <div className="row">
          <aside className="col-3 d-n d-md-b">
            <p className="text-secondary font-sm">Settings</p>
            {
              settingsLinks.map(link => (
                <Link to={`#${link.label}`} key={link.label} className="d-f align-items-center br-1">
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))
            }
            {
              userRole === 'admin' &&
              <Link to='/admin' className="d-f align-items-center br-1">
                <MdAdminPanelSettings size={18} className="mr-1 text-secondary"/>
                <span>Admin Dashboard</span>
              </Link>
            }
            <div className="br"></div>
            <p className="text-secondary font-sm">Login & security</p>
            {
              loginLinks.map(link => (
                <Link to={`#${link.label}`} key={link.label} className="d-f align-items-center br-1">
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))
            }
            <div className="br"></div>
            <p className="text-secondary font-sm">Information</p>
            {
              infoLinks.map(link => (
                <Link to={`#${link.label}`} key={link.label} className="d-f align-items-center br-1">
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))
            }
            <p className="mt-2 sign-out" onClick={handleLogOut}>Sign out</p>
          </aside>
          <div className="col-12 col-md-9 px-md-2">

          </div>
        </div>
      </div>
    </div>
  )
}

export default Account;
