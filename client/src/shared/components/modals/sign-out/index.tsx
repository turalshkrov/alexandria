import { setIsOpen } from '@/redux/slices/ModalSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { modalIsOpenSelector } from '@/redux/selectors';
import { toast } from 'sonner';
import { createPortal } from 'react-dom';
import { logOut } from '@/redux/slices/authSlice';

export default function SignOut (){
  const isOpen = useAppSelector(state => modalIsOpenSelector(state, 'signout'));
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hideModal = (e: any) => {
    const target = e.target;
    if (target.classList.contains('modal') ||
      target.classList.contains('hide-modal')) {
      dispatch(setIsOpen({ id: 'signout', isOpen: false }));
    }
  }
  const signOut = async () => {
    dispatch(setIsOpen({ id: 'signout', isOpen: false }));
    dispatch(logOut());
    toast.success('Signed out');
    location.reload();
  }
  return (
    createPortal(<div className={isOpen ? 'modal show' : 'modal'} id='confirm-delete-list' onClick={hideModal}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header d-f justify-space-between align-items-center">
            <div className="modal-title">
              <h3 className=" m-0">
                Sign out?
              </h3>
            </div>
            <div className="hide-modal" onClick={hideModal}>
              &times;
            </div>
          </div>
        </div>
        <p className='mt-1'>Are you sure want to sign out?</p>
        <div className="modal-footer d-f align-items-center justify-flex-end mt-3">
          <button className="modal-btn cancel-btn hide-modal">Cancel</button>
          <button className="modal-btn ml-1" onClick={signOut}>Sign out</button>
        </div>
      </div>
    </div>, document.body)
  )
}