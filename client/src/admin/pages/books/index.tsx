import { setSelectedBook } from "@/admin/redux/slices/booksSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { BookType } from "@/types";
import { Table } from "antd";
import Button from "@/shared/components/button";
import { Link } from "react-router-dom";

const BooksDashboard = () => {
  const booksState = useAppSelector(state => state.booksSlice);
  // const selectedBook = useAppSelector(state => state.booksSlice.selected);
  const dispatch = useAppDispatch();

  const handleClick = (book: BookType) => {
    dispatch(setSelectedBook(book));
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
          <>
            <Button style="link" onClick={() => handleClick(book)}>
              Edit
            </Button>
            <Button style="link" className="ml-1">
              Delete
            </Button>
          </>
        )
      }
    }
  ];

  return (
    <div className='dashboard-content p-2'>
      <div className="dashboard-header d-f align-items-center justify-space-between">
        <h2>Books</h2>
        <Link to="create">
          <button className="add-data p-1">
            + Add Book
          </button>
        </Link>
      </div>
      <Table dataSource={booksState.books || []} columns={columns} />
    </div>
  )
}

export default BooksDashboard;