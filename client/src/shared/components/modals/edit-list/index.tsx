/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setIsOpen } from "@/redux/slices/ModalSlice";
import { useState } from "react";
import { toast } from "sonner";
import { updateList } from "@/api/list";
import { updateListOnUi } from "@/redux/slices/userSlice";
import { modalIsOpenSelector } from "@/redux/selectors";
import { createPortal } from "react-dom";
import "./index.scss";
import Button from "../../button";

const EditList = () => {
  const isOpen = useAppSelector(state => modalIsOpenSelector(state, "editList"));
  const selectedList = useAppSelector(state => state.userSlice.selectedList);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  }
  const hideModal = (e: any) => {
    const target = e.target;
    if (target.classList.contains('modal') ||
      target.classList.contains('hide-modal')) {
      dispatch(setIsOpen({ id: 'editList', isOpen: false }));
      setTitle("");

    }
  }
  const editList = async () => {
    if (!title.trim()) { toast.error('Title is required') }
    else {
      setTitle("");
      dispatch(setIsOpen({ id: 'editList', isOpen: false }));
      const list = await updateList(selectedList || "", title,);
      if (list) toast.success('List updated');
      dispatch(updateListOnUi(list));
    }
  }
  
  return (
    createPortal(<div className={isOpen ? 'modal show' : 'modal'} id='edit-list-modal' onClick={hideModal}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header d-f justify-space-between align-items-center">
            <div className="modal-title">
              <h3 className=" m-0">
                Edit your list name
              </h3>
            </div>
            <div className="hide-modal font-lg" onClick={hideModal}>
              &times;
            </div>
          </div>
          <div className="modal-body w-100 p-2 edit-modal-body">
            <input id="list-title-edit-input"
              name="title"
              onChange={handleTitleChange}
              value={title}
              type="text"
              maxLength={64} />
          </div>
          <div className="modal-footer d-f align-items-center justify-flex-end">
            <Button size="sm" color="light" style="solid" className="hide-modal">Cancel</Button>
            <Button size="sm" color="primary" style="solid" className="ml-1" onClick={editList}>Save</Button>
          </div>
        </div>
      </div>
    </div>, document.body)
  )
}

export default EditList;