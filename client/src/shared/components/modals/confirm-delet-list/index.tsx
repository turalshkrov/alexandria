import { setIsOpen } from '@/redux/slices/ModalSlice';
import { FaXmark } from 'react-icons/fa6'
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { modalIsOpenSelector } from '@/redux/selectors';
import { removeListFromUI, setSelectedList } from '@/redux/slices/userSlice';
import Button from '../../button';
import { deleteListById } from '@/api/list';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function ConfirmDeleteList (){
  const navigate = useNavigate();
  const isOpen = useAppSelector(state => modalIsOpenSelector(state, 'confirmDeleteList'));
  const selectedList = useAppSelector(state => state.userSlice.selectedList);
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hideModal = (e: any) => {
    const target = e.target;
    if (target.classList.contains('modal') ||
      target.classList.contains('hide-modal') ||
      target.closest('.hide-modal')) {
      dispatch(setIsOpen({ id: 'confirmDeleteList', isOpen: false }));
      dispatch(setSelectedList(null));
    }
  }
  const deleteList = async () => {
    dispatch(setIsOpen({ id: 'confirmDeleteList', isOpen: false }));
    const id = await deleteListById(selectedList || "");
    if (id) {
      dispatch(removeListFromUI(id));
      navigate('/profile');
      toast.success('List deleted');
    }
  }
  return (
    <div className={isOpen ? 'modal show' : 'modal'} id='create-list-modal' onClick={hideModal}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header d-f justify-space-between align-items-center">
            <div className="modal-title">
              <h3 className=" m-0">
                Delete this list?
              </h3>
            </div>
            <div className="hide-modal" onClick={hideModal}>
              <FaXmark size={20} />
            </div>
          </div>
        </div>
        <div className="modal-footer d-f align-items-center justify-flex-end mt-3">
          <Button size="sm" color="light" style="solid" className="hide-modal">Cancel</Button>
          <Button size="sm" color="primary" style="solid" className="ml-1" onClick={deleteList}>Delete</Button>
        </div>
      </div>
    </div>
  )
}