import { setIsOpen } from '@/redux/slices/ModalSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { modalIsOpenSelector } from '@/redux/selectors';
import { createPortal } from 'react-dom';

export default function UserDetails (){
  const isOpen = useAppSelector(state => modalIsOpenSelector(state, 'userDetails'));
  const selectedUser = useAppSelector(state => state.usersSlice.selected);
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hideModal = (e: any) => {
    const target = e.target;
    if (target.classList.contains('modal') ||
      target.classList.contains('hide-modal')) {
      dispatch(setIsOpen({ id: 'userDetails', isOpen: false }));
    }
  }
  return (
    createPortal(<div className={isOpen ? 'modal show' : 'modal'} id='confirm-delete-list' onClick={hideModal}>
      <div className="modal-dialog" id="user-details-modal">
        <div className="modal-content">
          <div className="modal-header d-f justify-space-between align-items-center">
            <div className="modal-title">
              <h3 className=" m-0">
                {selectedUser?.name}
              </h3>
            </div>
            <div className="hide-modal" onClick={hideModal}>
              &times;
            </div>
          </div>
        </div>
        <div className="modal-body mt-1 d-b">
          <table>
            <tbody>
              <tr>
                <td className='text-right pt-1 pr-1 w-50'>Id</td>
                <td className="text-left pt-1">{selectedUser?._id}</td>
              </tr>
              <tr>
                <td className='text-right pt-1 pr-1'>Username</td>
                <td className="text-left pt-1">{selectedUser?.username}</td>
              </tr>
              <tr>
                <td className='text-right pt-1 pr-1'>Name</td>
                <td className="text-left pt-1">{selectedUser?.name}</td>
              </tr>
              <tr>
                <td className='text-right pt-1 pr-1'>Email</td>
                <td className="text-left pt-1">{selectedUser?.email}</td>
              </tr>
              <tr>
                <td className='text-right pt-1 pr-1'>Created</td>
                <td className="text-left pt-1">{selectedUser && new Date(selectedUser.createdAt).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td className='text-right pt-1 pr-1'>Updated</td>
                <td className="text-left pt-1">{selectedUser && new Date(selectedUser.updatedAt).toLocaleDateString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="modal-footer d-f align-items-center justify-flex-end mt-2">
          <button className="modal-btn cancel-btn hide-modal">Cancel</button>
          <button className="modal-btn ml-1 hide-modal">OK</button>
        </div>
      </div>
    </div>, document.body)
  )
}