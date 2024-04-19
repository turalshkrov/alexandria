import { setIsOpen } from '@/redux/slices/ModalSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { modalIsOpenSelector } from '@/redux/selectors';
import { toast } from 'sonner';
import { createPortal } from 'react-dom';
import { deleteAuthor, setSelectedAuthor } from '@/admin/redux/slices/authorsSlice';

export default function ConfirmDeleteAuthor (){
  const isOpen = useAppSelector(state => modalIsOpenSelector(state, 'confirmDeleteAuthor'));
  const selectedAuthor = useAppSelector(state => state.authorsSlice.selected);
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hideModal = (e: any) => {
    const target = e.target;
    if (target.classList.contains('modal') ||
      target.classList.contains('hide-modal')) {
      dispatch(setIsOpen({ id: 'confirmDeleteAuthor', isOpen: false }));
      dispatch(setSelectedAuthor(null));
    }
  }
  const handleSumbit = async () => {
    dispatch(setIsOpen({ id: 'confirmDeleteAuthor', isOpen: false }));
    toast.promise(dispatch(deleteAuthor(selectedAuthor?._id || "")).unwrap(), {
      loading: 'Loading...',
      success: 'Book deleted',
      error: 'Somethings get wrong',
    });
    dispatch(setSelectedAuthor(null));
  }
  return (
    createPortal(<div className={isOpen ? 'modal show' : 'modal'} onClick={hideModal}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header d-f justify-space-between align-items-center">
            <div className="modal-title">
              <h3 className=" m-0">
                Delete this author?
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