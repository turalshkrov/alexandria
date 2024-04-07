import { BookType } from "@/types";
import { Link } from "react-router-dom";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useAppDispatch } from "@/hooks/hook";
import { setIsOpen } from "@/redux/slices/ModalSlice";
import { setSelectedBook } from "@/redux/slices/userListsSlice";
import { useEffect } from "react";
import Button from "@/shared/components/button";
import './index.scss';

const BookTable = ({ data, editPermission }: { data: BookType[], editPermission: boolean }) => {
  const dispatch = useAppDispatch()
  const showModal = (id: string) => {
    dispatch(setIsOpen({ id: 'confirmRemoveBook', isOpen: true }));
    dispatch(setSelectedBook(id));
  }
  useEffect(() => {
    dispatch(setIsOpen({ id: 'confirmRemoveBook', isOpen: false }));
  }, [dispatch]);
  return (
    <table className="book-table w-100 mx-md-2 mx-lg-3">
      <thead>
        <tr>
          <th>Title</th>
          <th className='d-n d-md-b'>Author</th>
          { editPermission && <th>Actions</th> }
        </tr>
      </thead>
      <tbody>
        {
          data.map(book => (
            <tr key={book._id}>
              <td className="d-f align-items-center mr-1 title-td">
                <div className="td-book-cover-container">
                  <img src={book.cover} alt="" className="td-book-cover" />
                </div>
                <div className="td-right">
                  <Link to={`/books/${book._id}`} className="link-hover fw-bold">
                    {book.title}
                  </Link>
                  <p className="publish-date text-secondary m-0">
                    {book.published}
                  </p>
                </div>
              </td>
              <td className="author-td">
                <Link to={`/authors/${book.author._id}`} className="text-secondary link-hover book-author">
                  {book.author.name}
                </Link>
              </td>
              {
                editPermission &&
                <td className="actions-td">
                  <Button 
                    style="link" 
                    className="p-0 book-action-btn d-f align-items-center"
                    onClick={() => showModal(book._id)}>
                    <FaRegCircleXmark/>
                    Remove
                  </Button>
                </td>
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default BookTable;