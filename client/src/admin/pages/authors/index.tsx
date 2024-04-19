import { setSelectedAuthor } from "@/admin/redux/slices/authorsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setIsOpen } from "@/redux/slices/ModalSlice";
import { AuthorType } from "@/types";
import { Table } from "antd";
import { Link } from "react-router-dom";
import Button from "@/shared/components/button";
import "../users/index.scss";

const AuthorsDashboard = () => {
  const authors = useAppSelector(state => state.authorsSlice.authors);
  const dispatch = useAppDispatch();

  const handleClick = (author: AuthorType) => {
    dispatch(setSelectedAuthor(author));
  }

  const handleAddAuthorClick = () => {
    dispatch(setSelectedAuthor(null));
  }

  const handleDeleteAuthor = (author: AuthorType) => {
    dispatch(setSelectedAuthor(author));
    dispatch(setIsOpen({ id: 'confirmDeleteAuthor', isOpen: true }));
  }
  
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Native name",
      dataIndex: "nativeName",
      key: "nativeName"
    },
    {
      title: "Born",
      dataIndex: "born",
      key: "born"
    },
    {
      title: "Died",
      dataIndex: "died",
      key: "died"
    },
    {
      title: "",
      key: "action",
      render: (author: AuthorType) => {
        return (
          <div className="action-td">
            <Button style="link" onClick={() => handleClick(author)}>
              <Link to='author-form' className="book-action-btn">
                Edit
              </Link>
            </Button>
            <Button style="link" className="ml-1" onClick={() => handleDeleteAuthor(author)}>
              Delete
            </Button>
          </div>
        )
      }
    }
  ]
  return (
    <div className='dashboard-content p-2'>
      <div className="dashboard-header d-f align-items-center justify-space-between">
        <h2>Authors</h2>
        <Link to='author-form'>
          <button className="add-data p-1" onClick={handleAddAuthorClick}>
            + Add Author
          </button>
        </Link>
      </div>
      <Table columns={columns} dataSource={authors || []}/>
    </div>
  )
}

export default AuthorsDashboard;