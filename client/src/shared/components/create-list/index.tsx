import { useAppDispatch } from '@/hooks/hook';
import { setIsOpen } from '@/redux/slices/ModalSlice';
import { useEffect } from 'react';
import CreateListModal from '../modals/create-list';
import '../list-card/index.scss';

const CreateList = () => {
  const dispatch = useAppDispatch();
  const showModal = () => {
    dispatch(setIsOpen({
      id: 'createList',
      isOpen: true
    }));
  }
  useEffect(() => {
    dispatch(setIsOpen({
      id: 'createList',
      isOpen: false
    }));
  });
  return (
    <>
    <div className='list-item col-6 col-md-3 p-1 p-xxl-2'>
      <div className="list-card create-list" onClick={showModal}>
        <img src="https://rb.gy/cqvygl" alt="" className="w-100 br-1"/>
        <div className="list-card-footer">
          <div className="list-action">
            <p className="mb-0 create-list link-hover">
              Create
            </p>
            <p className="mb-0 create-list-secondary text-secondary">
              Add new list to library
            </p>
          </div>
        </div>
      </div>
    </div>
    <CreateListModal />
    </>
  )
}

export default CreateList;