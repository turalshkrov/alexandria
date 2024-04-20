import { setIsOpen } from '@/redux/slices/ModalSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { modalIsOpenSelector } from '@/redux/selectors';
import { toast } from 'sonner';
import { createPortal } from 'react-dom';
import { deleteSeries, setSelectedSeries } from '@/admin/redux/slices/seriesSlice';

export default function ConfirmDeleteSeries (){
  const isOpen = useAppSelector(state => modalIsOpenSelector(state, 'confirmDeleteSeries'));
  const selectedSeries = useAppSelector(state => state.seriesSlice.selected);
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hideModal = (e: any) => {
    const target = e.target;
    if (target.classList.contains('modal') ||
      target.classList.contains('hide-modal')) {
      dispatch(setIsOpen({ id: 'confirmDeleteSeries', isOpen: false }));
      dispatch(setSelectedSeries(null));
    }
  }
  const handleSumbit = async () => {
    dispatch(setIsOpen({ id: 'confirmDeleteSeries', isOpen: false }));
    toast.promise(dispatch(deleteSeries(selectedSeries?._id || "")).unwrap(), {
      loading: 'Loading...',
      success: 'Series deleted',
      error: 'Somethings get wrong',
    });
    dispatch(setSelectedSeries(null));
  }
  return (
    createPortal(<div className={isOpen ? 'modal show' : 'modal'} onClick={hideModal}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header d-f justify-space-between align-items-center">
            <div className="modal-title">
              <h3 className=" m-0">
                Delete this series?
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