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
import Preloader from "@/shared/components/preloader/Preloader";
import "./index.scss";

const Account = () => {
  const userRole = useAppSelector(state => state.userSlice.role);
  const isLoading = useAppSelector(state => state.userSlice.isLoading);
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(setIsOpen({ id: 'signout', isOpen: true }));
  }
  const [ showTab, setShowTab ] = useState('profile');
  return (
    <>
    {
      isLoading ?
      <Preloader /> :
      <div className="page">
        <div className="container py-2">
          <div className="row">
            <aside className="col-3 d-n d-md-b">
              <p className="text-secondary font-sm">Settings</p>
              <p className={`aside-link ${showTab === 'profile' && 'aside-link-active'} d-f align-items-center br-1`}
                onClick={() => setShowTab('profile')}>
                <MdPerson size={18} className="mr-1 text-secondary" />
                <span>profile</span>
              </p>
              <p className={`aside-link ${showTab === 'theme' && 'aside-link-active'} d-f align-items-center br-1`}
                onClick={() => setShowTab('theme')}>
                <MdBrush size={18} className="mr-1 text-secondary" />
                <span>theme</span>
              </p>
              <div className="br"></div>
              <p className="text-secondary font-sm">Login & security</p>
              <p className={`aside-link ${showTab === 'mail-update' && 'aside-link-active'} d-f align-items-center br-1`}
                onClick={() => setShowTab('mail-update')}>
                <MdMail size={18} className="mr-1 text-secondary" />
                <span>update mail</span>
              </p>
              <p className={`aside-link ${showTab === 'password-update' && 'aside-link-active'} d-f align-items-center br-1`}
                onClick={() => setShowTab('password-update')}>
                <BsShieldLockFill size={18} className="mr-1 text-secondary" />
                <span>update password</span>
              </p>
              {
                userRole === 'admin' &&
                <Link to='/admin-dashboard/index' className="d-b w-100">
                  <MdAdminPanelSettings size={18} className="mr-1 text-secondary" />
                  <span>admin dashboard</span>
                </Link>
              }
              <div className="br"></div>
              <p className="text-secondary font-sm">Information</p>
              <p className={`aside-link ${showTab === 'about' && 'aside-link-active'} d-f align-items-center br-1`}
                onClick={() => setShowTab('about')}>
                <MdInfo size={18} className="mr-1 text-secondary" />
                <span>about alexandria</span>
              </p>
              <p className={`aside-link ${showTab === 'account' && 'aside-link-active'} d-f align-items-center br-1`}
                onClick={() => setShowTab('account')}>
                <MdSettings size={18} className="mr-1 text-secondary" />
                <span>account</span>
              </p>
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
    }
    </>
  )
}

export default Account;
