/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import '../users/index.scss';
import { useState } from "react";
import { BlogData } from "@/types";
import { toast } from "sonner";
import { createBLog, updateBlog } from "@/admin/redux/slices/blogsSlice";

const BlogForm = () => {
  const dispatch = useAppDispatch();
  const selectedBlog = useAppSelector(state => state.blogsSlice.selected);
  const [blogData, setBlogData] = useState<BlogData>({
    title: selectedBlog?.title || "",
    preview: selectedBlog?.preview || "",
    content: selectedBlog?.content || ""
  });
  const handleChange = (e: any) => {
    setBlogData(state => ({ ...state, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (selectedBlog) {
      toast.promise(dispatch(updateBlog({ id: selectedBlog._id, data: blogData })).unwrap(), {
        loading: 'Loading...',
        success: 'Blog saved',
        error: (error) => error.message,
      });
    } else {
      toast.promise(dispatch(createBLog(blogData)).unwrap(), {
        loading: 'Loading...',
        success: 'Blog saved',
        error: (error) => error.message,
      });
    }
    setBlogData({
      title: "",
      preview: "",
      content:"",
    })
  }
  return (
    <div className='dashboard-content p-2'>
      <h2>
        {selectedBlog ? 'Edit' : 'Add'} Blog
      </h2>
      <form className="form-control d-f data-create-form mt-2">
        <div className="form-item w-50 px-1">
          <label htmlFor="title">Title</label>
          <input name="title" type="text" id="title" className="w-100" value={blogData.title} onChange={handleChange} />
        </div>
        <div className="form-item w-50 px-1">
          <label htmlFor="preview">Preview</label>
          <textarea name="preview" id="preview" className="w-100 p-1" value={blogData.preview} onChange={handleChange} />
        </div>
        <div className="form-item w-50 px-1">
          <label htmlFor="content">Preview</label>
          <textarea name="content" id="content" className="w-100 p-1" rows={10} value={blogData.content} onChange={handleChange} />
        </div>
        <div className="form-item w-50 px-1">
          <button className="add-data p-1 mt-2 bg-success" onClick={handleSubmit}>Save</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm;