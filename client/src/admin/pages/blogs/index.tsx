import { setSelectedBlog } from "@/admin/redux/slices/blogsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setIsOpen } from "@/redux/slices/ModalSlice";
import Button from "@/shared/components/button";
import { BlogType } from "@/types";
import { Table } from "antd";
import { Link } from "react-router-dom";

const BlogsDashboard = () => {
  const blogs = useAppSelector(state => state.blogsSlice.blogs);
  const dispatch = useAppDispatch();
  const handleEditClick = (blog: BlogType) => {
    dispatch(setSelectedBlog(blog));
  }
  const handleDeleteClick = (blog: BlogType) => {
    dispatch(setSelectedBlog(blog));
    dispatch(setIsOpen({
      id: 'confirmDeleteBlog',
      isOpen: true,
    }));
  }
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Created",
      key: "title",
      render: (blog: BlogType) => (
        <span>
          {new Date(blog.date).toLocaleDateString()}
        </span>
      )
    },
    {
      title: "",
      key: "action",
      render: (blog: BlogType) => {
        return (
          <div className="action-td">
            <Button style="link" onClick={() => handleEditClick(blog)}>
              <Link to='blog-form' className="book-action-btn">
                Edit
              </Link>
            </Button>
            <Button style="link" className="ml-1" onClick={() => handleDeleteClick(blog)}>
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
        <h2>Blogs</h2>
        <Link to="blog-form ">
          <button className="add-data p-1" onClick={() => dispatch(setSelectedBlog(null))}>
            + Add Blog
          </button>
        </Link>
      </div>
      <Table columns={columns} dataSource={blogs || []}/>
    </div>
  )
}

export default BlogsDashboard;