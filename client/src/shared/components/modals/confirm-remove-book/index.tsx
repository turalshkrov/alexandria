import { setIsOpen } from '@/redux/slices/ModalSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { modalIsOpenSelector } from '@/redux/selectors';
import { removeBookFromSlice, setSelectedList } from '@/redux/slices/userSlice';
import { removeBookFromList } from '@/api/list';
import { toast } from 'sonner';
import { createPortal } from 'react-dom';

export default function ConfirmRemoveBook (){
  const isOpen = useAppSelector(state => modalIsOpenSelector(state, 'confirmRemoveBook'));
  const selectedList = useAppSelector(state => state.userSlice.selectedList);
  const selectedBook = useAppSelector(state => state.userSlice.selectedBook);
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hideModal = (e: any) => {
    const target = e.target;
    if (target.classList.contains('modal') ||
      target.classList.contains('hide-modal')) {
      dispatch(setIsOpen({ id: 'confirmRemoveBook', isOpen: false }));
      dispatch(setSelectedList(null));
    }
  }
  const removeBook = async () => {
    dispatch(setIsOpen({ id: 'confirmDeleteList', isOpen: false }));
    const { listId, bookId } = await removeBookFromList(selectedList || "", selectedBook || "");
    if (listId) {
      dispatch(removeBookFromSlice({ listId, bookId }));
      toast.success('Book removed from list');
    }
  }
  return (
    createPortal(<div className={isOpen ? 'modal show' : 'modal'} id='confirm-remove-book' onClick={hideModal}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header d-f justify-space-between align-items-center">
            <div className="modal-title">
              <h3 className=" m-0">
                Remove book from list?
              </h3>
            </div>
            <div className="hide-modal font-lg" onClick={hideModal}>
              &times;
            </div>
          </div>
        </div>
        <div className="modal-footer d-f align-items-center justify-flex-end mt-3">
          <button className="modal-btn cancel-btn hide-modal">Cancel</button>
          <button className="modal-btn ml-1" onClick={removeBook}>Delete</button>
        </div>
      </div>
    </div>, document.body)
  )
}