/* eslint-disable @typescript-eslint/no-explicit-any */
import { updateEmail } from "@/api/user";
import { useAppSelector } from "@/hooks/hook";
import { useState } from "react";
import { toast } from "sonner";


const UpdateEmailSection = () => {
  const email = useAppSelector(state => state.userSlice.user?.email);
  const [ newEmail, setNewEmail ] = useState("");
  const handleChange = (e: any) => {
    setNewEmail(e.target.value);
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (newEmail) {
        setNewEmail("");
        await updateEmail(newEmail);
        toast.success('Mail sent, verify email address');
      } else {
        toast.error('Enter valid email')
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  return (
    <div className='section mt-3 mt-md-2 px-1' id="account">
      <h2 className='fw-regular'>Update Email</h2>
      <div className="br"></div>
      <form className="form-control">
        <div className="form-item">
          <label htmlFor="current-email">Your current email address</label>
          <input type="text" value={email} disabled className="w-100 w-md-50 text-secondary"/>
        </div>
      </form>
      <form className="form-control">
        <div className="form-item">
          <label htmlFor="new-email">New email address</label>
          <input
            type="text"
            value={newEmail}
            className="w-100 w-md-50"
            onChange={handleChange}/>
          <p className="info-text text-secondary">* Enter email you can access, verify link will send this email.</p>
        </div>
        <button className="account-btn success-btn br-1" onClick={handleSubmit}>Change email address</button>
      </form>
    </div>
  )
}

export default UpdateEmailSection;