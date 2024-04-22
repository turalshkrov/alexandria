/* eslint-disable @typescript-eslint/no-explicit-any */
import { setIsOpen } from '@/redux/slices/ModalSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { modalIsOpenSelector } from '@/redux/selectors';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { createPortal } from 'react-dom';
import { deleteAccount } from '@/api/user';
import { useState } from 'react';
import { logOut } from '@/redux/slices/authSlice';

export default function ConfirmDeleteAccount (){
  const [ password, setPassword ] = useState("");
  const navigate = useNavigate();
  const isOpen = useAppSelector(state => modalIsOpenSelector(state, 'confirmDeleteAccount'));
  const dispatch = useAppDispatch();
  const hideModal = (e: any) => {
    const target = e.target;
    if (target.classList.contains('modal') ||
      target.classList.contains('hide-modal')) {
      dispatch(setIsOpen({ id: 'confirmDeleteAccount', isOpen: false }));
    }
  }
  const handleChange = (e: any) => {
    setPassword(e.target.value);
  }
  const handleSubmit = async () => {
    dispatch(setIsOpen({ id: 'confirmDeleteAccount', isOpen: false }));
    try {
      await deleteAccount(password);
      dispatch(logOut());
      navigate('/');
      location.reload();
      toast.success('Account deleted');
    } catch (error) {
      toast.error('Incorrect password');
    }
  }
  return (
    createPortal(<div className={isOpen ? 'modal show' : 'modal'} id='confirm-delete-list' onClick={hideModal}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header d-f justify-space-between align-items-center">
            <div className="modal-title">
              <h3 className=" m-0">
                Delete your account?
              </h3>
            </div>
            <div className="hide-modal" onClick={hideModal}>
              &times;
            </div>
          </div>
          <form className="form-control mt-2">
            <div className="form-item m-0">
              <label htmlFor="password">Confirm your password</label>
              <input
                className='w-100 delete-modal-input'
                type="password"
                value={password} 
                onChange={handleChange}/>
            </div>
          </form>
        </div>
        <div className="modal-footer d-f align-items-center justify-flex-end mt-2">
          <button className="modal-btn cancel-btn hide-modal">Cancel</button>
          <button className="modal-btn ml-1" disabled={password.length < 8} onClick={handleSubmit}>Delete</button>
        </div>
      </div>
    </div>, document.body)
  )
}