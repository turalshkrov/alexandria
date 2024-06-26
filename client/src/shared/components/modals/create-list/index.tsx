/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setIsOpen } from "@/redux/slices/ModalSlice";
import { useState } from "react";
import { toast } from "sonner";
import { createNewList } from "@/redux/slices/userListsSlice";
import { modalIsOpenSelector } from "@/redux/selectors";
import { createPortal } from "react-dom";
import "../index.scss";
import "./index.scss";

export default function CreateListModal() {
  const isOpen = useAppSelector(state => modalIsOpenSelector(state, "createList"));
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const handleChange = (e: any) => {
    setTitle(e.target.value)
  }
  const hideModal = (e: any) => {
    const target = e.target;
    if (target.classList.contains('modal') ||
      target.classList.contains('hide-modal')) {
      dispatch(setIsOpen({ id: 'createList', isOpen: false }));
      setTitle("");
    }
  }
  const createList = async () => {
    if (!title.trim()) { toast.error('Title is required') }
    else {
      toast.promise(dispatch(createNewList(title)).unwrap(), {
        loading: 'Loading...',
        success: 'List created',
        error: 'Somethings get wrong'
      });
      setTitle("");
      dispatch(setIsOpen({ id: 'createList', isOpen: false }));
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
                  Give your list name
                </h3>
              </div>
              <div className="hide-modal font-lg" onClick={hideModal}>
                &times;
              </div>
            </div>
            <div className="modal-body p-2">
              <input
                id="list-title-input"
                className="list-title-input"
                name="title"
                onChange={handleChange}
                value={title}
                type="text"
                maxLength={64} />
            </div>
            <div className="modal-footer d-f align-items-center justify-flex-end">
              <button className="modal-btn cancel-btn hide-modal">Cancel</button>
              <button className="modal-btn ml-1" onClick={createList}>Create</button>
            </div>
          </div>
        </div>
      </div>
    </>, document.body)
  )
}
