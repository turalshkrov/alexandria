/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaXmark } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setIsOpen } from "@/redux/slices/ModalSlice";
import { useState } from "react";
import { toast } from "sonner";
import { createNewList } from "@/api/list";
import { addNewListToUI } from "@/redux/slices/userSlice";
import { modalIsOpenSelector } from "@/redux/selectors";
import Button from "../../button";
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
      target.classList.contains('hide-modal') ||
      target.closest('.hide-modal')) {
      dispatch(setIsOpen({ id: 'createList', isOpen: false }));
      setTitle("");
    }
  }
  const createList = async () => {
    if (!title.trim()) { toast.error('Title is required') }
    else {
      setTitle("");
      dispatch(setIsOpen({ id: 'createList', isOpen: false }));
      const list = await createNewList(title);
      if (list) toast.success('List created');
      dispatch(addNewListToUI(list));
    }
  }
  return (
    <>
      <div className={isOpen ? 'modal show' : 'modal'} id='create-list-modal' onClick={hideModal}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header d-f justify-space-between align-items-center">
              <div className="modal-title">
                <h3 className=" m-0">
                  Give your list name
                </h3>
              </div>
              <div className="hide-modal" onClick={hideModal}>
                <FaXmark size={20} />
              </div>
            </div>
            <div className="modal-body">
              <input id="list-title-input"
                name="title"
                onChange={handleChange}
                value={title}
                type="text"
                maxLength={64} />
            </div>
            <div className="modal-footer d-f align-items-center justify-flex-end">
              <Button size="sm" color="light" style="solid" className="hide-modal">Cancel</Button>
              <Button size="sm" color="primary" style="solid" className="ml-1" onClick={createList}>Create</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
