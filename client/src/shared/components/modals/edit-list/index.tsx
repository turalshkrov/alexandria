/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setIsOpen } from "@/redux/slices/ModalSlice";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { updateList } from "@/api/list";
import { updateListOnUi } from "@/redux/slices/userSlice";
import { modalIsOpenSelector } from "@/redux/selectors";
import { createPortal } from "react-dom";
import Button from "../../button";
import "./index.scss";

const EditList = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isOpen = useAppSelector(state => modalIsOpenSelector(state, "editList"));
  const selectedList = useAppSelector(state => state.userSlice.selectedList);
  const dispatch = useAppDispatch();
  const [listform, setListForm] = useState({
    title: "",
    cover: ""
  });
  const handleTitleChange = (e: any) => {
    setListForm(state => ({ ...state, title: e.target.value }));
  }
  const hideModal = (e: any) => {
    const target = e.target;
    if (target.classList.contains('modal') ||
      target.classList.contains('hide-modal')) {
      dispatch(setIsOpen({ id: 'editList', isOpen: false }));
      setListForm({ title: "", cover: "" });

    }
  }
  const editList = async () => {
    console.log(listform);
    if (!listform.title.trim()) { toast.error('Title is required') }
    else {
      setListForm({ title: "", cover: "" });
      dispatch(setIsOpen({ id: 'editList', isOpen: false }));
      const list = await updateList(selectedList || "", listform.title, listform.cover);
      if (list) toast.success('List updated');
      dispatch(updateListOnUi(list));
    }
  }
  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = () => {
        reject(fileReader.error)
      }
    });
  }
  const handleFileInputClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  }
  const imageUpload = async (e: any) => {
    const cover = await convertToBase64(e.target.files[0]) as string;
    setListForm(state => ({ ...state, cover }));
  }
  return (
    createPortal(<div className={isOpen ? 'modal show' : 'modal'} id='edit-list-modal' onClick={hideModal}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header d-f justify-space-between align-items-center">
            <div className="modal-title">
              <h3 className=" m-0">
                Edit your list
              </h3>
            </div>
            <div className="hide-modal font-lg" onClick={hideModal}>
              &times;
            </div>
          </div>
          <div className="modal-body w-100 p-2 edit-modal-body">
            <label htmlFor="cover-photo-input" className="mb-1">List Cover:</label>
            <input ref={fileInputRef} type="file" name="" id="" hidden onChange={imageUpload} />
            <button className="w-md-50 mb-1" onClick={handleFileInputClick}>
              Upload a file...
            </button>
            <label htmlFor="title" className="mb-1">List title:</label>
            <input id="list-title-input"
              name="title"
              onChange={handleTitleChange}
              value={listform.title}
              type="text"
              maxLength={64} />
          </div>
          <div className="modal-footer d-f align-items-center justify-flex-end">
            <Button size="sm" color="light" style="solid" className="hide-modal">Cancel</Button>
            <Button size="sm" color="primary" style="solid" className="ml-1" onClick={editList}>Create</Button>
          </div>
        </div>
      </div>
    </div>, document.body)
  )
}

export default EditList;