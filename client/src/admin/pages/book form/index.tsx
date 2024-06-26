/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBook, setSelectedBook, updateBook } from "@/admin/redux/slices/booksSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { CreateBookData } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

const BookForm = () => {
  const dispatch = useAppDispatch();
  const authors = useAppSelector(state => state.authorsSlice.authors);
  const series  = useAppSelector(state => state.seriesSlice.series);
  const selectedBook = useAppSelector(state => state.booksSlice.selected);
  const [ genre, setGenre ] = useState("");
  const [ createBookData, setCreateBookData ] = useState<CreateBookData>({
    title: selectedBook?.title || "",
    originalTitle: selectedBook?.originalTitle || "",
    author: selectedBook?.author._id || "",
    series: selectedBook?.series?._id || "",
    cover: selectedBook?.cover || "",
    published: selectedBook?.published || "",
    genres: selectedBook?.genres || [],
    language: selectedBook?.language || "",
    description: selectedBook?.description || "",
  });
  const handleChange = (e: any) => {
    setCreateBookData(state => ({ ...state, [e.target.name]: e.target.value}));
  }
  const handleGenreChange = (e: any) => {
    setGenre(e.target.value);
  }
  const handleAddGenre = (e: any) => {
    e.preventDefault();
    setCreateBookData(state => ({ ...state, genres: [ ...state.genres, genre ] }));
    setGenre("");
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (selectedBook) {
      toast.promise(dispatch(updateBook({ id: selectedBook._id, data: createBookData })).unwrap(), {
        loading: 'Loading...',
        success: 'Book updated',
        error: (error) => {
          return error.message;
        }
      });
      dispatch(setSelectedBook(null));
    } else {
      toast.promise(dispatch(createBook(createBookData)).unwrap(), {
        loading: 'Loading...',
        success: 'Book created',
        error: (error) => {
          return error.message;
        }
      });
    }
    setCreateBookData({
      title: "",
      originalTitle: "",
      author: "",
      series: "",
      cover: "",
      published: "",
      genres: [],
      language: "",
      description: "",
    });
  }
  return (
    <div className="dashboard-content p-2">
      <h2>{selectedBook ? 'Edit' : 'Add'} Book</h2>
      <form className="form-control d-f data-create-form mt-2">
        <div className="form-item w-50 px-1">
          <label htmlFor="title">Title</label>
          <input name="title" type="text" id="title" className="w-100" value={createBookData.title} onChange={handleChange}/>
        </div>
        <div className="form-item w-50 px-1">
          <label htmlFor="original-title">Original title</label>
          <input name="originalTitle" type="text" id="original-title" className="w-100"  value={createBookData.originalTitle} onChange={handleChange}/>
        </div>
        <div className="form-item w-50 px-1">
          <label htmlFor="author">Author</label>
          <select name="author" id="author" className="w-100" value={createBookData.author} onChange={handleChange}>
            <option value="">Select Author</option>
            {
              authors?.map(author => (
                <option key={author._id} value={author._id}>{author.name}</option>
              ))
            }
          </select>
        </div>
        <div className="form-item w-50 px-1">
          <label htmlFor="series">Series</label>
          <select name="series" id="series" className="w-100" value={createBookData.series} onChange={handleChange}>
            <option value="">Select Series</option>
            {
              series?.map(series => (
                <option key={series._id} value={series._id}>{series.title}</option>
              ))
            }
          </select>
        </div>
        <div className="form-item w-50 px-1">
          <label htmlFor="cover">Cover</label>
          <input name="cover" type="text" id="cover" className="w-100"  value={createBookData.cover} onChange={handleChange}/>
        </div>
        <div className="form-item w-50 px-1">
          <label htmlFor="published">Published</label>
          <input name="published" type="text" id="published" className="w-100"  value={createBookData.published} onChange={handleChange}/>
        </div>
        <div className="form-item w-50 px-1">
          <label htmlFor="language">Language</label>
          <input name="language" type="text" id="language" className="w-100"  value={createBookData.language} onChange={handleChange}/>
        </div>
        <div className="form-item w-50 px-1">
          <label htmlFor="genres">Genres</label>
          <input name="genres" type="text" id="genres" className="w-100 mb-1"  value={genre} onChange={handleGenreChange}/>
          <p>Added genres: 
            {
              createBookData.genres.map(genre => (
                <span key={genre} className="ml-1">{genre}</span>
              ))
            }
          </p>
          <button className="add-data p-1 mt-1" onClick={handleAddGenre}>Add genre</button>
        </div>
        <div className="form-item w-50 px-1">
          <label htmlFor="description">Despription</label>
          <textarea name="description" id="description" className="w-100  p-1" rows={10}  value={createBookData.description} onChange={handleChange}/>
        </div>
        <div className="form-item w-50 px-1">
          <button className="add-data p-1 mt-2 bg-success" onClick={handleSubmit}>Save</button>
        </div>
      </form>
    </div >
  )
}

export default BookForm;