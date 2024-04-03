import EditList from './edit-list'
import ConfirmDeleteList from './confirm-delet-list';
import ConfirmRemoveBook from './confirm-remove-book';
import CreateListModal from './create-list';

const Modals = () => {
  return (
    <>
      <ConfirmDeleteList />
      <ConfirmRemoveBook />
      <CreateListModal />
      <EditList />
    </>
  )
}

export default Modals;