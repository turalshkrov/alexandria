import { MdPerson, MdSettings, MdBrush, MdMail, MdInfo, MdAdminPanelSettings } from "react-icons/md";
import { BsShieldLockFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setIsOpen } from "@/redux/slices/ModalSlice";
import { useState } from "react";
import ProfileSection from "./sections/profile";
import AccountSection from "./sections/account";
import ThemeSection from "./sections/theme";
import UpdateEmailSection from "./sections/update-email";
import UpdatePasswordSection from "./sections/update-password";
import AboutSection from "./sections/about";
import "./index.scss";

const settingsLinks = 
[ { label: "profile", icon: <MdPerson size={18} className="mr-1 text-secondary" />, id: "profile" },
  { label: "theme", icon: <MdBrush size={18} className="mr-1 text-secondary" />, id: "theme" } ];

const loginLinks = 
[ { label: "update mail", icon: <MdMail size={18} className="mr-1 text-secondary" />, id: "mail-update" },
  { label: "update password", icon: <BsShieldLockFill size={18} className="mr-1 text-secondary" />, id: "password-update" } ];

const infoLinks = 
[ { label: "about alexandria", icon: <MdInfo size={18} className="mr-1 text-secondary" />, id: "about" } ];

const accountLinks = 
[ { label: "account", icon: <MdSettings size={18} className="mr-1 text-secondary" />, id: "account" }, ];
const Account = () => {
  const userRole = useAppSelector(state => state.authSlice.role);
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(setIsOpen({ id: 'signout', isOpen: true }));
  }
  const [ showTab, setShowTab ] = useState('profile');
  return (
    <div className="page">
      <div className="container py-2">
        <div className="row">
          <aside className="col-3 d-n d-md-b">
            <p className="text-secondary font-sm">Settings</p>
            {
              settingsLinks.map(link => (
                <p 
                  key={link.label} 
                  className={`aside-link ${showTab === link.id && 'aside-link-active'} d-f align-items-center br-1`}
                  onClick={() => setShowTab(link.id)}>
                  {link.icon}
                  <span>{link.label}</span>
                </p>
              ))
            }
            {
              userRole === 'admin' &&
              <Link to='/admin' className="aside-link d-f align-items-center br-1">
                <MdAdminPanelSettings size={18} className="mr-1 text-secondary"/>
                <span>Admin Dashboard</span>
              </Link>
            }
            <div className="br"></div>
            <p className="text-secondary font-sm">Login & security</p>
            {
              loginLinks.map(link => (
                <p 
                  key={link.label} 
                  className={`aside-link ${showTab === link.id && 'aside-link-active'} d-f align-items-center br-1`}
                  onClick={() => setShowTab(link.id)}>
                  {link.icon}
                  <span>{link.label}</span>
                </p>
              ))
            }
            <div className="br"></div>
            <p className="text-secondary font-sm">Information</p>
            {
              infoLinks.map(link => (
                <p 
                  key={link.label} 
                  className={`aside-link ${showTab === link.id && 'aside-link-active'} d-f align-items-center br-1`}
                  onClick={() => setShowTab(link.id)}>
                  {link.icon}
                  <span>{link.label}</span>
                </p>
              ))
            }
            <div className="br"></div>
            <p className="text-secondary font-sm">Account</p>
            {
              accountLinks.map(link => (
                <p 
                  key={link.label} 
                  className={`aside-link ${showTab === link.id && 'aside-link-active'} d-f align-items-center br-1`}
                  onClick={() => setShowTab(link.id)}>
                  {link.icon}
                  <span>{link.label}</span>
                </p>
              ))
            }
            <p className="mt-2 sign-out" onClick={handleLogOut}>Sign out</p>
          </aside>
          <div className="col-12 col-md-9 px-md-2">
            <div className={showTab === 'profile' ? 'd-b' : 'd-b d-md-n'}>
              <ProfileSection />
            </div>
            <div className={showTab === 'theme' ? 'd-b' : 'd-b d-md-n'}>
              <ThemeSection />
            </div>
            <div className={showTab === 'mail-update' ? 'd-b' : 'd-b d-md-n'}>
              <UpdateEmailSection />
            </div>
            <div className={showTab === 'password-update' ? 'd-b' : 'd-b d-md-n'}>
              <UpdatePasswordSection />
            </div>
            <div className={showTab === 'about' ? 'd-b' : 'd-b d-md-n'}>
              <AboutSection />
            </div>
            <div className={showTab === 'account' ? 'd-b' : 'd-b d-md-n'}>
              <AccountSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account;
