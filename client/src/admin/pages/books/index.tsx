import { setSelectedBook } from "@/admin/redux/slices/booksSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { BookType } from "@/types";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { setIsOpen } from "@/redux/slices/ModalSlice";
import Button from "@/shared/components/button";
import "../users/index.scss";

const BooksDashboard = () => {
  const booksState = useAppSelector(state => state.booksSlice);
  const dispatch = useAppDispatch();

  const handleClick = (book: BookType) => {
    dispatch(setSelectedBook(book));
  }

  const handleAddBookClick = () => {
    dispatch(setSelectedBook(null));
  }

  const handleDeleteBook = (book: BookType) => {
    dispatch(setSelectedBook(book));
    dispatch(setIsOpen({ id: 'confirmDeleteBook', isOpen: true }));
  }
  
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Original Title",
      dataIndex: "originalTitle",
      key: "originalTitle"
    },
    {
      title: "Author",
      dataIndex: ["author", "name"],
      key: "author"
    },
    {
      title: "Published",
      dataIndex: "published",
      key: "published"
    },
    {
      title: "",
      key: "action",
      render: (book: BookType) => {
        return (
          <div className="action-td">
            <Button style="link" onClick={() => handleClick(book)}>
              <Link to='book-form' className="book-action-btn">
                Edit
              </Link>
            </Button>
            <Button style="link" className="ml-1" onClick={() => handleDeleteBook(book)}>
              Delete
            </Button>
          </div>
        )
      }
    }
  ];

  return (
    <div className='dashboard-content p-2'>
      <div className="dashboard-header d-f align-items-center justify-space-between">
        <h2>Books</h2>
        <Link to="book-form">
          <button className="add-data p-1" onClick={handleAddBookClick}>
            + Add Book
          </button>
        </Link>
      </div>
      <Table dataSource={booksState.books || []} columns={columns} />
    </div>
  )
}

export default BooksDashboard;