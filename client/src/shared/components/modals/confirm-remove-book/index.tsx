import { setIsOpen } from '@/redux/slices/ModalSlice';
import { FaXmark } from 'react-icons/fa6'
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { modalIsOpenSelector } from '@/redux/selectors';
import { removeBookFromSlice, setSelectedList } from '@/redux/slices/userSlice';
import { removeBookFromList } from '@/api/list';
import { toast } from 'sonner';
import Button from '../../button';

export default function ConfirmRemoveBook (){
  const isOpen = useAppSelector(state => modalIsOpenSelector(state, 'confirmRemoveBook'));
  const selectedList = useAppSelector(state => state.userSlice.selectedList);
  const selectedBook = useAppSelector(state => state.userSlice.selectedBook);
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hideModal = (e: any) => {
    const target = e.target;
    if (target.classList.contains('modal') ||
      target.classList.contains('hide-modal') ||
      target.closest('.hide-modal')) {
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
    <div className={isOpen ? 'modal show' : 'modal'} id='create-list-modal' onClick={hideModal}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header d-f justify-space-between align-items-center">
            <div className="modal-title">
              <h3 className=" m-0">
                Remove book from list?
              </h3>
            </div>
            <div className="hide-modal" onClick={hideModal}>
              <FaXmark size={20} />
            </div>
          </div>
        </div>
        <div className="modal-footer d-f align-items-center justify-flex-end mt-3">
          <Button size="sm" color="light" style="solid" className="hide-modal">Cancel</Button>
          <Button size="sm" color="primary" style="solid" className="ml-1" onClick={removeBook}>Delete</Button>
        </div>
      </div>
    </div>
  )
}