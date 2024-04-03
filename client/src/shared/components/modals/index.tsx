import EditList from './edit-list'
import ConfirmDeleteList from './confirm-delet-list';
import ConfirmRemoveBook from './confirm-remove-book';
import CreateListModal from './create-list';
import SignOut from './sign-out';
import ConfirmDeleteAccount from './confirm-delete-account';

const Modals = () => {
  return (
    <>
      <ConfirmDeleteList />
      <ConfirmRemoveBook />
      <CreateListModal />
      <EditList />
      <SignOut />
      <ConfirmDeleteAccount />
    </>
  )
}

export default Modals;