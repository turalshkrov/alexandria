import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { useEffect, useState } from "react";
import { ListType } from "@/types";
import { getListById } from "@/api/list";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegCircleXmark } from "react-icons/fa6";
import { MdOutlineContentCopy } from "react-icons/md";
import { setSelectedList } from "@/redux/slices/userSlice";
import { setIsOpen } from "@/redux/slices/ModalSlice";
import Preloader from "@/shared/components/preloader/Preloader";
import Button from "@/shared/components/button";
import BookTable from "./book-table";
import ConfirmDeleteList from "@/shared/components/modals/confirm-delet-list";
import "./index.scss";
import { toast } from "sonner";

interface ListPageState {
  list: ListType | undefined,
  editPermission: boolean,
  isLoading: boolean,
  error: unknown,
}

const ListPage = () => {
  const dispatch = useAppDispatch();
  const [ data, setData ] = useState<ListPageState>({
    list: undefined,
    editPermission: false,
    isLoading: false,
    error: null,
  });
  const userLists = useAppSelector(state => state.userSlice.lists);
  const params = useParams();
  const id = params.id;
  const createdDate = new Date(String(data.list?.createdAt));
  const copyLink = () => {
    navigator.clipboard.writeText(document.URL);
    toast.success('Copied link');
  }
  const showDeleteModal = () => {
    dispatch(setSelectedList(data.list?._id));
    dispatch(setIsOpen({ id: 'confirmDeleteList', isOpen: true }));
  }
  const showEditModal = () => {
    dispatch(setIsOpen({ id: 'editList', isOpen: true }));
  }
  useEffect(() => {
    const getList = async () => {
      try {
        let list = userLists?.find(list => list._id === id);
        if (list) {
          setData({ list, isLoading: false, editPermission: true, error: null, });
        } else {
          setData(state => ({ ...state, isLoading: true }));
          list = await getListById(id);
          setData({ list, isLoading: false, editPermission: false, error: null, });
        }
      } catch (error) {
        setData(state => ({ ...state, error, isLoading: false }));
      }
    }
    getList();
  }, [ id, userLists ]);

  useEffect(() => {
    if (data.editPermission) { dispatch(setSelectedList(data.list?._id)); }
  });
  
  return (
    <>
    {
    data.isLoading ?
    <Preloader /> :
    <div className="page list-page">
      <div className="container py-2 py-lg-3 px-1 px-md-2">
        <div className="row align-items-center mx-md-2 mx-lg-3">
          <div className="col-12 col-md-3 col-lg-2 d-f justify-center p-relative">
            <div className="col-6 col-md-12">
              <div className="list-cover-container w-100 p-relative">
                {
                  data.list?.books.length ?
                  <img src={data.list.books[0].cover} className="list-cover-main-img" /> :
                  <div className="list-cover-main-img-empty"></div>
                }
                <div className="list-cover-bg-book-1"></div>
                <div className="list-cover-bg-book-2"></div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-9 col-lg-10 pl-md-2 pl-md-3 mt-1 mt-md-0 list-info">
            <h1 className="list-title font-lg-xxl m-0">
              { data.list?.title }
            </h1>
            <Link to={`/users/${data.list?.user._id}`} className="list-author link-hover">
              {data.list?.user.name}
            </Link>
            <p className="m-0 created-date">Created: {createdDate.toDateString()}</p>
            {
              data.editPermission && 
              <div className="d-f list-actions mt-1">
                <Button 
                  style="link"
                  className="p-0 list-action-btn d-f align-items-center mr-2"
                  onClick={showEditModal}>
                  <MdOutlineEdit/>
                  Edit
                </Button>
                <Button 
                  style="link"
                  className="p-0 list-action-btn d-f align-items-center mr-2"
                  onClick={copyLink}>
                  <MdOutlineContentCopy/>
                  Copy link
                </Button>
                <Button
                  style="link" 
                  className="p-0 list-action-btn d-f align-items-center"
                  onClick={showDeleteModal}>
                  <FaRegCircleXmark/>
                  Delete
                </Button>
                <ConfirmDeleteList />
              </div>
            }
          </div>
        </div>
        <div className="books-container mt-2">
          <BookTable editPermission={data.editPermission} data={data.list?.books || []}/>
        </div>
      </div>
    </div>
    }
    </>
  )
}

export default ListPage;