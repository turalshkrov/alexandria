/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { BookType, SeriesData } from "@/types";
import { useEffect, useState } from "react";
import { createSeries, setSelectedSeries, updateSeries } from "@/admin/redux/slices/seriesSlice";
import { toast } from "sonner";
import "./index.scss";

const SeriesForm = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector(state => state.booksSlice.books);
  const selectedSeries = useAppSelector(state => state.seriesSlice.selected);
  const [seriesData, setSeriesData] = useState<SeriesData>({
    title: selectedSeries?.title || "",
    description: selectedSeries?.description || "",
    books: selectedSeries?.books.map(book => book._id) || [],
  });
  const [ seriesBooks, setSeriesBooks ] = useState<BookType[]>();
  const [ newBook, setNewBook ] = useState("");
  const handleChange = (e: any) => {
    setSeriesData(state => ({ ...state, [e.target.name]: e.target.value }));
  }
  const handleRemoveBook = (book: BookType) => {
    setSeriesData(state => ({ ...state, books: state.books?.filter(_id => _id !== book._id)}));
  }
  const handleBookChange = (e: any) => {
    setNewBook(e.target.value);
  }
  const handleAddBook = (e: any) => {
    e.preventDefault();
    if (!newBook) return false;
    if (!seriesData.books?.find(_id => _id === newBook)) {
      setSeriesData(state => ({ ...state, books: [ ...state.books || [], newBook ] }));
    }
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (selectedSeries) {
      toast.promise(dispatch(updateSeries({ id: selectedSeries?._id || "", data: seriesData })).unwrap(), {
        loading: 'Loading...',
        success: 'Series saved',
        error: (error) => error.response.data.message,
      });
      dispatch(setSelectedSeries(null));
    } else {
      toast.promise(dispatch(createSeries(seriesData)).unwrap, {
        loading: 'Loading...',
        success: 'Series created',
        error: (error) => error.response.data.message,
      });
    }
    setSeriesData({
      title: "",
      description: "",
      books: []
    });
  }
  useEffect(() => {
    setSeriesBooks(seriesData.books?.map(_id => books?.find(book => book._id === _id)!));
  }, [books, seriesData.books]);
  return (
    <div className="dashboard-content p-2">
      <h2>{selectedSeries ? 'Edit' : 'Add'} Series</h2>
      <form className="form-control d-f data-create-form mt-2">
        <div className="form-item w-50 px-1">
          <label htmlFor="title">Title</label>
          <input name="title" type="text" id="title" className="w-100" value={seriesData.title} onChange={handleChange} />
        </div>
        
        <div className="form-item w-50 px-1">
          <label htmlFor="books">Books</label>
          <select name="book" id="book" className="w-100" value={newBook} onChange={handleBookChange}>
            <option value="">Select Book</option>
            {
              books?.map(book => (
                <option key={book._id} value={book._id}>{book.title}</option>
              ))
            }
          </select>
          <button className="add-data p-1 mt-2 bg-success" onClick={handleAddBook}>Add</button>
          <div className="mt-2">
            {
              seriesBooks?.map(book => (
                <p className="d-f justify-space-between w-100" key={book._id}>
                  {book.title}
                  <span className="remove-book" onClick={() => handleRemoveBook(book)}>
                    &times;
                  </span>
                </p>
              ))
            }
          </div>
        </div>
        <div className="form-item w-50 px-1">
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" className="w-100 p-1" rows={10} value={seriesData.description} onChange={handleChange} />
        </div>
        <div className="form-item w-50 px-1">
          <button className="add-data p-1 mt-2 bg-success" onClick={handleSubmit}>Save</button>
        </div>
      </form>
    </div>
  )
}

export default SeriesForm;