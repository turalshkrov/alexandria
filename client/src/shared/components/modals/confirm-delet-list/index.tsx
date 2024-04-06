import { setIsOpen } from '@/redux/slices/ModalSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { modalIsOpenSelector } from '@/redux/selectors';
import { setSelectedList } from '@/redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { createPortal } from 'react-dom';
import { deleteList } from '@/redux/slices/userListsSlice';

export default function ConfirmDeleteList (){
  const navigate = useNavigate();
  const isOpen = useAppSelector(state => modalIsOpenSelector(state, 'confirmDeleteList'));
  const selectedList = useAppSelector(state => state.userSlice.selectedList);
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hideModal = (e: any) => {
    const target = e.target;
    if (target.classList.contains('modal') ||
      target.classList.contains('hide-modal')) {
      dispatch(setIsOpen({ id: 'confirmDeleteList', isOpen: false }));
      dispatch(setSelectedList(null));
    }
  }
  const handleSumbit = async () => {
    dispatch(setIsOpen({ id: 'confirmDeleteList', isOpen: false }));
    toast.promise(dispatch(deleteList(selectedList || "")), {
      loading: 'Loading...',
      success: 'List deleted',
      error: 'Somethings get wrong',
    })
    navigate('/profile');
  }
  return (
    createPortal(<div className={isOpen ? 'modal show' : 'modal'} id='confirm-delete-list' onClick={hideModal}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header d-f justify-space-between align-items-center">
            <div className="modal-title">
              <h3 className=" m-0">
                Delete this list?
              </h3>
            </div>
            <div className="hide-modal" onClick={hideModal}>
              &times;
            </div>
          </div>
        </div>
        <div className="modal-footer d-f align-items-center justify-flex-end mt-3">
          <button className="modal-btn cancel-btn hide-modal">Cancel</button>
          <button className="modal-btn ml-1" onClick={handleSumbit}>Delete</button>
        </div>
      </div>
    </div>, document.body)
  )
}