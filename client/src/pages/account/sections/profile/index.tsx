/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { updateProfile } from "@/redux/slices/userSlice";
import { useEffect, useRef, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { toast } from "sonner";

const ProfileSection = () => {
  const profileImageRef = useRef<HTMLInputElement>(null);
  const user = useAppSelector(state => state.userSlice.user);
  const [ userEditForm, setUserEditForm ] = useState({
    name: user?.name,
    username: user?.username,
    location: user?.location,
    profileImage: user?.profileImage
  });
  const dispatch = useAppDispatch();
  const profileImageClcik = (e: any) => {
    e.preventDefault();
    profileImageRef.current?.click();
  }
  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileRaeder = new FileReader();
      fileRaeder.readAsDataURL(file);
      fileRaeder.onload = () => {
        resolve(fileRaeder.result);
      }
      fileRaeder.onerror = () => {
        reject(fileRaeder.error);
      }
    });
  }
  const handleChage = (e: any) => {
    const inputName = e.target.name;
    const value = e.target.value;
    setUserEditForm(state => ({ ...state, [inputName]: value }));
  }
  const handleProfileImageChange = async (e: any) => {
    const inputName = e.target.name;
    const value = await convertToBase64(e.target.files[0]);
    setUserEditForm(state => ({ ...state, [inputName]: value }));
  }
  useEffect(() => {
    setUserEditForm({
      name: user?.name,
      username: user?.username,
      location: user?.location,
      profileImage: user?.profileImage
    })
  }, [ user ]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    toast.promise(dispatch(updateProfile(userEditForm)).unwrap(), {
      loading: 'Loading...',
      success: 'Profile updated',
      error: 'Somethings get wrong'
    });
  }
  return (
    <div className='section mt-md-2 px-1' id="profile">
      <h2 className='fw-regular'>Prfoile Settings</h2>
      <div className="br"></div>
      <form className="form-control profile-edit-form">
        <div className="form-item">
          <label htmlFor="profile-image">Profile image</label>
          <input
            value={""}
            accept="image/png, image/gif, image/jpeg"
            type="file"
            name="profileImage"
            id="profile-image"
            ref={profileImageRef}
            className="d-n"
            onChange={handleProfileImageChange}/>
        </div>
        <div className="profile-image-item">
          <div className="profile-image-container br-full" style={{background: `url(${userEditForm.profileImage || 'https://rb.gy/mygjaa'})`}}>
          </div>
          <button 
            className="update-image-btn mt-1 br-1"
            onClick={profileImageClcik}>
            <MdModeEdit />
            Update image
          </button>
        </div>
        <div className="form-item mt-1">
          <label htmlFor="profile-edit-name">Name</label>
          <input 
            id="profile-edit-name"
            name="name" type="text"
            className="w-100 w-md-50"
            value={userEditForm.name}
            onChange={handleChage}/>
          <p className="text-info text-secondary">* Name can only contain letters and spaces</p>
        </div>
        <div className="form-item mt-1">
          <label htmlFor="profile-edit-username">Username</label>
          <input
            id="profile-edit-username"
            name="username"
            type="text"
            className="w-100 w-md-50"
            value={userEditForm.username}
            onChange={handleChage}/>
          <p className="text-info text-secondary">* Username can only contain letters of the alphabet and numbers</p>
        </div>
        <div className="form-item mt-1">
          <label htmlFor="profile-edit-location">Location</label>
          <input
            id="profile-edit-location"
            name="location"
            type="text"
            className="w-100 w-md-50"
            value={userEditForm.location}
            onChange={handleChage}/>
        </div>
        <button className="edit-profile-btn br-1 text-light" onClick={handleSubmit}>
          Update profile
        </button>
      </form>
    </div>
  )
}

export default ProfileSection;