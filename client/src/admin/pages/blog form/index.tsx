import { useAppSelector } from "@/hooks/hook";

const BlogForm = () => {
  const selectedBlog = useAppSelector(state => state.blogsSlice.selected);
  return (
    <div className='dashboard-content p-2'>
      <h2>
        {selectedBlog ? 'Edit' : 'Add'} Blog
      </h2>
      <p>{selectedBlog?.title}</p>
    </div>
  )
}

export default BlogForm;