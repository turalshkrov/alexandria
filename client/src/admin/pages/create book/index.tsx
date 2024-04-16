import { useAppSelector } from "@/hooks/hook";


const CreateBook = () => {
  const authors = useAppSelector(state => state.authorsSlice.authors);
  return (
    <div className="dashboard-content p-2">
      <h2>Add Book</h2>
      <form className="form-control data-create-form mt-2">
        <div className="form-item">
          <label htmlFor="title">Title</label>
          <input name="title" type="text" id="title" className="w-xl-50 w-xxl-25" />
        </div>
        <div className="form-item">
          <label htmlFor="original-title">Original title</label>
          <input name="originalTitle" type="text" id="original-title" className="w-xl-50 w-xxl-25" />
        </div>
        <div className="form-item">
          <label htmlFor="author">Author</label>
          <select name="author" id="author" className="w-xl-50 w-xxl-25">
            <option value="default" selected disabled>Select Author</option>
            {
              authors?.map(author => (
                <option key={author._id} value={author._id}>{author.name}</option>
              ))
            }
          </select>
        </div>
        <div className="form-item">
          <label htmlFor="series">Series</label>
          <input name="series" type="text" id="original-title" className="w-xl-50 w-xxl-25" />
        </div>
      </form>
    </div>
  )
}

export default CreateBook;