/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { modalIsOpenSelector } from "@/redux/selectors";
import { setIsOpen } from "@/redux/slices/ModalSlice";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { addBook } from "@/redux/slices/userListsSlice";
import "./index.scss";
import { ListType } from "@/types";

const AddToListModal = () => {
  const isOpen = useAppSelector(state => modalIsOpenSelector(state, "addToList"));
  const lists = useAppSelector(state => state.userListsSlice.lists);
  const selectedBook = useAppSelector(state => state.userSlice.selectedBook) || "";
  const dispatch = useAppDispatch();
  const hideModal = (e: any) => {
    const target = e.target;
    if (target.classList.contains('modal') ||
      target.classList.contains('hide-modal')) {
      dispatch(setIsOpen({ id: 'addToList', isOpen: false }));
    }
  }
  const handleAddToList = async (selectedList: ListType) => {
    if (lists?.find(list => list._id === selectedList._id)?.books.find(book => book._id === selectedBook)) {
      toast.info(`Book is already in ${selectedList.title}`);
    } else {
      toast.promise(dispatch(addBook({ listId: selectedList._id, bookId: selectedBook })), {
        loading: 'Loading...',
        success: `Book added to ${selectedList.title}`,
      })
    }
  }
  return (
    createPortal(<>
      <div className={isOpen ? 'modal show' : 'modal'} id='create-list-modal' onClick={hideModal}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header d-f justify-space-between align-items-center">
              <div className="modal-title">
                <h3 className=" m-0">
                  Add to list
                </h3>
              </div>
              <div className="hide-modal font-lg" onClick={hideModal}>
                &times;
              </div>
            </div>
            <div className="modal-body py-1">
              <div className="modal-list-container w-100">
              {
                lists?.map(list => (
                  <div key={list._id} className="add-to-list-modal-item d-f align-items-center" onClick={() => handleAddToList(list)}>
                    <div className="list-cover-container">
                    <div className="list-cover-container p-relative br-1">
                        {
                          list?.books.length ?
                            <img src={list.books[0].cover} className="list-cover-main-img" /> :
                            <div className="list-cover-main-img-empty"></div>
                        }
                        <div className="list-cover-bg-book-1"></div>
                        <div className="list-cover-bg-book-2"></div>
                      </div>
                    </div>
                    {list.title}
                  </div>
                ))
              }
              </div>
            </div>
            <div className="modal-footer d-f align-items-center justify-flex-end">
              <button className="modal-btn cancel-btn hide-modal">Cancel</button>
              <button className="modal-btn ml-1 hide-modal">OK</button>
            </div>
          </div>
        </div>
      </div>
    </>, document.body)
  )
}

export default AddToListModal;