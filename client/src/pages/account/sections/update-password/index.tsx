/* eslint-disable @typescript-eslint/no-explicit-any */
import { updatePassword } from "@/api/user";
import { useState } from "react";
import { toast } from "sonner";


const UpdatePasswordSection = () => {
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleChange = (e: any) => {
    const inputNmae = e.target.name;
    const value = e.target.value;
    setFormData(state => ({ ...state, [inputNmae]: value }));
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (formData.password.length >= 8 && formData.newPassword.length) {
        if (formData.newPassword !== formData.confirmPassword) throw new Error("Confirm password is incorrect");
        setFormData({
          password: "",
          newPassword: "",
          confirmPassword: "",
        });
        await updatePassword(formData.password, formData.newPassword);
        toast.success('Password changed');
      } else {
        toast.error('Enter valid password')
      }
    } catch (error: any) {
      toast.error("incorrect password");
    }
  }
  return (
    <div className='section mt-3 mt-md-2 px-1' id="account">
      <h2 className='fw-regular'>Update Password</h2>
      <div className="br"></div>
      <form className="form-control">
        <div className="form-item">
          <label htmlFor="current-email">Your current password</label>
          <input
          name="password"
            type="password"
            value={formData.password}
            className="w-100 w-md-50"
            onChange={handleChange} />
        </div>
      </form>
      <form className="form-control">
        <div className="form-item">
          <label htmlFor="new-email">New Password</label>
          <input
          name="newPassword"
            type="password"
            value={formData.newPassword}
            className="w-100 w-md-50"
            onChange={handleChange} />
          <p className="info-text text-secondary">* Password can be at least 8 and at most 32 characters long.</p>
          <p className="info-text text-secondary">* Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.</p>
        </div>
        <div className="form-item">
          <label htmlFor="new-email">Confirm New Password</label>
          <input
          name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            className="w-100 w-md-50"
            onChange={handleChange} />
        </div>
        <button className="account-btn success-btn br-1" onClick={handleSubmit}>Change password</button>
      </form>
    </div>
  )
}

export default UpdatePasswordSection;