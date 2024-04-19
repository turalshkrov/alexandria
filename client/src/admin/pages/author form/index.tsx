/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAuthor, setSelectedAuthor, updateAuthor } from "@/admin/redux/slices/authorsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { AuthorData } from "@/types";
import { useState } from "react";
import { toast } from "sonner";


const AuthorForm = () => {
  const dispatch = useAppDispatch();
  const selectedAuthor = useAppSelector(state => state.authorsSlice.selected);
  const [genre, setGenre] = useState("");
  const [authorData, setAuthorData] = useState<AuthorData>({
    name: selectedAuthor?.name || "",
    nativeName: selectedAuthor?.nativeName || "",
    image: selectedAuthor?.image || "",
    born: selectedAuthor?.born || "",
    died: selectedAuthor?.died || "",
    genres: selectedAuthor?.genres || [],
    authorInfo: selectedAuthor?.authorInfo || "",
  });
  const handleChange = (e: any) => {
    setAuthorData(state => ({ ...state, [e.target.name]: e.target.value }));
  }
  const handleGenreChange = (e: any) => {
    setGenre(e.target.value);
  }
  const handleAddGenre = (e: any) => {
    e.preventDefault();
    setAuthorData(state => ({ ...state, genres: [...state.genres, genre] }));
    setGenre("");
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (selectedAuthor) {
      toast.promise(dispatch(updateAuthor({ id: selectedAuthor._id, data: authorData })).unwrap(), {
        loading: 'Loading...',
        success: 'Author updated',
        error: (error) => {
          return error.message;
        }
      });
      dispatch(setSelectedAuthor(null));
    } else {
      toast.promise(dispatch(createAuthor(authorData)).unwrap(), {
        loading: 'Loading...',
        success: 'Author created',
        error: (error) => {
          return error.message;
        }
      });
      setAuthorData({
        name: "",
        nativeName: "",
        image: "",
        born: "",
        died: "",
        genres: [],
        authorInfo: "",
      })
    }
  }
  return (
    <div className='dashboard-content p-2'>
      <h2>{selectedAuthor ? 'Edit' : 'Add'} Author</h2>
      <form className="form-control d-f data-create-form mt-2">
        <div className="form-item w-50 px-1">
          <label htmlFor="name">Name</label>
          <input name="name" type="text" id="name" className="w-100" value={authorData.name} onChange={handleChange} />
        </div>
        <div className="form-item w-50 px-1">
          <label htmlFor="nativeName">Natice Name</label>
          <input name="nativeName" type="text" id="nativeName" className="w-100" value={authorData.nativeName} onChange={handleChange} />
        </div>
        <div className="form-item w-50 px-1">
          <label htmlFor="image">Image</label>
          <input name="image" type="text" id="image" className="w-100" value={authorData.image} onChange={handleChange} />
        </div>
        <div className="form-item w-50 px-1">
          <label htmlFor="born">Born</label>
          <input name="born" type="text" id="born" className="w-100" value={authorData.born} onChange={handleChange} />
        </div>
        <div className="form-item w-50 px-1">
          <label htmlFor="died">Died</label>
          <input name="died" type="text" id="died" className="w-100" value={authorData.died} onChange={handleChange} />
        </div>
        <div className="form-item w-50 px-1">
          <label htmlFor="genres">Genres</label>
          <input name="genres" type="text" id="genres" className="w-100 mb-1"  value={genre} onChange={handleGenreChange}/>
          <p>Added genres: 
            {
              authorData.genres.map(genre => (
                <span key={genre} className="ml-1">{genre}</span>
              ))
            }
          </p>
          <button className="add-data p-1 mt-1" onClick={handleAddGenre}>Add genre</button>
        </div>
        <div className="form-item w-50 px-1">
          <label htmlFor="authorInfo">Author Info</label>
          <textarea name="authorInfo" id="authorInfo" className="w-100  p-1" rows={10}  value={authorData.authorInfo} onChange={handleChange}/>
        </div>
        <div className="form-item w-50 px-1">
          <button className="add-data p-1 mt-2 bg-success" onClick={handleSubmit}>Save</button>
        </div>
      </form>
    </div>
  )
}

export default AuthorForm;