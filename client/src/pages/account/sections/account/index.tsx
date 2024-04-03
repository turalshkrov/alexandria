import { Link } from "react-router-dom";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { useAppDispatch } from "@/hooks/hook";
import { setIsOpen } from "@/redux/slices/ModalSlice";

const AccountSection = () => {
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(setIsOpen({ id: 'signout', isOpen: true }));
  }
  const showDeleteAccountModal = () => {
    dispatch(setIsOpen({
      id: "confirmDeleteAccount",
      isOpen: true,
    }))
  }
  return (
    <div className='section mt-3 mt-md-2 px-1' id="account">
      <h2 className='fw-regular'>Account</h2>
      <div className="br"></div>
      <h3 className="fw-regular">Get help</h3>
      <p className="get-help-text d-f align-items-center">
        <IoMdHelpCircleOutline />
        Having trouble on something?
        <Link to='/contact'>Contact us</Link>
      </p>
      <h3 className="fw-regular mt-2 mt-md-3">Sign out</h3>
      <div className="br"></div>
      <button className="account-btn br-1" onClick={handleLogOut}>Sign out</button>
      <h2 className="delete-text mt-2 mt-md-3">Delete Account</h2>
      <div className="br"></div>
      <p className="">
        Once you delete your account, there is no going back. Please be certain.
      </p>
      <button className="account-btn br-1 delete-text" onClick={showDeleteAccountModal}>Delete your account</button>
    </div>
  )
}

export default AccountSection;